const express = require('express');
const invoiceController = require('../controllers/invoiceController')
const router = express.Router();

router.get('/', invoiceController.getAllInvoices);
router.post('/', invoiceController.createInvoice);

module.exports = router;