-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'REGISTRAR', 'FINANCE_OFFICER', 'FACILITATOR', 'ASSESSOR', 'MODERATOR', 'SME_MENTOR', 'HOST_EMPLOYER', 'LEARNER', 'PROSPECTIVE_LEARNER');

-- CreateEnum
CREATE TYPE "EquityGroup" AS ENUM ('AFRICAN', 'COLOURED', 'INDIAN', 'WHITE', 'OTHER');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY');

-- CreateEnum
CREATE TYPE "CitizenStatus" AS ENUM ('SA_CITIZEN', 'PERMANENT_RESIDENT', 'FOREIGN_NATIONAL_WITH_PERMIT', 'OTHER');

-- CreateEnum
CREATE TYPE "SocioEconomicStatus" AS ENUM ('EMPLOYED', 'UNEMPLOYED', 'SELF_EMPLOYED', 'STUDENT_SCHOLAR');

-- CreateEnum
CREATE TYPE "DisabilityType" AS ENUM ('NONE', 'SIGHT', 'HEARING', 'PHYSICAL', 'INTELLECTUAL', 'COMMUNICATION', 'EMOTIONAL', 'MULTIPLE');

-- CreateEnum
CREATE TYPE "QualificationFramework" AS ENUM ('LEGACY_UNIT_STANDARD', 'QCTO_OCCUPATIONAL_CERTIFICATE', 'SKILLS_PROGRAMME', 'SHORT_COURSE', 'REGULATORY_EXAM_PREP');

-- CreateEnum
CREATE TYPE "ModuleCategory" AS ENUM ('UNIT_STANDARD', 'KNOWLEDGE_MODULE', 'PRACTICAL_MODULE', 'WORKPLACE_MODULE', 'GENERAL_TOPIC');

-- CreateEnum
CREATE TYPE "DeliveryMode" AS ENUM ('CONTACT_CLASSROOM', 'DISTANCE_ONLINE', 'BLENDED_HYBRID', 'WORKPLACE_BASED');

-- CreateEnum
CREATE TYPE "ProgrammeDeliveryMode" AS ENUM ('FULL_TIME', 'PART_TIME', 'DISTANCE', 'BLENDED');

-- CreateEnum
CREATE TYPE "DurationUnit" AS ENUM ('WEEKS', 'MONTHS', 'YEARS');

-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('SUBMITTED', 'UNDER_REVIEW', 'DOCUMENTS_VERIFIED', 'INVOICED', 'PAYMENT_CONFIRMED', 'ACCEPTED_ENROLLED', 'REJECTED', 'WAITLISTED');

-- CreateEnum
CREATE TYPE "EnrollmentStatus" AS ENUM ('APPLIED', 'ENROLLED', 'ACTIVE', 'COMPLETED', 'IN_TRAINING', 'POE_SUBMITTED', 'ASSESSMENT_IN_PROGRESS', 'MODERATION_IN_PROGRESS', 'COMPETENT_CERTIFIED', 'NOT_YET_COMPETENT', 'WITHDRAWN', 'DEFERRED');

-- CreateEnum
CREATE TYPE "InterventionType" AS ENUM ('LEARNERSHIP', 'SHORT_SKILLS', 'APPRENTICESHIP', 'INTERNSHIP');

-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('DRAFT', 'ISSUED', 'PAID', 'OVERDUE', 'VOID');

-- CreateEnum
CREATE TYPE "PaymentProvider" AS ENUM ('PAYFAST', 'STITCH', 'PAYSHARP', 'MANUAL_EFT');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'SUCCESS', 'FAILED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "AssessmentOutcome" AS ENUM ('PENDING_SUBMISSION', 'SUBMITTED', 'UNDER_ASSESSMENT', 'COMPETENT', 'NOT_YET_COMPETENT', 'REMEDIATION_REQUIRED', 'MODERATED_CONFIRMED');

-- CreateEnum
CREATE TYPE "ModerationDecision" AS ENUM ('UPHELD', 'OVERTURNED', 'SAMPLE_EXPANSION_REQUIRED');

-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "PostCategory" AS ENUM ('ANNOUNCEMENT', 'SETA_REGULATORY_UPDATE', 'COURSE_INTAKE', 'INDUSTRY_NEWS', 'SUCCESS_STORY', 'TRAINING_TIP');

-- CreateEnum
CREATE TYPE "QualificationStatus" AS ENUM ('DEVELOPMENT', 'ACTIVE', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "ModuleType" AS ENUM ('KNOWLEDGE', 'PRACTICAL', 'WORK_EXPERIENCE');

-- CreateEnum
CREATE TYPE "ResourceKind" AS ENUM ('PDF', 'VIDEO', 'SLIDES', 'AUDIO', 'LINK');

-- CreateEnum
CREATE TYPE "AssessmentKind" AS ENUM ('FORMATIVE', 'SUMMATIVE', 'FISA');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "orgEmail" TEXT,
    "emailVerified" TIMESTAMP(3),
    "passwordHash" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'LEARNER',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "avatarUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "studentNumber" TEXT,
    "idNumber" TEXT,
    "passportNumber" TEXT,
    "title" TEXT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "middleName" TEXT,
    "initials" TEXT,
    "idOrPassportNumber" TEXT NOT NULL,
    "alternateIdType" TEXT,
    "isPassport" BOOLEAN NOT NULL DEFAULT false,
    "passportCountry" TEXT,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "gender" "Gender" NOT NULL,
    "equity" "EquityGroup" NOT NULL,
    "citizenStatus" "CitizenStatus" NOT NULL DEFAULT 'SA_CITIZEN',
    "citizenResidencyStatus" TEXT,
    "homeLanguage" TEXT NOT NULL DEFAULT 'English',
    "homeLanguageOther" TEXT,
    "nationality" TEXT,
    "nationalityOther" TEXT,
    "socioEconomicStatus" "SocioEconomicStatus" NOT NULL DEFAULT 'EMPLOYED',
    "disability" "DisabilityType" NOT NULL DEFAULT 'NONE',
    "seeingRating" TEXT,
    "hearingRating" TEXT,
    "communicatingRating" TEXT,
    "walkingRating" TEXT,
    "rememberingRating" TEXT,
    "selfcareRating" TEXT,
    "phone" TEXT NOT NULL,
    "alternativePhone" TEXT,
    "faxNumber" TEXT,
    "currentOccupation" TEXT,
    "yearsInOccupation" INTEGER,
    "experienceInOccupation" TEXT,
    "physicalCode" TEXT,
    "streetAddress" TEXT NOT NULL,
    "physicalAddressLine2" TEXT,
    "physicalAddressLine3" TEXT,
    "physicalSuburb" TEXT,
    "physicalCity" TEXT,
    "suburbCity" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "municipality" TEXT,
    "isUrban" BOOLEAN NOT NULL DEFAULT true,
    "postalAddressSameAsPhysical" BOOLEAN,
    "postalAddress" TEXT,
    "postalAddressLine1" TEXT,
    "postalAddressLine2" TEXT,
    "postalAddressLine3" TEXT,
    "postalSuburb" TEXT,
    "postalCity" TEXT,
    "postalProvince" TEXT,
    "postalUrbanRural" TEXT,
    "postalMunicipality" TEXT,
    "statsSAAreaCode" TEXT,
    "lastSchoolEmis" TEXT,
    "lastSchoolYear" INTEGER,
    "popiaConsentStatus" TEXT,
    "highestQualification" TEXT,
    "highestEducationDescription" TEXT,
    "nqfLevelAttained" INTEGER,
    "setaAssessorRegNo" TEXT,
    "setaModeratorRegNo" TEXT,
    "employerName" TEXT,
    "employerSdlNumber" TEXT,
    "sponsorRef" TEXT,
    "popiaConsentSigned" BOOLEAN NOT NULL DEFAULT false,
    "popiaConsentDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "coverImage" TEXT,
    "category" "PostCategory" NOT NULL DEFAULT 'ANNOUNCEMENT',
    "status" "PostStatus" NOT NULL DEFAULT 'DRAFT',
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "tags" TEXT[],
    "authorId" TEXT NOT NULL,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NewsletterSubscriber" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "subscribedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NewsletterSubscriber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactInquiry" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "isResolved" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContactInquiry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Qualification" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "saqaId" TEXT,
    "qctoCode" TEXT,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "framework" "QualificationFramework" NOT NULL DEFAULT 'LEGACY_UNIT_STANDARD',
    "accreditation" TEXT,
    "nqfLevel" INTEGER NOT NULL DEFAULT 5,
    "credits" INTEGER NOT NULL,
    "durationMonths" INTEGER NOT NULL DEFAULT 12,
    "durationValue" INTEGER NOT NULL DEFAULT 12,
    "durationUnit" "DurationUnit" NOT NULL DEFAULT 'MONTHS',
    "deliveryMode" "ProgrammeDeliveryMode" NOT NULL DEFAULT 'PART_TIME',
    "shortDescription" TEXT NOT NULL,
    "fullDescription" TEXT NOT NULL,
    "entryRequirements" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "targetAudience" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "benefits" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "price" DECIMAL(10,2) NOT NULL,
    "coverImageUrl" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "status" "QualificationStatus" NOT NULL DEFAULT 'DEVELOPMENT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Qualification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseModule" (
    "id" TEXT NOT NULL,
    "qualificationId" TEXT NOT NULL,
    "moduleCode" TEXT NOT NULL,
    "code" TEXT,
    "title" TEXT NOT NULL,
    "category" "ModuleCategory" NOT NULL DEFAULT 'UNIT_STANDARD',
    "unitStandardId" TEXT,
    "credits" INTEGER NOT NULL,
    "durationDays" INTEGER,
    "individualPrice" DECIMAL(10,2),
    "summary" TEXT,
    "orderIndex" INTEGER NOT NULL DEFAULT 0,
    "type" "ModuleType" NOT NULL DEFAULT 'KNOWLEDGE',
    "notionalHours" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CourseModule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lesson" (
    "id" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,
    "topicId" TEXT,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "orderIndex" INTEGER NOT NULL DEFAULT 0,
    "durationMinutes" INTEGER NOT NULL DEFAULT 0,
    "contentBody" TEXT,
    "resourceUrls" TEXT[],
    "videoEmbedUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Topic" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "moduleId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
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

-- CreateTable
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

    CONSTRAINT "ProgrammeResource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CampusVenue" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "contactPerson" TEXT,
    "contactPhone" TEXT,
    "isVirtual" BOOLEAN NOT NULL DEFAULT false,
    "virtualLink" TEXT,

    CONSTRAINT "CampusVenue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cohort" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "qualificationId" TEXT NOT NULL,
    "venueId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "deliveryMode" "DeliveryMode" NOT NULL DEFAULT 'BLENDED_HYBRID',
    "capacity" INTEGER NOT NULL DEFAULT 25,
    "isEnrollmentOpen" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cohort_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CohortFacilitator" (
    "id" TEXT NOT NULL,
    "cohortId" TEXT NOT NULL,
    "facilitatorId" TEXT NOT NULL,
    "isLead" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "CohortFacilitator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HostEmployer" (
    "id" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "tradingName" TEXT,
    "sdlNumber" TEXT NOT NULL,
    "setaAffiliation" TEXT NOT NULL,
    "contactPersonName" TEXT NOT NULL,
    "contactEmail" TEXT NOT NULL,
    "contactPhone" TEXT NOT NULL,
    "physicalAddress" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HostEmployer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Application" (
    "id" TEXT NOT NULL,
    "applicationNumber" TEXT NOT NULL,
    "applicantId" TEXT NOT NULL,
    "qualificationId" TEXT NOT NULL,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'SUBMITTED',
    "preferredCampus" TEXT,
    "fundingType" TEXT NOT NULL DEFAULT 'Self-Funded',
    "notes" TEXT,
    "idDocumentUrl" TEXT,
    "matricCertificateUrl" TEXT,
    "cvUrl" TEXT,
    "proofOfPaymentUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Enrollment" (
    "id" TEXT NOT NULL,
    "enrollmentNumber" TEXT NOT NULL,
    "learnerId" TEXT NOT NULL,
    "qualificationId" TEXT NOT NULL,
    "cohortId" TEXT,
    "hostEmployerId" TEXT,
    "status" "EnrollmentStatus" NOT NULL DEFAULT 'ENROLLED',
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3),
    "fundingSource" TEXT,
    "completionDate" TIMESTAMP(3),
    "finalResult" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Enrollment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkplacePlacement" (
    "id" TEXT NOT NULL,
    "enrollmentId" TEXT NOT NULL,
    "hostEmployerId" TEXT NOT NULL,
    "mentorId" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "mentorSignOff" BOOLEAN NOT NULL DEFAULT false,
    "signOffDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkplacePlacement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LogbookEntry" (
    "id" TEXT NOT NULL,
    "placementId" TEXT NOT NULL,
    "activityDate" TIMESTAMP(3) NOT NULL,
    "hoursSpent" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "evidenceUrl" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "verifiedAt" TIMESTAMP(3),

    CONSTRAINT "LogbookEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssessmentTask" (
    "id" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "instructions" TEXT,
    "kind" "AssessmentKind" NOT NULL DEFAULT 'FORMATIVE',
    "maxMarks" INTEGER NOT NULL DEFAULT 100,
    "order" INTEGER NOT NULL DEFAULT 0,
    "totalMarks" INTEGER NOT NULL DEFAULT 100,
    "passPercentage" INTEGER NOT NULL DEFAULT 50,
    "rubricCriteria" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AssessmentTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
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

    CONSTRAINT "CurriculumTest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CurriculumAssignment" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "instructions" TEXT,
    "evidenceRequirements" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "moduleId" TEXT,
    "topicId" TEXT,
    "lessonId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CurriculumAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssessmentSubmission" (
    "id" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,
    "enrollmentId" TEXT NOT NULL,
    "attemptNumber" INTEGER NOT NULL DEFAULT 1,
    "fileUrls" TEXT[],
    "submissionNotes" TEXT,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "outcome" "AssessmentOutcome" NOT NULL DEFAULT 'SUBMITTED',
    "scoreAchieved" DECIMAL(5,2),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AssessmentSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssessmentReview" (
    "id" TEXT NOT NULL,
    "submissionId" TEXT NOT NULL,
    "assessorId" TEXT NOT NULL,
    "isCompetent" BOOLEAN NOT NULL,
    "marksAwarded" DECIMAL(5,2) NOT NULL,
    "feedbackReport" TEXT NOT NULL,
    "remediationPlan" TEXT,
    "assessorSignature" TEXT NOT NULL,
    "reviewedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AssessmentReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModerationReview" (
    "id" TEXT NOT NULL,
    "submissionId" TEXT NOT NULL,
    "moderatorId" TEXT NOT NULL,
    "decision" "ModerationDecision" NOT NULL DEFAULT 'UPHELD',
    "moderationReport" TEXT NOT NULL,
    "moderatorSignature" TEXT NOT NULL,
    "moderatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ModerationReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LessonProgress" (
    "id" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "enrollmentId" TEXT NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "LessonProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AttendanceRecord" (
    "id" TEXT NOT NULL,
    "cohortId" TEXT NOT NULL,
    "learnerId" TEXT NOT NULL,
    "sessionDate" TIMESTAMP(3) NOT NULL,
    "isPresent" BOOLEAN NOT NULL DEFAULT true,
    "notes" TEXT,

    CONSTRAINT "AttendanceRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Certificate" (
    "id" TEXT NOT NULL,
    "certificateNumber" TEXT NOT NULL,
    "verificationHash" TEXT NOT NULL,
    "learnerId" TEXT NOT NULL,
    "enrollmentId" TEXT NOT NULL,
    "issueDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pdfDownloadUrl" TEXT NOT NULL,
    "setaEndorsementRef" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Certificate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "action" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "details" JSONB,
    "before" JSONB,
    "after" JSONB,
    "ipAddress" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Intervention" (
    "id" TEXT NOT NULL,
    "enrollmentId" TEXT,
    "type" "InterventionType" NOT NULL,
    "funder" TEXT,
    "stipendAmount" DECIMAL(10,2),
    "trancheSchedule" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Intervention_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssessorRegistry" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "fullName" TEXT NOT NULL,
    "setaRegistrationNumber" TEXT NOT NULL,
    "scope" TEXT[],
    "expiryDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AssessorRegistry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "enrollmentId" TEXT,
    "lineItems" JSONB NOT NULL,
    "amountDue" DECIMAL(10,2) NOT NULL,
    "status" "InvoiceStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "invoiceId" TEXT NOT NULL,
    "provider" "PaymentProvider" NOT NULL,
    "providerRef" TEXT,
    "amount" DECIMAL(10,2) NOT NULL,
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "rawWebhook" JSONB,
    "reconciledAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentWebhookEvent" (
    "id" TEXT NOT NULL,
    "provider" "PaymentProvider" NOT NULL,
    "eventId" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "processedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PaymentWebhookEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_orgEmail_key" ON "User"("orgEmail");

-- CreateIndex
CREATE INDEX "User_email_role_idx" ON "User"("email", "role");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_studentNumber_key" ON "Profile"("studentNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_idNumber_key" ON "Profile"("idNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_passportNumber_key" ON "Profile"("passportNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_idOrPassportNumber_key" ON "Profile"("idOrPassportNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "Post_slug_key" ON "Post"("slug");

-- CreateIndex
CREATE INDEX "Post_slug_category_status_idx" ON "Post"("slug", "category", "status");

-- CreateIndex
CREATE UNIQUE INDEX "NewsletterSubscriber_email_key" ON "NewsletterSubscriber"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Qualification_code_key" ON "Qualification"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Qualification_saqaId_key" ON "Qualification"("saqaId");

-- CreateIndex
CREATE UNIQUE INDEX "Qualification_slug_key" ON "Qualification"("slug");

-- CreateIndex
CREATE INDEX "Qualification_slug_framework_idx" ON "Qualification"("slug", "framework");

-- CreateIndex
CREATE UNIQUE INDEX "CourseModule_code_key" ON "CourseModule"("code");

-- CreateIndex
CREATE UNIQUE INDEX "CourseModule_qualificationId_moduleCode_key" ON "CourseModule"("qualificationId", "moduleCode");

-- CreateIndex
CREATE INDEX "Topic_moduleId_order_idx" ON "Topic"("moduleId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "Topic_moduleId_title_key" ON "Topic"("moduleId", "title");

-- CreateIndex
CREATE INDEX "LessonResource_lessonId_idx" ON "LessonResource"("lessonId");

-- CreateIndex
CREATE INDEX "ProgrammeResource_qualificationId_idx" ON "ProgrammeResource"("qualificationId");

-- CreateIndex
CREATE INDEX "ProgrammeResource_moduleId_idx" ON "ProgrammeResource"("moduleId");

-- CreateIndex
CREATE INDEX "ProgrammeResource_topicId_idx" ON "ProgrammeResource"("topicId");

-- CreateIndex
CREATE INDEX "ProgrammeResource_lessonId_idx" ON "ProgrammeResource"("lessonId");

-- CreateIndex
CREATE UNIQUE INDEX "Cohort_code_key" ON "Cohort"("code");

-- CreateIndex
CREATE UNIQUE INDEX "CohortFacilitator_cohortId_facilitatorId_key" ON "CohortFacilitator"("cohortId", "facilitatorId");

-- CreateIndex
CREATE UNIQUE INDEX "HostEmployer_sdlNumber_key" ON "HostEmployer"("sdlNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Application_applicationNumber_key" ON "Application"("applicationNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Enrollment_enrollmentNumber_key" ON "Enrollment"("enrollmentNumber");

-- CreateIndex
CREATE INDEX "Enrollment_learnerId_qualificationId_idx" ON "Enrollment"("learnerId", "qualificationId");

-- CreateIndex
CREATE UNIQUE INDEX "WorkplacePlacement_enrollmentId_key" ON "WorkplacePlacement"("enrollmentId");

-- CreateIndex
CREATE INDEX "CurriculumTest_moduleId_idx" ON "CurriculumTest"("moduleId");

-- CreateIndex
CREATE INDEX "CurriculumTest_topicId_idx" ON "CurriculumTest"("topicId");

-- CreateIndex
CREATE INDEX "CurriculumTest_lessonId_idx" ON "CurriculumTest"("lessonId");

-- CreateIndex
CREATE INDEX "CurriculumAssignment_moduleId_idx" ON "CurriculumAssignment"("moduleId");

-- CreateIndex
CREATE INDEX "CurriculumAssignment_topicId_idx" ON "CurriculumAssignment"("topicId");

-- CreateIndex
CREATE INDEX "CurriculumAssignment_lessonId_idx" ON "CurriculumAssignment"("lessonId");

-- CreateIndex
CREATE UNIQUE INDEX "AssessmentReview_submissionId_key" ON "AssessmentReview"("submissionId");

-- CreateIndex
CREATE UNIQUE INDEX "ModerationReview_submissionId_key" ON "ModerationReview"("submissionId");

-- CreateIndex
CREATE UNIQUE INDEX "LessonProgress_lessonId_enrollmentId_key" ON "LessonProgress"("lessonId", "enrollmentId");

-- CreateIndex
CREATE UNIQUE INDEX "Certificate_certificateNumber_key" ON "Certificate"("certificateNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Certificate_verificationHash_key" ON "Certificate"("verificationHash");

-- CreateIndex
CREATE INDEX "AuditLog_action_entityType_entityId_idx" ON "AuditLog"("action", "entityType", "entityId");

-- CreateIndex
CREATE INDEX "Intervention_enrollmentId_type_idx" ON "Intervention"("enrollmentId", "type");

-- CreateIndex
CREATE UNIQUE INDEX "AssessorRegistry_setaRegistrationNumber_key" ON "AssessorRegistry"("setaRegistrationNumber");

-- CreateIndex
CREATE INDEX "AssessorRegistry_userId_expiryDate_idx" ON "AssessorRegistry"("userId", "expiryDate");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_number_key" ON "Invoice"("number");

-- CreateIndex
CREATE INDEX "Invoice_userId_status_idx" ON "Invoice"("userId", "status");

-- CreateIndex
CREATE INDEX "Invoice_enrollmentId_idx" ON "Invoice"("enrollmentId");

-- CreateIndex
CREATE INDEX "Payment_invoiceId_status_idx" ON "Payment"("invoiceId", "status");

-- CreateIndex
CREATE INDEX "Payment_provider_providerRef_idx" ON "Payment"("provider", "providerRef");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentWebhookEvent_eventId_key" ON "PaymentWebhookEvent"("eventId");

-- CreateIndex
CREATE INDEX "PaymentWebhookEvent_provider_createdAt_idx" ON "PaymentWebhookEvent"("provider", "createdAt");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseModule" ADD CONSTRAINT "CourseModule_qualificationId_fkey" FOREIGN KEY ("qualificationId") REFERENCES "Qualification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "CourseModule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Topic" ADD CONSTRAINT "Topic_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "CourseModule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonResource" ADD CONSTRAINT "LessonResource_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgrammeResource" ADD CONSTRAINT "ProgrammeResource_qualificationId_fkey" FOREIGN KEY ("qualificationId") REFERENCES "Qualification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgrammeResource" ADD CONSTRAINT "ProgrammeResource_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "CourseModule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgrammeResource" ADD CONSTRAINT "ProgrammeResource_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgrammeResource" ADD CONSTRAINT "ProgrammeResource_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cohort" ADD CONSTRAINT "Cohort_qualificationId_fkey" FOREIGN KEY ("qualificationId") REFERENCES "Qualification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cohort" ADD CONSTRAINT "Cohort_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "CampusVenue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CohortFacilitator" ADD CONSTRAINT "CohortFacilitator_cohortId_fkey" FOREIGN KEY ("cohortId") REFERENCES "Cohort"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CohortFacilitator" ADD CONSTRAINT "CohortFacilitator_facilitatorId_fkey" FOREIGN KEY ("facilitatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_qualificationId_fkey" FOREIGN KEY ("qualificationId") REFERENCES "Qualification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_learnerId_fkey" FOREIGN KEY ("learnerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_qualificationId_fkey" FOREIGN KEY ("qualificationId") REFERENCES "Qualification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_cohortId_fkey" FOREIGN KEY ("cohortId") REFERENCES "Cohort"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_hostEmployerId_fkey" FOREIGN KEY ("hostEmployerId") REFERENCES "HostEmployer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkplacePlacement" ADD CONSTRAINT "WorkplacePlacement_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "Enrollment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkplacePlacement" ADD CONSTRAINT "WorkplacePlacement_hostEmployerId_fkey" FOREIGN KEY ("hostEmployerId") REFERENCES "HostEmployer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkplacePlacement" ADD CONSTRAINT "WorkplacePlacement_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LogbookEntry" ADD CONSTRAINT "LogbookEntry_placementId_fkey" FOREIGN KEY ("placementId") REFERENCES "WorkplacePlacement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssessmentTask" ADD CONSTRAINT "AssessmentTask_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "CourseModule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CurriculumTest" ADD CONSTRAINT "CurriculumTest_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "CourseModule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CurriculumTest" ADD CONSTRAINT "CurriculumTest_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CurriculumTest" ADD CONSTRAINT "CurriculumTest_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CurriculumAssignment" ADD CONSTRAINT "CurriculumAssignment_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "CourseModule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CurriculumAssignment" ADD CONSTRAINT "CurriculumAssignment_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CurriculumAssignment" ADD CONSTRAINT "CurriculumAssignment_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssessmentSubmission" ADD CONSTRAINT "AssessmentSubmission_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "AssessmentTask"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssessmentSubmission" ADD CONSTRAINT "AssessmentSubmission_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "Enrollment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssessmentReview" ADD CONSTRAINT "AssessmentReview_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "AssessmentSubmission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssessmentReview" ADD CONSTRAINT "AssessmentReview_assessorId_fkey" FOREIGN KEY ("assessorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModerationReview" ADD CONSTRAINT "ModerationReview_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "AssessmentSubmission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModerationReview" ADD CONSTRAINT "ModerationReview_moderatorId_fkey" FOREIGN KEY ("moderatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonProgress" ADD CONSTRAINT "LessonProgress_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonProgress" ADD CONSTRAINT "LessonProgress_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "Enrollment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttendanceRecord" ADD CONSTRAINT "AttendanceRecord_cohortId_fkey" FOREIGN KEY ("cohortId") REFERENCES "Cohort"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_learnerId_fkey" FOREIGN KEY ("learnerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "Enrollment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Intervention" ADD CONSTRAINT "Intervention_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "Enrollment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssessorRegistry" ADD CONSTRAINT "AssessorRegistry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "Enrollment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

