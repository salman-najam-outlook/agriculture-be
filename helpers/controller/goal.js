const db = require(rootPath + "/models");
const { notEmpty } = require(rootPath + "/helpers/general");
const moment = require("moment");

/**
 * @desc check if similar goal name exist or not of user
 */
exports.isUniqueGoalName = async (goalName, userId, goalId = null) => {
  let where = {
    goalName,
    userId,
  };

  // exclude goalName of the same goal id if updating data
  if (goalId != null) {
    where = { ...where, id: { [db.Sequelize.Op.ne]: goalId } };
  }

  // check data in DB
  let status = await db.UserGoal.findOne({
    attributes: ["goalName", "userId"],
    where,
  });

  console.log(status,"status------------");
  return status;
};

/**
 * @desc check if goal id exist or not
 */
exports.isGoalExistByPK = async (goalId, userId) => {
  // check data in DB
  let status = await db.UserGoal.findOne({
    attributes: ["goalName", "userId"],
    where: {
      id: goalId,
      userId,
    },
  });
  return status;
};

/**
 * @desc get details of the goal with the goal id
 */
exports.getGoalDetails = async (req, data = null) => {
  const userId = req.user.id;
  const { id } = req.body;
  const { cropHistory } = data;

  // generate query
  let query = {
    include: [
      {
        model: db.user_farm,
        //as: "farm",
        attributes: ["farmName"],
      },
      {
        model: db.Geofence,
        as: "segments",
        attributes: ["id", "geofenceName"],
      },
      {
        model: db.Soil_PH,
        as: "soilPH",
        attributes: ["type"],
      },
      {
        model: db.Crop,
        as: "cropVariety",
        attributes: ["name"],
      },
      {
        model: db.Option,
        as: "cropType",
        attributes: ["name"],
      },
    ],
    attributes: [
      "id",
      ["goalTarget", "goalType"],
      "goalName",
      "sowingDate",
      "harvestingDate",
      "expectedYield",
      "recordId",
      "note",
      "createdAt",
    ],
    where: { id, userId },
  };

  // check if cropHistory:boolean to be include or not
  if (cropHistory) {
    const cropHistoryModel = {
      include: [
        {
          attributes: ["unit_subCategory_id"],
          model: db.UnitConfiguration,
          as: "configuration",
          required: false,
          where: {
            unit_subCategory_id: [3, 8],
          },
          include: [
            {
              model: db.Unit,
              attributes: [["field", "name"]],
              as: "subCategory",
            },
            {
              model: db.Unit,
              attributes: ["id", ["field", "name"], "abbreviation"],
              as: "unit",
            },
          ],
        },
      ],
      model: db.UserCropsHistory,
      as: "cropHistory",
      attributes: ["id", "harvestedOn", "farmingArea", "yieldHarvested"],
    };
    // insert into include array
    query.include.push(cropHistoryModel);
  }

  // execute the query
  let response = await db.UserGoal.findOne(query);
  response = await response.toJSON();

  // console.log(response, "====================");

  const DISPLAY_DATE_FORMAT = process.env.DISPLAY_DATE_FORMAT;
  // format swoing date
  try {
    const sowing_date = JSON.parse(response.sowingDate);
    const { start, end } = sowing_date;

    // update sowing date variable
    response.sowingDate = {
      ...sowing_date,
      start: notEmpty(start) ? moment(start).format(DISPLAY_DATE_FORMAT) : null,
      end: notEmpty(end) ? moment(end).format(DISPLAY_DATE_FORMAT) : null,
    };
  } catch (err) {
    console.log(err);
  }

  if(response.harvestingDate){
    try {
      const har_date = JSON.parse(response.harvestingDate);
      const { start, end } = har_date;

      // update sowing date variable
      response.harvestingDate = {
        ...har_date,
        start: notEmpty(start) ? moment(start).format(DISPLAY_DATE_FORMAT) : null,
        end: notEmpty(end) ? moment(end).format(DISPLAY_DATE_FORMAT) : null,
      };
    } catch (err) {
      console.log(err);
    }
  }

  // format harvested date

  if (notEmpty(response.cropHistory)) {
    // restructure crophistory array
    let cropHistory = response.cropHistory.map((el) => {
      let { harvestedOn, configuration } = el;

      // format harvested date
      try {
        const harvested_on = JSON.parse(harvestedOn);
        const { start, end } = harvested_on;
        // update sowing date variable
        el.harvestedOn = {
          ...harvested_on,
          start: notEmpty(start)
            ? moment(start).format(DISPLAY_DATE_FORMAT)
            : null,
          end: notEmpty(end) ? moment(end).format(DISPLAY_DATE_FORMAT) : null,
        };
      } catch (err) {}

      // reformat configuration Array
      configuration = configuration?.map((config) => {
        return { name: config.subCategory.name, unit: config.unit };
      });
      return { ...el, configuration };
    });
    response.cropHistory = cropHistory;
  }

  // format created date
  response.createdAt = moment(response.createdAt).format(
    process.env.DISPLAY_DATETIME_FORMAT
  );

  return response;
};
