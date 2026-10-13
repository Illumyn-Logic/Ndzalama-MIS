"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import {
  AssessmentKind,
  DurationUnit,
  ModuleType,
  ProgrammeDeliveryMode,
  QualificationFramework,
  QualificationStatus,
  ResourceKind,
} from "@prisma/client";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export type ActionResult = { ok: boolean; error?: string; id?: string };

type QualificationInput = {
  saqaId?: string;
  registrationRef?: string;
  framework?: QualificationFramework;
  title: string;
  nqfLevel: number;
  credits: number;
  accreditation?: string;
  shortDescription?: string;
  fullDescription?: string;
  entryRequirements?: string[];
  targetAudience?: string[];
  benefits?: string[];
  durationValue?: number;
  durationUnit?: DurationUnit;
  deliveryMode?: ProgrammeDeliveryMode;
  price?: number;
  isActive?: boolean;
  coverImageUrl?: string;
  status?: QualificationStatus;
};

type ModuleInput = {
  qualificationId: string;
  code: string;
  title: string;
  type: ModuleType;
  credits: number;
  notionalHours: number;
  order: number;
};

type TopicInput = { moduleId: string; title: string; order: number };
type LessonInput = { topicId: string; title: string; order: number; durationMinutes: number };
type AssessmentInput = {
  moduleId: string;
  title: string;
  instructions?: string;
  kind: AssessmentKind;
  maxMarks: number;
  order: number;
};

type CurriculumParent = {
  qualificationId?: string;
  moduleId?: string;
  topicId?: string;
  lessonId?: string;
};

type TestInput = CurriculumParent & {
  title: string;
  durationMinutes?: number;
  passMark?: number;
  order: number;
};

type AssignmentInput = CurriculumParent & {
  title: string;
  instructions?: string;
  evidenceRequirements: string[];
};

function clean(value: string) {
  return value.trim();
}

function validPositiveInteger(value: number, maximum = 100000) {
  return Number.isInteger(value) && value >= 0 && value <= maximum;
}

function durationInMonths(value: number, unit: DurationUnit) {
  if (unit === DurationUnit.YEARS) return value * 12;
  if (unit === DurationUnit.WEEKS) return Math.ceil(value / 4);
  return value;
}

function curriculumParentCount(input: CurriculumParent) {
  return [input.qualificationId, input.moduleId, input.topicId, input.lessonId].filter(Boolean).length;
}

function curriculumParent(input: CurriculumParent) {
  return {
    ...(input.qualificationId ? { qualificationId: input.qualificationId } : {}),
    ...(input.moduleId ? { moduleId: input.moduleId } : {}),
    ...(input.topicId ? { topicId: input.topicId } : {}),
    ...(input.lessonId ? { lessonId: input.lessonId } : {}),
  };
}

function parentProgrammePath(input: { qualificationId?: string | null; moduleId?: string | null }) {
  if (input.qualificationId) return `/admin/programmes/${input.qualificationId}/builder`;
  return input.moduleId ? `/admin/modules/${input.moduleId}` : null;
}

function validateQualificationInput(input: QualificationInput) {
  const framework = input.framework ?? QualificationFramework.QCTO_OCCUPATIONAL_CERTIFICATE;
  const registrationRef = clean(input.registrationRef ?? input.saqaId ?? "");
  const supportedFrameworks: QualificationFramework[] = [
    QualificationFramework.QCTO_OCCUPATIONAL_CERTIFICATE,
    QualificationFramework.SKILLS_PROGRAMME,
    QualificationFramework.SHORT_COURSE,
  ];
  if (!supportedFrameworks.includes(framework)) return { error: "Select a supported programme type" };
  const refIsValid = framework === QualificationFramework.QCTO_OCCUPATIONAL_CERTIFICATE
    ? /^\d+$/.test(registrationRef)
    : framework === QualificationFramework.SKILLS_PROGRAMME
      ? /^SP-[A-Z0-9-]+$/i.test(registrationRef)
      : /^[A-Z0-9][A-Z0-9-]*$/i.test(registrationRef);
  if (!registrationRef || !clean(input.title) || !refIsValid) return { error: "Enter a title and a valid registration reference for the selected programme type" };
  if (!validPositiveInteger(input.nqfLevel, 10) || input.nqfLevel < 1) return { error: "NQF level must be between 1 and 10" };
  if (!validPositiveInteger(input.credits) || input.credits < 1) return { error: "Credits must be a positive whole number" };
  const durationValue = input.durationValue ?? 12;
  if (!validPositiveInteger(durationValue, 600) || durationValue < 1) return { error: "Duration must be a positive whole number" };
  if (typeof input.price !== "undefined" && (!Number.isFinite(input.price) || input.price < 0 || input.price > 99999999.99)) return { error: "Programme cost must be a non-negative amount" };
  const coverImageUrl = clean(input.coverImageUrl ?? "");
  if (coverImageUrl && !/^https?:\/\//i.test(coverImageUrl)) return { error: "Programme image must be a valid HTTP or HTTPS URL" };
  return { framework, registrationRef, durationValue, durationUnit: input.durationUnit ?? DurationUnit.MONTHS, coverImageUrl };
}

async function actorId() {
  const session = await auth();
  const role = session?.user?.role;
  if (!session?.user?.id || !role || !["SUPER_ADMIN", "ADMIN", "REGISTRAR"].includes(role)) return null;
  return session.user.id;
}

async function audit(userId: string, entityType: string, entityId: string, action: string, before: unknown, after: unknown) {
  await prisma.auditLog.create({
    data: {
      userId,
      entityType,
      entityId,
      action,
      details: { before: JSON.parse(JSON.stringify(before)), after: JSON.parse(JSON.stringify(after)) },
    },
  });
}

function prismaError(error: unknown, fallback: string, duplicateCodeMessage = "Module code already exists") {
  if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
    const target = Array.isArray(error.meta?.target) ? error.meta.target.join(" ") : String(error.meta?.target ?? "");
    if (target.toLowerCase().includes("saqa")) return "SAQA ID already exists";
    if (target.toLowerCase().includes("code") || target.toLowerCase().includes("modulecode")) return duplicateCodeMessage;
    return "A record with these details already exists";
  }
  return fallback;
}

export async function createQualification(input: QualificationInput): Promise<ActionResult> {
  const userId = await actorId();
  if (!userId) return { ok: false, error: "You must be signed in" };
  const validated = validateQualificationInput(input);
  if ("error" in validated) return { ok: false, error: validated.error };
  const { framework, registrationRef, durationValue, durationUnit, coverImageUrl } = validated;
  const title = clean(input.title);
  try {
    const qualification = await prisma.qualification.create({
      data: {
        saqaId: framework === QualificationFramework.QCTO_OCCUPATIONAL_CERTIFICATE ? registrationRef : null,
        qctoCode: framework === QualificationFramework.QCTO_OCCUPATIONAL_CERTIFICATE ? null : registrationRef,
        code: registrationRef,
        slug: `${registrationRef}-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`,
        title,
        framework,
        nqfLevel: input.nqfLevel,
        credits: input.credits,
        accreditation: input.accreditation?.trim() || null,
        durationMonths: durationInMonths(durationValue, durationUnit),
        durationValue,
        durationUnit,
        deliveryMode: input.deliveryMode ?? ProgrammeDeliveryMode.PART_TIME,
        shortDescription: input.shortDescription?.trim() || title,
        fullDescription: input.fullDescription?.trim() || input.shortDescription?.trim() || title,
        entryRequirements: input.entryRequirements ?? [],
        targetAudience: input.targetAudience ?? [],
        benefits: input.benefits ?? [],
        price: input.price ?? 0,
        coverImageUrl: coverImageUrl || null,
        isActive: input.isActive ?? false,
        status: input.isActive ? QualificationStatus.ACTIVE : input.status ?? QualificationStatus.DEVELOPMENT,
      },
    });
    await audit(userId, "Qualification", qualification.id, "QUALIFICATION_CREATED", null, { registrationRef, title, framework, isActive: qualification.isActive });
    revalidatePath("/admin/programmes");
    return { ok: true, id: qualification.id };
  } catch (error) {
    return { ok: false, error: prismaError(error, "Could not create qualification", "Registration reference already exists") };
  }
}

export async function updateQualification(id: string, input: QualificationInput): Promise<ActionResult> {
  const userId = await actorId();
  if (!userId) return { ok: false, error: "You must be signed in" };
  if (!id) return { ok: false, error: "Qualification is required" };
  const validated = validateQualificationInput(input);
  if ("error" in validated) return { ok: false, error: validated.error };
  const { framework, registrationRef, durationValue, durationUnit, coverImageUrl } = validated;
  const title = clean(input.title);
  try {
    const before = await prisma.qualification.findUnique({ where: { id } });
    if (!before) return { ok: false, error: "Qualification not found" };
    const isActive = before.status === QualificationStatus.ARCHIVED ? false : input.isActive ?? before.isActive;
    const status = before.status === QualificationStatus.ARCHIVED
      ? QualificationStatus.ARCHIVED
      : isActive ? QualificationStatus.ACTIVE : QualificationStatus.DEVELOPMENT;
    const after = await prisma.qualification.update({
      where: { id },
      data: {
        saqaId: framework === QualificationFramework.QCTO_OCCUPATIONAL_CERTIFICATE ? registrationRef : null,
        qctoCode: framework === QualificationFramework.QCTO_OCCUPATIONAL_CERTIFICATE ? null : registrationRef,
        code: registrationRef,
        slug: `${registrationRef}-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`,
        title,
        framework,
        nqfLevel: input.nqfLevel,
        credits: input.credits,
        accreditation: input.accreditation?.trim() || null,
        durationMonths: durationInMonths(durationValue, durationUnit),
        durationValue,
        durationUnit,
        deliveryMode: input.deliveryMode ?? before.deliveryMode,
        shortDescription: input.shortDescription?.trim() || title,
        fullDescription: input.fullDescription?.trim() || input.shortDescription?.trim() || title,
        entryRequirements: input.entryRequirements ?? [],
        targetAudience: input.targetAudience ?? [],
        benefits: input.benefits ?? [],
        price: input.price ?? 0,
        coverImageUrl: coverImageUrl || null,
        isActive,
        status,
      },
    });
    await audit(userId, "Qualification", id, "QUALIFICATION_UPDATED", { code: before.code, title: before.title, isActive: before.isActive }, { registrationRef, title, isActive: after.isActive });
    revalidatePath("/admin/programmes");
    revalidatePath(`/admin/programmes/${id}`);
    return { ok: true, id: after.id };
  } catch (error) {
    return { ok: false, error: prismaError(error, "Could not update qualification", "Registration reference already exists") };
  }
}

export async function archiveQualification(id: string): Promise<ActionResult> {
  const userId = await actorId();
  if (!userId || !id) return { ok: false, error: "Qualification is required" };
  try {
    const before = await prisma.qualification.findUnique({ where: { id }, select: { status: true, isActive: true } });
    if (!before) return { ok: false, error: "Qualification not found" };
    await prisma.qualification.update({ where: { id }, data: { status: QualificationStatus.ARCHIVED, isActive: false } });
    await audit(userId, "Qualification", id, "QUALIFICATION_ARCHIVED", before, { status: QualificationStatus.ARCHIVED, isActive: false });
    revalidatePath("/admin/programmes");
    revalidatePath(`/admin/programmes/${id}`);
    return { ok: true, id };
  } catch (error) {
    return { ok: false, error: prismaError(error, "Could not archive qualification") };
  }
}

export async function setQualificationStatus(id: string, status: QualificationStatus): Promise<ActionResult> {
  const userId = await actorId();
  if (!userId || !id || !Object.values(QualificationStatus).includes(status)) return { ok: false, error: "Invalid qualification status" };
  try {
    const before = await prisma.qualification.findUnique({ where: { id }, select: { status: true } });
    if (!before) return { ok: false, error: "Qualification not found" };
    await prisma.qualification.update({ where: { id }, data: { status, isActive: status === "ACTIVE" } });
    await audit(userId, "Qualification", id, "QUALIFICATION_STATUS_CHANGED", before, { status });
    revalidatePath("/admin/programmes");
    revalidatePath(`/admin/programmes/${id}`);
    return { ok: true, id };
  } catch (error) {
    return { ok: false, error: prismaError(error, "Could not change qualification status") };
  }
}

export async function createCourseModule(input: ModuleInput): Promise<ActionResult> {
  const userId = await actorId();
  const code = clean(input.code);
  const title = clean(input.title);
  if (!userId) return { ok: false, error: "You must be signed in" };
  if (!input.qualificationId || !code || !title) return { ok: false, error: "Qualification, code, and title are required" };
  if (!validPositiveInteger(input.credits) || !validPositiveInteger(input.notionalHours) || !validPositiveInteger(input.order)) return { ok: false, error: "Credits, hours, and order must be whole numbers" };
  try {
    const createdModule = await prisma.courseModule.create({
      data: { qualificationId: input.qualificationId, code, moduleCode: code, title, type: input.type, category: input.type === "KNOWLEDGE" ? "KNOWLEDGE_MODULE" : input.type === "PRACTICAL" ? "PRACTICAL_MODULE" : "WORKPLACE_MODULE", credits: input.credits, notionalHours: input.notionalHours, orderIndex: input.order },
    });
    await audit(userId, "CourseModule", createdModule.id, "MODULE_CREATED", null, { code, title });
    revalidatePath(`/admin/programmes/${input.qualificationId}`);
    return { ok: true, id: createdModule.id };
  } catch (error) {
    return { ok: false, error: prismaError(error, "Could not create module") };
  }
}

export async function updateCourseModule(id: string, input: Omit<ModuleInput, "qualificationId"> & { qualificationId?: string }): Promise<ActionResult> {
  const userId = await actorId();
  if (!userId || !id) return { ok: false, error: "Module is required" };
  const code = clean(input.code);
  const title = clean(input.title);
  if (!code || !title || !validPositiveInteger(input.credits) || !validPositiveInteger(input.notionalHours) || !validPositiveInteger(input.order)) return { ok: false, error: "Complete the module fields with valid whole numbers" };
  try {
    const before = await prisma.courseModule.findUnique({ where: { id } });
    if (!before) return { ok: false, error: "Module not found" };
    const updatedModule = await prisma.courseModule.update({ where: { id }, data: { code, moduleCode: code, title, type: input.type, category: input.type === "KNOWLEDGE" ? "KNOWLEDGE_MODULE" : input.type === "PRACTICAL" ? "PRACTICAL_MODULE" : "WORKPLACE_MODULE", credits: input.credits, notionalHours: input.notionalHours, orderIndex: input.order } });
    await audit(userId, "CourseModule", id, "MODULE_UPDATED", { code: before.code, title: before.title }, { code, title });
    revalidatePath(`/admin/modules/${id}`);
    revalidatePath(`/admin/programmes/${updatedModule.qualificationId}`);
    return { ok: true, id };
  } catch (error) {
    return { ok: false, error: prismaError(error, "Could not update module") };
  }
}

export async function createTopic(input: TopicInput): Promise<ActionResult> {
  const userId = await actorId();
  if (!userId || !input.moduleId || !clean(input.title) || !validPositiveInteger(input.order)) return { ok: false, error: "Topic title and order are required" };
  try { const topic = await prisma.topic.create({ data: { moduleId: input.moduleId, title: clean(input.title), order: input.order } }); await audit(userId, "Topic", topic.id, "TOPIC_CREATED", null, { title: topic.title }); revalidatePath(`/admin/modules/${input.moduleId}`); return { ok: true, id: topic.id }; } catch (error) { return { ok: false, error: prismaError(error, "Could not create topic") }; }
}

export async function updateTopic(id: string, input: Omit<TopicInput, "moduleId"> & { moduleId?: string }): Promise<ActionResult> {
  const userId = await actorId();
  if (!userId || !id || !clean(input.title) || !validPositiveInteger(input.order)) return { ok: false, error: "Topic title and order are required" };
  try { const before = await prisma.topic.findUnique({ where: { id } }); if (!before) return { ok: false, error: "Topic not found" }; const topic = await prisma.topic.update({ where: { id }, data: { title: clean(input.title), order: input.order } }); await audit(userId, "Topic", id, "TOPIC_UPDATED", before, { title: topic.title, order: topic.order }); revalidatePath(`/admin/modules/${topic.moduleId}`); return { ok: true, id }; } catch (error) { return { ok: false, error: prismaError(error, "Could not update topic") }; }
}

export async function createLesson(input: LessonInput): Promise<ActionResult> {
  const userId = await actorId();
  if (!userId || !input.topicId || !clean(input.title) || !validPositiveInteger(input.order) || !validPositiveInteger(input.durationMinutes, 1440)) return { ok: false, error: "Lesson fields are invalid" };
  try { const topic = await prisma.topic.findUnique({ where: { id: input.topicId } }); if (!topic) return { ok: false, error: "Topic not found" }; const lesson = await prisma.lesson.create({ data: { topicId: topic.id, moduleId: topic.moduleId, title: clean(input.title), slug: `${topic.id}-${input.order}`, orderIndex: input.order, durationMinutes: input.durationMinutes, resourceUrls: [] } }); await audit(userId, "Lesson", lesson.id, "LESSON_CREATED", null, { title: lesson.title }); revalidatePath(`/admin/modules/${topic.moduleId}`); return { ok: true, id: lesson.id }; } catch (error) { return { ok: false, error: prismaError(error, "Could not create lesson") }; }
}

export async function updateLesson(id: string, input: Omit<LessonInput, "topicId"> & { topicId?: string }): Promise<ActionResult> {
  const userId = await actorId();
  if (!userId || !id || !clean(input.title) || !validPositiveInteger(input.order) || !validPositiveInteger(input.durationMinutes, 1440)) return { ok: false, error: "Lesson fields are invalid" };
  try { const before = await prisma.lesson.findUnique({ where: { id } }); if (!before) return { ok: false, error: "Lesson not found" }; const lesson = await prisma.lesson.update({ where: { id }, data: { title: clean(input.title), orderIndex: input.order, durationMinutes: input.durationMinutes } }); await audit(userId, "Lesson", id, "LESSON_UPDATED", before, { title: lesson.title, order: lesson.orderIndex }); revalidatePath(`/admin/modules/${lesson.moduleId}`); return { ok: true, id }; } catch (error) { return { ok: false, error: prismaError(error, "Could not update lesson") }; }
}

export async function addLessonResource(input: { lessonId: string; kind: ResourceKind; url: string; label: string }): Promise<ActionResult> {
  const userId = await actorId();
  if (!userId || !input.lessonId || !clean(input.url) || !clean(input.label) || !Object.values(ResourceKind).includes(input.kind)) return { ok: false, error: "Resource label, URL, and kind are required" };
  try { const resource = await prisma.lessonResource.create({ data: { lessonId: input.lessonId, kind: input.kind, url: clean(input.url), label: clean(input.label) }, include: { lesson: true } }); await audit(userId, "LessonResource", resource.id, "RESOURCE_ADDED", null, { label: resource.label, kind: resource.kind }); revalidatePath(`/admin/modules/${resource.lesson.moduleId}`); return { ok: true, id: resource.id }; } catch (error) { return { ok: false, error: prismaError(error, "Could not add resource") }; }
}

export async function removeLessonResource(id: string): Promise<ActionResult> {
  const userId = await actorId();
  if (!userId || !id) return { ok: false, error: "Resource is required" };
  try { const resource = await prisma.lessonResource.findUnique({ where: { id }, include: { lesson: true } }); if (!resource) return { ok: false, error: "Resource not found" }; await prisma.lessonResource.delete({ where: { id } }); await audit(userId, "LessonResource", id, "RESOURCE_REMOVED", { label: resource.label }, null); revalidatePath(`/admin/modules/${resource.lesson.moduleId}`); return { ok: true, id }; } catch (error) { return { ok: false, error: prismaError(error, "Could not remove resource") }; }
}

export async function addProgrammeResource(input: CurriculumParent & { kind: ResourceKind; url: string; label: string }): Promise<ActionResult> {
  const userId = await actorId();
  if (!userId || curriculumParentCount(input) !== 1 || !clean(input.url) || !clean(input.label) || !Object.values(ResourceKind).includes(input.kind)) return { ok: false, error: "Choose one parent and provide a valid resource label, URL, and kind" };
  try {
    const parsedUrl = new URL(input.url);
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) return { ok: false, error: "Resource URL must use HTTP or HTTPS" };
    const resource = await prisma.programmeResource.create({ data: { ...curriculumParent(input), kind: input.kind, url: clean(input.url), label: clean(input.label) } });
    await audit(userId, "ProgrammeResource", resource.id, "RESOURCE_ADDED", null, { label: resource.label, kind: resource.kind, parent: curriculumParent(input) });
    const path = parentProgrammePath(input);
    if (path) revalidatePath(path);
    revalidatePath("/admin/programmes");
    return { ok: true, id: resource.id };
  } catch (error) {
    return { ok: false, error: prismaError(error, "Could not add resource") };
  }
}

export async function removeProgrammeResource(id: string): Promise<ActionResult> {
  const userId = await actorId();
  if (!userId || !id) return { ok: false, error: "Resource is required" };
  try {
    const resource = await prisma.programmeResource.findUnique({ where: { id } });
    if (!resource) return { ok: false, error: "Resource not found" };
    await prisma.programmeResource.delete({ where: { id } });
    await audit(userId, "ProgrammeResource", id, "RESOURCE_REMOVED", resource, null);
    const path = parentProgrammePath(resource);
    if (path) revalidatePath(path);
    return { ok: true, id };
  } catch (error) {
    return { ok: false, error: prismaError(error, "Could not remove resource") };
  }
}

export async function createAssessmentTask(input: AssessmentInput): Promise<ActionResult> {
  const userId = await actorId();
  if (!userId || !input.moduleId || !clean(input.title) || !validPositiveInteger(input.maxMarks, 10000) || input.maxMarks < 1 || !validPositiveInteger(input.order) || !Object.values(AssessmentKind).includes(input.kind)) return { ok: false, error: "Assessment fields are invalid" };
  try { const task = await prisma.assessmentTask.create({ data: { moduleId: input.moduleId, title: clean(input.title), instructions: input.instructions?.trim() || null, kind: input.kind, maxMarks: input.maxMarks, totalMarks: input.maxMarks, order: input.order, rubricCriteria: {} } }); await audit(userId, "AssessmentTask", task.id, "ASSESSMENT_CREATED", null, { title: task.title, kind: task.kind }); revalidatePath(`/admin/modules/${input.moduleId}/assessments`); revalidatePath(`/admin/modules/${input.moduleId}`); return { ok: true, id: task.id }; } catch (error) { return { ok: false, error: prismaError(error, "Could not create assessment") }; }
}

export async function updateAssessmentTask(id: string, input: Omit<AssessmentInput, "moduleId"> & { moduleId?: string }): Promise<ActionResult> {
  const userId = await actorId();
  if (!userId || !id || !clean(input.title) || !validPositiveInteger(input.maxMarks, 10000) || input.maxMarks < 1 || !validPositiveInteger(input.order) || !Object.values(AssessmentKind).includes(input.kind)) return { ok: false, error: "Assessment fields are invalid" };
  try { const before = await prisma.assessmentTask.findUnique({ where: { id } }); if (!before) return { ok: false, error: "Assessment not found" }; const task = await prisma.assessmentTask.update({ where: { id }, data: { title: clean(input.title), instructions: input.instructions?.trim() || null, kind: input.kind, maxMarks: input.maxMarks, totalMarks: input.maxMarks, order: input.order } }); await audit(userId, "AssessmentTask", id, "ASSESSMENT_UPDATED", before, { title: task.title, kind: task.kind }); revalidatePath(`/admin/modules/${task.moduleId}/assessments`); return { ok: true, id }; } catch (error) { return { ok: false, error: prismaError(error, "Could not update assessment") }; }
}

export async function createCurriculumTest(input: TestInput): Promise<ActionResult> {
  const userId = await actorId();
  if (!userId || curriculumParentCount(input) !== 1 || !clean(input.title) || !validPositiveInteger(input.order) || (input.durationMinutes !== undefined && !validPositiveInteger(input.durationMinutes, 1440)) || (input.passMark !== undefined && !validPositiveInteger(input.passMark, 100))) return { ok: false, error: "Test fields are invalid; choose one parent" };
  try {
    const test = await prisma.curriculumTest.create({ data: { ...curriculumParent(input), title: clean(input.title), durationMinutes: input.durationMinutes ?? null, passMark: input.passMark ?? null, order: input.order } });
    await audit(userId, "CurriculumTest", test.id, "TEST_CREATED", null, test);
    const path = parentProgrammePath(input);
    if (path) revalidatePath(path);
    return { ok: true, id: test.id };
  } catch (error) {
    return { ok: false, error: prismaError(error, "Could not create test") };
  }
}

export async function updateCurriculumTest(id: string, input: Omit<TestInput, keyof CurriculumParent> & CurriculumParent): Promise<ActionResult> {
  const userId = await actorId();
  if (!userId || !id || curriculumParentCount(input) !== 1 || !clean(input.title) || !validPositiveInteger(input.order) || (input.durationMinutes !== undefined && !validPositiveInteger(input.durationMinutes, 1440)) || (input.passMark !== undefined && !validPositiveInteger(input.passMark, 100))) return { ok: false, error: "Test fields are invalid; choose one parent" };
  try {
    const before = await prisma.curriculumTest.findUnique({ where: { id } });
    if (!before) return { ok: false, error: "Test not found" };
    const test = await prisma.curriculumTest.update({ where: { id }, data: { ...curriculumParent(input), title: clean(input.title), durationMinutes: input.durationMinutes ?? null, passMark: input.passMark ?? null, order: input.order } });
    await audit(userId, "CurriculumTest", id, "TEST_UPDATED", before, test);
    const path = parentProgrammePath(input);
    if (path) revalidatePath(path);
    return { ok: true, id };
  } catch (error) {
    return { ok: false, error: prismaError(error, "Could not update test") };
  }
}

export async function createCurriculumAssignment(input: AssignmentInput): Promise<ActionResult> {
  const userId = await actorId();
  if (!userId || curriculumParentCount(input) !== 1 || !clean(input.title) || input.evidenceRequirements.some((item) => !clean(item))) return { ok: false, error: "Assignment fields are invalid; choose one parent" };
  try {
    const assignment = await prisma.curriculumAssignment.create({ data: { ...curriculumParent(input), title: clean(input.title), instructions: input.instructions?.trim() || null, evidenceRequirements: input.evidenceRequirements.map(clean).filter(Boolean) } });
    await audit(userId, "CurriculumAssignment", assignment.id, "ASSIGNMENT_CREATED", null, assignment);
    const path = parentProgrammePath(input);
    if (path) revalidatePath(path);
    return { ok: true, id: assignment.id };
  } catch (error) {
    return { ok: false, error: prismaError(error, "Could not create assignment") };
  }
}

export async function updateCurriculumAssignment(id: string, input: AssignmentInput): Promise<ActionResult> {
  const userId = await actorId();
  if (!userId || !id || curriculumParentCount(input) !== 1 || !clean(input.title) || input.evidenceRequirements.some((item) => !clean(item))) return { ok: false, error: "Assignment fields are invalid; choose one parent" };
  try {
    const before = await prisma.curriculumAssignment.findUnique({ where: { id } });
    if (!before) return { ok: false, error: "Assignment not found" };
    const assignment = await prisma.curriculumAssignment.update({ where: { id }, data: { ...curriculumParent(input), title: clean(input.title), instructions: input.instructions?.trim() || null, evidenceRequirements: input.evidenceRequirements.map(clean).filter(Boolean) } });
    await audit(userId, "CurriculumAssignment", id, "ASSIGNMENT_UPDATED", before, assignment);
    const path = parentProgrammePath(input);
    if (path) revalidatePath(path);
    return { ok: true, id };
  } catch (error) {
    return { ok: false, error: prismaError(error, "Could not update assignment") };
  }
}
