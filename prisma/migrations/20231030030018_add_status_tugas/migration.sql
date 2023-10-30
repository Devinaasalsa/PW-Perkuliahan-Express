/*
  Warnings:

  - Added the required column `statusTugasId` to the `Tugas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tugas` ADD COLUMN `statusTugasId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `StatusTugas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `statusTugas` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Tugas` ADD CONSTRAINT `Tugas_statusTugasId_fkey` FOREIGN KEY (`statusTugasId`) REFERENCES `StatusTugas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
