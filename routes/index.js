const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs')

const user = require('./users');
const farm = require('./farm');
const authenticate = require('./authenticate');
const shipment = require('./shipment');
const publicRoutes = require('./public');
const geofencing = require('./geofencing');
const audit = require('./audit');
const list = require('./list');
const crop = require('./crop');
const equipment = require('./equipment');
const equipmentModeOfOperation = require('./equipment/modeOfOperations');
const equipmentGroups = require('./equipment/groups');
const equipmentNames = require('./equipment/names');
const equipmentCategory = require('./equipment/category');

const userDocuments = require('./documents');
const sowing = require('./sowing');
const irrigation = require('./irrigation');
const irrigationStage = require('./irrigation/stages');
const irrigationSchedule = require('./irrigation/schedule');
const irrigationWaterSources = require('./irrigation/waterSource');
const irrigationTypes = require('./irrigation/irrigationType.js');
const irrigationTypesUpdated = require('./irrigation/irrigationTypeUpdated.js');

const harvesting = require('./harvesting');
const harvestingMethod = require('./harvesting/harvestingMethod');
const harvestingMethodType = require('./harvesting/harvestingMethodType');
const harvestLossReason = require('./harvesting/harvestLossReason');

const contactCategory = require('./contact/category');
const contact = require('./contact');
const weed = require('./weed');
const cropStorageMethods = require('./crop/storage/methods');
const cropStorageTypes = require('./crop/storage/storageTypes');
const cropStorage = require('./crop/storage');
const cropObservation = require('./crop/observation');
const admin = require('./admin');
const dashboard = require('./dashboard');
const pendingReports = require('./report/pending');
const reportType = require('./report/type');
const reportGeneral = require('./report/general');
const report = require('./report');
const faq = require('./faq');
const cropReport = require('./report/crop');
const analysisReports = require('./report/analysisReports');
const reportSettings = require('./report/settings');
const offlineApi = require('./offline');
const tickets = require('./admin/tickets');
const ticketComments = require('./admin/tickets/comments');
const surveys = require('./admin/surveys');
const plantation = require('./coffee/plantations');
const coffeeHarvesting = require('./coffee/harvesting');
const seedling = require('./coffee/seedlings');
const sellingReport = require('./coffee/sellingReport');
const userRoles = require('./users/user-roles');
const userPermissions = require('./users/user-permissions');
const userRoleExclusion = require('./users/user-role-exclusion');

const productionCharts = require('./coffee/productionCharts');
const productionTargets = require('./coffee/ProductionTargets');
const coffee_data = require('./coffee/data');

const pest = require('./pest');
const disease = require('./disease');

const superAdmin = require('./super-admin');

const cacaoPlantation = require('./cacao/plantations');

const esgAssessmentRoutes = require('./esg/survey/esgAssessment.js');
const esgAssessmentQuestionHeadingRoutes = require('./esg/survey/esgAssessmentQuestionHeading.js')
const esgGetDataQuestionRoutes = require('./esg/survey/questions/esgGetDataQuestion.js')
const esgActionPlanRoutes = require('./esg/survey/questions/esgActionPlans.js')
const esgAssessmentQuestionOptionRoutes = require('./esg/survey/questions/esgAssessmentQuestionOptions.js')
const esgAssessmentQuestionRoutes = require('./esg/survey/esgAssessmentQuestion.js')
const esgServiceTypeRoutes = require('./esg/survey/questions/service-type.js')

const esgReport = require('./esg/esg-report');
const esgReportTemplate = require('./esg/esg-report-template');
const tutorials = require('./tutorials/index');

const unitCategoryController = require('./esg/unit-measurement/unitCategoryController.js')
const unitController = require('./esg/unit-measurement/unitController.js')


// using routes
router.use("/logs", require("./logs"));
router.use("/weather", require("./weather"));
router.use("/unit", require("./unit"));
router.use("/pest", pest);
router.use("/disease", disease);
router.use("/soil", require("./soil"));
router.use("/soil-info", require("./soil-analytics/soil-analysis"));
router.use('/lime-calculator', require('./soil-analytics/lime-calculator'));
router.use('/soil-nutrient-calculator', require('./soil-analytics/nutrient-calculator'));
router.use("/nutrient", require("./nutrient"));
router.use("/equipments/mode-of-operations", equipmentModeOfOperation);
router.use("/equipments/groups", equipmentGroups);
router.use("/equipments/names", equipmentNames);
router.use("/equipments/categories", equipmentCategory);
router.use("/equipments", equipment);
router.use("/crop/storage/methods", cropStorageMethods);
router.use("/crop/storage/types", cropStorageTypes);
router.use("/crop/storage", cropStorage);
router.use("/crop/observation", cropObservation);
router.use("/crop", crop);
router.use("/user/crop", require("./users/crop"));
router.use("/user/roles", userRoles);
router.use("/list", list);
router.use("/audit", audit);
router.use("/geofencing", geofencing);
router.use("/public", publicRoutes);
router.use("/farm/crop", require("./farm/crop"));
router.use("/farm/segment", require("./farm/segment"));
router.use("/farm/validate", require("./farm/validate"));
router.use("/farm/community", require("./farm/community"));
router.use("/farm/activity", require("./farm/activity"));
router.use("/farm/traceability", require("./farm/traceability"))
router.use("/farm", farm);
router.use("/user/goal", require("./users/goal"));
router.use('/user/account-export', require('./users/account-export'));
router.use('/user', user);
router.use('/shipment', shipment);
router.use('/documents', userDocuments);
router.use('/practice', require('./practice'));
router.use('/sowing', sowing);
router.use('/irrigation/stages', irrigationStage);
router.use('/irrigation/schedules', irrigationSchedule);
router.use('/irrigation/waterSources', irrigationWaterSources);
router.use('/irrigation/types', irrigationTypes);
router.use('/irrigation/types-updated', irrigationTypesUpdated);
router.use('/irrigation', irrigation);
router.use('/harvesting/method', harvestingMethod);
router.use('/harvesting/method/types/', harvestingMethodType);
router.use('/harvesting', harvesting);
router.use('/harvesting/loss_reason', harvestLossReason);
router.use('/weed', weed);
router.use('/admin/user/membership', require("./admin/user/membership"));
router.use('/admin', admin);
router.use('/admin/dashboard', dashboard);

const { activationQueueRouter } = require("./admin/user/activation");
router.use('/admin/user/activation', activationQueueRouter);
router.use('/admin/user/activation/csv', require("./admin/user/activation/csv"));
router.use('/admin/user/upload', require("./admin/user/upload"));
router.use('/admin/v2/user/bulk-upload', require("./admin/v2/user"));
router.use('/admin/user/invite', require("./admin/user/invite"));
router.use('/admin/user/userRole', require("./admin/user/userRole"));
router.use('/admin/surveys', surveys);
router.use('/admin/ticket', tickets);
router.use('/admin/coffee', require('./admin/coffee'));
router.use('/admin/coffee/reports', require('./admin/coffee/reports'));
router.use('/admin/plantation', require('./admin/plantation'));
router.use('/admin/role-req', require('./admin/role_req'));
router.use('/admin/ticket/comments', ticketComments);
router.use('/admin/ticket/logs', require('./admin/tickets/logs'));
router.use('/admin/coffee/traceability', require('./admin/coffee/traceability'));
router.use('/admin/coffee/greenbeans', require('./admin/coffee/greenbeans'));
router.use('/admin/coffee/traceability/labels', require('./admin/coffee/traceabilityLabels'));
router.use('/admin/coffee/buying-station', require('./admin/coffee/buyingStation'));
router.use('/admin/coffee/farmers', require('./admin/coffee/farmer'));
router.use('/admin/member-data/farms', require('./admin/member-data/farms'));
router.use('/admin/member-data/farmers', require('./admin/member-data/farmers'));
router.use('/admin/member-data/farms/activity', require('./admin/member-data/farms/activity'));
router.use('/admin/cacao/plantation', require('./admin/cacao/plantation'))
router.use('/admin/cacao/cacao-data', require('./admin/cacao/cacao-data'))
router.use('/admin/cacao/traceability', require('./admin/cacao/traceability'))
router.use('/admin/cacao/traceability-labels', require('./admin/cacao/traceabilityLabels'))
router.use('/admin/cacao/overview', require('./admin/cacao/overview'));
router.use('/admin/cacao/buying-station', require('./admin/cacao/buying-station'));


router.use('/admin/crops-overview/traceability', require('./admin/crops-overview/traceability'));
router.use('/admin/crops-overview/traceability-labels', require('./admin/crops-overview/traceabilityLabels'));

// ADMIN PRODUCT ROUTES
router.use('/admin/products', require('./admin/products'));

router.use('/contact/category', contactCategory);
router.use('/contact', contact);

router.use('/report/settings/', reportSettings);
router.use('/report/pending/', pendingReports);
router.use('/report/types', reportType);
router.use('/report/general', reportGeneral);
router.use('/report/crop', cropReport);
router.use('/report/', report);
router.use('/', authenticate);
router.use('/faq', faq);
router.use('/tutorials', tutorials);
router.use('/report/analysis-reports', analysisReports);

//CACAO BUYING STATION MODULE
router.use('/cacao/buying-station', require('./cacao/buyingStation'));
router.use('/cacao/buying-station/purchase', require('./cacao/buyingStation/purchase'));
router.use('/cacao/buying-station/fermentation', require('./cacao/buyingStation/fermentation'));
router.use('/cacao/buying-station/report', require('./cacao/buyingStation/report'));
router.use('/cacao/buying-station/production', require('./cacao/buyingStation/production'));


// CACAO DRYMILLING MODULE
router.use('/cacao/dry-milling', require('./cacao/dryMilling'));

// CACAO WAREHOUSE
router.use('/cacao/warehouse', require('./cacao/warehouse'))
router.use('/cacao/traceability/labels', require('./cacao/traceabilityLabel'));

// COFFEE MODULE
router.use('/offline-api', offlineApi);
router.use('/coffee-data', coffee_data);

router.use('/currency', require('./currency'));
router.use('/admin/notification', require('./notification'));
router.use('/user/notification', require('./notification/user'));
router.use('/coffee/buying-station', require('./coffee/buyingStation'));
router.use('/coffee/traceability-information', require('./coffee/traceabilityInformation'));
router.use('/coffee/traceability/labels', require('./coffee/traceabilityLabel'));

router.use('/coffee/buying-station/purchase', require('./coffee/buyingStation/purchase'));
router.use('/coffee/buying-station/processing', require('./coffee/buyingStation/processing'));
router.use('/coffee/farmers', require('./coffee/farmer'));
router.use('/coffee/buying-station/report', require('./coffee/buyingStation/report'));
router.use('/coffee/buying-station/production', require('./coffee/buyingStation/production'));

router.use('/coffee/dry-milling', require('./coffee/dryMilling'));


router.use('/coffee/farmers/production-chart', require('./coffee/farmer/productionCharts'));
router.use('/coffee/dry-milling/production-chart', require('./coffee/dryMilling/productionCharts'));

router.use('/coffee/dry-milling/production-target', require('./coffee/dryMilling/ProductionTargets'));
router.use('/coffee/cupping', require('./coffee/cupping'));


router.use('/coffee/farmers/plantation', plantation);
router.use('/coffee/harvesting', coffeeHarvesting);
router.use('/coffee/farmers/seedling', seedling);
router.use('/coffee/farmers/selling-report', sellingReport);

router.use('/enquiry', require('./enquiry'));
router.use('/enquiry/comments', require('./enquiry/comments'));

router.use('/admin/super-admin', superAdmin);
router.use('/settings/storage', require('./settings/storage'));
router.use('/settings/currency', require('./settings/currency'));
router.use('/settings/weather', require('./settings/weather'));
router.use('/settings/report', require('./settings/report'));
router.use('/settings/general', require('./settings/general'));
router.use('/settings/notification', require('./settings/notification'));
router.use('/update_permissions', require('./users/user-permissions'))
router.use('/user/organization', require('./users/organization'))
router.use('/user/membership', require('./users/membership'))
router.use('/user/crop-goal', require('./users/crop-goal'));
router.use('/user/event', require('./users/event'));
router.use('/user/module', require('./users/module'));
router.use('/admin/farm',require('./admin/farm'))
router.use('/admin/reports', require('./admin/reports'));
router.use('/admin/organization', require('./admin/organization'));
router.use('/coffee/warehouse', require('./coffee/warehouse'))
// router.use('/user/crop-goal', require('./users/crop-goal'));
router.use('/user/event', require('./users/event'));
router.use('/user/module', require('./users/module'));
router.use('/user/survey', require('./users/survey'));
router.use('/survey-schedule', require('./schedule'))

// NFTS
router.use('/user/nfts', require('./users/nft'));

// Scoring
router.use('/user/scoring', require('./users/scoring'));

// Dimitra Portal
router.use('/portal', require('./portal'));

// Deforestation Callback
router.use("/user/deforestation/callback", require('./users/deforestation'));

// user role exclusion
router.use('/admin/user/role-exclusion', userRoleExclusion);

// Cacao Routes
router.use("/cacao/plantation", cacaoPlantation);
router.use("/cacao/farmer", require("./cacao/farmer"));
router.use(
  "/cacao/traceability-information",
  require("./cacao/traceabilityInformation")
);

// Traceability 
router.use("/traceability", require("./traceability"))
router.use("/plantation-traceability", require("./plantation-traceability"))

// Privacy Policy
router.get('/privacy-policy', (req, res, next) => {
  const lang = req?.query?.lang || req?.headers?.lang || 'en';
  const filePath = path.join(__dirname, '..', `/views/privacy-policy/${lang}.html`);
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
    return;
  }
  res.sendFile(path.join(__dirname, '..', `/views/privacy-policy/en.html`));
  return;
});

// TERMS & CONDITIONS
router.get('/term-of-use',(req,res,next)=>{
  const lang = req?.query?.lang || 'en';
  const filePath = path.join(__dirname,'..',`/views/terms-conditions/${lang}.html`);

  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
    return;
  }
  res.sendFile(path.join(__dirname, "..", `/views/terms-conditions/en.html`));
  return;
});

//tree-management
router.use("/tree-management", require("./tree-management"))
router.use("/admin/tree-management", require("./admin/tree-management"));
router.use("/final-product", require("./final-product"))

// rwa-tree
router.use("/my-tree", require("./my-tree"));

// esg
router.use('/esg/assessments/questions/options/action-plans', esgActionPlanRoutes);
router.use('/esg/assessments/questions/options/get-question-data', esgGetDataQuestionRoutes);
router.use('/esg/assessments/questions/options', esgAssessmentQuestionOptionRoutes);
router.use('/esg/assessments/question-headings', esgAssessmentQuestionHeadingRoutes);
router.use('/esg/assessments/questions', esgAssessmentQuestionRoutes);
router.use('/esg/assessments', esgAssessmentRoutes);

router.use('/esg/service-types', esgServiceTypeRoutes);

router.use('/esg/units/category', unitCategoryController)
router.use('/esg/units/unit', unitController)

router.use("/admin/esg", require("./esg"));
router.use('/admin/user-activity', require('./logs/user-activity'));

router.use('/admin/esg-report', esgReport);
router.use('/admin/esg-report-template', esgReportTemplate);


// Carbon Credit
router.use("/carbon-credit", require("./carbon-credit"));
// Media
router.use("/media", require('./media'));

// Public Registration
router.use('/public/register', require('./public/register'));

router.use('/acf', require('./acf'));
router.use('/organizations', require('./organization'));

module.exports = router;
