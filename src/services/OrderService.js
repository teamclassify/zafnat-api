import prisma from '../config/prisma.js';

class OrderService {
    find = async (params) => {
        const orders = await prisma.order.findMany({
            ...params,
        });
        return orders;
    };

    create = async (data) => {
        const order = await prisma.order.create({
            data: {
                status: data.status,
                is_wholesale: data.is_wholesale,
                total: data.total,
                user: {
                    connect: {
                        id: data.user_id,
                    },
                },
            },
        });
        return order;
    };
}

export default OrderService;