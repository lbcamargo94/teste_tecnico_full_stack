/*
  Warnings:

  - You are about to drop the `trips` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "trips" DROP CONSTRAINT "trips_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "trips" DROP CONSTRAINT "trips_driver_id_fkey";

-- DropTable
DROP TABLE "trips";

-- CreateTable
CREATE TABLE "rides" (
    "id" UUID NOT NULL,
    "customer_id" UUID NOT NULL,
    "destination" VARCHAR NOT NULL,
    "distance" DOUBLE PRECISION NOT NULL,
    "driver_id" UUID NOT NULL,
    "duration" VARCHAR NOT NULL,
    "origin" VARCHAR NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rides_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "rides_id_key" ON "rides"("id");

-- AddForeignKey
ALTER TABLE "rides" ADD CONSTRAINT "rides_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "drivers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rides" ADD CONSTRAINT "rides_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
