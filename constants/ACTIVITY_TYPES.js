/**
 * Plantation Traceability Activity Types Configuration
 * 
 * This file defines all supported activity types for plantation traceability.
 * Add or remove activity types here as needed without requiring database migrations.
 */

const ACTIVITY_TYPES = {
  // Current required activity types for plantation traceability
  SOWING_PLANTING: 'sowing_planting',
  NUTRIENT_MANAGEMENT: 'nutrient_management',
  IRRIGATION: 'irrigation',
  WEED_CONTROL: 'weed_control',
  PEST_MANAGEMENT: 'pest_management',
  DISEASE_MANAGEMENT: 'disease_management',
  HARVESTING: 'harvesting',
  MY_CROP_GOALS: 'my_crop_goals',
  CROP_OBSERVATION: 'crop_observation'
};

// Array of all activity types for validation
const ACTIVITY_TYPES_ARRAY = Object.values(ACTIVITY_TYPES);

// Human-readable labels for activity types
const ACTIVITY_TYPE_LABELS = {
  [ACTIVITY_TYPES.SOWING_PLANTING]: 'Sowing/Planting',
  [ACTIVITY_TYPES.NUTRIENT_MANAGEMENT]: 'Nutrient Management',
  [ACTIVITY_TYPES.IRRIGATION]: 'Irrigation',
  [ACTIVITY_TYPES.WEED_CONTROL]: 'Weed Control',
  [ACTIVITY_TYPES.PEST_MANAGEMENT]: 'Pest Management',
  [ACTIVITY_TYPES.DISEASE_MANAGEMENT]: 'Disease Management',
  [ACTIVITY_TYPES.HARVESTING]: 'Harvesting',
  [ACTIVITY_TYPES.MY_CROP_GOALS]: 'My Crop Goals',
  [ACTIVITY_TYPES.CROP_OBSERVATION]: 'Crop Observation'
};

// Activity type categories for grouping
const ACTIVITY_CATEGORIES = {
  CULTIVATION: [
    ACTIVITY_TYPES.SOWING_PLANTING
  ],
  CROP_CARE: [
    ACTIVITY_TYPES.IRRIGATION,
    ACTIVITY_TYPES.NUTRIENT_MANAGEMENT,
    ACTIVITY_TYPES.WEED_CONTROL
  ],
  PROTECTION: [
    ACTIVITY_TYPES.PEST_MANAGEMENT,
    ACTIVITY_TYPES.DISEASE_MANAGEMENT
  ],
  HARVEST: [
    ACTIVITY_TYPES.HARVESTING
  ],
  MONITORING: [
    ACTIVITY_TYPES.CROP_OBSERVATION,
    ACTIVITY_TYPES.MY_CROP_GOALS
  ]
};

/**
 * Validate if an activity type is supported
 * @param {string} activityType - Activity type to validate
 * @returns {boolean} - True if valid
 */
function isValidActivityType(activityType) {
  return ACTIVITY_TYPES_ARRAY.includes(activityType);
}

/**
 * Get human-readable label for activity type
 * @param {string} activityType - Activity type
 * @returns {string} - Human-readable label
 */
function getActivityTypeLabel(activityType) {
  return ACTIVITY_TYPE_LABELS[activityType] || activityType;
}

/**
 * Get activity types by category
 * @param {string} category - Category name
 * @returns {array} - Array of activity types in that category
 */
function getActivityTypesByCategory(category) {
  return ACTIVITY_CATEGORIES[category] || [];
}

/**
 * Get all activity types with their labels
 * @returns {array} - Array of objects with value and label
 */
function getAllActivityTypesWithLabels() {
  return ACTIVITY_TYPES_ARRAY.map(type => ({
    value: type,
    label: getActivityTypeLabel(type)
  }));
}

module.exports = {
  ACTIVITY_TYPES,
  ACTIVITY_TYPES_ARRAY,
  ACTIVITY_TYPE_LABELS,
  ACTIVITY_CATEGORIES,
  isValidActivityType,
  getActivityTypeLabel,
  getActivityTypesByCategory,
  getAllActivityTypesWithLabels
}; 