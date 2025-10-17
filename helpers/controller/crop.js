const db = require(rootPath + "/models");
const { notEmpty } = require(rootPath + "/helpers/general");
const moment = require("moment");

/**
 * @desc update crop history of the user
 */
exports.updateCropHistory = async (req, transaction) => {
  const ACCEPT_FORMAT = process.env.ACCEPT_DATE_FORMAT;
  const userId = req.user.id;
  const { id: goalId, cropHistory } = req.body;

  // console.log(goalId, "goal id is ----------------------");
  // return res.json(req.body);

  let cropHistoryData = cropHistory.map((element) => {
    let { harvestedOn, farmingArea, yieldHarvested } = element;

    // convert date into UTC JS ACCEPT_FORMAT
    harvestedOn = {
      ...harvestedOn,
      start: notEmpty(harvestedOn.start)
        ? moment.utc(harvestedOn.start, ACCEPT_FORMAT)
        : undefined,
      end: notEmpty(harvestedOn.end)
        ? moment.utc(harvestedOn.end, ACCEPT_FORMAT)
        : undefined,
    };

    // set data to be inserted
    let set = {
      userId,
      goalId,
      harvestedOn: JSON.stringify(harvestedOn),
      farmingArea,
      yieldHarvested,
    };

    // remove undefined values before inserting
    Object.keys(set).forEach((key) => {
      set[key] == undefined || set[key] == null ? delete set[key] : {};
    });
    return set;
  });

  // destroy user crop history
  await db.UserCropsHistory.destroy({
    where: {
      userId,
      goalId,
    },
    transaction,
  });

  // re-insert user crop history in bulk
  await db.UserCropsHistory.bulkCreate(cropHistoryData, {
    transaction,
  });

  // get the updated goals data
  // const goal = require(rootPath + "/helpers/controller");
  // const goalDetails = await goal.getGoalDetails(req, {
  //   cropHistory: true,
  // });

  return true;
};
