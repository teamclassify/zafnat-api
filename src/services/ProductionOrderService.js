import prisma from "../config/prisma.js";

class ProductionOrderService {

    async findAll() {
        return await prisma.productionOrder.findMany();
    }

    async findOne(id) {
        return await prisma.productionOrder.findUnique({
            where: {
                prod_id: id
            }
        });
    }

}

export default ProductionOrderService;