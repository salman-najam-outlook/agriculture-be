const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class TreeDetailsPlot extends Model {
    static associate(models) {
      TreeDetailsPlot.belongsTo(models.TreeDetail, {
        foreignKey: 'tree_detail_id',
        as: 'tree'
      });

      TreeDetailsPlot.belongsTo(models.TreeMappingPlot, {
        foreignKey: 'tree_mapping_plot_id',
        as: 'plot'
      });
    }
  }

  TreeDetailsPlot.init({
    tree_detail_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tree_mapping_plot_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'TreeDetailsPlot',
    tableName: 'tree_mapping_plots_tree_details',
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  return TreeDetailsPlot;
};