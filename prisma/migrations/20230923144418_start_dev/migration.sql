/*
  Warnings:

  - Added the required column `start_month` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_year` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Made the column `start_date` on table `Activity` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "start_month" INTEGER NOT NULL,
ADD COLUMN     "start_year" INTEGER NOT NULL,
ALTER COLUMN "start_date" SET NOT NULL;
