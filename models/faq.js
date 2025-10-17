'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Faq extends Model {
    static associate(models) {
      // this.belongsTo(models.Faq, {
      //   foreignKey: 'parent_id',
      //   as: 'parentTopic',
      //   allowNull: true
      // });
      this.hasMany(models.Faq, {
        foreignKey: 'parent_id',
        as: 'childTopics',
        allowNull: true
      });
      this.belongsTo(models.Organization, {
        foreignKey: 'org_id',
        as: 'org_assoc',
        allowNull: true
      });
    }
    
  }
  Faq.init(
    {        
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
          },
        parent_id: DataTypes.INTEGER,
        name: DataTypes.INTEGER,
        displayName: DataTypes.STRING,
        en: DataTypes.STRING,
        hi: DataTypes.STRING,
        mr: DataTypes.STRING,
        es: DataTypes.STRING,
        ne: DataTypes.STRING,
        in: DataTypes.STRING,
        ar: DataTypes.STRING,
        pt: DataTypes.STRING,
        fr: DataTypes.STRING,
        nl: DataTypes.STRING,
        display: DataTypes.BOOLEAN,
        isDefault: DataTypes.BOOLEAN
    },
    {
      sequelize,
      modelName: 'Faq',
      tableName: 'faq_sections',
    }
  );
  return Faq;
};
