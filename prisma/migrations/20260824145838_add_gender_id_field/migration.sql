/*
  Warnings:

  - Added the required column `gender_id` to the `athlete` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "GenderId" AS ENUM ('Male', 'Female');

-- AlterTable
ALTER TABLE "athlete" ADD COLUMN     "gender_id" "GenderId" NOT NULL;

-- AlterTable
ALTER TABLE "result" ALTER COLUMN "country" DROP NOT NULL;
