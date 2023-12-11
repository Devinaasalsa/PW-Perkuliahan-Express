/*
  Warnings:

  - You are about to drop the column `namaDosen` on the `tugas` table. All the data in the column will be lost.
  - You are about to drop the column `point` on the `tugas` table. All the data in the column will be lost.
  - You are about to drop the `status` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[mhsId]` on the table `NilaiAkhir` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `pertemuanKe` to the `Absensi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dosenId` to the `AcaraBerita` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pertemuanKe` to the `AcaraBerita` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mhsId` to the `NilaiAkhir` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `absensi` ADD COLUMN `pertemuanKe` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `acaraberita` ADD COLUMN `dosenId` INTEGER NOT NULL,
    ADD COLUMN `pertemuanKe` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `dosen` MODIFY `nip` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `nilaiakhir` ADD COLUMN `mhsId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `tugas` DROP COLUMN `namaDosen`,
    DROP COLUMN `point`,
    ADD COLUMN `dosenId` INTEGER NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `adminId` INTEGER NULL,
    ADD COLUMN `mhsId` INTEGER NULL;

-- DropTable
DROP TABLE `status`;

-- CreateTable
CREATE TABLE `Admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `adminName` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Admin_adminName_key`(`adminName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Token` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `value` VARCHAR(191) NOT NULL,
    `expired` BOOLEAN NOT NULL,
    `revoked` BOOLEAN NOT NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `Token_value_key`(`value`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StatusAbsen` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `statusAbsen` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Jawaban` (
    `jawabanId` INTEGER NOT NULL AUTO_INCREMENT,
    `lampiranJawaban` VARCHAR(191) NOT NULL,
    `WaktuPengumpulan` DATETIME(3) NOT NULL,
    `point` INTEGER NULL,
    `TugasID` INTEGER NOT NULL,
    `statusTugasId` INTEGER NULL,
    `MahasiswaID` INTEGER NOT NULL,

    PRIMARY KEY (`jawabanId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `NilaiAkhir_mhsId_key` ON `NilaiAkhir`(`mhsId`);

-- AddForeignKey
ALTER TABLE `Token` ADD CONSTRAINT `Token_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_mhsId_fkey` FOREIGN KEY (`mhsId`) REFERENCES `Mahasiswa`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admin`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AcaraBerita` ADD CONSTRAINT `AcaraBerita_dosenId_fkey` FOREIGN KEY (`dosenId`) REFERENCES `Dosen`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NilaiAkhir` ADD CONSTRAINT `NilaiAkhir_mhsId_fkey` FOREIGN KEY (`mhsId`) REFERENCES `Mahasiswa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tugas` ADD CONSTRAINT `Tugas_dosenId_fkey` FOREIGN KEY (`dosenId`) REFERENCES `Dosen`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Jawaban` ADD CONSTRAINT `Jawaban_TugasID_fkey` FOREIGN KEY (`TugasID`) REFERENCES `Tugas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Jawaban` ADD CONSTRAINT `Jawaban_statusTugasId_fkey` FOREIGN KEY (`statusTugasId`) REFERENCES `StatusTugas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Jawaban` ADD CONSTRAINT `Jawaban_MahasiswaID_fkey` FOREIGN KEY (`MahasiswaID`) REFERENCES `Mahasiswa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
