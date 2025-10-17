const { check, oneOf } = require("express-validator");
const db = require(rootPath + "/models");

const validateModuleId = async (id) => {
  const status = await db.CropRecommendationModule.findOne({
    attributes: ["id"],
    where: { id },
  });
  if (status === null) {
    throw new Error("Invalid module id");
  }
};
const validateModuleAttrId = async (id) => {
  const status = await db.CropRecommendationModuleAttribute.findOne({
    attributes: ["id"],
    where: { id },
  });
  if (status === null) {
    throw new Error("Invalid module attribute id");
  }
};
const validateCropType = async (id) => {
  const status = await db.Option.findOne({
    attributes: ["id"],
    where: { id, groupName: "crop-type" },
  });
  if (status === null) {
    throw new Error(`Invalid crop type id, id=${id}`);
  }
};
const validateCropVariety = async (id) => {
  const status = await db.Crop.findOne({
    attributes: ["id"],
    where: { id },
  });
  if (status === null) {
    throw new Error(`Invalid crop variety id, id=${id}`);
  }
};
const validatePestId = async (id) => {
  const status = await db.CropObservationPestInfestation.findOne({
    attributes: ["id"],
    where: { id },
  });
  if (status === null) {
    throw new Error(`Invalid pest id, id=${id}`);
  }
};
const validateDiseaseId = async (id) => {
  const status = await db.CropObservationDisease.findOne({
    attributes: ["id"],
    where: { id },
  });
  if (status === null) {
    throw new Error(`Invalid disease id, id=${id}`);
  }
};

// validation start here
exports.moduleAttr = () => {
  return [
    check("moduleId")
      .notEmpty()
      .withMessage("This field is required")
      .bail()
      .custom(validateModuleId),
  ];
};

exports.cropHistory = () => {
  const sortBy = ["asc", "desc"];
  const daysFilter = [
    "last31Days",
    "currentMonth",
    "previousMonth",
    "currentQuarter",
    "last12Months",
  ];
  return [
    check("moduleId")
      .notEmpty()
      .withMessage("This field is required")
      .bail()
      .custom(validateModuleId),
    check("cropTypeId")
      .notEmpty()
      .withMessage("This field is required")
      .bail()
      .custom(validateCropType),
    check("page")
      .if(check("page").notEmpty())
      .notEmpty()
      .withMessage("This field is required")
      .bail()
      .isInt({ min: 1 }),
    check("pageSize")
      .if(check("pageSize").notEmpty())
      .notEmpty()
      .withMessage("This field is required")
      .bail()
      .isInt({ min: 1 }),
    check("sortBy")
      .if(check("sortBy").notEmpty())
      .notEmpty()
      .withMessage("This field is required")
      .bail()
      .isIn(sortBy),
    check("daysFilter")
      .if(check("daysFilter").notEmpty())
      .notEmpty()
      .withMessage("This field is required")
      .bail()
      .isIn(daysFilter),
    check("startDate")
      .if(check("startDate").notEmpty())
      .notEmpty()
      .withMessage("This field is required")
      .bail()
      .isDate({ format: process.env.ACCEPT_DATE_FORMAT })
      .withMessage(`date must be in ${process.env.ACCEPT_DATE_FORMAT} format`),
    check("endDate")
      .if(check("endDate").notEmpty())
      .notEmpty()
      .withMessage("This field is required")
      .bail()
      .isDate({ format: process.env.ACCEPT_DATE_FORMAT })
      .withMessage(`date must be in ${process.env.ACCEPT_DATE_FORMAT} format`),
  ];
};

exports.listValidation = () => {
  const sort = ["asc", "desc", "ASC", "DESC"];
  return [
    check("page")
      .if(check("page").notEmpty())
      .notEmpty()
      .withMessage("Page number is required")
      .isInt({ min: 1 })
      .withMessage("Invalid page number"),
    check("limit")
      .if(check("page").notEmpty())
      .notEmpty()
      .withMessage("limit is required")
      .isInt({ min: 0 })
      .withMessage("Invalid limit"),
    check("sort")
      .if(check("sort").notEmpty())
      .notEmpty()
      .withMessage("sort is required")
      .isIn(sort)
      .withMessage("Invalid sort option"),
  ];
};

exports.cropPdf = () => {
  return [
    check("cropType")
      .notEmpty()
      .withMessage("This field is required")
      .bail()
      .custom(
        async (ids) =>
          await Promise.all(
            ids
              .split("/")
              ?.filter((id) => id.trim() != "")
              .map(async (id) => validateCropType(id))
          )
      ),
  ];
};

exports.comprehensiveReport = () => {
  return [
    check("cropType")
      .trim()
      .notEmpty()
      .withMessage("This field is required")
      .bail()
      .escape()
      .custom(validateCropType),
  ];
};

exports.generalCropInfo = () => {
  return [
    check("cropType")
      .trim()
      .notEmpty()
      .withMessage("This field is required")
      .bail()
      .escape()
      .custom(validateCropType),
    check("cropVariety")
      .trim()
      .notEmpty()
      .withMessage("This field is required")
      .bail()
      .escape()
      .custom(validateCropVariety),
  ];
};

exports.pestAndDisease = () => {
  return [
    check("cropType")
      .trim()
      .notEmpty()
      .withMessage("This field is required")
      .bail()
      .escape()
      .custom(validateCropType),
    oneOf(
      [check("pestId").trim().notEmpty(), check("diseaseId").trim().notEmpty()],
      "pestId or diseaseId is must"
    ),
    check("pestId")
      .if(check("pestId").notEmpty())
      .trim()
      .notEmpty()
      .withMessage("This field is required")
      .bail()
      .escape()
      .custom(validatePestId),
    check("diseaseId")
      .if(check("diseaseId").notEmpty())
      .trim()
      .notEmpty()
      .withMessage("This field is required")
      .bail()
      .escape()
      .custom(validateDiseaseId),
  ];
};

exports.myCropReport = () => {
  return [
    check("cropType")
      .trim()
      .notEmpty()
      .withMessage("This field is required")
      .bail()
      .escape()
      .custom(validateCropType),
    check("historyId").trim().notEmpty().withMessage("This field is required"),
    check("cropVariety")
      .if(check("cropVariety").notEmpty())
      .trim()
      .notEmpty()
      .withMessage("This field is required")
      .bail()
      .escape()
      .custom(validateCropVariety),
    check("module")
      .trim()
      .notEmpty()
      .withMessage("This field is required")
      .bail()
      .custom(validateModuleId),
    check("moduleAttr")
      .trim()
      .notEmpty()
      .withMessage("This field is required")
      .bail()
      .custom(validateModuleAttrId),
  ];
};

exports.specialOperation = () => {
  return [
    check("cropType")
      .trim()
      .notEmpty()
      .withMessage("This field is required")
      .bail()
      .escape()
      .custom(validateCropType),
    check("practiceId")
      .trim()
      .notEmpty()
      .withMessage("This field is required")
      .escape(),
  ];
};
