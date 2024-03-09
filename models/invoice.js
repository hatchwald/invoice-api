'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Invoice.init({
    invoice_no: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    date: DataTypes.DATE,
    customer: DataTypes.STRING,
    salesperson: DataTypes.STRING,
    payment_type: DataTypes.STRING,
    notes: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Invoice',
  });
  Invoice.associate = models => {
    Invoice.hasMany(models.productSold, { foreignKey: 'invoice_no', sourceKey: 'invoice_no', onDelete: 'CASCADE' });
  };
  return Invoice;
};