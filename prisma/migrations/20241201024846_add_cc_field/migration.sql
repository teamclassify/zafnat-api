/*
  Warnings:

  - A unique constraint covering the columns `[cc]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "cc" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_cc_key" ON "User"("cc");
