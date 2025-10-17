const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class DiseaseDetectionFeedback extends Model {
    static associate(models) {
     
      this.belongsTo(models.DiseaseDetection, {
        foreignKey: 'diseaseDetectionId',
        as: 'diseaseDetection',
      });
      this.belongsTo(models.user, {
        foreignKey: 'userId',
        as: 'user',
      });
    }
  }

  DiseaseDetectionFeedback.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      agree: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      diseaseDetectionId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'disease_detection',
          key: 'id',
        },
      },
      imgUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      diseaseId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      accuracyDegree: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      notes: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'DiseaseDetectionFeedback',
      tableName: 'disease_detection_feedback',
      timestamps: true,
    }
  );

  return DiseaseDetectionFeedback;
};
