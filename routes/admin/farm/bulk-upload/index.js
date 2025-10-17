const turf = require('@turf/turf');
const { Router } = require('express');
const multer = require('multer');
const topojsonClient = require('topojson-client');
const xlsx = require('xlsx');
const geobuf = require('geobuf');
const Pbf = require('pbf');
const geolib = require('geolib');
const s3upload = require('../../../../components/s3upload');
const { v4: uuid } = require('uuid');
const _ = require('lodash');
const {
  getAreaFromPolygonsInAcre,
  getPerimeterFromPolygonsInFeet,
  getAreaFromCircularInAcre,
  getPerimeterFromCircularInFeet,
  getCoordinateHash,
} = require('../../../../helpers/geo-utils');
const { Op } = require('sequelize');
const { GeoPackageAPI } = require('@ngageoint/geopackage');
const { GeoJSONToGeoPackage } = require('@ngageoint/geopackage-geojson-js');
const md5 = require('md5');
const authMiddleware = require(rootPath + '/middleware/auth');
const { errorRespSync, serverError, successRespSync } = require(rootPath + '/helpers/api');
const { error, success } = require(rootPath + '/helpers/language');
const db = require(rootPath + '/models');
const { isUniqueRegNoAndFarmNameTogether, farmAlreadyRegistered, getGeofenceByCoordinate } = require(rootPath + '/helpers/controller');
let timeout = require('express-timeout-handler');
const { notEmpty } = require(rootPath + '/helpers/general');
const headerTranslations = require('./bulk-upload-language-support');
let options = {
  timeout: 3000000, // 5mins

  onTimeout: function (req, res) {
    res.status(503).send('Service unavailable. Please retry.');
  },

  onDelayedResponse: function (req, method, args, requestTime) {
    console.log(`Attempted to call ${method} after timeout`);
  },

  disable: ['write', 'setHeaders', 'send', 'json', 'end'],
};
const router = Router();
const CSV_FILETYPES = ['text/csv'];
const XLSX_FILETYPES = [
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
];
const GEOJSON_FILETYPES = ['application/geo+json', '.geojson'];
const TOPOJSON_FILETYPES = ['.topojson'];
const GEOPACKAGE_FILETYPES = ['.gpkg'];
const GEOBUF_FILETYPES = ['.pbf'];
const ACCEPTED_FILETYPES = [
  ...CSV_FILETYPES,
  ...XLSX_FILETYPES,
  ...GEOJSON_FILETYPES,
  ...TOPOJSON_FILETYPES,
  ...GEOPACKAGE_FILETYPES,
  ...GEOBUF_FILETYPES,
];
const attributeMapping = {
  isTechnician: 'I am not a farmer',
  farmerUserId: 'User ID of Farmer',
  farmerRegistrationId: 'Farmer Registration ID',
  farmerId: 'Farmer ID',
  farmerFirstName: 'Farmer First Name',
  farmerMiddleName: 'Farmer Middle Name',
  farmerLastName: 'Farmer Last Name',
  farmId: 'Farm ID',
  farmName: 'Farm Name',
  farmRegistrationId: 'Farm Registration ID',
  ownershipType: 'Ownership Type',
  productionType: 'Production Type',
  country: 'Country',
  state: 'Province/State',
  city: 'Village/Town/City',
  street: 'Street Number',
  lat: 'Latitude',
  log: 'Longitude',
  geofence: 'Geofence Coordinates',
  geofenceName: 'Geofence Name',
  geofenceCategory: 'Geofence Category',
  geofenceType: 'Geofence Type',
  geofenceCenterLat: 'Geofence Center Latitude',
  geofenceCenterLog: 'Geofence Center Longitude',
  radius: 'Radius(in meters)',
};

const mapHeadersToStandard = (header) => {
  for (const [standardHeader, translations] of Object.entries(headerTranslations)) {
    if (translations.includes(header.trim())) {
      return standardHeader;
    }
  }
  return header; // Return original header if no mapping is found
};

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10485760, // 10485760 = 10 * 1024 * 1024 = 10MB
  },
  fileFilter: (_req, file, cb) => {
    const acceptedExtensions = ACCEPTED_FILETYPES.filter((type) => type.startsWith('.'));
    const fileExtension = file.originalname.split('.').pop();
    cb(null, ACCEPTED_FILETYPES.includes(file.mimetype) || acceptedExtensions.includes(`.${fileExtension}`));
  },
});
const fileUploadMiddlware = upload.single('file');

const isValidGeofenceDataString = (geofenceString) => {
  try {
    if (typeof geofenceString === 'string') {
      const geofenceData = JSON.parse(geofenceString);
      if (Array.isArray(geofenceData) && geofenceData.length > 3) {
        return geofenceData.every(
          (coordinate) =>
            Array.isArray(coordinate) &&
            coordinate.length >= 2 &&
            geolib.isValidLongitude(coordinate[0]) &&
            geolib.isValidLatitude(coordinate[1])
        );
      }
    }
    return false;
  } catch (error) {
    return false;
  }
};

const isJson = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

const parseCsvOrXlsxData = (fileBuffer) => {
  const workbook = xlsx.read(fileBuffer);

  return workbook.SheetNames.flatMap((sheetName) => {
    const sheet = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], {
      blankrows: false,
      raw: true,
      rawNumbers: true,
      header: 1, // Read raw rows for custom header mapping
    });

    // Extract headers and map them to standard headers
    const [headers, ...rows] = sheet;
    const standardizedHeaders = headers.map(mapHeadersToStandard);

    // Map rows to standardized headers and process geofence data
    return rows.map((row) => {
      const record = Object.fromEntries(standardizedHeaders.map((header, index) => [header, row[index]]));

      if (record[attributeMapping.geofence] && isValidGeofenceDataString(record[attributeMapping.geofence])) {
        record[attributeMapping.geofence] = JSON.parse(record[attributeMapping.geofence]);
      }

      const isCircularGeofenceType =
        (typeof record[attributeMapping.geofenceType] === 'string' &&
          record[attributeMapping.geofenceType].toLowerCase() === 'circular') ||
        !record[attributeMapping.geofence] ||
        !record[attributeMapping.geofence].trim().length;

      if (isCircularGeofenceType) {
        if (!record[attributeMapping.geofenceCenterLat]) record[attributeMapping.geofenceCenterLat] = record[attributeMapping.lat];
        if (!record[attributeMapping.geofenceCenterLog]) record[attributeMapping.geofenceCenterLog] = record[attributeMapping.log];
        record[attributeMapping.geofenceType] = 'Circular';
        
        // derive the radius of the circular geofence from the farm area in hectares
        if (
          record['Farm Area in Hectares'] &&
          !record[attributeMapping.radius]
        ) {
          const areaInHectares = Number(record['Farm Area in Hectares']);
          const radiusInMeters = Math.sqrt(areaInHectares / Math.PI) * 100;
          record['Radius(in meters)'] = radiusInMeters;
        }

        if(!record[attributeMapping.radius] && !record['Farm Area in Hectares']) {
          const defaultAreaInHectares = 4;
          const radiusInMeters = Math.sqrt(defaultAreaInHectares / Math.PI) * 100;
          record['Radius(in meters)'] = radiusInMeters;
        }
      }

      return record;
    });
  });
};

const parseGeoJsonData = (fileBufferOrFileData) => {
  const data = [];
  let fileData;
  if (fileBufferOrFileData instanceof Buffer) {
    const stringifiedData = fileBufferOrFileData.toString();
    fileData = isJson(stringifiedData) ? JSON.parse(stringifiedData) : null;
  } else {
    fileData = fileBufferOrFileData;
  }

  if (fileData && typeof fileData === 'object' && Array.isArray(fileData.features)) {
    for (const feature of fileData.features) {
      if (feature && typeof feature === 'object') {
        const coordinates = turf.getCoords(feature);
        const record = {};
        if (typeof feature.properties === 'object') {
          const properties = turf.filterProperties(feature.properties, Object.values(attributeMapping));
          Object.assign(record, properties);
        }
        const isCircularGeofenceType =
          typeof record[attributeMapping.geofenceType] === 'string' &&
          record[attributeMapping.geofenceType].toLowerCase() === 'circular';

        if (coordinates.length && coordinates[0].length) {
          record[attributeMapping.geofence] = coordinates[0];
          const centerPoint = turf.center(feature);
          if (centerPoint) {
            const centerCoordinate = turf.getCoord(centerPoint);
            record[attributeMapping.log] = centerCoordinate[0];
            record[attributeMapping.lat] = centerCoordinate[1];
            if (isCircularGeofenceType) {
              record[attributeMapping.geofenceCenterLog] = centerCoordinate[0];
              record[attributeMapping.geofenceCenterLat] = centerCoordinate[1];
              const radiusInKm = turf.distance(centerPoint, turf.point(coordinates[0][0]), {
                units: 'kilometers',
              });
              record[attributeMapping.radius] = turf.convertDistance(radiusInKm, 'kilometers', 'meters');
            }
          } else {
            record[attributeMapping.log] = coordinates[0][0][0];
            record[attributeMapping.lat] = coordinates[0][0][1];
          }
        }
        if (isCircularGeofenceType) delete record[attributeMapping.geofence];
        if (Object.values(record).length) data.push(record);
      }
    }
  }

  return data;
};

const parseTopoJsonData = (fileBuffer) => {
  const bufferString = fileBuffer.toString();
  const topoJsonContent = isJson(bufferString) ? JSON.parse(bufferString) : undefined;
  if (
    topoJsonContent &&
    typeof topoJsonContent === 'object' &&
    topoJsonContent.objects &&
    typeof topoJsonContent.objects === 'object' &&
    topoJsonContent.objects.collection &&
    typeof topoJsonContent.objects.collection === 'object'
  ) {
    const geoJsonData = topojsonClient.feature(topoJsonContent, topoJsonContent.objects.collection);
    return parseGeoJsonData(geoJsonData);
  }
  return [];
};

const parseGeoPackageData = async (fileBuffer) => {
  const converter = new GeoJSONToGeoPackage();
  const geoPackage = await GeoPackageAPI.open(fileBuffer);
  const features = [];
  const featureTableNames = geoPackage.getFeatureTables();
  for (const tableName of featureTableNames) {
    const featureCollection = await converter.extract(geoPackage, tableName);
    if (featureCollection && Array.isArray(featureCollection.features)) {
      features.push(...featureCollection.features);
    }
  }
  geoPackage.close();
  const geoJsonData = turf.featureCollection(features);
  return parseGeoJsonData(geoJsonData);
};

const parseGeobufData = (fileBuffer) => {
  const geoJsonData = geobuf.decode(new Pbf(fileBuffer));
  return parseGeoJsonData(geoJsonData);
};

const removeEmptyObjFromArray = (arrayOfObj) => {
  return arrayOfObj.filter((obj) => {
    if (!obj) return false;
    if (!Object.keys(obj).length) return false;
    const isEveryValueEmpty = Object.values(obj).every(
      (value) => value === null || typeof value === 'undefined' || !value.toString().trim().length
    );
    return !isEveryValueEmpty;
  });
};

const mapFarmFileDataToAttributes = async (farmData, currentUser, membershipId) => {
  const farms = [];
  for (const farm of farmData) {
    const isTechnicianVal = farm[attributeMapping.isTechnician];
    const farmerUserId = farm[attributeMapping.farmerUserId];
    const isTechnician = !isTechnicianVal ||
      isTechnicianVal === true ||
      isTechnicianVal?.toString().toLowerCase() === 'true' ||
      isTechnicianVal?.toString() === '1' ||
      isTechnicianVal?.toString().toLowerCase() === 'no';
    const address = [farm[attributeMapping.street], farm[attributeMapping.city], farm[attributeMapping.country]]
      .filter(Boolean)
      .join(', ');
    const attributeObj = {
      isTechnician,
      recordId: md5(uuid()),
      farmerFirstName: farm[attributeMapping.farmerFirstName],
      farmerMiddleName: farm[attributeMapping.farmerMiddleName],
      farmerLastName: farm[attributeMapping.farmerLastName],
      farmerId: farm[attributeMapping.farmerId],
      farmerRegistrationId: farm[attributeMapping.farmerRegistrationId],
      registrationNo: farm[attributeMapping.farmId],
      farmRegistrationId: farm[attributeMapping.farmRegistrationId],
      farmOwnershipType: farm[attributeMapping.ownershipType],
      productionType: farm[attributeMapping.productionType],
      productionType: farm[attributeMapping.productionType],
      status: 'approved',
      dimitraFarmId: uuid(),
      state: farm[attributeMapping.state],
      country: farm[attributeMapping.country],
      city: farm[attributeMapping.city],
      farmName: farm[attributeMapping.farmName],
      address,
      lat: farm[attributeMapping.lat] && !isNaN(Number(farm[attributeMapping.lat])) ? Number(farm[attributeMapping.lat]) : null,
      log: farm[attributeMapping.log] && !isNaN(Number(farm[attributeMapping.log])) ? Number(farm[attributeMapping.log]) : null,
      farmGeofenceName: farm[attributeMapping.geofenceName],
      farmGeofenceCategory: farm[attributeMapping.geofenceCategory],
      inviteLink: process.env.SITEURL
        ? process.env.SITEURL + '?q=aGVsbG8gd29ybGQ='
        : 'https://' + req.get('host') + '?q=aGVsbG8gd29ybGQ=',
      mainLocation: {
        address,
        recordId: md5(uuid()),
        city: farm[attributeMapping.city],
        country: farm[attributeMapping.country],
        lat: farm[attributeMapping.lat] && !isNaN(Number(farm[attributeMapping.lat])) ? Number(farm[attributeMapping.lat]) : null,
        log: farm[attributeMapping.log] && !isNaN(Number(farm[attributeMapping.log])) ? Number(farm[attributeMapping.log]) : null,
        state: farm[attributeMapping.state],
        street: farm[attributeMapping.street],
        isPrimary: 1,
      },
      source: 'bulk_upload',
      farm_created_from: 'bulk_import',
    };

    if(!attributeObj.farmName || !attributeObj.farmName.toString().trim().length) {
      const farmName = [attributeObj.farmerFirstName, attributeObj.farmerMiddleName, attributeObj.farmerLastName, attributeObj.farmRegistrationId].filter(Boolean).join(' ').trim();
      attributeObj.farmName = farmName;
    }

    const farmerUser = notEmpty(farmerUserId) && !isNaN(Number(farmerUserId)) ? await db.user.findOne({
      where: { id: farmerUserId, organization: currentUser.organization },
      attributes: ['firstName', 'middleName', 'lastName', 'id', 'organization', 'subOrganizationId', 'userType'],
    }) : null;

    if (isTechnician) {
      if (!farmerUser) {
        attributeObj.user = {
          firstName: [farm[attributeMapping.farmerFirstName], farm[attributeMapping.farmerMiddleName]]
            .filter(Boolean)
            .join(' '),
          lastName: farm[attributeMapping.farmerLastName],
          organization: currentUser.organization,
          subOrganizationId: currentUser.subOrgId,
          userType: 'offline',
          membershipMap: membershipId
            ? {
                membership_id: membershipId,
              }
            : undefined,
        };
      } else {
        attributeObj.userId = farmerUser.id;
      }
      attributeObj.technicianId = farmerUser?.id || currentUser.id;
      attributeObj.adminTechnicianId = currentUser.id;
    } else {
      attributeObj.userId = farmerUser?.id || currentUser.id;
    }

    const isPolygonGeofenceType =
      typeof farm[attributeMapping.geofenceType] === 'string' &&
      farm[attributeMapping.geofenceType]?.toLowerCase() !== 'circular';
    const isCircularGeofenceType =
      typeof farm[attributeMapping.geofenceType] === 'string' &&
      farm[attributeMapping.geofenceType]?.toLowerCase() === 'circular';
    const hasPolygonGeofence = isPolygonGeofenceType && Array.isArray(farm[attributeMapping.geofence]);
    const hasCircularGeofence =
      isCircularGeofenceType && farm[attributeMapping.radius] && !isNaN(Number(farm[attributeMapping.radius]));
    const hasGeofence = hasPolygonGeofence || hasCircularGeofence;

    if (hasGeofence) {
      let area = null;
      let perimeter = null;
      attributeObj.mainLocation.mainGeofence = {
        isPrimary: 1,
        geofenceCategory: farm[attributeMapping.geofenceCategory],
        recordId: md5(uuid()),
      };
      if (hasPolygonGeofence) {
        const geofenceCoordinates = farm[attributeMapping.geofence].reduce((prevCoordinates, coordinate) => {
          const alreadyExist =
            prevCoordinates.findIndex(
              (prevCoordinate) => prevCoordinate.lat === coordinate[1] && prevCoordinate.log === coordinate[0]
            ) !== -1;
          if (!alreadyExist) {
            prevCoordinates.push({
              lat: Number(coordinate[1]),
              log: Number(coordinate[0]),
            });
          }
          return prevCoordinates;
        }, []);
        area = getAreaFromPolygonsInAcre(geofenceCoordinates);
        perimeter = getPerimeterFromPolygonsInFeet(geofenceCoordinates);
        attributeObj.farmCoordinates = geofenceCoordinates;
        attributeObj.mainLocation.mainGeofence.geofence_coordinates = geofenceCoordinates;
        attributeObj.mainLocation.mainGeofence.coordinateHash = getCoordinateHash(geofenceCoordinates);
      } else if (hasCircularGeofence) {
        const radius = Number(farm[attributeMapping.radius]);
        area = getAreaFromCircularInAcre(radius);
        perimeter = getPerimeterFromCircularInFeet(radius);
        attributeObj.mainLocation.mainGeofence.geofenceRadius = radius;
        attributeObj.mainLocation.mainGeofence.geofenceCenterLat = Number(farm[attributeMapping.geofenceCenterLat]);
        attributeObj.mainLocation.mainGeofence.geofenceCenterLog = Number(farm[attributeMapping.geofenceCenterLog]);
        attributeObj.mainLocation.mainGeofence.coordinateHash = getCoordinateHash({
          lng: farm[attributeMapping.geofenceCenterLog],
          lat: farm[attributeMapping.geofenceCenterLat],
          radius,
        });

        if(!attributeObj.lat) attributeObj.lat = Number(farm[attributeMapping.geofenceCenterLat]);
        if(!attributeObj.log) attributeObj.log = Number(farm[attributeMapping.geofenceCenterLog]);
      }
      attributeObj.area = area;
      attributeObj.mainLocation.area = area;
      attributeObj.parameter = perimeter;
      attributeObj.mainLocation.parameter = perimeter;
      attributeObj.mainLocation.mainGeofence.geofenceArea = area;
      attributeObj.mainLocation.mainGeofence.geofenceParameter = perimeter;
    }

    if(attributeObj.lat && attributeObj.log && !isNaN(Number(attributeObj.lat)) && !isNaN(Number(attributeObj.log))) {
      farms.push(attributeObj);
    }
  }
  return farms;
};

const importFarmData = async (farm, currentUser) => {
  try {
    const coordinateHash = farm.mainLocation?.mainGeofence?.coordinateHash || null;
    const isCircularFarm = farm.lat && farm.log && (!farm.farmCoordinates || !farm.farmCoordinates.length) && !isNaN(Number(farm.mainLocation?.mainGeofence?.geofenceRadius));
    
    const geofenceWithSameHash = await getGeofenceByCoordinate({
      coordinateHash,
      organizationId: currentUser.organization,
      subOrganizationId: currentUser.subOrganizationId,
      attributes: ['id'],
    });


    if(geofenceWithSameHash) {
      return {
        success: false,
        isHashMatch: true,
        errorMessage: error.FARM_EXIST_ALREADY,
      }
    }
    
    const centerLat = isCircularFarm ? farm.mainLocation.mainGeofence.geofenceCenterLat || farm.lat : null;
    const centerLog = isCircularFarm ? farm.mainLocation.mainGeofence.geofenceCenterLog || farm.log : null;
    if(centerLat && centerLog) {
      const geofenceWithSameCoordinate = await getGeofenceByCoordinate({
        centerLat,
        centerLog,
        organizationId: currentUser.organization,
        subOrganizationId: currentUser.subOrganizationId,
        attributes: ['id', 'farmId', 'farmLocationId'],
      });

      if(geofenceWithSameCoordinate) {
        await Promise.all([
          db.user_farm.update(
            { area: farm.area, parameter: farm.parameter },
            { where: { id: geofenceWithSameCoordinate.farmId } }
          ),
          db.FarmLocation.update(
            { area: farm.area, parameter: farm.parameter },
            { where: { id: geofenceWithSameCoordinate.farmLocationId } }
          ),
          db.Geofence.update(
            {
              geofenceArea: farm.area,
              geofenceParameter: farm.parameter,
              geofenceRadius: farm.mainLocation.mainGeofence.geofenceRadius,
              coordinateHash: farm.mainLocation.mainGeofence.coordinateHash
            },
            { where: { id: geofenceWithSameCoordinate.id } }
          )
        ]);
    
        return {
          success: false,
          isCircularFarmWithSameCoordinate: true,
          errorMessage: error.FARM_EXIST_ALREADY,
        };
      }
    }

    const isAlreadyRegistered = await farmAlreadyRegistered({ user: currentUser, body: farm });
    if (isAlreadyRegistered) {
      throw new Error(error.FARM_EXIST_ALREADY);
    }

    const isUnique = await isUniqueRegNoAndFarmNameTogether({ body: farm, user: currentUser });
    if (!isUnique) {
      throw new Error(error.NOT_UNIQUE_FARMNAME_AND_REGISTRATIONNO);
    }

    const createdFarmInfo = await db.user_farm.create(farm, {
      include: [{ association: 'user', include: [{ association: 'membershipMap' }] }],
    });
    let createdFarmCoordinates = [];
    if (farm.farmCoordinates && farm.farmCoordinates.length) {
      createdFarmCoordinates = await db.UserFarmCoordinate.bulkCreate(
        farm.farmCoordinates.map((coordinate) => ({
          ...coordinate,
          farmId: createdFarmInfo.id,
          userId: createdFarmInfo.userId,
        }))
      );
    }
    farm.mainLocation.userId = createdFarmInfo.userId;
    farm.mainLocation.farmId = createdFarmInfo.id;
    if (farm.mainLocation.mainGeofence) {
      farm.mainLocation.mainGeofence.userId = createdFarmInfo.userId;
      farm.mainLocation.mainGeofence.farmId = createdFarmInfo.id;
    }
    const createdFarmLocationInfo = await db.FarmLocation.create(farm.mainLocation, {
      include: [{ association: 'mainGeofence', include: [{ association: 'geofence_coordinates' }] }],
    });

    const record = createdFarmInfo.toJSON();
    record.mainLocation = createdFarmLocationInfo.toJSON();
    record.farmCoordinates = createdFarmCoordinates.map((item) => item.toJSON());
    return {
      success: true,
      record,
    };
  } catch (err) {
    console.log('FARM IMPORT ERROR', err);
    return {
      success: false,
      errorMessage: err?.message || error.SERVER,
    };
  }
};

const getFileFormat = (file) => {
  const mimetype = file.mimetype;
  const extension = `.${file.originalname.split('.').pop()}`;
  const xlsExtensions = XLSX_FILETYPES.filter((type) => type.startsWith('.'));
  const csvExtensions = CSV_FILETYPES.filter((type) => type.startsWith('.'));
  const geojsonExtensions = GEOJSON_FILETYPES.filter((type) => type.startsWith('.'));
  const topojsonExtensions = TOPOJSON_FILETYPES.filter((type) => type.startsWith('.'));
  const geoPackageExtensions = GEOPACKAGE_FILETYPES.filter((type) => type.startsWith('.'));
  const geobufExtensions = GEOBUF_FILETYPES.filter((type) => type.startsWith('.'));
  if (XLSX_FILETYPES.includes(mimetype) || xlsExtensions.includes(extension)) return 'xls';
  if (CSV_FILETYPES.includes(mimetype) || csvExtensions.includes(extension)) return 'csv';
  if (GEOJSON_FILETYPES.includes(mimetype) || geojsonExtensions.includes(extension)) return 'geojson';
  if (TOPOJSON_FILETYPES.includes(mimetype) || topojsonExtensions.includes(extension)) return 'topojson';
  if (GEOPACKAGE_FILETYPES.includes(mimetype) || geoPackageExtensions.includes(extension)) return 'geopackage';
  if (GEOBUF_FILETYPES.includes(mimetype) || geobufExtensions.includes(extension)) return 'geobuf';
  return null;
};

router.post('/', authMiddleware, timeout.set(3000000), async (req, res) => {
  fileUploadMiddlware(req, res, async (err) => {
    try {
      // Error handling
      if (err instanceof multer.MulterError) {
        return res.json(
          errorRespSync({
            code: err.code,
            msg: err.message,
          })
        );
      } else if (err) {
        return res.json(
          errorRespSync({
            code: error.code.BAD_REQUEST,
            msg: error.BAD_REQUEST,
          })
        );
      }
      const file = req.file;
      if (!file) {
        return res.json(
          errorRespSync({
            code: error.code.BAD_REQUEST,
            msg: error.BAD_REQUEST,
          })
        );
      }

      let data = [];

      // If everything is fine with file
      const fileFormat = getFileFormat(file);
      switch (fileFormat) {
        case 'csv':
        case 'xls':
          data = parseCsvOrXlsxData(file.buffer);
          break;
        case 'topojson':
          data = parseTopoJsonData(file.buffer);
          break;
        case 'geojson':
          data = parseGeoJsonData(file.buffer);
          break;
        case 'geopackage':
          data = await parseGeoPackageData(file.buffer);
          break;
        case 'geobuf':
          data = parseGeobufData(file.buffer);
          break;
        default:
          break;
      }

      data = removeEmptyObjFromArray(data);

      if (!data.length) {
        return res.json(
          errorRespSync({
            msg: error.DOESNT_EXISTS,
            code: error.code.UNPROCESSABLE_ENTITY,
          })
        );
      }

      const membershipResult = await db.sequelize.query(
        `
        SELECT u.*
        FROM (
          SELECT um.*
          FROM user_role_membership_map AS um
          WHERE um.user_role_id like '%farmer%'
        ) AS urmm
        INNER JOIN user_membership AS u ON urmm.membership_id = u.id
        WHERE u.org_id = ${req.user.organization};
      `,
        { type: db.Sequelize.QueryTypes.SELECT }
      );

      const membershipId = membershipResult.length ? membershipResult[0].id : null;
      const farms = await mapFarmFileDataToAttributes(data, req.user, membershipId);
      const bulkUploadRecords = [];
      for (const farm of farms) {
        const result = await importFarmData(farm, req.user);
        if (result.success) {
          bulkUploadRecords.push({
            status: 'SUCCESS',
            payloadJsonData: farm,
            recordedJsonData: result.record || null,
            isHashMatch: result.isHashMatch || false,
            isCircularFarmWithSameCoordinate: result.isCircularFarmWithSameCoordinate || false,
          });
        } else {
          bulkUploadRecords.push({
            status: 'FAILED',
            payloadJsonData: farm,
            errorMessage: result.errorMessage || 'Unknown',
            isHashMatch: result.isHashMatch || false,
            isCircularFarmWithSameCoordinate: result.isCircularFarmWithSameCoordinate || false,
          });
        }
      }

      const fileName = `farm-bulk-upload/${Date.now().toString()}`;
      const uploadResult = await s3upload.uploadFile(file, fileName);

      const farmBulkUpload = {
        originalFileName: file.originalname,
        s3FileKey: uploadResult.Key,
        location: uploadResult.Location,
        status: 'SUCCESS',
        uploadedByUserId: req.user.id,
        totalRecordsCount: bulkUploadRecords.length,
        failedRecordsCount: bulkUploadRecords.filter((record) => record.status === 'FAILED').length,
        records: bulkUploadRecords,
      };

      const result = await db.FarmBulkUpload.create(farmBulkUpload, {
        include: [{ association: 'records' }],
      });

      return res.json(
        successRespSync({
          msg: success.SAVED,
          data: result,
        })
      );
    } catch (error) {
      console.error('ERROR', error);
      return serverError(res, error);
    }
  });
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    let { search, limit = 10, page = 1, skipLimit, orderBy, order } = req.query;
    const whereQuery = {};
    if (typeof search === 'string' && search.trim().length) {
      const searchLike = { [Op.like]: `%${search.trim()}%` };
      whereQuery[Op.or] = [{ createdAt: searchLike }, { originalFileName: searchLike }, { status: searchLike }];
    }

    if (!limit || isNaN(Number(limit))) {
      limit = 10;
    }
    if (!page || isNaN(Number(page))) {
      page = 1;
    }

    const ACCEPTED_ORDER_BY = ['originalFileName', 'createdAt', 'status'];
    if (!ACCEPTED_ORDER_BY.includes(orderBy)) {
      orderBy = 'createdAt';
    }

    const ACCEPTED_ORDER = ['asc', 'desc'];
    if (!ACCEPTED_ORDER.includes(order?.toLowerCase())) {
      order = 'desc';
    }

    const result = await db.FarmBulkUpload.findAndCountAll({
      where: whereQuery,
      order: [[orderBy, order]],
      limit: skipLimit ? undefined : Number(limit),
      offset: skipLimit ? undefined : (Number(page) - 1) * Number(limit),
      include: [
        {
          model: db.user,
          where: {
            organization: req.user.organization,
            subOrganizationId: req.user.subOrgId || null,
          },
          as: 'uploader',
        },
      ],
    });

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: result,
      })
    );
  } catch (error) {
    console.error('ERROR', error);
    return serverError(res, error);
  }
});

router.delete('/records/:recordId', authMiddleware, async (req, res) => {
  try {
    const recordId = req.params.recordId;
    const record = await db.FarmBulkUploadRecord.findOne({
      where: { id: recordId, deletedAt: { [Op.is]: null } },
      include: [{ model: db.FarmBulkUpload, as: 'farmBulkUpload' }],
    });
    if (!record) {
      return res.json(
        errorRespSync({
          msg: error.DOESNT_EXISTS,
          code: error.code.NOT_FOUND,
        })
      );
    }

    if (record.status !== 'FAILED') {
      return res.json(
        errorRespSync({
          msg: error.BAD_REQUEST,
          code: error.code.BAD_REQUEST,
        })
      );
    }

    record.set({
      deletedAt: new Date(),
    });
    await record.save();
    const farmBulkUpload = record.farmBulkUpload;
    await farmBulkUpload.decrement(['totalRecordsCount', 'failedRecordsCount'], { by: 1 });

    await record.reload();
    return res.json(
      successRespSync({
        msg: success.DELETED,
        data: record,
      })
    );
  } catch (error) {
    console.error('ERROR', error);
    return serverError(res, error);
  }
});

router.get('/:farmBulkUploadId', authMiddleware, async (req, res) => {
  try {
    const id = req.params.farmBulkUploadId;
    const farmBulkUpload = await db.FarmBulkUpload.findOne({
      where: { id },
      include: [
        {
          model: db.FarmBulkUploadRecord,
          as: 'records',
          where: { deletedAt: { [Op.is]: null } },
        },
      ],
    });

    if (!farmBulkUpload) {
      return res.json(
        errorRespSync({
          code: error.code.NOT_FOUND,
          msg: error.NOT_FOUND,
        })
      );
    }

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: farmBulkUpload,
      })
    );
  } catch (error) {
    console.error('ERROR', error);
    return serverError(res, error);
  }
});

router.post('/records/:recordId/retry', authMiddleware, async (req, res) => {
  try {
    const recordId = req.params.recordId;
    const record = await db.FarmBulkUploadRecord.findOne({
      where: { id: recordId, deletedAt: { [Op.is]: null } },
      include: [{ model: db.FarmBulkUpload, as: 'farmBulkUpload' }],
    });
    if (!record) {
      return res.json(
        errorRespSync({
          msg: error.DOESNT_EXISTS,
          code: error.code.NOT_FOUND,
        })
      );
    }

    if (record.status !== 'FAILED') {
      return res.json(
        errorRespSync({
          msg: error.BAD_REQUEST,
          code: error.code.BAD_REQUEST,
        })
      );
    }

    const result = await importFarmData(record.payloadJsonData, req.user);
    if (result.success) {
      record.set({
        status: 'SUCCESS',
        recordedJsonData: result.record,
        errorMessage: null,
      });
      await record.save();
      const farmBulkUpload = record.farmBulkUpload;
      await farmBulkUpload.decrement('failedRecordsCount', { by: 1 });

      await record.reload();
      return res.json(
        successRespSync({
          msg: success.UPDATED,
          data: record,
        })
      );
    }

    return res.json(
      errorRespSync({
        msg: result.errorMessage,
        data: record,
      })
    );
  } catch (error) {
    console.error('ERROR', error);
    return serverError(res, error);
  }
});

module.exports = router;
