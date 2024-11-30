import prisma from "../config/prisma.js";

class StatsService {

    orders = async (startYear, startMonth, endYear, endMonth, productIds = []) => {

        const dateFilters = {};

        if (startYear && startMonth && startMonth >= 1 && startMonth <= 12) {
            const startDate = new Date(`${startYear}-${String(startMonth).padStart(2, '0')}-01T00:00:00Z`);
            if (!isNaN(startDate.getTime())) {
                dateFilters.gte = startDate;
            } else {
                return "Invalid Date";
            }
        }

        if (endYear && endMonth && endMonth >= 1 && endMonth <= 12) {
            const endDate = new Date(`${(endMonth === 12 ? endYear + 1 : endYear)}-${String((endMonth % 12) + 1).padStart(2, '0')}-01T00:00:00Z`);
            endDate.setTime(endDate.getTime() - 1);
            if (!isNaN(endDate.getTime())) {
                dateFilters.lt = endDate;
            } else {
                return "Invalid Date";
            }
        }

        const orders = await prisma.order.findMany({
            where: {
                createdAt: dateFilters,
                items: {
                    some: {
                        product_sku_id: {
                            in: productIds.length > 0 ? productIds : undefined,
                        },
                    },
                },
            },
            select: {
                createdAt: true,
            },
        });


        const monthlyOrderCount = orders.reduce((months, order) => {
            const monthKey = `${order.createdAt.getFullYear()}-${String(order.createdAt.getMonth() + 1).padStart(2, '0')}`;

            if (!months[monthKey]) {
                months[monthKey] = 0;
            }
            months[monthKey] += 1;

            return months;
        }, {});


        const monthlyOrderArray = Object.entries(monthlyOrderCount).map(([month, count]) => ({
            month,
            count,
        }));


        monthlyOrderArray.sort((a, b) => a.month.localeCompare(b.month));


        const totalOrders = monthlyOrderArray.reduce((total, monthData) => total + monthData.count, 0);

        return {
            totalOrders,
            monthlyOrders: monthlyOrderArray,
        };
    };

    revenue = async (startYear, startMonth, endYear, endMonth, productIds = []) => {

        const dateFilters = {};

        if (startYear && startMonth && startMonth >= 1 && startMonth <= 12) {
            const startDate = new Date(`${startYear}-${String(startMonth).padStart(2, '0')}-01T00:00:00Z`);
            if (!isNaN(startDate.getTime())) {
                dateFilters.gte = startDate;
            } else {
                return "Invalid Date";
            }
        }

        if (endYear && endMonth && endMonth >= 1 && endMonth <= 12) {
            const endDate = new Date(`${(endMonth === 12 ? endYear + 1 : endYear)}-${String((endMonth % 12) + 1).padStart(2, '0')}-01T00:00:00Z`);
            endDate.setTime(endDate.getTime() - 1);
            if (!isNaN(endDate.getTime())) {
                dateFilters.lt = endDate;
            } else {
                return "Invalid Date";
            }
        }

        const orderItems = await prisma.orderItem.findMany({
            where: {
                createdAt: dateFilters,
                product_sku_id: {
                    in: productIds.length > 0 ? productIds : undefined,
                },
            },
            select: {
                price: true,
                quantity: true,
                createdAt: true,
            },
        });

        const totalRevenue = orderItems.reduce((total, item) => {
            return total + item.price * item.quantity;
        }, 0);

        const monthlyRevenue = orderItems.reduce((months, item) => {
            const monthKey = `${item.createdAt.getFullYear()}-${String(item.createdAt.getMonth() + 1).padStart(2, '0')}`;

            if (!months[monthKey]) {
                months[monthKey] = 0;
            }
            months[monthKey] += item.price * item.quantity;

            return months;
        }, {});

        const monthlyRevenueArray = Object.entries(monthlyRevenue).map(([month, total]) => ({
            month,
            total,
        }));

        monthlyRevenueArray.sort((a, b) => a.month.localeCompare(b.month));

        return {
            totalRevenue,
            monthlyRevenue: monthlyRevenueArray,
        };
    };

    soldProducts = async () => {
        const soldProducts = await prisma.orderItem.aggregate({
            _sum: {
                quantity: true,
            },
        });
        return soldProducts;
    };

    productStock = async () => {
        const productStock = await prisma.productSku.findMany({
            select: {
                product: {
                    select: {
                        name: true,
                    }
                },
                size_attribute: {
                    select: {
                        value: true,
                    }
                },
                color_attribute: {
                    select: {
                        value: true,
                    }
                },
                photos: {
                    select: {
                        value: true,
                    }
                },
                quantity: true,
            },
        });
        return productStock;
    };

    topCategories = async () => {
        const topCategories = await prisma.$queryRaw`
            SELECT c.id, c.name, SUM(oi.price * oi.quantity) AS total_sales
            FROM "Category" c
            JOIN "ProductOnCategory" pc ON c.id = pc.category_id
            JOIN "Product" p ON pc.product_id = p.id
            JOIN "ProductSku" ps ON p.id = ps.product_id
            JOIN "OrderItem" oi ON ps.id = oi.product_sku_id
            GROUP BY c.id, c.name
            ORDER BY total_sales DESC;
          `;
        return topCategories;
    };

    topProducts = async () => {
        const topProducts = await prisma.orderItem.groupBy({
            by: ['product_sku_id'],
            _sum: {
                quantity: true,
            },
            orderBy: {
                _sum: {
                    quantity: 'desc',
                },
            },
            take: 5,
        });

        const productsDetails = await Promise.all(
            topProducts.map(async (product) => {
                const productDetails = await prisma.productSku.findUnique({
                    where: { id: product.product_sku_id },
                    select: {
                        product: {
                            select: {
                                id: true,
                                name: true,
                            }
                        },
                        size_attribute: {
                            select: {
                                value: true,
                            }
                        },
                        color_attribute: {
                            select: {
                                value: true,
                            }
                        },
                    },
                });
                return { product, productDetails };
            })
        );
        return productsDetails;
    };

    worstProducts = async () => {
        const worstProducts = await prisma.orderItem.groupBy({
            by: ['product_sku_id'],
            _sum: {
                quantity: true,
            },
            orderBy: {
                _sum: {
                    quantity: 'asc',
                },
            },
            take: 5,
        });

        const productsDetails = await Promise.all(
            worstProducts.map(async (product) => {
                const productDetails = await prisma.productSku.findUnique({
                    where: { id: product.product_sku_id },
                    select: {
                        product: {
                            select: {
                                id: true,
                                name: true,
                            }
                        },
                        size_attribute: {
                            select: {
                                value: true,
                            }
                        },
                        color_attribute: {
                            select: {
                                value: true,
                            }
                        },
                    },
                });
                return { product, productDetails };
            })
        );
        return productsDetails;
    };

    unsoldProducts = async () => {
        const unsoldProducts = await prisma.productSku.findMany({
            where: {
                order_items: {
                    none: {},
                },
            },
            select: {
                product: {
                    select: {
                        name: true,
                    }
                },
                size_attribute: {
                    select: {
                        value: true,
                    }
                },
                color_attribute: {
                    select: {
                        value: true,
                    }
                },
            },
        });
        return unsoldProducts;
    };

    usersTotal = async () => {
        const usersStats = await prisma.user.count();
        return usersStats;
    };

    usersFrequency = async () => {
        const usersFrequency = await prisma.user.findMany({
            select: {
                id: true,
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

        const usersWithTopProducts = await Promise.all(
            usersFrequency.map(async (user) => {
                const topProduct = await prisma.orderItem.groupBy({
                    by: ['product_sku_id'],
                    where: {
                        order: {
                            userId: user.id,
                        },
                    },
                    _sum: {
                        quantity: true,
                    },
                    orderBy: {
                        _sum: {
                            quantity: 'desc',
                        },
                    },
                    take: 1,
                });

                const productDetails =
                    topProduct.length > 0
                        ? await prisma.productSku.findUnique({
                            where: { id: topProduct[0].product_sku_id },
                            select: {
                                size_attribute: true,
                                color_attribute: true,
                                photos: true,
                                product: {
                                    select: {
                                        name: true,
                                    },
                                },
                            },
                        })
                        : null;

                return {
                    ...user,
                    topProduct: productDetails || null,
                };
            })
        );
        return usersWithTopProducts;
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