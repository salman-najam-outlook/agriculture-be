"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class EquipmentEquipmentActivity extends Model {
        static associate(models){

        }
    }
    EquipmentEquipmentActivity.init({
        equipment_id:{
            type: DataTypes.INTEGER,
            allowNull:false,
            references:{
                model:'equipment',
                key:'id'
            }
        },
        equipment_activity_id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references:{
                model:'equipment_activity',
                key:'id'
            }
        }
    },{
      sequelize,
      modelName:'EquipmentEquipmentActivity',
      tableName:'equipment_equipment_activity'  
    })
    

    return EquipmentEquipmentActivity
}