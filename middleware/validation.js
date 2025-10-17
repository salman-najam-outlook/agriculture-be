const { errorResp } = require("../helpers/api");
const REGISTRATION_ALLOWED_COUNTRY = ['indonesia', 'kenya'];
const KENYA_COOPERATIVES = ["cooperative_union", "cooperative_society", "company", "estate", "agent"]
const INDONESIA_COOPERATIVES = ['koperasi', 'ekspor', 'koperasi','keduanya']
const validateRegistration = (req, res, next) => {
  const {
    firstName,
    email,
    organizationName,
    organizationLogo,
    products,
    securityToken,
    phoneNumber,
    country,
    NoOfFarmsPlanningtoonboard,
    organizationType,
  } = req.body;

  // Required fields validation
  if (!email || !organizationName || !securityToken) {
    return res.status(400).json({
      success: false,
      code: 400,
      msg: "Missing required fields"
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      code: 400,
      msg: "Invalid email format"
    });
  }


  // // Products validation
  // if (!Array.isArray(products) || products.length === 0) {
  //   return res.status(400).json({
  //     success: false,
  //     code: 400,
  //     msg: "Products must be a non-empty array"
  //   });
  // }

  // const validProducts = ["Coffee", "Cacao"];
  // const invalidProducts = products.filter(product => !validProducts.includes(product));
  // if (invalidProducts.length > 0) {
  //   return res.status(400).json({
  //     success: false,
  //     code: 400,
  //     msg: `Invalid products: ${invalidProducts.join(", ")}. Valid products are: ${validProducts.join(", ")}`
  //   });
  // }

  // NoOfFarmsPlanningtoonboard validation (if provided)
  // if (NoOfFarmsPlanningtoonboard !== undefined) {
  //   if (!Number.isInteger(NoOfFarmsPlanningtoonboard) || NoOfFarmsPlanningtoonboard < 0) {
  //     return res.status(400).json({
  //       success: false,
  //       code: 400,
  //       msg: "NoOfFarmsPlanningtoonboard must be a non-negative integer"
  //     });
  //   }
  // }


  if (typeof organizationName !== 'string' || organizationName.trim().length < 2) {
    return res.status(400).json({
      success: false,
      code: 400,
      msg: "Organization name must be at least 2 characters long"
    });
  }

  // Security token validation
  if (typeof securityToken !== 'string' || securityToken.trim().length < 10) {
    return res.status(400).json({
      success: false,
      code: 400,
      msg: "Invalid security token format"
    });
  }

  if (!REGISTRATION_ALLOWED_COUNTRY.includes(country.toLowerCase())) {
      return res.status(400).json({
        success: false,
        code: 400,
        message: `Registration is not allowed for the country: ${country}. Allowed countries are: ${REGISTRATION_ALLOWED_COUNTRY.join(', ')}`
      });
  }

   if (country && country.toLowerCase() == 'kenya' && !KENYA_COOPERATIVES.includes(organizationType)) {
      return res.status(400).json({
        success: false,
        code: 400,
        message: `Registration co-operative is not allowed for kenya region`
      });
    }

    if (country && country.toLowerCase() == 'indonesia' && !INDONESIA_COOPERATIVES.includes(organizationType)) {
      return res.status(400).json({
        success: false,
        code: 400,
        message: `Registration co-operative is not allowed for indonesia region`
      });
    }

  

  next();
};

module.exports = {
  validateRegistration
};