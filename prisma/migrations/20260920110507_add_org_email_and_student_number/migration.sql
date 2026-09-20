/*
  Warnings:

  - A unique constraint covering the columns `[studentNumber]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idNumber]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[orgEmail]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "idNumber" TEXT,
ADD COLUMN     "studentNumber" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "orgEmail" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Profile_studentNumber_key" ON "Profile"("studentNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_idNumber_key" ON "Profile"("idNumber");

-- CreateIndex
CREATE UNIQUE INDEX "User_orgEmail_key" ON "User"("orgEmail");
