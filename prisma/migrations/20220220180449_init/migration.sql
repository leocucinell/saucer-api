/*
  Warnings:

  - A unique constraint covering the columns `[Location]` on the table `Restuarant` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Restuarant_Location_key` ON `Restuarant`(`Location`);
