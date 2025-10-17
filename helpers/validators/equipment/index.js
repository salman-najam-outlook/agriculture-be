const { check } = require("express-validator");
const { equipmentFuelTypes, equipmentLoanStatus } = require("../../consts");

exports.equipmentModeOfOperationValidator = () => [
  check("name", "Equipment mode of operation name is required")
    .trim()
    .notEmpty(),
];

exports.equipmentGroupValidator = () => [
  check("name", "Equipment group name is required").trim().notEmpty(),
];

exports.equipmentNameValidator = () => [
  check("name", "Equipment name is required").trim().notEmpty(),
];

exports.equipmentValidator = () => [
  check("displayName", "Equipment display name is required").trim().notEmpty(),
  check("equipmentName").notEmpty(),
  check("category").notEmpty(),
  check("equipmentType").notEmpty(),
  check("quantity").notEmpty().isInt({ gt: 0 }),
  // check("fuelType").optional().isIn(equipmentFuelTypes),
  // check("loanStatus").optional().isIn(equipmentLoanStatus),
];
