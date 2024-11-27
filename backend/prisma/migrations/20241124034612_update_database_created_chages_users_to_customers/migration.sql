/*
  Warnings:

  - You are about to drop the column `user_id` on the `assessments` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `trips` table. All the data in the column will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `customer_id` to the `assessments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer_id` to the `trips` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "assessments" DROP CONSTRAINT "assessments_user_id_fkey";

-- DropForeignKey
ALTER TABLE "trips" DROP CONSTRAINT "trips_user_id_fkey";

-- AlterTable
ALTER TABLE "assessments" DROP COLUMN "user_id",
ADD COLUMN     "customer_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "trips" DROP COLUMN "user_id",
ADD COLUMN     "customer_id" UUID NOT NULL;

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "customers" (
    "id" UUID NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "email" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customers_id_key" ON "customers"("id");

-- AddForeignKey
ALTER TABLE "assessments" ADD CONSTRAINT "assessments_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trips" ADD CONSTRAINT "trips_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
