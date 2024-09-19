/*
  Warnings:

  - You are about to drop the `authentication` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `participant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "authentication" DROP CONSTRAINT "authentication_participantId_fkey";

-- DropTable
DROP TABLE "authentication";

-- DropTable
DROP TABLE "participant";

-- CreateTable
CREATE TABLE "Participant" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "mob" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'Participant',

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Participant_mob_key" ON "Participant"("mob");
