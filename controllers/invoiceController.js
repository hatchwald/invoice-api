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

const createInvoice = async (req, res, next) => {
    const { invoice_no, date, customer, salesperson, payment_type, notes } = req.body;
    console.log(req.body)
    const requiredField = ['date', 'customer', 'salesperson'];
    try {
        requiredField.forEach(field => {
            if (!req.body[field]) {
                const responseError = {
                    type: 'Error',
                    message: `${field} cannot be empty`,
                    code: 400,
                };

                let error = new Error();
                error = { ...error, ...responseError };
                throw (error);
            }
        })
        const newInvoice = await Invoice.create({ invoice_no, date, customer, salesperson, payment_type, notes });
        res.status(201).json(newInvoice);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

module.exports = {
    getAllInvoices,
    createInvoice
};
