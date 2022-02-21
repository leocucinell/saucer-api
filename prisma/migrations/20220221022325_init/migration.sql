/*
  Warnings:

  - Added the required column `resturaunt_owner_id` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Reservation` ADD COLUMN `resturaunt_owner_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_resturaunt_owner_id_fkey` FOREIGN KEY (`resturaunt_owner_id`) REFERENCES `Restuarant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
