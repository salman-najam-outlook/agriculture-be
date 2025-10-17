const dateFormat = "MM/DD/YYYY";
const { check, oneOf, param, body, query } = require("express-validator");
const { isArray } = require("lodash");
const moment = require("moment");
const db = require(rootPath + '/models');

/**
 * @description check if goal name is unique or not
 * @returns promise
 */
const checkUniqueGoalName = async (value, { req }) => {
  const goalName = value;
  const userId = req.user.id;

  // check if user number is valid
  const goal = require(rootPath + "/helpers/controller");
  const status = await goal.isUniqueGoalName(goalName, userId);

  if (status != null) {
    return Promise.reject(new Error("Goal name must be unique"));
  }
};

/**
 * @description check if goal name is unique or not
 * @returns promise
 */
const checkUniqueGoalName_put = async (value, { req }) => {
  const goalName = value;
  const userId = req.user.id;
  const { id: goalId } = req.body;

  // check if user number is valid
  const goal = require(rootPath + "/helpers/controller");
  const status = await goal.isUniqueGoalName(goalName, userId, goalId);

  if (status != null) {
    return Promise.reject(new Error("Goal name must be unique"));
  }
};

/**
 * @description check if the goal exist or not with goal id
 * @returns promise
 */
const checkGoalExist = async (value, { req }) => {
  const goalId = value;
  const userId = req.user.id;

  // load helper controller
  const goal = require(rootPath + "/helpers/controller");
  const status = await goal.isGoalExistByPK(goalId, userId);

  if (status == null) {
    return Promise.reject(new Error("Goal with id doesn't exist"));
  }
};

// verify OTP validation
exports.verifyOtpValidation = () => {
  return [
    check("credential", "Credential is required").notEmpty(),
    check("otp")
      .notEmpty()
      .withMessage("OTP is required")
      .isNumeric()
      .withMessage("OTP should be number only"),
  ];
};

// registration with mobile and email validation
exports.registrationValidation = () => {
  return [
    param("type", "Invalid Type").isIn(["mobile", "email"]),
    oneOf([
      check("email", "Email is required").notEmpty(),
      check("mobile", "Mobile Number is required").notEmpty(),
    ]),
    check("password").notEmpty().withMessage("Password is required"),
    check("organizationCode")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Organization code is required"),
    check("countryCode", "Country Code is required")
      .if(check("mobile").notEmpty())
      .notEmpty(),
  ];
};

// validation for login
exports.loginValidation = () => {
  return [
    check("credential")
      .notEmpty()
      .withMessage("Credential is required")
      .trim()
      .escape(),
    check("password")
      .notEmpty()
      .withMessage("Password is required")
      .trim()
      .escape(),
  ];
};

// validation for login
exports.dashboardGraphFilterValidation = () => {
  return [
    check("filterType")
      .notEmpty()
      .withMessage("Filter Type is required")
      .trim()
      .escape(),
    check("data").notEmpty().withMessage("Data is required"),
  ];
};

// validation for create topic
exports.faqTopicCreateValidation = () => {
  return [
    check("org_id").custom((organization, { req }) => {
      if (!req.user.organization) {
        throw new Error("User has not been associated with an organization.");
      }
      return true;
    }),
    check("parentId")
      .notEmpty()
      .withMessage("parentId is required")
      .trim()
      .escape(),
    check("displayName")
      .notEmpty()
      .withMessage("displayName is required")
      .trim()
      .escape(),
    check("display")
      .notEmpty()
      .withMessage("display is required")
      .trim()
      .isBoolean()
      .withMessage("display must be a boolean"),
  ];
};

// validation for create topic
exports.faqTopicEditValidation = () => {
  return [
    check("displayName")
      .notEmpty()
      .withMessage("displayName is required")
      .trim()
      .escape(),
  ];
};

exports.faqTopicDeleteValidation = () => {
  return [check("id").notEmpty().withMessage("id is required").trim().escape()];
};

exports.deleteMediaValidation = () => {
  return [
    check("id").notEmpty().withMessage("id is required").trim().escape(),
    check("name").notEmpty().withMessage("name is required").trim().escape(),
    check("mediaId")
      .notEmpty()
      .withMessage("mediaId is required")
      .trim()
      .escape(),
  ];
};

exports.updateFaqValidation = () => {
  return [
    check("name").notEmpty().withMessage("name is required").trim().escape(),
    check("id").notEmpty().withMessage("id is required").trim().escape(),
  ];
};
exports.deleteFaqValidation = () => {
  return [
    check("name").notEmpty().withMessage("name is required").trim().escape(),
  ];
};

exports.createFaqValidation = () => {
  return [
    check("org_id").custom((organization, { req }) => {
      if (!req.user.organization) {
        throw new Error("User has not been associated with an organization.");
      }
      return true;
    }),
    check("name").notEmpty().withMessage("Name is required").trim().escape(),
    check("display")
      .notEmpty()
      .withMessage("display is required")
      .trim()
      .escape(),
    check("question")
      .notEmpty()
      .withMessage("question is required")
      .trim()
      .escape(),
    check("answer")
      .notEmpty()
      .withMessage("answer is required")
      .trim()
      .escape(),
  ];
};

// data validation for create ticket Admin
exports.createTicketValidation = () => {
  return [
    check("ticketUserType")
      .notEmpty()
      .withMessage("Ticket user type is required")
      .isIn(["Single User", "Group of users", "Dimitra Admin"])
      .withMessage(
        "value should in ('Single User', 'Group of users', 'Dimitra Admin')"
      )
      .trim()
      .escape(),
    check("subject")
      .notEmpty()
      .withMessage("subject is required")
      .trim()
      .escape(),
    check("description")
      .notEmpty()
      .withMessage("description is required")
      .trim(),
    check("status")
      .trim()
      .escape()
      .custom((status, { req }) => {
        if (req.body.ticketUserType != "Dimitra Admin") {
          if (!status) {
            throw new Error("status is required");
          }
        }
        return true;
      }),
    check("priority")
      .trim()
      .escape()
      .custom((priority, { req }) => {
        if (req.body.ticketUserType != "Dimitra Admin") {
          if (!priority) {
            throw new Error("priority is required");
          }
        }
        return true;
      }),
    body("startDate")
      .trim()
      .escape()
      .custom((startDate, { req }) => {
        if (req.body.ticketUserType != "Dimitra Admin") {
          const now = moment().format('YYYY-MM-DD');
          const sDate = moment(startDate, 'YYYY-MM-DD').format('YYYY-MM-DD')
          if (moment(sDate) < moment(now)) {
            throw new Error("Requested Date and Time should be greater than current date");
          }
        }
        return true;
      }),
    check("endDate")
      .trim()
      .escape()
      .custom((endDate, { req }) => {
        if (req.body.ticketUserType != "Dimitra Admin") {
          if (!endDate) {
            throw new Error(`Due date is required`);
          }
          let now = moment().format('YYYY-MM-DD');
          let msg = "Current Date";
          if (req.body.startDate) {
            const sDate = moment(req.body.startDate, 'YYYY-MM-DD').format('YYYY-MM-DD')
            now = sDate;
            msg = "Requested date and time";
          }
          const eDate = moment(endDate, 'YYYY-MM-DD').format('YYYY-MM-DD')
          if (moment(eDate) < moment(now)) {
            throw new Error(`Due date should be greater than ${msg}`);
          }
        }
        return true;
      }),
    check("areaOfRequest")
      .notEmpty()
      .withMessage("Area Of Request is required")
      .trim()
      .escape(),
    check('org_id')
      .custom((organization, { req }) => {
        if (!req.user.organization) {
          throw new Error('User has not been associated with an organization.');
        }
        return true;
      }),
    check("type").notEmpty().withMessage("type is required").trim().escape(),
    check("asigneeId").custom((asigneeId, { req }) => {
      if (req.body.ticketUserType != "Dimitra Admin") {
        if (!asigneeId) {
          throw new Error("asigneeId is required");
        }
      }
      return true;
    }),
  ];
};

// validation for create topic
exports.getTicketUserValidation = () => {
  return [
    // check('page')
    //   .notEmpty()
    //   .withMessage('page is required')
    //   .trim()
    //   .escape(),
    //   check('limit')
    //   .notEmpty()
    //   .withMessage('limit is required')
    //   .trim()
    //   .escape(),
  ];
};

exports.createCoffeeSpeciesValidation = () => {
  return [
    check('name')
      .notEmpty()
      .withMessage('name is required')
      .trim()
      .escape(),
    check('coffeeVarId')
      .notEmpty()
      .withMessage('Coffee variety id is required')
      .trim()
      .escape()
      .custom(async (id) => {
        const CoffeeVarietyData = await db.CoffeeVariety.findOne({ where: { id } });
        if (CoffeeVarietyData == null)
          throw new Error("CoffeeVariety id doesn't exist");
      }),
  ];
};

exports.markAsReadValidation = () => {
  return [
    check("ticketId")
      .notEmpty()
      .withMessage("ticket Id is required")
      .trim()
      .escape(),
  ];
};

exports.createSyntheticFertilizer = () => {
  return [
    check("name").notEmpty().withMessage("name is required").trim().escape(),
  ];
};

exports.createOrganicInputs = () => {
  return [
    check("name").notEmpty().withMessage("name is required").trim().escape(),
  ];
};

exports.createTicketCommentValidation = () => {
  return [
    query("ticketId")
      .notEmpty()
      .withMessage("Ticket id is required")
      .trim()
      .escape(),
    query("comment_type")
      .notEmpty()
      .withMessage("Comment type is required")
      .trim()
      .escape(),
  ];
};
exports.deleteTicketValidation = () => {
  return [
    check("ticketId")
      .notEmpty()
      .withMessage("Ticket Id is required")
      .trim()
      .escape(),
  ];
};

exports.updateTicketValidation = () => {
  return [
    check("subject")
      .notEmpty()
      .withMessage("subject is required")
      .trim()
      .escape(),
    check("description")
      .notEmpty()
      .withMessage("description is required")
      .trim(),
    check("areaOfRequest")
      .notEmpty()
      .withMessage("Area Of Request is required")
      .trim()
      .escape(),
    check("type").notEmpty().withMessage("type is required").trim().escape()
  ];
};

// admin panel registration validation
exports.adminRegistrationValidation = () => {
  return [
    check("firstName").notEmpty().withMessage("First name is required"),
    check("lastName").notEmpty().withMessage("Last name is required"),
    check("email").notEmpty().withMessage("Email Address is required"),
    check("countryCode").notEmpty().withMessage("Country code is required"),
    check("mobile").notEmpty().withMessage("Mobile Number is required"),
    check("password").notEmpty().withMessage("Password is required"),
    check("department").notEmpty().withMessage("Department is required"),
    check("role").notEmpty().withMessage("Role is required"),
  ];
};

exports.adminDdsUserRegistrationValidation = () => {
  return [
    check("firstName").notEmpty().withMessage("First name is required"),
    // check("lastName").notEmpty().withMessage("Last name is required"),
    check("email").notEmpty().withMessage("Email Address is required"),
    // check("mobile").notEmpty().withMessage("Phone Number is required"),
    // check("countryCode").notEmpty().withMessage("Country code is required"),
    check("role").notEmpty().withMessage("Role is required"),
    // check("password").notEmpty().withMessage("Password is required"),
    // check("department").notEmpty().withMessage("Department is required"),
  ];
};

// create user  role validation
exports.userRoleValidation = () => {
  return [
    check('name').notEmpty().withMessage('name is required'),
    check('description').notEmpty().withMessage('description is required'),
  ]
}

// roles post registration validation
exports.rolePostValidation = () => {
  return [
    check("roleName").notEmpty().withMessage("Role name is required"),
    check("description").notEmpty().withMessage("Description is required"),
  ];
};

// user membership post registration validation
exports.membershipPostValidation = () => {
  return [
    check("membershipType")
      .notEmpty()
      .withMessage("Membership type is required"),
    check("description").notEmpty().withMessage("Description is required"),
    check("membershipDuration")
      .notEmpty()
      .withMessage("Membership duration is required"),
    check("membershipDurationUnit")
      .notEmpty()
      .withMessage("Membership duration unit is required"),
    check("membershipFee").notEmpty().withMessage("Membership fee is required"),
  ];
};

// user membership post registration validation
exports.generateKeyValidation = () => {
  return [
    check("numberOfKeys")
      .isInt({ min: 1, max: 10000 }).
      withMessage("Value must be between 1 and 10000"),
    check("membershipType")
      .notEmpty()
      .withMessage("Membership type is required"),
    check("numberOfKeys").notEmpty().withMessage("numberOfKeys is required"),
  ];
};

// validation for adding animal for sale
exports.addSaleAnimalValidation = () => {
  return [
    check("latitude").notEmpty().withMessage("Latitude is required"),
    check("longitude").notEmpty().withMessage("Longitude is required"),
    check("title").notEmpty().withMessage("Title is required"),
    check("description").notEmpty().withMessage("Description is required"),
    check("contactMobile").notEmpty().withMessage("Mobile No is required"),
  ];
};

// validation for adding animal for sale
exports.getDocumentsValidation = () => {
  return [
    check("page")
      .notEmpty()
      .withMessage("Page is required")
      .isInt({ min: 1 })
      .withMessage("Invalid page number"),
  ];
};

// Create shipment
exports.createShipmentValidation = () => {
  return [
    check("invoiceDate").notEmpty().withMessage("Invoice Date is required"),
    check("orderId").notEmpty().withMessage("Order Id is required"),
    check("etaDate")
      .notEmpty()
      .withMessage("Estimated Arrival Date is required"),
  ];
};
// Update shipment
exports.updateShipmentValidation = () => {
  return [check("id").notEmpty().withMessage("Shipment Id is required")];
};
// Get all the shipments
exports.getShipmentsValidation = () => {
  return [
    check("page")
      .notEmpty()
      .withMessage("Page no. is required")
      .isInt({ min: 1 })
      .withMessage("Invalid page number"),
  ];
};

// Get all the shipments
exports.fetchGeofencingValidation = () => {
  return [
    check("page")
      .notEmpty()
      .withMessage("Page no. is required")
      .isInt({ min: 1 })
      .withMessage("Invalid page number"),
  ];
};

// Validation for creating farm segments
exports.farmSegmentValidation_post = () => {
  return [
    check("farmId").notEmpty().withMessage("Farm Id is required"),
    check("segments")
      .notEmpty()
      .withMessage("Segment is required")
      .isArray()
      .withMessage("Must be an array"),
    check("segments.*.coordinates").isArray().withMessage("Must be an array"),
    check("segments.*.coordinates.*.lat")
      .if(check("segments.*.coordinates").notEmpty())
      .notEmpty()
      .withMessage("Latitude is requried")
      .isFloat(),
    check("segments.*.coordinates.*.log")
      .if(check("segments.*.coordinates").notEmpty())
      .notEmpty()
      .withMessage("Longitude is requried")
      .isFloat(),
    check("segments.*.geofenceName")
      .notEmpty()
      .withMessage("This field is required"),
    check("segments.*.geofenceArea")
      .notEmpty()
      .withMessage("This field is required"),
    check("segments.*.geofenceAreaUOMId")
      .notEmpty()
      .withMessage("This field is required"),
    check("segments.*.geofenceParameter")
      .notEmpty()
      .withMessage("This field is required"),
    check("segments.*.geofenceParameterUOMId")
      .notEmpty()
      .withMessage("This field is required"),
  ];
};
// Validation for the updation of the farm segment
exports.farmSegmentValidation_put = () => {
  return [
    check("id", "Invalid Id")
      .notEmpty()
      .withMessage("Segment Id is required")
      .isInt(),
    check("farmId")
      .if(check("farmId").notEmpty())
      .isInt()
      .withMessage("Farm Id must be a positive integer"),
    check("coordinates")
      .if(check("coordinates").notEmpty())
      .isArray()
      .withMessage("Must be an array"),
    check("coordinates.*.lat")
      .if(check("coordinates").notEmpty())
      .notEmpty()
      .withMessage("Latitude is requried")
      .isFloat(),
    check("coordinates.*.log")
      .if(check("coordinates").notEmpty())
      .notEmpty()
      .withMessage("Longitude is requried")
      .isFloat(),
    check("geofenceName")
      .if(check("geofenceName").notEmpty())
      .isString()
      .withMessage("Geofence Name must be string"),
    check("geofenceArea")
      .if(check("geofenceArea").notEmpty())
      .isFloat()
      .withMessage("Must be a postive integer"),
    check("geofenceAreaUOMId")
      .if(check("geofenceAreaUOMId").notEmpty())
      .isInt()
      .withMessage("Must be a postive integer"),
    check("geofenceParameter")
      .if(check("geofenceParameter").notEmpty())
      .isFloat()
      .withMessage("Must be a postive integer or float"),
    check("geofenceParameterUOMId")
      .if(check("geofenceParameterUOMId").notEmpty())
      .isInt()
      .withMessage("Must be a postive integer"),
  ];
};

// Validation for the deleting of the farm segment
exports.farmSegmentValidation_delete = () => {
  return [
    check("id", "Invalid Id")
      .notEmpty()
      .withMessage("Segment Id is required")
      .isInt(),
  ];
};

// Validation for geofencing
exports.plantingValidation = () => {
  return [
    check("planting")
      .notEmpty()
      .withMessage("Planting is required")
      .isArray()
      .withMessage("Must be an array"),
    check("planting.*.geofence").isArray().withMessage("Must be an array"),
    check("planting.*.startDate")
      .notEmpty()
      .withMessage("This field is required"),
    check("planting.*.endDate")
      .notEmpty()
      .withMessage("This field is required"),
    check("planting.*.plantName")
      .notEmpty()
      .withMessage("This field is required"),
    check("planting.*.fertilizerOptionId")
      .notEmpty()
      .withMessage("This field is required"),
    check("planting.*.plantQty")
      .notEmpty()
      .withMessage("This field is required"),
    check("planting.*.plantQtyUmoId")
      .notEmpty()
      .withMessage("This field is required"),
    check("planting.*.description")
      .notEmpty()
      .withMessage("This field is required"),
  ];
};

// Validation for geofencing
exports.updatePlantingValidation = () => {
  return [
    check("id").notEmpty().withMessage("Id is required"),
    check("geofence").isArray().withMessage("Must be an array"),
    check("startDate").notEmpty().withMessage("This field is required"),
    check("endDate").notEmpty().withMessage("This field is required"),
    check("plantName").notEmpty().withMessage("This field is required"),
    check("fertilizerOptionId")
      .notEmpty()
      .withMessage("This field is required"),
    check("plantQty").notEmpty().withMessage("This field is required"),
    check("plantQtyUmoId").notEmpty().withMessage("This field is required"),
    check("description").notEmpty().withMessage("This field is required"),
  ];
};

// Validation for fetching user planting crops information
exports.fetchPlantingValidation = () => {
  return [
    check("page")
      .notEmpty()
      .withMessage("Page no. is required")
      .isInt({ min: 1 })
      .withMessage("Invalid page number"),
    check("limit")
      .notEmpty()
      .withMessage("limit is required")
      .isInt({ min: 0 })
      .withMessage("Invalid limit"),
  ];
};

// Validation for fetching tillage data
exports.getTillageValidation = () => {
  return [
    check("page")
      .notEmpty()
      .withMessage("Page no. is required")
      .isInt({ min: 1 })
      .withMessage("Invalid page number"),
    check("limit")
      .notEmpty()
      .withMessage("limit is required")
      .isInt({ min: 0 })
      .withMessage("Invalid limit"),
  ];
};

// Validation for fetching equipment data
exports.getEquipmentValidation = () => {
  return [
    check("page")
      .notEmpty()
      .withMessage("Page no. is required")
      .isInt({ min: 1 })
      .withMessage("Invalid page number"),
    check("limit")
      .notEmpty()
      .withMessage("limit is required")
      .isInt({ min: 0 })
      .withMessage("Invalid limit"),
    check("name").escape(),
  ];
};

// Validation for listing data
exports.listValidation = () => {
  return [
    check("page")
      .if(check("limit").exists())
      .notEmpty()
      .withMessage("Page no. is required")
      .isInt({ min: 1 })
      .withMessage("Invalid page number"),
    check("limit")
      .if(check("page").exists())
      .notEmpty()
      .withMessage("limit is required")
      .isInt({ min: 0 })
      .withMessage("Invalid limit"),
    check("name").if(check("name").exists()).isString().escape(),
  ];
};

// Validation for Crop Variety data
exports.CropVarietList = () => {
  return [
    check("cropId")
      .trim()
      .notEmpty()
      .withMessage("cropId is required")
      .escape(),
  ];
};

// Validation for listing data
exports.unit_get = () => {
  return [
    // check("page")
    //   .notEmpty()
    //   .withMessage("Page no. is required")
    //   .trim()
    //   .escape()
    //   .isInt({ min: 1 })
    //   .withMessage("Invalid page number"),
    // check("limit")
    //   .notEmpty()
    //   .withMessage("limit is required")
    //   .trim()
    //   .escape()
    //   .isInt({ min: 0 })
    //   .withMessage("Invalid limit"),
    check("options")
      .notEmpty()
      .withMessage("Options are required")
      .isArray()
      .withMessage("Must be an array"),
    check("countryId").if(check("countryId").exists()).trim().isInt().escape(),
    check("options.*.subCategory")
      .notEmpty()
      .withMessage("Category is required")
      .if(check("options.*.subCategory").exists())
      .trim()
      .isString()
      .escape(),
    check("options.*.category")
      .notEmpty()
      .withMessage("Category is required")
      .if(check("options.*.category").exists())
      .trim()
      .isString()
      .escape(),
  ];
};

// Validation for deleting goals
exports.goal_delete = () => {
  return [
    check("id")
      .trim()
      .notEmpty()
      .withMessage("goal id is required")
      .isInt()
      .withMessage("invalid goal id")
      .escape()
      .custom(checkGoalExist),
  ];
};

// Validation for Adding goals of the user
exports.goal_post = () => {
  return [
    check("goalName")
      .trim()
      .notEmpty()
      .withMessage("Crop name is required")
      .custom(checkUniqueGoalName),
    check("cropTypeOptId")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Crop type is required")
      .if(check("cropTypeOptId").exists())
      .isInt()
      .escape(),
    check("goalTarget")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("goal target is required")
      .if(check("goalTarget").exists())
      .isString()
      .escape(),
    check("cropHistory")
      .optional()
      .isArray()
      .withMessage("Crop history must be in array"),
    check("cropHistory.*.harvestedOn")
      .optional()
      .isObject()
      .withMessage("date of harvested is required"),
    check("cropHistory.*.harvestedOn.start")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("harvested start date is required")
      .isDate({ format: dateFormat, strictMode: true })
      .withMessage("invalid date format"),
    check("cropHistory.*.harvestedOn.end")
      .optional()
      .trim()
      .isDate({ format: dateFormat, strictMode: true })
      .withMessage("invalid date format"),
    check("cropHistory.*.farmingArea")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Farm Area is required")
      .escape(),
    check("cropHistory.*.yieldHarvested")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Yield harvested is required")
      .escape(),
    // check('userFarmId')
    //   .if(check('userFarmId').exists())
    //   .trim()
    //   .notEmpty()
    //   .withMessage('Farm Id is required')
    //   .isInt()
    //   .escape(),
    check("note").optional().trim().isString().escape(),
    check("sowingDate").optional().notEmpty().isObject(),
    check("sowingDate.start")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Sowing start date is required")
      .isDate({ format: dateFormat, strictMode: true })
      .withMessage("invalid date format"),
    check("sowingDate.end")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Sowing end date is required")
      .isDate({ format: dateFormat, strictMode: true })
      .withMessage("invalid date format"),
    check("soilPhId")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Soil PH is required")
      .isInt()
      .escape(),
    check("soilTypeId")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Soil Type is required")
      .isInt()
      .escape(),
    // check('cropId')
    //   .if(check('cropId').exists())
    //   .trim()
    //   .notEmpty()
    //   .withMessage('Crop variety Id is required')
    //   .isInt()
    //   .escape(),
  ];
};

// user crop history updation
exports.user_crophistory_put = () => {
  return [
    check("id")
      .trim()
      .notEmpty()
      .withMessage("Goal id is required")
      .isInt()
      .escape()
      .custom(checkGoalExist),
    check("cropHistory")
      .if(check("cropHistory").exists())
      .isArray()
      .withMessage("Crop history must be in array"),
    check("cropHistory.*.harvestedOn")
      .if(check("cropHistory").exists())
      .isObject()
      .withMessage("date of harvested is required"),
    check("cropHistory.*.harvestedOn.start")
      .if(check("cropHistory").exists())
      .trim()
      .notEmpty()
      .withMessage("harvested start date is required")
      .isDate({ format: dateFormat, strictMode: true })
      .withMessage("invalid date format"),
    check("cropHistory.*.harvestedOn.end")
      .if(check("cropHistory.*.harvestedOn.end").notEmpty())
      .trim()
      .isDate({ format: dateFormat, strictMode: true })
      .withMessage("invalid date format"),
    check("cropHistory.*.farmingArea")
      .if(check("cropHistory").exists())
      .notEmpty()
      .withMessage("Farm Area is required")
      .trim()
      .escape(),
    check("cropHistory.*.yieldHarvested")
      .if(check("cropHistory").exists())
      .notEmpty()
      .withMessage("Yield harvested is required")
      .trim()
      .escape(),
  ];
};
// Validation for updating goals of the user
exports.goal_put = () => {
  return [
    check("id")
      .trim()
      .notEmpty()
      .withMessage("goal id is required")
      .isInt()
      .withMessage("must be numeric")
      .custom(checkGoalExist),
    check("goalName")
      .if(check("goalName").exists())
      .trim()
      .notEmpty()
      .withMessage("Crop name is required")
      .custom(checkUniqueGoalName_put),
    check("note").optional().trim().isString().escape(),
    check("sowingDate").optional().isObject(),
    check("sowingDate.start")
      .optional()
      .trim()
      .isDate({ format: dateFormat, strictMode: true })
      .withMessage("invalid date format"),
    check("sowingDate.end")
      .optional()
      .trim()
      .isDate({ format: dateFormat, strictMode: true })
      .withMessage("invalid date format"),
    check("soilPhId").optional().trim().isInt().escape(),
    check("soilTypeId").optional().trim().isInt().escape(),
    // check('cropIds').optional()
    //   .trim()
    //   .isInt()
    //   .escape(),
    check("cropTypeOptId").optional().trim().isInt().escape(),
    check("goalTarget").optional().trim().isIn(["crop", "livestock"]).escape(),
  ];
};

// Validation for getting option list
exports.optionValidationGet = () => {
  return [
    check("page")
      .if(check("limit").exists())
      .trim()
      .notEmpty()
      .withMessage("Page no. is required")
      .isInt({ min: 1 })
      .withMessage("Invalid page number"),
    check("limit")
      .if(check("page").exists())
      .trim()
      .notEmpty()
      .withMessage("limit is required")
      .isInt({ min: 0 })
      .withMessage("Invalid limit"),
    check("groupName").trim().notEmpty().withMessage("Group Name is required"),
  ];
};

exports.optionValidationPost = () => {
  return [
    check("options").isArray().withMessage("option array is required"),
    check("options.*").trim().notEmpty().withMessage("Group Name is required"),
  ];
};

// Validation for fetching audit questions
exports.auditGetValidation = () => {
  return [
    check("page")
      .notEmpty()
      .withMessage("Page no. is required")
      .isInt({ min: 1 })
      .withMessage("Invalid page number")
      .escape(),
    check("limit")
      .notEmpty()
      .withMessage("Limit is required")
      .isInt({ min: 0 })
      .withMessage("Invalid limit"),
    check("category")
      .notEmpty()
      .withMessage("Category is required")
      .trim()
      .escape(),
  ];
};

// Validation for fetching user planting crops information
exports.abattoirPostValidation = () => {
  return [
    check("animalUniqueTag")
      .notEmpty()
      .withMessage("Animal Unique Tag is required"),
    check("timeslot").notEmpty().withMessage("Timeslot is required"),
    check("endDestinationOfMeat")
      .notEmpty()
      .withMessage("End Destination Of Meat is required"),
    check("killQty").notEmpty().withMessage("Kill Quantity is required"),
    check("killQtyUnit")
      .notEmpty()
      .withMessage("Kill Quantity Unit is required"),
  ];
};

// fetch information about the single planted crop
exports.fetchSinglePlantingValidation = () => {
  return [param("id", "Invalid Id").isInt().isInt({ min: 1 })];
};

// Validation for harvesting POST request
exports.postHarvestingValidation = () => {
  return [
    check("harvesting")
      .notEmpty()
      .withMessage("Harvesting is required")
      .isArray()
      .withMessage("Must be an array"),
    check("harvesting.*.geofences").isArray().withMessage("Must be an array"),
    check("harvesting.*.equipments").isArray().withMessage("Must be an array"),
    check("harvesting.*.startDate")
      .notEmpty()
      .withMessage("This field is required"),
    check("harvesting.*.endDate")
      .notEmpty()
      .withMessage("This field is required"),
    check("harvesting.*.plantName")
      .notEmpty()
      .withMessage("This field is required"),
    check("harvesting.*.plantedCropId")
      .notEmpty()
      .withMessage("This field is required"),
    check("harvesting.*.plantQty")
      .notEmpty()
      .withMessage("This field is required"),
    check("harvesting.*.plantQtyUomId")
      .notEmpty()
      .withMessage("This field is required"),
    check("harvesting.*.harvestedQty")
      .notEmpty()
      .withMessage("This field is required"),
    check("harvesting.*.harvestedQtyUomId")
      .notEmpty()
      .withMessage("This field is required"),
    check("harvesting.*.storageCondition")
      .notEmpty()
      .withMessage("This field is required"),
  ];
};

// Validation for soil preparation screen POST request
exports.postSoilpreparationValidation = () => {
  return [
    check("geofences").isArray().withMessage("Must be an array"),
    check("tillage").isArray().withMessage("Must be an array"),
    check("startDate").notEmpty().withMessage("This field is required"),
    check("endDate").notEmpty().withMessage("This field is required"),
    check("fertilizerType").notEmpty().withMessage("This field is required"),
    check("fertilizerQty").notEmpty().withMessage("This field is required"),
    check("comment").notEmpty().withMessage("This field is required"),
    check("fertilizerQtyUomId")
      .notEmpty()
      .withMessage("This field is required"),
  ];
};

// Validation for farm equipments screen POST request
exports.postFarmEquipmentValidation = () => {
  return [
    check("equipments").isArray().withMessage("Must be an array"),
    check("equipments.*.farmId")
      .notEmpty()
      .withMessage("This field is required")
      .isInt(),
    check("equipments.*.equipmentId")
      .notEmpty()
      .withMessage("This field is required")
      .isInt(),
    check("equipments.*.name")
      .notEmpty()
      .withMessage("This field is required")
      .isString(),
    check("equipments.*.plateNumber")
      .if(check("equipments.*.plateNumber").exists())
      .isAlphanumeric()
      .withMessage("Plate Number should be alpha numeric"),
    check("equipments.*.model")
      .if(check("equipments.*.model").exists())
      .isAlphanumeric()
      .withMessage("Model should be alpha numeric"),
    check("equipments.*.year")
      .if(check("equipments.*.year").exists())
      .isInt()
      .withMessage("Year should be in numberic format only"),
  ];
};

// Validation for farm livestock screen POST request
exports.postFarmLivestockValidation = () => {
  return [
    check("livestocks").isArray().withMessage("Must be an array"),
    check("livestocks.*.farmId")
      .notEmpty()
      .withMessage("This field is required")
      .isInt(),
    check("livestocks.*.animalBreedId")
      .notEmpty()
      .withMessage("This field is required")
      .isInt(),
    check("livestocks.*.name")
      .notEmpty()
      .withMessage("This field is required")
      .isString(),
    check("livestocks.*.quantity")
      .notEmpty()
      .withMessage("This field is required")
      .isInt(),
    check("livestocks.*.quantityUomId")
      .notEmpty()
      .withMessage("This field is required")
      .isInt(),

    check("livestocks.*.animalTypeId")
      .if(check("livestocks.*.animalTypeId").exists())
      .isInt()
      .withMessage("Animal Type Id should be numeric"),
    check("livestocks.*.lat")
      .if(check("livestocks.*.lat").exists())
      .isFloat()
      .withMessage("latitude should be in float"),
    check("livestocks.*.log")
      .if(check("livestocks.*.log").exists())
      .isFloat()
      .withMessage("longitude should be in float"),
  ];
};

// crop registration validation
exports.postFarmCropValidation = () => {
  return [
    check("farmId")
      .if(check("farmId").exists())
      .notEmpty()
      .isArray({ min: 1 })
      .withMessage('farmId must be an array and must not be empty'),
    check("cropTypeOptId")
      .trim()
      .notEmpty()
      .if(check("cropTypeOptId").exists())
      .withMessage(" cropTypeOptId is required")
      .escape(),
    check("cropVariety")
      .if(check("cropVariety").exists())
      .isArray()
      .withMessage(" cropVariety must be an array"),
    check("propagationType")
      .if(check("propagationType").exists())
      .trim()
      .notEmpty()
      .withMessage(" propagationType is required")
      .escape(),
    check("vegetativePropagationTypeOptId")
      .if(check("vegetativePropagationTypeOptId").exists())
      .trim()
      .notEmpty()
      .withMessage(" vegetativePropagationTypeOptId is required")
      .escape(),
    check("expectedYield")
      .if(check("expectedYield").exists())
      .trim()
      .notEmpty()
      .withMessage(" expectedYield is required")
      .escape(),
    check("cropSeasonOptId")
      .trim()
      .notEmpty()
      .if(check("cropSeasonOptId").exists())
      .withMessage(" cropSeasonOptId is required")
      .escape(),
    check("cropLifecycleOptId")
      .if(check("cropLifecycleOptId").exists())
      .trim()
      .notEmpty()
      .withMessage(" cropLifecycleOptId is required")
      .escape(),
    check("cropWaterMgmtOptId")
      .trim()
      .notEmpty()
      .if(check("cropWaterMgmtOptId").exists())
      .withMessage(" cropWaterMgmtOptId is required")
      .escape(),
  ];
};

// Validation for soil preparation screen POST request
exports.postChangeOwnershipValidation = () => {
  return [
    check("oldOwnerName").notEmpty().withMessage("This field is required"),
    check("oldOwnerAddress").notEmpty().withMessage("This field is required"),
    check("oldOwnerFarmRegNo").notEmpty().withMessage("This field is required"),
    check("newOwnerName").notEmpty().withMessage("This field is required"),
    check("newOwnerAddress").notEmpty().withMessage("This field is required"),
    check("newOwnerFarmRegNo").notEmpty().withMessage("This field is required"),
    check("livestockTagNo").notEmpty().withMessage("This field is required"),
    check("animalBreedId").notEmpty().withMessage("This field is required"),
    check("livestockDob").notEmpty().withMessage("This field is required"),
    check("dateOfTransfer").notEmpty().withMessage("This field is required"),
    check("livestockTypeOptionId")
      .notEmpty()
      .withMessage("This field is required"),
  ];
};

// Validation for updating farm details of the user
exports.farmPutValidation = () => {
  return [
    check("id").trim().notEmpty().escape().withMessage("Farm Id is required"),
    check("ownerName")
      .optional({ nullable: true })
      .isString()
      .escape(),
    check("farmOwnershipType")
      .optional({ nullable: true })
      .isIn(["community", "personal"])
      .escape()
      .withMessage("Invalid value"),
    check("communityName")
      .optional({ nullable: true })
      .isString()
      .escape()
      .withMessage("Community name must be a string"),
    check("address").optional({ nullable: true }).escape(),
    check("district")
      .optional({ nullable: true })
      .isInt()
      .escape()
      .withMessage("Value must be integer"),
    check("area").optional({ nullable: true }).escape(),
    check("zipCode")
      .optional({ nullable: true })
      .isString()
      .escape()
      .withMessage("Value must be string"),
    check("goalsAndObjective")
      .optional({ nullable: true })
      .isString()
      .escape()
      .withMessage("Value must be string"),
    check("farmingActivity")
      .optional({ nullable: true })
      .isString()
      .isIn(["crops", "live stock", "both"])
      .escape()
      .withMessage("Value must be string"),
    check("productionType")
      .optional({ nullable: true })
      .isIn(["Organic", "Conventional"])
      .escape()
      .withMessage("Invalid value"),
  ];
};

// Validation for deleting farm with id
exports.farmDeleteValidation = () => {
  return [
    check('farmId')
      .trim()
      .notEmpty()
      .escape()
      .withMessage('Farm Id is required')
      .custom(async (id) => {
        const status = await db.user_farm.findOne({
          where: { id, isDeleted: 0 },
        });
        if (status === null) throw new Error('farm does not exist');
      }),
  ];
};

// Validation for deleting geofence with id
exports.geofenceDeleteValidation = () => {
  return [
    check('geofenceId')
        .trim()
        .notEmpty()
        .escape()
        .withMessage('Geofence Id is required')
        .custom(async (id) => {
          const status = await db.Geofence.findOne({
            where: { id : id, deletedAt: null },
          });
          if (status === null) throw new Error('Geofence does not exist');
        }),
  ];
};

// Validation for restore geofence with id
exports.geofenceRestoreValidation = () => {
  return [
    check('geofenceId')
        .trim()
        .notEmpty()
        .escape()
        .withMessage('Geofence Id is required')
  ];
};

// Validation for soil preparation screen POST request
exports.farmPostValidation = () => {
  return [
    check("farmName").optional({ nullable: true }).isString().withMessage("Value must be string"),
    check("ownerName")
      .optional({ nullable: true })
      .isString()
      .withMessage("Value must be string"),
    check("address").optional({ nullable: true }).escape(),
    check("district")
      .optional({ nullable: true })
      .isInt()
      .escape()
      .withMessage("Value must be integer"),
    check("zipCode")
      .optional({ nullable: true })
      .isString()
      .escape()
      .withMessage("Value must be string"),
    check("goalsAndObjective")
      .optional({ nullable: true })
      .isString()
      .escape()
      .withMessage("Value must be string"),
    check("farmingActivity")
      .optional({ nullable: true })
      .isString()
      .isIn(["crops", "live stock", "both"])
      .escape()
      .withMessage("Value must be string"),
    check("farmGeofence.*.lat")
      .if(check("farmGeofence").notEmpty().isArray())
      .optional({ nullable: true })
      .isFloat()
      .withMessage("Latitude must be in float"),
    check("farmGeofence.*.log")
      .if(check("farmGeofence").notEmpty().isArray())
      .optional({ nullable: true })
      .isFloat()
      .withMessage("Longitude must be in float"),
    check("farmOwnershipType")
      .optional({ nullable: true })
      .isIn(["personal", "community"])
      .escape()
      .withMessage("Invalid ownership type"),

    check("farmingGoals")
      .optional({ nullable: true })
      .if(check("farmingGoals").notEmpty())
      .isArray()
      .withMessage("Farming goals list is required"),

    check("farmingGoals.*.farmingGoalOptId")
      .if(check("farmingGoals").notEmpty().isArray())
      .if(check("farmingGoals.*").notEmpty().isObject())
      .optional({ nullable: true })
      .isInt()
      .withMessage("Farming goals option id is required"),
      
    check("farmingGoals.*.farmingGoal")
      .if(check("farmingGoals").notEmpty().isArray())
      .if(check("farmingGoals.*").notEmpty().isObject())
      .optional({ nullable: true })
      .isString()
      .withMessage("Farming goals is required"),

    // check("farmGeofenceCategory")
    //   .optional({ nullable: true })
    //   .isString()
    //   .isIn(["Farm", "Crop Land", "Planted Forest"])
    //   .withMessage("Value must be a string and must be one of: Farm, Crop Land, Planted Forest"),
    check("productionType")
      .isIn(["Organic", "Conventional"])
      .optional({ nullable: true })
      .escape(),
  ];
};

// registration with mobile and email validation
exports.fetchOneValidation = () => {
  return [param("id", "Invalid Id").trim().notEmpty().isInt().escape()];
};

// registration with mobile and email validation
exports.community_put = () => {
  return [
    check("communityName")
      .trim()
      .notEmpty()
      .withMessage("Community name is required")
      .isString()
      .withMessage("Invalid community name")
      .escape(),
  ];
};

exports.createSurveyTitle = () => {
  return [
    check("title")
      .trim()
      .notEmpty()
      .withMessage("Title is required")
      .isString(),
    check("description")
      .trim()
      .notEmpty()
      .withMessage("description is required")
      .isString()
  ];
};

// registration with mobile and email validation
exports.uniqueRegistrationNoFarmName = () => {
  return [
    check("farmName")
      .trim()
      .notEmpty()
      .withMessage("Farm name is required")
      .escape(),
    check("registrationNo")
      .trim()
      .notEmpty()
      .withMessage("Registration number is required")
      .escape(),
  ];
};

// registration with mobile and email validation
exports.communityInvite_post = () => {
  return [
    // check("mobiles")
    //   .isArray()
    //   .withMessage("Must be an array")
    //   .notEmpty()
    //   .withMessage("Mobile numbers are required"),
    // check("mobiles.*.code", "Invalid country code")
    //   .isLength({ min: 1, max: 3 })
    //   .isInt()
    //   .trim()
    //   .escape(),
    // check("mobiles.*.number")
    //   .isLength({ min: 10, max: 10 })
    //   .withMessage("Mobile numbers is invalid")
    //   .isMobilePhone()
    //   .withMessage("Mobile numbers is invalid")
    //   .trim()
    //   .escape(),
    check("inviteLink")
      .trim()
      .notEmpty()
      .withMessage("Invite link is required")
      .isURL()
      .withMessage("Invalid link"),
    check("communityName")
      .trim()
      .notEmpty()
      .withMessage("Community name is required")
      .escape(),
  ];
};

// registration with mobile and email validation
exports.configuration = () => {
  return [
    check("name")
      .trim()
      .notEmpty()
      .withMessage("Name/Key is required")
      .escape(),
    check("value").trim().notEmpty().withMessage("Value is required").escape(),
  ];
};

// user goal listing
exports.userGoalGet = () => {
  return [
    check("page")
      .trim()
      .notEmpty()
      .withMessage("Page no. is required")
      .isInt({ min: 1 })
      .withMessage("Invalid page number")
      .escape(),
    check("limit")
      .trim()
      .notEmpty()
      .withMessage("limit is required")
      .isInt({ min: 0 })
      .withMessage("Invalid limit")
      .escape(),
    check("name")
      .if(check("name").exists())
      .trim()
      .notEmpty()
      .withMessage("Name is required")
      .escape(),
  ];
};

// add crop variety
exports.cropVarietyPost = () => {
  return [
    check("cropTypeOptId")
      .trim()
      .notEmpty()
      .withMessage("cropTypeOptId is required")
      .isInt({ min: 1 })
      .withMessage("Invalid cropTypeOptId")
      .escape(),
    check("name")
      .trim()
      .notEmpty()
      .if(check("name").exists())
      .withMessage("name is required")
      .isString()
      .escape(),
  ];
};

// add crop type
exports.cropTypePost = () => {
  return [
    check("name")
      .trim()
      .notEmpty()
      .if(check("name").exists())
      .withMessage("name is required")
      .isString()
      .escape(),
  ];
};

// upload audit file
exports.auditFileValidator = () => {
  return [
    check("docArr.*.displayName")
      .trim()
      .notEmpty()
      .if(check("displayName").exists())
      .withMessage("displayName is required"),

    check("docArr.*.docType")
      .trim()
      .notEmpty()
      .if(check("docType").exists())
      .withMessage("docType is required"),

    check("docArr.*.auditType")
      .trim()
      .notEmpty()
      .withMessage("auditType is required")
      .isIn([
        "SoilManagementAndFertility",
        "FoodProduction",
        "PollutionControlAndByProductManagement",
        "AnimalHusbandry",
        "EnergyEfficiency",
        "WaterManagement",
        "LandscapeAndNatureConservation",
        "FinancialPerformance",
      ])
      .withMessage("invalid auditType"),
  ];
};

exports.createPlantationValidations = () => {
  return [
    check("plantationName")
      .notEmpty()
      .withMessage("Plantation name is required")
      .trim(),
    oneOf([
      check("farmIds", "farmIds is required").notEmpty(),
      check("segmentIds", "segmentIds is required").notEmpty(),
    ]),
    check("coffeeVariety")
      .if((value, { req }) => {
        return req.body.commodity == (process.env.COFFEE_COMMODITY_ID || 2)
      })
      .notEmpty()
      .withMessage("coffeeVariety is required")
      .trim()
      .escape(),
    check("coffeeSpecies")
      .if((value, { req }) => {
        return req.body.commodity == (process.env.COFFEE_COMMODITY_ID || 2)
      })
      .notEmpty()
      .withMessage("coffeeSpecies is required")
      .trim()
      .escape(),
  ];
};

exports.updatePlantationValidations = () => {
  return [
    check("plantationName")
      .notEmpty()
      .withMessage("Plantation Name is required")
      .trim(),
    oneOf([
      check("farmIds", "farmIds is required").notEmpty(),
      check("segmentIds", "segmentIds is required").notEmpty(),
    ]),
    check("coffeeVariety")
    .if((value, { req }) =>{
       return req.body.commodity ==( process.env.COFFEE_COMMODITY_ID || 2)
      })
      .notEmpty()
      .withMessage("coffeeVariety is required")
      .trim()
      .escape(),
    check("coffeeSpecies")
      .if((value, { req }) => {
        return req.body.commodity == (process.env.COFFEE_COMMODITY_ID || 2)
      })
      .notEmpty()
      .withMessage("coffeeSpecies is required")
      .trim()
      .escape(),
  ];
};
exports.markStatusValidation = () => {
  return [
    check("seedlingId")
      .notEmpty()
      .withMessage("seedlingId is required")
      .trim()
      .escape(),
  ];
};
exports.createSeedlingValidations = () => {
  return [
    check("seedlingDate")
      .trim()
      .notEmpty()
      .withMessage("Seedling date is required")
      .isDate({ format: dateFormat, strictMode: true })
      .withMessage("Invalid date format - Seedling date"),
    check("coffeeVariety")
      .if((value, { req }) => {
        return req.body.commodity == (process.env.COFFEE_COMMODITY_ID || 2)
      })
      .notEmpty()
      .withMessage("coffeeVariety is required")
      .trim()
      .escape(),
    check("coffeeSpecies")
      .if((value, { req }) => {
        return req.body.commodity == (process.env.COFFEE_COMMODITY_ID || 2)
      })
      .notEmpty()
      .withMessage("coffeeSpecies is required")
      .trim()
      .escape(),
    check("noOfSeeds")
      .notEmpty()
      .withMessage("noOfSeeds is required")
      .trim()
      .escape(),
  ];
};

// validation for Production Charts
exports.productionChartValidations = () => {
  return [
    check("filterType")
      .notEmpty()
      .withMessage("Filter Type is required")
      .trim()
      .escape(),
  ];
};

// validation for Production Target
exports.productionTargetValidations = () => {
  return [
    check("target")
      .trim()
      .notEmpty()
      .withMessage("Target is required")
      .isFloat(),
    check("year")
      .trim()
      .notEmpty()
      .withMessage("Year is required")
      .isInt({ min: 2000 }),
  ];
};
// validation for Production Target Edit Form
exports.productionTargetEditValidations = () => {
  return [
    check("target")
      .trim()
      .notEmpty()
      .withMessage("Target is required")
      .isFloat(),
  ];
};

// data validation for create Enquiry App User
exports.createEnquiryValidation = () => {
  return [
    check("subject")
      .notEmpty()
      .withMessage("subject is required")
      .trim()
      .escape(),
    check("description")
      .notEmpty()
      .withMessage("description is required")
      .trim(),
    check("areaOfRequest")
      .notEmpty()
      .withMessage("Area Of Request is required")
      .trim()
      .escape(),
    check("type").notEmpty().withMessage("type is required").trim().escape(),
  ];
};

// Update Enquiry Status
exports.updateEnquiryStatusValidation = () => {
  return [
    check("status")
      .notEmpty()
      .withMessage("Status is required")
      .trim()
      .escape(),
  ];
};

// Enquiry Comment Validation
exports.createEnquiryCommentValidation = () => {
  return [
    query("ticketId")
      .notEmpty()
      .withMessage("Ticket id is required")
      .trim()
      .escape(),
    query("comment_type")
      .notEmpty()
      .withMessage("Comment type is required")
      .trim()
      .escape(),
  ];
};

exports.createReportSettingValidation = () => {
  return [
    check("dataType")
      .notEmpty()
      .withMessage("Report data type is required")
      .isIn(['cellular data', "wifi data", "both"])
      .withMessage(
        "value should in ('cellular data', 'wifi data', 'both')"
      )
      .trim()
      .escape(),
    check("cropReportTypeIds")
      .isArray()
      .withMessage("Value should be array"),
    check("scheduleReportDownload")
      .notEmpty()
      .withMessage("schedule report download is required")
      .isIn(["automatically", "daily", "weekly", "biweekly", "monthly", "custom"])
      .withMessage(
        'value should in ("automatically", "daily", "weekly", "biweekly", "monthly", "custom")'
      )
      .trim()
      .escape(),
    check("specificDaysInWeek")
      .isArray()
      .withMessage(
        "Value should be array of days"
      )
  ];
};

exports.faqGetAllValidation = () => {
  return [
    check("org_id").custom((organization, { req }) => {
      if (!req.user.organization) {
        throw new Error("User has not been associated with an organization.");
      }
      return true;
    }),
  ];
}

exports.userDeleteValidation = () => {
  return [
    check('reason').notEmpty().withMessage('Reason is required'),
    check('details').notEmpty().withMessage('details is required'),
  ]
}

exports.roleRequestsByUserValidation = () => {
  return [
    check("org_id").custom((organization, { req }) => {
      if (!req.user.organization) {
        throw new Error("User has not been associated with an organization.");
      }
      return true;
    }),
    check("requested_role")
      .notEmpty()
      .withMessage("Role type is required")
      .trim()
      .escape(),
  ];
}

exports.roleDeleteValidation = () => {
  return [
    query('role_id').notEmpty().withMessage('Role id is required')
  ]
}

exports.checkOrganizationAssociationValidation = () => {
  return [
    check("org_id").custom((organization, { req }) => {
      if (!req.user.organization) {
        throw new Error("User has not been associated with an organization.");
      }
      return true;
    }),
  ];
}

exports.createSoilOrganicInputs = () => {
  return [
    check('name')
      .trim()
      .notEmpty()
      .withMessage('name is required')
      .escape()
      .custom(async (name) => {
        const groupName = 'soil-organic-input';
        const status = await db.Option.findOne({ where: { groupName, name } });
        if (status != null)
          throw new Error('soil-organic-input name exist already');
      }),
    check('recordId')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('recordId is required')
      .escape(),
  ];
};

exports.checkCropGoalAnalyticsValidation = () => {
  return [
    check("primaryGoalId")
      .notEmpty()
      .withMessage('Primary Goal Id is required')
      .isInt()
      .withMessage('Primary Goal Id should be integer'),
    check("cropTypeId")
      .notEmpty()
      .withMessage('Crop type ID is required')
      .isInt()
      .withMessage('Crop type Id should be integer'),
    check("seasonView")
      .isInt({ min: 1, max: 4 })
      .withMessage('Season view number should be integer value from 1-4')
  ];
}

exports.userMobileUpdateValidation = () => {
  return [
    check("mobile")
      .notEmpty()
      .withMessage('mobile is required'),
    check("country")
      .notEmpty()
      .withMessage('country is required'),
  ];
}
exports.traceLabelQrcodeValidation = () => {
  return [
    check('labelUrl').notEmpty().withMessage('labelUrl id is required'),
    check('parchmentId').notEmpty().withMessage('parchmentId id is required'),
  ]
}

exports.cacaoTraceLabelQrcodeValidation = () => {
  return [
    check('labelUrl').notEmpty().withMessage('labelUrl id is required'),
    check('dryProcessId').notEmpty().withMessage('Dry Process id is required'),
  ]
}

exports.createCacaoPlantationValidations = () => {
  return [
    check("plantationName")
      .notEmpty()
      .withMessage("Plantation name is required")
      .trim(),
    oneOf([
      check("farmIds", "farmIds is required").notEmpty(),
      check("segmentIds", "segmentIds is required").notEmpty(),
    ]),
    oneOf([
      check("cacaoVariety", "cacaoVariety is required").notEmpty()
    ]),
    check("cacaoSpecies")
      .notEmpty()
      .withMessage("cacaoSpecies is required")
      .trim()
      .escape(),
  ];
};
