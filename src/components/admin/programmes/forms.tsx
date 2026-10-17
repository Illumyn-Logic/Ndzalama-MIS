'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as actions from '@/app/admin/programmes/actions';

const QualificationFramework = {
  LEGACY_UNIT_STANDARD: 'LEGACY_UNIT_STANDARD',
  QCTO_OCCUPATIONAL_CERTIFICATE: 'QCTO_OCCUPATIONAL_CERTIFICATE',
  SKILLS_PROGRAMME: 'SKILLS_PROGRAMME',
  SHORT_COURSE: 'SHORT_COURSE',
  REGULATORY_EXAM_PREP: 'REGULATORY_EXAM_PREP',
} as const;

type QualificationFramework = (typeof QualificationFramework)[keyof typeof QualificationFramework];

const DurationUnit = {
  WEEKS: 'WEEKS',
  MONTHS: 'MONTHS',
  YEARS: 'YEARS',
} as const;
type DurationUnit = (typeof DurationUnit)[keyof typeof DurationUnit];

const ProgrammeDeliveryMode = {
  FULL_TIME: 'FULL_TIME',
  PART_TIME: 'PART_TIME',
  DISTANCE: 'DISTANCE',
  BLENDED: 'BLENDED',
} as const;
type ProgrammeDeliveryMode = (typeof ProgrammeDeliveryMode)[keyof typeof ProgrammeDeliveryMode];

const QualificationStatus = {
  DEVELOPMENT: 'DEVELOPMENT',
  ACTIVE: 'ACTIVE',
  ARCHIVED: 'ARCHIVED',
} as const;
type QualificationStatus = (typeof QualificationStatus)[keyof typeof QualificationStatus];

const ModuleType = {
  KNOWLEDGE: 'KNOWLEDGE',
  PRACTICAL: 'PRACTICAL',
  WORK_EXPERIENCE: 'WORK_EXPERIENCE',
} as const;
type ModuleType = (typeof ModuleType)[keyof typeof ModuleType];

const ResourceKind = {
  PDF: 'PDF',
  VIDEO: 'VIDEO',
  SLIDES: 'SLIDES',
  AUDIO: 'AUDIO',
  LINK: 'LINK',
} as const;
type ResourceKind = (typeof ResourceKind)[keyof typeof ResourceKind];

const AssessmentKind = {
  FORMATIVE: 'FORMATIVE',
  SUMMATIVE: 'SUMMATIVE',
  FISA: 'FISA',
} as const;
type AssessmentKind = (typeof AssessmentKind)[keyof typeof AssessmentKind];

const inputClass = 'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#84ba3f] focus:ring-2 focus:ring-[#84ba3f]/30 dark:border-[#2e303a] dark:bg-[#0a0a0a] dark:text-white';
const buttonClass = 'rounded-lg bg-[#006600] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#03367A] focus:outline-none focus:ring-2 focus:ring-[#84ba3f] disabled:opacity-50';

function FormMessage({ message }: { message: string | null }) {
  return message ? <p role="alert" className="text-sm text-red-600 dark:text-red-300">{message}</p> : null;
}

type ProgrammeFormValue = {
  id: string;
  code: string;
  saqaId: string | null;
  qctoCode: string | null;
  title: string;
  framework: QualificationFramework;
  nqfLevel: number;
  credits: number;
  accreditation: string | null;
  shortDescription: string;
  fullDescription: string;
  entryRequirements: string[];
  targetAudience: string[];
  benefits: string[];
  durationValue: number;
  durationUnit: DurationUnit;
  deliveryMode: ProgrammeDeliveryMode;
  price: number;
  isActive: boolean;
  coverImageUrl: string | null;
  status: QualificationStatus;
};

const programmeTypes = [
  QualificationFramework.QCTO_OCCUPATIONAL_CERTIFICATE,
  QualificationFramework.SKILLS_PROGRAMME,
  QualificationFramework.SHORT_COURSE,
];

function lines(value: FormDataEntryValue | null) {
  return String(value ?? '').split('\n').map((item) => item.trim()).filter(Boolean);
}

export function QualificationForm({ qualification }: { qualification?: ProgrammeFormValue }) {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setMessage(null);
    const data = new FormData(event.currentTarget);
    const input = {
      registrationRef: String(data.get('registrationRef')),
      framework: String(data.get('framework')) as QualificationFramework,
      title: String(data.get('title')),
      nqfLevel: Number(data.get('nqfLevel')),
      credits: Number(data.get('credits')),
      accreditation: String(data.get('accreditation')),
      shortDescription: String(data.get('shortDescription')),
      fullDescription: String(data.get('fullDescription')),
      entryRequirements: lines(data.get('entryRequirements')),
      targetAudience: lines(data.get('targetAudience')),
      benefits: lines(data.get('benefits')),
      durationValue: Number(data.get('durationValue')),
      durationUnit: String(data.get('durationUnit')) as DurationUnit,
      deliveryMode: String(data.get('deliveryMode')) as ProgrammeDeliveryMode,
      price: Number(data.get('price')),
      isActive: data.get('isActive') === 'on',
      coverImageUrl: String(data.get('coverImageUrl')),
    };
    const result = qualification ? await actions.updateQualification(qualification.id, input) : await actions.createQualification(input);
    setBusy(false);
    if (!result.ok) { setMessage(result.error ?? 'Unable to save qualification'); return; }
    router.push(qualification ? `/admin/programmes/${qualification.id}` : `/admin/programmes/${result.id}`);
    router.refresh();
  }
  return <form onSubmit={submit} className="space-y-8" noValidate>
    <section className="space-y-4">
      <div><h2 className="font-bold text-slate-900 dark:text-white">Program Identity</h2><p className="text-sm text-slate-500">Enter the official title, type and registration reference.</p></div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-1 text-sm font-semibold md:col-span-2">Program Title *<input name="title" required defaultValue={qualification?.title ?? ''} placeholder="e.g. Occupational Certificate: Software Developer" className={inputClass} /></label>
        <label className="space-y-1 text-sm font-semibold">Program Type *<select name="framework" required defaultValue={qualification?.framework ?? QualificationFramework.QCTO_OCCUPATIONAL_CERTIFICATE} className={inputClass}>{programmeTypes.map((type) => <option key={type} value={type}>{type === QualificationFramework.QCTO_OCCUPATIONAL_CERTIFICATE ? 'Occupational Certificate' : type === QualificationFramework.SKILLS_PROGRAMME ? 'Skills Programme' : 'Short Course'}</option>)}</select></label>
        <label className="space-y-1 text-sm font-semibold">SAQA ID / Skills Programme Code *<input name="registrationRef" required defaultValue={qualification ? qualification.saqaId ?? qualification.qctoCode ?? qualification.code : ''} placeholder="97542 or SP-103300303" className={inputClass} /><span className="block text-xs font-normal text-slate-500">Use a numeric SAQA ID for qualifications or an SP-code for skills programmes.</span></label>
      </div>
    </section>
    <section className="space-y-4 border-t border-slate-200 pt-6 dark:border-[#2e303a]">
      <div><h2 className="font-bold text-slate-900 dark:text-white">Qualification Details</h2><p className="text-sm text-slate-500">Capture the level, credits and learner-facing information.</p></div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-1 text-sm font-semibold">NQF Level<input name="nqfLevel" type="number" min="1" max="10" required defaultValue={qualification?.nqfLevel ?? 5} className={inputClass} /></label>
        <label className="space-y-1 text-sm font-semibold">Credits<input name="credits" type="number" min="1" required defaultValue={qualification?.credits ?? 1} className={inputClass} /></label>
        <label className="space-y-1 text-sm font-semibold md:col-span-2">Accreditation<input name="accreditation" defaultValue={qualification?.accreditation ?? ''} placeholder="QCTO, ETDP SETA" className={inputClass} /></label>
        <label className="space-y-1 text-sm font-semibold md:col-span-2">Programme Description<textarea name="fullDescription" rows={5} defaultValue={qualification?.fullDescription ?? ''} className={inputClass} /></label>
        <label className="space-y-1 text-sm font-semibold">Entry Requirements<textarea name="entryRequirements" rows={3} defaultValue={qualification?.entryRequirements.join('\n') ?? ''} placeholder="One requirement per line" className={inputClass} /></label>
        <label className="space-y-1 text-sm font-semibold">Target Audience<textarea name="targetAudience" rows={3} defaultValue={qualification?.targetAudience.join('\n') ?? ''} placeholder="One audience per line" className={inputClass} /></label>
        <label className="space-y-1 text-sm font-semibold md:col-span-2">Benefits<textarea name="benefits" rows={3} defaultValue={qualification?.benefits.join('\n') ?? ''} placeholder="One benefit per line" className={inputClass} /></label>
        <input type="hidden" name="shortDescription" value={qualification?.shortDescription ?? ''} />
      </div>
    </section>
    <section className="space-y-4 border-t border-slate-200 pt-6 dark:border-[#2e303a]">
      <div><h2 className="font-bold text-slate-900 dark:text-white">Delivery and Pricing</h2><p className="text-sm text-slate-500">Define duration, delivery mode and programme cost.</p></div>
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="space-y-1 text-sm font-semibold">Duration *<input name="durationValue" type="number" min="1" max="600" required defaultValue={qualification?.durationValue ?? 12} className={inputClass} /></label>
        <label className="space-y-1 text-sm font-semibold">Duration Unit<select name="durationUnit" defaultValue={qualification?.durationUnit ?? DurationUnit.MONTHS} className={inputClass}>{Object.values(DurationUnit).map((unit) => <option key={unit}>{unit}</option>)}</select></label>
        <label className="space-y-1 text-sm font-semibold">Delivery Mode<select name="deliveryMode" defaultValue={qualification?.deliveryMode ?? ProgrammeDeliveryMode.PART_TIME} className={inputClass}>{Object.values(ProgrammeDeliveryMode).map((mode) => <option key={mode} value={mode}>{mode.replaceAll('_', ' ')}</option>)}</select></label>
        <label className="space-y-1 text-sm font-semibold sm:col-span-3">Program Cost (ZAR) *<input name="price" type="number" min="0" step="0.01" required defaultValue={qualification?.price ?? 0} className={inputClass} /></label>
      </div>
    </section>
    <section className="space-y-4 border-t border-slate-200 pt-6 dark:border-[#2e303a]">
      <div><h2 className="font-bold text-slate-900 dark:text-white">Availability and Image</h2><p className="text-sm text-slate-500">Active programmes can be used for applications and enrolment.</p></div>
      <label className="flex items-start gap-3 text-sm"><input name="isActive" type="checkbox" defaultChecked={qualification?.isActive ?? false} className="mt-1 size-4 accent-[#006600]" /><span><strong>Active Program</strong><span className="block text-slate-500">Make this programme available for applications and enrolment.</span></span></label>
      <label className="block space-y-1 text-sm font-semibold">Program Image URL<input name="coverImageUrl" type="url" defaultValue={qualification?.coverImageUrl ?? ''} placeholder="https://..." className={inputClass} /><span className="block text-xs font-normal text-slate-500">Provide a hosted JPG, PNG or WebP image URL. File uploads need a storage provider.</span></label>
    </section>
    <FormMessage message={message} /><div className="flex flex-wrap gap-3"><button disabled={busy} className={buttonClass}>{busy ? 'Saving...' : qualification ? 'Save changes' : 'Create Program/Course'}</button><Link href="/admin/programmes" className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold dark:border-[#2e303a]">Cancel</Link></div>
  </form>;
}

export function ModuleForm({ qualificationId, module }: { qualificationId: string; module?: { id: string; code: string | null; title: string; type: ModuleType; credits: number; notionalHours: number; orderIndex: number } }) {
  const router = useRouter(); const [message, setMessage] = useState<string | null>(null); const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setBusy(true); setMessage(null); const data = new FormData(event.currentTarget); const input = { qualificationId, code: String(data.get('code')), title: String(data.get('title')), type: String(data.get('type')) as ModuleType, credits: Number(data.get('credits')), notionalHours: Number(data.get('notionalHours')), order: Number(data.get('order')) }; const result = module ? await actions.updateCourseModule(module.id, input) : await actions.createCourseModule(input); setBusy(false); if (!result.ok) { setMessage(result.error ?? 'Unable to save module'); return; } router.push(module ? `/admin/modules/${module.id}` : `/admin/programmes/${qualificationId}`); router.refresh(); }
  return <form onSubmit={submit} className="space-y-5"><div className="grid gap-5 md:grid-cols-2"><label className="space-y-1 text-sm font-semibold">Code<input name="code" required defaultValue={module?.code ?? ''} placeholder="KM-01" className={inputClass} /></label><label className="space-y-1 text-sm font-semibold">Title<input name="title" required defaultValue={module?.title ?? ''} className={inputClass} /></label><label className="space-y-1 text-sm font-semibold">Type<select name="type" defaultValue={module?.type ?? ModuleType.KNOWLEDGE} className={inputClass}>{Object.values(ModuleType).map((type) => <option key={type}>{type}</option>)}</select></label><label className="space-y-1 text-sm font-semibold">Credits<input name="credits" type="number" min="0" required defaultValue={module?.credits ?? 1} className={inputClass} /></label><label className="space-y-1 text-sm font-semibold">Notional hours<input name="notionalHours" type="number" min="0" required defaultValue={module?.notionalHours ?? 0} className={inputClass} /></label><label className="space-y-1 text-sm font-semibold">Order<input name="order" type="number" min="0" required defaultValue={module?.orderIndex ?? 0} className={inputClass} /></label></div><FormMessage message={message} /><button disabled={busy} className={buttonClass}>{busy ? 'Saving...' : module ? 'Save module' : 'Add module'}</button></form>;
}

export function TopicLessonForms({ moduleId }: { moduleId: string }) {
  const router = useRouter(); const [message, setMessage] = useState<string | null>(null);
  async function addTopic(event: FormEvent<HTMLFormElement>) { event.preventDefault(); const data = new FormData(event.currentTarget); const result = await actions.createTopic({ moduleId, title: String(data.get('title')), order: Number(data.get('order')) }); setMessage(result.ok ? 'Topic added' : result.error ?? 'Unable to add topic'); if (result.ok) { event.currentTarget.reset(); router.refresh(); } }
  return <div className="border-t border-slate-200 pt-5 dark:border-[#2e303a]"><h3 className="font-bold">Add topic</h3><form onSubmit={addTopic} className="mt-3 flex flex-wrap gap-3"><input name="title" required placeholder="Topic title" className={inputClass + ' min-w-64 flex-1'} /><input name="order" type="number" min="0" defaultValue="0" className={inputClass + ' w-24'} aria-label="Topic order" /><button className={buttonClass}>Add topic</button></form><FormMessage message={message} /></div>;
}

export function LessonForm({ topicId, moduleId, lesson }: { topicId: string; moduleId: string; lesson?: { id: string; title: string; orderIndex: number; durationMinutes: number } }) {
  const router = useRouter(); const [message, setMessage] = useState<string | null>(null);
  async function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); const data = new FormData(event.currentTarget); const input = { topicId, title: String(data.get('title')), order: Number(data.get('order')), durationMinutes: Number(data.get('durationMinutes')) }; const result = lesson ? await actions.updateLesson(lesson.id, input) : await actions.createLesson(input); setMessage(result.ok ? 'Saved' : result.error ?? 'Unable to save lesson'); if (result.ok) { if (!lesson) event.currentTarget.reset(); router.refresh(); } }
  return <form onSubmit={submit} className="mt-2 grid gap-2 sm:grid-cols-[1fr_6rem_8rem_auto]"><input name="title" required defaultValue={lesson?.title ?? ''} placeholder="Lesson title" className={inputClass} /><input name="order" type="number" min="0" defaultValue={lesson?.orderIndex ?? 0} aria-label="Lesson order" className={inputClass} /><input name="durationMinutes" type="number" min="0" max="1440" defaultValue={lesson?.durationMinutes ?? 30} aria-label="Duration in minutes" className={inputClass} /><button className={buttonClass}>{lesson ? 'Save' : 'Add'}</button>{message && <span className="text-xs text-slate-500 sm:col-span-4">{message}</span>}</form>;
}

export function TopicEditForm({ topic }: { topic: { id: string; moduleId: string; title: string; order: number } }) {
  const router = useRouter(); const [editing, setEditing] = useState(false); const [message, setMessage] = useState<string | null>(null);
  async function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); const data = new FormData(event.currentTarget); const result = await actions.updateTopic(topic.id, { title: String(data.get('title')), order: Number(data.get('order')) }); if (!result.ok) setMessage(result.error ?? 'Unable to update topic'); else { setEditing(false); router.refresh(); } }
  if (!editing) return <button type="button" onClick={() => setEditing(true)} className="text-xs font-semibold text-[#006600] hover:underline dark:text-[#84ba3f]">Edit topic</button>;
  return <form onSubmit={submit} className="mt-2 flex flex-wrap gap-2"><input name="title" defaultValue={topic.title} className={inputClass + ' flex-1'} /><input name="order" type="number" min="0" defaultValue={topic.order} className={inputClass + ' w-20'} /><button className={buttonClass}>Save</button><button type="button" onClick={() => setEditing(false)} className="rounded-lg border px-3 py-2 text-sm">Cancel</button>{message && <span className="w-full text-xs text-red-600">{message}</span>}</form>;
}

export function RemoveResourceButton({ id }: { id: string }) {
  const router = useRouter(); const [message, setMessage] = useState<string | null>(null);
  async function remove() { const result = await actions.removeLessonResource(id); if (!result.ok) setMessage(result.error ?? 'Unable to remove resource'); else router.refresh(); }
  return <span><button type="button" onClick={remove} className="text-xs font-semibold text-red-600 hover:underline">Remove</button>{message && <span className="ml-2 text-xs text-red-600">{message}</span>}</span>;
}

export function AssessmentForm({ moduleId, task }: { moduleId: string; task?: { id: string; title: string; instructions: string | null; kind: AssessmentKind; maxMarks: number; order: number } }) {
  const router = useRouter(); const [message, setMessage] = useState<string | null>(null); const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setBusy(true); const data = new FormData(event.currentTarget); const input = { moduleId, title: String(data.get('title')), instructions: String(data.get('instructions') ?? ''), kind: String(data.get('kind')) as AssessmentKind, maxMarks: Number(data.get('maxMarks')), order: Number(data.get('order')) }; const result = task ? await actions.updateAssessmentTask(task.id, input) : await actions.createAssessmentTask(input); setBusy(false); if (!result.ok) { setMessage(result.error ?? 'Unable to save assessment'); return; } router.push(`/admin/modules/${moduleId}/assessments`); router.refresh(); }
  return <form onSubmit={submit} className="space-y-5"><label className="block space-y-1 text-sm font-semibold">Title<input name="title" required defaultValue={task?.title ?? ''} className={inputClass} /></label><label className="block space-y-1 text-sm font-semibold">Instructions<textarea name="instructions" defaultValue={task?.instructions ?? ''} className={inputClass} rows={4} /></label><div className="grid gap-5 md:grid-cols-3"><label className="space-y-1 text-sm font-semibold">Kind<select name="kind" defaultValue={task?.kind ?? AssessmentKind.FORMATIVE} className={inputClass}>{Object.values(AssessmentKind).map((kind) => <option key={kind}>{kind}</option>)}</select></label><label className="space-y-1 text-sm font-semibold">Max marks<input name="maxMarks" type="number" min="1" defaultValue={task?.maxMarks ?? 100} className={inputClass} /></label><label className="space-y-1 text-sm font-semibold">Order<input name="order" type="number" min="0" defaultValue={task?.order ?? 0} className={inputClass} /></label></div><FormMessage message={message} /><button disabled={busy} className={buttonClass}>{busy ? 'Saving...' : task ? 'Save assessment' : 'Add assessment'}</button></form>;
}

export function ResourceForm({ lessonId, moduleId }: { lessonId: string; moduleId: string }) {
  const router = useRouter(); const [message, setMessage] = useState<string | null>(null);
  async function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); const data = new FormData(event.currentTarget); const result = await actions.addLessonResource({ lessonId, label: String(data.get('label')), url: String(data.get('url')), kind: String(data.get('kind')) as ResourceKind }); setMessage(result.ok ? 'Resource added' : result.error ?? 'Unable to add resource'); if (result.ok) { event.currentTarget.reset(); router.refresh(); } }
  return <form onSubmit={submit} className="mt-2 grid gap-2 sm:grid-cols-[1fr_1fr_auto_auto]"><input name="label" required placeholder="Resource label" className={inputClass} /><input name="url" type="url" required placeholder="https://..." className={inputClass} /><select name="kind" className={inputClass}>{Object.values(ResourceKind).map((kind) => <option key={kind}>{kind}</option>)}</select><button className={buttonClass}>Add</button>{message && <span className="text-xs text-slate-500 sm:col-span-4">{message}</span>}</form>;
}

type BuilderParent = { qualificationId?: string; moduleId?: string; topicId?: string; lessonId?: string };

export function ProgrammeResourceForm({ parent }: { parent: BuilderParent }) {
  const router = useRouter(); const [message, setMessage] = useState<string | null>(null);
  async function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); const data = new FormData(event.currentTarget); const result = await actions.addProgrammeResource({ ...parent, label: String(data.get('label')), url: String(data.get('url')), kind: String(data.get('kind')) as ResourceKind }); setMessage(result.ok ? 'Resource added' : result.error ?? 'Unable to add resource'); if (result.ok) { event.currentTarget.reset(); router.refresh(); } }
  return <form onSubmit={submit} className="grid gap-2 sm:grid-cols-[1fr_1fr_auto_auto]"><input name="label" required aria-label="Resource label" placeholder="Resource label" className={inputClass} /><input name="url" required type="url" aria-label="Resource URL" placeholder="https://..." className={inputClass} /><select name="kind" aria-label="Resource type" className={inputClass}>{Object.values(ResourceKind).map((kind) => <option key={kind}>{kind}</option>)}</select><button className={buttonClass}>Add resource</button>{message && <span className="text-xs text-slate-500 sm:col-span-4">{message}</span>}</form>;
}

export function CurriculumTestForm({ parent, test }: { parent: BuilderParent; test?: { id: string; title: string; durationMinutes: number | null; passMark: number | null; order: number } }) {
  const router = useRouter(); const [message, setMessage] = useState<string | null>(null);
  async function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); const data = new FormData(event.currentTarget); const input = { ...parent, title: String(data.get('title')), order: Number(data.get('order')), durationMinutes: Number(data.get('durationMinutes')) || undefined, passMark: Number(data.get('passMark')) || undefined }; const result = test ? await actions.updateCurriculumTest(test.id, input) : await actions.createCurriculumTest(input); setMessage(result.ok ? test ? 'Test saved' : 'Test added' : result.error ?? 'Unable to save test'); if (result.ok) router.refresh(); }
  return <form onSubmit={submit} className="grid gap-2 sm:grid-cols-[1fr_7rem_7rem_5rem_auto]"><input name="title" required aria-label="Test title" placeholder="Test title" defaultValue={test?.title ?? ''} className={inputClass} /><input name="durationMinutes" type="number" min="1" placeholder="Minutes" aria-label="Duration in minutes" defaultValue={test?.durationMinutes ?? ''} className={inputClass} /><input name="passMark" type="number" min="0" max="100" placeholder="Pass %" aria-label="Pass mark percentage" defaultValue={test?.passMark ?? ''} className={inputClass} /><input name="order" type="number" min="0" defaultValue={test?.order ?? 0} aria-label="Test order" className={inputClass} /><button className={buttonClass}>{test ? 'Save test' : 'Add test'}</button>{message && <span className="text-xs text-slate-500 sm:col-span-5">{message}</span>}</form>;
}

export function CurriculumAssignmentForm({ parent, assignment }: { parent: BuilderParent; assignment?: { id: string; title: string; instructions: string | null; evidenceRequirements: string[] } }) {
  const router = useRouter(); const [message, setMessage] = useState<string | null>(null);
  async function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); const data = new FormData(event.currentTarget); const input = { ...parent, title: String(data.get('title')), instructions: String(data.get('instructions') ?? ''), evidenceRequirements: lines(data.get('evidenceRequirements')) }; const result = assignment ? await actions.updateCurriculumAssignment(assignment.id, input) : await actions.createCurriculumAssignment(input); setMessage(result.ok ? assignment ? 'Assignment saved' : 'Assignment added' : result.error ?? 'Unable to save assignment'); if (result.ok) router.refresh(); }
  return <form onSubmit={submit} className="grid gap-2"><input name="title" required aria-label="Assignment title" placeholder="Practical activity title" defaultValue={assignment?.title ?? ''} className={inputClass} /><textarea name="instructions" rows={2} aria-label="Assignment instructions" placeholder="Instructions" defaultValue={assignment?.instructions ?? ''} className={inputClass} /><textarea name="evidenceRequirements" rows={2} aria-label="Evidence requirements" placeholder="Evidence requirements, one per line" defaultValue={assignment?.evidenceRequirements.join('\n') ?? ''} className={inputClass} /><button className={buttonClass + ' justify-self-start'}>{assignment ? 'Save assignment' : 'Add assignment'}</button>{message && <span className="text-xs text-slate-500">{message}</span>}</form>;
}

export function RemoveProgrammeResourceButton({ id }: { id: string }) {
  const router = useRouter(); const [message, setMessage] = useState<string | null>(null);
  async function remove() { if (!window.confirm('Remove this resource?')) return; const result = await actions.removeProgrammeResource(id); setMessage(result.ok ? null : result.error ?? 'Unable to remove resource'); if (result.ok) router.refresh(); }
  return <span><button type="button" onClick={remove} className="ml-2 text-xs font-semibold text-red-700 hover:underline dark:text-red-300">Remove</button>{message && <span role="alert" className="ml-2 text-xs text-red-600">{message}</span>}</span>;
}

export function ProgrammeAvailabilityActions({ id, isActive, status }: { id: string; isActive: boolean; status: QualificationStatus }) {
  const router = useRouter(); const [message, setMessage] = useState<string | null>(null); const [busy, setBusy] = useState(false);
  async function toggle() { setBusy(true); const nextStatus = status === QualificationStatus.ARCHIVED ? QualificationStatus.DEVELOPMENT : isActive ? QualificationStatus.DEVELOPMENT : QualificationStatus.ACTIVE; const result = await actions.setQualificationStatus(id, nextStatus); setBusy(false); setMessage(result.ok ? null : result.error ?? 'Unable to update availability'); if (result.ok) router.refresh(); }
  async function archive() { if (!window.confirm('Archive this programme? It will no longer be available for applications.')) return; setBusy(true); const result = await actions.archiveQualification(id); setBusy(false); setMessage(result.ok ? null : result.error ?? 'Unable to archive programme'); if (result.ok) router.refresh(); }
  return <div className="flex flex-wrap items-center gap-2"><button type="button" disabled={busy} onClick={toggle} className="rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold disabled:opacity-50 dark:border-[#2e303a]">{status === QualificationStatus.ARCHIVED ? 'Restore as draft' : isActive ? 'Deactivate' : 'Make active'}</button><button type="button" disabled={busy || status === QualificationStatus.ARCHIVED} onClick={archive} className="rounded-md border border-red-300 px-3 py-2 text-sm font-semibold text-red-700 disabled:opacity-50 dark:border-red-900 dark:text-red-300">Archive</button>{message && <span role="alert" className="text-sm text-red-600">{message}</span>}</div>;
}
