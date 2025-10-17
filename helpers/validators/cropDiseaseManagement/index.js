const { check } = require("express-validator");
const dateFormat = "MM/DD/YYYY";
exports.diseaseManagementValidation = () => {
  return [
    check("farmId")
      .notEmpty()
      .withMessage("Farm id is required")
      .isInt()
      .withMessage("Invalid farm id"),
    check("cropTypeId")
      .optional({ checkFalsy: true })
      .isInt()
      .withMessage("Invalid cropType field"),
    check("cropVarietyId")
      .optional({ checkFalsy: true })
      .isInt()
      .withMessage("Invalid cropVarietyId field"),
    check("cropStageId")
      .optional({ checkFalsy: true })
      .isInt()
      .withMessage("Invalid cropStageId field"),
    check("area")
      .optional()
      .escape()
      .isFloat()
      .withMessage("Invalid area field"),
    check("firstSignDetectionDate")
      .optional()
      .trim()
      .isDate({ format: dateFormat, strictMode: true })
      .withMessage("invalid date format"),
    check("numOfPlantAffected")
      .optional({ checkFalsy: true })
      .isInt()
      .withMessage("Invalid number of plants effected field"),
    check("plantPartAffectedId")
      .optional()
      .isArray()
      .withMessage("Plant parts affected must be in array"),
    check("diseaseTypeId")
      .optional()
      .isArray()
      .withMessage("Disease type must be in array"),
    check("fungalDiseaseTypeId")
      .optional()
      .isArray()
      .withMessage("Funtal disease type must be in array"),
    check("fungalDiseaseSignId")
      .optional()
      .isArray()
      .withMessage("Fungal disease sign must be in array"),
    check("fungalDiseaseControlMeasure").optional().trim().isString().escape(),
    check("bacterialDiseaseTypeId")
      .optional()
      .isArray()
      .withMessage("Fungal disease sign must be in array"),
    check("bacterialDiseaseSignId")
      .optional()
      .isArray()
      .withMessage("Bacterial disease sign must be in array"),
    check("bacterialDiseaseControlMeasure")
      .optional()
      .trim()
      .isString()
      .escape(),
    check("viralDiseaseTypeId")
      .optional()
      .isArray()
      .withMessage("Fungal disease sign must be in array"),
    check("viralDiseaseSignId")
      .optional()
      .isArray()
      .withMessage("Bacterial disease sign must be in array"),
    check("viralDiseaseControlMeasure").optional().trim().isString().escape(),
    check("diseaseControlMethodId")
      .optional()
      .isArray()
      .withMessage("Disease control methods must be in array"),
    check("diseaseControlDuration")
      .optional()
      .escape()
      .isFloat()
      .withMessage("Invalid diseaseControlDuration field"),
    check("diseaseControlStartDate")
      .optional()
      .trim()
      .isDate({ format: dateFormat, strictMode: true })
      .withMessage("invalid disease control start date format"),
    check("diseaseControlOtherDate")
      .optional()
      .trim()
      .isDate({ format: dateFormat, strictMode: true })
      .withMessage("invalid disease control other date format"),
    check("culturalMechanicalBiologicalDCMId")
      .optional()
      .isArray()
      .withMessage("Disease control methods must be in array"),
    check("culturalMechanicalBiologicalDCMAppliedArea")
      .optional()
      .escape()
      .isFloat()
      .withMessage("Invalid culturalMechanicalBiologicalDCMAppliedArea field"),
    check("chemicalActiveIngredient").optional().trim().isString().escape(),
    check("totalChemicalUsed")
      .optional()
      .escape()
      .isFloat()
      .withMessage("Invalid totalChemicalUsed field"),
    check("chemicalApplicationRate")
      .optional()
      .escape()
      .isNumeric()
      .withMessage("Invalid chemical application rate"),
    check("chemicalEfficacy")
      .optional()
      .escape()
      .isFloat()
      .withMessage("Invalid chemical efficiency"),
    check("chemicalApplicationMethodId")
      .optional()
      .isArray()
      .withMessage("Chemical applicatio method must be in array"),
    check("daysAfterSowing")
      .optional()
      .trim()
      .isInt()
      .withMessage("daysAfterSowing is required"),
  ];
};
exports.updateDiseaseManagementValidation = () => {
    return [
      check("id")
        .notEmpty()
        .withMessage("Disease id is required")
        .bail()
        .isInt()
        .withMessage("Invalid disease id")      
    ];
  };