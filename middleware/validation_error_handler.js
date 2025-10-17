const { validationResult } = require('express-validator');
const { errorRespSync } = require(rootPath + '/helpers/api');
const { error } = require(rootPath + '/helpers/language');
const db = require(rootPath + '/models');
const _ = require('lodash');

function getErrorParams(validationErrors, returnedParams = []) {
  for (const error of validationErrors) {
    if(error.nestedErrors && Array.isArray(error.nestedErrors)) {
      getErrorParams(error.nestedErrors, returnedParams);
    } else if(typeof error.param === 'string') {
      // Replacing digits like 'key[0]nestedKey' to 'key[]nestedKey'
      returnedParams.push(error.param.replace(/\d/gi, ''));
    }
  }
  return Array.from(new Set(returnedParams));
}

module.exports = async function (req, res, next) {
  try {
    endPoint = req.baseUrl
    // Check for validation error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const adminAPIPrefixes = ['api/admin', 'api/super-admin'];
      const isAdminAPI = adminAPIPrefixes.some(
        (prefix) => req.baseUrl.startsWith(prefix) || req.baseUrl.startsWith(`/${prefix}`)
      );
      let msg;
      if (isAdminAPI) {
        msg = { errors: errors.array() };
      } else {
        const errorFields = getErrorParams(errors.array()).map(param => _.upperFirst(_.lowerCase(param))).join(', ');
        const lang = (req.headers.lang || 'en').toLowerCase();
        if (lang !== 'en') {
          if (typeof req.simpleTranslate === 'function') {
            msg = `${req.simpleTranslate('These data are invalid')}: ${errorFields}`;
          } else {
            const translation = await db.GlobalTranslation.findOne({ where: { english: 'These data are invalid' } });
            const langObject = {
              en: translation.english,
              hi: translation.hindi,
              mr: translation.marathi,
              ne: translation.nepali,
              es: translation.spanish,
              id: translation.indonesian,
              in: translation.indonesian,
              ar: translation.arabic,
              pt: translation.portugese,
              fr: translation.french,
              vi: translation.vietnamese,
              am: translation.amharic,
              so: translation.somali,
              om: translation.oromo,
              bn: translation.bengali,
              sw: translation.swahili,
              el: translation.greek,
              tr: translation.turkish,
            };
            msg = `${langObject[lang]}: ${errorFields}`;
          }
        } else {
          msg = `These data are invalid: ${errorFields}`;
        }
      }
      return res.json(
        errorRespSync({
          code: 200,
          msg,
        })
      );
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
    res.status(error.code.SERVER).json(errorRespSync({ code: error.code.SERVER }));
  }
};
