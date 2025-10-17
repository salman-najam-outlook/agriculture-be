const moment = require("moment");
const { QueryTypes } = require("sequelize");
const _ = require("lodash");
const db = require(rootPath + "/models");
const { Op } = require("sequelize");
const { filter, kebabCase } = require("lodash");
const { logErrorOccurred, removeEmptyValuesFromObject } = require(rootPath +
  "/helpers/general");

/**
 * @description get coordinates of all the farm
 * @param {*} req
 * @returns
 */
exports.allFarmCoordinates = async (req, { offset, limit }) => {
  const { organization, subOrgId } = req.user;
  const { sDate, eDate, cropType, country, state, farmIds } = req.query;
  let where = {
    isDeleted: 0,
    lat: { [db.Sequelize.Op.ne]: 0 },
    log: { [db.Sequelize.Op.ne]: 0 },
  };
  if (!_.isEmpty(farmIds)) {
    where.id = farmIds;
  }
  if (!_.isEmpty(cropType)) {
    where = {
      ...where,
      "$farmCrops.cropTypeOptId$": cropType,
    };
  }
  if (!_.isEmpty(sDate) && !_.isEmpty(eDate)) {
    where = {
      ...where,
      createdAt: {
        [db.Sequelize.Op.between]: [
          moment(sDate, "YYYY-MM-DD")
            .tz("UTC", true)
            .startOf("days")
            .format(process.env.DB_DATE_FORMAT),
          moment(eDate, "YYYY-MM-DD")
            .tz("UTC", true)
            .endOf("days")
            .format(process.env.DB_DATE_FORMAT),
        ],
      },
    };
  }
  if (!_.isEmpty(country)) {
    where = {
      ...where,
      country: { [db.Sequelize.Op.ne]: null, [db.Sequelize.Op.eq]: country },
    };
  }
  if (!_.isEmpty(state)) {
    where = {
      ...where,
      state: { [db.Sequelize.Op.ne]: null, [db.Sequelize.Op.eq]: state },
    };
  }
  where.isDeleted = 0;

  const result = await db.user_farm.findAll({
    where,
    offset,
    limit,
    attributes: [
      "isTechnician",
      "lat",
      "log",
      "farmName",
      [
        db.Sequelize.literal(
          `CASE 
            WHEN isTechnician = 1 
            THEN CONCAT(
              COALESCE(user_farm.farmerFirstName, ''), 
              ' ', 
              COALESCE(user_farm.farmerMiddleName, ''), 
              ' ', 
              COALESCE(user_farm.farmerLastName, '')
            )
            ELSE CONCAT(
              COALESCE(user.firstName, ''), 
              ' ', 
              COALESCE(user.middleName, ''), 
              ' ', 
              COALESCE(user.lastName, '')
            )
          END`
        ),
        "farmerName",
      ],
      "id",
      "createdAt",
    ],
    
    include: [
      {
        attributes: [],
        model: db.user,
        as: "user",
        where: { organization, 
           ...(subOrgId && {subOrganizationId:subOrgId})
        },
        required: true,
      },
      {
        model: db.UserfarmCrop,
        as: "farmCrops",
        attributes: [],
      },
      {
        model: db.UserfarmCrop,
        as: "farmCrops",
        attributes: [],
      },
    ],
    limit: 1000
  });
  return result;
};
/**
 * @description get regional data
 * @param {*} req
 * @returns
 */
exports.regionInfo = async (req, forDashboard = false) => {
  let {
    country,
    state,
    cropType,
    sDate,
    eDate,
    search,
    page = 1,
    limit,
    listSortCol = "farmCount",
    listSortOrder = "DESC",
    chartSortCol = "farmCount",
    chartSortOrder = "DESC",
  } = req.query;
  limit = parseInt(limit);

  let where = { isDeleted: 0 };
  if (!_.isEmpty(country)) {
    where = {
      ...where,
      country: { [db.Sequelize.Op.ne]: null, [db.Sequelize.Op.eq]: country },
    };
  }
  if (!_.isEmpty(state)) {
    where = {
      ...where,
      state: { [db.Sequelize.Op.ne]: null, [db.Sequelize.Op.eq]: state },
    };
  }
  if (!_.isEmpty(cropType)) {
    where = {
      ...where,
      "$farmCrops.cropTypeOptId$": cropType,
    };
  }
  if (!_.isEmpty(sDate) && !_.isEmpty(eDate)) {
    where = {
      ...where,
      createdAt: {
        [db.Sequelize.Op.between]: [
          moment(sDate, "YYYY-MM-DD")
            .tz("UTC", true)
            .startOf("days")
            .format(process.env.DB_DATE_FORMAT),
          moment(eDate, "YYYY-MM-DD")
            .tz("UTC", true)
            .endOf("days")
            .format(process.env.DB_DATE_FORMAT),
        ],
      },
    };
  }

  // get stat data for pie chart
  const regionalStat = await db.user_farm.findAll({
    plain: true,
    raw: true,
    attributes: [
      [
        db.Sequelize.fn(
          "count",
          db.Sequelize.fn("distinct", db.Sequelize.col("user_farm.id"))
        ),
        "totalFarms",
      ],
      [
        db.Sequelize.fn(
          "count",
          db.Sequelize.fn("distinct", db.Sequelize.col("user_farm.country"))
        ),
        "country",
      ],
      [
        db.Sequelize.fn(
          "count",
          db.Sequelize.fn("distinct", db.Sequelize.col("user_farm.state"))
        ),
        "state",
      ],
      [
        db.Sequelize.fn(
          "count",
          db.Sequelize.fn("distinct", db.Sequelize.col("user_farm.city"))
        ),
        "city",
      ],
    ],
    where,
    include: [
      {
        model: db.UserfarmCrop,
        as: "farmCrops",
        attributes: [],
      },
      {
        required: true,
        model: db.user,
        as: "user",
        attributes: [],
        subQuery: false,
        where: {
          organization: req.user.organization,
          subOrganizationId: req.user.subOrgId || null,
        },
      },
    ],
  });

  if (!_.isEmpty(search)) {
    const fields = ["country"];
    const searchQuery = fields.map((col) => {
      return {
        [col]: {
          [db.Sequelize.Op.substring]: search,
        },
      };
    });
    where = { ...where, [db.Sequelize.Op.or]: searchQuery };
  }

  // query for list and chart
  const query = {
    attributes: [
      // [db.Sequelize.fn('count', 'id'), 'farmCount'],
      [
        db.Sequelize.fn(
          "count",
          db.Sequelize.fn("distinct", db.Sequelize.col("user_farm.id"))
        ),
        "farmCount",
      ],
      [
        db.Sequelize.fn(
          "count",
          db.Sequelize.fn("distinct", db.Sequelize.col("`user_farm`.`userId`"))
        ),
        "farmersCount",
      ],
      [
        db.Sequelize.fn(
          "sum",
          db.Sequelize.fn(
            "distinct",
            db.Sequelize.col("`harvestingFarm->harvest`.`totalFreshYield`")
          )
        ),
        "yield",
      ],
      "country",
    ],
    include: [
      {
        model: db.UserfarmCrop,
        as: "farmCrops",
        attributes: [],
      },
      {
        required: true,
        model: db.user,
        as: "user",
        attributes: [],
        subQuery: false,
        where: {
          organization: req.user.organization,
          subOrganizationId: req.user.subOrgId || null,
        },
      },
      {
        model: db.HarvestingFarm,
        as: "harvestingFarm",
        attributes: [],
        include: [
          {
            model: db.Harvest,
            as: "harvest",
            attributes: [],
          },
        ],
      },
    ],
    where,
    group: [db.Sequelize.col("user_farm.country")],
    raw: true,
    subQuery: false,
  };

  // get region chart
  const regionalChart = await db.user_farm.findAll({
    ...query,
    subQuery: false,
    limit: 8,
    order: [[db.Sequelize.literal(chartSortCol), chartSortOrder]],
  });

  // return from here if called for dashboard
  if (forDashboard) return { regionalStat, regionalChart };

  // get region list
  const regionalList = await db.user_farm.findAll({
    ...query,
    subQuery: false,
    order: [[db.Sequelize.literal(listSortCol), listSortOrder]],
  });

  return { regionalStat, regionalChart, regionalList };
};

/**
 * @description get farmers data
 * @param {*} req
 * @returns
 */
exports.farmerInfo = async (req, forDashboard = false) => {
  let {
    country,
    state,
    cropType,
    gender,
    sDate,
    eDate,
    search,
    farmer,
    countryCode,
    page = 1,
    limit = 5,
    listSortCol = "farmArea",
    listSortOrder = "DESC",
    chartSortCol = "farmArea",
    chartSortOrder = "DESC",
  } = req.query;
  limit = parseInt(limit);
  let org_id = req.user.organization;
  const globalSetting = await db.GlobalSetting.findOne({
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'id'],
      include: ['largeFarm'] // Include largeFarm in the attributes
    },
    include:[
      {
        model: db.FarmSizeRange,
        as: "smallFarm",
        attributes: ["id", "from", "to", "isInclusive"],
      },
      {
        model: db.FarmSizeRange,
        as: "mediumFarm",
        attributes: ["id", "from", "to", "isInclusive"],
      },
      {
        model:db.UnitsList,
        as:'areaUnit'
      }
    ],
    where: { org_id }
  })

  
  let where = { isDeleted: 0 };
  if (!_.isEmpty(search)) {
    const fields = ["country"];
    const searchQuery = fields.map((col) => {
      return {
        [col]: {
          [db.Sequelize.Op.substring]: search,
        },
      };
    });
  }
  if (!_.isEmpty(country)) {
    where = {
      ...where,
      country: { [db.Sequelize.Op.ne]: null, [db.Sequelize.Op.eq]: country },
    };
  }
  if (!_.isEmpty(farmer)) {
    where = {
      ...where,
      userId: { [db.Sequelize.Op.ne]: null, [db.Sequelize.Op.eq]: farmer },
    };
  }
  if (!_.isEmpty(state)) {
    where = {
      ...where,
      state: { [db.Sequelize.Op.ne]: null, [db.Sequelize.Op.eq]: state },
    };
  }
  if (!_.isEmpty(cropType)) {
    where = {
      ...where,
      "$farmCrops.cropTypeOptId$": cropType,
    };
  }
  if (!_.isEmpty(gender)) {
    where = {
      ...where,
      "$user.gender$": gender,
    };
  }
  if (!_.isEmpty(sDate) && !_.isEmpty(eDate)) {
    where = {
      ...where,
      createdAt: {
        [db.Sequelize.Op.between]: [
          moment(sDate, "YYYY-MM-DD")
            .tz("UTC", true)
            .startOf("days")
            .format(process.env.DB_DATE_FORMAT),
          moment(eDate, "YYYY-MM-DD")
            .tz("UTC", true)
            .endOf("days")
            .format(process.env.DB_DATE_FORMAT),
        ],
      },
    };
  }
  if (!_.isEmpty(countryCode)) {
    where = {
      ...where,
      "$user.countryIsoCode$": countryCode,
    };
  }

 // 1 5
 // 7 50 
 // 100 

    let unitFactor = 1;
    if(globalSetting && globalSetting?.areaUnit){
      if(globalSetting?.areaUnit.abbvr == 'ha'){
        unitFactor = 2.471;
      }else if(globalSetting?.areaUnit.abbvr == 'Manzana'){
        unitFactor = 1.744;
      }
    }

    const smallFarm = globalSetting?.smallFarm ? ({
      from: (globalSetting?.smallFarm.from * unitFactor),
      to: (globalSetting?.smallFarm.to * unitFactor)
    }):({from:1,to:9.88})

    const mediumFarm = globalSetting?.mediumFarm ? ({
      from: (globalSetting?.mediumFarm.from * unitFactor),
      to:(globalSetting?.mediumFarm.to * unitFactor)
    }):({from:9.88, to:37.06})

    const largeFarm = globalSetting?.largeFarm ? (globalSetting?.largeFarm * unitFactor) : 37.06

    let smallFarmQry;
    if(globalSetting && globalSetting?.smallFarm){
      if(globalSetting?.smallFarm.isInclusive){
        smallFarmQry = `COUNT(CASE WHEN avgArea >= ${smallFarm.from} AND avgArea <= ${smallFarm.to}  THEN 1 ELSE NULL END) AS smallFarmerCount`
      }else{
        smallFarmQry = `COUNT(CASE WHEN avgArea > ${smallFarm.from} AND avgArea < ${smallFarm.to}  THEN 1 ELSE NULL END) AS smallFarmerCount`
      }
    } else{
      smallFarmQry = `COUNT(CASE WHEN avgArea >= ${smallFarm.from} AND avgArea <= ${smallFarm.to}  THEN 1 ELSE NULL END) AS smallFarmerCount`
    }

    let mediumFarmQry;
    if(globalSetting && globalSetting?.mediumFarm){
      if(globalSetting?.mediumFarm.isInclusive){
        mediumFarmQry = `COUNT(CASE WHEN avgArea >= ${mediumFarm.from} AND avgArea <= ${mediumFarm.to} THEN 1 ELSE NULL END) AS mediumFarmerCount`
      }else{
        mediumFarmQry = `COUNT(CASE WHEN avgArea > ${mediumFarm.from} AND avgArea < ${mediumFarm.to} THEN 1 ELSE NULL END) AS mediumFarmerCount`
      }
    } else{
      mediumFarmQry = `COUNT(CASE WHEN avgArea >= ${mediumFarm.from} AND avgArea <= ${mediumFarm.to} THEN 1 ELSE NULL END) AS mediumFarmerCount`
    }

 let farmerCountSql = 
    `SELECT
        ${smallFarmQry},
        ${mediumFarmQry}, 
        COUNT(CASE WHEN avgArea >= ${largeFarm} THEN 1 ELSE NULL END) AS largeFarmerCount,
        COUNT(CASE WHEN avgArea >= 0 THEN 1 ELSE NULL END) AS farmerCount,
        SUM(avgArea) AS totalFarmLand,
        AVG(avgArea) AS avgFarmLand
      FROM (
        SELECT
          u.id AS userId,
          AVG(uf.area) AS avgArea
        FROM users u
        LEFT JOIN user_farms uf ON u.id = uf.userId
        LEFT JOIN user_farm_crops ufc ON uf.id = ufc.farmId
        WHERE u.organization = ${req.user.organization} AND u.subOrganizationId = ${req.user.subOrgId || null} AND uf.isDeleted = 0`

  if (sDate && eDate)
    farmerCountSql += ` AND uf.createdAt BETWEEN '${sDate}' AND '${eDate}' `;
  if (cropType) farmerCountSql += ` AND ufc.cropTypeOptId=${cropType}`;
  if (gender) farmerCountSql += ` AND u.gender='${gender}' `;
  if (countryCode) farmerCountSql += ` AND u.countryIsoCode='${countryCode}' `;
  farmerCountSql += ` GROUP by u.id) as tempTable`;
  
  const farmerCount = await db.sequelize.query(farmerCountSql, {
    type: db.Sequelize.QueryTypes.SELECT,
    plain: true,
  });

  //const farmers_count = (farmerCount.largeFarmerCount || 0) + (farmerCount.mediumFarmerCount || 0) + (farmerCount.smallFarmerCount || 0)
  let farmerStat = { ...farmerCount };
  // get data for chart
  const query = {
    attributes: [
      [db.Sequelize.fn("avg", db.Sequelize.col("user_farm.area")), "farmArea"],
      [
        db.Sequelize.literal(
          `CONCAT(
            COALESCE(user.firstName, ''), 
            ' ', 
            COALESCE(user.middleName, ''), 
            ' ', 
            COALESCE(user.lastName, '')
          )`
        ),
        "farmerName",
      ],
      [
        db.Sequelize.fn(
          "count",
          db.Sequelize.fn("distinct", db.Sequelize.col("user_farm.id"))
        ),
        "farmCount",
      ],
      [
        db.Sequelize.fn(
          "sum",
          db.Sequelize.fn(
            "distinct",
            db.Sequelize.col("harvestingFarm->harvest.totalFreshYield")
          )
        ),
        "yield",
      ],
    ],
    

    include: [
      {
        model: db.UserfarmCrop,
        as: "farmCrops",
        attributes: [],
      },
      {
        required: true,
        model: db.user,
        as: "user",
        attributes: [],
        subQuery: false,
        where: {
          organization: req.user.organization,
          subOrganizationId: req.user.subOrgId || null,
        },
      },
      {
        model: db.HarvestingFarm,
        as: "harvestingFarm",
        attributes: [],
        include: [
          {
            model: db.Harvest,
            as: "harvest",
            attributes: [],
          },
        ],
      },
    ],
    group: [db.Sequelize.col("user_farm.userId")],
    where,
    raw: true,
    subQuery: false,
  };

  // get farmer chart
  const farmerChart = await db.user_farm.findAll({
    ...query,
    subQuery: false,
    limit,
    order: [[db.Sequelize.literal(chartSortCol), chartSortOrder]],
  });

  // return from here if called for dashboard
  if (forDashboard) return { farmerStat, farmerChart };

  // get farmer list
  const farmerList = await db.user_farm.findAll({
    ...query,
    attributes: [
      ...query.attributes,
      [db.Sequelize.col("user.gender"), "gender"], // Include gender in the farmer list
    ],
    subQuery: false,
    order: [[db.Sequelize.literal(listSortCol), listSortOrder]],
  });

  return { farmerStat, farmerChart, farmerList };
};

/**
 * @description get farm data
 * @param {*} req
 * @returns
 */
exports.farmInfo = async (req, forDashboard = false) => {
  let {
    country,
    state,
    cropType,
    sDate,
    eDate,
    search,
    page = 1,
    limit,
    listSortCol = "farmArea",
    listSortOrder = "DESC",
    chartSortCol = "farmArea",
    chartSortOrder = "DESC",
  } = req.query;
  limit = parseInt(limit);

  let where = { isDeleted: 0 };
  if (!_.isEmpty(search)) {
    const fields = ["country"];
    const searchQuery = fields.map((col) => {
      return {
        [col]: {
          [db.Sequelize.Op.substring]: search,
        },
      };
    });
    where = { ...where, [db.Sequelize.Op.or]: searchQuery };
  }
  if (!_.isEmpty(country)) {
    where = {
      ...where,
      country: { [db.Sequelize.Op.ne]: null, [db.Sequelize.Op.eq]: country },
    };
  }
  if (!_.isEmpty(state)) {
    where = {
      ...where,
      state: { [db.Sequelize.Op.ne]: null, [db.Sequelize.Op.eq]: state },
    };
  }
  if (!_.isEmpty(cropType)) {
    where = {
      ...where,
      "$farmCrops.cropTypeOptId$": cropType,
    };
  }
  if (!_.isEmpty(sDate) && !_.isEmpty(eDate)) {
    where = {
      ...where,
      createdAt: {
        [db.Sequelize.Op.between]: [
          moment(sDate, "YYYY-MM-DD")
            .tz("UTC", true)
            .startOf("days")
            .format(process.env.DB_DATE_FORMAT),
          moment(eDate, "YYYY-MM-DD")
            .tz("UTC", true)
            .endOf("days")
            .format(process.env.DB_DATE_FORMAT),
        ],
      },
    };
  }

  // Get the global setting
  let org_id = req.user.organization;
  const globalSetting = await db.GlobalSetting.findOne({
    where: { org_id },
    include: [
      {
        model: db.FarmSizeRange,
        as: 'smallFarm',
      },
      {
        model: db.FarmSizeRange,
        as: 'mediumFarm',
      },
      {
        model:db.UnitsList,
        as:'areaUnit'
      }
    ],
  });

  // const smallFarmTo = globalSetting.smallFarm.to;
  // const mediumFarmFrom = globalSetting.mediumFarm.from;
  // const mediumFarmTo = globalSetting.mediumFarm.to;
  // const largeFarm = globalSetting.largeFarm;

  /**
   * 1 - 5 
   * 6 - 50 
   * 51
   */

  let unitFactor = 1;
    if(globalSetting && globalSetting?.areaUnit){
      if(globalSetting?.areaUnit.abbvr == 'ha'){
        unitFactor = 2.471;
      }else if(globalSetting?.areaUnit.abbvr == 'Manzana'){
        unitFactor = 1.744;
      }
    }

  const smallFarm = globalSetting?.smallFarm ? ({
    from: (globalSetting?.smallFarm.from * unitFactor),
    to: (globalSetting?.smallFarm.to * unitFactor)
  }):({from:1,to:9.88})

  const mediumFarm = globalSetting?.mediumFarm ? ({
    from:(globalSetting?.mediumFarm.from * unitFactor),
    to:(globalSetting?.mediumFarm.to * unitFactor)
  }):({from:9.88, to:37.06})

  const largeFarm = globalSetting?.largeFarm ? (globalSetting?.largeFarm * unitFactor) : 37.06

  let smallFarmQry;
  if(globalSetting && globalSetting?.smallFarm){
     if(globalSetting?.smallFarm.isInclusive){
      smallFarmQry = `COUNT(CASE WHEN farmArea >= ${smallFarm.from} AND farmArea <= ${smallFarm.to} THEN 1 ELSE NULL END) AS smallFarmCount`
     }else{
       smallFarmQry = `COUNT(CASE WHEN farmArea > ${smallFarm.from} AND farmArea < ${smallFarm.to} THEN 1 ELSE NULL END) AS smallFarmCount`
     }
  } else{
     smallFarmQry = `COUNT(CASE WHEN farmArea >= ${smallFarm.from} AND farmArea <= ${smallFarm.to} THEN 1 ELSE NULL END) AS smallFarmCount`
  }

  let mediumFarmQry;
  if(globalSetting && globalSetting?.mediumFarm){
     if(globalSetting?.mediumFarm.isInclusive){
      mediumFarmQry = `COUNT(CASE WHEN farmArea >= ${mediumFarm.from} AND farmArea <= ${mediumFarm.to} THEN 1 ELSE NULL END) AS mediumFarmCount`
     }else{
      mediumFarmQry = `COUNT(CASE WHEN farmArea > ${mediumFarm.from} AND farmArea < ${mediumFarm.to} THEN 1 ELSE NULL END) AS mediumFarmCount`
     }
  } else{
    mediumFarmQry = `COUNT(CASE WHEN farmArea >= ${mediumFarm.from} AND farmArea <= ${mediumFarm.to} THEN 1 ELSE NULL END) AS mediumFarmCount`
  }

  // get data for statistics
  let farmCountSql= `
        SELECT
          ${smallFarmQry},
          ${mediumFarmQry},
          COUNT(CASE WHEN farmArea >= ${largeFarm} THEN 1 ELSE NULL END) AS largeFarmCount,
          COUNT(*) AS farmCount,
          SUM(farmArea) AS avgFarmLand
      FROM (
          SELECT uf.id, uf.area AS farmArea
          FROM user_farms uf
          LEFT JOIN users u ON u.id = uf.userId
          LEFT JOIN user_farm_crops ufc ON uf.id = ufc.farmId
          WHERE u.organization = ${req.user.organization} AND uf.isDeleted = 0
          GROUP BY uf.id, uf.area
      ) AS groupedFarms
      WHERE groupedFarms.farmArea IS NOT NULL
  `;

  if (cropType){
    farmCountSql += ` AND ufc.cropTypeOptId=${cropType}`;
  } 
  let farmCount = await db.sequelize.query(farmCountSql, {
    type: db.Sequelize.QueryTypes.SELECT,
    plain: true,
  });

  //farmCount.avgFarmLand  = (farmCount.avgFarmLand / unitFactor)
  let farmStat = { ...farmCount };

  // get data for chart
  const query = {
    attributes: [
      "farmName",
      "isTechnician",
      [
        db.Sequelize.literal(
          `CONCAT(
            COALESCE(user.firstName, ''), 
            ' ', 
            COALESCE(user.middleName, ''), 
            ' ', 
            COALESCE(user.lastName, '')
          )`
        ),
        "farmerName",
      ],
      [
        db.Sequelize.fn(
          "count",
          db.Sequelize.fn("distinct", db.Sequelize.col("zones.id"))
        ),
        "zoneCount",
      ],
      [
        db.Sequelize.fn(
          "count",
          db.Sequelize.fn(
            "distinct",
            db.Sequelize.col("farmCrops.cropTypeOptId")
          )
        ),
        "cropTypeCount",
      ],
      [
        db.Sequelize.fn(
          "sum",
          db.Sequelize.fn("distinct", db.Sequelize.col("user_farm.area"))
        ),
        "farmArea",
      ],
      "country",
      "state",
      "address",
      "lat",
      "log",
    ],
    

    include: [
      {
        model: db.UserfarmCrop,
        as: "farmCrops",
        attributes: [],
      },
      {
        required: true,
        model: db.user,
        as: "user",
        attributes: [],
        subQuery: false,
        where: {
          organization: req.user.organization,
        },
      },
      {
        // required: true,
        model: db.Geofence,
        as: "zones",
        attributes: [],
      },
    ],
    group: [db.Sequelize.col("user_farm.id")],
    where,
    raw: true,
    subQuery: false,
  };

  // **get farm chart
  const farmChart = await db.user_farm.findAll({
    ...query,
    subQuery: false,
    limit: 8,
    order: [[db.Sequelize.literal(chartSortCol), chartSortOrder]],
  });

  // return from here if called for dashboard
  if (forDashboard) return { farmStat, farmChart };

  // **get farm list
  const farmList = await db.user_farm.findAll({
    ...query,
    subQuery: false,
    order: [[db.Sequelize.literal(listSortCol), listSortOrder]],
  });

  return { farmStat, farmChart, farmList };
};

/**
 * @description get farm report
 * @param {*} req
 * @returns
 */
exports.farmReport = async (req) => {
  let {
    farmId,
    deforestation,
    geographic,
    farmPerimeter,
    geoVertices,
    areasPerimeter,
    existingCrop,
    fertilizerApplication,
    pestDiseaseApplication,
    yieldInfo,
  } = req.body;

  let coordinates = null;
  let zones = null;
  let existingCropData = null;
  let fertilizerApplicationData = null;
  let pestAndDiseaseData = null;
  let yieldInfoData = null;

  // get data for chart
  const query = {
    attributes: [
      "id",
      "dimitraFarmId",
      "farmName",
      [
        db.Sequelize.literal(
          `CASE 
            WHEN (isTechnician = 1 OR technicianId IS NOT NULL) 
            THEN CONCAT(
              COALESCE(user_farm.farmerFirstName, ''), 
              ' ', 
              COALESCE(user_farm.farmerMiddleName, ''), 
              ' ', 
              COALESCE(user_farm.farmerLastName, '')
            ) 
            ELSE CONCAT(
              COALESCE(user.firstName, ''), 
              ' ', 
              COALESCE(user.middleName, ''), 
              ' ', 
              COALESCE(user.lastName, '')
            ) 
          END`
        ),
        "farmerName",
      ],
      "country",
      "state",
      "address",
      "registrationNo",
      "farmerId",
      "lat",
      "log",
      "userId",
      "technicianId",
    ],
    

    include: [
      {
        model: db.UserfarmCrop,
        as: "farmCrops",
        attributes: [],
      },
      {
        required: true,
        model: db.user,
        as: "user",
        attributes: [],
        subQuery: false,
      },
    ],
    where: { id: farmId, isDeleted: 0 },
    raw: true,
    distinct: true,
  };

  // **get farm detail
  const farm = await db.user_farm.findOne({
    ...query,
  });

  if (farmPerimeter || geoVertices || deforestation) {
    coordinates = await db.UserFarmCoordinate.findAll({
      attributes: ["lat", "log"],
      where: {
        farmId,
      },
    });
  }

  if (areasPerimeter) {
    zones = await db.Geofence.findAll({
      required: true,
      attributes: [
        "geofenceName",
        "geofenceArea",
        "geofenceAreaUOMId",
        "geofenceParameter",
        "geofenceParameterUOMId",
        "geofenceCategory",
      ],
      include: [
        {
          model: db.GeofenceCoordinate,
          as: "coordinates",
        },
      ],
      where: {
        farmId,
      },
    });
  }

  if (existingCrop) {
    const cropQuery = `
    SELECT c.name as varietyName, o.name as cropName, g.geofenceArea  FROM user_farm_crops ufc 
      LEFT JOIN user_farm_crops_variety ufcv ON ufc.id = ufcv.userFarmCropId 
      LEFT JOIN crops c ON ufcv.cropId = c.id 
      LEFT JOIN \`options\` o ON c.cropTypeOptId = o.id
      LEFT JOIN user_crop_segments ucs on ufc.id = ucs.userFarmCropId
      LEFT JOIN geofences g on ucs.segmentId = g.id
    where c.name IS NOT NULL AND o.name IS NOT NULL AND ufc.farmId = ${farmId}
    `;
    existingCropData = await db.sequelize.query(cropQuery, {
      type: db.Sequelize.QueryTypes.SELECT,
    });
  }

  if (fertilizerApplication) {
    const startDate = fertilizerApplication.fertilizerApplicationFrom;
    const endDate = fertilizerApplication.fertilizerApplicationTo;
    const fertilizerQuery = `
      SELECT nm.dateOfApplication, nmfi.fertilizerName FROM nutrient_management_farm nmf 
        LEFT JOIN map_nutrient_management_and_fertilizer_mixture mnmafm  on nmf.nutrientManagementId  = mnmafm.nutrientManagementId 
        LEFT  JOIN  nutrient_management nm on nmf.nutrientManagementId = nm.id 
        LEFT JOIN  nutrient_management_fertilizer_inputs nmfi on mnmafm.nutrientManagementFertilizerInputId  = nmfi.id
      WHERE nmfi.fertilizerName IS NOT NULL AND nmf.farmId= ${farmId} AND nm.dateOfApplication BETWEEN '${startDate}' AND '${endDate}';
    `;
    fertilizerApplicationData = await db.sequelize.query(fertilizerQuery, {
      type: db.Sequelize.QueryTypes.SELECT,
    });

    fertilizerApplicationData = fertilizerApplicationData.map((item) => ({
      dateOfApplication: item.dateOfApplication
        ? moment(item.dateOfApplication).format("DD/MM/YYYY")
        : null,
      fertilizerName: item.fertilizerName,
    }));
  }

  if (pestDiseaseApplication) {
    const startDate = pestDiseaseApplication.pestDiseaseApplicationFrom;
    const endDate = pestDiseaseApplication.pestDiseaseApplicationTo;
    const diseaseQuery = `
    SELECT pmcpt.pesticideName as name , pm.startOfPestControl as appliedDate FROM pest_management_farms pmf 
      LEFT JOIN pest_managements pm on pmf.pestManagementId = pm.id 
      LEFT  JOIN map_pest_management_and_chemical_pesticide mpmacp  on pm.id  = mpmacp.pestManagementId 
      LEFT JOIN pest_management_chemical_pesticides_type pmcpt on mpmacp.pestManagementChemicalPesticideInputId = pmcpt.id 
    WHERE pm.startOfPestControl IS NOT NULL AND pmcpt.pesticideName IS NOT NULL AND pmf.farmId = ${farmId} AND pm.startOfPestControl BETWEEN '${startDate}' AND '${endDate}'
    UNION 
    SELECT dmct.title as name, dm.diseaseControlStartDate as appliedDate FROM disease_management_farms dmf 
          LEFT JOIN disease_managements dm on dmf.diseaseManagementId = dm.id 
          LEFT JOIN disease_management_chemical_type dmct on dm.id = dmct.diseaseManagementId 
    WHERE dmf.farmId = ${farmId} AND dm.diseaseControlStartDate BETWEEN '${startDate}' AND '${endDate}';
    `;

    pestAndDiseaseData = await db.sequelize.query(diseaseQuery, {
      type: db.Sequelize.QueryTypes.SELECT,
    });

    pestAndDiseaseData = pestAndDiseaseData.map((item) => ({
      appliedDate: item.appliedDate
        ? moment(item.appliedDate).format("DD/MM/YYYY")
        : null,
      name: item.name,
    }));
  }

  if (yieldInfo) {
    const startDate = yieldInfo.yieldInfoFrom;
    const endDate = yieldInfo.yieldInfoTo;
    const yieldQuery = `
    SELECT o.name as cropName, 
        c.name as varietyName, 
        h.totalFreshYield + h.totalDryYield  as totalYield,
        h.area,
        ul.name as areaUnit
      FROM harvesting_farm hf 
      LEFT JOIN harvest h on hf.harvestId = h.id 
      LEFT JOIN \`options\` o on h.cropType = o.id 
      LEFT JOIN harvest_varieties hv on h.id = hv.harvestId 
      LEFT JOIN crops c on hv.varietyId = c.id 
      LEFT JOIN units_list ul on h.area_unit_id = ul.id 
    WHERE o.name IS NOT NULL AND c.name IS NOT NULL AND  hf.farmId = ${farmId} AND h.start_date_harvesting BETWEEN '${startDate}' AND '${endDate}' ;
    `;

    yieldInfoData = await db.sequelize.query(yieldQuery, {
      type: db.Sequelize.QueryTypes.SELECT,
    });
  }

  if (farm) {
    farm.coordinates = coordinates ? coordinates : null;
    farm.zones = zones;
    farm.existingCropData = existingCropData;
    farm.fertilizerApplicationData = fertilizerApplicationData;
    farm.pestAndDiseaseData = pestAndDiseaseData;
    farm.yieldInfoData = yieldInfoData;
  }
  return farm;
};

/**
 * @description get crops data
 * @param {*} req
 * @returns
 */
exports.cropInfo = async (req, forDashboard = false) => {
  let {
    country,
    state,
    cropType,
    sDate,
    eDate,
    search,
    page = 1,
    limit = 10,
    listSortCol = "yield",
    listSortOrder = "DESC",
    chartSortCol = "yield",
    chartSortOrder = "DESC",
  } = req.query;
  limit = parseInt(limit);

  let where = {
    isDeleted: 0,
    "$farmCrops.cropTypeOptId$": { [db.Sequelize.Op.ne]: null },
  };
  if (!_.isEmpty(search)) {
    const fields = ["country"];
    const searchQuery = fields.map((col) => {
      return {
        [col]: {
          [db.Sequelize.Op.substring]: search,
        },
      };
    });
    where = { ...where, [db.Sequelize.Op.or]: searchQuery };
  }
  if (!_.isEmpty(country)) {
    where = {
      ...where,
      country: { [db.Sequelize.Op.ne]: null, [db.Sequelize.Op.eq]: country },
    };
  }
  if (!_.isEmpty(state)) {
    where = {
      ...where,
      state: { [db.Sequelize.Op.ne]: null, [db.Sequelize.Op.eq]: state },
    };
  }
  if (!_.isEmpty(cropType)) {
    where = {
      ...where,
      "$farmCrops.cropTypeOptId$": cropType,
    };
  }
  if (!_.isEmpty(sDate) && !_.isEmpty(eDate)) {
    where = {
      ...where,
      createdAt: {
        [db.Sequelize.Op.between]: [
          moment(sDate, "YYYY-MM-DD")
            .tz("UTC", true)
            .startOf("days")
            .format(process.env.DB_DATE_FORMAT),
          moment(eDate, "YYYY-MM-DD")
            .tz("UTC", true)
            .endOf("days")
            .format(process.env.DB_DATE_FORMAT),
        ],
      },
    };
  }

  // get data for statistics

  let cropStat = await db.user_farm.findAll({
    attributes: [
      [
        db.Sequelize.fn(
          "sum",
          db.Sequelize.fn(
            "distinct",
            db.Sequelize.col("harvestingFarm->harvest.totalFreshYield")
          )
        ),
        "totalYield",
      ],
      [
        db.Sequelize.fn(
          "count",
          db.Sequelize.fn(
            "distinct",
            db.Sequelize.col("farmCrops.cropTypeOptId")
          )
        ),
        "cropsCount",
      ],
    ],
    include: [
      {
        model: db.UserfarmCrop,
        as: "farmCrops",
        through: { model: db.UserCropFarm, attributes: [] },
        attributes: [],
      },
      {
        required: true,
        model: db.user,
        as: "user",
        attributes: [],
        subQuery: false,
        where: {
          organization: req.user.organization,
        },
      },
      {
        model: db.HarvestingFarm,
        as: "harvestingFarm",
        attributes: [],
        include: [
          {
            model: db.Harvest,
            as: "harvest",
            attributes: [],
          },
        ],
      },
    ],
    where,
    raw: true,
    plain: true,
    subQuery: false,
  });

  // get data for chart
  const query = {
    attributes: [
      [db.Sequelize.col("farmCrops->showCropTypes.name"), "cropName"],
      [
        db.Sequelize.fn(
          "count",
          db.Sequelize.fn("distinct", db.Sequelize.col("user_farm.id"))
        ),
        "farmsCount",
      ],
      [
        db.Sequelize.fn(
          "count",
          db.Sequelize.fn("distinct", db.Sequelize.col("user_farm.userId"))
        ),
        "farmersCount",
      ],
      [
        db.Sequelize.fn(
          "count",
          db.Sequelize.fn(
            "distinct",
            db.Sequelize.col("sowingFarm->sowing.id")
          )
        ),
        "plantedCount",
      ],
      [
        db.Sequelize.fn(
          "sum",
          db.Sequelize.fn(
            "distinct",
            db.Sequelize.col("sowingFarm->sowing.area")
          )
        ),
        "plantedArea",
      ],
      [
        db.Sequelize.fn(
          "count",
          db.Sequelize.fn(
            "distinct",
            db.Sequelize.col("`harvestingFarm->harvest`.`id`")
          )
        ),
        "harvestedCount",
      ],
      [
        db.Sequelize.fn(
          "sum",
          db.Sequelize.fn(
            "distinct",
            db.Sequelize.col("`harvestingFarm->harvest`.`totalFreshYield`")
          )
        ),
        "yield",
      ],
    ],

    include: [
      {
        model: db.UserfarmCrop,
        as: "farmCrops",
        attributes: [],
        include: [
          {
            model: db.Option,
            as: "showCropTypes",
            attributes: [],
          },
        ],
      },
      {
        required: true,
        model: db.user,
        as: "user",
        attributes: [],
        subQuery: false,
        where: {
          organization: req.user.organization,
        },
      },
      {
        model: db.Geofence,
        as: "zones",
        attributes: [],
      },
      {
        model: db.HarvestingFarm,
        as: "harvestingFarm",
        attributes: [],
        include: [
          {
            model: db.Harvest,
            as: "harvest",
            attributes: [],
          },
        ],
      },
      {
        model: db.MapSowingFarms,
        as: "sowingFarm",
        attributes: [],
        include: [
          {
            model: db.Sowing,
            as: "sowing",
            attributes: [],
          },
        ],
      },
    ],
    group: [db.Sequelize.col("`farmCrops->showCropTypes`.`name`")],
    // group: [db.Sequelize.col('user_farm.id')],
    where,
    raw: true,
    subQuery: false,
  };

  // **get crop yield stat
  const cropYieldStat = (
    await db.user_farm.findAll({
      ...query,
      subQuery: false,
      limit: 8,
      order: [[db.Sequelize.literal("yield"), "desc"]],
    })
  )?.map(({ cropName, yield }) => ({ cropName, yield }));
  cropStat = { ...cropStat, cropYieldStat };

  // **get crop chart
  const cropChart = await db.user_farm.findAll({
    ...query,
    limit: 8,
    order: [[db.Sequelize.literal(chartSortCol), chartSortOrder]],
  });

  // return from here if called for dashboard
  if (forDashboard) return { cropStat, cropChart };

  // **get crop list
  const cropList = await db.user_farm.findAll({
    ...query,
    order: [[db.Sequelize.literal(listSortCol), listSortOrder]],
  });

  const plantedArea =
    cropChart && cropChart.length > 0
      ? cropChart.map((x) => x.plantedArea).reduce((acc, area) => acc + area)
      : 0;
  cropStat["plantedArea"] = Math.round(plantedArea);
  return { cropStat, cropChart, cropList };
};

/**
 * @description get crops data
 * @param {*} req
 * @returns
 */
exports.pestsInfo = async (req, forDashboard = false) => {
  let {
    sDate,
    eDate,
    country,
    state,
    cropId = null,
    search,
    page = 1,
    limit = 10,
    chartSortCol = "name",
    chartSortOrder = "DESC",
  } = req.query;
  limit = parseInt(limit);

  let where = {},
    includeWhere = {};
  if (!_.isEmpty(search)) {
    const fields = ["name"];
    const searchQuery = fields.map((col) => {
      return {
        [col]: {
          [db.Sequelize.Op.substring]: search,
        },
      };
    });
    where = { ...where, [db.Sequelize.Op.or]: searchQuery };
  }

  if (!_.isEmpty(sDate) && !_.isEmpty(eDate)) {
    includeWhere = {
      ...includeWhere,
      createdAt: {
        [db.Sequelize.Op.between]: [
          moment(sDate, "YYYY-MM-DD")
            .tz("UTC", true)
            .startOf("days")
            .format(process.env.DB_DATE_FORMAT),
          moment(eDate, "YYYY-MM-DD")
            .tz("UTC", true)
            .endOf("days")
            .format(process.env.DB_DATE_FORMAT),
        ],
      },
    };
  }

  let pestManagementWhere = { ...includeWhere };
  if (cropId) {
    pestManagementWhere = { ...where, cropTypeId: cropId };
  }

  let userFarmWhere = {};
  if (!_.isEmpty(country)) {
    userFarmWhere = {
      ...userFarmWhere,
      country: { [db.Sequelize.Op.ne]: null, [db.Sequelize.Op.eq]: country },
    };
  }
  if (!_.isEmpty(state)) {
    userFarmWhere = {
      ...userFarmWhere,
      state: { [db.Sequelize.Op.ne]: null, [db.Sequelize.Op.eq]: state },
    };
  }

  let query = {
    where,
    attributes: [
      "name",
      [
        db.Sequelize.literal(
          `(SELECT SUM(pm1.area) FROM pest_managements AS pm1 
          INNER JOIN users AS u1 ON pm1.userId = u1.id 
          INNER JOIN pest_management_pest_type AS pm2 ON pm2.pestManagementId = pm1.id AND pm2.pestTypeId = PestType.id
          WHERE pm2.pestManagementId = pm1.id AND u1.organization = ${req.user.organization})`
        ),
        "totalArea",
      ],
    ],
    include: [
      {
        model: db.PestManagementPestType,
        as: "pest",
        attributes: [],
        required: true,
        include: [
          {
            model: db.PestManagement,
            attributes: [],
            as: "pestManagement",
            required: true,
            include: [
              {
                attributes: [],
                model: db.user,
                as: "user",
                required: true,
                where: {
                  organization: req.user.organization,
                },
              },
            ],
            where: pestManagementWhere,
          },
        ],
      },
    ],
  };
  // ** get pest statistics
  const pestsStatsData = await db.PestType.findAll({
    ...query,
    subQuery: false,
    offset: (page - 1) * limit,
    limit: limit,
    order: [[db.Sequelize.literal(chartSortCol), chartSortOrder]],
  });

  // **get crop chart
  const pestsChart = await db.PestType.findAll({
    ...query,
    subQuery: false,
    offset: (page - 1) * limit,
    limit: limit,
    order: [[db.Sequelize.literal(chartSortCol), chartSortOrder]],
  });

  // return from here if called for dashboard
  // if (forDashboard) return { pestsChart };

  // **get pests list
  let pestsList = await db.PestType.findAll({
    where,
    attributes: [
      "name",
      [
        db.Sequelize.literal(
          `(SELECT SUM(pm1.area) FROM pest_managements AS pm1 
          INNER JOIN users AS u1 ON pm1.userId = u1.id 
          INNER JOIN pest_management_pest_type AS pm2 ON pm2.pestManagementId = pm1.id AND pm2.pestTypeId = PestType.id
          WHERE pm2.pestManagementId = pm1.id AND u1.organization = ${req.user.organization})`
        ),
        "totalArea",
      ],
    ],
    include: [
      {
        model: db.PestManagementPestType,
        as: "pest",
        attributes: ["id"],
        required: true,
        include: [
          {
            model: db.PestManagement,
            attributes: ["id"],
            as: "pestManagement",
            required: true,
            where: pestManagementWhere,
            subQuery: false,
            include: [
              {
                model: db.user_farm,
                attributes: ["address"],
                as: "pestManagementFarms",
                required: false,
                where: userFarmWhere,
              },
              {
                model: db.Option,
                attributes: ["name"],
                as: "cropType",
                required: false,
              },
              {
                attributes: [],
                model: db.user,
                as: "user",
                required: true,
                subQuery: false,
                where: {
                  organization: req.user.organization,
                },
              },
            ],
          },
        ],
      },
    ],
    subQuery: false,
    offset: (page - 1) * limit,
    order: [[db.Sequelize.literal(chartSortCol), chartSortOrder]],
  });
  let translatedPest = pestsList;
  if (req.headers.lang && req.headers.lang != 'en') {
    translatedPest = req.translateFunction(pestsList,  globalTranslationCache, {
      lvl1: true,
      lvl2: true,
      lvl3: true,
    })
    pestsList = translatedPest.map((item) => {
      return {
        name: item.dataValues.name,
        totalArea: item.dataValues.totalArea,
        regions: item.pest
          .map((a) =>
            a.pestManagement.pestManagementFarms?.map((b) => b.address).join(" ,")
          )
          .join(" ,"),
        crops: item.pest.map((a) => req.simpleTranslate(a.pestManagement.cropType?.name)).join(" ,"),
      };
    });
  }
  else{

    pestsList = translatedPest.map((item) => {
      return {
        name: item.dataValues.name,
        totalArea: item.dataValues.totalArea,
        regions: item.pest
          .map((a) =>
            a.pestManagement.pestManagementFarms?.map((b) => b.address).join(" ,")
          )
          .join(" ,"),
        crops: item.pest.map((a) => a.pestManagement.cropType?.name).join(" ,"),
      };
    });
  }


  let pestStats = [];
  let others = {
    name: "others",
    totalArea: 0,
  };
  let total = 0;
  for (let i = 0; i < pestsStatsData.length; i++) {
    total = total + pestsStatsData[i].dataValues.totalArea;
    if (i <= 4) {
      pestStats.push(pestsStatsData[i].dataValues);
    } else {
      others.totalArea =
        others.totalArea + parseInt(pestsStatsData[i].dataValues.totalArea);
    }
  }
  if (others.totalArea >= 0) {
    pestStats.push(others);
  }
  let pieChartData = [];
  pestStats.forEach((obj) => {
    let newObj = { name: obj.name, percentage: (obj.totalArea / total) * 100 };
    pieChartData.push(newObj);
  });
  const occurrences = await db.PestManagement.count({
    where: pestManagementWhere,
    include: [
      {
        attributes: [],
        model: db.user,
        as: "user",
        required: true,
        subQuery: false,
        where: {
          organization: req.user.organization,
        },
      },
    ],
  });

  const pestManagementIds = await db.PestManagement.findAll({
    attributes: ["id"],
    where: pestManagementWhere,
  });
  const pestManagementFarms = await db.PestManagementFarm.findAll({
    attributes: ["farmId"],
    where: {
      pestManagementId: {
        [Op.in]: pestManagementIds.map((item) => item.id),
      },
    },
  });
  const orgUsersId = await db.user.findAll({
    attributes: ["id"],
    where: {
      organization: req.user.organization,
    },
  });

  const regions = await db.user_farm.count({
    where: {
      id: {
        [Op.in]: pestManagementFarms.map((item) => item.farmId),
      },
      userId: {
        [Op.in]: orgUsersId.map((item) => item.id),
      },
    },
  });
  return {
    stats: {
      pestStats,
      pieChartData,
      occurrences,
      regions,
    },
    pestsChart,
    pestsList,
  };
};

exports.equipmentsInfo = async (req, forDashboard = false) => {
  let {
    sDate,
    eDate,
    country,
    state,
    search,
    page = 1,
    limit = 10,
    listSortCol = "equipmentName",
    listSortOrder = "DESC",
    region,
    farmerId,
  } = req.query;
  limit = parseInt(limit);

  let where = {},
    equipmentWhere = {},
    regionWhere = {};
  if (!_.isEmpty(search)) {
    const fields = ["displayName"];
    const searchQuery = fields.map((col) => {
      return {
        [col]: {
          [db.Sequelize.Op.substring]: search,
        },
      };
    });
    equipmentWhere = { ...equipmentWhere, [db.Sequelize.Op.or]: searchQuery };
  }
  if (!_.isEmpty(country)) {
    regionWhere = {
      ...regionWhere,
      country: { [db.Sequelize.Op.ne]: null, [db.Sequelize.Op.eq]: country },
    };
  }
  if (!_.isEmpty(state)) {
    regionWhere = {
      ...regionWhere,
      state: { [db.Sequelize.Op.ne]: null, [db.Sequelize.Op.eq]: state },
    };
  }
  if (!_.isEmpty(sDate) && !_.isEmpty(eDate)) {
    where = {
      ...where,
      createdAt: {
        [db.Sequelize.Op.between]: [
          moment(sDate, "YYYY-MM-DD")
            .tz("UTC", true)
            .startOf("days")
            .format(process.env.DB_DATE_FORMAT),
          moment(eDate, "YYYY-MM-DD")
            .tz("UTC", true)
            .endOf("days")
            .format(process.env.DB_DATE_FORMAT),
        ],
      },
    };
  }

  // get data for chart
  let equipmentCount = await db.EquipmentUserFarm.findAll({
    where,
    attributes: [
      [
        db.Sequelize.literal(
          `(SELECT COUNT(*) FROM equipment_userfarm 
          INNER JOIN user_farms ON equipment_userfarm.farmId = user_farms.id 
          INNER JOIN users ON user_farms.userId = users.id 
          WHERE equipment_userfarm.equipmentID = equipment.id AND users.organization = ${req.user.organization})`
        ),
        "count",
      ],
      [db.Sequelize.col("equipment.displayName"), "name"],
    ],
    include: [
      {
        model: db.user_farm,
        as: "farm",
        attributes: [],
        where: regionWhere,
        include: [
          {
            required: true,
            model: db.user,
            as: "user",
            where: farmerId
              ? { id: farmerId, organization: req.user.organization }
              : { organization: req.user.organization },
            attributes: [],
          },
        ],
      },
      {
        model: db.Equipment,
        as: "equipment",
        attributes: [],
        include: [
          {
            required: true,
            model: db.user,
            as: "user",
            subQuery: false,
            where: farmerId
              ? { id: farmerId, organization: req.user.organization }
              : { organization: req.user.organization },
            attributes: [],
          },
        ],
        where: equipmentWhere,
      },
    ],
    subQuery: false,
    offset: (page - 1) * limit,
    limit: limit,
    order: [[db.Sequelize.literal(listSortCol), listSortOrder]],
    group: ["equipmentID"],
  });

  // get data for list
  const query = {
    where,
    attributes: [
      [db.Sequelize.col("farm.address"), "region"],
      [db.Sequelize.col("farm.farmName"), "farmName"],
      [db.Sequelize.col("farm.userId"), "farmUser"],
      [db.Sequelize.col("equipment.displayName"), "equipmentName"],
      [
        db.Sequelize.literal(
          "(SELECT count(*) FROM user_farms WHERE `address` = farm.address)"
        ),
        "farmerCount",
      ],
      [
        db.Sequelize.literal(
          "(SELECT count(*) FROM equipment_userfarm WHERE `farmID` IN (SELECT id FROM user_farms WHERE `address` = farm.address) AND `equipmentID` = equipment.id)"
        ),
        "equipmentCount",
      ],
    ],
    include: [
      {
        model: db.user_farm,
        as: "farm",
        attributes: [],
        where: regionWhere,
        include: [
          {
            required: true,
            model: db.user,
            as: "user",
            where: farmerId
              ? { id: farmerId, organization: req.user.organization }
              : { organization: req.user.organization },
            attributes: [],
          },
        ],
      },
      {
        model: db.Equipment,
        as: "equipment",
        attributes: [],
        include: [
          {
            required: true,
            model: db.user,
            as: "user",
            subQuery: false,
            where: farmerId
              ? { id: farmerId, organization: req.user.organization }
              : { organization: req.user.organization },
            attributes: [],
          },
        ],
        where: equipmentWhere,
      },
    ],
    group: ["equipmentID"],
    subQuery: false,
  };
  const equipmentList = await db.EquipmentUserFarm.findAll({
    ...query,
    subQuery: false,
    offset: (page - 1) * limit,
    limit: limit,
    order: [[db.Sequelize.literal(listSortCol), listSortOrder]],
  });

  const include = [
    {
      model: db.Membership,
      as: "user_membership",
      required: true,
      through: {
        model: db.UserMembershipMap,
      },
      include: [
        {
          model: db.UserRoleMembershipMap,
          as: "userRoleMembershipMap",
          where: {
            user_role_id: process.env.COFFEE_FARMER || "coffee_farmer",
          },
        },
      ],
    },
  ];

  const farmers = await db.user.findAll({
    include,
    attributes: ["id", "firstName","middleName", "lastName"],
    where: {
      organization: req.user.organization,
      active: true,
      firstName: {
        [Op.not]: null,
      },
      lastName: {
        [Op.not]: null,
      },
    },
  });
  return { equipmentCount, equipmentList, farmers };
};

exports.goalsInfo = async (req, forDashboard = false) => {
  let {
    sDate,
    eDate,
    search,
    page = 1,
    limit = 10,
    listSortCol = "name",
    listSortOrder = "ASC",
    region,
    farmerId,
    filterBy,
    cropId,
    country,
    state,
  } = req.query;
  limit = parseInt(limit);

  let where = { goalStatus: "complete" },
    userWhere = {};
  cropWhere = {};
  let regionWhere = {};
  if (farmerId) {
    userWhere = { id: farmerId };
  }
  if (cropId) {
    cropWhere = { cropTypeId: cropId };
  }
  if (!_.isEmpty(search)) {
    const fields = ["firstName","middleName", "lastName"];
    const searchQuery = fields.map((col) => {
      return {
        [col]: {
          [db.Sequelize.Op.substring]: search,
        },
      };
    });
    userWhere = { ...userWhere, [db.Sequelize.Op.or]: searchQuery };
    cropWhere = { ...cropWhere, [db.Sequelize.Op.or]: searchQuery };
  }
  if (!_.isEmpty(country)) {
    regionWhere = {
      ...regionWhere,
      country: { [db.Sequelize.Op.ne]: null, [db.Sequelize.Op.eq]: country },
    };
  }
  if (!_.isEmpty(state)) {
    regionWhere = {
      ...regionWhere,
      state: { [db.Sequelize.Op.ne]: null, [db.Sequelize.Op.eq]: state },
    };
  }
  if (!_.isEmpty(sDate) && !_.isEmpty(eDate)) {
    where = {
      ...where,
      createdAt: {
        [db.Sequelize.Op.between]: [
          moment(sDate, "YYYY-MM-DD")
            .tz("UTC", true)
            .startOf("days")
            .format(process.env.DB_DATE_FORMAT),
          moment(eDate, "YYYY-MM-DD")
            .tz("UTC", true)
            .endOf("days")
            .format(process.env.DB_DATE_FORMAT),
        ],
      },
    };
  }

  let goalsAchievedChart, query;
  if (filterBy === "crop") {
    // get data for chart
    goalsAchievedChart = await db.UserCropGoal.findAll({
      where,
      attributes: [
        [
          db.Sequelize.fn(
            "count",
            db.Sequelize.col("cropGoalSeason->farm.cropTypeId")
          ),
          "count",
        ],
        [db.Sequelize.col("cropGoalSeason->farm->crop_type.name"), "name"],
      ],
      include: [
        {
          model: db.UserCropGoalSeason,
          as: "cropGoalSeason",
          attributes: [],
          required: true,
          include: [
            {
              model: db.UserCropGoalFarm,
              as: "farm",
              required: true,
              attributes: [],
              where: cropWhere,
              include: [
                {
                  model: db.Option,
                  as: "crop_type",
                  attributes: [],
                  required: true,
                },
              ],
            },
          ],
        },
      ],
      group: ["cropGoalSeason->farm.cropTypeId"],
      offset: (page - 1) * limit,
      limit: limit,
      order: [[db.Sequelize.literal(listSortCol), listSortOrder]],
    });

    // get data for list
    query = {
      where,
      attributes: [
        "cropGoalSeason->farm.cropTypeId",
        "harvestedYieldTarget",
        [
          db.Sequelize.literal(
            `(
              SELECT count(*) FROM user_crop_goals ucg
              INNER JOIN user_crop_goal_outcomes ucgo
              ON ucg.seasonId = ucgo.userCropGoalSeasonId
              INNER JOIN user_crop_goal_farms ucgf
              ON ucgf.seasonId = ucg.seasonId
              WHERE (ucg.harvestedYieldTarget <= ucgo.yieldHarvested OR ucg.harvestedYieldTarget IS NULL)
              AND (ucg.incomeTarget <= ucgo.marketValue OR ucg.incomeTarget IS NULL)
              AND (ucg.syntheticFertilizerUsageTarget <= ucgo.syntheticFertilizerUsed OR ucg.syntheticFertilizerUsageTarget IS NULL)
              AND ucg.userId = ucgo.userId
              AND ucgf.cropTypeId = \`cropGoalSeason->farm\`.cropTypeId
              AND goalStatus = "complete"
            )`
          ),
          "goalsAchieved",
        ],
        [
          db.Sequelize.literal(
            `(
              SELECT count(*) FROM user_crop_goals ucg
              INNER JOIN user_crop_goal_outcomes ucgo
              ON ucg.seasonId = ucgo.userCropGoalSeasonId
              INNER JOIN user_crop_goal_farms ucgf
              ON ucgf.seasonId = ucg.seasonId
              WHERE (
                ucg.harvestedYieldTarget > ucgo.yieldHarvested
                OR ucg.incomeTarget > ucgo.marketValue
                OR ucg.syntheticFertilizerUsageTarget > ucgo.syntheticFertilizerUsed
              )
              AND ucg.userId = ucgo.userId
              AND ucgf.cropTypeId = \`cropGoalSeason->farm\`.cropTypeId
              AND goalStatus = "complete"
            )`
          ),
          "goalsFailed",
        ],
        [
          db.Sequelize.literal(
            "(SELECT (`goalsAchieved`/(`goalsFailed` + `goalsAchieved`))*100)"
          ),
          "successRatePercentage",
        ],
        [db.Sequelize.col("cropGoalSeason->farm->crop_type.name"), "name"],
        [db.Sequelize.col("cropGoal.yieldHarvested"), "yieldHarvested"],
      ],
      include: [
        {
          model: db.UserCropGoalSeason,
          as: "cropGoalSeason",
          required: true,
          attributes: [],
          include: [
            {
              model: db.UserCropGoalFarm,
              as: "farm",
              required: true,
              attributes: [],
              where: cropWhere,
              include: [
                {
                  model: db.Option,
                  as: "crop_type",
                  attributes: [],
                  required: true,
                },
              ],
            },
          ],
        },
        {
          model: db.UserCropGoalOutcome,
          as: "cropGoal",
          attributes: [],
          required: true,
        },
      ],
      group: ["cropGoalSeason->farm.cropTypeId"],
    };
  } else {
    // get data for chart
    goalsAchievedChart = await db.UserCropGoal.findAll({
      where,
      attributes: [
        [
          db.Sequelize.literal(
            "(SELECT count(*) FROM user_crop_goals WHERE userId = user.id)"
          ),
          "count",
        ],
        [
          db.Sequelize.fn(
            "CONCAT",
            db.Sequelize.col("user.firstName"),
            " ",
            db.Sequelize.fn("COALESCE", db.Sequelize.col("user.middleName"), ""),
            db.Sequelize.literal("IF(`user`.`middleName` IS NOT NULL, ' ', '')"),
            db.Sequelize.col("user.lastName")
          ),
          "name",
        ],
      ],      
      include: [
        {
          model: db.user,
          as: "user",
          attributes: [],
          subQuery: false,
          required: true,
          where: {
            ...userWhere,
            organization: req.user.organization,
          },
        },
      ],
      group: ["userId"],
      offset: (page - 1) * limit,
      limit: limit,
      order: [[db.Sequelize.literal(listSortCol), listSortOrder]],
    });
    // get data for list
    query = {
      where,
      attributes: [
        "userId",
        "harvestedYieldTarget",
        [
          db.Sequelize.literal(
            `(
              SELECT count(*) FROM user_crop_goals ucg
              INNER JOIN user_crop_goal_outcomes ucgo
              ON ucg.seasonId = ucgo.userCropGoalSeasonId
              WHERE (ucg.harvestedYieldTarget <= ucgo.yieldHarvested OR ucg.harvestedYieldTarget IS NULL)
              AND (ucg.incomeTarget <= ucgo.marketValue OR ucg.incomeTarget IS NULL)
              AND (ucg.syntheticFertilizerUsageTarget <= ucgo.syntheticFertilizerUsed OR ucg.syntheticFertilizerUsageTarget IS NULL)
              AND ucg.userId = ucgo.userId
              AND ucg.userId = user.id
              AND goalStatus = "complete"
            )`
          ),
          "goalsAchieved",
        ],
        [
          db.Sequelize.literal(
            `(
              SELECT count(*) FROM user_crop_goals ucg
              INNER JOIN user_crop_goal_outcomes ucgo
              ON ucg.seasonId = ucgo.userCropGoalSeasonId
              WHERE (
                ucg.harvestedYieldTarget > ucgo.yieldHarvested
                OR ucg.incomeTarget > ucgo.marketValue
                OR ucg.syntheticFertilizerUsageTarget > ucgo.syntheticFertilizerUsed
              )
              AND ucg.userId = user.id
              AND ucg.userId = ucgo.userId
              AND goalStatus = "complete"
            )`
          ),
          "goalsFailed",
        ],
        [
          db.Sequelize.literal(
            "(SELECT (`goalsAchieved`/(`goalsFailed` + `goalsAchieved`))*100)"
          ),
          "successRatePercentage",
        ],
        [
          db.Sequelize.fn(
            "concat",
            db.Sequelize.col("user.firstName"),
            " ",
            db.Sequelize.col("user.lastName")
          ),
          "name",
        ],
        [db.Sequelize.col("cropGoal.yieldHarvested"), "yieldHarvested"],
      ],
      include: [
        {
          model: db.user,
          as: "user",
          attributes: [],
          subQuery: false,
          required: true,
          where: {
            ...userWhere,
            organization: req.user.organization,
          },
        },
        {
          model: db.UserCropGoalOutcome,
          as: "cropGoal",
          attributes: [],
          required: true,
        },
      ],
      group: ["UserCropGoal.userId"],
    };
  }

  const goalsList = await db.UserCropGoal.findAll({
    ...query,
    subQuery: false,
    offset: (page - 1) * limit,
    limit: limit,
    order: [[db.Sequelize.literal(listSortCol), listSortOrder]],
  });
  return { goalsAchievedChart, goalsList };
};

exports.yieldInfo = async (req, forDashboard = false) => {
  let { country, cropType, farm, sDate, eDate, state } = req.query;
  let where = {};
  let regionWhere = {};

  if (!_.isEmpty(cropType)) {
    where = {
      ...where,
      cropType: cropType,
    };
  }
  if (!_.isEmpty(farm)) {
    const harvestIds = await db.HarvestingFarm.findAll({
      where: {
        farmId: farm,
      },
    });
    const ids = harvestIds.map((item) => item.id);
    where = {
      ...where,
      id: ids,
    };
  }

  if (!_.isEmpty(sDate) && !_.isEmpty(eDate)) {
    where = {
      ...where,
      createdAt: {
        [db.Sequelize.Op.between]: [
          moment(sDate, "YYYY-MM-DD")
            .tz("UTC", true)
            .startOf("days")
            .format(process.env.DB_DATE_FORMAT),
          moment(eDate, "YYYY-MM-DD")
            .tz("UTC", true)
            .endOf("days")
            .format(process.env.DB_DATE_FORMAT),
        ],
      },
    };
  }

  if (!_.isEmpty(country)) {
    regionWhere = {
      ...regionWhere,
      country: { [db.Sequelize.Op.ne]: null, [db.Sequelize.Op.eq]: country },
    };
  }
  if (!_.isEmpty(state)) {
    regionWhere = {
      ...regionWhere,
      state: { [db.Sequelize.Op.ne]: null, [db.Sequelize.Op.eq]: state },
    };
  }

  const yield = await db.Harvest.findAll({
    where,
    include: [
      {
        required: true,
        model: db.user,
        as: "user",
        attributes: [],
        subQuery: false,
        where: {
          organization: req.user.organization,
        },
      },
      {
        model: db.user_farm,
        as: "harvest_farm",
        through: { model: db.HarvestingFarm, attributes: [] },
        where: regionWhere,
      },
    ],
    group: [
      [
        db.Sequelize.fn("MONTH", db.Sequelize.col("Harvest.createdAt")),
        "month",
      ],
    ],
    attributes: [
      [
        db.Sequelize.fn("MONTH", db.Sequelize.col("Harvest.createdAt")),
        "month",
      ],
      [
        db.Sequelize.fn("SUM", db.Sequelize.col("Harvest.totalFreshYield")),
        "total_fresh_yield",
      ],
      [
        db.Sequelize.fn("SUM", db.Sequelize.col("Harvest.totalDryYield")),
        "total_dry_yield",
      ],
    ],
    raw: true,
    order: [[db.Sequelize.literal("month"), "ASC"]],
  });

  const data = {
    series: [
      {
        name: "Total Fresh Yield",
        data: yield.map((ele) => ele.total_fresh_yield),
      },
      {
        name: "Total Dry Yield",
        data: yield.map((ele) => ele.total_dry_yield),
      },
    ],
    chartOptions: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: yield.map((ele) => moment(ele.month, "M").format("MMM")),
      },
    },
    yield: yield.map((ele) => {
      return { ...ele, month: moment(ele.month, "M").format("MMMM") };
    }),
  };

  return { data };
};

exports.soilInfo = async (req) => {
  let { country, soilValue, farm, sDate, eDate, state } = req.query;
  let where = {};
  let regionWhere = {};
  let attributes = [
    [
      db.Sequelize.fn(
        "MONTH",
        db.Sequelize.col("SoilManagement.dateOfApplication")
      ),
      "month",
    ],
  ];
  if (!_.isEmpty(farm)) {
    where = {
      ...where,
      farm: farm,
    };
  }

  if (!_.isEmpty(sDate) && !_.isEmpty(eDate)) {
    where = {
      ...where,
      dateOfApplication: {
        [db.Sequelize.Op.between]: [
          moment(sDate, "YYYY-MM-DD")
            .tz("UTC", true)
            .startOf("days")
            .format(process.env.DB_DATE_FORMAT),
          moment(eDate, "YYYY-MM-DD")
            .tz("UTC", true)
            .endOf("days")
            .format(process.env.DB_DATE_FORMAT),
        ],
      },
    };
  }

  if (!_.isEmpty(soilValue)) {
    if (soilValue.includes("carbon")) {
      attributes = [
        ...attributes,
        [
          db.Sequelize.fn(
            "SUM",
            db.Sequelize.fn(
              "IFNULL",
              db.Sequelize.col("SoilManagement.soilOrganicCarbon"),
              0
            )
          ),
          "carbon",
        ],
      ];
    }
    if (soilValue.includes("nitrogen")) {
      attributes = [
        ...attributes,
        [
          db.Sequelize.fn(
            "SUM",
            db.Sequelize.fn(
              "IFNULL",
              db.Sequelize.col("SoilManagement.nitrogen"),
              0
            )
          ),
          "nitrogen",
        ],
      ];
    }
    if (soilValue.includes("phosphorus")) {
      attributes = [
        ...attributes,
        [
          db.Sequelize.fn(
            "SUM",
            db.Sequelize.fn(
              "IFNULL",
              db.Sequelize.col("SoilManagement.phosphorus"),
              0
            )
          ),
          "phosphorus",
        ],
      ];
    }
    if (soilValue.includes("potassium")) {
      attributes = [
        ...attributes,
        [
          db.Sequelize.fn(
            "SUM",
            db.Sequelize.fn(
              "IFNULL",
              db.Sequelize.col("SoilManagement.potassium"),
              0
            )
          ),
          "potassium",
        ],
      ];
    }
    if (soilValue.includes("sulfur")) {
      attributes = [
        ...attributes,
        [
          db.Sequelize.fn(
            "SUM",
            db.Sequelize.fn(
              "IFNULL",
              db.Sequelize.col("SoilManagement.sulfur"),
              0
            )
          ),
          "sulfur",
        ],
      ];
    }
  }
  if (!_.isEmpty(country)) {
    regionWhere = {
      ...regionWhere,
      country: { [db.Sequelize.Op.ne]: null, [db.Sequelize.Op.eq]: country },
    };
  }
  if (!_.isEmpty(state)) {
    regionWhere = {
      ...regionWhere,
      state: { [db.Sequelize.Op.ne]: null, [db.Sequelize.Op.eq]: state },
    };
  }

  const soil = await db.SoilManagement.findAll({
    where,
    include: [
      {
        required: true,
        model: db.user,
        as: "user",
        attributes: [],
        subQuery: false,
        where: {
          organization: req.user.organization,
        },
      },
      {
        model: db.user_farm,
        as: "user_farm",
        where: Object.keys(regionWhere).length === 0 ? undefined : regionWhere,
      },
    ],
    group: [
      [
        db.Sequelize.fn(
          "MONTH",
          db.Sequelize.col("SoilManagement.dateOfApplication")
        ),
        "month",
      ],
    ],
    attributes,
    raw: true,
    order: [[db.Sequelize.literal("month"), "ASC"]],
  });

  let series = [];

  if (!_.isEmpty(soilValue)) {
    if (soilValue.includes("carbon")) {
      series.push({
        name: "Carbon",
        data: soil.map((ele) => parseFloat(ele.carbon).toFixed(2)),
      });
    }
    if (soilValue.includes("nitrogen")) {
      series.push({
        name: "Nitrogen",
        data: soil.map((ele) => parseFloat(ele.nitrogen).toFixed(2)),
      });
    }
    if (soilValue.includes("phosphorus")) {
      series.push({
        name: "Phosphorus",
        data: soil.map((ele) => parseFloat(ele.phosphorus).toFixed(2)),
      });
    }
    if (soilValue.includes("potassium")) {
      series.push({
        name: "Potassium",
        data: soil.map((ele) => parseFloat(ele.potassium).toFixed(2)),
      });
    }
    if (soilValue.includes("sulfur")) {
      series.push({
        name: "Sulfur",
        data: soil.map((ele) => parseFloat(ele.sulfur).toFixed(2)),
      });
    }
  }

  const data = {
    series,
    chartOptions: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: soil.map((ele) => moment(ele.month, "M").format("MMM")),
      },
    },
    soil: soil.map((ele) => {
      return { ...ele, month: moment(ele.month, "M").format("MMMM") };
    }),
  };

  return { data };
};

exports.getUserFarmData = async (req, { offset, limit }) => {
  const farms = await db.user_farm.findAll({
    where: { isDeleted: 0 },
    attributes: ["id", "farmName"],
    include: [
      {
        attributes: [],
        model: db.user,
        as: "user",
        where: { organization: req.user.organization },
        required: true,
      },
    ],
    offset,
    limit,
    raw: true,
  });
  return farms;
};
