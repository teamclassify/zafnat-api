-- DropForeignKey
ALTER TABLE "ProductSku" DROP CONSTRAINT "ProductSku_product_id_fkey";

-- AddForeignKey
ALTER TABLE "ProductSku" ADD CONSTRAINT "ProductSku_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
