-- CreateEnum
CREATE TYPE "Role" AS ENUM ('AE', 'SE', 'OV', 'LM');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('WAITING', 'WORKING', 'COMPLETED');

-- CreateTable
CREATE TABLE "Issue" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "postID" TEXT NOT NULL,
    "photo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "formId" TEXT NOT NULL,

    CONSTRAINT "Issue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "phone" TEXT NOT NULL,
    "isVerified" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "assigneesId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Form" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "disconnectionPlace" TEXT NOT NULL,
    "earthedLocations" TEXT NOT NULL,
    "shortedLocation" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "powerOutage" TEXT NOT NULL,
    "feeder" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "typeofjob" TEXT NOT NULL,
    "voltage" TEXT NOT NULL,
    "ptwAllowed" TEXT NOT NULL,
    "substation" TEXT NOT NULL,
    "transormer" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "comaplaintNumber" TEXT NOT NULL,
    "issueId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "assigneesId" TEXT NOT NULL,

    CONSTRAINT "Form_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Assignees" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Assignees_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Form_issueId_key" ON "Form"("issueId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_assigneesId_fkey" FOREIGN KEY ("assigneesId") REFERENCES "Assignees"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Form" ADD CONSTRAINT "Form_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Form" ADD CONSTRAINT "Form_assigneesId_fkey" FOREIGN KEY ("assigneesId") REFERENCES "Assignees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Form" ADD CONSTRAINT "Form_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "Issue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
