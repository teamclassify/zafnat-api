import StatsService from '../services/StatsService.js';

class StatsController {
    constructor() {
        this.statsService = new StatsService();
    }

    ordersStats = async (req, res) => {
        const stats = await this.statsService.ordersStats();
        res.json(stats);
    }

    productsStats = async (req, res) => {
        const soldProducts = await this.statsService.soldProducts();
        const productStock = await this.statsService.productStock();
        const topCategories = await this.statsService.topCategories();
        const topProducts = await this.statsService.topProducts();
        const worstProducts = await this.statsService.worstProducts();
        const unsoldProducts = await this.statsService.unsoldProducts();
        const stats = {soldProducts, productStock, topCategories, topProducts, worstProducts, unsoldProducts};
        res.status(201).json(stats);
    }

    usersStats = async (req, res) => {
        const users = await this.statsService.usersTotal();
        const userFrequency = await this.statsService.usersFrequency();
        const userSales = await this.statsService.usersSales();
        const userLocation = await this.statsService.usersLocation();
        const stats = {users, userFrequency, userSales, userLocation};
        res.status(201).json(stats);
    }
}

export default StatsController;