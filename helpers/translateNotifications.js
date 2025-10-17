const db = require('../models'); // Adjust the path as needed

const trans = {
  en: 'english',
  hi: 'hindi',
  mr: 'marathi',
  ne: 'nepali',
  es: 'spanish',
  id: 'indonesian',
  in: 'indonesian',
  ar: 'arabic',
  pt: 'portugese',
  fr: 'french',
  vi: 'vietnamese',
  am: 'amharic',
  so: 'somali',
  om: 'oromo',
  bn: 'bengali',
  sw: 'swahili',
  el: 'greek',
  tr: 'turkish',
  it: 'italian',
  nl: 'dutch',
};

const getTranslatedString = (lang, strToReplace) => {
  let translated = "";
  if (lang) {
    const strToTranslate = strToReplace.toLowerCase().replace(/\s/g, "").trim();
    const translationEntry = globalTranslationCache[strToTranslate];
    if (translationEntry) {
      const trans = {
        en: translationEntry.english,
        hi: translationEntry.hindi,
        mr: translationEntry.marathi,
        ne: translationEntry.nepali,
        es: translationEntry.spanish,
        id: translationEntry.indonesian,
        in: translationEntry.indonesian,
        ar: translationEntry.arabic,
        pt: translationEntry.portugese,
        fr: translationEntry.french,
        vi: translationEntry.vietnamese,
        am: translationEntry.amharic,
        so: translationEntry.somali,
        om: translationEntry.oromo,
        bn: translationEntry.bengali,
        sw: translationEntry.swahili,
        el: translationEntry.greek,
        tr: translationEntry.turkish,
        nl: translationEntry.dutch,
        it: translationEntry.italian,
      };
      translated = trans[lang] || trans["en"];
    }
  }
  return translated || strToReplace;
};


function translateNotificationMessage(lang, message) {
  const patterns = [
    { pattern: /New Enquiry From User (.+?) with Enquiry ID - (\d+)./, phrase: 'New Enquiry From User {0} with Enquiry ID - {1}.' },
    { pattern: /You can download the report by clicking here/, phrase: 'You can download the report by clicking here' },
    { pattern: /You provided Invalid Location Please Try Again./, phrase: 'You provided Invalid Location Please Try Again.' },
    { pattern: /Complete Application for (\d+) today/, phrase: 'Complete Application for {0} today' },
    { pattern: /Please complete your (\d+) application/, phrase: 'Please complete your {0} application' },
    { pattern: /You must submit your (\d+) application/, phrase: 'You must submit your {0} application' },
    { pattern: /Your activity (.+?) ends today/, phrase: 'Your activity {0} ends today' },
    { pattern: /Your activity (.+?) ends tomorrow/, phrase: 'Your activity {0} ends tomorrow' },
    { pattern: /Your activity (.+?) ends day after tomorrow/, phrase: 'Your activity {0} ends day after tomorrow' },
    { pattern: /High production Alert! Farm: (.+?), Farmer: (.+?), Crop: (.+?), Total reported: (.+?) kg, Max allowed: (.+?) kg./, phrase: 'High production Alert! Farm: {0}, Farmer: {1}, Crop: {2}, Total reported: {3} kg, Max allowed: {4} kg.' },
    { pattern: /You have been requested to submit (.+?) Assessment for EUDR Due Diligence./, phrase: 'You have been requested to submit {0} Assessment for EUDR Due Diligence.' },
    { pattern: /Report is ready to download/, phrase: 'Report is ready to download' },
    { pattern: /Report generation Process is completed/, phrase: 'Report generation Process is completed' },
    { pattern: /Satellite Reports are ready for download/, phrase: 'Satellite Reports are ready for download' },
    { pattern: /You have been invited to the survey/, phrase: 'You have been invited to the survey' },
    { pattern: /You have been invited to "(.+?)"/, phrase: 'You have been invited to "{0}"' },
    { pattern: /You have been invited to  "(.+?)"/, phrase: 'You have been invited to "{0}"' },
    { pattern: /Your activity (.+?) starts today/, phrase: 'Your activity {0} starts today' },
    { pattern: /Your activity (.+?) starts tomorrow/, phrase: 'Your activity {0} starts tomorrow' },
    { pattern: /Your activity (.+?) starts day after tomorrow/, phrase: 'Your activity {0} starts day after tomorrow' },
    { pattern: /Collect soil test samples and send them to the lab/, phrase: 'Collect soil test samples and send them to the lab' },
  ];

  for (const { pattern, phrase } of patterns) {
    const match = message.match(pattern);
    if (match) {
      const key = phrase.toLowerCase().replace(/\s/g, '').trim();
      const translationEntry = globalTranslationCache[key];

      if (!translationEntry) {
        missingTranslations.push(key);
      } else {
        let translatedMessage = translationEntry[trans[lang]] || translationEntry['english'];
        match.slice(1).forEach((dynamicPart, index) => {
          translatedMessage = translatedMessage.replace(`{${index}}`, dynamicPart);
        });
        // Handle escaped quotes
        translatedMessage = translatedMessage.replace(/\\"/g, '"');
        return translatedMessage;
      }
    }
    const cacheKey = message.toLowerCase().replace(/\s/g, "").trim();
    if( globalTranslationCache[cacheKey] ) {
      return getTranslatedString(lang, message);
    }
  }

  return message; // Return the original message if no pattern matches
}

module.exports = translateNotificationMessage;