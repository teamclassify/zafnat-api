import prisma from "../config/prisma.js";

class RoleService {
  constructor() {}

  async find(where) {
    const roles = await prisma.role.findMany({
      where,
    });

    return roles;
  }

  async findOne(id) {
    const role = await prisma.role.findUnique({
      where: {
        id: id,
      },
    });

    return role;
  }

  async create(data) {
    const roleCreated = await prisma.role.create({
      data,
    });

    return roleCreated;
  }

  async delete(id) {
    const roleDeleted = await prisma.role.delete({
      where: id,
    });

    return roleDeleted;
  }
}

export default RoleService;