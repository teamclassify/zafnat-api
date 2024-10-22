import prisma from "../config/prisma.js";

class UsersOnRolesService {
  constructor() {}

  async find(where) {
    const usersOnRoles = await prisma.usersOnRoles.findMany({
      where,
    });

    return usersOnRoles;
  }

  async findOne(userId) {
    const userOnRole = await prisma.usersOnRoles.findFirst({
      where: {
        userId,
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

  async update(userId, currentRoleId, data) {
    const userOnRoleUpdated = await prisma.usersOnRoles.update({
      where: {
        userId_roleId: {
          userId: userId,
          roleId: currentRoleId,
        },
      },
      data,
    });
    return userOnRoleUpdated;
  }
}

export default UsersOnRolesService;