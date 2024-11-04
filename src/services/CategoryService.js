import prisma from "../config/prisma.js";

class CategoryService {
    constructor() {}
    
    async find(where) {
        const category = await prisma.category.findMany({
        where,
        });
    
        return category;
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
    
    async update(id, data) {
        const categoryUpdated = await prisma.category.update({
        where: {
            id: id,
        },
        data,
        });
    
        return categoryUpdated;
    }
    
    async delete(id) {
        const categoryDeleted = await prisma.category.delete({
        where: {
            id: id,
        },
        });
    
        return categoryDeleted;
    }
}

export default CategoryService;