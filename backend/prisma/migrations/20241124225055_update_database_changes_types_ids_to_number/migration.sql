/*
  Warnings:

  - The primary key for the `assessments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `assessments` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `customers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `customer_id` on the `customers` table. All the data in the column will be lost.
  - The `id` column on the `customers` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `drivers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `driver_id` on the `drivers` table. All the data in the column will be lost.
  - The `id` column on the `drivers` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `rides` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `rides` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `driver_id` on the `assessments` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `customer_id` on the `assessments` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `customer_id` on the `rides` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `driver_id` on the `rides` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "assessments" DROP CONSTRAINT "assessments_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "assessments" DROP CONSTRAINT "assessments_driver_id_fkey";

-- DropForeignKey
ALTER TABLE "rides" DROP CONSTRAINT "rides_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "rides" DROP CONSTRAINT "rides_driver_id_fkey";

-- AlterTable
ALTER TABLE "assessments" DROP CONSTRAINT "assessments_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "driver_id",
ADD COLUMN     "driver_id" INTEGER NOT NULL,
DROP COLUMN "customer_id",
ADD COLUMN     "customer_id" INTEGER NOT NULL,
ADD CONSTRAINT "assessments_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "customers" DROP CONSTRAINT "customers_pkey",
DROP COLUMN "customer_id",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "customers_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "drivers" DROP CONSTRAINT "drivers_pkey",
DROP COLUMN "driver_id",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "drivers_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "rides" DROP CONSTRAINT "rides_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "customer_id",
ADD COLUMN     "customer_id" INTEGER NOT NULL,
DROP COLUMN "driver_id",
ADD COLUMN     "driver_id" INTEGER NOT NULL,
ADD CONSTRAINT "rides_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "assessments_id_key" ON "assessments"("id");

-- CreateIndex
CREATE UNIQUE INDEX "customers_id_key" ON "customers"("id");

-- CreateIndex
CREATE UNIQUE INDEX "drivers_id_key" ON "drivers"("id");

-- CreateIndex
CREATE UNIQUE INDEX "rides_id_key" ON "rides"("id");

-- AddForeignKey
ALTER TABLE "assessments" ADD CONSTRAINT "assessments_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "drivers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assessments" ADD CONSTRAINT "assessments_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rides" ADD CONSTRAINT "rides_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "drivers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rides" ADD CONSTRAINT "rides_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
