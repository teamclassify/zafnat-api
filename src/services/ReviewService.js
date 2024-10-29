import prisma from "../config/prisma.js";

class ReviewService {
    async find(where) {
        const reviews = await prisma.review.findMany({
          where,
        });
    
        return reviews;
      }
  
      async findOne(id) {
        const review = await prisma.review.findUnique({
          where: {
            id: id,
          },
        });
    
        return review;
      }
    
      async create(data) {
        const reviewCreated = await prisma.review.create({
          data,
        });
    
        return reviewCreated;
      }
    
      async delete(id, userId) {
        const reviewDeleted = await prisma.review.delete({
          where: {
            id: id,
            userId: userId,
          }
        });
        return reviewDeleted;
      }
    
      async update(id, userId, data) {
        const reviewUpdated = await prisma.review.update({
          where: {
            id: id,
            userId: userId,
          },
          data,
        });
    
        return reviewUpdated;
      }
}

export default ReviewService;
