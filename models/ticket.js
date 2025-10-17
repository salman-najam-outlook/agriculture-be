'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    static associate(models) {
      this.hasMany(models.ticketSelectedUser, {
        foreignKey: 'ticketId',
        as: 'ticketSelectedUser',
      });  
      this.hasOne(models.ticketReadStatus, {
        foreignKey: 'ticketId',
        as: 'ticketReadStatus',
      });  
      this.hasMany(models.ticketMedia, {
        foreignKey: 'ticketId',
        as: 'ticketMedia',
      });   
      this.hasMany(models.TicketComments, {
        foreignKey: 'ticketId',
        as: 'ticketComments',
      });   
      this.belongsTo(models.user, {
        foreignKey: 'asigneeId',
        as: 'asignee',
      });    
      this.belongsTo(models.user, {
        foreignKey: 'createdBy',
        as: 'createdByUser',
      });
      this.belongsTo(models.Organization, {
        foreignKey: 'org_id',
        as: 'org_assoc',
        allowNull: true
      });
    }
  }
  Ticket.init(
    {
        ticketUserType: {
            type: DataTypes.ENUM,
            values: ['Single User', 'Group of users', 'Dimitra Admin']
        },
        requestorName: DataTypes.STRING,
        requestorEmail: DataTypes.STRING,
        requesterId: DataTypes.INTEGER,
        createdBy: DataTypes.INTEGER,
        subject: DataTypes.STRING,
        description: DataTypes.TEXT,
        status: {
            type: DataTypes.ENUM,
            values: ["open", "closed", "additional information required"],
        },
        priority: {
            type: DataTypes.ENUM,
            values: ["Low", "Medium", "High"],
        },
        startDate: DataTypes.DATE,
        endDate: DataTypes.DATE,
        areaOfRequest: DataTypes.STRING,
        type: {
            type: DataTypes.ENUM,
            values: ["Question", "Incident", "Problem"]
        },
        asigneeId: DataTypes.INTEGER,
        org_id: DataTypes.INTEGER,
        requesterId: DataTypes.INTEGER,
        recordId: DataTypes.STRING,
        country: {
            type: DataTypes.STRING,
            allowNull: true
        },
        state: {
            type: DataTypes.STRING,
            allowNull: true
        },
        countryCode: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    },
    {
      sequelize,
      tableName: 'tickets',
      modelName: 'Ticket'
    }
  );
  return Ticket;
};
