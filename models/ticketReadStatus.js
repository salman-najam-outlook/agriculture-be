'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ticketReadStatus extends Model {
    // static associate(models) {
    //   this.belongsTo(models.ticket, {
    //     foreignKey: 'ticketId',
    //     as: 'ticket',
    //   });    
    // }
  }
  ticketReadStatus.init(
    {       
        ticketId: DataTypes.INTEGER,
        userId: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: 'ticket_read_status',
      modelName: 'ticketReadStatus'
    }
  );
  return ticketReadStatus;
};
