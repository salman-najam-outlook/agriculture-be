const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class TreeMappingRequest extends Model {
    static associate(models) {
      TreeMappingRequest.belongsTo(models.user, {
        foreignKey: 'farmer_id',
        as: 'farmer'
      });

      TreeMappingRequest.belongsTo(models.user_farm, {
        foreignKey: 'farm_id',
        as: 'farm'
      });

      TreeMappingRequest.belongsToMany(models.TreeMappingPlot, {
        through: 'tree_mapping_request_plots',
        foreignKey: 'tree_mapping_request_id',
        otherKey: 'tree_mapping_plot_id',
        as: 'plots'
      });

      TreeMappingRequest.hasMany(models.TreeMappingRequestAssignee, {
        foreignKey: 'tree_mapping_request_id',
        as: 'assignees'
      });
    }
  }

  TreeMappingRequest.init({
    request_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    farmer_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    farm_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('pending', 'in_progress', 'submitted', 'completed', 'cancelled'),
      allowNull: false,
      defaultValue: 'pending'
    },
    recordId: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'recordId'
    },
    farm_location_address: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    country: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
  }, {
    sequelize,
    modelName: 'TreeMappingRequest',
    tableName: 'tree_mapping_requests',
    timestamps: true,
    paranoid: true,
    scopes: {
      active: {
        where: {
          deleted_at: null
        }
      }
    },
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
  });

  return TreeMappingRequest;
};
