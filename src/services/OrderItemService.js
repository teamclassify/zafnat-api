import prisma from '../config/prisma.js';

class OrderItemService {

    create = async (data) => {
        const orderItem = await prisma.orderItem.create({
            data: {
                quantity: data.quantity,
                price: data.price,
                product_sku: {
                    connect: {
                        id: data.product_sku_id,
                    },
                },
                order: {
                    connect: {
                        id: data.order_id,
                    },
                },
            },
            select: {
                quantity: true,
                price: true,
                product_sku: {
                    select: {
                        size_attribute: true,
                        color_attribute: true,
                        product: {
                            select: {
                                name: true,
                            },
                        },
                        photos: {
                            select: {
                                value: true,
                            },
                        },
                    },
                },
            },
        });
        return orderItem;
    };
}

export default OrderItemService;