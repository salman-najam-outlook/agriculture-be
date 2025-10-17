const db = require(rootPath + "/models");
const _ = require("lodash");
const moment = require("moment");
const { pestAndSymptomsData } = require("./importData");
const { Op } = require("sequelize");

module.exports = async function importPestAndSymptoms() {
  const pestTypeAndCropTypes = await db.PestTypeAndCropType.findAll({
    attributes: ["cropTypeId", "pestTypeId"],
  });
  try {
    for (let item of pestAndSymptomsData) {
      for (let pest of item.pests) {
        const pestSet = {
          cropName: item.name,
          name: pest.name,
          createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
          updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
        };

        let pestType = await db.PestType.findOne({
          where: { cropName: item.name, name: pest.name },
        });

        if (!pestType) {
          pestType = await db.PestType.create(pestSet, {});
        }

        for (let symptom of pest.symptoms) {
          const symptomSet = {
            pestTypeId: pestType.id,
            name: symptom,
          };
          let symptoms = await db.PestInfestationSymptom.findOne({
            where: { pestTypeId: pestType.id, name: symptom },
          });
          if (!symptoms) {
            await db.PestInfestationSymptom.create(symptomSet, {});
          }
        }

        // Relation between options and Symptoms
        const cropTypes = await db.Option.findAll({
          raw: true,
          attributes: ["id", "name"],
          where: {
            name: { [db.Sequelize.Op.like]: `${item.name}%` },
            groupName: "crop-type",
          },
        });
        const setMap = cropTypes
          ?.map(({ id: cropTypeId }) => ({
            cropTypeId,
            pestTypeId: pestType.id,
          }))
          .filter((item) => {
            const exists = pestTypeAndCropTypes.find(
              (existingItem) =>
                existingItem.cropTypeId == item.cropTypeId && existingItem.pestTypeId == item.pestTypeId
            );
            if (exists) return false;
            return true;
          });

        await db.PestTypeAndCropType.bulkCreate(setMap, {});
      }
    }
  } catch (error) {
    console.log(error.message, error.stack);
  }
};
