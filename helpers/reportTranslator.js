const translationsLocales = require('./translation.locale.js');

function translatedReportData(obj, lang, isInner = false) {
  const translatedObj = {};

  for (const key in obj) {
    if (typeof obj[key] === 'object') {
      if (Array.isArray(obj[key])) {
        translatedObj[key] = obj[key].map((item) => translatedReportData(item, lang, true));
      } else {
        translatedObj[key] = translatedReportData(obj[key], lang, true);
      }
    } else {
      const translatedKey = isInner ? translationsLocales[lang]?.[key] || key : key;
      translatedObj[translatedKey] = obj[key];
      if (key === 'title') {
        translatedObj['title'] = translationsLocales[lang]?.[obj['title']] || obj['title'];
      }
    }
  }
  return translatedObj;
}

module.exports = translatedReportData;
