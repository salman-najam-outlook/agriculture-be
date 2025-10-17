const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {
  getPlantationTraceability,
  getActivityDetails,
  getUserPlantationsList
} = require('../../helpers/plantationTraceabilityService');
const { isValidActivityType } = require('../../constants/ACTIVITY_TYPES');

/**
 * @route GET /plantation-traceability/plantations
 * @desc Get list of user's plantations for traceability
 * @access Private
 */
router.get('/plantations', auth, async (req, res) => {
  try {
    const user_id = req.user.id;
    const { 
      status, 
      crop_id, 
      farm_id,
      zone_id,
      start_date,
      end_date,
      page = 1, 
      limit = 20,
      search 
    } = req.query;

    const filters = {};
    if (status) {
      // Convert status to boolean for the new plantation_status field
      if (status === 'true' || status === true || status === 'active') {
        filters.plantation_status = true;
      } else if (status === 'false' || status === false || status === 'inactive' || status === 'fully_harvested') {
        filters.plantation_status = false;
      }
    }
    if (crop_id) filters.crop_id = parseInt(crop_id);
    if (farm_id) filters.farm_id = parseInt(farm_id);
    if (zone_id) filters.zone_id = parseInt(zone_id);
    if (start_date) filters.start_date = start_date;
    if (end_date) filters.end_date = end_date;

    let plantations = await getUserPlantationsList(user_id, filters);

    // Apply search filter if provided
    if (search) {
      const searchTerm = search.toLowerCase();
      plantations = plantations.filter(p => 
        (p.plantation_id && p.plantation_id.toLowerCase().includes(searchTerm)) ||
        p.farm_name.toLowerCase().includes(searchTerm) ||
        p.crop_name.toLowerCase().includes(searchTerm)
      );
    }

    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedPlantations = plantations.slice(startIndex, endIndex);

    res.json({
      success: true,
      data: {
        plantations: paginatedPlantations,
        pagination: {
          current_page: parseInt(page),
          total_pages: Math.ceil(plantations.length / limit),
          total_items: plantations.length,
          items_per_page: parseInt(limit)
        }
      }
    });

  } catch (error) {
    console.error('Error getting plantations list:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve plantations',
      error: error.message
    });
  }
});

/**
 * @route GET /plantation-traceability/plantations/:sowingId
 * @desc Get detailed traceability timeline for a specific sowing record
 * @access Private
 */
router.get('/plantations/:sowingId', auth, async (req, res) => {
  try {
    const user_id = req.user.id;
    const { sowingId } = req.params;
    const { 
      activity_type, 
      start_date, 
      end_date 
    } = req.query;

    const filters = {};
    
    // Validate activity_type if provided
    if (activity_type) {
      if (!isValidActivityType(activity_type)) {
        return res.status(400).json({
          success: false,
          message: `Invalid activity type: ${activity_type}`
        });
      }
      filters.activity_type = activity_type;
    }
    
    if (start_date) filters.start_date = start_date;
    if (end_date) filters.end_date = end_date;

    const traceabilityData = await getPlantationTraceability(
      parseInt(sowingId), 
      user_id, 
      filters
    );

    res.json({
      success: true,
      data: traceabilityData
    });

  } catch (error) {
    console.error('Error getting plantation traceability:', error);
    
    if (error.message.includes('not found') || error.message.includes('access denied')) {
      return res.status(404).json({
        success: false,
        message: 'Plantation not found or access denied'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to retrieve plantation traceability',
      error: error.message
    });
  }
});

/**
 * @route GET /plantation-traceability/activities/:activityType/:activityId/details
 * @desc Get detailed activity information from original module
 * @access Private
 */
router.get('/activities/:activityType/:activityId/details', auth, async (req, res) => {
  try {
    const user_id = req.user.id;
    const { activityType, activityId } = req.params;

    // Validate activity_type
    if (!isValidActivityType(activityType)) {
      return res.status(400).json({
        success: false,
        message: `Invalid activity type: ${activityType}`
      });
    }

    // Get the detailed activity information using the existing service
    const activityDetails = await getActivityDetails(
      activityType,
      parseInt(activityId),
      user_id
    );

    res.json({
      success: true,
      data: {
        activity_type: activityType,
        activity_id: parseInt(activityId),
        activity_details: activityDetails
      }
    });

  } catch (error) {
    console.error('Error getting activity details:', error);
    
    if (error.message.includes('not found') || error.message.includes('access denied')) {
      return res.status(404).json({
        success: false,
        message: 'Activity not found or access denied'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to retrieve activity details',
      error: error.message
    });
  }
});


module.exports = router; 