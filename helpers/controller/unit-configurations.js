const db = require(rootPath + "/models");
const { logErrorOccurred, notEmpty } = require(rootPath + "/helpers/general");

/**
 * @description Setup configurations
 */
exports.getUserUnitConfigurations = async (req, data = null) => {
  const userId = req.user.id;
  let response = [];

  // fetch all the unit configuration of the user
  const result = await db.UnitConfiguration.findAll({
    include: [
      { attributes: [["field", "name"]], model: db.Unit, as: "category" },
      { attributes: [["field", "name"]], model: db.Unit, as: "subCategory" },
      {
        attributes: ["id", ["field", "name"], "abbreviation"],
        model: db.Unit,
        as: "unit",
      },
    ],
    attributes: ["unit_id"],
    where: { userId },
  });

  // reformat the result before sending response
  for (let el of result) {
    const { category, subCategory, unit } = await el.toJSON();
    // push to response array
    response.push({
      category: category.name,
      subCategory: subCategory.name,
      unit,
    });
  }
  return response;
};
