'use strict';
const { Model } = require('sequelize');
const uppercaseFirst = str => `${str[0].toUpperCase()}${str.substr(1)}`;

module.exports = (sequelize, DataTypes) => {
  class OCCKomodoInsertedId extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    getData(options) {
      if (!this.commentableType) return Promise.resolve(null);
      const mixinMethodName = `get${uppercaseFirst(this.dataType)}`;
      return this[mixinMethodName](options);
    }
    static associate(models) {
      // define association here
      this.belongsTo(models.user, {
        foreignKey: 'dataId',
        sourceKey: 'id',
        constraints: false,
        as: 'farmer',
      });
      this.belongsTo(models.CacaoPurchaseOrder, {
        foreignKey: 'dataId',
        sourceKey: 'id',
        constraints: false,
        as: 'purchaseOrder',
      });

      this.addHook('afterFind', (findResult) => {
        if (!Array.isArray(findResult)) findResult = [findResult];
        for (const instance of findResult) {
          if(instance) {
            if (instance.dataType === 'FARMER' && instance.farmer !== undefined) {
              instance.data = instance.farmer;
            } else if (instance.dataType === 'BATCH' && instance.purchaseOrder !== undefined) {
              instance.data = instance.purchaseOrder;
            }
            // To prevent mistakes:
            delete instance.farmer;
            delete instance.dataValues.farmer;
            delete instance.purchaseOrder;
            delete instance.dataValues.purchaseOrder;
          }
        }
      });
    }
  }
  OCCKomodoInsertedId.init(
    {
      dataType: {
        type: DataTypes.ENUM('FARMER', 'BATCH'),
        allowNull: false,
      },
      onChainData: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('PROCESSING', 'ERROR', 'SUCCESS'),
        allowNull: false,
      },
      insertedId: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      dataId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'occ_komodo_inserted_ids',
      modelName: 'OCCKomodoInsertedId',
    }
  );
  return OCCKomodoInsertedId;
};
