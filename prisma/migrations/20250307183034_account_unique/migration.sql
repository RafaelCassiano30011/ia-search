/*
  Warnings:

  - A unique constraint covering the columns `[account]` on the table `stores` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "stores_account_key" ON "stores"("account");
