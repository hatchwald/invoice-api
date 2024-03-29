const { Invoice, productSold } = require('../models');

const getAllInvoices = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        const { count, rows } = await Invoice.findAndCountAll({
            include: [{ model: productSold, attributes: ['item', 'quantity', 'total_cogs', 'total_price'] }],
            offset: (page - 1) * pageSize,
            limit: pageSize
        });
        const totalPage = Math.ceil(count / pageSize)
        res.json({
            'data': rows,
            'totalItems': count,
            totalPage,
            'currentPage': page
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createInvoice = async (req, res, next) => {
    const { date, customer, salesperson, payment_type, notes, products } = req.body;
    const requiredField = ['date', 'customer', 'salesperson', 'products'];
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
        let invoice_no = `INV-${Date.now()}-${Math.floor(Math.random() * 100)}`
        const newInvoice = await Invoice.create({ invoice_no, date, customer, salesperson, payment_type, notes });
        await productSold.bulkCreate(products.map(product => ({
            invoice_no: newInvoice.invoice_no,
            item: product.name,
            quantity: product.quantity,
            total_cogs: product.price,
            total_price: product.quantity * product.price
        })));
        res.status(201).json(newInvoice);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

module.exports = {
    getAllInvoices,
    createInvoice
};
