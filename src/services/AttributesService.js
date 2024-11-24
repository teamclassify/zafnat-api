import prisma from "../config/prisma.js";

class AttributeService {

  async find(where, page = 1) {
    const results = await prisma.productAttribute.findMany({
      where,
      skip: (page - 1) * 10,
    });

    return results;
  }

  async findOne(id) {
    const result = await prisma.productAttribute.findUnique({
      where: {
        id: id,
      },
    });

    return result;
  }

  async create(data) {
    const created = await prisma.productAttribute.create({
      data,
    });

    return created;
  }

  async delete(id, userId) {
    const deleted = await prisma.productAttribute.delete({
      where: {
        id: id,
      }
    });
    return deleted;
  }

  async update(id, userId, data) {
    const updated = await prisma.productAttribute.update({
      where: {
        id: id,
      },
      data,
    });

    return updated;
  }
}

export default AttributeService;