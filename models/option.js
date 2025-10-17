'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Option extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.UserfarmCrop, {
        foreignKey: 'cropTypeOptId',
        sourceKey: 'id',
        as: 'userCropTypes',
      });

      this.belongsToMany(models.UserCropGoalSeason, {
        through: models.UserCropGoalTypeMap,
        foreignKey: 'cropGoalTypeId',
        otherKey: 'userCropGoalSeasonId',
        as: 'cropGoalTypes',
      });
      this.hasMany(models.UserCropGoalFarm, {
        foreignKey: 'cropTypeId',
        sourceKey: 'id',
        as: 'cropGoalFarm',
      });
      // Associations for MyTree model
      this.hasMany(models.MyTree, {
        foreignKey: 'health_condition',
      });
      this.hasMany(models.MyTreeHistory, {
        foreignKey: 'health_condition',
      });
    }
  }
  Option.init(
    {
      name: DataTypes.STRING,
      groupName: DataTypes.STRING,
      region: DataTypes.STRING,
      countryCode: DataTypes.STRING,
      recordId: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      info: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          const value = this.getDataValue('info');
          try {
            return JSON.parse(value);
          } catch (e) {
            return value;
          }
        },
        set(value) {
          try {
            let data = JSON.stringify(value);
            this.setDataValue('info', data);
          } catch (e) {
            this.setDataValue('info', value);
          }
        },
      },
    },
    {
      sequelize,
      tableName: 'options',
      modelName: 'Option',
    }
  );
  return Option;
};
