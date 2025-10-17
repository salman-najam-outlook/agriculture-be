const db = require(rootPath + '/models');
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const getLandPreprationAndSowingReport = async (userId, startDate, endDate, sortBy,page,pageSize) => {
  sortBy = sortBy=='asc'?["createdAt", "ASC"]:["createdAt", "DESC"];
  const landPreperation = await db.Soil_prep_practice.findAll({
    where: {
      userId,
      ...(startDate ? { startDate: {
        [Op.between]: [startDate, endDate],
      }} : {}),
    },
    include: [
      {
        model: db.Option,
        attributes: ['id', 'name'],
      }, 
   ],
    attributes:['id','startDate','endDate','cropId'],
    offset: (page - 1) * pageSize,
    limit: pageSize,
    order:[sortBy]
  });
  return landPreperation;
};


const getIrrigationReport = async (userId, startDate, endDate, sortBy,page,pageSize) => {
  sortBy = sortBy=='asc'?["createdAt", "ASC"]:["createdAt", "DESC"];
  const irrigation = await db.Irrigation.findAll({
    where: {
      userId,
      ...(startDate ? { createdAt: {
        [Op.between]: [startDate, endDate],
      }} : {}),
    },
    attributes:['id','cropId','createdAt'],
    include: [
      {
        model: db.Option,
        as: 'irrigation_cropType',
        attributes: ['id', 'name'],
      },     
    ],
    offset: (page - 1) * pageSize,
    limit: pageSize,
    order:[sortBy]
  });
  return irrigation;
};

const getSoilManagementReports = async (userId, startDate, endDate, sortBy,page,pageSize) => {
  sortBy = sortBy=='asc'?["createdAt", "ASC"]:["createdAt", "DESC"];
  const soilManagement = await db.SoilManagement.findAll({
    where: {
      userId,
      ...(startDate ? { dateOfApplication: {
        [Op.between]: [startDate, endDate],
      }} : {}),
    },
    include:[
      {
        model: db.Option,
        as: 'crop_type',
        attributes: ['id', 'name'],
      },
    ],
    attributes:['id','dateOfApplication','cropType'],
    offset: (page - 1) * pageSize,
    limit: pageSize,
    order:[sortBy]
  });
  return soilManagement;
};

const getWeedingReports = async (userId, startDate, endDate, sortBy,page,pageSize) => {
  sortBy = sortBy=='asc'?["createdAt", "ASC"]:["createdAt", "DESC"];
  const weeding = await db.Weed.findAll({
    where: {
      userId,
      ...(startDate ? { createdAt: {
        [Op.between]: [startDate, endDate],
      }} : {}),
    },
    include:[
      {
        model: db.Option,
        as: 'weed_cropType',
        attributes: ['id', 'name'],
      },
    ],
    attributes:['id','createdAt','cropTypeId'],
    offset: (page - 1) * pageSize,
    limit: pageSize,
    order:[sortBy]
  });
  return weeding;
};

const pestAndDeseasManagement = async (userId, startDate, endDate, sortBy,page,pageSize) => {
  sortBy = sortBy=='asc'?["createdAt", "ASC"]:["createdAt", "DESC"];
  const data = await db.CropObservation.findAll({
    where: {
      userId,
      ...(startDate ? { createdAt: {
        [Op.between]: [startDate, endDate],
      }} : {}),
    },
    attributes:['dateOfObservation','cropType','id'],
    include: [
      {
        model: db.Option,
        as: 'cropObservation_cropType',
        attributes: ['id', 'name'],
      },
    ],
    offset: (page - 1) * pageSize,
    limit: pageSize,
    order:[sortBy]
  });
  return data;
};

const harvestingReport = async (userId, startDate, endDate, sortBy,page,pageSize) => {
  sortBy = sortBy=='asc'?["createdAt", "ASC"]:["createdAt", "DESC"];
  const data = await db.Harvest.findAll({
    where: {
      userId,
      ...(startDate ? { start_date_harvesting: {
        [Op.between]: [startDate, endDate],
      }} : {}),
    },
    include:[
      {
        model: db.Option,
        as: 'harvest_cropType',
        attributes: ['id', 'name'],
      },
    ],
    attributes:['start_date_harvesting','id','cropType'],
    offset: (page - 1) * pageSize,
    limit: pageSize,
    order:[sortBy]
  });
  return data;
};

const storageReport = async (userId, startDate, endDate, sortBy,page,pageSize) => {
  sortBy = sortBy=='asc'?["createdAt", "ASC"]:["createdAt", "DESC"];
  const data = await db.CropStorage.findAll({
    where: {
      userId,
      ...(startDate ? { startDate: {
        [Op.between]: [startDate, endDate],
      }} : {}),
    },
    include:[
      {
        model: db.Option,
        as: 'crop_storage_cropType',
        attributes: ['id', 'name'],
      },
    ],
    attributes:['startDate','id','cropId'],
    offset: (page - 1) * pageSize,
    limit: pageSize,
    order:[sortBy]
  });
  return data;
};

const getGeneralInformation = async (userId, startDate, endDate, sortBy,page,pageSize) => {
  sortBy = sortBy=='asc'?["createdAt", "ASC"]:["createdAt", "DESC"];
  const data = await db.GeneralCropInformation.findAll({
    where: {
      userId,
      ...(startDate ? { createdAt: {
        [Op.between]: [startDate, endDate],
      }} : {}),
    },
  
    offset: (page - 1) * pageSize,
    limit: pageSize,
    order:[sortBy]
  });
  return data;
};




module.exports = { getIrrigationReport,getLandPreprationAndSowingReport,getSoilManagementReports,getWeedingReports,pestAndDeseasManagement,harvestingReport,storageReport,getGeneralInformation };

