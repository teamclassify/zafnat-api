import prisma from "../config/prisma.js";

class OrderService {
  find = async (where) => {
    const orders = await prisma.order.findMany({
      where: where,
      select: {
        id: true,
        status: true,
        createdAt: true,
        is_wholesale: true,
        total: true,
        user: {
          select: {
            id: true,
            firstName: true,
            email: true,
          },
        },
        address: {
          select: {
            title: true,
            address_line_1: true,
            address_line_2: true,
            country: true,
            city: true,
            postal_code: true,
          },
        },
        items: {
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
        },
      },
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
        address: {
          connect: {
            id: data.address_id,
          },
        },
      },
      select: {
        id: true,
        status: true,
        is_wholesale: true,
        total: true,
        user: {
          select: {
            firstName: true,
            email: true,
          },
        },
        address: {
          select: {
            title: true,
            address_line_1: true,
            address_line_2: true,
            country: true,
            city: true,
            postal_code: true,
          },
        },
      },
    });
    return order;
  };
}

export default OrderService;
