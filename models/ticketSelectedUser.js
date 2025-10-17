'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ticketSelectedUser extends Model {
    static associate(models) {      
      this.belongsTo(models.Ticket, {
        foreignKey: 'ticketId',
        as: 'ticket',
      });    
      this.belongsTo(models.user, {
        foreignKey: 'userId',
        as: 'user',
      });    
    }
  }
  ticketSelectedUser.init(
    {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        ticketId: {
          type: DataTypes.INTEGER,
         
        },
        userId: {
          type: DataTypes.INTEGER,
         
        }
    },
    {
      sequelize,
      tableName: 'ticket_selected_users',
      modelName: 'ticketSelectedUser'
    }
  );
  return ticketSelectedUser;
};
