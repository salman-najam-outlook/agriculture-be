'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class HarvestMethod extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        }
    }
    HarvestMethod.init(
        {
            title: DataTypes.STRING(100),            
            userId: DataTypes.INTEGER,                     
        },
        {
            sequelize,
            tableName: "harvest_method",
            modelName: "HarvestMethod",
        }
    );
    return HarvestMethod;
};
