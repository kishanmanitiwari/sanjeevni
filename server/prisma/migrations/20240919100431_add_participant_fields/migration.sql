/*
  Warnings:

  - You are about to drop the `Participant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Participant";

-- CreateTable
CREATE TABLE "authentication" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'Volunteer',
    "participantId" INTEGER NOT NULL,

    CONSTRAINT "authentication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "participant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "gender" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "maritalStatus" TEXT NOT NULL,
    "roundsChanging" INTEGER NOT NULL,
    "mentor" TEXT NOT NULL,
    "currentLevel" TEXT NOT NULL,
    "nativeCity" TEXT NOT NULL,
    "otp" TEXT,
    "email" TEXT NOT NULL,

    CONSTRAINT "participant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "authentication_mobile_key" ON "authentication"("mobile");

-- CreateIndex
CREATE UNIQUE INDEX "authentication_participantId_key" ON "authentication"("participantId");

-- CreateIndex
CREATE UNIQUE INDEX "participant_phoneNumber_key" ON "participant"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "participant_email_key" ON "participant"("email");

-- AddForeignKey
ALTER TABLE "authentication" ADD CONSTRAINT "authentication_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
