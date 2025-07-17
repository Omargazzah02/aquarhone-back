-- DropForeignKey
ALTER TABLE `reservation` DROP FOREIGN KEY `Reservation_activityId_fkey`;

-- DropIndex
DROP INDEX `Reservation_activityId_fkey` ON `reservation`;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_activityId_fkey` FOREIGN KEY (`activityId`) REFERENCES `Activity`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
