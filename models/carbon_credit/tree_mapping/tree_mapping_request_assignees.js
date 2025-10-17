const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class TreeMappingRequestAssignee extends Model {
    static associate(models) {
      // Belongs to TreeMappingPlot
      TreeMappingRequestAssignee.belongsTo(models.user, {
        foreignKey: 'assignee_id',
        as: 'assignee'
      });

      // Belongs to TreeMappingRequest
      TreeMappingRequestAssignee.belongsTo(models.TreeMappingRequest, {
        foreignKey: 'tree_mapping_request_id',
        as: 'request'
      });
    }
  }

  TreeMappingRequestAssignee.init({
    assignee_role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    assignee_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tree_mapping_request_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'TreeMappingRequestAssignee',
    tableName: 'tree_mapping_request_assignees',
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  return TreeMappingRequestAssignee;
};