/*
  Warnings:

  - Added the required column `account` to the `stores` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plataform` to the `stores` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "stores" ADD COLUMN     "account" TEXT NOT NULL,
ADD COLUMN     "plataform" TEXT NOT NULL;
