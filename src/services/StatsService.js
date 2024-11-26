import prisma from "../config/prisma.js";

class StatsService {
    ordersStats = async () => {
        const ordersStats = await prisma.order.aggregate({
            _count: {
                id: true,
            },
            _sum: {
                total: true,
            },
        });
        return ordersStats;
    };

    productsStats = async () => {
        const productsStats = await prisma.product.aggregate({
            _count: {
                id: true,
            },
        });
        return productsStats;
    };

    usersTotal = async () => {
        const usersStats = await prisma.user.count();
        return usersStats;
    };

    usersFrequency = async () => {
        const usersFrequency = await prisma.user.findMany({
            select: {
                firstName: true,
                email: true,
                photo: true,
                _count: {
                    select: {
                        orders: true,
                    }
                }
            },
            orderBy: {
                orders: {
                    _count: 'desc',
                },
            },
        });
        return usersFrequency;
    };

    usersSales = async () => {
        const usersSales = await prisma.order.groupBy({
            by: ['userId'],
            _sum: {
                total: true,
            },
            orderBy: {
                _sum: {
                    total: 'desc',
                },
            },
        });
        const userIds = usersSales.map(sale => sale.userId);

        const usersDetails = await prisma.user.findMany({
            where: {
                id: {
                    in: userIds,
                },
            },
            select: {
                id: true,
                firstName: true,
                email: true,
                photo: true,
            },
        });
        const finalResult = usersSales.map(sale => {
            const user = usersDetails.find(user => user.id === sale.userId);
            return {
                ...sale,
                user: user || null,
            };
        });
        return finalResult;
    };

    usersLocation = async () => {
        const usersLocation = await prisma.address.groupBy({
            by: ['city'],
            where: {
                is_main: true,
            },
            _count: {
                userId: true,
            },
            orderBy: {
                _count: {
                    userId: 'desc',
                },
            },
        });
        return usersLocation;
    };
}

export default StatsService;