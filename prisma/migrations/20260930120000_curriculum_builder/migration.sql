-- Curriculum builder additions. Existing learner-facing fields remain intact.
CREATE TYPE "QualificationStatus" AS ENUM ('DEVELOPMENT', 'ACTIVE', 'ARCHIVED');
CREATE TYPE "ModuleType" AS ENUM ('KNOWLEDGE', 'PRACTICAL', 'WORK_EXPERIENCE');
CREATE TYPE "ResourceKind" AS ENUM ('PDF', 'VIDEO', 'SLIDES', 'AUDIO', 'LINK');
CREATE TYPE "AssessmentKind" AS ENUM ('FORMATIVE', 'SUMMATIVE');

ALTER TABLE "Qualification" ADD COLUMN "status" "QualificationStatus" NOT NULL DEFAULT 'DEVELOPMENT';
CREATE UNIQUE INDEX "Qualification_saqaId_key" ON "Qualification"("saqaId");

ALTER TABLE "CourseModule" ADD COLUMN "code" TEXT;
ALTER TABLE "CourseModule" ADD COLUMN "type" "ModuleType" NOT NULL DEFAULT 'KNOWLEDGE';
ALTER TABLE "CourseModule" ADD COLUMN "notionalHours" INTEGER NOT NULL DEFAULT 0;
CREATE UNIQUE INDEX "CourseModule_code_key" ON "CourseModule"("code");

ALTER TABLE "Lesson" ADD COLUMN "topicId" TEXT;
ALTER TABLE "Lesson" ADD COLUMN "durationMinutes" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "AssessmentTask" ALTER COLUMN "instructions" DROP NOT NULL;
ALTER TABLE "AssessmentTask" ADD COLUMN "kind" "AssessmentKind" NOT NULL DEFAULT 'FORMATIVE';
ALTER TABLE "AssessmentTask" ADD COLUMN "maxMarks" INTEGER NOT NULL DEFAULT 100;
ALTER TABLE "AssessmentTask" ADD COLUMN "order" INTEGER NOT NULL DEFAULT 0;

CREATE TABLE "Topic" (
  "id" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "order" INTEGER NOT NULL DEFAULT 0,
  "moduleId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Topic_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "Topic_moduleId_title_key" ON "Topic"("moduleId", "title");
CREATE INDEX "Topic_moduleId_order_idx" ON "Topic"("moduleId", "order");

CREATE TABLE "LessonResource" (
  "id" TEXT NOT NULL,
  "kind" "ResourceKind" NOT NULL,
  "url" TEXT NOT NULL,
  "label" TEXT NOT NULL,
  "lessonId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "LessonResource_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "LessonResource_lessonId_idx" ON "LessonResource"("lessonId");

ALTER TABLE "Topic" ADD CONSTRAINT "Topic_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "CourseModule"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "LessonResource" ADD CONSTRAINT "LessonResource_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;
