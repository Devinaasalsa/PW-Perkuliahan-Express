/*
  Warnings:

  - A unique constraint covering the columns `[nip]` on the table `Dosen` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[namaMatkul]` on the table `Matkul` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nip` to the `Dosen` table without a default value. This is not possible if the table is not empty.
  - Made the column `matkulId` on table `dosen` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `namaMatkul` to the `Matkul` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `dosen` DROP FOREIGN KEY `Dosen_matkulId_fkey`;

-- DropIndex
DROP INDEX `Mahasiswa_mhsName_key` ON `mahasiswa`;

-- AlterTable
ALTER TABLE `dosen` ADD COLUMN `nip` INTEGER NOT NULL,
    MODIFY `matkulId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `matkul` ADD COLUMN `namaMatkul` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `roleId` INTEGER NULL,
    `dosenId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `roleName` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Role_roleName_key`(`roleName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AcaraBerita` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL,
    `jamMasuk` INTEGER NOT NULL,
    `jamKeluar` INTEGER NOT NULL,
    `descMateri` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Absensi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `mahasiswaId` INTEGER NOT NULL,
    `statusId` INTEGER NOT NULL,
    `totalHadir` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Status` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `statusName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NilaiAkhir` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `totalAbsen` INTEGER NOT NULL,
    `nilaiTugas` DOUBLE NOT NULL,
    `uts` DOUBLE NOT NULL,
    `uas` DOUBLE NOT NULL,
    `absenPercent` DOUBLE NOT NULL,
    `tugasPercent` DOUBLE NOT NULL,
    `utsPercent` DOUBLE NOT NULL,
    `uasPercent` DOUBLE NOT NULL,
    `angkaMutu` DOUBLE NOT NULL,
    `hurufMutu` VARCHAR(191) NOT NULL,
    `ket` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Dosen_nip_key` ON `Dosen`(`nip`);

-- CreateIndex
CREATE UNIQUE INDEX `Matkul_namaMatkul_key` ON `Matkul`(`namaMatkul`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_dosenId_fkey` FOREIGN KEY (`dosenId`) REFERENCES `Dosen`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Dosen` ADD CONSTRAINT `Dosen_matkulId_fkey` FOREIGN KEY (`matkulId`) REFERENCES `Matkul`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Absensi` ADD CONSTRAINT `Absensi_mahasiswaId_fkey` FOREIGN KEY (`mahasiswaId`) REFERENCES `Mahasiswa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
