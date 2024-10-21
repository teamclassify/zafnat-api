import prisma from "../config/prisma.js";

class UserService {
  constructor() {}

  async find(where) {
    const users = await prisma.user.findMany({
      where,
    });

    return users;
  }

  async findOne(id) {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        roles: true,
      },
    });

    return user;
  }

  async create(data) {
    const userCreated = await prisma.user.create({
      data,
    });

    const roleUser = await prisma.role.findFirst({
      where: {
        name: "user",
      },
    });

    await prisma.usersOnRoles.create({
      data: {
        role: {
          connect: {
            id: roleUser.id,
          },
        },
        user: {
          connect: {
            id: userCreated.id,
          },
        },
        assignedBy: "system",
      },
    });

    return userCreated;
  }

  async delete(id) {
    const userDeleted = await prisma.user.delete({
      where: id,
    });

    console.log(userDeleted);

    return { deleted: true };
  }
}

export default UserService;
