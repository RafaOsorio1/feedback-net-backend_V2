-- AlterTable
ALTER TABLE `Request` ADD COLUMN `referenceNumber` VARCHAR(191) NOT NULL,
    MODIFY `details` TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Request_referenceNumber_key` ON `Request`(`referenceNumber`);