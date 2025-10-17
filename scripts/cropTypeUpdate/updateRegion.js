const { cropTypeCountry } = require("./cropTypeCountry");

const db = require(rootPath + "/models");

module.exports = async function updateIsoCode() {
  try {
    let crops = await db.Option.findAll({ where: { groupName: "crop-type" } });

    for (const item of crops) {
      const code = cropTypeCountry.find((e) => e?.region.toLowerCase() === item?.region?.trim().toLowerCase());
      await db.Option.update(
        {
          countryCode: code?.code ?? "general",
        },
        { where: { id: item.id } }
      );
    }
  } catch (error) {
    console.log(error.message, error.stack);
  }
};
