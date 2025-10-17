const express = require('express');
const router = express.Router()
  ,   { Op } = require('sequelize');
const db = require(rootPath + '/models');
const { isArray, isObject, difference,  pick, isEmpty } = require('lodash');
const auth = require(rootPath + '/middleware/auth');
const translation = require(rootPath + '/middleware/translation');
const { error, success } = require(rootPath + '/helpers/language');
const { logErrorOccurred } = require(rootPath + '/helpers/general');
const { serverError, errorResp, successRespSync } = require(rootPath + '/helpers/api');

router.use('/viaFile', require('./file'));

/**
* @swagger
* /audit/soil:
*   post:
*     summary: Create soil fertility audit
*     description: Create soil fertility audit on certain segments
*     tags: [Soil audit]
*     requestBody:
*       description: Soil fertility details
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               geofenceIds:
*                 type: array
*                 example: [50, 10]
*               farmIds:
*                 type: array
*                 example: [50, 10]
*               cropVariety:
*                 type: array
*                 example: [50, 10]
*               soilTestingNo:
*                 type: string
*                 description: Send reason in this feild if soil testing choice is no
*               soilTestingOftenId:
*                 type: integer
*                 description: If soil testing choice is yes, then send often id from dropdown
*               mitigativeMeasure:
*                 type: object
*                 description: must have fields "choice" and "value"
*               soilFertilizersNo:
*                 type: string
*                 description: If the choice for add soil fertilizers is not pass reason
*               soilFertilizerIds:
*                 type: array
*                 description: If the choice for add soil fertilizers is yes pass fertilizer ids
*               applyLimeNo:
*                 type: string
*                 description: If the user don't apply lime
*               applyLimeIds:
*                 type: array
*                 description:  If the user apply lime, then provide ids of those options
*               limingSchedule:
*                 type: integer
*                 description: If the user apply time, then provide often id
*               organicInputsNo:
*                 type: string
*                 description: If the user don't apply organic inputs then specify reason
*               produceOrganicInput:
*                 type: boolean
*                 description: true | false
*               organicInputIds:
*                 type: array
*                 description: If the user apply organic inputs then provide their ids
*               soilPractices:
*                 type: boolean
*                 description: true | false
*               soilPracticeIds:
*                 type: array
*                 description: ids of soil practices
*               soilRisksNo:
*                 type: string
*                 description: If the user select no for soil risk management
*               soilRiskIds:
*                 type: array
*                 description: If the choice is yes then specify soil risk ids
*               soilRiskMitigate:
*                 type: boolean
*                 description: true | false
*               soilRiskMitigateMeasures:
*                 type: string
*                 description: State the measures
*               soilDescriptionIds:
*                 type: array
*                 description: Soil description ids
*               points:
*                 type: integer
*                 description: points total
*
*     responses:
*       200:
*         description: Returns the practice JSON
*       500:
*         description: Server error
*/

router.post('/', auth, async (req, res) => {
  let transaction = await db.sequelize.transaction();
  try {
    let msg = null;
    if(!req.body.farmIds && !req.body.geofenceIds)
      msg = 'farmIds or geofenceIds are required';
    if(req.body.geofenceIds && !isArray(req.body.geofenceIds))
      msg = 'geofenceIds should be an array!';
    if(req.body.soilFertilizerIds && !isArray(req.body.soilFertilizerIds))
      msg = 'soilFertilizerIds should be an array!';
    if(req.body.applyLimeIds && !isArray(req.body.applyLimeIds))
      msg = 'applyLimeIds should be an array!';
    if(req.body.organicInputIds && !isArray(req.body.organicInputIds))
      msg = 'organicInputIds should be an array!';
    if(req.body.soilRiskIds && !isArray(req.body.soilRiskIds))
      msg = 'soilRiskIds should be an array!';
    if(req.body.soilPracticeIds && !isArray(req.body.soilPracticeIds))
      msg = 'soilPracticeIds should be an arary!';
    if(req.body.soilDescriptionIds && !isArray(req.body.soilDescriptionIds))
      msg = 'soilDescriptionIds should be an array!';
    if(req.body.farmIds && !isArray(req.body.farmIds)) msg = 'farmIds should be an array!';
    if(req.body.cropVariety && !isArray(req.body.cropVariety)) msg = 'cropVariety should be an array!';

    // if(req.body.mitigativeMeasure){
    //   if(!isObject(req.body.mitigativeMeasure)) msg = 'mitigativeMeasure should be an object';
    //   else{
    //     if(!req.body.mitigativeMeasure.choice)  msg = 'mitigativeMeasure.choice is required';
    //     if(!req.body.mitigativeMeasure.value) msg = 'mitigativeMeasure.value is required';
    //   }
    // }

    if(req.body.soilTestingOftenId && req.body.soilTestingNo)
      msg = 'soilTestingOftenId or soilTestingNo only one field is expected!';
    if(req.body.soilFertilizersNo && req.body.soilFertilizerIds)
      msg = 'soilFertilizerIds or soilFertilizersNo only one field is expected!';
    if(req.body.applyLimeNo && req.body.applyLimeIds)
      msg = 'applyLimeNo or applyLimeIds only one field is expected!';
    if(req.body.organicInputsNo && req.body.organicInputIds)
      msg = 'organicInputsNo or organicInputIds only one field is expected!';
    if(req.body.soilRisksNo && req.body.soilRiskIds)
      msg = 'soilRisksNo or soilRiskIds only one field is expected!';
    if(msg){
      return res.status(error.code.SERVER_ERROR).json(await errorResp({
        msg: msg
      }));
    }
    let data = { userId: req.user.id };
    if(req.body.recordId) data.recordId = req.body.recordId;
    if(req.body.points) data.points = req.body.points;
    if(req.body.cropType) data.cropType = req.body.cropType;
    if(req.body.soilTestingNo) data.soilTestingNo = req.body.soilTestingNo;
    if(req.body.soilTestingOftenId) data.soilTestingOftenId = req.body.soilTestingOftenId;
    if(req.body.mitigativeMeasure) data.mitigativeMeasure = req.body.mitigativeMeasure;
    if(req.body.soilFertilizersNo) data.soilFertilizersNo = req.body.soilFertilizersNo;
    if(req.body.applyLimeNo) data.applyLimeNo = req.body.applyLimeNo;
    if(req.body.limingSchedule) data.limingSchedule = req.body.limingSchedule;
    if(req.body.organicInputsNo) data.organicInputsNo = req.body.organicInputsNo;
    if(req.body.produceOrganicInput) data.produceOrganicInput = req.body.produceOrganicInput;
    if(req.body.soilRisksNo) data.soilRisksNo = req.body.soilRisksNo;
    if(req.body.soilRiskMitigate) data.soilRiskMitigate = req.body.soilRiskMitigate;
    if(req.body.soilRiskMitigateMeasures) data.soilRiskMitigateMeasures = req.body.soilRiskMitigateMeasures;
    if(req.body.soilPractices) data.soilPractices = req.body.soilPractices;

    let result = await db.SoilFertilityAudit.create(data,  { transaction });

    let optionsData = [];
    if(req.body.soilDescriptionIds){
      req.body.soilDescriptionIds.forEach(function(optionId){
        optionsData.push({  optionId, soilFertilityAuditId: result.id  });
      });
    }
    if(req.body.soilPracticeIds){
      req.body.soilPracticeIds.forEach(function(optionId){
        optionsData.push({  optionId, soilFertilityAuditId: result.id  });
      });
    }
    if(req.body.soilFertilizerIds){
      req.body.soilFertilizerIds.forEach(function(optionId){
        optionsData.push({  optionId, soilFertilityAuditId: result.id  });
      });
    }
    if(req.body.applyLimeIds){
      req.body.applyLimeIds.forEach(function(optionId){
        optionsData.push({ optionId, soilFertilityAuditId: result.id  });
      });
    }
    if(req.body.organicInputIds){
      req.body.organicInputIds.forEach(function(optionId){
        optionsData.push({ optionId, soilFertilityAuditId: result.id  });
      });
    }
    if(req.body.soilRiskIds){
      req.body.soilRiskIds.forEach(function(optionId){
        optionsData.push({ optionId, soilFertilityAuditId: result.id });
      });
    }
    if(optionsData.length)  db.MapSoilFertilityAuditOptions.bulkCreate(optionsData, { transaction });
    if(req.body.geofenceIds && req.body.geofenceIds.length){
      let segmentData = [];
      req.body.geofenceIds.forEach(function(geofenceId){
        segmentData.push({
          geofenceId,
          soilFertilityAuditId: result.id
        });
      });
      await db.MapSoilFertilityAuditGeofences.bulkCreate(segmentData, { transaction });
    }

    if(req.body.farmIds && req.body.farmIds.length){
      let farmData = [];
      req.body.farmIds.forEach(function(userFarmId){
        farmData.push({
          userFarmId,
          soilFertilityAuditId: result.id
        });
      });
      await db.MapSoilFertilityAuditFarms.bulkCreate(farmData, { transaction });
    }

    if(req.body.cropVariety && req.body.cropVariety.length){
      let varieties = [];
      req.body.cropVariety.forEach(function(cropId){
        varieties.push({ cropId, soilFertilityAuditId: result.id });
      });
      await db.MapSoilFertilityAuditCrop.bulkCreate(varieties, { transaction });
    }

    await transaction.commit();
    return res.json(
      successRespSync({
        msg: success.SOIL_AUDIT_CREATED,
        data: result,
      })
    );

  } catch (err) {
    if(transaction) transaction.rollback();
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});



/**
* @swagger
* /audit/soil:
*   get:
*     summary: Get soil audit list
*     description: Get soil audit list
*     tags: [Soil audit]
*     parameters:
*       - in: header
*         name: oauth-token
*         required: true
*         schema:
*           type: string
*         description: authorization token
*       - in: query
*         name: limit
*         required: false
*         schema:
*           type: Integer
*         description: Number of records you want to fetch
*       - in: query
*         name: offset
*         required: false
*         schema:
*           type: Integer
*         description: The number of records to skip before starting to collect the result set
*       - in: query
*         name: order
*         required: false
*         schema:
*           type: string
*         description: ASC | DESC | createdAt
*     responses:
*       '200':
*         description: Success
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 success:
*                   type: string
*                 code:
*                   type: integer
*                 message:
*                   type: string
*                 data:
*                   type: object
*               example:
*                 success: true
*                 code: 200
*                 message: Fetched successfully.
*                 data: {"success":true,"code":200,"message":"Fetched successfully.","data":[{"mitigativeMeasure":{"choice":"yes","value":"test value"},"id":12,"userId":17,"cropType":null,"soilTestingNo":null,"soilTestingOftenId":165,"soilFertilizersNo":null,"applyLimeNo":null,"limingSchedule":196,"organicInputsNo":null,"produceOrganicInput":true,"soilRisksNo":null,"soilRiskMitigate":true,"soilRiskMitigateMeasures":"what measures","soilPractices":true,"createdAt":"2022-02-18T13:17:56.000Z","updatedAt":"2022-02-18T13:17:56.000Z","Options":[{"id":238,"name":"White deposits on soil","groupName":"soil-description","userId":null,"createdAt":"2022-02-18T11:52:06.000Z","updatedAt":"2022-02-18T11:52:06.000Z","MapSoilFertilityAuditOptions":{"id":97,"optionId":238,"soilFertilityAuditId":12,"OptionId":238}},{"id":239,"name":"Poor crop growth","groupName":"soil-description","userId":null,"createdAt":"2022-02-18T11:52:06.000Z","updatedAt":"2022-02-18T11:52:06.000Z","MapSoilFertilityAuditOptions":{"id":98,"optionId":239,"soilFertilityAuditId":12,"OptionId":239}},{"id":211,"name":"Reduced or zero tillage systems (1 point)","groupName":"soil-practice","userId":null,"createdAt":"2022-02-18T11:47:33.000Z","updatedAt":"2022-02-18T11:47:33.000Z","MapSoilFertilityAuditOptions":{"id":99,"optionId":211,"soilFertilityAuditId":12,"OptionId":211}},{"id":212,"name":"Planting cover crops (1 point)","groupName":"soil-practice","userId":null,"createdAt":"2022-02-18T11:47:33.000Z","updatedAt":"2022-02-18T11:47:33.000Z","MapSoilFertilityAuditOptions":{"id":100,"optionId":212,"soilFertilityAuditId":12,"OptionId":212}},{"id":171,"name":"Urea","groupName":"soil-fertilizer","userId":null,"createdAt":"2022-02-18T11:34:17.000Z","updatedAt":"2022-02-18T11:34:17.000Z","MapSoilFertilityAuditOptions":{"id":101,"optionId":171,"soilFertilityAuditId":12,"OptionId":171}},{"id":172,"name":"Compound NPK","groupName":"soil-fertilizer","userId":null,"createdAt":"2022-02-18T11:34:17.000Z","updatedAt":"2022-02-18T11:34:17.000Z","MapSoilFertilityAuditOptions":{"id":102,"optionId":172,"soilFertilityAuditId":12,"OptionId":172}},{"id":189,"name":"Gypsum","groupName":"liming-material","userId":null,"createdAt":"2022-02-18T11:38:52.000Z","updatedAt":"2022-02-18T11:38:52.000Z","MapSoilFertilityAuditOptions":{"id":103,"optionId":189,"soilFertilityAuditId":12,"OptionId":189}},{"id":190,"name":"Dolomite","groupName":"liming-material","userId":null,"createdAt":"2022-02-18T11:38:52.000Z","updatedAt":"2022-02-18T11:38:52.000Z","MapSoilFertilityAuditOptions":{"id":104,"optionId":190,"soilFertilityAuditId":12,"OptionId":190}},{"id":203,"name":"Treated compost (5 points)","groupName":"organic-inputs","userId":null,"createdAt":"2022-02-18T11:44:50.000Z","updatedAt":"2022-02-18T11:44:50.000Z","MapSoilFertilityAuditOptions":{"id":105,"optionId":203,"soilFertilityAuditId":12,"OptionId":203}},{"id":204,"name":"Untreated compost","groupName":"organic-inputs","userId":null,"createdAt":"2022-02-18T11:44:50.000Z","updatedAt":"2022-02-18T11:44:50.000Z","MapSoilFertilityAuditOptions":{"id":106,"optionId":204,"soilFertilityAuditId":12,"OptionId":204}},{"id":220,"name":"Soil erosion","groupName":"soil-risk","userId":null,"createdAt":"2022-02-18T11:49:35.000Z","updatedAt":"2022-02-18T11:49:35.000Z","MapSoilFertilityAuditOptions":{"id":107,"optionId":220,"soilFertilityAuditId":12,"OptionId":220}},{"id":221,"name":"Salinity","groupName":"soil-risk","userId":null,"createdAt":"2022-02-18T11:49:35.000Z","updatedAt":"2022-02-18T11:49:35.000Z","MapSoilFertilityAuditOptions":{"id":108,"optionId":221,"soilFertilityAuditId":12,"OptionId":221}}],"cropVariety":[{"id":22,"countryId":null,"cropTypeOptId":71,"name":"variety 1","userId":17,"createdAt":"2021-11-23T05:30:47.000Z","updatedAt":"2021-11-23T05:30:47.000Z","MapSoilFertilityAuditCrop":{"id":15,"cropId":22,"soilFertilityAuditId":12,"createdAt":"2022-02-18T13:17:56.000Z","updatedAt":"2022-02-18T13:17:56.000Z","CropId":22}},{"id":23,"countryId":null,"cropTypeOptId":71,"name":"variety v2","userId":17,"createdAt":"2021-11-23T05:30:55.000Z","updatedAt":"2021-11-23T05:30:55.000Z","MapSoilFertilityAuditCrop":{"id":16,"cropId":23,"soilFertilityAuditId":12,"createdAt":"2022-02-18T13:17:56.000Z","updatedAt":"2022-02-18T13:17:56.000Z","CropId":23}}],"user_farms":[{"id":274,"userId":67,"address":"Main Road, Main Road, Layyah","district":null,"farmingGoalOptId":null,"zipCode":null,"farmName":"cotton field","registrationNo":"9900","ownerName":null,"communityName":null,"lat":30.9701291,"log":70.9721821,"farmingActivity":null,"farmOwnershipType":"community","parameter":191.961,"area":22.354,"isPrimaryFarm":null,"isDeleted":false,"createdAt":"2022-01-06T18:26:01.000Z","updatedAt":"2022-01-06T18:26:01.000Z","MapSoilFertilityAuditFarms":{"id":9,"userFarmId":274,"soilFertilityAuditId":12,"createdAt":"2022-02-18T13:17:56.000Z","updatedAt":"2022-02-18T13:17:56.000Z"}}],"segments":[]}]}
*
*       500:
*         description: Server error
*/

router.get('/', auth, translation, function(req, res){

  let limit = parseInt(req.query.limit || 10);
  let offset = parseInt(req.query.offset || 0);

  let order = ['createdAt', 'DESC'];
  if(req.query.order){
    if(req.query.order == 'ASC') order = [db.user_farm, 'farmName', 'ASC'];
    else if(req.query.order == 'DESC') order = [db.user_farm, 'farmName', 'DESC'];
  }
  
  db.SoilFertilityAudit.findAndCountAll({
    limit,
    offset,
    order: [order],
    where: {
      userId: req.user.id
    },
    include: [
      db.Option,
      { model: db.Option, as: 'crop' },
      { model: db.Option, as: 'soilTestingOften'},
      { model: db.Option, as: 'limingSchedules'},
      {
        model: db.Crop, as: 'cropVariety',
        include: [{model: db.Option, as: 'crop_variety_type'}]
      },
      db.user_farm,
      {
        model: db.Geofence,
        as: 'segments',
        include: [{
          as: 'farm',
          model: db.user_farm
        }]
      }
    ]
    
  }
  ).then((Allresult)=>{
    var results = Allresult.rows;
    res.setHeader('X-Pagination-Count', Allresult.count);
    res.setHeader('X-Pagination-Limit', limit);
    res.setHeader('X-Pagination-Offset', offset);

    db.Document.findOne({
      where: {
        [Op.and]: [
          { userId: req.user.id },
          { displayName: "SoilManagementAndFertility" },
          { docType: "folder"}
        ]       
      },
      raw: true
    }).then(row => {

      if(row) {
        db.Document.findAll({
          where: {
            [Op.and]: [
              {parentId: row.id},
              { userId: req.user.id },
              { docType: "file"}
            ]       
          },
          raw: true
        }).then(rows => {
          let resObj = {}

          if (req.headers.lang && req.headers.lang != 'en') {
            results = req.translateFunction(results, globalTranslationCache, {
              lvl1: false,
              lvl2: true,
              moduleName: "audit/soil"
            })
          }

          resObj.results = results
          resObj.auditFilesList = rows
          return res.json(
            successRespSync({
              msg: success.FETCH,
              data: resObj,
            })
          );
        }) 
      } else {
        let resObj = {}
        resObj.results = results
        resObj.auditFilesList = []
        return res.json(
          successRespSync({
            msg: success.FETCH,
            data: resObj,
          })
        );
      }
      
    
    })


  }).catch(async function(err){
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  });

});


/**
* @swagger
* /audit/soil/{id}:
*   delete:
*     summary: Delete soil audit
*     description: Delete soil audit by id
*     tags: [Soil audit]
*     parameters:
*       - in: header
*         name: oauth-token
*         required: false
*         schema:
*           type: string
*         description: authorization token
*       - in: path
*         name: id
*         required: false
*         schema:
*           type: Integer
*         description: soil audit id
*     responses:
*       200:
*         description: Returns the soil audit JSON
*       500:
*         description: Server error
*/
router.delete('/:id', auth, function(req, res){
  db.SoilFertilityAudit.findOne({
    where: {
      userId: req.user.id,
      id: req.params.id
    }
  }).then(async (row)=>{
    if(row) await row.destroy();
    return res.json(
      successRespSync({
        msg: success.PRACTICE_DELETED,
        data: row,
      })
    );
  }).catch(async function(err){
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  });
});




/**
* @swagger
* /audit/soil/{id}:
*   put:
*     summary: Update soil audit
*     description: Update soil audit details
*     tags: [Soil audit]
*     parameters:
*       - in: header
*         name: oauth-token
*         required: true
*         schema:
*           type: string
*         description: authorization token
*       - in: path
*         name: id
*         required: false
*         schema:
*           type: integer
*         description: soil audit id
*     requestBody:
*       description: Soil audit details and it's id
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               geofenceIds:
*                 type: array
*                 example: [50, 10]
*               farmIds:
*                 type: array
*                 example: [50, 10]
*               cropVariety:
*                 type: array
*                 example: [50, 10]
*               soilTestingNo:
*                 type: string
*                 description: Send reason in this feild if soil testing choice is no
*               soilTestingOftenId:
*                 type: integer
*                 description: If soil testing choice is yes, then send often id from dropdown
*               mitigativeMeasure:
*                 type: object
*                 description: must have fields "choice" and "value"
*               soilFertilizersNo:
*                 type: string
*                 description: If the choice for add soil fertilizers is not pass reason
*               soilFertilizerIds:
*                 type: array
*                 description: If the choice for add soil fertilizers is yes pass fertilizer ids
*               applyLimeNo:
*                 type: string
*                 description: If the user don't apply lime
*               applyLimeIds:
*                 type: array
*                 description:  If the user apply lime, then provide ids of those options
*               limingSchedule:
*                 type: integer
*                 description: If the user apply time, then provide often id
*               organicInputsNo:
*                 type: string
*                 description: If the user don't apply organic inputs then specify reason
*               produceOrganicInput:
*                 type: boolean
*                 description: true | false
*               organicInputIds:
*                 type: array
*                 description: If the user apply organic inputs then provide their ids
*               soilPractices:
*                 type: boolean
*                 description: true | false
*               soilPracticeIds:
*                 type: array
*                 description: ids of soil practices
*               soilRisksNo:
*                 type: string
*                 description: If the user select no for soil risk management
*               soilRiskIds:
*                 type: array
*                 description: If the choice is yes then specify soil risk ids
*               soilRiskMitigate:
*                 type: boolean
*                 description: true | false
*               soilRiskMitigateMeasures:
*                 type: string
*                 description: State the measures
*               soilDescriptionIds:
*                 type: array
*                 description: Soil description ids

*     responses:
*       200:
*         description: Returns the practice JSON
*       500:
*         description: Server error
*/

router.put('/:id', auth, async function(req, res){
  let data = pick(req.body, [
    'cropType', 'soilTestingNo', 'soilTestingOftenId', 'mitigativeMeasure',
    'soilFertilizersNo', 'applyLimeNo', 'limingSchedule', 'organicInputsNo',
    'produceOrganicInput', 'soilRisksNo', 'points',
    'soilRiskMitigate', 'soilRiskMitigateMeasures', 'soilPractices'
  ]);
  if(isEmpty(data))
    return res.status(error.code.SERVER_ERROR).json(await errorResp({ msg: 'Atleast one column is required' }));

  let msg = null;
  let checkArray = [
    'geofenceIds', 'soilFertilizerIds', 'applyLimeIds', 'organicInputIds',
    'soilRiskIds', 'soilPracticeIds', 'soilDescriptionIds', 'farmIds',
    'cropVariety'
  ];
  checkArray.forEach(function(key){
    if(req.body[key] && !isArray(req.body[key])){
      msg = key + ' should be an array!';
    }
  });
  // if(req.body.mitigativeMeasure){
  //   if(!isObject(req.body.mitigativeMeasure)) msg = 'mitigativeMeasure should be an object';
  //   else{
  //     if(!req.body.mitigativeMeasure.choice)  msg = 'mitigativeMeasure.choice is required';
  //     if(!req.body.mitigativeMeasure.value) msg = 'mitigativeMeasure.value is required';
  //   }
  // }
  if(msg) return res.status(error.code.SERVER_ERROR).json(await errorResp({ msg: msg }));

  let transaction = null;
  db.SoilFertilityAudit.findOne({
    where: {
      userId: req.user.id,
      id: req.params.id
    },
    include: [
      db.Option,
      { model: db.Crop, as: 'cropVariety' },
      db.user_farm,
      {
        model: db.Geofence,
        as: 'segments',
        include: [{
          as: 'farm',
          model: db.user_farm
        }]
      }
    ]
  }).then(async (audit)=>{
    if(!audit){
      return res.status(error.code.SERVER_ERROR).json(await errorResp({
        msg: `Soil audit with id ${req.params.id} not found`
      }));
    }

    transaction = await db.sequelize.transaction();
    audit.Options = audit.Options || [];

    if(audit.Options){
      var oldDescIds = [], oldPracticeIds = [], oldFertilizerIds = [], oldLimeIds = [], oldInputIds = [],
        oldSoilRiskIds = [];
      audit.Options.forEach(function(op){
        if(op.groupName == 'soil-description') oldDescIds.push(op.id);
        else if(op.groupName == 'soil-risk') oldSoilRiskIds.push(op.id);
        else if(op.groupName == 'soil-practice') oldPracticeIds.push(op.id);
        else if(op.groupName == 'organic-inputs') oldInputIds.push(op.id);
        else if(op.groupName == 'liming-material') oldLimeIds.push(op.id);
        else if(op.groupName == 'soil-fertilizer') oldFertilizerIds.push(op.id);
      });
      let destroy = [], create = [];
      if(req.body.soilDescriptionIds){
        let d = difference(oldDescIds, req.body.soilDescriptionIds);
        let c = difference(req.body.soilDescriptionIds, oldDescIds);
        destroy = destroy.concat(d);
        create = create.concat(c);
      }
      if(req.body.soilRiskIds){
        let d = difference(oldSoilRiskIds, req.body.soilRiskIds);
        let c = difference(req.body.soilRiskIds, oldSoilRiskIds);
        destroy = destroy.concat(d);
        create = create.concat(c);
      }
      if(req.body.soilPracticeIds){
        let d = difference(oldPracticeIds, req.body.soilPracticeIds);
        let c = difference(req.body.soilPracticeIds, oldPracticeIds);
        destroy = destroy.concat(d);
        create = create.concat(c);
      }
      if(req.body.soilFertilizerIds){
        let d = difference(oldFertilizerIds, req.body.soilFertilizerIds);
        let c = difference(req.body.soilFertilizerIds, oldFertilizerIds);
        destroy = destroy.concat(d);
        create = create.concat(c);
      }
      if(req.body.applyLimeIds){
        let d = difference(oldLimeIds, req.body.applyLimeIds);
        let c = difference(req.body.applyLimeIds, oldLimeIds);
        destroy = destroy.concat(d);
        create = create.concat(c);
      }
      if(req.body.organicInputIds){
        let d = difference(oldInputIds, req.body.organicInputIds);
        let c = difference(req.body.organicInputIds, oldInputIds);
        destroy = destroy.concat(d);
        create = create.concat(c);
      }

      if(destroy && destroy.length){
        await db.MapSoilFertilityAuditOptions.destroy({
          where: {
            soilFertilityAuditId: audit.id,
            optionId: {
              [Op.in]: destroy
            }
          },
          transaction: transaction
        });
      }

      if(create && create.length){
        let soilData = create.map(function(optionId){
          return { optionId, soilFertilityAuditId: audit.id};
        });
        await db.MapSoilFertilityAuditOptions.bulkCreate(soilData, { transaction });
      }
    }
    if(!req.body.cropVariety || (Array.isArray(req.body.cropVariety) && req.body.cropVariety.length ==0)) {
      oldVarieties = audit.cropVariety.map((crop)=>crop.id)
      await db.MapSoilFertilityAuditCrop.destroy({
        where: {
          soilFertilityAuditId: audit.id,
          cropId: {
            [Op.in]: oldVarieties
          }
        },
        transaction: transaction
      });
    }

    if(req.body.cropVariety && req.body.cropVariety.length){
      let oldVarieties = [];
      if(audit.cropVariety && audit.cropVariety.length) oldVarieties = audit.cropVariety.map((crop)=>crop.id);

      let destroy = difference(oldVarieties, req.body.cropVariety);
      let create = difference(req.body.cropVariety, oldVarieties);
      if(destroy && destroy.length){
        await db.MapSoilFertilityAuditCrop.destroy({
          where: {
            soilFertilityAuditId: audit.id,
            cropId: {
              [Op.in]: destroy
            }
          },
          transaction: transaction
        });
      }

      if(create && create.length){
        let varietyData = create.map(function(cropId){
          return { cropId, soilFertilityAuditId: audit.id};
        });
        await db.MapSoilFertilityAuditCrop.bulkCreate(varietyData, { transaction });
      }
    }
    if(req.body.farmIds){
      let oldFarmIds = [];
      if(audit.user_farms && audit.user_farms.length) oldFarmIds = audit.user_farms.map((farm)=>farm.id);

      let destroy = difference(oldFarmIds, req.body.farmIds);
      let create = difference(req.body.farmIds, oldFarmIds);
      if(destroy && destroy.length){
        await db.MapSoilFertilityAuditFarms.destroy({
          where: {
            soilFertilityAuditId: audit.id,
            userFarmId: {
              [Op.in]: destroy
            }
          }
        }, { transaction });
      }

      if(create && create.length){
        let farmData = create.map(function(userFarmId){
          return { userFarmId, soilFertilityAuditId: audit.id};
        });
        await db.MapSoilFertilityAuditFarms.bulkCreate(farmData, { transaction });
      }
    }
    if(req.body.geofenceIds){
      let oldGeofenceIds = [];
      if(audit.segments && audit.segments.length) oldGeofenceIds = audit.segments.map((segment)=>segment.id);

      let destroy = difference(oldGeofenceIds, req.body.geofenceIds);
      let create = difference(req.body.geofenceIds, oldGeofenceIds);

      if(destroy && destroy.length){
        await db.MapSoilFertilityAuditGeofences.destroy({
          where: {
            soilFertilityAuditId: audit.id,
            geofenceId: {
              [Op.in]: destroy
            }
          },
          transaction: transaction
        });
      }

      if(create && create.length){
        let segmentData = create.map(function(geofenceId){
          return { geofenceId, soilFertilityAuditId: audit.id};
        });
        await db.MapSoilFertilityAuditGeofences.bulkCreate(segmentData, { transaction });
      }
    }

    audit = await audit.update(data, { transaction });
    await transaction.commit();
    return res.json(
      successRespSync({
        msg: success.PRACTICE_UPDATED,
        data: audit,
      })
    );
  }).catch(async function(err){
    if(transaction) transaction.rollback();
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  });
});

module.exports = router;
