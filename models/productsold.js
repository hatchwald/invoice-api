'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class productSold extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  productSold.init({
    item: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    total_cogs: DataTypes.FLOAT,
    total_price: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'productSold',
  });
  productSold.associate = models => {
    productSold.belongsTo(models.Invoice, { foreignKey: 'invoice_no', targetKey: 'invoice_no' });
  };

  return productSold;
};