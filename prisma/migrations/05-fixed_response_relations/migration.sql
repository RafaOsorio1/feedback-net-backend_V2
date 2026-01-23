-- DropForeignKey
ALTER TABLE `Response` DROP FOREIGN KEY `Response_employeeId_fkey`;

-- AlterTable
ALTER TABLE `Response` ADD COLUMN `ispId` VARCHAR(191) NULL,
    MODIFY `employeeId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Response` ADD CONSTRAINT `Response_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Response` ADD CONSTRAINT `Response_ispId_fkey` FOREIGN KEY (`ispId`) REFERENCES `ISP`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
