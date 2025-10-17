const express = require('express');
const router = express.Router();
const moment = require('moment');
const db = require(rootPath + '/models');
const auth = require(rootPath + '/middleware/auth');
const { successResp, serverError, successRespSync } = require(rootPath +
  '/helpers/api');
const { success } = require(rootPath + '/helpers/language');
const { logErrorOccurred } = require(rootPath + '/helpers/general');
const validationErrorHandler = require(rootPath +
  '/middleware/validation_error_handler');
const validatorSoilMgmt = require(rootPath +
  '/helpers/validators/soilManagement');
const validate = require(rootPath + '/helpers/validation.js');

const deprecatedFields = [
  'organicInputs',
  'totalOrganicInputApplied',
  'totalOrganicInputAppliedUnit',
  'organicInputsApplicationRate',
  'organicInputsApplicationRateUnit',
  'organicInputsApplicationFrequency',
  'organicApplicationMethod',
  'syntheticFertilizers',
  'nitrogenContent',
  'phosphorusContent',
  'potassiumContent',
  'totalSyntheticFertilizerUsed',
  'totalSyntheticFertilizerUsedUnit',
  'syntheticFertilizerApplicationRate',
  'syntheticFertilizerApplicationRateUnit',
  'syntheticApplicationMethod',
  'organic_inputs',
  'synthetic_fertilizers',
  'synthetic_application_method',
  'organic_application_method',
];
const duplicateRecordId = require(rootPath + '/middleware/duplicateRecordId')
/**
 * @swagger
 * /soil/management:
 *   post:
 *     description: Register soil informations(soil management)
 *     tags: [Soil Management]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDgxODYyNTQsImV4cCI6MTY0ODI0NjI1NH0.ZpH6Y3CcHTaAkLtJtFQqsbe40kWhup299AHJqhNjG1g'
 *     requestBody:
 *       description: register soil details
 *       required: true
 *       content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                farmIds:
 *                  type: array 
 *                areaUnits:
 *                  type: integer
 *                area:
 *                  type: integer
 *                cropType:
 *                  type: integer
 *                cropVariety:
 *                  type: array
 *                  items:
 *                    type: integer
 *                soilType:
 *                  type: array
 *                  items:
 *                    type: integer
 *                doneSoilTestingBefore:
 *                  type: boolean
 *                ph:
 *                  type: integer
 *                soilHealth:
 *                  type: string
 *                soilOrganicCarbon:
 *                  type: integer
 *                nitrogen:
 *                  type: integer
 *                nitrogenUnits:
 *                  type: integer
 *                phosphorus:
 *                  type: integer
 *                phosphorusUnits:
 *                  type: integer
 *                potassium:
 *                  type: integer
 *                potassiumUnits:
 *                  type: integer
 *                sulfur:
 *                  type: integer
 *                sulfurUnits:
 *                  type: integer
 *                inputType:
 *                  type: array
 *                  items:
 *                    type: integer
 *                dateOfApplication:
 *                  type: string
 *                stage:
 *                  type: integer
 *                limingMaterial:
 *                  type: array
 *                  items:
 *                    type: integer
 *                totalLimeApplied:
 *                  type: integer
 *                totalLimeAppliedUnits:
 *                  type: integer
 *                limingRate:
 *                  type: integer
 *                limingRateUnits:
 *                  type: integer
 *                limingApplicationFrequency:
 *                  type: integer
 *                soilApplicationMethod:
 *                  type: array
 *                  items:
 *                    type: integer
 *                organicInputsData:
 *                  type: array
 *                  items:
 *                    type: object 
 *                syntheticFertilizersData:
 *                  type: array
 *                  items:
 *                    type: object
 *                daysAfterSowing:
 *                    type: interger
 *                cropHeight:
 *                    type: float
 *                cropHeightUnits:
 *                    type: interger
 *                recordId:
 *                    type: string
 *              example:
 *                farmIds: [406]
 *                areaUnits: 10
 *                area: 1.098
 *                cropType: 54
 *                cropVariety: [22]
 *                soilType: [
 *                    4,
 *                    5
 *                ]
 *                doneSoilTestingBefore: true
 *                ph: 55
 *                soilOrganicCarbon: 58
 *                nitrogen: 23.5
 *                nitrogenUnits: 58
 *                phosphorus: 41.8
 *                phosphorusUnits: 61
 *                potassium: 22.5
 *                potassiumUnits: 69
 *                sulfur: 12.6
 *                sulfurUnits: 65
 *                inputType: [
 *                    248,
 *                    249
 *                ]
 *                dateOfApplication: 10/03/2022
 *                stage: 276
 *                limingMaterial: [
 *                    118,
 *                    119
 *                ]
 *                totalLimeApplied: 123.0
 *                totalLimeAppliedUnits: 71
 *                limingRate: 41.0
 *                limingRateUnits: 78
 *                limingApplicationFrequency: 251
 *                soilApplicationMethod: [
 *                    286,
 *                    287
 *                ]
 *                organicInputsData: [
 *                  {
 *                    applicationFrequency: 269,
 *                    applicationMethod: [258, 259],
 *                    applicationRate: 100,
 *                    applicationRateUnit: 11,
 *                    organicInputId: 235,
 *                    totalPoultryLitterAmount: 600,
 *                    totalPoultryLitterAmountUnit: 15,
 *                    requestIdOrganicInputs:1
 *                  }
 *                ]
 *                syntheticFertilizersData: [
 *                  {
 *                    applicationMethod: [258, 259],
 *                    nitrogenContent: 10,
 *                    nitrogenContentUnit: 16,
 *                    npkApplicationRate: 100,
 *                    npkApplicationRateUnit: 10,
 *                    phosphorusContent: 26,
 *                    phosphorusContentUnit: 16,
 *                    potassiumContent: 26,
 *                    potassiumContentUnit: 16,
 *                    syntheticFertilizerId: 171,
 *                    totalNPKAmount: 500,
 *                    totalNPKAmountUnit: 10,
 *                    requestIdSyntheticFertilizer: 1
 *                  }
 *                ]
 *                daysAfterSowing: 30
 *                cropHeight: 915.12
 *                cropHeightUnits: 12
 *                recordId: "123ABC"
 *     responses:
 *       200:
 *         description: Successfully return the pre-signed url
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   success:
 *                     type: boolean
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *               example:
 *                  success: true
 *                  code: 200
 *                  message: Soil management data saved successfully.
 *                  data: {
 *                    id: 1
 *                  }
 *
 */
router.post(
  '/',
  auth,
  duplicateRecordId.handleDuplicateRecordId('SoilManagement'),
  validatorSoilMgmt.general(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const userId = req.user.id;
      let {
        farm,
        farmIds,
        segment,
        segmentIds = [],
        area,
        areaUnits,
        cropType,
        cropVariety,
        soilType,
        doneSoilTestingBefore,
        soilHealth,
        ph,
        soilOrganicCarbon,
        nitrogen,
        nitrogenUnits,
        phosphorus,
        phosphorusUnits,
        potassium,
        potassiumUnits,
        sulfur,
        sulfurUnits,
        inputType,
        dateOfApplication,
        stage,
        limingMaterial,
        totalLimeApplied,
        totalLimeAppliedUnits,
        limingRate,
        limingRateUnits,
        limingApplicationFrequency,
        soilApplicationMethod,
        organicInputsData,
        // check to see if it can be deprecated
        organicInputs,
        totalOrganicInputApplied,
        totalOrganicInputAppliedUnit,
        organicInputsApplicationRate,
        organicInputsApplicationRateUnit,
        organicInputsApplicationFrequency,
        organicApplicationMethod,
        //
        // check to see if it can be deprecated
        syntheticFertilizers,
        nitrogenContent,
        phosphorusContent,
        potassiumContent,
        totalSyntheticFertilizerUsed,
        totalSyntheticFertilizerUsedUnit,
        syntheticFertilizerApplicationRate,
        syntheticFertilizerApplicationRateUnit,
        syntheticApplicationMethod,
        //
        syntheticFertilizersData,
        daysAfterSowing,
        cropHeight,
        cropHeightUnits,
        recordId,
      } = req.body;

// return
      const transaction = await db.sequelize.transaction();
      try {
        const set = {
          userId,
          farm,
          segment,
          area,
          areaUnits,
          cropType,
          cropVariety,
          soilType,
          doneSoilTestingBefore,
          ph,
          soilHealth,
          soilOrganicCarbon,
          nitrogen,
          nitrogenUnits,
          phosphorus,
          phosphorusUnits,
          potassium,
          potassiumUnits,
          sulfur,
          sulfurUnits,
          inputType,
          dateOfApplication: dateOfApplication
            ? moment.utc(dateOfApplication, 'DD/MM/YYYY')
            : null,
          stage,
          limingMaterial,
          totalLimeApplied,
          totalLimeAppliedUnits,
          limingRate,
          limingRateUnits,
          limingApplicationFrequency,
          soilApplicationMethod,
          organicInputs,
          totalOrganicInputApplied,
          totalOrganicInputAppliedUnit,
          organicInputsApplicationRate,
          organicInputsApplicationRateUnit,
          organicInputsApplicationFrequency,
          organicApplicationMethod,
          syntheticFertilizers,
          nitrogenContent,
          phosphorusContent,
          potassiumContent,
          totalSyntheticFertilizerUsed,
          totalSyntheticFertilizerUsedUnit,
          syntheticFertilizerApplicationRate,
          syntheticFertilizerApplicationRateUnit,
          syntheticApplicationMethod,
          daysAfterSowing,
          cropHeight,
          cropHeightUnits,
          recordId,
        };
        Object.keys(set).forEach((key) => {
          set[key] == undefined ||
          set[key] == null ||
          set[key]?.toString().trim() == ''
            ? delete set[key]
            : {};
        });

        let soilManagement = await db.SoilManagement.create(set, {
          transaction,
        });

        const soilManagementFarmsData = farmIds?.map(_farmId => {
          return {
            farmId: _farmId,
            soilManagementId: soilManagement.id,
          }
        })||[];
        await db.SoilManagementFarm.bulkCreate(soilManagementFarmsData, {
          transaction,
        });

        if (segmentIds && segmentIds.length) {
          const soilManagementSegmentsData = segmentIds?.map(segmentId => {
            return {
              segmentId: segmentId,
              soilManagementId: soilManagement.id,
            }
          });
          await db.SoilManagementSegment.bulkCreate(soilManagementSegmentsData, {
            transaction,
          });
        }

        // save multiple options values
        const type = {
          cropVariety: 'crop_variety',
          soilType: 'soil_type',
          inputType: 'input_type',
          organicInputs: 'organic_inputs',
          limingMaterial: 'liming_material',
          syntheticFertilizers: 'synthetic_fertilizers',
          syntheticApplicationMethod: 'synthetic_application_method',
          organicApplicationMethod: 'organic_application_method',
          soilApplicationMethod: 'soil_application_method',
        };
        await Promise.all(
          Object.keys(type).map((field) => {
            if (Array.isArray(req.body[field])) {
              let set = req.body[field].map((option) => {
                return {
                  optionId: option,
                  type: type[field],
                  soilManagementId: soilManagement.id,
                  createdAt: moment.utc(),
                  updatedAt: moment.utc(),
                };
              });
              return db.MapSoilManagementOption.bulkCreate(set, {
                transaction,
              });
            }
          })
        );

        if (syntheticFertilizersData && syntheticFertilizersData.length) {
          const syntheticFertilizers = await Promise.all(
            syntheticFertilizersData.map( async data => {
              // let syntheticFertilizerId = data.syntheticFertilizerId;
              // data.requestStatusSyntheticFertilizer
              // syntheticFertilizerId = await syntheticFertilizerSync({name: data.name, requestId: data.requestIdSyntheticFertilizer, userId });
              // data.requestStatusSyntheticFertilizer = syntheticFertilizerId;         
              // data.syntheticFertilizerId = syntheticFertilizerId;
              return db.SoilManagementSyntheticFertilizer.create({
                ...data,
                soilManagementId: soilManagement.id,
              }, { transaction })
            })
          );

          await Promise.all(
            syntheticFertilizers.map(syntheticFertilizer => {
              return syntheticFertilizer.applicationMethod.map(methodId => {
                return db.SoilManagementApplicationMethod.create({
                  applicationMethodId: methodId,
                  soilManagementId: soilManagement.id,
                  syntheticFertilizerId: syntheticFertilizer.id,
                })
              })
            })
          );
        }

        if (organicInputsData && organicInputsData.length) {
          const organicInputs = await Promise.all(
            organicInputsData.map(async data => {
              // let organicInputId = data.organicInputId;
              // organicInputId = await organicInputSync({name: data.name, requestId: data.requestIdOrganicInputs, userId });
              // data.requestStatusOrganicInputs = organicInputId;
              // data.organicInputId = organicInputId;
              return db.SoilManagementOrganicInput.create({
                ...data,
                soilManagementId: soilManagement.id,
              }, { transaction })
            })
          );


          await Promise.all(
            organicInputs.map(organicInput => {
              return organicInput.applicationMethod.map(methodId => {
                return db.SoilManagementApplicationMethod.create({
                  applicationMethodId: methodId,
                  organicInputId: organicInput.id,
                  soilManagementId: soilManagement.id,
                })
              })
            })
          );
        }

        await transaction.commit();

        return res.json(
          await successResp({
            data: { id: soilManagement.id },
            msg: success.SOILMANAGEMENTDATA_ADDED,
          })
        );
      } catch (err) {
        await transaction?.rollback();
        logErrorOccurred(__filename, err);
        return serverError(res, err);
      }
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

async function syntheticFertilizerSync(obj){
  let fertilizerAdd;
  const {requestId, name, userId} = obj, n = "0%", p = "0%", k = "0%";
  const getFertilizerByRequestId = await db.SyntheticFertilizers.findOne({ where: {
    requestId
  }});
  if(getFertilizerByRequestId){
    const fertilizerUpdate = await db.SyntheticFertilizers.update({
      name,
      n,
      p,
      k,
      userId
    },{ where: {
      requestId
    }});
    if(fertilizerUpdate){
       fertilizerAdd = getFertilizerByRequestId;
    }
  }else{
     fertilizerAdd = await db.SyntheticFertilizers.create({    
      userId,
      name,
      n,
      p,
      k,
      requestId
   }); 
  }

  return fertilizerAdd.id;
}

async function organicInputSync(obj){
  let fertilizerAdd;
  const {requestId, name, userId} = obj;
  const getFertilizerByRequestId = await db.OrganicInputs.findOne({ where: {
    requestId
  } });
  if(getFertilizerByRequestId){
    const fertilizerUpdate = await db.OrganicInputs.update({
      name,
      userId
    },{ where: {
      requestId
    }});
    if(fertilizerUpdate){
       fertilizerAdd = getFertilizerByRequestId;
    }
  }else{        
     fertilizerAdd = await db.OrganicInputs.create({    
      userId,
      name,
      requestId
   }); 
  }

  return fertilizerAdd.id;
}

/**
 * @swagger
 * /soil/management/list:
 *   get:
 *     description: List all register soil informations(soil management)
 *     tags: [Soil Management]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDgxODYyNTQsImV4cCI6MTY0ODI0NjI1NH0.ZpH6Y3CcHTaAkLtJtFQqsbe40kWhup299AHJqhNjG1g'
 *      - in: query
 *        name: page
 *        schema:
 *          type: int
 *        example:
 *          1
 *      - in: query
 *        name: limit
 *        schema:
 *          type: int
 *        example:
 *          10
 *     responses:
 *       200:
 *         description: On success response if data is present related to soil management.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   success:
 *                     type: boolean
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *               example:
 *                 success: true
 *                 code: 200
 *                 message: Fetched successfully.
 *                 data:
 *                   count: 1
 *                   rows:
 *                   - id: 16
 *                     area: 1.098
 *                     soilManagementFarms: [{id: 406, farmName: 'Sams farm'}]
 *                     soilManagementSegments: [{id: 148, geofenceName: 'test', farmId: 521, farm: {id: 521, farmName: 'cacac'}}]
 *                     areaUnits: 10
 *                     cropType: 54
 *                     doneSoilTestingBefore: true
 *                     ph: 55
 *                     soilOrganicCarbon: 58
 *                     nitrogen: 23.5
 *                     nitrogenUnits: 58
 *                     phosphorus: 41.8
 *                     phosphorusUnits: 61
 *                     potassium: 22.5
 *                     potassiumUnits: 69
 *                     sulfur: 12.6
 *                     sulfurUnits: 65
 *                     dateOfApplication: '2022-03-09T19:00:00.000Z'
 *                     stage: 276
 *                     totalLimeApplied: 123
 *                     totalLimeAppliedUnits: 71
 *                     limingRate: 41
 *                     limingRateUnits: 78
 *                     limingApplicationFrequency: 251
 *                     organicInputsData: [
 *                      {
 *                        applicationMethods: [
 *                          {
 *                            id: 258,
 *                            name: Fertigation
 *                          }
 *                        ],
 *                        applicationFrequency: 269,
 *                        applicationFrequencyData: {
 *                          id: 269,
 *                          name: Green manure (clover, pigeon peas, e.t.c)
 *                        },
 *                        applicationRate: 100,
 *                        applicationRateUnit: 11,
 *                        applicationRateUnitData: {
 *                           id: 84,
 *                           name: mg/l,
 *                           abbvr: mg/l,
 *                           unitType: 28,
 *                           factor: ,
 *                        },
 *                        id: 1,
 *                        organicInputId: 235,
 *                        organicInput: {
 *                          id: 235,
 *                          name: Cattle farm yard manure
 *                        },
 *                        soilManagementId: 256,
 *                        totalPoultryLitterAmount: 600,
 *                        totalPoultryLitterAmountUnit: 15,
 *                        totalPoultryLitterAmountUnitData: {
 *                           id: 84,
 *                           name: mg/l,
 *                           abbvr: mg/l,
 *                           unitType: 28,
 *                           factor: ,
 *                        }
 *                      }
 *                     ]
 *                     syntheticFertilizersData: [
 *                       {
 *                         applicationMethods: [
 *                          {
 *                            id: 258,
 *                            name: Fertigation
 *                          },
 *                          {
 *                            id: 259,
 *                            name: Direct injection
 *                          }
 *                         ],
 *                         id: 1,
 *                         nitrogenContent: 10,
 *                         nitrogenContentUnit: 16,
 *                         nitrogenContentUnitData: {
 *                           id: 84,
 *                           name: mg/l,
 *                           abbvr: mg/l,
 *                           unitType: 28,
 *                           factor: ,
 *                         },
 *                         npkApplicationRate: 100,
 *                         npkApplicationRateUnit: 10,
 *                         npkApplicationRateUnitData: {
 *                           id: 84,
 *                           name: mg/l,
 *                           abbvr: mg/l,
 *                           unitType: 28,
 *                           factor: ,
 *                         },
 *                         phosphorusContent: 26,
 *                         phosphorusContentUnit: 16,
 *                         phosphorusContentUnitData: {
 *                           id: 84,
 *                           name: mg/l,
 *                           abbvr: mg/l,
 *                           unitType: 28,
 *                           factor: ,
 *                         },
 *                         potassiumContent: 26,
 *                         potassiumContentUnit: 16,
 *                         potassiumContentUnitData: {
 *                           id: 84,
 *                           name: mg/l,
 *                           abbvr: mg/l,
 *                           unitType: 28,
 *                           factor: ,
 *                         },
 *                         soilManagementId: 256,
 *                         syntheticFertilizerId: 5,
 *                         syntheticFertilizer: {
 *                           id: 171,
 *                           name: Urea
 *                         },
 *                         totalNPKAmount: 500,
 *                         totalNPKAmountUnit: 10,
 *                         totalNPKAmountUnitData: {
 *                           id: 84,
 *                           name: mg/l,
 *                           abbvr: mg/l,
 *                           unitType: 28,
 *                           factor: ,
 *                         }
 *                       }
 *                     ]
 *                     createdAt: '2022-03-25T02:16:37.000Z'
 *                     soil_type:
 *                     - id: 4
 *                       name: Silt soil
 *                     - id: 5
 *                       name: Peat soil
 *                     segment_data:
 *                     user_farm:
 *                       id: 406
 *                       farmName: Sams farm
 *                       registrationNo: '201'
 *                     crop_variety:
 *                     - id: 22
 *                       name: variety 1
 *                     organic_inputs_application_frequency:
 *                       id: 269
 *                       name: Green manure (clover, pigeon peas, e.t.c)
 *                     input_type:
 *                     - id: 248
 *                       name: Tillering
 *                     - id: 249
 *                       name: Flowering
 *                     liming_material:
 *                     - id: 118
 *                       name: Burnt lime
 *                     - id: 119
 *                       name: Magnesite
 *                     soil_application_method:
 *                     - id: 286
 *                       name: Side dressing
 *                     - id: 287
 *                       name: Banding
 *                     soil_application_stage:
 *                       id: 276
 *                       name: Bi-annually
 *                     crop_type:
 *                       id: 54
 *                       name: rice
 *                     liming_application_frequency:
 *                       id: 251
 *                       name: Ripening
 *                     area_units:
 *                       id: 10
 *                       name: Acre
 *                       abbvr: Acre
 *                       unitType: 5
 *                       factor:
 *                     nitrogen_units:
 *                     sulfur_units:
 *                     potassium_units:
 *                     phosphorus_units:
 *                     total_lime_applied_units:
 *                     liming_rate_units:
 *                     organic_inputs_application_rate_unit:
 *                     synthetic_fertilizer_application_rate_unit:
 *                       id: 86
 *                       name: ppm
 *                       abbvr: ppm
 *                       unitType: 28
 *                       factor: '1.0011423030'
 *                     total_synthetic_fertilizer_used_unit:
 *                       id: 84
 *                       name: mg/l
 *                       abbvr: mg/l
 *                       unitType: 28
 *                       factor:
 *                     total_organic_input_applied_unit:
 *                     bulk_density_unit:
 *                     recordId: "123ABC"
 */
router.get(
  '/list',
  auth,
  validate.listValidation(),
  validationErrorHandler,
  async (req, res) => {
    try {
      let { page, limit, col = 'id', desc = 'true' } = req.query;
      let { id: userId } = req.user;
      limit = parseInt(limit);
      console.log(userId, '----------------------------------');
      let soilManagementList = await db.SoilManagement.findAndCountAll({
        // attributes: ['id'],
        attributes: {
          exclude: [
            ...deprecatedFields,
            'userId',
            'updatedAt',
            'cropVariety',
            'soilType',
            'inputType',
            'limingMaterial',
            'soilApplicationMethod',
          ],
        },
        where: { userId },
        offset: (page - 1) * limit,
        limit: limit,
        distinct: true,
        order: [[col, desc == 'false' ? 'ASC' : 'DESC']],

        include: [
          // with multiple option table start
          {
            model: db.SoilType,
            as: 'soil_type',
            attributes: ['id', 'name'],
            through: { attributes: [], where: { type: 'soil_type' } },
          },
          {
            model: db.user_farm,
            as: 'soilManagementFarms',
            through: { model: db.SoilManagementFarm, attributes: []},
            attributes: ['id', 'farmName'],
          },
          {
            model: db.Geofence,
            as: 'soilManagementSegments',
            through: { model: db.SoilManagementSegment, attributes: [] },
            attributes: ['id', 'geofenceName', 'farmId'],
            include: [
              {
                model: db.user_farm,
                as: 'farm',
                attributes: ['id', 'farmName'],
              },
            ],
          },
          {
            model: db.Geofence,
            as: 'segment_data',
            attributes: ['id', 'geofenceName'],
          },
          {
            model: db.user_farm,
            as: 'user_farm',
            attributes: ['id', 'farmName', 'registrationNo'],
          },
          {
            model: db.Crop,
            as: 'crop_variety',
            attributes: ['id', 'name'],
            through: { attributes: [], where: { type: 'crop_variety' } },
          },
          {
            model: db.Option,
            as: 'organic_inputs_application_frequency',
            attributes: ['id', 'name'],
          },
          {
            model: db.Option,
            as: 'input_type',
            attributes: ['id', 'name'],
            through: { attributes: [], where: { type: 'input_type' } },
          },
          {
            model: db.Option,
            as: 'liming_material',
            attributes: ['id', 'name'],
            through: { attributes: [], where: { type: 'liming_material' } },
          },
          {
            model: db.Option,
            as: 'organic_inputs',
            attributes: ['id', 'name'],
            through: { attributes: [], where: { type: 'organic_inputs' } },
          },
          {
            model: db.Option,
            as: 'synthetic_fertilizers',
            attributes: ['id', 'name'],
            through: {
              attributes: [],
              where: { type: 'synthetic_fertilizers' },
            },
          },
          {
            model: db.Option,
            as: 'synthetic_application_method',
            attributes: ['id', 'name'],
            through: {
              attributes: [],
              where: { type: 'synthetic_application_method' },
            },
          },
          {
            model: db.Option,
            as: 'organic_application_method',
            attributes: ['id', 'name'],
            through: {
              attributes: [],
              where: { type: 'organic_application_method' },
            },
          },
          {
            model: db.Option,
            as: 'soil_application_method',
            attributes: ['id', 'name'],
            through: {
              attributes: [],
              where: { type: 'soil_application_method' },
            },
          },
          // with option table ends
          {
            model: db.Option,
            as: 'soil_application_stage',
            attributes: ['id', 'name'],
          },
          {
            model: db.Option,
            as: 'crop_type',
            attributes: ['id', 'name'],
          },
          {
            model: db.Option,
            as: 'liming_application_frequency',
            attributes: ['id', 'name'],
          },
          {
            as: 'organicInputsData',
            attributes: { exclude: 'applicationMethod' },
            model: db.SoilManagementOrganicInput,
            include: [
              {
                model: db.Option,
                as: 'organicInput',
                attributes: ['id', 'name'],
                // where: { groupName: 'soil-organic-input' },,
              },
              {      // this is above objetct's replacement, above one can be removed
                model: db.OrganicInputs,
                as: "organicInputName",
                attributes: ['id', 'name'],
              },
              {
                as: 'applicationFrequencyData',
                attributes: ['id', 'name'],
                model: db.Option,
              },
              {
                model: db.Option,
                as: 'applicationMethods',
                through: {
                  model: db.SoilManagementApplicationMethod,
                  attributes: [],
                },
                attributes: ['id', 'name'],
              },
              {
                as: 'applicationRateUnitData',
                attributes: ['id', 'name', 'abbvr', 'unitType', 'factor'],
                model: db.UnitsList,
              },
              {
                as: 'totalPoultryLitterAmountUnitData',
                attributes: ['id', 'name', 'abbvr', 'unitType', 'factor'],
                model: db.UnitsList,
              },
            ],
          },
          {
            as: 'syntheticFertilizersData',
            attributes: { exclude: 'applicationMethod' },
            model: db.SoilManagementSyntheticFertilizer,
            include: [
              {
                model: db.Option,
                as: 'syntheticFertilizer',
                attributes: ['id', 'name'],
                // where: { groupName: 'soil-fertilizer' },,
              },
              {   // this is above objetct's replacement, above one can be removed
                model: db.SyntheticFertilizers,
                as: 'syntheticFertilizerName',
                attributes: ['id', 'name', 'n', 'p', 'k'],
                // where: { groupName: 'soil-fertilizer' },,
              },
              {
                model: db.Option,
                as: 'applicationMethods',
                through: {
                  model: db.SoilManagementApplicationMethod,
                  attributes: [],
                },
                attributes: ['id', 'name'],
              },
              {
                as: 'nitrogenContentUnitData',
                attributes: ['id', 'name', 'abbvr', 'unitType', 'factor'],
                model: db.UnitsList,
              },
              {
                as: 'npkApplicationRateUnitData',
                attributes: ['id', 'name', 'abbvr', 'unitType', 'factor'],
                model: db.UnitsList,
              },
              {
                as: 'phosphorusContentUnitData',
                attributes: ['id', 'name', 'abbvr', 'unitType', 'factor'],
                model: db.UnitsList,
              },
              {
                as: 'potassiumContentUnitData',
                attributes: ['id', 'name', 'abbvr', 'unitType', 'factor'],
                model: db.UnitsList,
              },
              {
                as: 'totalNPKAmountUnitData',
                attributes: ['id', 'name', 'abbvr', 'unitType', 'factor'],
                model: db.UnitsList,
              },
            ],
          },          {
            model: db.UnitsList,
            as: 'crop_height_units',
            attributes: ['id', 'name', 'abbvr', 'unitType', 'factor'],
          },
          {
            model: db.UnitsList,
            as: 'area_units',
            attributes: ['id', 'name', 'abbvr', 'unitType', 'factor'],
          },
          {
            model: db.UnitsList,
            as: 'nitrogen_units',
            attributes: ['id', 'name', 'abbvr', 'unitType', 'factor'],
          },
          {
            model: db.UnitsList,
            as: 'sulfur_units',
            attributes: ['id', 'name', 'abbvr', 'unitType', 'factor'],
          },
          {
            model: db.UnitsList,
            as: 'potassium_units',
            attributes: ['id', 'name', 'abbvr', 'unitType', 'factor'],
          },
          {
            model: db.UnitsList,
            as: 'phosphorus_units',
            attributes: ['id', 'name', 'abbvr', 'unitType', 'factor'],
          },
          {
            model: db.UnitsList,
            as: 'total_lime_applied_units',
            attributes: ['id', 'name', 'abbvr', 'unitType', 'factor'],
          },
          {
            model: db.UnitsList,
            as: 'liming_rate_units',
            attributes: ['id', 'name', 'abbvr', 'unitType', 'factor'],
          },
          {
            model: db.UnitsList,
            as: 'organic_inputs_application_rate_unit',
            attributes: ['id', 'name', 'abbvr', 'unitType', 'factor'],
          },
          {
            model: db.UnitsList,
            as: 'synthetic_fertilizer_application_rate_unit',
            attributes: ['id', 'name', 'abbvr', 'unitType', 'factor'],
          },
          {
            model: db.UnitsList,
            as: 'total_synthetic_fertilizer_used_unit',
            attributes: ['id', 'name', 'abbvr', 'unitType', 'factor'],
          },
          {
            model: db.UnitsList,
            as: 'total_organic_input_applied_unit',
            attributes: ['id', 'name', 'abbvr', 'unitType', 'factor'],
          },
          {
            model: db.UnitsList,
            as: 'bulk_density_unit',
            attributes: ['id', 'name', 'abbvr', 'unitType', 'factor'],
          },
        ],
      });
      // console.log(soilManagementList.rows[0].syntheticFertilizersData, '----------------------------------');

// console.log(soilManagementList);
      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: soilManagementList,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);


/**
 * @swagger
 * /soil/management/{id}:
 *   get:
 *     description: Fetch details of the register soil data with id(soil management)
 *     tags: [Soil Management]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDgxODYyNTQsImV4cCI6MTY0ODI0NjI1NH0.ZpH6Y3CcHTaAkLtJtFQqsbe40kWhup299AHJqhNjG1g'
 *      - in: path
 *        name: id
 *        schema:
 *          type: int
 *          minimum: 1
 *        example:
 *          1
 *     responses:
 *       200:
 *         description: On success response if data is present related to the id.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   success:
 *                     type: boolean
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *               example:
 *                 success: true
 *                 code: 200
 *                 message: Fetched successfully.
 *                 data:
 *                     id: 16
 *                     area: 1.098
 *                     soilManagementFarms: [{id: 406, farmName: 'Sams farm'}]
 *                     soilManagementSegments: [{id: 148, geofenceName: 'test', farmId: 521, farm: {id: 521, farmName: 'cacac'}}]
 *                     areaUnits: 10
 *                     cropType: 54
 *                     doneSoilTestingBefore: true
 *                     ph: 55
 *                     soilOrganicCarbon: 58
 *                     nitrogen: 23.5
 *                     nitrogenUnits: 58
 *                     phosphorus: 41.8
 *                     phosphorusUnits: 61
 *                     potassium: 22.5
 *                     potassiumUnits: 69
 *                     sulfur: 12.6
 *                     sulfurUnits: 65
 *                     dateOfApplication: '2022-03-09T19:00:00.000Z'
 *                     stage: 276
 *                     totalLimeApplied: 123
 *                     totalLimeAppliedUnits: 71
 *                     limingRate: 41
 *                     limingRateUnits: 78
 *                     limingApplicationFrequency: 251
 *                     organicInputsData: [
 *                      {
 *                        applicationMethods: [
 *                          {
 *                            id: 258,
 *                            name: Fertigation
 *                          }
 *                        ],
 *                        applicationFrequency: 269,
 *                        applicationFrequencyData: {
 *                          id: 269,
 *                          name: Green manure (clover, pigeon peas, e.t.c)
 *                        },
 *                        applicationRate: 100,
 *                        applicationRateUnit: 11,
 *                        applicationRateUnitData: {
 *                           id: 84,
 *                           name: mg/l,
 *                           abbvr: mg/l,
 *                           unitType: 28,
 *                           factor: ,
 *                        },
 *                        id: 1,
 *                        organicInputId: 235,
 *                        organicInput: {
 *                          id: 235,
 *                          name: Cattle farm yard manure
 *                        },
 *                        soilManagementId: 256,
 *                        totalPoultryLitterAmount: 600,
 *                        totalPoultryLitterAmountUnit: 15,
 *                        totalPoultryLitterAmountUnitData: {
 *                           id: 84,
 *                           name: mg/l,
 *                           abbvr: mg/l,
 *                           unitType: 28,
 *                           factor: ,
 *                        }
 *                      }
 *                     ]
 *                     syntheticFertilizersData: [
 *                       {
 *                         applicationMethods: [
 *                          {
 *                            id: 258,
 *                            name: Fertigation
 *                          },
 *                          {
 *                             id: 259,
 *                             name: Direct injection
 *                          }
 *                         ],
 *                         id: 1,
 *                         nitrogenContent: 10,
 *                         nitrogenContentUnit: 16,
 *                         nitrogenContentUnitData: {
 *                           id: 84,
 *                           name: mg/l,
 *                           abbvr: mg/l,
 *                           unitType: 28,
 *                           factor: ,
 *                         },
 *                         npkApplicationRate: 100,
 *                         npkApplicationRateUnit: 10,
 *                         npkApplicationRateUnitData: {
 *                           id: 84,
 *                           name: mg/l,
 *                           abbvr: mg/l,
 *                           unitType: 28,
 *                           factor: ,
 *                         },
 *                         phosphorusContent: 26,
 *                         phosphorusContentUnit: 16,
 *                         phosphorusContentUnitData: {
 *                           id: 84,
 *                           name: mg/l,
 *                           abbvr: mg/l,
 *                           unitType: 28,
 *                           factor: ,
 *                         },
 *                         potassiumContent: 26,
 *                         potassiumContentUnit: 16,
 *                         potassiumContentUnitData: {
 *                           id: 84,
 *                           name: mg/l,
 *                           abbvr: mg/l,
 *                           unitType: 28,
 *                           factor: ,
 *                         },
 *                         soilManagementId: 256,
 *                         syntheticFertilizerId: 5,
 *                         syntheticFertilizer: {
 *                           id: 171,
 *                           name: Urea
 *                         },
 *                         totalNPKAmount: 500,
 *                         totalNPKAmountUnit: 10,
 *                         totalNPKAmountUnitData: {
 *                           id: 84,
 *                           name: mg/l,
 *                           abbvr: mg/l,
 *                           unitType: 28,
 *                           factor: ,
 *                         }
 *                       }
 *                     ]                    
 *                     createdAt: '2022-03-25T02:16:37.000Z'
 *                     soil_type:
 *                     - id: 4
 *                       name: Silt soil
 *                     - id: 5
 *                       name: Peat soil
 *                     segment_data:
 *                     user_farm:
 *                       id: 406
 *                       farmName: Sams farm
 *                       registrationNo: '201'
 *                     crop_variety:
 *                     - id: 22
 *                       name: variety 1
 *                     organic_inputs_application_frequency:
 *                       id: 269
 *                       name: Green manure (clover, pigeon peas, e.t.c)
 *                     input_type:
 *                     - id: 248
 *                       name: Tillering
 *                     - id: 249
 *                       name: Flowering
 *                     liming_material:
 *                     - id: 118
 *                       name: Burnt lime
 *                     - id: 119
 *                       name: Magnesite
 *                     soil_application_method:
 *                     - id: 286
 *                       name: Side dressing
 *                     - id: 287
 *                       name: Banding
 *                     soil_application_stage:
 *                       id: 276
 *                       name: Bi-annually
 *                     crop_type:
 *                       id: 54
 *                       name: rice
 *                     liming_application_frequency:
 *                       id: 251
 *                       name: Ripening
 *                     area_units:
 *                       id: 10
 *                       name: Acre
 *                       abbvr: Acre
 *                       unitType: 5
 *                       factor:
 *                     nitrogen_units:
 *                     sulfur_units:
 *                     potassium_units:
 *                     phosphorus_units:
 *                     total_lime_applied_units:
 *                     liming_rate_units:
 *                     organic_inputs_application_rate_unit:
 *                     synthetic_fertilizer_application_rate_unit:
 *                       id: 86
 *                       name: ppm
 *                       abbvr: ppm
 *                       unitType: 28
 *                       factor: '1.0011423030'
 *                     total_synthetic_fertilizer_used_unit:
 *                       id: 84
 *                       name: mg/l
 *                       abbvr: mg/l
 *                       unitType: 28
 *                       factor:
 *                     total_organic_input_applied_unit:
 *                     bulk_density_unit:
 *                     recordId: "123ABC"
 */
router.get(
  '/:id',
  auth,
  validatorSoilMgmt.exist(),
  validationErrorHandler,
  async function (req, res) {
    try {
      let { id: userId } = req.user;
      let { id } = req.params;

      let soilManagementList = await db.SoilManagement.findOne({
        attributes: { exclude: [
          ...deprecatedFields,
          'userId',
          'updatedAt'
        ] },
        where: { id, userId },
        include: [
          {
            model: db.user_farm,
            as: 'soilManagementFarms',
            through: { model: db.SoilManagementFarm, attributes: []},
            attributes: ['id', 'farmName'],
          },
          {
            model: db.Geofence,
            as: 'soilManagementSegments',
            through: { model: db.SoilManagementSegment, attributes: [] },
            attributes: ['id', 'geofenceName', 'farmId'],
            include: [
              {
                model: db.user_farm,
                as: 'farm',
                attributes: ['id', 'farmName'],
              },
            ],
          },
          // with option table start
          {
            model: db.SoilType,
            as: 'soil_type',
            attributes: ['id', 'name'],
            through: { attributes: [], where: { type: 'soil_type' } },
          },
          {
            model: db.Geofence,
            as: 'segment_data',
            attributes: ['id', 'geofenceName'],
          },
          {
            model: db.user_farm,
            as: 'user_farm',
            attributes: ['id', 'farmName', 'registrationNo'],
          },
          {
            model: db.Crop,
            as: 'crop_variety',
            attributes: ['id', 'name'],
            through: { attributes: [], where: { type: 'crop_variety' } },
          },
          {
            model: db.Option,
            as: 'organic_inputs_application_frequency',
            attributes: ['id', 'name'],
          },
          {
            model: db.Option,
            as: 'input_type',
            attributes: ['id', 'name'],
            through: { attributes: [], where: { type: 'input_type' } },
          },
          {
            model: db.Option,
            as: 'liming_material',
            attributes: ['id', 'name'],
            through: { attributes: [], where: { type: 'liming_material' } },
          },
          {
            model: db.Option,
            as: 'organic_inputs',
            attributes: ['id', 'name'],
            through: { attributes: [], where: { type: 'organic_inputs' } },
          },
          {
            model: db.Option,
            as: 'synthetic_fertilizers',
            attributes: ['id', 'name'],
            through: {
              attributes: [],
              where: { type: 'synthetic_fertilizers' },
            },
          },
          {
            model: db.Option,
            as: 'synthetic_application_method',
            attributes: ['id', 'name'],
            through: {
              attributes: [],
              where: { type: 'synthetic_application_method' },
            },
          },
          {
            model: db.Option,
            as: 'organic_application_method',
            attributes: ['id', 'name'],
            through: {
              attributes: [],
              where: { type: 'organic_application_method' },
            },
          },
          {
            model: db.Option,
            as: 'soil_application_method',
            attributes: ['id', 'name'],
            through: {
              attributes: [],
              where: { type: 'soil_application_method' },
            },
          },
          // with option table ends
          {
            model: db.Option,
            as: 'soil_application_stage',
            attributes: ['id', 'name'],
          },
          {
            model: db.Option,
            as: 'crop_type',
            attributes: ['id', 'name'],
          },
          {
            model: db.Option,
            as: 'liming_application_frequency',
            attributes: ['id', 'name'],
          },
          {
            as: 'organicInputsData',
            attributes: { exclude: 'applicationMethod' },
            model: db.SoilManagementOrganicInput,
            include: [
              {
                model: db.Option,
                as: 'organicInput',
                attributes: ['id', 'name'],
                // where: { groupName: 'soil-organic-input' },,
              },
              {
                as: 'applicationFrequencyData',
                attributes: ['id', 'name'],
                model: db.Option,
              },
              {
                model: db.Option,
                as: 'applicationMethods',
                through: {
                  model: db.SoilManagementApplicationMethod,
                  attributes: [],
                },
                attributes: ['id', 'name'],
              },
              {
                as: 'applicationRateUnitData',
                attributes: ['id', 'name', 'abbvr', 'unitType', 'factor'],
                model: db.UnitsList,
              },
              {
                as: 'totalPoultryLitterAmountUnitData',
                attributes: ['id', 'name', 'abbvr', 'unitType', 'factor'],
                model: db.UnitsList,
              },
            ],
          },
          {
            as: 'syntheticFertilizersData',
            attributes: { exclude: 'applicationMethod' },
            model: db.SoilManagementSyntheticFertilizer,
            include: [
              {
                model: db.Option,
                as: 'syntheticFertilizer',
                attributes: ['id', 'name'],
                // where: { groupName: 'soil-fertilizer' },,
              },
              {
                model: db.Option,
                as: 'applicationMethods',
                through: {
                  model: db.SoilManagementApplicationMethod,
                  attributes: [],
                },
                attributes: ['id', 'name'],
              },
              {
                as: 'nitrogenContentUnitData',
                attributes: ['id', 'name', 'abbvr', 'unitType', 'factor'],
                model: db.UnitsList,
              },
              {
                as: 'npkApplicationRateUnitData',
                attributes: ['id', 'name', 'abbvr', 'unitType', 'factor'],
                model: db.UnitsList,
              },
              {
                as: 'phosphorusContentUnitData',
                attributes: ['id', 'name', 'abbvr', 'unitType', 'factor'],
                model: db.UnitsList,
              },
              {
                as: 'potassiumContentUnitData',
                attributes: ['id', 'name', 'abbvr', 'unitType', 'factor'],
                model: db.UnitsList,
              },
              {
                as: 'totalNPKAmountUnitData',
                attributes: ['id', 'name', 'abbvr', 'unitType', 'factor'],
                model: db.UnitsList,
              },
            ],
          },
          {
            model: db.UnitsList,
            as: 'nitrogen_units',
            attributes: ['id', 'name', 'abbvr', 'unitType', 'factor'],
          },
          {
            model: db.UnitsList,
            as: 'sulfur_units',
            attributes: ['id', 'name', 'abbvr', 'unitType', 'factor'],
          },
          {
            model: db.UnitsList,
            as: 'potassium_units',
            attributes: ['id', 'name', 'abbvr', 'unitType', 'factor'],
          },
          {
            model: db.UnitsList,
            as: 'phosphorus_units',
            attributes: ['id', 'name', 'abbvr', 'unitType', 'factor'],
          },
          {
            model: db.UnitsList,
            as: 'total_lime_applied_units',
            attributes: ['id', 'name', 'abbvr', 'unitType', 'factor'],
          },
          {
            model: db.UnitsList,
            as: 'liming_rate_units',
            attributes: ['id', 'name', 'abbvr', 'unitType', 'factor'],
          },
          {
            model: db.UnitsList,
            as: 'organic_inputs_application_rate_unit',
            attributes: ['id', 'name', 'abbvr', 'unitType', 'factor'],
          },
          {
            model: db.UnitsList,
            as: 'synthetic_fertilizer_application_rate_unit',
            attributes: ['id', 'name', 'abbvr', 'unitType', 'factor'],
          },
          {
            model: db.UnitsList,
            as: 'total_synthetic_fertilizer_used_unit',
            attributes: ['id', 'name', 'abbvr', 'unitType', 'factor'],
          },
          {
            model: db.UnitsList,
            as: 'total_organic_input_applied_unit',
            attributes: ['id', 'name', 'abbvr', 'unitType', 'factor'],
          },
          {
            model: db.UnitsList,
            as: 'bulk_density_unit',
            attributes: ['id', 'name', 'abbvr', 'unitType', 'factor'],
          },
        ],
      });

      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: soilManagementList,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

/**
 * @swagger
 * /soil/management/delete/{id}:
 *   delete:
 *     description: Delete soil management data with id(soil management)
 *     tags: [Soil Management]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDgxODYyNTQsImV4cCI6MTY0ODI0NjI1NH0.ZpH6Y3CcHTaAkLtJtFQqsbe40kWhup299AHJqhNjG1g'
 *      - in: path
 *        name: id
 *        schema:
 *          type: int
 *          minimum: 1
 *        example:
 *          1
 *     responses:
 *       200:
 *         description: On success response if data is present related to the id.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   success:
 *                     type: boolean
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *               example:
 *                 success: true
 *                 code: 200
 *                 message: Soil management data deleted successfully.
 *                 data:
 */
router.delete(
  '/delete/:id',
  auth,
  validatorSoilMgmt.exist(),
  validationErrorHandler,
  async function (req, res) {
    try {
      const { id: userId } = req.user;
      const { id } = req.params;

      const transaction = await db.sequelize.transaction();
      try {
        await db.SoilManagementFarm.destroy(
          { where: { soilManagementId: id }},
          { transaction }
        );
        await db.SoilManagementSegment.destroy(
          { where: { soilManagementId: id }},
          { transaction }
        );
        await db.SoilManagementApplicationMethod.destroy({
          where: { soilManagementId: id },
          transaction,
        });
        await db.SoilManagementSyntheticFertilizer.destroy({
          where: { soilManagementId: id },
          transaction,
        });
        await db.SoilManagementOrganicInput.destroy({
          where: { soilManagementId: id },
          transaction,
        });
        await db.SoilManagement.destroy({
          where: { userId, id },
          transaction,
        });
        await db.MapSoilManagementOption.destroy({
          where: { soilManagementId: id },
          transaction,
        });

        await transaction.commit();
        return res.json(
          successRespSync({
            msg: success.SOILMANAGEMENTDATA_DELETED,
          })
        );
      } catch (err) {
        await transaction?.rollback();
        logErrorOccurred(__filename, err);
        return serverError(res, err);
      }
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

/**
 * @swagger
 * /soil/management/update:
 *   put:
 *     description: Update register soil informations with id(soil management)
 *     tags: [Soil Management]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDgxODYyNTQsImV4cCI6MTY0ODI0NjI1NH0.ZpH6Y3CcHTaAkLtJtFQqsbe40kWhup299AHJqhNjG1g'
 *     requestBody:
 *       description: Update register soil informations with id
 *       required: true
 *       content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                  required: true
 *                farmIds:
 *                  type: array
 *                areaUnits:
 *                  type: integer
 *                area:
 *                  type: integer
 *                cropType:
 *                  type: integer
 *                cropVariety:
 *                  type: array
 *                  items:
 *                    type: integer
 *                soilType:
 *                  type: array
 *                soilHealth:
 *                  type: string
 *                  items:
 *                    type: integer
 *                doneSoilTestingBefore:
 *                  type: boolean
 *                ph:
 *                  type: integer
 *                soilOrganicCarbon:
 *                  type: integer
 *                nitrogen:
 *                  type: integer
 *                nitrogenUnits:
 *                  type: integer
 *                phosphorus:
 *                  type: integer
 *                phosphorusUnits:
 *                  type: integer
 *                potassium:
 *                  type: integer
 *                potassiumUnits:
 *                  type: integer
 *                sulfur:
 *                  type: integer
 *                sulfurUnits:
 *                  type: integer
 *                inputType:
 *                  type: array
 *                  items:
 *                    type: integer
 *                dateOfApplication:
 *                  type: string
 *                stage:
 *                  type: integer
 *                limingMaterial:
 *                  type: array
 *                  items:
 *                    type: integer
 *                totalLimeApplied:
 *                  type: integer
 *                totalLimeAppliedUnits:
 *                  type: integer
 *                limingRate:
 *                  type: integer
 *                limingRateUnits:
 *                  type: integer
 *                limingApplicationFrequency:
 *                  type: integer
 *                soilApplicationMethod:
 *                  type: array
 *                  items:
 *                    type: integer
 *                organicInputsData:
 *                  type: array
 *                  items:
 *                    type: object
 *                syntheticFertilizersData:
 *                  type: array
 *                  items:
 *                    type: object
 *                daysAfterSowing:
 *                    type: interger
 *                cropHeight:
 *                    type: float
 *                cropHeightUnits:
 *                    type: interger
 *                recordId:
 *                    type: string
 *              example:
 *                id: 18
 *                farmIds: [406]
 *                areaUnits: 10
 *                area: 1.098
 *                cropType: 54
 *                cropVariety: [22]
 *                soilType: [
 *                    4,
 *                    5
 *                ]
 *                doneSoilTestingBefore: true
 *                ph: 55
 *                soilOrganicCarbon: 58
 *                nitrogen: 23.5
 *                nitrogenUnits: 58
 *                phosphorus: 41.8
 *                phosphorusUnits: 61
 *                potassium: 22.5
 *                potassiumUnits: 69
 *                sulfur: 12.6
 *                sulfurUnits: 65
 *                inputType: [
 *                    248,
 *                    249
 *                ]
 *                dateOfApplication: 10/03/2022
 *                stage: 276
 *                limingMaterial: [
 *                    118,
 *                    119
 *                ]
 *                totalLimeApplied: 123.0
 *                totalLimeAppliedUnits: 71
 *                limingRate: 41.0
 *                limingRateUnits: 78
 *                limingApplicationFrequency: 251
 *                soilApplicationMethod: [
 *                    286,
 *                    287
 *                ]
 *                organicInputsData: [
 *                  {
 *                    applicationFrequency: 259,
 *                    applicationMethod: [260, 261],
 *                    applicationRate: 50,
 *                    applicationRateUnit: 10,
 *                    organicInputId: 236,
 *                    totalPoultryLitterAmount: 250,
 *                    totalPoultryLitterAmountUnit: 9
 *                  }
 *                ]
 *                syntheticFertilizersData: [
 *                  {
 *                    applicationMethod: [260, 261],
 *                    nitrogenContent: 7,
 *                    nitrogenContentUnit: 15,
 *                    npkApplicationRate: 200,
 *                    npkApplicationRateUnit: 11,
 *                    phosphorusContent: 16,
 *                    phosphorusContentUnit: 15,
 *                    potassiumContent: 30,
 *                    potassiumContentUnit: 15,
 *                    syntheticFertilizerId: 172,
 *                    totalNPKAmount: 100,
 *                    totalNPKAmountUnit: 11
 *                  }
 *                ]
 *                daysAfterSowing: 30
 *                cropHeight: 915.12
 *                cropHeightUnits: 12
 *                recordId: 234BCD
 *     responses:
 *       200:
 *         description: Successfully return the pre-signed url
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   success:
 *                     type: boolean
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *               example:
 *                  success: true
 *                  code: 200
 *                  message: Soil management data updated successfully.
 *                  data: {
 *                   id: 1
 *                  }
 *
 */
router.put(
  '/update',
  auth,
  validatorSoilMgmt.exist(),
  validatorSoilMgmt.general(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const userId = req.user.id;
      let {
        id,
        farm,
        farmIds,
        segment,
        segmentIds = [],
        area,
        cropType,
        cropVariety,
        soilType,
        doneSoilTestingBefore,
        ph,
        soilHealth,
        soilOrganicCarbon,
        nitrogen,
        nitrogenUnits,
        phosphorus,
        phosphorusUnits,
        potassium,
        potassiumUnits,
        sulfur,
        sulfurUnits,
        inputType,
        dateOfApplication,
        stage,
        limingMaterial,
        totalLimeApplied,
        totalLimeAppliedUnits,
        limingRate,
        limingRateUnits,
        limingApplicationFrequency,
        soilApplicationMethod,
        organicInputsData,
        //
        organicInputs,
        totalOrganicInputApplied,
        totalOrganicInputAppliedUnit,
        organicInputsApplicationRate,
        organicInputsApplicationRateUnit,
        organicInputsApplicationFrequency,
        organicApplicationMethod,
        //
        //
        syntheticFertilizers,
        nitrogenContent,
        phosphorusContent,
        potassiumContent,
        totalSyntheticFertilizerUsed,
        totalSyntheticFertilizerUsedUnit,
        syntheticFertilizerApplicationRate,
        syntheticFertilizerApplicationRateUnit,
        syntheticApplicationMethod,
        //
        syntheticFertilizersData,
        daysAfterSowing,
        cropHeight,
        cropHeightUnits,
        recordId,
      } = req.body;

      const transaction = await db.sequelize.transaction();

      try {
        const set = {
          userId,
          farm,
          segment,
          area,
          cropType,
          cropVariety,
          soilType,
          doneSoilTestingBefore,
          ph,
          soilHealth,
          soilOrganicCarbon,
          nitrogen,
          nitrogenUnits,
          phosphorus,
          phosphorusUnits,
          potassium,
          potassiumUnits,
          sulfur,
          sulfurUnits,
          inputType,
          dateOfApplication: dateOfApplication
            ? moment.utc(dateOfApplication, 'DD/MM/YYYY')
            : null,
          stage,
          limingMaterial,
          totalLimeApplied,
          totalLimeAppliedUnits,
          limingRate,
          limingRateUnits,
          limingApplicationFrequency,
          soilApplicationMethod,
          organicInputs,
          totalOrganicInputApplied,
          totalOrganicInputAppliedUnit,
          organicInputsApplicationRate,
          organicInputsApplicationRateUnit,
          organicInputsApplicationFrequency,
          organicApplicationMethod,
          syntheticFertilizers,
          nitrogenContent,
          phosphorusContent,
          potassiumContent,
          totalSyntheticFertilizerUsed,
          totalSyntheticFertilizerUsedUnit,
          syntheticFertilizerApplicationRate,
          syntheticFertilizerApplicationRateUnit,
          syntheticApplicationMethod,
          daysAfterSowing,
          cropHeight,
          cropHeightUnits,
          recordId,
        };

        Object.keys(set).forEach((key) => {
          if (key === 'recordId') {
            set[key] === undefined ? delete set[key] : {};
          } else {
            set[key] == undefined ||
            set[key] == null ||
            set[key]?.toString().trim() == ''
              ? delete set[key]
              : {};
          }
        });

        await db.SoilManagement.update(set, {
          where: { id },
          transaction,
        });
        // save multiple options values
        const multiOpt = {
          cropVariety: 'crop_variety',
          soilType: 'soil_type',
          inputType: 'input_type',
          organicInputs: 'organic_inputs',
          limingMaterial: 'liming_material',
          syntheticFertilizers: 'synthetic_fertilizers',
          syntheticApplicationMethod: 'synthetic_application_method',
          organicApplicationMethod: 'organic_application_method',
          soilApplicationMethod: 'soil_application_method',
        };
        console.log(multiOpt, '===============================');

        await db.SoilManagementFarm.destroy(
          { where: { soilManagementId: id }},
          { transaction }
        );

        const soilManagmentFarmsData = farmIds?.map(_farmId => {
          return {
            farmId: _farmId,
            soilManagementId: id,
          }
        })||[];

        await db.SoilManagementFarm.bulkCreate(soilManagmentFarmsData, {
          transaction,
        });

        await db.SoilManagementSegment.destroy(
          { where: { soilManagementId: id }},
          { transaction }
        );

        if (segmentIds && segmentIds.length) {
          const soilManagementSegmentsData = segmentIds.map(segmentId => {
            return {
              segmentId: segmentId,
              soilManagementId: id,
            }
          });
          await db.SoilManagementSegment.bulkCreate(soilManagementSegmentsData, {
            transaction,
          });
        }

        await db.MapSoilManagementOption.destroy({
          where: { soilManagementId: id },
          transaction,
        });

        await Promise.all(
          Object.keys(multiOpt).map((field) => {
            let set = req.body[field]?.map((option) => {
              return {
                optionId: option,
                type: multiOpt[field],
                soilManagementId: id,
                createdAt: moment.utc(),
                updatedAt: moment.utc(),
              };
            });
            return db.MapSoilManagementOption.bulkCreate(set ?? {}, {
              transaction,
            });
          })
        );

        if ((syntheticFertilizersData && syntheticFertilizersData.length) || (organicInputsData && organicInputsData.length)) {
          await db.SoilManagementApplicationMethod.destroy({
            where: { soilManagementId: id },
            transaction,
          });
        }

        if (syntheticFertilizersData && syntheticFertilizersData.length) {
          await db.SoilManagementSyntheticFertilizer.destroy({
            where: { soilManagementId: id },
            transaction,
          });

          const syntheticFertilizers = await Promise.all(
            syntheticFertilizersData.map(data => {
              return db.SoilManagementSyntheticFertilizer.create({
                ...data,
                soilManagementId: id,
              }, { transaction })
            })
          );

          await Promise.all(
            syntheticFertilizers.map(syntheticFertilizer => {
              return syntheticFertilizer.applicationMethod.map(methodId => {
                return db.SoilManagementApplicationMethod.create({
                  applicationMethodId: methodId,
                  soilManagementId: id,
                  syntheticFertilizerId: syntheticFertilizer.id,
                })
              })
            })
          );
        }

        if (organicInputsData && organicInputsData.length) {
          await db.SoilManagementOrganicInput.destroy({
            where: { soilManagementId: id },
            transaction,
          });

          const organicInputs = await Promise.all(
            organicInputsData.map(data => {
              return db.SoilManagementOrganicInput.create({
                ...data,
                soilManagementId: id,
              }, { transaction })
            })
          );

          await Promise.all(
            organicInputs.map(organicInput => {
              return organicInput.applicationMethod.map(methodId => {
                return db.SoilManagementApplicationMethod.create({
                  applicationMethodId: methodId,
                  organicInputId: organicInput.id,
                  soilManagementId: id,
                })
              })
            })
          );
        }

        await transaction.commit();

        return res.json(
          await successResp({
            data: { id: id},
            msg: success.SOILMANAGEMENTDATA_UPDATED,
          })
        );
      } catch (err) {
        await transaction?.rollback();
        logErrorOccurred(__filename, err);
        return serverError(res, err);
      }
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);



module.exports = router;
