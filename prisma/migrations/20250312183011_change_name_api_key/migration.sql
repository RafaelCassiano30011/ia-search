/*
  Warnings:

  - You are about to drop the column `apiKey` on the `stores` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "stores" DROP COLUMN "apiKey",
ADD COLUMN     "appKey" TEXT;
