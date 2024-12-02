import prisma from "../config/prisma.js";

class InvoicesController {

  findAll = async (req, res) => {
    const invoices = await prisma.invoice.findMany({
      include: {
        order: {
          include: {
            user: true,
          }
        }
      }
    })
    res.json(invoices);
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