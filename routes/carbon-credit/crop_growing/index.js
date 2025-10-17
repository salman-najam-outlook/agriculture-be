const express = require("express");
const router = express.Router();
const db = require(rootPath + "/models");
const auth = require(rootPath + "/middleware/auth");
const translation = require(rootPath + "/middleware/translation");
const { serverError, successRespSync } = require(rootPath + "/helpers/api");
const { success, error } = require(rootPath + "/helpers/language");
const { logErrorOccurred } = require(rootPath + "/helpers/general");

const getDetailedCropGrowingCrop = async (id) => {
  return await db.CarbonCreditCropGrowingCrop.findByPk(id, {
    include: [
      {
        model: db.CarbonCreditCropGrowing,
        as: "crop_growing",
      },
      {
        model: db.Option,
        as: "crop_types",
      },
      {
        model: db.Seedlings,
        as: "seedlings",
      },
      {
        model: db.Sowing,
        as: "sowings",
      },
      {
        model: db.NutrientManagementFertilizerInputs,
        as: "fertilizers",
      },
      {
        model: db.CarbonCreditCropGrowingCropVariety,
        as: "crop_varieties",
        include: [
          {
            model: db.Crop,
            as: "crop_variety"
          }
        ]
      }
    ],
  });
};

/**
 * Crop Growing Crops Seeding, Sowing, Fertilizer (SSF) Information Create API
 */
router.post("/crop/:id/ssf", auth, translation, async (req, res) => {
  try {
    const { sowings, seedlings, fertilizers } = req.body;

    const crop_growing_crop_id = req.params.id;

    // Validate required fields
    if (
      !crop_growing_crop_id ||
      (sowings.length < 1 && seedlings.length < 1 && fertilizers.length < 1)
    ) {
      return serverError(res, error.CARBON_CREDIT_PROJECT_AGREEMENT_MISSING);
    }

    // Check if project exists
    let cropGrowingCropExists = await db.CarbonCreditCropGrowingCrop.findByPk(
      crop_growing_crop_id
    );

    if (!cropGrowingCropExists) {
      cropGrowingCropExists = await db.CarbonCreditCropGrowingCrop.findOne({
        where: {
          recordId: crop_growing_crop_id
        }
      });

      if (!cropGrowingCropExists) {
        return serverError(res, error.CARBON_CREDIT_PROJECT_NOT_EXISTS);
      }
    }

    // Testing and creating all sowing IDs
    for (const sowing_id of sowings) {
      let sowingExists = await db.Sowing.findByPk(sowing_id);
      if (!sowingExists) {
        throw Error(error.CARBON_CREDIT_SOWING_NOT_EXISTS);
      }

      await db.CarbonCreditCropGrowingCropSowing.create({
        crop_growing_crop_id: cropGrowingCropExists.id,
        sowing_id,
      });
    }

    // Testing and creating all seedling IDs
    for (const seedling_id of seedlings) {
      let seedlingExists = await db.Seedlings.findByPk(seedling_id);
      if (!seedlingExists) {
        throw Error(error.CARBON_CREDIT_SEEDLING_NOT_EXISTS);
      }

      await db.CarbonCreditCropGrowingCropSeedling.create({
        crop_growing_crop_id: cropGrowingCropExists.id,
        seedling_id,
      });
    }

    // Testing and creating all fertilizer IDs
    for await (const fertilizer_id of fertilizers) {
      let fertilizerExists =
        await db.NutrientManagementFertilizerInputs.findByPk(fertilizer_id);
      if (!fertilizerExists) {
        throw Error(error.CARBON_CREDIT_FERTILIZER_NOT_EXISTS);
      }

      await db.CarbonCreditCropGrowingCropFertilizer.create({
        crop_growing_crop_id: cropGrowingCropExists.id,
        fertilizer_id,
      });
    }

    // Fetch detailed crop growing crop ID
    const cropGrowingCropDetailed =
      await getDetailedCropGrowingCrop(crop_growing_crop_id);

    return res.json(
      successRespSync({
        msg: success.CARBON_CREDIT_CROP_GROWING_EQUIPMENT_CREATED,
        data: cropGrowingCropDetailed,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * Crop Growing Crops Create API
 */
router.post("/:id/crops", 
  auth, 
  translation, async (req, res) => {

  try {
    const { crops } = req.body;

    const crop_growing_id = req.params.id;

    // Validate required fields
    if (!crop_growing_id || crops.length < 1) {
      return serverError(res, error.CARBON_CREDIT_PROJECT_AGREEMENT_MISSING);
    }

    // Check if project exists
    let cropGrowingExists = await db.CarbonCreditCropGrowing.findByPk(
      crop_growing_id
    );

    if (!cropGrowingExists) {
      cropGrowingExists = await db.CarbonCreditCropGrowing.findOne({
        where: {
          recordId: crop_growing_id
        }
      });

      if (!cropGrowingExists) {
        return serverError(res, error.CARBON_CREDIT_PROJECT_NOT_EXISTS);
      }
    }

    for (const { crop_type_id, crop_varieties } of crops) {
      let cropExists = await db.Option.findByPk(crop_type_id);

      if (!cropExists) {
        logErrorOccurred(__filename, `Crop with id ${crop_type_id} does not exist!`);
        return serverError(res, error.CARBON_CREDIT_CROP_NOT_EXISTS);
      }

      if (crop_varieties.length > 0) {
        for (const crop_variety_id of crop_varieties) {
          let cropVExists = await db.Crop.findOne({
            attributes: ['id'],
            where: {
              id: crop_variety_id
            }
          });
  
          if (!cropVExists) {
            logErrorOccurred(__filename, `Crop variety with id ${crop_variety_id} does not exist for crop id ${crop_id}!`);
            return serverError(res, error.CARBON_CREDIT_CROP_VARIETY_NOT_EXISTS);
          }
        }
      }
    }

    const cropGrowingCrops = [];

    for await (const { crop_type_id, crop_varieties, recordId } of crops) {

      let cropGrowingCrop = await db.CarbonCreditCropGrowingCrop.create(
        {
          crop_type_id,
          crop_growing_id: cropGrowingExists.id,
          recordId
        }
      );

      if (crop_varieties.length > 0) {
        for (const crop_variety_id of crop_varieties) {
          await db.CarbonCreditCropGrowingCropVariety.create({
            crop_growing_crop_id: cropGrowingCrop.id,
            crop_variety_id
          });
        }
      }

      cropGrowingCrop = await getDetailedCropGrowingCrop(cropGrowingCrop.id);

      cropGrowingCrops.push(cropGrowingCrop);
    }

    return res.json(
      successRespSync({
        msg: success.CARBON_CREDIT_CROP_GROWING_CROP_CREATED,
        data: cropGrowingCrops,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * Crop Growing Equipments Create API
 * 
 * Someday I will fix all these redundencies in the
 * code but today is not that day
 */
router.post("/:id/equipments", auth, translation, async (req, res) => {
  try {
    const { equipments } = req.body;

    const crop_growing_id = req.params.id;

    // Validate required fields
    if (!crop_growing_id || equipments.length < 1) {
      return serverError(res, error.CARBON_CREDIT_PROJECT_AGREEMENT_MISSING);
    }

    // Check if project exists
    let cropGrowingExists = await db.CarbonCreditCropGrowing.findByPk(
      crop_growing_id
    );

    if (!cropGrowingExists) {
      cropGrowingExists = await db.CarbonCreditCropGrowing.findOne({
        where: {
          recordId: crop_growing_id
        }
      });

      if (!cropGrowingExists) {
        return serverError(res, error.CARBON_CREDIT_PROJECT_NOT_EXISTS);
      }
    }

    for await (const { equipment_id, fuel_records } of equipments) {
      let equipmentExists = await db.Equipment.findByPk(equipment_id);
      if (!equipmentExists) {
        logErrorOccurred(
          __filename,
          `Equipment with id ${equipment_id} does not exist!`
        );
        return serverError(res, error.CARBON_CREDIT_EQUIPMENT_NOT_EXISTS);
      }

      for await (const fuel_record_id of fuel_records) {
        let fuelRecordExists = await db.EquipmentFuelRecord.findByPk(fuel_record_id);

        if (!fuelRecordExists) {
          fuelRecordExists = await db.EquipmentFuelRecord.findOne({
            where: {
              recordId: fuel_record_id
            }
          });

          if (!fuelRecordExists) {
            logErrorOccurred(
              __filename,
              `Equipment fuel record with id ${fuel_record_id} does not exist!`
            );
            return serverError(res, error.CARBON_CREDIT_EQUIPMENT_FUEL_RECORD_NOT_EXISTS);
          }
        } 
      }
    }

    const cropGrowingEquipments = [];

    for await (const { equipment_id, fuel_records, recordId} of equipments) {
      const cropGrowingEquipmentDetailed = {
        cropGrowingEqiupment: null,
        cropGrowingEquipmentFuelRecords: []
      };

      const cropGrowingEquipment = await db.CarbonCreditCropGrowingEquipment.create(
        {
          equipment_id,
          crop_growing_id: cropGrowingExists.id,
          recordId
        }
      );

      cropGrowingEquipmentDetailed.cropGrowingEqiupment = cropGrowingEquipment;

      for await (const fuel_record_id of fuel_records) {
        let fuelRecord = await db.EquipmentFuelRecord.findByPk(fuel_record_id);

        if (!fuelRecord) {
          fuelRecord = await db.EquipmentFuelRecord.findOne({
            where: {
              recordId: fuel_record_id
            }
          });
        }
        const cropGrowingEquipmentFuelRecord = await db.CarbonCreditCropGrowingEquipmentFuelRecord.create({
          carbon_credit_crop_growing_equipment_id: cropGrowingEquipment.id,
          equipment_fuel_record_id: fuelRecord.id
        });

        cropGrowingEquipmentDetailed.cropGrowingEquipmentFuelRecords.push(cropGrowingEquipmentFuelRecord);
      }

      cropGrowingEquipments.push(cropGrowingEquipmentDetailed);
    }

    return res.json(
      successRespSync({
        msg: success.CARBON_CREDIT_CROP_GROWING_EQUIPMENT_CREATED,
        data: cropGrowingEquipments,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * Delete Crop Growing Equipment
 */
router.delete("/equipments/:cgeqId", auth, translation, async (req, res) => {
  try {
    const crop_growing_equipment_id= req.params.cgeqId;

    // Validate required fields
    if (!crop_growing_equipment_id) {
      return serverError(res, "Missing Parameters");
    }

    // Check if project exists
    let cropGrowingEquipmentExists = await db.CarbonCreditCropGrowingEquipment.findOne({
      where: {
        [Op.or]: [
          { id: crop_growing_equipment_id },
          { recordId: crop_growing_equipment_id }
        ]
      }
    });
    
    if (!cropGrowingEquipmentExists) {
      return serverError(res, "Record does not exist!");
    }
    
    await db.CarbonCreditCropGrowingEquipment.destroy({
      where: {
        id: cropGrowingEquipmentExists.id
      }
    });

    return res.json(
      successRespSync({
        msg: "Crop Growing Equipment Deleted",
        data: cropGrowingEquipmentExists,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * Delete Crop Growing Equipment
 */
router.delete("/equipments/fuel-record/:id", auth, translation, async (req, res) => {
  try {
    const crop_growing_equipment_fuel_record_id = req.params.id;

    // Validate required fields
    if (!crop_growing_equipment_fuel_record_id) {
      return serverError(res, "Missing Parameters");
    }

    // Check if project exists
    let cropGrowingEquipmentFuelRecordExists = await db.CarbonCreditCropGrowingEquipmentFuelRecord.findByPk(crop_growing_equipment_fuel_record_id);
    
    if (!cropGrowingEquipmentFuelRecordExists) {
      return serverError(res, "Record does not exist!");
    }
    
    await db.CarbonCreditCropGrowingEquipment.destroy({
      where: {
        id: crop_growing_equipment_fuel_record_id
      }
    });

    return res.json(
      successRespSync({
        msg: "Crop Growing Equipment Deleted",
        data: cropGrowingEquipmentFuelRecordExists,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

module.exports = router;