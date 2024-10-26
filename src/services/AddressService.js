import prisma from "../config/prisma.js";

class AddressService {

  async find(where) {
    const addresses = await prisma.address.findMany({
      where,
    });

    return addresses;
  }

  async findOne(id) {
    const address = await prisma.address.findUnique({
      where: {
        id: id,
      },
    });

    return address;
  }

  async create(data) {
    const addressCreated = await prisma.address.create({
      data,
    });

    return addressCreated;
  }

  async delete(id, userId) {
    const addressDeleted = await prisma.address.delete({
      where: {
        id: id,
        userId: userId,
      }
    });
    return addressDeleted;
  }

  async update(id, userId, data) {
    const addressUpdated = await prisma.address.update({
      where: {
        id: id,
        userId: userId,
      },
      data,
    });

    return addressUpdated;
  }
}

export default AddressService;