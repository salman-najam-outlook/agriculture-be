const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class TreeMappingRequestPlots extends Model {
    static associate(models) {
      // Belongs to TreeMappingPlot
      TreeMappingRequestPlots.belongsTo(models.TreeMappingPlot, {
        foreignKey: 'tree_mapping_plot_id',
        as: 'plot'
      });

      // Belongs to TreeMappingRequest
      TreeMappingRequestPlots.belongsTo(models.TreeMappingRequest, {
        foreignKey: 'tree_mapping_request_id',
        as: 'request'
      });
    }
  }

  TreeMappingRequestPlots.init({
    tree_mapping_plot_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tree_mapping_request_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('pending', 'partially_submitted', 'submitted'),
      allowNull: false,
      defaultValue: 'pending'
    }
  }, {
    sequelize,
    modelName: 'TreeMappingRequestPlots',
    tableName: 'tree_mapping_request_plots',
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  return TreeMappingRequestPlots;
};