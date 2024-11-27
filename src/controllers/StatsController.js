import StatsService from '../services/StatsService.js';

class StatsController {
    constructor() {
        this.statsService = new StatsService();
    }

    salesStats = async (req, res) => {
        const {startYear, endYear, startMonth, endMonth, productIds} = req.body;
        const orders = await this.statsService.orders(startYear, startMonth, endYear, endMonth, productIds);
        const revenue = await this.statsService.revenue(startYear, startMonth, endYear, endMonth, productIds);
        const stats = {orders, revenue};
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
        res.json(stats);
    }

    usersStats = async (req, res) => {
        const users = await this.statsService.usersTotal();
        const userFrequency = await this.statsService.usersFrequency();
        const userSales = await this.statsService.usersSales();
        const userLocation = await this.statsService.usersLocation();
        const stats = {users, userFrequency, userSales, userLocation};
        res.json(stats);
    }
}

export default StatsController;