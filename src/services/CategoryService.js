import prisma from "../config/prisma.js";

class CategoryService {

  async find(where) {
    const categories = await prisma.category.findMany({
      where,
    });

    return categories;
  }

  async findOne(id) {
    const category = await prisma.category.findUnique({
      where: {
        id: id,
      },
    });

    return category;
  }

  async create(data) {
    const categoryCreated = await prisma.category.create({
      data,
    });

    return categoryCreated;
  }

  async delete(id, userId) {
    const categoryDeleted = await prisma.category.delete({
      where: {
        id: id,
      }
    });
    return categoryDeleted;
  }

  async update(id, userId, data) {
    const categoryUpdated = await prisma.category.update({
      where: {
        id: id,
      },
      data,
    });

    return categoryUpdated;
  }
}

export default CategoryService;