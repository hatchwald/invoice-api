const express = require('express');
const bodyParser = require('body-parser');
const invoiceRoutes = require('./routes/invoiceRoutes');
const { sequelize } = require('./models');

const app = express();
const port = 3000;

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
app.use('/users', invoiceRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
