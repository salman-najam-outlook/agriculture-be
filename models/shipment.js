'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shipment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Shipment.init({
    userId: DataTypes.INTEGER,
    orderId: DataTypes.INTEGER,
    sellerId: DataTypes.INTEGER,
    buyerId: DataTypes.INTEGER,
    weightUomId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    quantityUomId: DataTypes.INTEGER,
    hsCode: DataTypes.INTEGER,
    invoiceDate: DataTypes.DATE,
    etaDate: DataTypes.DATE,
    shippingAddress: DataTypes.TEXT,
    receiverAddress: DataTypes.TEXT,
    pointOfOrigin: DataTypes.STRING,
    reference: DataTypes.STRING,
    pointOfDestination: DataTypes.STRING,
    paymentTerms: DataTypes.STRING,
    productNumber: DataTypes.STRING,
    productDescription: DataTypes.STRING,
    currency: DataTypes.ENUM('dollar', 'rupee'),
    status: DataTypes.ENUM('completed', 'pending','success'),
    weight: DataTypes.FLOAT,
    costPer: DataTypes.FLOAT,
    duty: DataTypes.FLOAT,
    subtotal: DataTypes.FLOAT,
    total: DataTypes.FLOAT,
  }, {
    sequelize,
    modelName: 'shipment',
  });
  return Shipment;
};