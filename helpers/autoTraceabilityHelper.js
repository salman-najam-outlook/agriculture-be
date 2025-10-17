'use strict';

const { addActivityToTraceability, updateActivityInTraceability, deleteTraceabilityRecord , getTraceabilitiesByActivity} = require('./plantationTraceabilityService');
const { ACTIVITY_TYPES } = require('../constants/ACTIVITY_TYPES');

/**
 * Auto-add sowing activity to traceability when plantation is created
 * @param {object} sowingData - Sowing record data
 * @param {number} userId - User ID (for compatibility with route call)
 * @param {object} transaction - Database transaction
 */
async function addSowingToTraceability(sowingData, userId, transaction = null) {
  try {
    if (!sowingData.id || !userId) {
      console.log('Missing sowing ID or userId for sowing traceability');
      return;
    }

    await addActivityToTraceability({
      plantation_id: sowingData.id,
      user_id: userId,
      activity_type: ACTIVITY_TYPES.SOWING_PLANTING,
      activity_id: sowingData.id,
      activity_date: sowingData.startDate
    }, transaction);

  } catch (error) {
    console.error('Error adding sowing to traceability:', error);
    // Don't throw error to avoid breaking the main operation
  }
}

/**
 * Auto-add irrigation activity to traceability when irrigation is logged
 * @param {object} irrigationData - Irrigation record data
 * @param {array} plantationIds - Array of plantation IDs
 * @param {object} transaction - Database transaction
 */
async function addIrrigationToTraceability(irrigationData, plantationIds, transaction = null) {
  try {
    if (!plantationIds || plantationIds.length === 0) {
      console.log('No plantation IDs provided for irrigation traceability');
      return;
    }

    for (const plantationId of plantationIds) {
            await addActivityToTraceability({
        plantation_id: plantationId,
        user_id: irrigationData.userId,
        activity_type: ACTIVITY_TYPES.IRRIGATION,
        activity_id: irrigationData.id,
        activity_date: irrigationData.irrigationDate || irrigationData.createdAt
      }, transaction);
    }

  } catch (error) {
    console.error('Error adding irrigation to traceability:', error);
  }
}

/**
 * Auto-update irrigation activity to traceability
 * @param {object} activityData - Irrigation record data
 * @param {array} plantationIds - Array of plantation IDs
 * @param {object} transaction - Database transaction
 */

async function updateActivityToTraceability(activityData, plantationIds, transaction = null) {
  try {
    if (!plantationIds || plantationIds.length === 0) return;

    const previousTraceabilities = await getTraceabilitiesByActivity({
      activity_id: activityData.id,
      activity_type: activityData.activity_type,
      user_id: activityData.userId
    });
    const previousPlantationIds = previousTraceabilities.map(t => t.plantation_id);
    const toRemove = previousPlantationIds.filter(id => !plantationIds.includes(id));

    for (const plantationId of toRemove) {
      await deleteTraceabilityRecord({
        plantation_id: plantationId,
        user_id: activityData.userId,
        activity_id: activityData.id,
        activity_type: activityData.activity_type
      }, transaction);
    }

    for (const plantationId of plantationIds) {
      await addActivityToTraceability({
        plantation_id: plantationId,
        user_id: activityData.userId,
        activity_type: activityData.activity_type,
        activity_id: activityData.id,
        activity_date: activityData.activity_date || activityData.createdAt
      }, transaction);
    }

  } catch (error) {
    console.error('Error updating irrigation to traceability:', error);
  }
}

/**
 * Auto-add nutrient management activity to traceability
 * @param {object} nutrientData - Nutrient management record data
 * @param {array} plantationIds - Array of plantation IDs
 * @param {object} transaction - Database transaction
 */
async function addNutrientManagementToTraceability(nutrientData, plantationIds, transaction = null) {
  try {
    if (!plantationIds || plantationIds.length === 0) return;

    for (const plantationId of plantationIds) {
            await addActivityToTraceability({
        plantation_id: plantationId,
        user_id: nutrientData.userId,
        activity_type: ACTIVITY_TYPES.NUTRIENT_MANAGEMENT,
        activity_id: nutrientData.id,
        activity_date: nutrientData.applicationDate || nutrientData.createdAt
      }, transaction);
    }

  } catch (error) {
    console.error('Error adding nutrient management to traceability:', error);
  }
}

/**
 * Auto-add weed control activity to traceability
 * @param {object} weedData - Weed control record data
 * @param {array} plantationIds - Array of plantation IDs
 * @param {object} transaction - Database transaction
 */
async function addWeedControlToTraceability(weedData, plantationIds, transaction = null) {
  try {
    if (!plantationIds || plantationIds.length === 0) return;

    for (const plantationId of plantationIds) {
            await addActivityToTraceability({
        plantation_id: plantationId,
        user_id: weedData.userId,
        activity_type: ACTIVITY_TYPES.WEED_CONTROL,
        activity_id: weedData.id,
        activity_date: weedData.controlDate || weedData.createdAt
      }, transaction);
    }

  } catch (error) {
    console.error('Error adding weed control to traceability:', error);
  }
}

/**
 * Auto-add pest management activity to traceability
 * @param {object} pestData - Pest management record data
 * @param {array} plantationIds - Array of plantation IDs
 * @param {object} transaction - Database transaction
 */
async function addPestManagementToTraceability(pestData, plantationIds, transaction = null) {
  try {
    if (!plantationIds || plantationIds.length === 0) return;

    for (const plantationId of plantationIds) {
            await addActivityToTraceability({
        plantation_id: plantationId,
        user_id: pestData.userId,
        activity_type: ACTIVITY_TYPES.PEST_MANAGEMENT,
        activity_id: pestData.id,
        activity_date: pestData.treatmentDate || pestData.createdAt
      }, transaction);
    }

  } catch (error) {
    console.error('Error adding pest management to traceability:', error);
  }
}

/**
 * Auto-add disease management activity to traceability
 * @param {object} diseaseData - Disease management record data
 * @param {array} plantationIds - Array of plantation IDs
 * @param {object} transaction - Database transaction
 */
async function addDiseaseManagementToTraceability(diseaseData, plantationIds, transaction = null) {
  try {
    if (!plantationIds || plantationIds.length === 0) return;

    for (const plantationId of plantationIds) {
            await addActivityToTraceability({
        plantation_id: plantationId,
        user_id: diseaseData.userId,
        activity_type: ACTIVITY_TYPES.DISEASE_MANAGEMENT,
        activity_id: diseaseData.id,
        activity_date: diseaseData.treatmentDate || diseaseData.createdAt
      }, transaction);
    }

  } catch (error) {
    console.error('Error adding disease management to traceability:', error);
  }
}

/**
 * Auto-add harvesting activity to traceability
 * @param {object} harvestData - Harvest record data
 * @param {array} plantationIds - Array of plantation IDs
 * @param {object} transaction - Database transaction
 */
async function addHarvestingToTraceability(harvestData, plantationIds, transaction = null) {
  try {
    if (!plantationIds || plantationIds.length === 0) return;

    for (const plantationId of plantationIds) {
            await addActivityToTraceability({
        plantation_id: plantationId,
        user_id: harvestData.userId,
        activity_type: ACTIVITY_TYPES.HARVESTING,
        activity_id: harvestData.id,
        activity_date: harvestData.harvestDate || harvestData.createdAt
      }, transaction);
    }

  } catch (error) {
    console.error('Error adding harvesting to traceability:', error);
  }
}

/**
 * Auto-add crop goal activity to traceability
 * @param {object} goalData - Crop goal record data
 * @param {array} plantationIds - Array of plantation IDs
 * @param {object} transaction - Database transaction
 */
async function addCropGoalToTraceability(goalData, plantationIds, transaction = null) {
  try {
    if (!plantationIds || plantationIds.length === 0) return;

    for (const plantationId of plantationIds) {
      await addActivityToTraceability({
        plantation_id: plantationId,
        user_id: goalData.userId,
        activity_type: ACTIVITY_TYPES.MY_CROP_GOALS,
        activity_id: goalData.id,
        activity_date: goalData.targetDate || goalData.createdAt
      }, transaction);
    }

  } catch (error) {
    console.error('Error adding crop goal to traceability:', error);
  }
}

/**
 * Auto-add crop observation activity to traceability
 * @param {object} observationData - Crop observation record data
 * @param {array} plantationIds - Array of plantation IDs
 * @param {object} transaction - Database transaction
 */
async function addCropObservationToTraceability(observationData, plantationIds, transaction = null) {
  try {
    if (!plantationIds || plantationIds.length === 0) return;

    for (const plantationId of plantationIds) {
      await addActivityToTraceability({
        plantation_id: plantationId,
        user_id: observationData.userId,
        activity_type: ACTIVITY_TYPES.CROP_OBSERVATION,
        activity_id: observationData.id,
        activity_date: observationData.observationDate || observationData.createdAt
      }, transaction);
    }

  } catch (error) {
    console.error('Error adding crop observation to traceability:', error);
  }
}

module.exports = {
  addSowingToTraceability,
  addIrrigationToTraceability,
  addNutrientManagementToTraceability,
  addWeedControlToTraceability,
  addPestManagementToTraceability,
  addDiseaseManagementToTraceability,
  addHarvestingToTraceability,
  addCropGoalToTraceability,
  addCropObservationToTraceability,
  updateActivityToTraceability
}; 