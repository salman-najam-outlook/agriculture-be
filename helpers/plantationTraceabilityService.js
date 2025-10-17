'use strict';

const db = require(rootPath + '/models');
const { ACTIVITY_TYPES, isValidActivityType } = require('../constants/ACTIVITY_TYPES');

/**
 * Add activity to plantation traceability
 * @param {object} activityData - Activity data to be added
 * @param {object} transaction - Database transaction
 */
async function addActivityToTraceability(activityData, transaction = null) {
  try {
    const {
      plantation_id,
      user_id,
      activity_type,
      activity_id,
      activity_date
    } = activityData;

    // Validate activity type
    if (!isValidActivityType(activity_type)) {
      throw new Error(`Invalid activity type: ${activity_type}`);
    }

    // Validate required fields
    if (!plantation_id || !user_id || !activity_id || !activity_date) {
      throw new Error('Missing required fields for traceability');
    }

    const traceabilityEntry = await db.PlantationTraceability.create({
      plantation_id,
      user_id,
      activity_type,
      activity_id,
      activity_date
    }, { transaction });

    return traceabilityEntry;

  } catch (error) {
    console.error('Error adding activity to traceability:', error);
    throw error;
  }
}

/**
 * Delete traceability record
 * @param {object} activityData - Activity data to be deleted
 * @param {object} transaction - Database transaction
 */
async function deleteTraceabilityRecord({ plantation_id, user_id, activity_id, activity_type }, transaction = null) {
  try {
    await db.PlantationTraceability.destroy({
      where: {
        plantation_id,
        user_id,
        activity_id,
        activity_type
      },
      transaction
    });
  } catch (error) {
    console.error('Error deleting traceability record:', error);
    throw error;
  }
}

/**
 * Get traceabilities by activity
 * @param {object} activityData - Activity data to be fetched
 * @param {object} transaction - Database transaction
 */
async function getTraceabilitiesByActivity({ activity_id, activity_type, user_id }) {
  try {
    return await db.PlantationTraceability.findAll({
      where: {
        activity_id,
        activity_type,
        user_id
      }
    });
  } catch (error) {
    console.error('Error fetching traceabilities by activity:', error);
    throw error;
  }
}



/**
 * Get activity details from original module based on activity_type and activity_id
 * @param {string} activity_type - Type of activity
 * @param {number} activity_id - ID of the activity record
 * @param {number} user_id - User ID for security
 */
async function getActivityDetails(activity_type, activity_id, user_id) {
  try {
    let details = null;
    
    switch (activity_type) {
      case ACTIVITY_TYPES.SOWING_PLANTING:
        details = await db.Sowing.findOne({
          where: { id: activity_id, userId: user_id },
          include: [
            {
              model: db.user_farm,
              through: { attributes: [] },
              attributes: ['id', 'farmName']
            },
            {
              model: db.Option,
              foreignKey: 'cropId',
              attributes: ['id', 'name']
            }
          ]
        });
        break;

      case ACTIVITY_TYPES.IRRIGATION:
        details = await db.Irrigation.findOne({
          where: { id: activity_id, userId: user_id },
          include: [
            {
              model: db.user_farm,
              attributes: ['id', 'farmName']
            },
            {
              model: db.Option,
              as: 'WaterSource',
              attributes: ['id', 'name']
            },
            {
              model: db.UnitsList,
              as: 'AreaUnit',
              attributes: ['id', 'name']
            }
          ]
        });
        break;

      case ACTIVITY_TYPES.NUTRIENT_MANAGEMENT:
        details = await db.nutrientManagement.findOne({
          where: { id: activity_id, userId: user_id },
          include: [
            {
              model: db.user_farm,
              attributes: ['id', 'farmName']
            },
            {
              model: db.Option,
              as: 'NutrientType',
              attributes: ['id', 'name']
            }
          ]
        });
        break;

      case ACTIVITY_TYPES.WEED_CONTROL:
        details = await db.WeedControl.findOne({
          where: { id: activity_id, userId: user_id },
          include: [
            {
              model: db.user_farm,
              attributes: ['id', 'farmName']
            }
          ]
        });
        break;

      case ACTIVITY_TYPES.PEST_MANAGEMENT:
        details = await db.PestManagement.findOne({
          where: { id: activity_id, userId: user_id },
          include: [
            {
              model: db.user_farm,
              attributes: ['id', 'farmName']
            },
            {
              model: db.Option,
              as: 'Pest',
              attributes: ['id', 'name']
            }
          ]
        });
        break;

      case ACTIVITY_TYPES.DISEASE_MANAGEMENT:
        details = await db.DiseaseManagement.findOne({
          where: { id: activity_id, userId: user_id },
          include: [
            {
              model: db.user_farm,
              attributes: ['id', 'farmName']
            },
            {
              model: db.Option,
              as: 'Disease',
              attributes: ['id', 'name']
            }
          ]
        });
        break;

      case ACTIVITY_TYPES.HARVESTING:
        details = await db.Harvest.findOne({
          where: { id: activity_id, userId: user_id },
          include: [
            {
              model: db.user_farm,
              attributes: ['id', 'farmName']
            },
            {
              model: db.Option,
              as: 'Crop',
              attributes: ['id', 'name']
            }
          ]
        });
        break;

      case ACTIVITY_TYPES.MY_CROP_GOALS:
        details = await db.CropGoal.findOne({
          where: { id: activity_id, userId: user_id },
          include: [
            {
              model: db.user_farm,
              attributes: ['id', 'farmName']
            },
            {
              model: db.Option,
              as: 'Crop',
              attributes: ['id', 'name']
            }
          ]
        });
        break;

      case ACTIVITY_TYPES.CROP_OBSERVATION:
        details = await db.CropObservation.findOne({
          where: { id: activity_id, userId: user_id },
          include: [
            {
              model: db.user_farm,
              attributes: ['id', 'farmName']
            },
            {
              model: db.Option,
              as: 'Crop',
              attributes: ['id', 'name']
            }
          ]
        });
        break;

      default:
        throw new Error(`Unsupported activity type: ${activity_type}`);
    }

    return details;

  } catch (error) {
    console.error('Error getting activity details:', error);
    throw error;
  }
}

/**
 * Get sowing traceability timeline with basic activity info
 * @param {number} sowing_id - Sowing ID (from sowing table)
 * @param {number} user_id - User ID
 * @param {object} filters - Optional filters
 */
async function getPlantationTraceability(sowing_id, user_id, filters = {}) {
  try {
    // Get sowing record basic info
    const sowing = await db.Sowing.findOne({
      where: {
        id: sowing_id,
        userId: user_id
      },
      include: [
        {
          model: db.user_farm,
          through: { attributes: [] },
          attributes: ['id', 'farmName']
        },
        {
          model: db.Option,
          foreignKey: 'cropId',
          attributes: ['id', 'name']
        }
      ]
    });

    if (!sowing) {
      throw new Error('Sowing record not found or access denied');
    }

    // Build where clause for activities
    let whereClause = {
      plantation_id: sowing_id, // plantation_id stores sowing.id
      user_id
    };

    if (filters.activity_type) {
      whereClause.activity_type = filters.activity_type;
    }
    
    if (filters.start_date || filters.end_date) {
      whereClause.activity_date = {};
      if (filters.start_date) {
        whereClause.activity_date[db.Sequelize.Op.gte] = new Date(filters.start_date);
      }
      if (filters.end_date) {
        whereClause.activity_date[db.Sequelize.Op.lte] = new Date(filters.end_date);
      }
    }

    // Get traceability activities
    const activities = await db.PlantationTraceability.findAll({
      where: whereClause,
      attributes: [
        'id', 'activity_type', 'activity_id', 'activity_date'
      ],
      order: [['activity_date', 'DESC']]
    });

    // Group activities by month for timeline display
    const groupedActivities = {};
    
    activities.forEach(activity => {
      const date = new Date(activity.activity_date);
      const monthKey = date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long' 
      });

      if (!groupedActivities[monthKey]) {
        groupedActivities[monthKey] = {
          month: monthKey,
          activities: []
        };
      }

      groupedActivities[monthKey].activities.push({
        id: activity.id,
        activity_type: activity.activity_type,
        activity_id: activity.activity_id,
        date: activity.activity_date
      });
    });

    return {
      sowing: {
        id: sowing.id,
        plantation_id: sowing.plantation_id,
        farm_name: sowing.user_farms?.[0]?.farmName,
        crop_name: sowing.Option?.name,
        start_date: sowing.startDate,
        end_date: sowing.endDate,
        area: sowing.area
      },
      timeline: Object.values(groupedActivities)
    };

  } catch (error) {
    console.error('Error getting plantation traceability:', error);
    throw error;
  }
}

/**
 * Get user's sowing list with basic info for traceability listing
 * @param {number} user_id - User ID
 * @param {object} filters - Optional filters (farm_id, zone_id, crop_id, start_date, end_date)
 */
async function getUserPlantationsList(user_id, filters = {}) {
  try {
    let whereClause = {
      userId: user_id,
      plantation_id: {
        [db.Sequelize.Op.not]: null
      }
    };

    // Add crop filter (direct field in sowing table)
    if (filters.crop_id) {
      whereClause.cropId = filters.crop_id;
    }

    // Add date range filter for planting date
    if (filters.start_date || filters.end_date) {
      whereClause.startDate = {};
      if (filters.start_date) {
        whereClause.startDate[db.Sequelize.Op.gte] = new Date(filters.start_date);
      }
      if (filters.end_date) {
        whereClause.startDate[db.Sequelize.Op.lte] = new Date(filters.end_date);
      }
    }

    let includeClause = [
      {
        model: db.user_farm,
        through: { 
          attributes: [],
          ...(filters.farm_id && { where: { userFarmId: filters.farm_id } })
        },
        attributes: ['id', 'farmName'],
        required: filters.farm_id ? true : false
      },
      {
        model: db.Geofence,
        as: 'segments',
        through: { 
          attributes: [],
          ...(filters.zone_id && { where: { geofenceId: filters.zone_id } })
        },
        attributes: ['id', 'geofenceName'],
        required: filters.zone_id ? true : false
      },
      {
        model: db.Option,
        foreignKey: 'cropId',
        attributes: ['id', 'name']
      }
    ];

    const sowings = await db.Sowing.findAll({
      where: whereClause,
      include: includeClause,
      attributes: [
        'id', 'plantation_id', 'startDate', 'endDate', 'area', 'plantation_status'
      ],
      order: [['startDate', 'DESC']],
      distinct: true
    });

    // Get activity counts for each sowing
    const sowingData = await Promise.all(
      sowings.map(async (sowing) => {
        const activityCount = await db.PlantationTraceability.count({
          where: {
            plantation_id: sowing.id, // plantation_id stores sowing.id
            user_id
          }
        });

        const lastActivity = await db.PlantationTraceability.findOne({
          where: {
            plantation_id: sowing.id, // plantation_id stores sowing.id
            user_id
          },
          order: [['activity_date', 'DESC']],
          attributes: ['activity_date', 'activity_type']
        });

        // Get all associated farms and zones for display
        const farms = sowing.user_farms || [];
        const zones = sowing.segments || [];

        return {
          sowing_id: sowing.id,
          plantation_id: sowing.plantation_id,
          plantation_status: sowing.plantation_status,
          farm_name: farms.length > 0 ? farms[0].farmName : 'Unknown Farm',
          farms: farms.map(farm => ({ id: farm.id, name: farm.farmName })),
          zones: zones.map(zone => ({ id: zone.id, name: zone.geofenceName })),
          crop_name: sowing.Option?.name || 'Unknown Crop',
          crop_id: sowing.Option?.id,
          start_date: sowing.startDate,
          end_date: sowing.endDate,
          area: sowing.area,
          activity_count: activityCount,
          last_activity: lastActivity ? {
            date: lastActivity.activity_date,
            type: lastActivity.activity_type
          } : null
        };
      })
    );

    return sowingData;

  } catch (error) {
    console.error('Error getting user sowings list:', error);
    throw error;
  }
}


module.exports = {
  addActivityToTraceability,
  deleteTraceabilityRecord,
  getTraceabilitiesByActivity,
  getActivityDetails,
  getPlantationTraceability,
  getUserPlantationsList
}; 