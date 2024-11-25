/*
  Warnings:

  - Added the required column `evaluation_rate` to the `drivers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "drivers" ADD COLUMN     "evaluation_rate" INTEGER NOT NULL;
