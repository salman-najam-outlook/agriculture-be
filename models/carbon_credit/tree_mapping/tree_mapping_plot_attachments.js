const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class TreeMappingPlotAttachment extends Model {
    static associate(models) {
      // Belongs to TreeMappingPlot
      TreeMappingPlotAttachment.belongsTo(models.TreeMappingPlot, {
        foreignKey: 'plot_id',
        as: 'plot'
      });
    }
  }

  TreeMappingPlotAttachment.init({
    plot_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    file_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    file_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    s3_url: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'TreeMappingPlotAttachment',
    tableName: 'tree_mapping_plot_attachments',
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  return TreeMappingPlotAttachment;
};