const db = require(rootPath + "/models");
const { Op } = require("sequelize");

module.exports.addObservationToFarm = async (farm, observationId, t) => {
  const farmDataPromises = farm.map(async (id) => {
    const _farm = await db.user_farm.findOne({
      where: {
        [Op.and]: [
          {
            [Op.or]: [
              { id: id}, 
              { recordId: id }
            ]
          },
          { isDeleted: 0 }
        ]
      }
    });
    if(_farm) {
      return {
        farm: _farm.id,
        observation: observationId,
      }
    }
  });
  const farmData = await Promise.all(farmDataPromises);
  await db.CropObservationFarm.bulkCreate(farmData, {
    transaction: t,
  });
};

module.exports.addObservationToSegment = async (segment, observationId, t) => {
  const segmentDataPromises = segment.map(async (geofenceId) => {
    const segment = await db.Geofence.findOne({
      where: {
        [Op.or]: [{ id: geofenceId }, { recordId: geofenceId }]
      }
    });
    if(segment) {
      return {
        segment: segment.id,
        observation: observationId,
      }
    }
  });
  const segmentData = await Promise.all(segmentDataPromises);
  await db.CropObservationSegment.bulkCreate(segmentData, {
    transaction: t,
  });
};

module.exports.addObservationCropVariety = async (
  cropVariety,
  observationId,
  t
) => {
  const cropVarietyData = [];
  cropVariety.forEach((id) =>
    cropVarietyData.push({
      cropVariety: id,
      observation: observationId,
    })
  );
  await db.CropObservationVariety.bulkCreate(cropVarietyData, {
    transaction: t,
  });
};

module.exports.addObservationDeficiency = async (
  deficiencies,
  observationId,
  t
) => {
  const observationDeficiency = [];
  deficiencies.forEach((id) =>
    observationDeficiency.push({
      deficiency: id,
      observation: observationId,
    })
  );
  await db.CropObservationDeficiencyList.bulkCreate(observationDeficiency, {
    transaction: t,
  });
};

module.exports.addObservationToxicity = async (
  toxicities,
  observationId,
  t
) => {
  const observationToxicityData = [];
  toxicities.forEach((id) =>
    observationToxicityData.push({
      toxicity: id,
      observation: observationId,
    })
  );
  await db.CropObservationToxicityList.bulkCreate(observationToxicityData, {
    transaction: t,
  });
};

module.exports.addObservationDiseases = async (diseases, observationId, t) => {
  const observationDiseases = [];
  diseases.forEach((id) =>
    observationDiseases.push({
      disease: id,
      observation: observationId,
    })
  );
  await db.CropObservationDiseaseList.bulkCreate(observationDiseases, {
    transaction: t,
  });
};

module.exports.addObservationPestInfestation = async (
  infestations,
  observationId,
  t
) => {
  const observationInfestations = [];
  infestations.forEach((id) =>
    observationInfestations.push({
      pestInfestation: id,
      observation: observationId,
    })
  );
  await db.CropObservationPestInfestationList.bulkCreate(
    observationInfestations,
    {
      transaction: t,
    }
  );
};

module.exports.removeObservationAdditonalData = async (observationId, t) => {
  await db.CropObservationFarm.destroy(
    {
      where: {
        observation: observationId,
      },
    },
    { transaction: t }
  );
  await db.CropObservationSegment.destroy(
    {
      where: {
        observation: observationId,
      },
    },
    { transaction: t }
  );
  await db.CropObservationVariety.destroy(
    {
      where: {
        observation: observationId,
      },
    },
    { transaction: t }
  );
  await db.CropObservationDeficiencyList.destroy(
    {
      where: {
        observation: observationId,
      },
    },
    { transaction: t }
  );
  await db.CropObservationDiseaseList.destroy(
    {
      where: {
        observation: observationId,
      },
    },
    { transaction: t }
  );
  await db.CropObservationToxicityList.destroy(
    {
      where: {
        observation: observationId,
      },
    },
    { transaction: t }
  );
  await db.CropObservationPestInfestationList.destroy(
    {
      where: {
        observation: observationId,
      },
    },
    { transaction: t }
  );
  await db.CropObservationCost.destroy(
    { where: { observationId: observationId } },
    {
      transaction: t,
    }
  );
};
