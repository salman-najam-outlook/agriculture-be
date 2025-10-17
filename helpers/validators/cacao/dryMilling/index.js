const {check} = require('express-validator');

exports.validateCacaoFlavor= () =>{
    return [
        check("name").notEmpty().withMessage("Flavor name is required.").isString()
    ];
};

exports.validateDryMilling = () =>{
    return [
        check("dryingInitialDate").notEmpty().withMessage("Initial Date is required.").isDate(),
    ]
}

exports.validateDryingType= () =>{
  return [
    check("name").notEmpty().withMessage("Drying name is required.").isString()
  ];
};