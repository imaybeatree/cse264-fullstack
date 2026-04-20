-- AlterTable
ALTER TABLE `User` ADD COLUMN `allergies` JSON NULL,
    ADD COLUMN `ingredients` JSON NULL,
    ADD COLUMN `onboarded` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `preferences` JSON NULL;
