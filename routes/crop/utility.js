const db = require(rootPath + "/models");

async function fetchConversionUnits(orgId, userId) {
  try {
    // Fetch global settings including area and weight units
    const globalSettings = await db.GlobalSetting.findOne({
      attributes: { exclude: ["createdAt", "updatedAt", "id"] },
      include: [
        {
          model: db.Currency,
          as: "currency",
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        {
          model: db.UnitsList,
          as: "weightUnit",
          attributes: ["id", "name", "abbvr", "unitType", "factor"],
        },
      ],
      where: { org_id: orgId },
    });

    // Fetch user-specific unit configuration
    const userUnitConfig = await db.UserUnitConfiguration.findOne({
      where: { userId },
      include: [
        {
          model: db.UnitTypes,
          as: "user_config_unitType",
          where: { name: "Weight" },
        },
        {
          model: db.UnitsList,
          as: "user_config_unit",
        },
      ],
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    return { globalSettings, userUnitConfig };
  } catch (error) {
    console.error("Error fetching conversion units:", error);
    throw error; // Or handle the error as needed
  }
}
async function fetchCurrencySettings(req, res = null) {
  try {
    const userId = req.user.id;

    // Fetch user-specific currency setting
    const currencySetting = await db.UserCurrencySettings.findOne({
      where: { userId: userId },
      include: [{ model: db.Currency, as: "currency" }],
    });

    // Fetch global currency setting if no user setting found
    const globalCurrencySetting =
      !currencySetting &&
      (await db.GlobalSetting.findOne({
        where: {},
        include: [{ model: db.Currency, as: "currency" }],
      }));
      let currency = currencySetting?.currency || globalCurrencySetting?.currency;

      console.log('currency=========', currency);
      
    // Return currency setting (prefer user setting over global setting)
    return {
     ... currency,
    };
  } catch (err) {
    // Log the error and handle server error
    logErrorOccurred(__filename, err);
    if (res) return serverError(res, err);
    throw err; // Throw the error if res is not provided
  }
}

module.exports = {
  fetchConversionUnits,
  fetchCurrencySettings,
};
