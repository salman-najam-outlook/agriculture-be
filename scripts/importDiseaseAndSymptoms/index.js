const db = require(rootPath + "/models");
const _ = require("lodash");
const moment = require("moment");
const { diseasesAndSymptomsData } = require("./importData");
const { Op } = require("sequelize");

module.exports = async function importDiseaseAndSymptoms() {
  const diseaseTypeAndCropTypes = await db.DiseaseTypeAndCropType.findAll({
    attributes: ["cropTypeId", "diseaseTypeId"],
  });
  try {
    for (let item of diseasesAndSymptomsData) {
      for (let disease of item.diseases) {
        let diseaseType = await db.DiseaseType.findOne({
          where: {
            cropName: item.name,
            name: disease.name,
          },
        });

        if (!diseaseType) {
          const diseaseSet = {
            cropName: item.name,
            name: disease.name,
            createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
            updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
          };

          diseaseType = await db.DiseaseType.create(diseaseSet, {});
        }

        for (let symptom of disease.symptoms) {
          const symptomSet = {
            diseaseTypeId: diseaseType.id,
            symptoms: symptom,
          };
          const existingSymptom = await db.DiseaseSymptoms.findOne({ where: symptomSet });
          if (!existingSymptom) {
            await db.DiseaseSymptoms.create(symptomSet, {});
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
            diseaseTypeId: diseaseType.id,
          }))
          .filter((item) => {
            const exists = diseaseTypeAndCropTypes.find(
              (existingItem) =>
                existingItem.cropTypeId == item.cropTypeId && existingItem.diseaseTypeId == item.diseaseTypeId
            );
            if (exists) return false;
            return true;
          });

        await db.DiseaseTypeAndCropType.bulkCreate(setMap, {});
      }
    }
  } catch (error) {
    console.log(error.message, error.stack);
  }
};
