import prisma from '../config/prisma.js';

class ProductSkuService {

    find = async (params) => {
        const productSkus = await prisma.productSku.findMany({
            ...params,
        });
        return productSkus;
    };

    findOne = async (id) => {
        const productSku = await prisma.productSku.findUnique({
            where: {
                id: id,
            },
        });
        return productSku;
    }

    create = async (data) => {
        const productSku = await prisma.productSku.create({
            data,
        });
        return productSku;
    };

    decreaseStock = async (id, quantity_sold) => {
        const productSku = await prisma.productSku.update({
            where: {
                id: id,
            },
            data: {
                quantity: {
                    decrement: quantity_sold,
                },
            },
        });
        return productSku;
    };

    update = async (id, data) => {
        const productSku = await prisma.productSku.update({
            where: {
                id: id,
            },
            data,
        });
        return productSku;
    };

    delete = async (id) => {
        const productSku = await prisma.productSku.delete({
            where: {
                id: id,
            },
        });
        return productSku;
    };
}

export default ProductSkuService;
