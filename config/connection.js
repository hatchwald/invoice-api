const Sequelize = require('sequelize')
require('dotenv').config();

const connection = new Sequelize(
    process.env.DB,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
        logging: process.env.NODE_ENV === "development" ? (...msg) => console.log(msg) : false,

    }
)

module.exports = connection