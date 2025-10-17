module.exports = (lang, strToReplace) => {
    let translated = ""; 
    if (lang) {
      const strToTranslate = strToReplace.toLowerCase().replace(/\s/g, "").trim();  
      const translationEntry = globalTranslationCache[strToTranslate]
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
          it: translationEntry.italian,
          nl: translationEntry.dutch,
        };
        translated = trans[lang] || trans["en"];
      }
    }
    return translated || strToReplace
  };