-- DropForeignKey
ALTER TABLE "Word" DROP CONSTRAINT "Word_wordSetId_fkey";

-- AlterTable
ALTER TABLE "WordSet" ALTER COLUMN "description" SET DEFAULT '';

-- AddForeignKey
ALTER TABLE "Word" ADD CONSTRAINT "Word_wordSetId_fkey" FOREIGN KEY ("wordSetId") REFERENCES "WordSet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
