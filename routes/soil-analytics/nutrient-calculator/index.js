const router = require('express').Router();
const auth = require(rootPath + "/middleware/auth");
const NutrientCalculatorController = require("./NutrientCalculator.controller");

router.post("/",auth, NutrientCalculatorController.getNutrientCalculations);

router.get("/",auth, NutrientCalculatorController.getNutrientCalculationsListing);
router.get("/fetch-required-analysis-data",auth, NutrientCalculatorController.fetchAllAnalysisData);

router.get("/user-custom-fertilizers",auth, NutrientCalculatorController.getUserFertilizersData);
//left over crops data
router.post("/left-over-crops",auth, NutrientCalculatorController.getLeftOverCropsData);
router.post("/npk",auth, NutrientCalculatorController.getNPKValuesWithCoordinates);

// create user fertilizer
router.post("/user-custom-fertilizers",auth, NutrientCalculatorController.saveUserFertilizer);
module.exports = router;