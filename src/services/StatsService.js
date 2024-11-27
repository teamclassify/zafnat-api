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