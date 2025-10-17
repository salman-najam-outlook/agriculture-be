const { Router } = require('express');
const router = Router();
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const html_to_pdf = require('html-pdf-node');
const { logErrorOccurred } = require(rootPath + '/helpers/general');
const _ = require('lodash');
const {
  getAreaFromPolygonsInAcre,
  getPerimeterFromPolygonsInFeet,
  getAreaFromCircularInAcre,
  getPerimeterFromCircularInFeet,
} = require('../../../../helpers/geo-utils');
const { Op } = require('sequelize');
const authMiddleware = require(rootPath + '/middleware/auth');
const { errorRespSync, serverError, successRespSync, successResp } = require(rootPath + '/helpers/api');
const { error, success } = require(rootPath + '/helpers/language');
const db = require(rootPath + '/models');
const ejsTranslation = require(rootPath + "/locales/ejsTranslation.json")

router.get('/', authMiddleware, async (req, res) => {
  try {
 
    const userId = req.user.id;
    // const { page } = req.body;
    const { page = 1, limit = 10, country = null, farmName = null, cropType = null, startDate = null, searchPhrase = null, scheduledActivity = "scheduled", endDate = null }  = req.query;

    let whereOption = {}
    if(startDate) {
      whereOption.startDateTime ={ [db.Sequelize.Op.gte]: `${startDate}T00:00:00.000Z` } // only do where query if startDate is provided and T00:00:00.000Z avoids UTC conversion
    }
    if(scheduledActivity == "completed" && endDate) {
      whereOption.endDateTime ={ [db.Sequelize.Op.lte]: `${endDate}T00:00:00.000Z` } // only do where query if startDate is provided and T00:00:00.000Z avoids UTC conversion
    }
    

    if(searchPhrase) {
      whereOption [Op.or] = [
        {
          '$Event.title$': {
            [Op.like]: `%${searchPhrase}%`
          }
        },
        {
          '$Event.description$': {
            [Op.like]: `%${searchPhrase}%`
          }
        },
        {
          '$user_farm.farmName$': {
            [Op.like]: `%${searchPhrase}%`
          }
        },
        {
          '$user.firstName$': {
            [Op.like]: `%${searchPhrase}%`
          }
        },
        {
          '$user.middleName$': {
            [Op.like]: `%${searchPhrase}%`
          }
        },
        {
          '$user.lastName$': {
            [Op.like]: `%${searchPhrase}%`
          }
        }
      ]
    }
    if(country) {
      whereOption ['$user_farm.country$'] =  {
        [Op.like]: `%${country}%`
      }
    }
    let queryOptions = {
      include: [
        {
          model: db.user,
          attributes: ["firstName", "middleName", "lastName", "fullName"],
          where: {
            organization: req.user.organization,
          }
        },
        {
          model: db.user_farm,
          attributes: ["farmName", "country"],
          ...((farmName ) && { //farmName is farm id
            where: {
                 id: farmName
            }
          }),
        },
        {
          model: db.Option,
           as: "cropType",
           ...(cropType && { where : { id : cropType } }) // only do where query if cropType is provided
        },
      ],
      order: [["startDateTime", "ASC"]],
      where: whereOption
    }

    if (limit && page) {
      const limitValue = parseInt(limit);
      const offsetValue = (page - 1) * limitValue;
      queryOptions.limit = limitValue;
      queryOptions.offset = offsetValue;
    }

    // Get all the geolocation of the user
    let geofences = await db.Event.findAndCountAll(queryOptions);
    const totalPages = limit ? Math.ceil(geofences.count / limit) : undefined;
    return res.json(
      await successResp({
        msg: geofences == null ? success.NO_RESPONSE : success.FETCH,
        data: {
          data: geofences.rows,
          pagination: limit ? {
          totalItems: geofences.count,
          totalPages,
          currentPage: parseInt(page),
          pageSize: parseInt(limit),
        } : undefined,
        }
        
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);

    return serverError(res, err);
  }
  });


  router.get('/options', authMiddleware, async (req, res) => {
    try {
   
      let organization = req.user.organization;
      let farmRes = await db.user_farm.findAll({
        attributes: ["id", "farmName", "country"],
        include: [
        {
          model: db.user,
          as: "user",
          attributes: [
          ],
          where: {
            organization,
          },
        },
        {
          model: db.Event,
          required: true
        },
      ]
    })
      let createdCropType = await db.Option.findAll({
        where: { groupName: 'crop-type' },
      });
      return res.json(
        await successResp({
          msg: success.FETCH,
          data: {
            farmNameList: farmRes.map(farm => ({farmName: farm.farmName, id: farm.id})),
            countryList: farmRes.map(farm => farm.country),
            cropTypeList: createdCropType
          }
          
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
  
      return serverError(res, err);
    }
    });

router.get('/calendar-view', authMiddleware, async (req, res) => {
  try {

    const userId = req.user.id;
    // const { page } = req.body;
    const { farmId = null, startDate = null, endDate = null, country = null } = req.query;

    let sDateISO = new Date(`${startDate}T00:00:00.000Z`).toISOString();
    let eDateISO = new Date(`${endDate}T23:59:59.000Z`).toISOString();

    let queryOptions = {
      include: [
        {
          model: db.user,
          attributes: ["firstName", "middleName", "lastName", "fullName"],
          where: {
            organization: req.user.organization,
          }
        },
        {
          model: db.user_farm,
          attributes: ["farmName", "country"],
          ...(( country) && {
            where: {
                
                  country: {
                    [db.Sequelize.Op.like]: '%' + country + '%',
                  },
            }

          }), // only do where query if  country is provided

        },
        {
          model: db.Option,
           as: "cropType"
        },

      ],
      order: [["id", "DESC"]],

      where: {
        startDateTime: { [db.Sequelize.Op.gte]: sDateISO }, // only do where query if startDate is provided and T00:00:00.000Z avoids UTC conversion
        endDateTime: { [db.Sequelize.Op.lte]: eDateISO },
        farmId: farmId
      }


    }


    let eventsRes = await db.Event.findAndCountAll(queryOptions);
    const updatedEvents = await Promise.all(
      eventsRes.rows.map(async (event) => {
        if(event.colorPreference === '1D8489') {
          const newColor = generateRandomColor();
          event.colorPreference = newColor;
          await event.save();
        }
        return event;
      })
    ) 
    return res.json(
      await successResp({
        msg: eventsRes == null ? success.NO_RESPONSE : success.FETCH,
        data: {
          count: eventsRes.count,
          rows: updatedEvents,
        }
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);

    return serverError(res, err);
  }
});

function generateRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
    
router.get("/list-view-download", authMiddleware, async (req, res) => {
  try {
    const { page , limit, country = null, farmName = null, cropType = null, startDate = null, searchPhrase = null, scheduledActivity = "scheduled", endDate = null }  = req.query;

    let whereOption = {}
    if(startDate) {
      whereOption.startDateTime ={ [db.Sequelize.Op.gte]: `${startDate}T00:00:00.000Z` } // only do where query if startDate is provided and T00:00:00.000Z avoids UTC conversion
    }
    if(scheduledActivity == "completed" && endDate) {
      whereOption.endDateTime ={ [db.Sequelize.Op.lte]: `${endDate}T00:00:00.000Z` } // only do where query if startDate is provided and T00:00:00.000Z avoids UTC conversion
    }
    

    if(searchPhrase) {
      whereOption [Op.or] = [
        {
          '$Event.title$': {
            [Op.like]: `%${searchPhrase}%`
          }
        },
        {
          '$Event.description$': {
            [Op.like]: `%${searchPhrase}%`
          }
        },
        {
          '$user_farm.farmName$': {
            [Op.like]: `%${searchPhrase}%`
          }
        },
        {
          '$user.firstName$': {
            [Op.like]: `%${searchPhrase}%`
          }
        },
        {
          '$user.middleName$': {
            [Op.like]: `%${searchPhrase}%`
          }
        },
        {
          '$user.lastName$': {
            [Op.like]: `%${searchPhrase}%`
          }
        }
      ]
    }
    if(country) {
      whereOption ['$user_farm.country$'] =  {
        [Op.like]: `%${country}%`
      }
    }
    let queryOptions = {
      include: [
        {
          model: db.user,
          attributes: ["firstName", "middleName", "lastName", "fullName"],
          where: {
            organization: req.user.organization,
          }
        },
        {
          model: db.user_farm,
          attributes: ["farmName", "country"],
          ...((farmName ) && { //farmName is farm id
            where: {
                 id: farmName
            }
          }),
        },
        {
          model: db.Option,
           as: "cropType",
           ...(cropType && { where : { id : cropType } }) // only do where query if cropType is provided
        },
      ],
      order: [["startDateTime", "ASC"]],
      where: whereOption
    }

    if (limit && page) {
      const limitValue = parseInt(limit);
      const offsetValue = (page - 1) * limitValue;
      queryOptions.limit = limitValue;
      queryOptions.offset = offsetValue;
    }

    // Get all the geolocation of the user
    let geofences = await db.Event.findAndCountAll(queryOptions);
    
    const processedData = [];
    for (let i = 0; i < geofences.rows.length; i++) {
      let tmpObj = {
        FarmName: geofences.rows[i]?.user_farm?.farmName,
        FarmerName: geofences.rows[i] && geofences.rows[i]?.user?.fullName,
        CropName: geofences.rows[i]?.cropType?.name,
        Activity: geofences.rows[i]?.title,
        StartEndDate:
          geofences.rows[i]?.startDateTime && geofences.rows[i]?.endDateTime
            ? `${new Date(geofences.rows[i].startDateTime).toLocaleDateString(
                "en-CA"
              )} - ${new Date(geofences.rows[i].endDateTime).toLocaleDateString("en-CA")}`
            : "-",
      };
      processedData.push(tmpObj);
    }
    let pdfInputObj = {
      title: "FARM ACTIVITY REPORT",
      subHeader: {
        userName: req.user,
        reportDate: new Date().toLocaleDateString(),
      },
      tableData: processedData,
      translations: ejsTranslation[req.headers.lang || "en"] ?? {},
    };
    let pdfData;
    if (processedData.length === 0) {
      return res.json(
        errorRespSync({
          msg: success.NO_RESPONSE,
        })
      );
    } else {
      pdfData = await generateListViewDownload(pdfInputObj, req);
    }

    if (!pdfData) {
      return res.json(
        errorRespSync({
          msg: "PDF report generation failed.",
        })
      );
    } else {
      res.writeHead(200, {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=" + pdfData.fileName,
      });
      return fs.createReadStream(pdfData.path).pipe(res);
    }
  } catch (err) {
    logErrorOccurred(__filename, err);

    return serverError(res, err);
  }
});

router.get("/calendar-view-download", authMiddleware, async (req, res) => {
  try {
    const { page, limit, country = null, farmName = null, cropType = null, startDate = null, searchPhrase = null, scheduledActivity = "scheduled", endDate = null }  = req.query;

    let whereOption = {}
    if(startDate) {
      whereOption.startDateTime ={ [db.Sequelize.Op.gte]: `${startDate}T00:00:00.000Z` } // only do where query if startDate is provided and T00:00:00.000Z avoids UTC conversion
    }
    if(scheduledActivity == "completed" && endDate) {
      whereOption.endDateTime ={ [db.Sequelize.Op.lte]: `${endDate}T00:00:00.000Z` } // only do where query if startDate is provided and T00:00:00.000Z avoids UTC conversion
    }
    if(searchPhrase) {
      whereOption [Op.or] = [
        {
          '$Event.title$': {
            [Op.like]: `%${searchPhrase}%`
          }
        },
        {
          '$Event.description$': {
            [Op.like]: `%${searchPhrase}%`
          }
        },
        {
          '$user_farm.farmName$': {
            [Op.like]: `%${searchPhrase}%`
          }
        },
        {
          '$user.firstName$': {
            [Op.like]: `%${searchPhrase}%`
          }
        },
        {
          '$user.middleName$': {
            [Op.like]: `%${searchPhrase}%`
          }
        },
        {
          '$user.lastName$': {
            [Op.like]: `%${searchPhrase}%`
          }
        }
      ]
    }
    if(country) {
      whereOption ['$user_farm.country$'] =  {
        [Op.like]: `%${country}%`
      }
    }
    let queryOptions = {
      include: [
        {
          model: db.user,
          attributes: ["firstName", "middleName", "lastName", "fullName"],
          where: {
            organization: req.user.organization,
          }
        },
        {
          model: db.user_farm,
          attributes: ["farmName", "country"],
          ...((farmName ) && { //farmName is farm id
            where: {
                 id: farmName
            }

          }),

        },
        {
          model: db.Option,
           as: "cropType",
           ...(cropType && { where : { id : cropType } }) // only do where query if cropType is provided
        },


      ],
      order: [["startDateTime", "ASC"]],
      where: whereOption
    }

    if (limit && page) {
      const limitValue = parseInt(limit);
      const offsetValue = (page - 1) * limitValue;
      queryOptions.limit = limitValue;
      queryOptions.offset = offsetValue;
    }

    // Get all the geolocation of the user
    let geofences = await db.Event.findAndCountAll(queryOptions);
    
    const processedData = [];
    for (let i = 0; i < geofences.rows.length; i++) {
      let tmpObj = {
        FarmName: geofences.rows[i]?.user_farm?.farmName,
        FarmerName: geofences.rows[i] && geofences.rows[i]?.user?.fullName,
        CropName: geofences.rows[i]?.cropType?.name,
        Activity: geofences.rows[i]?.title,
        StartEndDate:
          geofences.rows[i]?.startDateTime && geofences.rows[i]?.endDateTime
            ? `${new Date(geofences.rows[i].startDateTime).toLocaleDateString(
                "en-CA"
              )} - ${new Date(geofences.rows[i].endDateTime).toLocaleDateString("en-CA")}`
            : "-",
      };
      processedData.push(tmpObj);
    }
    let pdfInputObj = {
      title: "FARM ACTIVITY REPORT",
      subHeader: {
        userName: req.user,
        reportDate: new Date().toLocaleDateString(),
      },
      tableData: processedData,
      translations: ejsTranslation[req.headers.lang || "en"] ?? {},
    };
    let pdfData;
    if (processedData.length === 0) {
      return res.json(
        errorRespSync({
          msg: success.NO_RESPONSE,
        })
      );
    } else {
      pdfData = await generateListViewDownload(pdfInputObj, req);
    }

    if (!pdfData) {
      return res.json(
        errorRespSync({
          msg: "PDF report generation failed.",
        })
      );
    } else {
      res.writeHead(200, {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=" + pdfData.fileName,
      });
      return fs.createReadStream(pdfData.path).pipe(res);
    }
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

const generateListViewDownload = async (data, req) => {
  try {
    let fileName = data.title;
    let lang = req.headers.lang || "en";
    fileName += `-${Date.now()}-${req.headers?.lang ?? "en"}.pdf`;
    fileName = fileName.split(" ").join("-");
    fileName = fileName.replace(/\//g, "-");
    if (lang != "en") {
      data = translatedReportData(data, req.headers.lang);
    }
    // Read HTML Template
    const template = fs.readFileSync(
      path.resolve(__dirname, "./pdfFarmActivitiesReport.html"),
      "utf8"
    );
    let html = await ejs.render(template, { data: data });
    const fileDestination = path.resolve(
      __dirname,
      `../../../../views/reports/${fileName}`
    );
    const options = {
      format: "A4",
      path: fileDestination,
      printBackground: true,
    };
    let file = { content: html };
    let pdf = await html_to_pdf.generatePdf(file, options);
    if (pdf) {
      return {
        fileName,
        path: fileDestination,
      };
    }
  } catch (err) {
    console.log(err);
  }
};


module.exports = router;
