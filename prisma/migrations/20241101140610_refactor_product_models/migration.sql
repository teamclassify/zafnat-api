/*
  Warnings:

  - A unique constraint covering the columns `[value]` on the table `ProductAttribute` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `ProductOnCategory` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[prod_id]` on the table `ProductionOrder` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `ProductOnCategory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProductSku" DROP CONSTRAINT "ProductSku_product_id_fkey";

-- AlterTable
ALTER TABLE "ProductOnCategory" ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ProductAttribute_value_key" ON "ProductAttribute"("value");

-- CreateIndex
CREATE UNIQUE INDEX "ProductOnCategory_name_key" ON "ProductOnCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ProductionOrder_prod_id_key" ON "ProductionOrder"("prod_id");

-- AddForeignKey
ALTER TABLE "ProductSku" ADD CONSTRAINT "ProductSku_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "ProductOnCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
