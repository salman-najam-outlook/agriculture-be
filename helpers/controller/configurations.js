const db = require(rootPath + "/models");
const { logErrorOccurred, notEmpty } = require(rootPath + "/helpers/general");

/**
 * @description Setup configurations
 */
exports.upsertConfiguration = async (req, data) => {
  const { userId, category } = data;
  // const { value, name } = req.body;

  let { configurations } = req.body;

  // filter duplicate objects with name
  configurations = configurations.filter(
    (v, i, a) => a.findIndex((t) => t.name === v.name) === i
  );

  let where = { userId, category, name };

  const set = {
    userId,
    value,
    name,
    category,
  };
  // Check if this value exist already
  const isAlreadyInserted = await db.Configuration.findOne({ where });
  // insert if not present update if present
  if (isAlreadyInserted == null) {
    var result = await db.Configuration.create(set);
    result = await result.toJSON();
  } else {
    var result = await db.Configuration.update(set, { where });
  }
  return result;
};

/**
 * @description get list of the unit configuration
 */
exports.fetchUnitConfiguration = async (req, data) => {
  const { userId, category } = data;
  let where = { userId, category };

  // fetch all the configuratin unit of the user
  const result = await db.Configuration.findAll({
    include: [
      {
        attributes: ["id", "name", "abbreviation"],
        model: db.Unit,
        as: "unit",
      },
    ],
    attributes: ["name"],
    where,
  });
  return result;
};
