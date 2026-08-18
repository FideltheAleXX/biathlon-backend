-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Men', 'Women', 'Mixed');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Scheduled', 'Ongoing', 'Finished', 'Cancelled');

-- CreateEnum
CREATE TYPE "Discipline" AS ENUM ('Sprint', 'Pursuit', 'Individual', 'MassStart', 'Relay', 'MixedRelay', 'SingleMixedRelay');

-- CreateTable
CREATE TABLE "stage" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "stage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "race" (
    "id" TEXT NOT NULL,
    "stage_id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "discipline" "Discipline" NOT NULL,
    "gender" "Gender" NOT NULL,
    "distance" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'Scheduled',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "race_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "result" (
    "id" TEXT NOT NULL,
    "race_id" TEXT NOT NULL,
    "athlete_id" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "leg" INTEGER,
    "position" INTEGER,
    "time" TEXT,
    "misses" TEXT,
    "points" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "result_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "athlete" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "athlete_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "race_id_key" ON "race"("id");

-- CreateIndex
CREATE UNIQUE INDEX "race_stage_id_discipline_gender_key" ON "race"("stage_id", "discipline", "gender");

-- CreateIndex
CREATE UNIQUE INDEX "result_race_id_athlete_id_key" ON "result"("race_id", "athlete_id");

-- CreateIndex
CREATE UNIQUE INDEX "athlete_first_name_last_name_key" ON "athlete"("first_name", "last_name");

-- AddForeignKey
ALTER TABLE "race" ADD CONSTRAINT "race_stage_id_fkey" FOREIGN KEY ("stage_id") REFERENCES "stage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "result" ADD CONSTRAINT "result_race_id_fkey" FOREIGN KEY ("race_id") REFERENCES "race"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "result" ADD CONSTRAINT "result_athlete_id_fkey" FOREIGN KEY ("athlete_id") REFERENCES "athlete"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
