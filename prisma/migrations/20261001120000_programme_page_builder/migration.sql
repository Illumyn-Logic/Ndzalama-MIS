-- Programme metadata and full curriculum page-builder content.
CREATE TYPE "DurationUnit" AS ENUM ('WEEKS', 'MONTHS', 'YEARS');
CREATE TYPE "ProgrammeDeliveryMode" AS ENUM ('FULL_TIME', 'PART_TIME', 'DISTANCE', 'BLENDED');
ALTER TYPE "AssessmentKind" ADD VALUE 'FISA';

ALTER TABLE "Qualification"
  ADD COLUMN "accreditation" TEXT,
  ADD COLUMN "durationValue" INTEGER NOT NULL DEFAULT 12,
  ADD COLUMN "durationUnit" "DurationUnit" NOT NULL DEFAULT 'MONTHS',
  ADD COLUMN "deliveryMode" "ProgrammeDeliveryMode" NOT NULL DEFAULT 'PART_TIME',
  ADD COLUMN "entryRequirements" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  ADD COLUMN "targetAudience" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  ADD COLUMN "benefits" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];

CREATE TABLE "ProgrammeResource" (
  "id" TEXT NOT NULL,
  "kind" "ResourceKind" NOT NULL,
  "url" TEXT NOT NULL,
  "label" TEXT NOT NULL,
  "qualificationId" TEXT,
  "moduleId" TEXT,
  "topicId" TEXT,
  "lessonId" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "ProgrammeResource_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "ProgrammeResource_one_parent_check" CHECK (
    num_nonnulls("qualificationId", "moduleId", "topicId", "lessonId") = 1
  )
);
CREATE INDEX "ProgrammeResource_qualificationId_idx" ON "ProgrammeResource"("qualificationId");
CREATE INDEX "ProgrammeResource_moduleId_idx" ON "ProgrammeResource"("moduleId");
CREATE INDEX "ProgrammeResource_topicId_idx" ON "ProgrammeResource"("topicId");
CREATE INDEX "ProgrammeResource_lessonId_idx" ON "ProgrammeResource"("lessonId");
ALTER TABLE "ProgrammeResource" ADD CONSTRAINT "ProgrammeResource_qualificationId_fkey" FOREIGN KEY ("qualificationId") REFERENCES "Qualification"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ProgrammeResource" ADD CONSTRAINT "ProgrammeResource_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "CourseModule"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ProgrammeResource" ADD CONSTRAINT "ProgrammeResource_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ProgrammeResource" ADD CONSTRAINT "ProgrammeResource_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE "CurriculumTest" (
  "id" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "durationMinutes" INTEGER,
  "passMark" INTEGER,
  "order" INTEGER NOT NULL DEFAULT 0,
  "moduleId" TEXT,
  "topicId" TEXT,
  "lessonId" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "CurriculumTest_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "CurriculumTest_one_parent_check" CHECK (num_nonnulls("moduleId", "topicId", "lessonId") = 1)
);
CREATE INDEX "CurriculumTest_moduleId_idx" ON "CurriculumTest"("moduleId");
CREATE INDEX "CurriculumTest_topicId_idx" ON "CurriculumTest"("topicId");
CREATE INDEX "CurriculumTest_lessonId_idx" ON "CurriculumTest"("lessonId");
ALTER TABLE "CurriculumTest" ADD CONSTRAINT "CurriculumTest_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "CourseModule"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "CurriculumTest" ADD CONSTRAINT "CurriculumTest_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "CurriculumTest" ADD CONSTRAINT "CurriculumTest_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE "CurriculumAssignment" (
  "id" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "instructions" TEXT,
  "evidenceRequirements" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  "moduleId" TEXT,
  "topicId" TEXT,
  "lessonId" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "CurriculumAssignment_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "CurriculumAssignment_one_parent_check" CHECK (num_nonnulls("moduleId", "topicId", "lessonId") = 1)
);
CREATE INDEX "CurriculumAssignment_moduleId_idx" ON "CurriculumAssignment"("moduleId");
CREATE INDEX "CurriculumAssignment_topicId_idx" ON "CurriculumAssignment"("topicId");
CREATE INDEX "CurriculumAssignment_lessonId_idx" ON "CurriculumAssignment"("lessonId");
ALTER TABLE "CurriculumAssignment" ADD CONSTRAINT "CurriculumAssignment_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "CourseModule"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "CurriculumAssignment" ADD CONSTRAINT "CurriculumAssignment_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "CurriculumAssignment" ADD CONSTRAINT "CurriculumAssignment_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;
