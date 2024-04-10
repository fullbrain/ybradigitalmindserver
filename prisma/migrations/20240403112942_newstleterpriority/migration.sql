-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('HIGH', 'MEDIUM', 'LOW');

-- AlterTable
ALTER TABLE "Newsletter" ADD COLUMN     "priority" "Priority" NOT NULL DEFAULT 'LOW';
