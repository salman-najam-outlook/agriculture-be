'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CacaoTraceabilityLabels extends Model {

    static associate(models) {
      this.belongsTo(models.user, {
        foreignKey: 'user_id',
        targetKey: 'id',
        as: 'user'
      });
    }
  }
  CacaoTraceabilityLabels.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      organization_id: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      title: { allowNull: false, type: DataTypes.STRING },
      label_format: { allowNull: false, type: DataTypes.INTEGER },
      label_preview: { allowNull: false, type: DataTypes.JSON },
      logo: { allowNull: false, type: DataTypes.JSON },
      background_color_code: { allowNull: false, type: DataTypes.STRING },
      text_color_code: { allowNull: false, type: DataTypes.STRING },
      is_active: { defaultValue: true, type: DataTypes.BOOLEAN },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    },
    {
      sequelize,
      tableName: 'cacao_traceability_labels',
      modelName: 'CacaoTraceabilityLabels'
    }
  );
  return CacaoTraceabilityLabels;
};
