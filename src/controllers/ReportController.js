import StatsService from "../services/StatsService.js";
import InvoicesController from "./InvoicesController.js";

class ReportController {

    constructor() {
        this.statsService = new StatsService();
        this.invoicesController = new InvoicesController();
    }

    salesReport = async (req, res) => {
        const { startYear, endYear, startMonth, endMonth } = req.body;

        const orders = await this.statsService.orders(startYear, startMonth, endYear, endMonth, undefined);
        const revenue = await this.statsService.revenue(startYear, startMonth, endYear, endMonth, undefined);

        const totalOrders = orders.totalOrders;
        const totalRevenue = revenue.totalRevenue;
        const totalSales = totalOrders;

        const summary = [
            { métrica: 'Total de Pedidos', valor: totalOrders },
            { métrica: 'Total de Ventas', valor: totalSales },
            { métrica: 'Ingresos Generados', valor: Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(totalRevenue) },
        ];

        const formattedOrders = orders.orders.map(order => ({
            id: order.id,
            usuario: order.user.firstName,
            email: order.user.email,
            total: Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(order.total),
            fecha: `${order.createdAt.getDate()}/${order.createdAt.getMonth() + 1}/${order.createdAt.getFullYear()}`,
        }));

        const formattedProducts = revenue.orderItems.map(orderItem => ({
            nombre: orderItem.product_sku.product.name,
            talla: orderItem.product_sku.size_attribute.value,
            color: orderItem.product_sku.color_attribute.value,
            cantidad: orderItem.quantity,
            total: Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(orderItem.quantity * orderItem.price),
        }));

        const csvData = [];

        csvData.push(['Reporte de ventas ZAFNAT']);
        csvData.push([]);
        csvData.push(['Métrica', 'Valor']);
        summary.forEach(row => csvData.push([row.métrica, row.valor]));
        csvData.push([]);
        csvData.push(['Detalles de Órdenes']);
        csvData.push(['ID', 'Usuario', 'Email', 'Total', 'Fecha']);
        formattedOrders.forEach(order => csvData.push([order.id, order.usuario, order.email, order.total, order.fecha]));
        csvData.push([]);
        csvData.push(['Detalles de Productos']);
        csvData.push(['Nombre', 'Talla', 'Color', 'Cantidad Vendida', 'Total de Ingresos']);
        formattedProducts.forEach(product => csvData.push([product.nombre, product.talla, product.color, product.cantidad, product.total]));

        const csv = csvData.map(row => row.join(';')).join('\n');
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename="sales-report.csv"');
        res.send(csv);
    };

    invoicesReport = async (req, res) => {
        const invoices = await this.invoicesController.getInvoices(req);
        const formattedInvoices = invoices.map(invoice => ({
            id: invoice.id,
            transaction_id: invoice.transaction_id,
            client: invoice.order.user.firstName,
            total: Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(invoice.amount),
            status: invoice.status,
            date: invoice.createdAt,
        }));
        
        const csvData = [];

        csvData.push(['Reporte de facturas ZaFNat']);
        csvData.push([]);
        csvData.push(['Detalles de Facturas']);
        csvData.push(['ID', 'Numero de transaccion', 'Cliente', 'Total', 'Estado de pago', 'Fecha']);
        formattedInvoices.forEach(invoice => csvData.push([invoice.id, invoice.transaction_id, invoice.client, invoice.total, invoice.status, invoice.date]));
        const csv = csvData.map(row => row.join(';')).join('\n');
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename="sales-report.csv"');
        res.send(csv);
    };

}

export default ReportController;