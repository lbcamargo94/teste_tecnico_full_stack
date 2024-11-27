/*
  Warnings:

  - Added the required column `driver_id` to the `drivers` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `user_id` on the `users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "drivers" ADD COLUMN     "driver_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "user_id",
ADD COLUMN     "user_id" INTEGER NOT NULL;
