'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TicketComments extends Model {
    static associate(models) {
  
        this.belongsTo(models.user, {
          foreignKey: 'userId',
          as: 'user',
        });    

        this.belongsTo(models.Ticket, {
          foreignKey: 'ticketId',
          as: 'comments',
        });   
      }
  }
  TicketComments.init(
    {
        id: {
            type: DataTypes.INTEGER ,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
          },
          ticketId: {
            type: DataTypes.INTEGER ,
            allowNull: false,
            references: {
              model: 'tickets',
              key: 'id',
            }
          },
          comment_type: {
            type: DataTypes.ENUM(['string', 'file', 'both']),
            allowNull: false,
            defaultValue: 'string'
          },
          comment: {
            type: DataTypes.TEXT('long'),
            allowNull: true
          },
          file_url: {
            type: DataTypes.STRING,
            allowNull: true
          },
          userId: {
            type: DataTypes.INTEGER ,
            allowNull: false,
            references: {
              model: 'users',
              key: 'id',
            }
          },
          createdAt: {
            allowNull: false,
            type: DataTypes.DATE,

          },
          updatedAt: {
            allowNull: false,
            type: DataTypes.DATE,
          },
    },
    {
      sequelize,
      tableName: 'tickets_comments',
      modelName: 'TicketComments'
    }
  );
  return TicketComments;
};
