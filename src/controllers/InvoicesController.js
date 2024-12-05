import prisma from "../config/prisma.js";

class InvoicesController {

  findAll = async (req, res) => {
    const invoices = await this.getInvoices(req);
    res.json(invoices);
  }

  getInvoices = async (req) => {
    const { startYear, endYear, startMonth, endMonth } = req.body;

    const dateFilters = {};

    if (startYear && startMonth && startMonth >= 1 && startMonth <= 12) {
      const startDate = new Date(`${startYear}-${String(startMonth).padStart(2, '0')}-01T00:00:00Z`);
      if (!isNaN(startDate.getTime())) {
        dateFilters.gte = startDate;
      } else {
        return "Invalid Date";
      }
    }

    if (endYear && endMonth && endMonth >= 1 && endMonth <= 12) {
      const endDate = new Date(`${(endMonth === 12 ? endYear + 1 : endYear)}-${String((endMonth % 12) + 1).padStart(2, '0')}-01T00:00:00Z`);
      endDate.setTime(endDate.getTime() - 1);
      if (!isNaN(endDate.getTime())) {
        dateFilters.lt = endDate;
      } else {
        return "Invalid Date";
      }
    }

    const invoices = await prisma.invoice.findMany({
      where: {
        createdAt: dateFilters,
      },
      include: {
        order: {
          include: {
            user: true,
          }
        }
      }
    });
    
    return invoices;
  }

  findById = async (req, res) => {
    const invoice = await prisma.invoice.findUnique({
      where: {
        id: parseInt(req.params.id)
      }
    })

    if (!invoice) {
      return res.status(404).json({ msg: "Order not found" });
    }
    res.json(invoice);
  }
}

export default InvoicesController;