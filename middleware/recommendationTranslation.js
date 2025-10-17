const db = require(rootPath + "/models");
const _ = require("lodash");

let langObj = {
  en: "english",
  hi: "hindi",
  mr: "marathi",
  ne: "nepali",
  es: "spanish",
  id: "indonesian",
  in: "indonesian",
  ar: "arabic",
  pt: "portugese",
  fr: "french",
  vi: "vietnamese",
  am: "amharic",
  so: "somali",
  om: "oromo",
  bn: "bengali",
  sw: "swahili",
  el: "greek",
  tr: "turkish",
  nl:'dutch',
};
const getTranslatedString = (lang, strToReplace) => {
  if(lang && globalTranslationCache[strToReplace]) {
    const translated = {
      en: globalTranslationCache[strToReplace].english,
      hi: globalTranslationCache[strToReplace].hindi,
      mr: globalTranslationCache[strToReplace].marathi,
      ne: globalTranslationCache[strToReplace].nepali,
      es: globalTranslationCache[strToReplace].spanish,
      id: globalTranslationCache[strToReplace].indonesian,
      in: globalTranslationCache[strToReplace].indonesian,
      ar: globalTranslationCache[strToReplace].arabic,
      pt: globalTranslationCache[strToReplace].portugese,
      fr: globalTranslationCache[strToReplace].french,
      vi: globalTranslationCache[strToReplace].vietnamese,
      am: globalTranslationCache[strToReplace].amharic,
      so: globalTranslationCache[strToReplace].somali,
      om: globalTranslationCache[strToReplace].oromo,
      bn: globalTranslationCache[strToReplace].bengali,
      sw: globalTranslationCache[strToReplace].swahili,
      el: globalTranslationCache[strToReplace].greek,
      tr: globalTranslationCache[strToReplace].turkish,
      nl:globalTranslationCache[strToReplace].dutch
    }
    return translated[lang] || translated['en']
  } else {
    return ""
  }
}
module.exports = async function (req, res, next) {
  if (Object.keys(globalTranslationCache).length == 0) {
    let translationRes = await db.GlobalTranslation.findAll({
      attributes: ['english', 'dutch', 'hindi', 'marathi', 'nepali', 'spanish', 'indonesian', 'arabic', 'portugese', 'french', 'vietnamese', 'amharic', 'somali', 'oromo', 'bengali', 'swahili', 'turkish', 'greek'],
      raw: true
    });

    translationRes.forEach((element) => {
      let english = element.english.toLowerCase().replace(/\s/g, '').trim();
      globalTranslationCache[english] = {
        english: element.english || (globalTranslationCache[english] && globalTranslationCache[english].english) || "",
        hindi: element.hindi || (globalTranslationCache[english] && globalTranslationCache[english].hindi) || "",
        marathi: element.marathi || (globalTranslationCache[english] && globalTranslationCache[english].marathi) || "",
        nepali: element.nepali || (globalTranslationCache[english] && globalTranslationCache[english].nepali) || "",
        spanish: element.spanish || (globalTranslationCache[english] && globalTranslationCache[english].spanish) || "",
        indonesian: element.indonesian || (globalTranslationCache[english] && globalTranslationCache[english].indonesian) || "",
        arabic: element.arabic || (globalTranslationCache[english] && globalTranslationCache[english].arabic) || "",
        portugese: element.portugese || (globalTranslationCache[english] && globalTranslationCache[english].portugese) || "",
        french: element.french || (globalTranslationCache[english] && globalTranslationCache[english].french) || "",
        amharic: element.amharic || (globalTranslationCache[english] && globalTranslationCache[english].amharic) || "",
        somali: element.somali || (globalTranslationCache[english] && globalTranslationCache[english].somali) || "",
        oromo: element.oromo || (globalTranslationCache[english] && globalTranslationCache[english].oromo) || "",
        vietnamese: element.vietnamese || (globalTranslationCache[english] && globalTranslationCache[english].vietnamese) || "",
        bengali: element.bengali || (globalTranslationCache[english] && globalTranslationCache[english].bengali) || "",
        swahili: element.swahili || (globalTranslationCache[english] && globalTranslationCache[english].swahili) || "",
        turkish: element.turkish || (globalTranslationCache[english] && globalTranslationCache[english].turkish) || "",
        greek: element.greek || (globalTranslationCache[english] && globalTranslationCache[english].greek) || "",
        dutch: element.dutch || (globalTranslationCache[english] && globalTranslationCache[english].dutch) || ""
      };
    });
  }
  req.translateRecommendation = async (dBName, lang, where) => {
    const language = langObj[lang];
    let result;
    if (dBName === "SpecialOperationRecommendation") {
      result = await db[dBName].findOne({
        attributes: {
          exclude: ["id", "updatedAt", "createdAt"],
        },
        where,
      });
      result = {
        cropTypeId: result?.cropTypeId,
        practiceId: result?.practiceId,
        periodSummary: result ? result[language] || result?.periodSummary : null,
      };
    } else if (dBName === "CropRecommendation") {
      result = await db[dBName].findOne({
        attributes: {
          exclude: ["id", "updatedAt", "createdAt"],
        },
        where,
      });
      result = {
        moduleNum: result?.moduleNum,
        attributeNum: result?.attributeNum,
        recommendation: result ? result[language] || result?.recommendation : null,
      };
    } else if (dBName === "CropRecommendationModuleAttribute") {
      const { moduleId, cropTypeId } = where;
      result = await db[dBName].findAll({
        attributes: {
          exclude: ["deletedAt", "createdAt", "updatedAt", "ddName"],
        },
        where: { moduleId },
        include: [
          {
            model: db.CropRecommendation,
            as: "cropRecommendation",
            attributes: [],
            where: {
              cropTypeId: cropTypeId,
            },
            required: true,
          },
        ],
        group: ["id"], 
        distinct: true,
        order: [["name", "ASC"]],
      });

      const scaleResult = await db[dBName].findAll({
        attributes: {
          exclude: ["deletedAt", "createdAt", "updatedAt", "ddName"],
        },
        where: { moduleId },
        include: [
          {
            model: db.ScaleRecommendation,
            as: "scaleRecommendation",
            attributes: [],
            where: {
              cropTypeId: cropTypeId,
              moduleId: moduleId,
            },
            required: true,
          },
        ],
        group: ["id"], 
        distinct: true,
        order: [["name", "ASC"]],
      });

      result = _.concat(result, scaleResult);

      result = result.map((item) => {
        return {
          id: item?.id,
          moduleId: item?.moduleId,
          name: item ? item[language] || item?.name : null,
          type: item?.type,
          category: item?.category,
          dataIndex: item?.dataIndex,
          attributeNum: item?.attributeNum,
          moduleNum: item?.moduleNum,
        };
      });
    } else if (dBName === "options") {
      let pestList = [];
      let diseaseList = [];
      let pestAndDiseaseDropDowns =
        await db.PestAndDiseaseRecommendation.findAll({
          attributes: ["id"],
          include: [
            {
              model: db.CropObservationPestInfestation,
              as: "pests",
            },
            {
              model: db.CropObservationDisease,
              as: "diseases",
            },
          ],
          where,
        });

      pestList = pestAndDiseaseDropDowns.map((p) => {
        if (p.pests) {
          return p.pests;
        }
      });
      diseaseList = pestAndDiseaseDropDowns.map((p) => {
        if (p.diseases) {
          return p.diseases;
        }
      });
      pestList = _.uniqBy(pestList, "id");
      diseaseList = _.uniqBy(diseaseList, "id");

      pestList = pestList
        .filter((p) => p)
        .filter((p) => p.name.toLowerCase() !== "see dd here");
      diseaseList = diseaseList
        .filter((p) => p)
        .filter((p) => p.name.toLowerCase() !== "see dd here");

      pestList = pestList.map((item) => {
        return {
          id: item.id,
          name: item ? item[language] || item.name : null,
        };
      }).filter(item => item.name);

      diseaseList = diseaseList.map((item) => {
        return {
          id: item.id,
          name: item ? item[language] || item.name : null,
        };
      }).filter(item => item.name);

      result = { pestList, diseaseList };
    } else if (dBName === "CropObservationSpecialOperationPractice") {
      result = await db[dBName].findAll({ where });
      result = result.map((item) => {
        return {
          id: item?.id,
          cropTypeId: item?.cropTypeId,
          practice: item ? item[language] || item?.practice : null,
        };
      }).filter(item => item.practice);;
    } else {
      result = element?.dataValues || element 
      for(let key in element) {
        if(key == 'codeName') {
          continue;
        }
        if(element[key]) {
          const name = element[key].toString().toLowerCase().replace(/\s/g, '').trim();
          if (globalTranslationCache[name]) {
            element[key] = getTranslatedString(lang, name)
          }
        }
      }
    }

    return result;
  };
  req.simpleTranslate = (text) => {
    const { lang = "en" } = req.headers;
    let translated = "";
    if(text) {
      let sanitizedName = text.toLowerCase().replace(/\s/g, '').trim();
      translated = getTranslatedString(lang, sanitizedName);
    }
    
    return translated || text;
  }
  next();
};
