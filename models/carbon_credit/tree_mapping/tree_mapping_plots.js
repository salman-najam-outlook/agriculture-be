// models/TreeMappingPlot.js
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class TreeMappingPlot extends Model {
    static associate(models) {
      TreeMappingPlot.belongsToMany(models.TreeDetail, {
        through: 'tree_mapping_plots_tree_details',
        foreignKey: 'tree_mapping_plot_id',
        otherKey: 'tree_detail_id',
        as: 'trees'
      });

      TreeMappingPlot.belongsToMany(models.TreeMappingRequest, {
        through: 'tree_mapping_request_plots',
        foreignKey: 'tree_mapping_plot_id',
        otherKey: 'tree_mapping_request_id',
        as: 'requests'
      });

      TreeMappingPlot.hasMany(models.TreeMappingPlotAttachment, {
        foreignKey: 'plot_id',
        as: 'attachments'
      });
      
      TreeMappingPlot.belongsTo(models.user, {
        foreignKey: 'created_by',
        as: 'creator'
      });
    }
  }

  TreeMappingPlot.init({
    plot_no: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    latitude: {
      type: DataTypes.DECIMAL(10, 8),
      allowNull: true
    },
    longitude: {
      type: DataTypes.DECIMAL(11, 8),
      allowNull: true
    },
    radius: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    slope: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
      defaultValue: null
    },
    aspect: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: true,
      defaultValue: null
    },
    no_of_trees: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },

    recordId: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'recordId'
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'TreeMappingPlot',
    tableName: 'tree_mapping_plots',
    timestamps: true,
    paranoid: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
  });

  return TreeMappingPlot;
};

