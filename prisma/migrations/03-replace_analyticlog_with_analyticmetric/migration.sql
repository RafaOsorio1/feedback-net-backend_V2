-- DropForeignKey
ALTER TABLE `AnalyticLog` DROP FOREIGN KEY `AnalyticLog_employeeId_fkey`;

-- DropForeignKey
ALTER TABLE `AnalyticLog` DROP FOREIGN KEY `AnalyticLog_ispId_fkey`;

-- DropForeignKey
ALTER TABLE `AnalyticLog` DROP FOREIGN KEY `AnalyticLog_requestId_fkey`;

-- AlterTable
ALTER TABLE `Request` MODIFY `referenceNumber` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `AnalyticLog`;

-- CreateTable
CREATE TABLE `AnalyticMetric` (
    `id` VARCHAR(191) NOT NULL,
    `period` DATETIME(3) NOT NULL,
    `type` ENUM('PETITION', 'COMPLAINT', 'CLAIM', 'SUGGESTION') NOT NULL,
    `status` ENUM('PENDING', 'IN_PROGRESS', 'RESOLVED', 'CANCELED') NULL,
    `totalRequests` INTEGER NOT NULL DEFAULT 0,
    `closedCount` INTEGER NOT NULL DEFAULT 0,
    `inProgressCount` INTEGER NOT NULL DEFAULT 0,
    `pendingCount` INTEGER NOT NULL DEFAULT 0,
    `avgResponseTime` DOUBLE NULL,
    `ispId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `employeeId` VARCHAR(191) NULL,
    `requestId` VARCHAR(191) NULL,

    INDEX `AnalyticMetric_period_idx`(`period`),
    INDEX `AnalyticMetric_type_idx`(`type`),
    INDEX `AnalyticMetric_ispId_idx`(`ispId`),
    UNIQUE INDEX `AnalyticMetric_period_type_ispId_key`(`period`, `type`, `ispId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AnalyticMetric` ADD CONSTRAINT `AnalyticMetric_ispId_fkey` FOREIGN KEY (`ispId`) REFERENCES `ISP`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AnalyticMetric` ADD CONSTRAINT `AnalyticMetric_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AnalyticMetric` ADD CONSTRAINT `AnalyticMetric_requestId_fkey` FOREIGN KEY (`requestId`) REFERENCES `Request`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
