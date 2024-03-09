const express = require('express');
const bodyParser = require('body-parser');
const invoiceRoutes = require('./routes/invoiceRoutes');
const indexRoutes = require('./routes/indexRoutes');
const { sequelize } = require('./models');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Sync Sequelize models with the database
sequelize.sync({ force: false }).then(() => {
    console.log('Database synchronized');
}).catch(err => {
    console.error('Unable to sync database:', err);
});

// Routes
app.use('/', indexRoutes);
app.use('/invoices', invoiceRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
