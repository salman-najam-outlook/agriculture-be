'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ticketMedia extends Model {
    static associate(models) {
      this.belongsTo(models.ticketMedia, {
        foreignKey: 'ticketId',
        as: 'ticket',
      });    
    }
  }
  ticketMedia.init(
    {       
        ticketId: DataTypes.INTEGER,
        fileName: DataTypes.STRING,
        profilePicS3Key: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: 'tickets_multimedia',
      modelName: 'ticketMedia'
    }
  );
  return ticketMedia;
};
