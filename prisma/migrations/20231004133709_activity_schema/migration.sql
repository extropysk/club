/*
  Warnings:

  - Made the column `distance` on table `Activity` required. This step will fail if there are existing NULL values in that column.
  - Made the column `moving_time` on table `Activity` required. This step will fail if there are existing NULL values in that column.
  - Made the column `total_elevation_gain` on table `Activity` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Activity" ALTER COLUMN "distance" SET NOT NULL,
ALTER COLUMN "moving_time" SET NOT NULL,
ALTER COLUMN "total_elevation_gain" SET NOT NULL;
