-- DropIndex
DROP INDEX `User_username_key` ON `User`;

-- AlterTable
ALTER TABLE `User` MODIFY `username` VARCHAR(191) NULL;
