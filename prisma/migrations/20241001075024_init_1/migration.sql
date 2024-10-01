/*
  Warnings:

  - Made the column `image` on table `Travel` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Travel" ALTER COLUMN "image" SET NOT NULL;
