const db = require(rootPath + '/models');
const fs = require('fs');
const { default: axios } = require('axios');
const moment = require('moment');
const { Op, Sequelize } = require('sequelize');
const { escape } = require('sequelize/lib/sql-string');
const xlsx = require('xlsx');
const { calculateCenteroiPolygon, sendMsgToSQS } = require('../routes/report/utils');
const generatePDF = require(rootPath + '/helpers/pdfGenerator');
const { getAreaFromPolygonsInAcre, getAreaFromCircularInAcre } = require(rootPath + '/helpers/geo-utils');
const { successRespSync, serverError, errorRespSync } = require(rootPath + '/helpers/api');
const { success, error } = require(rootPath + '/helpers/language');
const { logErrorOccurred } = require(rootPath + '/helpers/general');
const { v4: uuid } = require('uuid');
const path = require('path');
const ejs = require('ejs');
const html_to_pdf = require('html-pdf-node');
const { getSignedURLs3West } = require(rootPath + '/helpers/aws_s3');
const simpleTranslate = require(rootPath + '/helpers/simpleTranslate')
const translation = require(rootPath + '/middleware/translation');

const BASIC_REPORT_TYPES = ['NDVI', 'MSAVI', 'NDRE', 'RECI', 'LSWI'];
const satelliteReportApiInstance = axios.create({
  baseURL: process.env.SATELLITE_REPORT_API_BASEURL || 'https://land-score-api-prod.dimitra.dev/',
});

const getQueryParamsForSatelliteReports = (queryObj) => {
  const page = queryObj.page && !isNaN(Number(queryObj.page)) ? Math.abs(parseInt(queryObj.page)) : 1;
  const limit = queryObj.limit && !isNaN(Number(queryObj.limit)) ? Math.abs(parseInt(queryObj.limit)) : 10;
  const search = queryObj.search ? queryObj.search.toString().trim() : null;
  const countries = Array.isArray(queryObj.countries)
    ? queryObj.countries.filter(
        (country) => (typeof country === 'string' && country.length) || typeof country === 'number'
      )
    : [];
  const regions = Array.isArray(queryObj.regions)
    ? queryObj.regions.filter((region) => (typeof region === 'string' && region.length) || typeof region === 'number')
    : [];
  const startDate = queryObj.startDate && moment(queryObj.startDate).isValid() ? queryObj.startDate : null;
  const endDate = queryObj.endDate && moment(queryObj.endDate).isValid() ? queryObj.endDate : null;
  const allowedOrder = ['asc', 'desc'];
  const order = allowedOrder.includes(queryObj.order?.toString().toLowerCase()) ? queryObj.order : 'desc';
  const allowedOrderByMap = {
    id: ['id', order],
    operatorName: [
      Sequelize.literal(
        'IF(`farm`.`isTechnician`, CONCAT_WS(" ", `farm->technician`.`firstName`, `farm->technician`.`lastName`), CONCAT_WS(" ", `farm->user`.`firstName`, `farm->user`.`lastName`))'
      ),
      order,
    ],
    farmName: ['farm', 'farmName', order],
    country: ['farm', 'country', order],
    centerLatitude: ['centerLatitude', order],
    centerLongitude: ['centerLongitude', order],
    createdAt: ['createdAt', order],
    status: ['status', order],
  };
  const parsedOrder = Object.keys(allowedOrderByMap).includes(queryObj.orderBy)
    ? allowedOrderByMap[queryObj.orderBy]
    : allowedOrderByMap.id;
  const farmIds = Array.isArray(queryObj.farmIds) ? queryObj.farmIds : [];
  const reportTypes = Array.isArray(queryObj.reportTypes) ? queryObj.reportTypes : [];
  return {
    page,
    limit,
    search,
    countries,
    regions,
    order: parsedOrder,
    offset: (page - 1) * limit,
    farmIds,
    reportTypes,
    startDate,
    endDate,
  };
};

const groupSatelliteReportsByRequestId = (satelliteReports, reportGroups, language) => {
  const groupedReports = [];
  satelliteReports.forEach((report) => {
    const groupIdx = reportGroups.findIndex((group) => group.requestId === report.requestId || group.id == report.id);
    if (groupedReports[groupIdx]) {
      groupedReports[groupIdx].reports.push(report);
    } else {
      groupedReports[groupIdx] = {
        id: report.id,
        userId: report.userId,
        createdAt: report.createdAt,
        updatedAt: report.updatedAt,
        dateOfInterest: report.dateOfInterest,
        ingestionDate: report.ingestionDate,
        language: report.language,
        requestId: report.requestId,
        farmId: report.farmId,
        reportGroup: report.reportGroup,
        generatedByUserId: report.generatedByUserId,
        satelliteSource: report.satelliteSource,
        centerLongitude: report.centerLongitude,
        centerLatitude: report.centerLatitude,
        zoomLevel: report.zoomLevel,
        status: report.status,
            //translate status
        farm: report.farm,
        reports: [report],
        coordinates: [], // App is expecting it to be array
        maxCloudCoverage: report.maxCloudCoverage,
      };
    }
  });

  groupedReports.forEach((group) => {
    const isCompleted = group.reports.every((report) => report.status === 'COMPLETED');
    if (!isCompleted) {
      group.status = group.reports.find((report) => report.status !== 'COMPLETED')?.status;
    }
  });
  return groupedReports;
};

const getReportsMetadata = async (reports, language) => {
  try {
    const completedReportsPayload = [];
    reports.forEach((report) => {
      if (report.status === 'COMPLETED') {
        completedReportsPayload.push({
          reportId: report.id,
          reportType: report.reportType,
        });
      }
    });

    if (!completedReportsPayload.length) {
      return {
        success: true,
        message: 'Successfully fetched satellite report details.',
        result: [],
      };
    }
    const requestPayload = {
      language,
      reports: completedReportsPayload,
    };

    const response = await satelliteReportApiInstance.post('/satellite-report-details', requestPayload);
    return {
      message: response.data.message,
      success: response.data.success,
      result: response.data.result,
    };
  } catch (error) {
    console.error(error);
    return {
      message: error.message,
      success: false,
    };
  }
};

const attachReportUrls = async (reports) => {
  let parsedReports = reports.map((report) => report.toJSON());
  for (const report of parsedReports) {
    if (report.status !== 'COMPLETED') continue;
    const params = {
      Bucket: process.env.AWS_REPORT_BUCKET,
      Expires: 60 * 60,
    };
    Object.assign(report, {
      inputImageURL: report.inputImage
        ? await getSignedURLs3West('getObject', { ...params, Key: report.inputImage })
        : null,
      geoImageURL: report.geoImagePath
        ? await getSignedURLs3West('getObject', { ...params, Key: report.geoImagePath })
        : null,
      shortImageURL: report.shortImagePath
        ? await getSignedURLs3West('getObject', { ...params, Key: report.shortImagePath })
        : null,
      reportDownloadUrl: report.reportS3Key
        ? await getSignedURLs3West('getObject', { ...params, Key: report.reportS3Key })
        : null,
      pngURL: report.pngS3Key ? await getSignedURLs3West('getObject', { ...params, Key: report.pngS3Key }) : null,
    });
  }

  return parsedReports;
};

const getSatelliteReports = async (filters = {}, includeReportsMetadata = false, language = 'en') => {
  const {
    countries,
    startDate,
    endDate,
    limit,
    order,
    regions,
    search,
    offset,
    farmIds,
    organizationId,
    userId,
    reportGroup,
    reportTypes,
  } = filters;
  const reportGroupWhere = {
    deletedAt: { [Op.is]: null },
  };

  if (reportTypes?.length) {
    reportGroupWhere.reportType = { [Op.in]: reportTypes };
  }

  if (farmIds?.length) {
    reportGroupWhere.farmId = { [Op.in]: farmIds };
  }

  if (filters.organizationId) {
    const users = await db.user.findAll({
      attributes: ['id'],
      where: {
        organization: organizationId,
      },
    });
    const userIds = users.map((user) => user.id);
    reportGroupWhere.userId = { [Op.in]: userIds };
  } else {
    reportGroupWhere.userId = userId;
  }

  if (startDate && endDate) {
    reportGroupWhere.createdAt = { [Op.gte]: moment(startDate).startOf('day'), [Op.lte]: moment(endDate).endOf('day') };
  } else if (startDate) {
    reportGroupWhere.createdAt = { [Op.gte]: moment(startDate).startOf('day') };
  } else if (endDate) {
    reportGroupWhere.createdAt = { [Op.lte]: moment(endDate).endOf('day') };
  }

  if (reportGroup) {
    reportGroupWhere.reportGroup = reportGroup;
  }

  if (search) {
    const escapedSearch = escape(`%${search}%`);
    const searchLike = { [Op.like]: `%${search}%` };
    reportGroupWhere[Op.or] = [
      { id: searchLike },
      Sequelize.literal(
        'IF(ISNULL(`farm->technician`.`firstName`), CONCAT_WS(" ", `farm->user`.`firstName`, `farm->user`.`lastName`), CONCAT_WS(" ", `farm->technician`.`firstName`, `farm->technician`.`lastName`)) LIKE ' +
          escapedSearch
      ),
      Sequelize.literal('`farm`.`country` LIKE ' + escapedSearch),
      Sequelize.literal('`farm`.`region` LIKE ' + escapedSearch),
      Sequelize.literal('`farm`.`state` LIKE ' + escapedSearch),
      Sequelize.literal('`farm`.`farmName` LIKE ' + escapedSearch),
    ];
  }

  const farmsWhere = {
    isDeleted: false,
  };
  if (countries?.length) {
    farmsWhere.country = { [Op.in]: countries };
  }
  if (regions?.length) {
    farmsWhere[Op.or] = [{ region: { [Op.in]: regions } }, { state: { [Op.in]: regions } }];
  }

  const dbGroupedReportData = await db.satellite_report.findAndCountAll({
    attributes: ['id', 'requestId'],
    where: reportGroupWhere,
    include: [
      {
        model: db.user_farm,
        as: 'farm',
        where: farmsWhere,
        required: true,
        attributes: [],
        include: [
          {
            model: db.user,
            as: 'technician',
            attributes: [],
          },
          {
            model: db.user,
            as: 'user',
            attributes: [],
          },
        ],
      },
    ],
    group: [Sequelize.fn('IFNULL', Sequelize.col('satellite_report.requestId'), Sequelize.col('satellite_report.id'))],
    order: [order],
    offset,
    limit,
  });

  if (!dbGroupedReportData.rows.length) {
    return {
      totalNumberOfReportGroups: dbGroupedReportData.count.length,
      rows: [],
    };
  }

  const reportIds = [];
  const requestIds = [];
  dbGroupedReportData.rows.forEach((groupedReport) => {
    if (groupedReport.requestId) {
      requestIds.push(groupedReport.requestId);
    } else {
      reportIds.push(groupedReport.id);
    }
  });

  const reportWhere = {
    deletedAt: { [Op.is]: null },
  };
  if (reportTypes?.length) {
    reportWhere.reportType = { [Op.in]: reportTypes };
  }
  if (reportIds.length && requestIds.length) {
    reportWhere[Op.or] = [{ requestId: { [Op.in]: requestIds } }, { id: { [Op.in]: reportIds } }];
  } else if (requestIds.length) {
    reportWhere.requestId = { [Op.in]: requestIds };
  } else if (reportIds.length) {
    reportWhere.id = { [Op.in]: reportIds };
  }

  let reports = await db.satellite_report.findAll({
    where: reportWhere,
    attributes: [
      'id',
      'reportType',
      'zoomLevel',
      'centerLatitude',
      'centerLongitude',
      'satelliteSource',
      'inputImage',
      'geoImagePath',
      'shortImagePath',
      'reportPDFPath',
      'status',
      'createdAt',
      'updatedAt',
      'reportS3Key',
      'reportName',
      'dateOfInterest',
      'inputImgS3Key',
      'ingestionDate',
      'language',
      'requestId',
      'farmId',
      'geofenceId',
      'generatedByUserId',
      'reportGroup',
      'maxCloudCoverage',
      'pngS3Key',
      'radius',
    ],
    include: [
      {
        model: db.user_farm,
        as: 'farm',
        required: true,
        where: farmsWhere,
        attributes: [
          'id',
          'farmName',
          'country',
          'isTechnician',
          'farmerFirstName',
          'farmerMiddleName',
          'farmerLastName',
          'farmerId',
          'technicianId',
          'userId',
        ],
        include: [
          {
            model: db.user,
            as: 'technician',
            attributes: ['id', 'firstName', 'lastName', 'country'],
          },
          {
            model: db.user,
            as: 'user',
            attributes: ['id', 'firstName', 'lastName', 'country'],
          },
        ],
      },
      {
        model: db.Geofence,
        as: 'geofence',
      },
      {
        model: db.satellite_report_coordinates,
        attributes: ['latitude', 'longitude'],
        as: 'coordinates',
      },
    ],
  });

  reports = await attachReportUrls(reports);
  reports = reports.map((report) => {
    let areaInAcre = report.areaInAcre;
    if (!areaInAcre) {
      if (report.radius) {
        areaInAcre = getAreaFromCircularInAcre(report.radius);
        // report.status = "REPORT UNAVAILABLE FOR CIRCULAR GEOFENCE" // we dont have circular geofence support for this report, remove this when we have circular geofence support from python side
      } else {
        areaInAcre = getAreaFromPolygonsInAcre(
          report.coordinates.map((coordinate) => ({ log: coordinate.longitude, lat: coordinate.latitude }))
        );
      }
    }
    report.areaInAcre = areaInAcre;

    return report;
  });

  if (includeReportsMetadata) {
    const reportsMetadataResponse = await getReportsMetadata(reports, language);
    if (reportsMetadataResponse.success) {
      if (Array.isArray(reportsMetadataResponse.result) && reportsMetadataResponse.result.length) {
        reports.forEach((report) => {
          report.metadata = reportsMetadataResponse.result.find((item) => item.reportId == report.id) ?? null;
        });
      }
    } else {
      throw new Error(reportsMetadataResponse.message);
    }
  }

  const groupedReports = groupSatelliteReportsByRequestId(reports, dbGroupedReportData.rows, language);

  return {
    totalNumberOfReportGroups: dbGroupedReportData.count.length,
    rows: groupedReports,
  };
};

const getSatelliteReportGroupById = async (idOrRequestId, includeReportsMetadata, language, filter = {}) => {
  const where = {
    deletedAt: { [Op.is]: null },
  };
  if (isNaN(Number(idOrRequestId))) {
    where.requestId = idOrRequestId;
  } else {
    where[Op.or] = [{ id: idOrRequestId }, { requestId: idOrRequestId }];
  }
  const report = await db.satellite_report.findOne({
    where,
    attributes: ['id', 'requestId'],
  });

  if (!report) return null;

  let reportsWhere = {
    deletedAt: { [Op.is]: null },
  };

  if (filter) {
    reportsWhere = { ...filter, ...reportsWhere };
  }

  if (report.requestId) {
    reportsWhere.requestId = report.requestId;
  } else {
    reportsWhere.id = report.id;
  }

  let allReports = await db.satellite_report.findAll({
    where: reportsWhere,
    attributes: [
      'id',
      'reportType',
      'zoomLevel',
      'centerLatitude',
      'centerLongitude',
      'satelliteSource',
      'inputImage',
      'geoImagePath',
      'shortImagePath',
      'reportPDFPath',
      'status',
      'createdAt',
      'updatedAt',
      'reportS3Key',
      'reportName',
      'dateOfInterest',
      'inputImgS3Key',
      'ingestionDate',
      'language',
      'requestId',
      'farmId',
      'geofenceId',
      'generatedByUserId',
      'reportGroup',
      'maxCloudCoverage',
      'pngS3Key',
      'radius',
    ],
    include: [
      {
        model: db.user_farm,
        as: 'farm',
        required: true,
        where: {
          isDeleted: false,
        },
        attributes: [
          'id',
          'farmName',
          'country',
          'isTechnician',
          'farmerFirstName',
          'farmerMiddleName',
          'farmerLastName',
          'farmerId',
          'technicianId',
          'userId',
        ],
        include: [
          {
            model: db.user,
            as: 'technician',
            attributes: ['id', 'firstName', 'lastName', 'country'],
          },
          {
            model: db.user,
            as: 'user',
            attributes: ['id', 'firstName', 'lastName', 'country'],
          },
        ],
      },
      {
        model: db.Geofence,
        as: 'geofence',
      },
      {
        model: db.satellite_report_coordinates,
        attributes: ['latitude', 'longitude'],
        as: 'coordinates',
      },
    ],
  });

  allReports = await attachReportUrls(allReports);
  allReports = allReports.map((report) => {
    let areaInAcre = report.areaInAcre;
    if (!areaInAcre) {
      if (report.radius) {
        areaInAcre = getAreaFromCircularInAcre(report.radius);
      } else {
        areaInAcre = getAreaFromPolygonsInAcre(
          report.coordinates.map((coordinate) => ({ log: coordinate.longitude, lat: coordinate.latitude }))
        );
      }
    }
    report.areaInAcre = areaInAcre;
    return report;
  });

  if (includeReportsMetadata) {
    const reportsMetadataResponse = await getReportsMetadata(allReports, language);
    if (reportsMetadataResponse.success) {
      if (Array.isArray(reportsMetadataResponse.result)) {
        allReports.forEach((report) => {
          report.metadata = reportsMetadataResponse.result.find((item) => item.reportId == report.id) ?? null;
        });
      }
    } else {
      throw new Error(reportsMetadataResponse.message);
    }
  }

  const groupedReports = groupSatelliteReportsByRequestId(allReports, [{ requestId: report.requestId }]);

  return groupedReports[0];
};

const deleteSatelliteReportByRequestId = async (requestId) => {
  try {
    await db.satellite_report.destroy({
      where: {
        requestId,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const exportCropHealthReportListingRouteHandler = async (req, res) => {
  try {
    const allowedFileTypes = ['csv', 'xlsx', 'pdf'];
    const fileType = req.params.fileType.toLowerCase();

    if (!allowedFileTypes.includes(fileType)) {
      return res.json(
        errorRespSync({
          msg: error.INVALID_FILE,
        })
      );
    }

    const lang = req.headers.lang || 'en';

    const organization = req.user.organization;
    const queryParams = getQueryParamsForSatelliteReports(req.query);
    delete queryParams.limit;
    delete queryParams.offset;

    const isAdmin = req.user.isAdmin;

    const satelliteReportsData = await getSatelliteReports({
      ...queryParams,
      organizationId: isAdmin ? organization : null,
      userId: isAdmin ? null : req.user.id,
      reportTypes: BASIC_REPORT_TYPES,
      reportGroup: 'Crop Health Report',
    });

    const headingOrder = [
      'ID',
      'Operator Name',
      'Farm Name',
      'Country',
      'Latitude',
      'Longitude',
      'Status',
      'Issue Date',
    ];

    const headingTranslations = headingOrder.reduce((translation, heading) => {
      translation[heading] = lang === 'en' ? heading : req.simpleTranslate(heading);
      return translation;
    }, {});

    const reports = satelliteReportsData.rows.length ? satelliteReportsData.rows : [{}];
    const reportsData = reports.map((report) => {
      let operatorName = report.farm
        ? report.farm.isTechnician && report.farm.technician
          ? `${report.farm.technician?.firstName ?? ''} ${report.farm.technician?.lastName ?? ''}`
          : `${report.farm.user?.firstName ?? ''} ${report.farm.user?.lastName ?? ''}`
        : '';
      operatorName = operatorName.trim();
      return {
        [headingTranslations.ID]: report.id ?? '',
        [headingTranslations['Operator Name']]: operatorName,
        [headingTranslations['Farm Name']]: report.farm?.farmName ?? '',
        [headingTranslations.Country]: report.farm?.country ?? '',
        [headingTranslations.Latitude]: report.centerLatitude ?? '',
        [headingTranslations.Longitude]: report.centerLongitude ?? '',
        [headingTranslations.Status]: report.status
          ? lang !== 'en'
            ? req.simpleTranslate(report.status.split('-').join(' '))
            : report.status.split('-').join(' ')
          : '',
        [headingTranslations['Issue Date']]: report.createdAt ? moment(report.createdAt).format('M/D/YYYY') : '',
      };
    });

    if (fileType === 'xlsx' || fileType === 'csv') {
      const xlsSheet = xlsx.utils.json_to_sheet(reportsData, {
        header: headingOrder.map((heading) => headingTranslations[heading]),
      });
      const fileName = `satellite_reports_${Date.now()}.${fileType}`;
      if(fileType === 'xlsx') {
        const workbook = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(workbook, xlsSheet, `satellite_reports_${Date.now()}`);

        const directoryPath = rootPath + '/files';
        if (!fs.existsSync(directoryPath)) {
          fs.mkdirSync(directoryPath, { recursive: true });
        }
        const filePath = `${directoryPath}/${fileName}`;
        xlsx.writeFileXLSX(workbook, filePath);
        res.writeHead(200, {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'Content-Disposition': 'attachment; filename=' + fileName,
        });
        return fs.createReadStream(filePath).pipe(res);
      } else {
        const csvStream = xlsx.stream.to_csv(xlsSheet);
        res.writeHead(200, {
          'Content-Type': 'application/csv',
          'Content-Disposition': 'attachment; filename=' + fileName,
        });
        return csvStream.pipe(res);
      }
    } else {
      const pdfData = await generatePDF(
        {
          title: 'Satellite Report',
          tableData: reportsData,
        },
        req
      );
      if (pdfData) {
        res.writeHead(200, {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'attachment; filename=' + pdfData.fileName,
        });
        return fs.createReadStream(pdfData.path).pipe(res);
      }
    }
    return res.json(
      errorRespSync({
        msg: error.SERVER,
      })
    );
  } catch (error) {
    console.log(error);
    logErrorOccurred(__filename, error);
    return serverError(res, error);
  }
};

const generateCropHealthReportRouteHandler = async (req, res) => {
  const requestId = uuid();
  try {
    const { id: userId, organization, isAdmin } = req.user;
    const language = req.headers['lang'] || 'en';
    const { farmId, dateOfInterest, maxCloudCoverage, geofenceIds } = req.body;

    const allowedFarmUserIds = [userId];
    if (isAdmin) {
      const users = await db.user.findAll({
        attributes: ['id'],
        where: {
          organization,
        },
      });
      users.forEach((user) => allowedFarmUserIds.push(user.id));
    }

    const farmIncludes = [
      {
        model: db.UserFarmCoordinate,
        as: 'farmCoordinates',
        required: false,
      },
    ];
    if (geofenceIds && geofenceIds.length) {
      farmIncludes.push({
        model: db.Geofence,
        as: 'zones',
        where: {
          [Op.or]: [
            { id: { [Op.in]: geofenceIds.filter((id) => !isNaN(Number(id))) } },
            { recordId: { [Op.in]: geofenceIds } },
          ],
        },
        required: true,
        include: [
          {
            model: db.GeofenceCoordinate,
            as: 'geofence_coordinates',
            required: false,
          },
        ],
      });
    } else {
      farmIncludes.push({
        model: db.Geofence,
        as: 'segments',
        where: {
          isPrimary: true,
          geofenceRadius: { [Op.not]: null },
          geofenceCenterLat: { [Op.not]: null },
          geofenceCenterLog: { [Op.not]: null },
        },
        required: false,
      });
    }


    const farm = await db.user_farm.findOne({
      attributes: ['id', 'userId', 'technicianId', 'isTechnician','area'],
      where: {
        [Op.and]: [
          {
            [Op.or]: [{ id: farmId }, { recordId: farmId }],
          },
          {
            [Op.or]: [{ userId: { [Op.in]: allowedFarmUserIds } }, { technicianId: { [Op.in]: allowedFarmUserIds } }],
          },
          { isDeleted: 0 },
        ],
      },
      include: farmIncludes,
    });


    if (!farm) {
      return res.json(
        errorRespSync({
          msg: error.DOESNT_EXISTS,
          code: error.code.NOT_FOUND,
        })
      );
    }
    
    const MAX_ALLOWED_AREA_IN_ACRE = 2471.05;
    
    if(farm.area > MAX_ALLOWED_AREA_IN_ACRE){    
      return res.json(
        errorRespSync({
          msg: req.simpleTranslate(error.AREA_TOO_LARGE),
          code: error.code.UNPROCESSABLE_ENTITY,
        })
      );
    }
    const reportSet = [];
    const createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
    const reportUserId = isAdmin ? (farm.isTechnician && farm.technicianId ? farm.technicianId : farm.userId) : userId;

    if (geofenceIds && geofenceIds.length) {
      const stringifiedGeofenceIds = geofenceIds.map((id) => id.toString());
      await Promise.all(
        farm.zones.map(async (zone) => {
          const isCircularZone = zone.geofenceRadius && zone.geofenceCenterLat && zone.geofenceCenterLog;
          const hasGeofence = zone.geofence_coordinates?.length || isCircularZone;
          if (
            (stringifiedGeofenceIds.includes(zone.id.toString()) || stringifiedGeofenceIds.includes(zone.recordId)) &&
            hasGeofence
          ) {
            
            // zone area validation
            if (zone.geofenceArea > MAX_ALLOWED_AREA_IN_ACRE) {
              throw new Error(req.simpleTranslate(error.AREA_TOO_LARGE));
            }

            let coordinates = zone.geofence_coordinates?.map((coordinate) => ({
              latitude: coordinate.lat,
              longitude: coordinate.log,
            }));
            if (isCircularZone) {
              coordinates = [{ latitude: zone.geofenceCenterLat, longitude: zone.geofenceCenterLog }];
            }
            for (const reportType of BASIC_REPORT_TYPES) {
              const [centerLatitude, centerLongitude] = await calculateCenteroiPolygon(coordinates);
              reportSet.push({
                reportType,
                userId: reportUserId,
                centerLatitude,
                centerLongitude,
                dateOfInterest: moment(dateOfInterest).format('YYYY-MM-DD'),
                language,
                requestId,
                farmId: farm.id,
                geofenceId: zone.id,
                generatedByUserId: userId,
                reportGroup: 'Crop Health Report',
                coordinates,
                createdAt,
                maxCloudCoverage,
                radius: isCircularZone ? zone.geofenceRadius : null,
              });
            }
          }
        })
      );
    } else if (farm.farmCoordinates?.length || farm.segments?.length) {
      let coordinates = farm.farmCoordinates?.map((coordinate) => ({
        latitude: coordinate.lat,
        longitude: coordinate.log,
      }));
      const isCircularFarmGeofence = farm.segments?.length;
      const segment = farm.segments?.[0];
      if (isCircularFarmGeofence) {
        coordinates = [{ latitude: segment.geofenceCenterLat, longitude: segment.geofenceCenterLog }];
      }
      const [centerLatitude, centerLongitude] = await calculateCenteroiPolygon(coordinates);
      for (const reportType of BASIC_REPORT_TYPES) {
        reportSet.push({
          reportType,
          userId: reportUserId,
          centerLatitude,
          centerLongitude,
          dateOfInterest: moment(dateOfInterest).format('YYYY-MM-DD'),
          language,
          requestId,
          farmId: farm.id,
          generatedByUserId: userId,
          reportGroup: 'Crop Health Report',
          coordinates,
          createdAt,
          maxCloudCoverage,
          radius: isCircularFarmGeofence ? segment.geofenceRadius : null,
        });
      }
    }

    if (!reportSet.length) {
      return res.json(
        errorRespSync({
          msg: error.DOESNT_EXISTS,
          code: error.code.NOT_FOUND,
        })
      );
    }

    console.log(farm)


    await db.satellite_report.bulkCreate(reportSet, {
      include: [
        {
          model: db.satellite_report_coordinates,
          as: 'coordinates',
        },
      ],
    });

    await sendMsgToSQS(reportUserId, createdAt);

    const groupedReport = await getSatelliteReportGroupById(requestId, true, language, {
      reportType: { [Op.in]: BASIC_REPORT_TYPES },
      reportGroup: 'Crop Health Report',
    });

    return res.json(
      successRespSync({
        msg: success.REPORT_ADDED,
        data: groupedReport,
      })
    );
  } catch (error) {
    await deleteSatelliteReportByRequestId(requestId);
    console.log(error);
    logErrorOccurred(__filename, error);
    return serverError(res, error);
  }
};

const downloadCropHealthPdfRouteHandler = async (req, res) => {
  try {
    const reportId = req.params.id;
    const lang = req.headers.lang || 'en';
    const mapImageFile = req.file;
    if (
      !mapImageFile ||
      typeof mapImageFile !== 'object' ||
      !mapImageFile.mimetype.startsWith('image/') ||
      !(mapImageFile.buffer instanceof Buffer)
    ) {
      return res.json(
        errorRespSync({
          code: error.code.BAD_REQUEST,
          msg: error.INVALID_FILE,
        })
      );
    }
    let report = await db.satellite_report.findOne({
      where: { id: reportId, deletedAt: { [Op.is]: null } },
      attributes: [
        'id',
        'reportType',
        'zoomLevel',
        'centerLatitude',
        'centerLongitude',
        'satelliteSource',
        'inputImage',
        'geoImagePath',
        'shortImagePath',
        'reportPDFPath',
        'status',
        'createdAt',
        'updatedAt',
        'reportS3Key',
        'reportName',
        'dateOfInterest',
        'inputImgS3Key',
        'ingestionDate',
        'language',
        'requestId',
        'farmId',
        'geofenceId',
        'generatedByUserId',
        'reportGroup',
        'maxCloudCoverage',
        'pngS3Key',
        'radius',
      ],
      include: [
        {
          model: db.user_farm,
          as: 'farm',
          required: true,
          where: {
            isDeleted: false,
          },
          attributes: ['address'],
        },
        {
          model: db.satellite_report_coordinates,
          attributes: ['latitude', 'longitude'],
          as: 'coordinates',
        },
      ],
    });

    if (!report) {
      if (!report) {
        return res.json(
          errorRespSync({
            code: error.code.NOT_FOUND,
            msg: error.REPORT_DATA_DOESNOT_EXISTS,
          })
        );
      }
    }

    if (report.status !== 'COMPLETED') {
      return res.json(
        errorRespSync({
          code: error.code.BAD_REQUEST,
          msg: 'Report is not completed',
        })
      );
    }

    report = report.toJSON();
    const reportsMetadata = await getReportsMetadata([report], lang);
    if (!reportsMetadata.success || !Array.isArray(reportsMetadata.result) || !reportsMetadata.result?.length) {
      throw new Error(reportsMetadataResponse.message);
    }
    const metadataDetail = reportsMetadata.result[0].detail;

    const unitRes = await db.UserUnitConfiguration.findOne({
      where: {
        userId: req.user.id || report.userId,
      },
      include: [
        {
          model: db.UnitTypes,
          as: 'user_config_unitType',
          where: {
            name: 'Area',
          },
        },
        {
          model: db.UnitsList,
          as: 'user_config_unit',
        },
      ],
    });

    const areaUnit = unitRes?.user_config_unit?.abbvr || 'ac';
    const factor = unitRes?.user_config_unit?.factor ?? 1;
    let area = report.areaInAcre * factor;
    if (!area) {
      if (report.radius) {
        area = getAreaFromCircularInAcre(report.radius) * factor;
      } else {
        area =
          getAreaFromPolygonsInAcre(
            report.coordinates.map((coordinate) => ({ log: coordinate.longitude, lat: coordinate.latitude }))
          ) * factor;
      }
    }
    const data = {
      title: req.simpleTranslate('Satellite Report'),
      issueDateText: req.simpleTranslate('Report Issue Date'),
      areaOfInterestText: req.simpleTranslate('Area of Interest'),
      farmAddressText: req.simpleTranslate('Farm Address'),
      reportTitle: metadataDetail.title,
      doiText: metadataDetail.doiText,
      areaText: metadataDetail.areaText,
      cloudCoverageText: metadataDetail.cloudCoverageText,
      unitTextHectare: metadataDetail.unitTextHectare,
      unitTextAcre: metadataDetail.unitTextAcre,
      scaleNote1: metadataDetail.scaleNote1,
      scaleNote2: metadataDetail.scaleNote2,
      description: metadataDetail.description,
      reportType: report.reportType,
      issueDate: moment(report.createdAt).format('DD MMMM YYYY'),
      farmAddress: report.farm.address?.split('\n')[0],
      doi: moment(report.dateOfInterest).format('YYYY/MM/DD'),
      area,
      areaUnit,
      centerLatitude: report.centerLatitude,
      centerLongitude: report.centerLongitude,
      ingestionDate: moment(report.ingestionDate).format('YYYY/MM/DD'),
      mapImageSrc: `data:${mapImageFile.mimetype};base64,${mapImageFile.buffer.toString('base64')}`,
    };
    const filePath = path.join(__dirname, '..', `/views/satellite-report.html`);
    const htmlString = await ejs.renderFile(filePath, data);

    const pdf = await html_to_pdf.generatePdf(
      { content: htmlString },
      {
        format: 'A4',
        printBackground: true,
      }
    );

    if (!(pdf instanceof Buffer)) {
      throw new Error(error.SERVER);
    }

    res.writeHead(200, {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=Crop-Health-Reports-${report.reportType}-${report.id}-${
        report.farmId
      }-${Date.now()}.pdf`,
    });
    return res.end(pdf);
  } catch (error) {
    console.log(error);
    logErrorOccurred(__filename, error);
    return serverError(res, error);
  }
};

module.exports = {
  getQueryParamsForSatelliteReports,
  getSatelliteReports,
  getSatelliteReportGroupById,
  deleteSatelliteReportByRequestId,
  exportCropHealthReportListingRouteHandler,
  generateCropHealthReportRouteHandler,
  BASIC_REPORT_TYPES,
  downloadCropHealthPdfRouteHandler,
};
