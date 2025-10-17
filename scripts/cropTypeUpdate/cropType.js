const db = require(rootPath + "/models");

module.exports = async function updateCropType() {
  try {
    const pattern = /\((.*?)\)/;

    let crops = await db.Option.findAll({ where: { groupName: "crop-type" } });

    crops.forEach(async (item) => {
      const match = item.name.match(pattern);
      let region = "general";
      if (match) {
        const countryName = match[1];
        region = countryName;
      }

      await db.Option.update(
        {
          region,
        },
        { where: { id: item.id } }
      );
    });
  } catch (error) {
    console.log(error.message, error.stack);
  }
};
