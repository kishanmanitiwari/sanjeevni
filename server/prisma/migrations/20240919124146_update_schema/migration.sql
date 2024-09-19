/*
  Warnings:

  - You are about to drop the column `mentorId` on the `Session` table. All the data in the column will be lost.
  - Added the required column `courseId` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_mentorId_fkey";

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "mentorId",
ADD COLUMN     "courseId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
