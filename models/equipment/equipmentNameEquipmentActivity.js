"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class EquipmentNameEquipmentActivity extends Model {
        static associate(models){
            this.belongsTo(models.EquipmentName, {
                foreignKey: 'equipmentNameId',
                targetKey: 'id',
                as: 'EquipmentName'
              });
              this.belongsTo(models.EquipmentActivity, {
                foreignKey: 'equipmentActivityId',
                targetKey: 'id',
                as: 'EquipmentActivity'
              });

        }
    }
    EquipmentNameEquipmentActivity.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
          },
        equipmentNameId:{
            type: DataTypes.INTEGER,
            allowNull:false,
            references:{
                model:'equipment_name',
                key:'id'
            }
        },
        equipmentActivityId:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references:{
                model:'equipment_activity',
                key:'id'
            }
        }
    },{
      sequelize,
      modelName:'EquipmentNameEquipmentActivity',
      tableName:'equipment_name_equipment_activity'  
    })
    

    return EquipmentNameEquipmentActivity;
}