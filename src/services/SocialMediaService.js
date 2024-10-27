import prisma from "../config/prisma.js";

class SocialMediaService {
    constructor() {}
    
    async find(where) {
        const socialMedia = await prisma.socialMedia.findMany({
        where,
        });
    
        return socialMedia;
    }
    
    async findOne(id) {
        const socialMedia = await prisma.socialMedia.findUnique({
        where: {
            id: id,
        },
        });
    
        return socialMedia;
    }
    
    async create(data) {
        const socialMediaCreated = await prisma.socialMedia.create({
        data,
        });
    
        return socialMediaCreated;
    }
    
    async update(id, data) {
        const socialMediaUpdated = await prisma.socialMedia.update({
        where: {
            id: id,
        },
        data,
        });
    
        return socialMediaUpdated;
    }
    
    async delete(id) {
        const socialMediaDeleted = await prisma.socialMedia.delete({
        where: {
            id: id,
        },
        });
    
        return socialMediaDeleted;
    }
}

export default SocialMediaService;