const express = require("express");
const fs = require("fs");
const moment = require("moment");
const { body } = require("express-validator");
const router = express.Router();
const auth = require(rootPath + "/middleware/auth");
const { Op } = require('sequelize');
const translation = require(rootPath + "/middleware/translation");
const {
    validateCreateCoffeeHarvesting,
    validateCoffeeHarvestingQuery
} = require("../../../helpers/validators/coffee/harvesting");
const validationErrorHandler = require("../../../middleware/validation_error_handler");
const {
    successRespSync,
    serverError,
    errorResp,
    errorRespSync,
} = require(rootPath + "/helpers/api");
const db = require(rootPath + "/models");
const { prepareHarvestData, generatePDFReport, generateExcelReport, generatePDF } = require('./utils');
const { getWeightUnit, allAdmins, createNotification, convertToHectares, convertToAlertsUnit } = require(rootPath + "/routes/notification/utils");
// GET /api/coffee/harvesting
router.get(
    "/",
    auth,
    validateCoffeeHarvestingQuery(),
    validationErrorHandler,
    async function (req, res) {
        try {
            const {count, response, comparisonData} = await prepareHarvestData(req);
            return res.json(
                successRespSync({
                    msg: "Coffee harvesting data.",
                    data: {
                        count,
                        response,
                        comparisonData,
                    },
                })
            );
        } catch (error) {
            return serverError(res, error);
        }
    }
);

// GET /api/coffee/harvesting/download-xlsx
router.get(
    "/:reportType",
    auth,
    validateCoffeeHarvestingQuery(),
    validationErrorHandler,
    async function (req, res) {
        try {
            const { reportType } = req.params;

            let {
                byTimeStartDate,
                byTimeEndDate,
                comparisonTimeStartDate,
                comparisonTimeEndDate,
                byTimeText,
                comparisonTimeText
            } = req.query;

            const { count, response, comparisonData } = await prepareHarvestData(req);

            let ext = "";
            let filepath = ""
            if(reportType === 'download-pdf') {
                ext = "pdf"
                let mydata = await generatePDFReport(response, comparisonData.varietyData, byTimeText, comparisonTimeText, byTimeStartDate,
                    byTimeEndDate,
                    comparisonTimeStartDate,
                    comparisonTimeEndDate);
                let pdfData = await generatePDF(mydata, req);
                filepath = pdfData.path;
            }

            if(reportType === 'download-xlsx') {
                ext = "xlsx"
                filepath = await generateExcelReport('xlsx', response, comparisonData.varietyData, byTimeText, comparisonTimeText, byTimeStartDate,
                    byTimeEndDate,
                    comparisonTimeStartDate,
                    comparisonTimeEndDate);
            }

            if(reportType === 'download-csv') {
                ext = "csv"
                filepath = await generateExcelReport('csv', response, comparisonData.varietyData, byTimeText, comparisonTimeText, byTimeStartDate,
                    byTimeEndDate,
                    comparisonTimeStartDate,
                    comparisonTimeEndDate);
            }
            
            res.writeHead(200, {
                "Content-Type": "application/octet-stream",
                "Content-Disposition": `attachment; filename=coffee-cherry-harvest.${ext}`,
            });
            fs.createReadStream(filepath).pipe(res);
            return;
        } catch (error) {
            return serverError(res, error);
        }
    }
);

// POST /api/coffee/harvesting
router.post(
    "/",
    auth,
    validateCreateCoffeeHarvesting(),
    validationErrorHandler,
    async function (req, res) {
        try {
          const { organization, id: userId, country, firstName, lastName } = req.user;
            let {
                harvestingDate,
                plantationId,
                noOfCoffeeTrees,
                noOfTrees,
                quality,
                coffeeYield,
                coffeeYieldUnitId,
                yieldLosses,
                reasonForLossId,
                recordId
            } = req.body;

            const response = await db.CoffeeHarvesting.create(
                {
                    harvestingDate: harvestingDate,
                    plantationId: plantationId,
                    noOfCoffeeTrees: noOfCoffeeTrees,
                    noOfTrees: noOfTrees,
                    quality: quality,
                    coffeeYield: coffeeYield,
                    coffeeYieldUnitId: coffeeYieldUnitId,
                    yieldLosses: yieldLosses,
                    reasonForLossId: reasonForLossId,
                    userId: userId,
                    recordId: recordId,
                },
            );
            
            let harvestWhere = {
              organization
            }

            //  find crop
            const coffeeData = await db.Option.findAll({
              attributes: ['id', 'region'],
              where: {
                name: {
                  [Op.like] : '%coffee%'
                }
              }
            })
            const coffeeCropsId = coffeeData.map(item => item.id);
            const coffeeCountrys = coffeeData.map(item=>item.region);
            if (coffeeCropsId.length > 0) {
              harvestWhere.cropId = {
                [Op.in]: coffeeCropsId
              }
              harvestWhere.country = {
                [Op.in]:coffeeCountrys
              }
            }
            const alertCriteria = await db.HarvestAlert.findOne({
              where: harvestWhere,
              include: [
                {
                  model: db.Option,
                  as: 'crop',
                  attributes: { exclude: ['createdAt', 'updatedAt'] },
                },
                {
                  model: db.UnitsList,
                  as: "unit",
                  attributes: ["id", "name", "abbvr", "unitType", "factor"],
                },
              ],
            });

            if (alertCriteria) {
              const twelveMonthsAgo = new Date();
              twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

              // converts baseMaxAllowed to kg / hector / year
              const maxAllowedPerKgHaYr = await getWeightUnit(+alertCriteria.maxAllowed, alertCriteria.unit)

              const harvestData = await db.CoffeeHarvesting.findAll({
                attributes: ['id','coffeeYield'],
                include: [
                  {
                    model: db.Plantations,
                    attributes: ['id', 'plantation_name'],
                    as: 'plantation',
                    include: [
                      {
                        model: db.user_farm,
                        attributes: ['id', 'farmName', 'area'],
                        as: 'userFarms',
                      },
                    ],
                  },
                ],
                where: {
                  userId,
                  createdAt: {
                    [Op.gte]: twelveMonthsAgo,
                  },
                },
              });

              let farmArea = 1; // HA;
              let totalHarvestPerKgHaYr = harvestData.reduce((ph, ch) => {
                // convert coffeeYield to baseUnit
                const coffeeYieldInKg = getWeightUnit(+ch.coffeeYield, alertCriteria.unit)

                // convert area from acre to hector
                const areaInHector = convertToHectares(ch.plantation.userFarms[0]?.area)
                farmArea = areaInHector; // adde random farm area of coffee harvesting;
                return ph + coffeeYieldInKg/areaInHector
              }, 0)

                //----- Newly added quantity kg/ha 
              let newCoffeeHarvestQtyKgPerHA = 0;
        
              if(farmArea){
                newCoffeeHarvestQtyKgPerHA = parseFloat(coffeeYield/farmArea);
              }

              totalHarvestPerKgHaYr +=newCoffeeHarvestQtyKgPerHA;
              
              if (maxAllowedPerKgHaYr < totalHarvestPerKgHaYr) {
                let totalReported = convertToAlertsUnit(totalHarvestPerKgHaYr, alertCriteria.unit) + ' ' + alertCriteria.unit.abbvr+'/ha/yr'
                let maxAllowedConverted = convertToAlertsUnit(maxAllowedPerKgHaYr, alertCriteria.unit) + ' ' + alertCriteria.unit.abbvr+'/ha/yr'
                const listRes = await allAdmins(organization);
                const farm = db.Plantations.findOne({
                  attributes: ['id', 'plantation_name'],
                  as: 'plantation',
                  include: [
                    {
                      model: db.user_farm,
                      attributes: ['id', 'farmName', 'area'],
                      as: 'userFarms',
                    }
                  ],
                  where: { id: plantationId }
                })
                let title = "High production Alert!";
                let type = "crop_harvest";
                let message = `High production Alert! Farm: ${farm.plantation.userFarms[0].farmName}, Farmer: ${firstName} ${lastName}, Crop: Coffee, Total reported: ${totalReported} , Max allowed: ${maxAllowedConverted}`
                let notificationAdmin = {
                  user: {
                    id: userId,
                  },
                  body: {
                    notify: 'admin',
                    title,
                    type,
                    message,
                    users: listRes,
                  }
                }
                let notificationUser = {
                  user: {
                    id: buyingStationId,
                  },
                  body: {
                    notify: 'user',
                    title,
                    type,
                    message,
                    users: [userId],
                  }
                }
                if (alertCriteria.alertAdmin && alertCriteria.alertFarmer) {
                  Promise.all([
                    await createNotification(notificationAdmin, ),
                    await createNotification(notificationUser, )
                  ])
                } else if (alertCriteria.alertAdmin) {
                  await createNotification(notificationAdmin, )
                } else if (alertCriteria.alertFarmer) {
                  await createNotification(notificationUser, )
                }
              }
            }
            

            return res.json(
                successRespSync({
                    msg: "Coffee harvesting data saved successfully.",
                    data: response,
                })
            );
        } catch (error) {

            return serverError(res, error);
        }
    }
);

// PUT /api/coffee/harvesting/{id}
router.put(
    "/:id",
    auth,
    validateCreateCoffeeHarvesting(),
    validationErrorHandler,
    async function (req, res) {
        try {
            const userId = req.user.id;
            const { id } = req.params;
            let {
                harvestingDate,
                plantationId,
                noOfCoffeeTrees,
                noOfTrees,
                quality,
                coffeeYield,
                coffeeYieldUnitId,
                yieldLosses,
                reasonForLossId,
                recordId
            } = req.body;

            const harvestingExists = await db.CoffeeHarvesting.findOne({
                where: {
                    id,
                    isDeleted: false,
                    userId: userId,
                },
            });
            if (!harvestingExists) {
                throw new Error("Harvesting do not exists")
            }

            let set = {
                harvestingDate: harvestingDate,
                plantationId: plantationId,
                noOfCoffeeTrees: noOfCoffeeTrees,
                noOfTrees: noOfTrees,
                quality: quality,
                coffeeYield: coffeeYield,
                coffeeYieldUnitId: coffeeYieldUnitId,
                yieldLosses: yieldLosses,
                reasonForLossId: reasonForLossId,
                userId: userId,
            }

            await db.CoffeeHarvesting.update(set, {
                where: { id },

            });

            return res.json(
                successRespSync({
                    msg: "Coffee harvesting data saved successfully.",
                    data: {...set, recordId},
                })
            );
        } catch (error) {

            return res.json(
                errorRespSync({
                    msg: error.message,
                    code: 500,
                })
            );
        }
    }
);

// DELETE /api/coffee/harvesting/{id}
router.delete(
    "/:id",
    auth,
    async function (req, res) {

        try {
            const userId = req.user.id;
            const { id } = req.params;

            const harvestingExists = await db.CoffeeHarvesting.findOne({
                where: {
                    id,
                    isDeleted: false,
                    userId: userId,
                },
            });
            if (!harvestingExists) {
                throw new Error("Harvesting do not exists")
            }

            const response = await db.CoffeeHarvesting.update(
                { isDeleted: true },
                {
                    where: { id },

                }
            );


            return res.json(
                successRespSync({
                    msg: "Coffee harvesting data deleted",
                    data: response,
                })
            );
        } catch (error) {

            return res.json(
                errorRespSync({
                    msg: error.message,
                    code: 500,
                })
            );
        }
    }
);

module.exports = router;