const { Invoice } = require('../models');

const getAllInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.findAll();
        res.json(invoices);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createInvoice = async (req, res) => {
    const { invoice_no, date, customer, salesperson, payment_type, notes } = req.body;
    try {
        const newInvoice = await Invoice.create({ invoice_no, date, customer, salesperson, payment_type, notes });
        res.status(201).json(newInvoice);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getAllInvoices,
    createInvoice
};
