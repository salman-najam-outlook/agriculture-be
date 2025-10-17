const {
  getCropsData,
  getUnitOfSalesData,
  getLeftOverCropsData,
  getNPKValues,
  getSystemFertilizers,
  getUserFertilizersData,
  calculateNutrient,
  createUserFertilizer
} = require("./NutrientService");

const db = require(rootPath + "/models");

let cropLookup = null;

//singleton for copLookup
async function initializeCropLookup() {
  if (!cropLookup) {
    const { data: cropsData } = await getCropsData();
    cropLookup = {};
    cropsData?.forEach(cropEl => {
      cropLookup[cropEl.id] = cropEl.name;
    });
  }
}



// fetch all analysis data
exports.fetchAllAnalysisData = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;
    const { data: crops } = await getCropsData();
    const { data: unitOfSales } = await getUnitOfSalesData();
    // const { data: npkData } = await getNPKValues(latitude, longitude);
    const { data: fertilizers } = await getSystemFertilizers();
    // const { data: userFertilizers } = await getUserFertilizersData(userId);

    return res
      .status(200)
      .json({ success: true, data: { crops, unitOfSales, fertilizers } });
  } catch (error) {
    console.error("Error in fetchAllAnalysisData:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch analysis data" });
  }
};

exports.getNutrientCalculationsListing = async (req, res) => {
  try {
    const userId = req.user.id;

    let queryOptions = {
      where: { userId },
      order: [['createdAt', 'DESC']],
    };

    const { page, limit, orderBy, order } = req.query;

    if (page && limit) {
      queryOptions.offset = (page - 1) * parseInt(limit, 10);
      queryOptions.limit = parseInt(limit, 10);
    }

    if (orderBy && order) {
      queryOptions.order = [[orderBy, order]];
    }

    const nutrientCalculations = await db.NutrientAnalysisResult.findAndCountAll(queryOptions);

    return res.status(200).json({
      success: true,
      data: nutrientCalculations.rows,
      total: nutrientCalculations.count,
      page: parseInt(page, 10) || 1,
      limit: parseInt(limit, 10) || nutrientCalculations.count,
    });
  } catch (error) {
    console.error("Error in getNutrientCalculationsListing:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch nutrient calculation results",
    });
  }
};

exports.getNPKValuesWithCoordinates = async (req, res) => {
  const { latitude, longitude } = req.body;
  try {
    const coordinates = `${latitude},${longitude}`; // "1.1733286202544662,31.89824178909575"
    const { data } = await getNPKValues(coordinates);
    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error in getNPKValuesWithCoordinates:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch NPK values" });
  }
};

exports.getNutrientCalculations = async (req, res) => {
  try {
    const {
      area,
      areaUnit,
      cropDetail,
      fertilizers,
      userFertilizers,
      soilInfo,
      cropLeftOnField,
    } = req.body;

   await initializeCropLookup()

    cropDetail.cropName = cropLookup?.[cropDetail.cropId]

    // cropDetail is an object with cropId , yeildExpected, yeildUnit, 
    // optional keys for cropDetail are uptakeN, uptakeP, uptakeK
    // value for yeildUnit os ton/ha  from now

    // mandatory required fields are area, areaUnit, cropDetail and userId
    const parameterForNutrientCalculation = {
      area,
      areaUnit,
      cropDetail,
      userId: req.user.id,
    };

    // . fertilizers, userFertilizers, soilInfo, cropLeftOnField are optional.
    if (fertilizers) {
      // fertilizers is an array of objects with keys id, price, unitOfSale
      // unitOfSale is an object with keys type and quantityPerUnit
      parameterForNutrientCalculation.fertilizers = fertilizers;
    }
    if (userFertilizers) {
      parameterForNutrientCalculation.userFertilizers = userFertilizers;
    }
    if (soilInfo) {
      // soilInfo is an object with keys N, P, K, AND unit (kg/ha)
      parameterForNutrientCalculation.soilInfo = soilInfo;
    }
    if (cropLeftOnField) {
      // cropLeftOnField is an object with keys cropId, yeildHarvested, yeildUnit, cropLeftOnField
      parameterForNutrientCalculation.cropLeftOnField = cropLeftOnField;
    }

    const response = await calculateNutrient(parameterForNutrientCalculation);
    if(!response.success){
      return res
      .status(400)
      .json({ success: false, message: response.message, data: response });
    }
    const analysis  = await db.NutrientAnalysisResult.create({
      userId: req.user.id,
      area,
      areaUnit,
      cropDetail,
      fertilizers,
      userFertilizers,
      soilInfo,
      cropLeftOnField,
      recommendations: response.recommendations,
      totalCost:response.totalCost,
      remarks: response.remarks || null,
    });
    return res
      .status(200)
      .json({ success: true, data: analysis.get(), message: "Nutrient calculation done successfully" });
  } catch (error) {
    console.error("Error in getNutrientCalculator:", error);
    return res.status(500).json({
      success: false,
      data: error,
      message: error?.message || "Failed to calculate nutrient",
    });
  }
};

exports.getUserFertilizersData = async (req, res) => {
  const userId = req.user.id;
  try {
    const { data } = await getUserFertilizersData(userId);
    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error in getUserFertilizersData:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch user fertilizers data",
    });
  }
};

exports.saveUserFertilizer = async (req, res) => {
  const userId = req.user.id;
  try {
    const { data } = await createUserFertilizer(userId, req.body);
    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error in createUserFertilizer:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create user fertilizer",
    });
  }
};

exports.getLeftOverCropsData = async (req, res) => {
  try {
    const { data } = await getLeftOverCropsData(req,res);
    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error in getLeftOverCropsData:", error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Failed to fetch left over crops data",
      });
  }
};
