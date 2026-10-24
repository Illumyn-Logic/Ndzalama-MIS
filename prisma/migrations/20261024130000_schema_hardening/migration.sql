-- CreateEnum
CREATE TYPE "InterventionType" AS ENUM ('LEARNERSHIP', 'SHORT_SKILLS', 'APPRENTICESHIP', 'INTERNSHIP');

-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('DRAFT', 'ISSUED', 'PAID', 'OVERDUE', 'VOID');

-- CreateEnum
CREATE TYPE "PaymentProvider" AS ENUM ('PAYFAST', 'STITCH', 'PAYSHARP', 'MANUAL_EFT');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'SUCCESS', 'FAILED', 'REFUNDED');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "EnrollmentStatus" ADD VALUE 'APPLIED';
ALTER TYPE "EnrollmentStatus" ADD VALUE 'ACTIVE';
ALTER TYPE "EnrollmentStatus" ADD VALUE 'COMPLETED';

-- DropIndex
DROP INDEX "Enrollment_learnerId_qualificationId_key";

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "alternateIdType" TEXT,
ADD COLUMN     "citizenResidencyStatus" TEXT,
ADD COLUMN     "communicatingRating" TEXT,
ADD COLUMN     "currentOccupation" TEXT,
ADD COLUMN     "experienceInOccupation" TEXT,
ADD COLUMN     "faxNumber" TEXT,
ADD COLUMN     "hearingRating" TEXT,
ADD COLUMN     "highestEducationDescription" TEXT,
ADD COLUMN     "homeLanguageOther" TEXT,
ADD COLUMN     "initials" TEXT,
ADD COLUMN     "lastSchoolEmis" TEXT,
ADD COLUMN     "lastSchoolYear" INTEGER,
ADD COLUMN     "middleName" TEXT,
ADD COLUMN     "nationality" TEXT,
ADD COLUMN     "nationalityOther" TEXT,
ADD COLUMN     "nqfLevelAttained" INTEGER,
ADD COLUMN     "passportNumber" TEXT,
ADD COLUMN     "physicalAddressLine2" TEXT,
ADD COLUMN     "physicalAddressLine3" TEXT,
ADD COLUMN     "physicalCity" TEXT,
ADD COLUMN     "physicalCode" TEXT,
ADD COLUMN     "physicalSuburb" TEXT,
ADD COLUMN     "popiaConsentStatus" TEXT,
ADD COLUMN     "postalAddress" TEXT,
ADD COLUMN     "postalAddressLine1" TEXT,
ADD COLUMN     "postalAddressLine2" TEXT,
ADD COLUMN     "postalAddressLine3" TEXT,
ADD COLUMN     "postalAddressSameAsPhysical" BOOLEAN,
ADD COLUMN     "postalCity" TEXT,
ADD COLUMN     "postalMunicipality" TEXT,
ADD COLUMN     "postalProvince" TEXT,
ADD COLUMN     "postalSuburb" TEXT,
ADD COLUMN     "postalUrbanRural" TEXT,
ADD COLUMN     "rememberingRating" TEXT,
ADD COLUMN     "seeingRating" TEXT,
ADD COLUMN     "selfcareRating" TEXT,
ADD COLUMN     "sponsorRef" TEXT,
ADD COLUMN     "statsSAAreaCode" TEXT,
ADD COLUMN     "title" TEXT,
ADD COLUMN     "walkingRating" TEXT,
ADD COLUMN     "yearsInOccupation" INTEGER;

-- AlterTable
ALTER TABLE "Enrollment" ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "fundingSource" TEXT;

-- AlterTable
ALTER TABLE "AuditLog" ADD COLUMN     "after" JSONB,
ADD COLUMN     "before" JSONB;

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

-- CreateIndex
CREATE UNIQUE INDEX "Profile_passportNumber_key" ON "Profile"("passportNumber");

-- CreateIndex
CREATE INDEX "Enrollment_learnerId_qualificationId_idx" ON "Enrollment"("learnerId", "qualificationId");

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

