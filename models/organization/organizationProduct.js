'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OrganizationProduct extends Model {
    static associate(models) {
      this.belongsTo(models.Organization, {
        foreignKey: 'organization_id',
        as: 'organization',
      });

      this.belongsTo(models.Product, {
        foreignKey: 'product_id',
        as: 'product',
        targetKey: 'id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
    }
  }

  OrganizationProduct.init({
    organizationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'organizations',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  }, {
    sequelize,
    modelName: 'OrganizationProduct',
    tableName: 'organization_products',
    timestamps: true,
    underscored: true,
  });

  return OrganizationProduct;
};