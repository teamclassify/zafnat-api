import prisma from "../config/prisma.js";

class UsersOnRolesService {
  constructor() {}

  async find(where) {
    const usersOnRoles = await prisma.usersOnRoles.findMany({
      where,
    });

    return usersOnRoles;
  }

  async findOne(userId, roleId) {
    const userOnRole = await prisma.usersOnRoles.findFirst({
      where: {
        userId,
        roleId,
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

  async delete(userId_roleId) {
    const userOnRoleDeleted = await prisma.usersOnRoles.delete({
      where: userId_roleId,
    });

    return userOnRoleDeleted;
  }
}

export default UsersOnRolesService;