/*
  Warnings:

  - You are about to drop the column `comment` on the `drivers` table. All the data in the column will be lost.
  - You are about to drop the column `evaluation_rate` on the `drivers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "drivers" DROP COLUMN "comment",
DROP COLUMN "evaluation_rate";

-- CreateTable
CREATE TABLE "assessments" (
    "id" UUID NOT NULL,
    "comment" VARCHAR NOT NULL,
    "driver_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "evaluation_rate" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "assessments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "assessments_id_key" ON "assessments"("id");

-- AddForeignKey
ALTER TABLE "assessments" ADD CONSTRAINT "assessments_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "drivers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assessments" ADD CONSTRAINT "assessments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
