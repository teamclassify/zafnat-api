import prisma from "../config/prisma.js";

class UsersOnRolesService {
  constructor() {}

  async find(where) {
    const usersOnRoles = await prisma.usersOnRoles.findMany({
      where,
    });

    return usersOnRoles;
  }

  async findOne(id) {
    const userOnRole = await prisma.usersOnRoles.findUnique({
      where: {
        id: id,
      },
    });

    return userOnRole;
  }

  async create(data) {
    const userOnRoleCreated = await prisma.usersOnRoles.create({
      data,
    });

    return userOnRoleCreated;
  }

  async delete(id) {
    const userOnRoleDeleted = await prisma.usersOnRoles.delete({
      where: id,
    });

    return userOnRoleDeleted;
  }
}