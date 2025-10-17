const currentUser = require("./currentUserCountries");
const db = require(rootPath + "/models");
const _ = require("lodash");
const { countries } = require("./countiresIso");

module.exports = async function updateUserCountry() {
  try {
    let users = await db.user.findAll({
      attributes: ["id", "countryId"],
    });
    for (const item of users) {
      if(item.countryId) {
        const code = currentUser.currentCountries.find(
          (e) => e?.countryId === item?.countryId
        );
  
        const country = countries.find((e) => e?.code === code?.code);  
        await db.user.update(
          {
            countryIsoCode: country?.code ?? null,
            country: country?.name ?? null,
          },
          { where: { id: item.id } }
        );
      }
    }
  } catch (error) {
    console.log(error.message, error.stack);
  }
};
