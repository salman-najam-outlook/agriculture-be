const e = require("express");

const db = require(rootPath + "/models");
const translateNotificationMessage = require("../helpers/translateNotifications");
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

const translateCustomFields = (customFields, element, lang) => {
  customFields.forEach((field) => {
    let name;
    if (!isNaN(Number(element[field]?.name))) {
      return;
    }

    if (element[field]?.name) {
      name = element[field]?.name.toLowerCase().replace(/\s/g, "").trim();
    }

    if (name && globalTranslationCache[name]) {
      element[field].name = getTranslatedString(lang, name);
    }
  });
};

const translateCustomFieldsLvlOne = (customFields, element, lang) => {
  customFields.forEach((field) => {
    let name;
    if (!isNaN(Number(element[field]))) {
      return;
    }
    if (element[field]) {
      name = element[field].toLowerCase().replace(/\s/g, "").trim();
    }

    if (name && globalTranslationCache[name]) {
      element[field] = getTranslatedString(lang, name);
    }
  });
};

const translateLevel1 = (moduleName, element, lang) => {
  switch (moduleName) {
    case "sideBar":
      {
        const moduleName = element?.name
          ?.toLowerCase()
          .replace(/\s/g, "")
          .trim();
        if (moduleName && globalTranslationCache[moduleName]) {
          element.name = getTranslatedString(lang, moduleName);
        }
      }
      break;
    case "observation/deficiencies":
      {
        const moduleName = element?.name
          ?.toLowerCase()
          .replace(/\s/g, "")
          .trim();
        if (moduleName && globalTranslationCache[moduleName]) {
          element.name = getTranslatedString(lang, moduleName);
        }
      }
      break;
    case "observation/diseases":
      {
        const moduleName = element?.name
          ?.toLowerCase()
          .replace(/\s/g, "")
          .trim();
        if (moduleName && globalTranslationCache[moduleName]) {
          element.name = getTranslatedString(lang, moduleName);
        }
      }
      break;
    case "modules":
      const moduleName = element?.name?.toLowerCase().replace(/\s/g, "").trim();
      if (moduleName && globalTranslationCache[moduleName]) {
        element.name = getTranslatedString(lang, moduleName);
      }
      break;

    case "user/goal":
      const customFieldsForUserGoal = ["cropType"];
      translateCustomFields(customFieldsForUserGoal, element, lang);
      break;

    case "coffee/plantations":
      const customFieldsForPlantation = [
        "commodity",
        "coffeeVariety",
        "coffeeSpecies",
        "productType",
      ];
      translateCustomFields(customFieldsForPlantation, element, lang);
      break;

    case "cacao/purchase":
      const customFieldsForPurchase = [
        "cacaoVariety",
        "cacaoSpecies",
        "cacaoPlantations",
        "cacaoDeliveryMethods",
      ];
      translateCustomFields(customFieldsForPurchase, element, lang);
      break;

    case "coffee/dryMilling/parchmentCoffee":
      const customFieldsForParchmentCoffee = ["status"];
      translateCustomFieldsLvlOne(
        customFieldsForParchmentCoffee,
        element,
        lang
      );
      break;

    case "harvesting/method":
      const title = element.title?.toLowerCase().replace(/\s/g, "").trim();
      if (title && globalTranslationCache[title]) {
        element.title = getTranslatedString(lang, title);
      }
      break;

    case "equipments":
      const customFieldsForEquipment = [
        "fuelType",
        "loanStatus",
        "equipmentType",
      ];
      translateCustomFields(customFieldsForEquipment, element, lang);
      break;

    // case 'observation/deficiencies':
    //   const customFieldsForDeficiencies = ["element", "name"];
    //   translateCustomFields(customFieldsForDeficiencies, element, lang)
    //   break;

    case "irrigation":
      const customFieldsForIrrigation = ["waterSource"];
      translateCustomFields(customFieldsForIrrigation, element, lang);
      break;

    case "unit":
      const unitName = element.name?.toLowerCase().replace(/\s/g, "").trim();
      if (unitName && globalTranslationCache[unitName]) {
        element.name = getTranslatedString(lang, unitName);
      }
      const unitAbbvr = element.abbvr?.toLowerCase().trim();
      if (unitAbbvr && globalTranslationCache[unitAbbvr]) {
        element.abbvr = getTranslatedString(lang, unitAbbvr);
      }
      break;
    case "unit/user":
      const unitNameUser = element.name
        ?.toLowerCase()
        .replace(/\s/g, "")
        .trim();
      if (unitNameUser && globalTranslationCache[unitNameUser]) {
        element.name = getTranslatedString(lang, unitNameUser);
      }
      const unitAbbvrUser = element.abbvr?.toLowerCase().trim();
      if (unitAbbvrUser && globalTranslationCache[unitAbbvrUser]) {
        element.abbvr = getTranslatedString(lang, unitAbbvrUser);
      }
      break;
    case "user/profile": {
      console.log(element);
      const name = element.name?.toLowerCase().replace(/\s/g, "").trim();
      if (name && globalTranslationCache[name]) {
        element.name = getTranslatedString(lang, name);
      }
      const membership_type = element.membership_type?.toLowerCase().trim();
      if (membership_type && globalTranslationCache[membership_type]) {
        element.membership_type = getTranslatedString(lang, membership_type);
      }
      break;
    }
    case "user/notification": {
        element.title = getTranslatedString(lang, element.title);
        element.message =  translateNotificationMessage(lang, element.message);
      break;
    }
    default:
      // const name = element.name?.toLowerCase().replace(/\s/g, '').trim();
      // if (name && globalTranslationCache[name]) {
      //   element.name = getTranslatedString(lang, name)
      // }
      element = element?.dataValues || element;
      for (let key in element) {
        // skip
        if (key == "codeName") {
          continue;
        }
        // skip
        if (key == "id") {
          continue;
        }
        if (!isNaN(Number(element[key]))) {
          continue;
        }
        if (element[key]) {
          const name = element[key]
            .toString()
            .toLowerCase()
            .replace(/\s/g, "")
            .trim();
          if (globalTranslationCache[name]) {
            element[key] = getTranslatedString(lang, name);
          }
        }
        if (element[key]?.name) {
          const name = element[key].name
            .toString()
            .toLowerCase()
            .replace(/\s/g, "")
            .trim();
          if (globalTranslationCache[name]) {
            element[key].name = getTranslatedString(lang, name);
          }
        }
      }
      break;
    }
};

module.exports = async function (req, res, next) {
  endPoint = req.baseUrl;
  httpMethod = req.method;
  if (Object.keys(globalTranslationCache).length == 0) {
    let translationRes = await db.GlobalTranslation.findAll({
      attributes: [
        "english",
        "hindi",
        "marathi",
        "nepali",
        "spanish",
        "indonesian",
        "arabic",
        "portugese",
        "french",
        "vietnamese",
        "amharic",
        "somali",
        "oromo",
        "bengali",
        "swahili",
        "turkish",
        "greek",
        "dutch",
        "italian",
      ],
      raw: true,
    });

    translationRes.forEach((element) => {
      let english = element.english?.toLowerCase().replace(/\s/g, "").trim();
      globalTranslationCache[english] = {
        english:
          element.english ||
          (globalTranslationCache[english] &&
            globalTranslationCache[english].english) ||
          "",
        hindi:
          element.hindi ||
          (globalTranslationCache[english] &&
            globalTranslationCache[english].hindi) ||
          "",
        marathi:
          element.marathi ||
          (globalTranslationCache[english] &&
            globalTranslationCache[english].marathi) ||
          "",
        nepali:
          element.nepali ||
          (globalTranslationCache[english] &&
            globalTranslationCache[english].nepali) ||
          "",
        spanish:
          element.spanish ||
          (globalTranslationCache[english] &&
            globalTranslationCache[english].spanish) ||
          "",
        indonesian:
          element.indonesian ||
          (globalTranslationCache[english] &&
            globalTranslationCache[english].indonesian) ||
          "",
        arabic:
          element.arabic ||
          (globalTranslationCache[english] &&
            globalTranslationCache[english].arabic) ||
          "",
        portugese:
          element.portugese ||
          (globalTranslationCache[english] &&
            globalTranslationCache[english].portugese) ||
          "",
        french:
          element.french ||
          (globalTranslationCache[english] &&
            globalTranslationCache[english].french) ||
          "",
        amharic:
          element.amharic ||
          (globalTranslationCache[english] &&
            globalTranslationCache[english].amharic) ||
          "",
        somali:
          element.somali ||
          (globalTranslationCache[english] &&
            globalTranslationCache[english].somali) ||
          "",
        oromo:
          element.oromo ||
          (globalTranslationCache[english] &&
            globalTranslationCache[english].oromo) ||
          "",
        vietnamese:
          element.vietnamese ||
          (globalTranslationCache[english] &&
            globalTranslationCache[english].vietnamese) ||
          "",
        bengali:
          element.bengali ||
          (globalTranslationCache[english] &&
            globalTranslationCache[english].bengali) ||
          "",
        swahili:
          element.swahili ||
          (globalTranslationCache[english] &&
            globalTranslationCache[english].swahili) ||
          "",
        turkish:
          element.turkish ||
          (globalTranslationCache[english] &&
            globalTranslationCache[english].turkish) ||
          "",
        greek:
          element.greek ||
          (globalTranslationCache[english] &&
            globalTranslationCache[english].greek) ||
          "",
        dutch:
          element.dutch ||
          (globalTranslationCache[english] &&
            globalTranslationCache[english].dutch) ||
          "",
        italian:
          element.italian ||
          (globalTranslationCache[english] &&
            globalTranslationCache[english].italian) ||
          "",
      };
    });
  }

  req.translateFunction = (arrayOfObjs, globalCache, config) => {
    const { lang = "en" } = req.headers;
    const {  moduleName } = config;

    let originalObject = arrayOfObjs;

    if (moduleName == "unit/user") {
      arrayOfObjs = Object.values(arrayOfObjs);
    }
    const isArray = config.isArray || Array.isArray(arrayOfObjs);
    // if(typeof arrayOfObjs == 'object' && !isArray && !config.lvl2) {
    //   let tmpObj = JSON.parse(JSON.stringify(arrayOfObjs))
    //   for(let key in tmpObj) {
    //     if(typeof tmpObj[key] == "string") {
    //       let sanitizedName = tmpObj[key]?.toLowerCase().replace(/\s/g, '').trim();

    //       if (sanitizedName && globalCache[sanitizedName]) {
    //         tmpObj[key] =  getTranslatedString(lang, sanitizedName)
    //       }

    //     }
    //   }
    //   return tmpObj
    // }

    if (moduleName === "error" || moduleName === "success") {
      // incase of error || success message arrayOfObjs will always be { msg: '' }
      // with config lvl1 only
      let sanitizedName = arrayOfObjs?.msg
        ?.toLowerCase()
        .replace(/\s/g, "")
        .trim();
      if (sanitizedName && globalCache[sanitizedName]) {
        if (lang) {
          arrayOfObjs.msg = getTranslatedString(lang, sanitizedName);
        } else {
          return arrayOfObjs;
        }
      }
      return arrayOfObjs;
    }

    if (isArray) {
      for (let i = 0; i < arrayOfObjs.length; i++) {
        let element = arrayOfObjs[i];
        if (config.lvl1) {
          translateLevel1(moduleName, element, lang);
        }

        if (config.lvl2) {
          //Second Level
          for (let item in element) {
            if (Array.isArray(element[item])) {
              element[item].forEach((subItem) => {
                if (subItem["name"]) {
                  let sanitizedName = subItem["name"]
                    .toLowerCase()
                    .replace(/\s/g, "")
                    .trim();

                  if (globalCache[sanitizedName]) {
                    subItem["name"] = getTranslatedString(lang, sanitizedName);
                  }
                }
                if (subItem["abbvr"]) {
                  let sanitizedAbbvr = subItem["abbvr"].toLowerCase().trim();

                  if (globalCache[sanitizedAbbvr]) {
                    subItem["abbvr"] = getTranslatedString(
                      lang,
                      sanitizedAbbvr
                    );
                  }
                }
                if (config.lvl3 && moduleName === "adminModulePermissions") {
                  subItem?.["role_modules_permissions"]?.forEach((item) => {
                    let sanitizedName = item.dataValues.permission_name
                      .toLowerCase()
                      .replace(/\s/g, "")
                      .trim();

                    if (globalCache[sanitizedName]) {
                      item.dataValues.permission_name = getTranslatedString(
                        lang,
                        sanitizedName
                      );
                    }
                  });
                }
              });
            } else {
              if (moduleName && moduleName === "adminMembership") {
                let arrOfObjsFields = ["userRoleMembershipMap"];
                arrOfObjsFields.forEach((arr) => {
                  element[arr].forEach((obj) => {
                    let sanitizedName =
                      obj.user_role?.name &&
                      obj.user_role?.name
                        .toLowerCase()
                        .replace(/\s/g, "")
                        .trim();
                    if (globalCache[sanitizedName]) {
                      obj.user_role.name = getTranslatedString(
                        lang,
                        sanitizedName
                      );
                    }
                  });
                });
              } else if (
                moduleName &&
                moduleName == "observation/growthstages"
              ) {
                let singleObjFields = ["cropObservation_cropType"];

                singleObjFields.forEach((field) => {
                  if (element[item]) {
                    for (let subItem in element[item][field]) {
                      if (element[item][field]?.name) {
                        let sanitizedName = element[item][field]?.name
                          .toLowerCase()
                          .replace(/\s/g, "")
                          .trim();

                        if (globalCache[sanitizedName]) {
                          element[item][field].name = getTranslatedString(
                            lang,
                            sanitizedName
                          );
                        }
                      }
                    }
                  }
                });
              } else if (moduleName && moduleName == "settings/general") {
                let arrOfObjsFields = ["units"];
                arrOfObjsFields.forEach((arr) => {
                  element[arr].forEach((obj) => {
                    if (
                      obj.activity_equipment_name &&
                      Array.isArray(obj.activity_equipment_name)
                    ) {
                      obj.activity_equipment_name.forEach((en) => {
                        let sanitizedName =
                          en.name &&
                          en.name.toLowerCase().replace(/\s/g, "").trim();

                        if (globalCache[sanitizedName]) {
                          en.name = getTranslatedString(lang, sanitizedName);
                        }
                      });
                    } else {
                      let sanitizedName =
                        obj.name &&
                        obj.name.toLowerCase().replace(/\s/g, "").trim();

                      if (globalCache[sanitizedName]) {
                        obj.name = getTranslatedString(lang, sanitizedName);
                      }
                    }
                  });
                });
              } else if (moduleName && moduleName == "equipment/categories") {
                let arrOfObjsFields = ["equipment_category_activity"];
                arrOfObjsFields.forEach((arr) => {
                  element[arr].forEach((obj) => {
                    if (
                      obj.activity_equipment_name &&
                      Array.isArray(obj.activity_equipment_name)
                    ) {
                      obj.activity_equipment_name.forEach((en) => {
                        let sanitizedName =
                          en.name &&
                          en.name.toLowerCase().replace(/\s/g, "").trim();

                        if (globalCache[sanitizedName]) {
                          en.name = getTranslatedString(lang, sanitizedName);
                        }
                      });
                    } else {
                      let sanitizedName =
                        obj.name &&
                        obj.name.toLowerCase().replace(/\s/g, "").trim();

                      if (globalCache[sanitizedName]) {
                        obj.name = getTranslatedString(lang, sanitizedName);
                      }
                    }
                  });
                });
              } else if (moduleName && moduleName == "user/goal") {
                let arrOfObjsFields = ["cropVariety"];
                arrOfObjsFields.forEach((arr) => {
                  element[arr].forEach((obj) => {
                    let sanitizedName =
                      obj.name &&
                      obj.name.toLowerCase().replace(/\s/g, "").trim();

                    if (globalCache[sanitizedName]) {
                      obj.name = getTranslatedString(lang, sanitizedName);
                    }
                  });
                });
              } else if (moduleName && moduleName == "crop/storage") {
                let singleObjFields = [
                  "cropStorage_method",
                  "cropStorage_type",
                  "crop_storage_cropType",
                ];

                singleObjFields.forEach((field) => {
                  if (element[item]) {
                    for (let subItem in element[item][field]) {
                      if (element[item][field]?.name) {
                        let sanitizedName = element[item][field]?.name
                          .toLowerCase()
                          .replace(/\s/g, "")
                          .trim();

                        if (globalCache[sanitizedName]) {
                          element[item][field].name = getTranslatedString(
                            lang,
                            sanitizedName
                          );
                        }
                      }
                    }
                  }
                });
              } else if (moduleName && moduleName == "weed") {
                let arrOfObjsFields = [
                  "segments",
                  "weed_variety",
                  "weed_data_type",
                  "weed_data_stage",
                  "weed_data_manual_method",
                ];

                let singleObjFields = [
                  "weed_cropType",
                  "weed_method",
                  "weed_area_unit_id",
                ];
                let arrOfArrOfObjsFields = ["weedingHerbicideInputs"];
                arrOfArrOfObjsFields?.forEach((arr) => {
                  element[arr]?.forEach((obj) => {
                    let applicationMethod =
                      obj?.input?.applicationMethod?.name &&
                      obj?.input?.applicationMethod?.name
                        ?.toLowerCase()
                        .replace(/\s/g, "")
                        .trim();
                    let herbicideQuantityUnit =
                      obj?.input?.herbicideQuantityUnit?.name &&
                      obj?.input?.herbicideQuantityUnit?.name
                        ?.toLowerCase()
                        .replace(/\s/g, "")
                        .trim();
                    let herbicideQuantityUnitAbbvr =
                      obj?.input?.herbicideQuantityUnit?.abbvr &&
                      obj?.input?.herbicideQuantityUnit?.abbvr
                        ?.toLowerCase()
                        .replace(/\s/g, "")
                        .trim();

                    let herbicideRateUnit =
                      obj?.input?.herbicideRateUnit?.name &&
                      obj?.input?.herbicideRateUnit?.name
                        ?.toLowerCase()
                        .replace(/\s/g, "")
                        .trim();

                    let herbicideRateUnitAbbvr =
                      obj?.input?.herbicideRateUnit?.abbvr &&
                      obj?.input?.herbicideRateUnit?.abbvr
                        ?.toLowerCase()
                        .replace(/\s/g, "")
                        .trim();

                    obj?.input?.mixtures?.forEach((mixObj) => {
                      let quantityUnit =
                        mixObj?.quantityUnit?.name &&
                        mixObj?.quantityUnit?.name
                          ?.toLowerCase()
                          .replace(/\s/g, "")
                          .trim();
                      if (globalCache[quantityUnit]) {
                        mixObj.quantityUnit.name = getTranslatedString(
                          lang,
                          quantityUnit
                        );
                      }
                      let quantityUnitAbbvr =
                        mixObj?.quantityUnit?.abbvr &&
                        mixObj?.quantityUnit?.abbvr
                          ?.toLowerCase()
                          .replace(/\s/g, "")
                          .trim();
                      if (globalCache[quantityUnitAbbvr]) {
                        mixObj.quantityUnit.abbvr = getTranslatedString(
                          lang,
                          quantityUnitAbbvr
                        );
                      }
                    });

                    if (globalCache[applicationMethod]) {
                      obj.input.applicationMethod.name = getTranslatedString(
                        lang,
                        applicationMethod
                      );
                    }
                    if (globalCache[herbicideQuantityUnit]) {
                      obj.input.herbicideQuantityUnit.name =
                        getTranslatedString(lang, herbicideQuantityUnit);
                    }
                    if (globalCache[herbicideQuantityUnitAbbvr]) {
                      obj.input.herbicideQuantityUnit.abbvr =
                        getTranslatedString(lang, herbicideQuantityUnit);
                    }
                    if (globalCache[herbicideRateUnit]) {
                      obj.input.herbicideRateUnit.name = getTranslatedString(
                        lang,
                        herbicideRateUnit
                      );
                    }
                    if (globalCache[herbicideRateUnitAbbvr]) {
                      obj.input.herbicideRateUnit.abbvr = getTranslatedString(
                        lang,
                        herbicideRateUnit
                      );
                    }
                  });
                });
                arrOfObjsFields.forEach((arr) => {
                  element[arr].forEach((obj) => {
                    let sanitizedName =
                      obj.name &&
                      obj.name.toLowerCase().replace(/\s/g, "").trim();

                    if (globalCache[sanitizedName]) {
                      obj.name = getTranslatedString(lang, sanitizedName);
                    }
                  });
                });

                singleObjFields.forEach((field) => {
                  if (element[item]) {
                    for (let subItem in element[item][field]) {
                      let sanitizedName = "";
                      if (element[item][field]?.name) {
                        sanitizedName = element[item][field]?.name
                          .toLowerCase()
                          .replace(/\s/g, "")
                          .trim();
                      }
                      let sanitizedAbbvr = "";

                      if (element[item][field]?.abbvr) {
                        sanitizedAbbvr = element[item][field]?.abbvr
                          .toLowerCase()
                          .replace(/\s/g, "")
                          .trim();
                      }

                      if (globalCache[sanitizedName]) {
                        element[item][field].name = getTranslatedString(
                          lang,
                          sanitizedName
                        );
                      }
                      if (globalCache[sanitizedAbbvr]) {
                        element[item][field].abbvr = getTranslatedString(
                          lang,
                          sanitizedAbbvr
                        );
                      }
                    }
                  }
                });
              } else if (moduleName && moduleName == "crop/observation") {
                let arrOfObjsFields = [
                  "cropObservation_diseases",
                  "cropObservation_deficiency",
                  "cropObservation_pestInfestation",
                  "cropObservation_toxicity",
                ];

                let singleObjFields = [
                  "cropObservation_cropType",
                  "cropObservation_cropSeason",
                  "cropObservation_growthStage",
                  "cropObservation_leafSize",
                  "cropObservation_jointType",
                ];
                arrOfObjsFields.forEach((arr) => {
                  element[arr].forEach((obj) => {
                    let sanitizedName =
                      obj.name &&
                      obj.name.toLowerCase().replace(/\s/g, "").trim();

                    if (globalCache[sanitizedName]) {
                      obj.name = getTranslatedString(lang, sanitizedName);
                    }
                  });
                });

                singleObjFields.forEach((field) => {
                  if (element[item]) {
                    for (let subItem in element[item][field]) {
                      if (element[item][field]?.name) {
                        let sanitizedName = element[item][field]?.name
                          .toLowerCase()
                          .replace(/\s/g, "")
                          .trim();

                        if (globalCache[sanitizedName]) {
                          element[item][field].name = getTranslatedString(
                            lang,
                            sanitizedName
                          );
                        }
                      }
                    }
                  }
                });
              } else if (moduleName && moduleName == "soil/management/list") {
                let arrOfObjsFields = [
                  "soil_type",
                  "input_type",
                  "liming_material",
                  "organic_inputs",
                  "synthetic_fertilizers",
                  "synthetic_application_method",
                  "organic_application_method",
                  "soil_application_method",
                ];

                let singleObjFields = [
                  "soil_application_stage",
                  "crop_type",
                  "liming_application_frequency",
                  "area_units",
                  "nitrogen_units",
                  "sulfur_units",
                  "potassium_units",
                  "phosphorus_units",
                  "total_lime_applied_units",
                  "liming_rate_units",
                  "organic_inputs_application_rate_unit",
                  "synthetic_fertilizer_application_rate_unit",
                  "total_synthetic_fertilizer_used_unit",
                  "total_organic_input_applied_unit",
                  "organic_inputs_application_frequency",
                ];
                arrOfObjsFields.forEach((arr) => {
                  element[arr].forEach((obj) => {
                    let sanitizedName =
                      obj.name &&
                      obj.name.toLowerCase().replace(/\s/g, "").trim();

                    if (globalCache[sanitizedName]) {
                      obj.name = getTranslatedString(lang, sanitizedName);
                    }
                  });
                });

                singleObjFields.forEach((field) => {
                  if (element[item]) {
                    for (let subItem in element[item][field]) {
                      if (element[item][field]?.name) {
                        let sanitizedName = element[item][field]?.name
                          .toLowerCase()
                          .replace(/\s/g, "")
                          .trim();
                        let sanitizedAbbvr;
                        if (element[item][field]?.abbvr) {
                          sanitizedAbbvr = element[item][field]?.abbvr
                            .toLowerCase()
                            .replace(/\s/g, "")
                            .trim();
                        }

                        if (globalCache[sanitizedName]) {
                          element[item][field].name = getTranslatedString(
                            lang,
                            sanitizedName
                          );
                        }
                        if (globalCache[sanitizedAbbvr]) {
                          element[item][field].abbvr = getTranslatedString(
                            lang,
                            sanitizedAbbvr
                          );
                        }
                      }
                    }
                  }
                });
              } else if (moduleName && moduleName == "harvesting") {
                let singleObjFields = [
                  "method_for_harvesting",
                  "harvest_reason_for_loss",
                  "harvest_total_fresh_yield_unit_id",
                  "harvest_total_dry_yield_unit_id",
                  "harvest_total_planned_fresh_yield_unit_id",
                  "harvest_total_planned_dry_yield_unit_id",
                  "harvest_yield_for_sale_unit_id",
                  "harvest_cropType",
                  "harvest_area_unit_id",
                ];
                singleObjFields.forEach((field) => {
                  if (element[item]) {
                    if (field != "method_for_harvesting") {
                      for (let subItem in element[item][field]) {
                        let sanitizedAbbvr;
                        let sanitizedName;
                        if (element[item][field]?.name) {
                          sanitizedName = element[item][field]?.name
                            .toLowerCase()
                            .replace(/\s/g, "")
                            .trim();
                        }
                        if (element[item][field]?.abbvr) {
                          sanitizedAbbvr = element[item][field]?.abbvr
                            .toLowerCase()
                            .replace(/\s/g, "")
                            .trim();
                        }

                        if (globalCache[sanitizedName]) {
                          element[item][field].name = getTranslatedString(
                            lang,
                            sanitizedName
                          );
                        }
                        if (globalCache[sanitizedAbbvr]) {
                          element[item][field].abbvr = getTranslatedString(
                            lang,
                            sanitizedAbbvr
                          );
                        }
                      }
                    } else {
                      let sanitizedTitle = element[item][field]?.title
                        .toLowerCase()
                        .replace(/\s/g, "")
                        .trim();

                      if (globalCache[sanitizedTitle]) {
                        element[item][field].title = getTranslatedString(
                          lang,
                          sanitizedTitle
                        );
                      }

                      element[item][field]?.harvest_method_type.forEach(
                        (method) => {
                          let sanitizedMethod = method?.name
                            .toLowerCase()
                            .replace(/\s/g, "")
                            .trim();

                          if (globalCache[sanitizedMethod]) {
                            method.name = getTranslatedString(
                              lang,
                              sanitizedMethod
                            );
                          }
                        }
                      );
                    }
                  }
                });
              } else if (moduleName && moduleName == "irrigation") {
                let customFields = [
                  "water_source",
                  "irrigation_waterSource",
                  "irrigation_schedule",
                  "irrigation_waterSourceOrigin",
                  "irrigation_stage",
                  "irrigation_type",
                  "irrigation_cropType",
                ];
                customFields.forEach((field) => {
                  if (element[item]) {
                    for (let subItem in element[item][field]) {
                      if (element[item][field]?.name) {
                        let sanitizedName = element[item][field].name
                          .toLowerCase()
                          .replace(/\s/g, "")
                          .trim();

                        if (globalCache[sanitizedName]) {
                          element[item][field].name = getTranslatedString(
                            lang,
                            sanitizedName
                          );
                        }
                      }
                    }
                  }
                });
              } else if (moduleName && moduleName == "sowing") {
                let customFields = [
                  "Option",
                  "areaunit",
                  "seedingunit",
                  "rowspacing",
                  "inrowspacing",
                  "depthspacing",
                ];
                customFields.forEach((field) => {
                  if (element[item]) {
                    for (let subItem in element[item][field]) {
                      if (field == "Option") {
                        if (element[item][field]?.name) {
                          let sanitizedName = element[item][field].name
                            .toLowerCase()
                            .replace(/\s/g, "")
                            .trim();

                          if (globalCache[sanitizedName]) {
                            element[item][field].name = getTranslatedString(
                              lang,
                              sanitizedName
                            );
                          }
                        }
                      } else {
                        if (element[item][field]?.name) {
                          let sanitizedName = element[item][field].name
                            .toLowerCase()
                            .replace(/\s/g, "")
                            .trim();
                          let sanitizedAbbvr = element[item][field].abbvr
                            .toLowerCase()
                            .replace(/\s/g, "")
                            .trim();

                          if (globalCache[sanitizedName]) {
                            element[item][field].name = getTranslatedString(
                              lang,
                              sanitizedName
                            );
                          }
                          if (globalCache[sanitizedAbbvr]) {
                            element[item][field].abbvr = getTranslatedString(
                              lang,
                              sanitizedAbbvr
                            );
                          }
                        }
                      }
                    }
                  }
                });
              } else if (moduleName && moduleName == "equipments") {
                let customFields = [
                  "equipment_mode_of_operation",
                  "equipment_category",
                  "equipment_activity",
                  "fuel_type",
                  "loan_status",
                  "equipment_type",
                  "equipment_name",
                ];
                customFields.forEach((field) => {
                  if (element[item]) {
                    for (let subItem in element[item][field]) {
                      if (element[item][field]?.name) {
                        let sanitizedName = element[item][field].name
                          .toLowerCase()
                          .replace(/\s/g, "")
                          .trim();

                        if (globalCache[sanitizedName]) {
                          element[item][field].name = getTranslatedString(
                            lang,
                            sanitizedName
                          );
                        }
                      }
                    }
                  }
                });
              } else if (moduleName && moduleName == "practice") {
                let customFields = ["Option", "areaunit", "Soil_prep_activity"];
                customFields.forEach((field) => {
                  if (element[item]) {
                    for (let subItem in element[item][field]) {
                      if (field == "areaunit") {
                        if (element[item][field]?.field) {
                          let sanitizedName = element[item][field].field
                            .toLowerCase()
                            .replace(/\s/g, "")
                            .trim();

                          if (globalCache[sanitizedName]) {
                            element[item][field].name = getTranslatedString(
                              lang,
                              sanitizedName
                            );
                          }
                        }
                      } else {
                        if (element[item][field]?.name) {
                          let sanitizedName = element[item][field].name
                            .toLowerCase()
                            .replace(/\s/g, "")
                            .trim();

                          if (globalCache[sanitizedName]) {
                            element[item][field].name = getTranslatedString(
                              lang,
                              sanitizedName
                            );
                          }
                        }
                      }
                    }
                  }
                });

                // translate SoilTypes
                for (let subOptionItem in element[item]?.SoilTypes) {
                  if (element[item]?.SoilTypes[subOptionItem]?.name) {
                    let sanitizedName = element[item].SoilTypes[
                      subOptionItem
                    ].name
                      .toLowerCase()
                      .replace(/\s/g, "")
                      .trim();

                    if (globalCache[sanitizedName]) {
                      element[item].SoilTypes[subOptionItem].name =
                        getTranslatedString(lang, sanitizedName);
                    }
                  }
                }
              } else if (moduleName && moduleName == "audit/soil") {
                for (let subItem in element[item]) {
                  // translate limingSchedules and soilTestingOften
                  let sanitizedLimingName = element[item]?.limingSchedules?.name
                    .toLowerCase()
                    .replace(/\s/g, "")
                    .trim();
                  let sanitizedSoiltestName = element[
                    item
                  ]?.soilTestingOften?.name
                    .toLowerCase()
                    .replace(/\s/g, "")
                    .trim();

                  if (globalCache[sanitizedLimingName]) {
                    element[item].limingSchedules.name = getTranslatedString(
                      lang,
                      sanitizedLimingName
                    );
                  }
                  if (globalCache[sanitizedSoiltestName]) {
                    element[item].soilTestingOften.name = getTranslatedString(
                      lang,
                      sanitizedSoiltestName
                    );
                  }

                  // translate Options
                  for (let subOptionItem in element[item]?.Options) {
                    if (element[item]?.Options[subOptionItem]?.name) {
                      let sanitizedName = element[item].Options[
                        subOptionItem
                      ].name
                        .toLowerCase()
                        .replace(/\s/g, "")
                        .trim();

                      if (globalCache[sanitizedName]) {
                        element[item].Options[subOptionItem].name =
                          getTranslatedString(lang, sanitizedName);
                      }
                    }
                  }
                }
              } else if (moduleName && moduleName == "pest") {
                for (let subItem in element[item]) {
                  let cropName = element[item]?.pest?.cropName
                    ?.toLowerCase()
                    ?.replace(/\s/g, "")
                    ?.trim();
                  let pest = element[item]?.pest?.name
                    ?.toLowerCase()
                    ?.replace(/\s/g, "")
                    ?.trim();

                  if (globalCache[cropName]) {
                    element[item].pest.cropName = getTranslatedString(
                      lang,
                      cropName
                    );
                  }
                  if (globalCache[pest]) {
                    element[item].pest.name = getTranslatedString(lang, pest);
                  }

                  for (let subOptionItem in element[item]?.pest?.symptoms) {
                    if (element[item]?.pest?.symptoms[subOptionItem]?.name) {
                      let symptom = element[item]?.pest?.symptoms[
                        subOptionItem
                      ]?.name
                        ?.toLowerCase()
                        ?.replace(/\s/g, "")
                        ?.trim();

                      if (globalCache[symptom]) {
                        element[item].pest.symptoms[subOptionItem].name =
                          getTranslatedString(lang, symptom);
                      }
                    }
                  }
                }
              } else if (moduleName && moduleName == "disease") {
                for (let subItem in element[item]) {
                  let cropName = element[item]?.disease?.cropName
                    ?.toLowerCase()
                    ?.replace(/\s/g, "")
                    ?.trim();
                  let disease = element[item]?.disease?.name
                    ?.toLowerCase()
                    ?.replace(/\s/g, "")
                    ?.trim();

                  if (globalCache[cropName]) {
                    element[item].disease.cropName = getTranslatedString(
                      lang,
                      cropName
                    );
                  }
                  if (globalCache[disease]) {
                    element[item].disease.name = getTranslatedString(
                      lang,
                      disease
                    );
                  }

                  for (let subOptionItem in element[item]?.disease?.symptoms) {
                    if (
                      element[item]?.disease?.symptoms[subOptionItem]?.symptoms
                    ) {
                      let symptom = element[item]?.disease?.symptoms[
                        subOptionItem
                      ]?.symptoms
                        ?.toLowerCase()
                        ?.replace(/\s/g, "")
                        ?.trim();

                      if (globalCache[symptom]) {
                        element[item].disease.symptoms[subOptionItem].symptoms =
                          getTranslatedString(lang, symptom);
                      }
                    }
                  }
                }
              } else if (
                !Array.isArray(element[item]) &&
                typeof element[item] === "object" &&
                element[item] !== null &&
                moduleName === "farm/crop"
              ) {
                let arrOfObjsFields = ["user_farm_crop_variety"];

                arrOfObjsFields?.forEach((arr) => {
                  element[arr]?.forEach((obj) => {
                    let sanitizedName =
                      obj.crop_variety.name &&
                      obj.crop_variety.name
                        .toLowerCase()
                        .replace(/\s/g, "")
                        .trim();

                    if (globalCache[sanitizedName]) {
                      obj.crop_variety.name = getTranslatedString(
                        lang,
                        sanitizedName
                      );
                    }
                  });
                });

                let sanitizedName =
                  "name" in element[item] &&
                  typeof element[item].name !== "object" &&
                  element[item].name.toLowerCase().replace(/\s/g, "").trim();

                if (!isNaN(Number(sanitizedName))) {
                  continue;
                }

                if (globalCache[sanitizedName]) {
                  element[item].name = getTranslatedString(lang, sanitizedName);
                }
              } else if (moduleName && moduleName === "pest/management") {
                let customFields = [
                  "pestControlType",
                  "cropType",
                  "areaUnit",
                  "culturalManualMethod",
                  "cropStage",
                ];
                let arrOfObjsFields = [
                  "cropVarieties",
                  "pestManagementAffectedPlantParts",
                  "pestTypes",
                  "pestManagementInfestationSymptoms",
                ];
                let arrOfArrOfObjsFields = ["pestChemicalPesticidesTypes"];
                arrOfArrOfObjsFields?.forEach((arr) => {
                  element[arr]?.forEach((obj) => {
                    let pesticideQuantityUnit =
                      obj?.pesticideQuantityUnit?.name &&
                      obj?.pesticideQuantityUnit?.name
                        ?.toLowerCase()
                        .replace(/\s/g, "")
                        .trim();
                    let pesticideQuantityUnitAbbvr =
                      obj?.pesticideQuantityUnit?.abbvr &&
                      obj?.pesticideQuantityUnit?.abbvr
                        ?.toLowerCase()
                        .replace(/\s/g, "")
                        .trim();
                    let pesticideDoseRateUnit =
                      obj?.pesticideDoseRateUnit?.name &&
                      obj?.pesticideDoseRateUnit?.name
                        ?.toLowerCase()
                        .replace(/\s/g, "")
                        .trim();
                    let pesticideDoseRateUnitAbbr =
                      obj?.pesticideDoseRateUnit?.abbvr &&
                      obj?.pesticideDoseRateUnit?.abbvr
                        ?.toLowerCase()
                        .replace(/\s/g, "")
                        .trim();
                    let applicationMethod =
                      obj?.applicationMethod?.name &&
                      obj?.applicationMethod?.name
                        ?.toLowerCase()
                        .replace(/\s/g, "")
                        .trim();

                    obj?.mixtures?.forEach((mixObj) => {
                      let quantityUnit =
                        mixObj?.quantityUnit?.name &&
                        mixObj?.quantityUnit?.name
                          ?.toLowerCase()
                          .replace(/\s/g, "")
                          .trim();
                      if (globalCache[quantityUnit]) {
                        mixObj.quantityUnit.name = getTranslatedString(
                          lang,
                          quantityUnit
                        );
                      }
                      let quantityUnitAbbvr =
                        mixObj?.quantityUnit?.abbvr &&
                        mixObj?.quantityUnit?.abbvr
                          ?.toLowerCase()
                          .replace(/\s/g, "")
                          .trim();
                      if (globalCache[quantityUnitAbbvr]) {
                        mixObj.quantityUnit.abbvr = getTranslatedString(
                          lang,
                          quantityUnitAbbvr
                        );
                      }
                    });

                    if (globalCache[pesticideQuantityUnit]) {
                      obj.pesticideQuantityUnit.name = getTranslatedString(
                        lang,
                        pesticideQuantityUnit
                      );
                    }
                    if (globalCache[pesticideQuantityUnitAbbvr]) {
                      obj.pesticideQuantityUnit.abbvr = getTranslatedString(
                        lang,
                        pesticideQuantityUnitAbbvr
                      );
                    }
                    if (globalCache[pesticideDoseRateUnit]) {
                      obj.pesticideDoseRateUnit.name = getTranslatedString(
                        lang,
                        pesticideDoseRateUnit
                      );
                    }
                    if (globalCache[pesticideDoseRateUnitAbbr]) {
                      obj.pesticideDoseRateUnit.abbvr = getTranslatedString(
                        lang,
                        pesticideDoseRateUnitAbbr
                      );
                    }
                    if (globalCache[applicationMethod]) {
                      obj.applicationMethod.name = getTranslatedString(
                        lang,
                        applicationMethod
                      );
                    }
                  });
                });
                arrOfObjsFields?.forEach((arr) => {
                  element[arr]?.forEach((obj) => {
                    let sanitizedName =
                      obj.name &&
                      obj.name.toLowerCase().replace(/\s/g, "").trim();

                    if (globalCache[sanitizedName]) {
                      obj.name = getTranslatedString(lang, sanitizedName);
                    }
                  });
                });
                customFields.forEach((field) => {
                  if (element[item]) {
                    for (let subItem in element[item][field]) {
                      if (element[item][field]?.name) {
                        let sanitizedName = element[item][field].name
                          .toLowerCase()
                          .replace(/\s/g, "")
                          .trim();

                        if (globalCache[sanitizedName]) {
                          element[item][field].name = getTranslatedString(
                            lang,
                            sanitizedName
                          );
                        }
                      }

                      let sanitizedAbbvr;
                      if (element[item][field]?.abbvr) {
                        sanitizedAbbvr = element[item][field]?.abbvr
                          .toLowerCase()
                          .replace(/\s/g, "")
                          .trim();
                      }

                      if (globalCache[sanitizedAbbvr]) {
                        element[item][field].abbvr = getTranslatedString(
                          lang,
                          sanitizedAbbvr
                        );
                      }
                    }
                  }
                });
              } else if (moduleName && moduleName === "disease/management") {
                let customFields = [
                  "diseaseControlType",
                  "cropType",
                  "areaUnit",
                  "culturalManualMethod",
                  "cropStage",
                ];
                let arrOfObjsFields = [
                  "cropVarieties",
                  "diseaseManagementAffectedPlantParts",
                  "diseaseType",
                  "diseaseSymptoms",
                ];
                let arrOfArrOfObjsFields = ["diseaseChemicalTypes"];
                arrOfArrOfObjsFields?.forEach((arr) => {
                  element[arr]?.forEach((obj) => {
                    let chemicalQuantityUnit =
                      obj?.chemicalQuantityUnit?.name &&
                      obj?.chemicalQuantityUnit?.name
                        ?.toLowerCase()
                        .replace(/\s/g, "")
                        .trim();
                    let chemicalQuantityUnitAbbvt =
                      obj?.chemicalQuantityUnit?.abbvr &&
                      obj?.chemicalQuantityUnit?.abbvr
                        ?.toLowerCase()
                        .replace(/\s/g, "")
                        .trim();
                    let chemicalDoseRateUnit =
                      obj?.chemicalDoseRateUnit?.name &&
                      obj?.chemicalDoseRateUnit?.name
                        ?.toLowerCase()
                        .replace(/\s/g, "")
                        .trim();
                    let chemicalDoseRateUnitAbbvr =
                      obj?.chemicalDoseRateUnit?.abbvr &&
                      obj?.chemicalDoseRateUnit?.abbvr
                        ?.toLowerCase()
                        .replace(/\s/g, "")
                        .trim();
                    let applicationMethod =
                      obj?.applicationMethod?.name &&
                      obj?.applicationMethod?.name
                        ?.toLowerCase()
                        .replace(/\s/g, "")
                        .trim();

                    obj?.mixtures?.forEach((mixObj) => {
                      let quantityUnit =
                        mixObj?.quantityUnit?.name &&
                        mixObj?.quantityUnit?.name
                          ?.toLowerCase()
                          .replace(/\s/g, "")
                          .trim();
                      if (globalCache[quantityUnit]) {
                        mixObj.quantityUnit.name = getTranslatedString(
                          lang,
                          quantityUnit
                        );
                      }
                      let quantityUnitAbbvr =
                        mixObj?.quantityUnit?.abbvr &&
                        mixObj?.quantityUnit?.abbvr
                          ?.toLowerCase()
                          .replace(/\s/g, "")
                          .trim();
                      if (globalCache[quantityUnitAbbvr]) {
                        mixObj.quantityUnit.abbvr = getTranslatedString(
                          lang,
                          quantityUnitAbbvr
                        );
                      }
                    });

                    if (globalCache[chemicalQuantityUnit]) {
                      obj.chemicalQuantityUnit.name = getTranslatedString(
                        lang,
                        chemicalQuantityUnit
                      );
                    }
                    if (globalCache[chemicalQuantityUnitAbbvt]) {
                      obj.chemicalQuantityUnit.abbvr = getTranslatedString(
                        lang,
                        chemicalQuantityUnit
                      );
                    }
                    if (globalCache[chemicalDoseRateUnit]) {
                      obj.chemicalDoseRateUnit.name = getTranslatedString(
                        lang,
                        chemicalDoseRateUnit
                      );
                    }
                    if (globalCache[chemicalDoseRateUnitAbbvr]) {
                      obj.chemicalDoseRateUnit.abbvr = getTranslatedString(
                        lang,
                        chemicalDoseRateUnit
                      );
                    }
                    if (globalCache[applicationMethod]) {
                      obj.applicationMethod.name = getTranslatedString(
                        lang,
                        applicationMethod
                      );
                    }
                  });
                });
                arrOfObjsFields?.forEach((arr) => {
                  element[arr]?.forEach((obj) => {
                    let sanitizedName =
                      obj.name &&
                      obj.name.toLowerCase().replace(/\s/g, "").trim();

                    if (arr === "diseaseSymptoms") {
                      let symptom =
                        obj.symptoms &&
                        obj.symptoms.toLowerCase().replace(/\s/g, "").trim();

                      if (globalCache[symptom]) {
                        obj.symptoms = getTranslatedString(lang, symptom);
                      }
                    }

                    if (globalCache[sanitizedName]) {
                      obj.name = getTranslatedString(lang, sanitizedName);
                    }
                  });
                });
                customFields.forEach((field) => {
                  if (element[item]) {
                    for (let subItem in element[item][field]) {
                      if (element[item][field]?.name) {
                        let sanitizedName = element[item][field].name
                          .toLowerCase()
                          .replace(/\s/g, "")
                          .trim();

                        if (globalCache[sanitizedName]) {
                          element[item][field].name = getTranslatedString(
                            lang,
                            sanitizedName
                          );
                        }
                      } else if (element[item][field]?.symptoms) {
                        let sanitizedName = element[item][field].symptoms
                          .toLowerCase()
                          .replace(/\s/g, "")
                          .trim();

                        if (globalCache[sanitizedName]) {
                          element[item][field].symptoms = getTranslatedString(
                            lang,
                            sanitizedName
                          );
                        }
                      } else {
                        let sanitizedAbbvr;
                        if (element[item][field]?.abbvr) {
                          sanitizedAbbvr = element[item][field]?.abbvr
                            .toLowerCase()
                            .replace(/\s/g, "")
                            .trim();
                        }

                        if (globalCache[sanitizedAbbvr]) {
                          element[item][field].abbvr = getTranslatedString(
                            lang,
                            sanitizedAbbvr
                          );
                        }
                      }
                    }
                  }
                });
              } else if (moduleName && moduleName === "nutrient/management") {
                let customFields = [
                  "applicationStage",
                  "cropType",
                  "fertilizerAppliedAreaUnit",
                ];
                let arrOfArrOfObjsFields = ["fertilizerInputs"];
                arrOfArrOfObjsFields?.forEach((arr) => {
                  element[arr]?.forEach((obj) => {
                    let fertilizerType =
                      obj?.nutrientManagementFertilizerInput?.fertilizerType
                        ?.name &&
                      obj?.nutrientManagementFertilizerInput?.fertilizerType?.name
                        ?.toLowerCase()
                        .replace(/\s/g, "")
                        .trim();
                    let applicationMethod =
                      obj?.nutrientManagementFertilizerInput?.applicationMethod
                        ?.name &&
                      obj?.nutrientManagementFertilizerInput?.applicationMethod?.name
                        ?.toLowerCase()
                        .replace(/\s/g, "")
                        .trim();
                    let applicationRateUnit =
                      obj?.nutrientManagementFertilizerInput
                        ?.applicationRateUnit?.name &&
                      obj?.nutrientManagementFertilizerInput?.applicationRateUnit?.name
                        ?.toLowerCase()
                        .replace(/\s/g, "")
                        .trim();
                    let applicationRateAbbr =
                      obj?.nutrientManagementFertilizerInput
                        ?.applicationRateUnit?.abbvr &&
                      obj?.nutrientManagementFertilizerInput?.applicationRateUnit?.abbvr
                        ?.toLowerCase()
                        .replace(/\s/g, "")
                        .trim();

                    obj?.nutrientManagementFertilizerInput?.mixtures?.forEach(
                      (mixObj) => {
                        let quantityUnit =
                          mixObj?.quantityUnit?.name &&
                          mixObj?.quantityUnit?.name
                            ?.toLowerCase()
                            .replace(/\s/g, "")
                            .trim();
                        if (globalCache[quantityUnit]) {
                          mixObj.quantityUnit.name = getTranslatedString(
                            lang,
                            quantityUnit
                          );
                        }
                        let quantityUnitAbbvr =
                          mixObj?.quantityUnit?.abbvr &&
                          mixObj?.quantityUnit?.abbvr
                            ?.toLowerCase()
                            .replace(/\s/g, "")
                            .trim();
                        if (globalCache[quantityUnitAbbvr]) {
                          mixObj.quantityUnit.abbvr = getTranslatedString(
                            lang,
                            quantityUnitAbbvr
                          );
                        }
                      }
                    );

                    if (globalCache[fertilizerType]) {
                      obj.nutrientManagementFertilizerInput.fertilizerType.name =
                        getTranslatedString(lang, fertilizerType);
                    }
                    if (globalCache[applicationRateUnit]) {
                      obj.nutrientManagementFertilizerInput.applicationRateUnit.name =
                        getTranslatedString(lang, applicationRateUnit);
                    }
                    if (globalCache[applicationRateAbbr]) {
                      obj.nutrientManagementFertilizerInput.applicationRateUnit.abbvr =
                        getTranslatedString(lang, applicationRateAbbr);
                    }
                    if (globalCache[applicationMethod]) {
                      obj.nutrientManagementFertilizerInput.applicationMethod.name =
                        getTranslatedString(lang, applicationMethod);
                    }
                  });
                });
                customFields.forEach((field) => {
                  if (element[item]) {
                    for (let subItem in element[item][field]) {
                      if (element[item][field]?.name) {
                        let sanitizedName = element[item][field].name
                          .toLowerCase()
                          .replace(/\s/g, "")
                          .trim();

                        if (globalCache[sanitizedName]) {
                          element[item][field].name = getTranslatedString(
                            lang,
                            sanitizedName
                          );
                        }
                      }

                      let sanitizedAbbvr;
                      if (element[item][field]?.abbvr) {
                        sanitizedAbbvr = element[item][field]?.abbvr
                          .toLowerCase()
                          .replace(/\s/g, "")
                          .trim();
                      }

                      if (globalCache[sanitizedAbbvr]) {
                        element[item][field].abbvr = getTranslatedString(
                          lang,
                          sanitizedAbbvr
                        );
                      }
                    }
                  }
                });
              } else if (moduleName && moduleName === "soil/information") {
                let arrOfObjsFields = ["soilType"];

                arrOfObjsFields?.forEach((arr) => {
                  element[arr]?.forEach((obj) => {
                    let sanitizedName =
                      obj.name &&
                      obj.name.toLowerCase().replace(/\s/g, "").trim();

                    if (globalCache[sanitizedName]) {
                      obj.name = getTranslatedString(lang, sanitizedName);
                    }
                  });
                });
                if (element[item]) {
                  for (let subItem in element[item]) {
                    if (element[item]?.soilHealth) {
                      let soilHealth = element[item]?.soilHealth;

                      if (globalCache[soilHealth]) {
                        element[item].soilHealth = getTranslatedString(
                          lang,
                          soilHealth
                        );
                      }
                    }
                  }
                }
              } else if (moduleName && moduleName == "land/soil/list") {
                let arrOfObjsFields = [
                  "Crops",
                  "soilPrepActivities",
                  "SoilTypes",
                ];

                let singleObjFields = ["Option", "areaunit"];
                arrOfObjsFields.forEach((arr) => {
                  element[arr].forEach((obj) => {
                    let sanitizedName =
                      obj.name &&
                      obj.name.toLowerCase().replace(/\s/g, "").trim();

                    if (globalCache[sanitizedName]) {
                      obj.name = getTranslatedString(lang, sanitizedName);
                    }
                  });
                });

                singleObjFields.forEach((field) => {
                  if (element[item]) {
                    for (let subItem in element[item][field]) {
                      if (element[item][field]?.name) {
                        let sanitizedName = element[item][field]?.name
                          .toLowerCase()
                          .replace(/\s/g, "")
                          .trim();
                        let sanitizedAbbvr;
                        if (element[item][field]?.abbvr) {
                          sanitizedAbbvr = element[item][field]?.abbvr
                            .toLowerCase()
                            .replace(/\s/g, "")
                            .trim();
                        }

                        if (globalCache[sanitizedName]) {
                          element[item][field].name = getTranslatedString(
                            lang,
                            sanitizedName
                          );
                        }
                        if (globalCache[sanitizedAbbvr]) {
                          element[item][field].abbvr = getTranslatedString(
                            lang,
                            sanitizedAbbvr
                          );
                        }
                      }
                    }
                  }
                });
              } else if (moduleName && moduleName == "fertilizers") {
                let customFields = ["fertilizerName"];
                customFields.forEach((field) => {
                  if (element[item]) {
                    for (let subItem in element[item][field]) {
                      if (element[item][field]?.name) {
                        let sanitizedName = element[item][field].name
                          .toLowerCase()
                          .replace(/\s/g, "")
                          .trim();

                        if (globalCache[sanitizedName]) {
                          element[item][field].name = getTranslatedString(
                            lang,
                            sanitizedName
                          );
                        }
                      }
                    }
                  }
                });
              }
            }
          }
        }
      }
    } else {
      console.log("---------------is not array-----------");
      let sanitizedName =
        arrayOfObjs?.name?.toLowerCase().replace(/\s/g, "").trim() ||
        arrayOfObjs?.moduleName?.toLowerCase().replace(/\s/g, "").trim(); // this is a dirty fix for /api/report/recommendation/crop-history translation

      if (sanitizedName && globalCache[sanitizedName]) {
        if (lang) {
          arrayOfObjs.name = getTranslatedString(lang, sanitizedName);
          // this is a dirty fix for /api/report/recommendation/crop-history translation
          if (arrayOfObjs.moduleName)
            arrayOfObjs.moduleName = getTranslatedString(lang, sanitizedName);
        } else {
          return arrayOfObjs;
        }
      }

      for (let item in arrayOfObjs) {
        const element = arrayOfObjs[item];
        if (Array.isArray(element)) {
          element.forEach((subItem) => {
            if (subItem?.Option && Object.values(subItem?.Option).length) {
              let sanitizedName = subItem.Option?.name
                ?.toLowerCase()
                .replace(/\s/g, "")
                .trim();
              if (sanitizedName && globalCache[sanitizedName]) {
                subItem.Option.name = getTranslatedString(lang, sanitizedName);
              }
            }
            let sanitizedName = subItem?.name
              ?.toLowerCase()
              .replace(/\s/g, "")
              .trim();
            if (!isNaN(Number(sanitizedName))) {
              return;
            }
            if (sanitizedName && globalCache[sanitizedName]) {
              subItem.name = getTranslatedString(lang, sanitizedName);
            }
          });
        } else if (typeof element === "string") {
          let sanitizedName = element?.toLowerCase().replace(/\s/g, "").trim();
          if (!isNaN(Number(sanitizedName))) {
            return;
          }
          if (sanitizedName && globalCache[sanitizedName]) {
            arrayOfObjs.cropTypeName = getTranslatedString(lang, sanitizedName);
          }
        }
      }
    }

    // Check for nested sub arrays

    return arrayOfObjs;
  };
  req.simpleTranslate = (text) => {
    const { lang = "en" } = req.headers;
    let translated = "";
    if (text) {
      let sanitizedName = text.toLowerCase().replace(/\s/g, "").trim();

      if (globalTranslationCache[sanitizedName]) {
        const trans = {
          en: globalTranslationCache[sanitizedName].english,
          hi: globalTranslationCache[sanitizedName].hindi,
          mr: globalTranslationCache[sanitizedName].marathi,
          ne: globalTranslationCache[sanitizedName].nepali,
          es: globalTranslationCache[sanitizedName].spanish,
          id: globalTranslationCache[sanitizedName].indonesian,
          in: globalTranslationCache[sanitizedName].indonesian,
          ar: globalTranslationCache[sanitizedName].arabic,
          pt: globalTranslationCache[sanitizedName].portugese,
          fr: globalTranslationCache[sanitizedName].french,
          vi: globalTranslationCache[sanitizedName].vietnamese,
          am: globalTranslationCache[sanitizedName].amharic,
          so: globalTranslationCache[sanitizedName].somali,
          om: globalTranslationCache[sanitizedName].oromo,
          bn: globalTranslationCache[sanitizedName].bengali,
          sw: globalTranslationCache[sanitizedName].swahili,
          el: globalTranslationCache[sanitizedName].greek,
          tr: globalTranslationCache[sanitizedName].turkish,
          nl: globalTranslationCache[sanitizedName].dutch,
          it: globalTranslationCache[sanitizedName].italian,
        };
        // translated = getTranslatedString(lang, sanitizedName);
        translated = trans[lang] || trans["en"];
      }
    }
    return translated || text;
  };
  next();
};
