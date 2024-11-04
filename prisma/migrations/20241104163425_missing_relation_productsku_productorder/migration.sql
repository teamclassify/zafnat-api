/*
  Warnings:

  - Added the required column `product_id` to the `ProductOnProductionOrder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductOnProductionOrder" ADD COLUMN     "product_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "ProductOnProductionOrder" ADD CONSTRAINT "ProductOnProductionOrder_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "ProductSku"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
