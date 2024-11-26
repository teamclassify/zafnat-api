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
        const stats = await this.statsService.productsStats();
        res.json(stats);
    }

    usersStats = async (req, res) => {
        const users = await this.statsService.usersTotal();
        const usersFrequency = await this.statsService.usersFrequency();
        const userSales = await this.statsService.usersSales();
        const usersLocation = await this.statsService.usersLocation();
        res.status(201).json({users, usersFrequency, userSales, usersLocation});
    }
}

export default StatsController;