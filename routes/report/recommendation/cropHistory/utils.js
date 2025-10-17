const db = require(rootPath + "/models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

exports.getLandPreprationReport = async ({
  userId,
  startDate,
  endDate,
  sortBy,
  page,
  pageSize,
  cropTypeId,
}) => {
  sortBy = sortBy == "asc" ? ["createdAt", "ASC"] : ["createdAt", "DESC"];
  const landPreperation = await db.Soil_prep_practice.findAll({
    where: {
      cropId: cropTypeId,
      userId,
      ...(startDate
        ? {
            [Op.or]: [
              {
                startDate: {
                  [Op.between]: [startDate, endDate],
                },
              },
              {
                createdAt: {
                  [Op.between]: [startDate, endDate],
                },
              },
            ],
          }
        : {}),
    },
    include: [
      {
        model: db.Option,
        attributes: ["id", "name"],
      },
    ],
    attributes: ["id", "startDate", "endDate", "cropId", "createdAt"],
    offset: (page - 1) * pageSize,
    limit: pageSize,
    order: [sortBy],
  });
  return landPreperation;
};
exports.getSowingReport = async ({
  userId,
  startDate,
  endDate,
  sortBy,
  page,
  pageSize,
  cropTypeId,
}) => {
  sortBy = sortBy == "asc" ? ["createdAt", "ASC"] : ["createdAt", "DESC"];
  const landPreperation = await db.Sowing.findAll({
    where: {
      cropId: cropTypeId,
      userId,
      ...(startDate
        ? {
            [Op.or]: [
              {
                startDate: {
                  [Op.between]: [startDate, endDate],
                },
              },
              {
                createdAt: {
                  [Op.between]: [startDate, endDate],
                },
              },
            ],
          }
        : {}),
    },
    include: [
      {
        model: db.Option,
        attributes: ["id", "name"],
      },
    ],
    attributes: ["id", "startDate", "endDate", "cropId", "createdAt"],
    offset: (page - 1) * pageSize,
    limit: pageSize,
    order: [sortBy],
  });
  return landPreperation;
};

exports.getIrrigationReport = async ({
  userId,
  startDate,
  endDate,
  sortBy,
  page,
  pageSize,
  cropTypeId,
}) => {
  sortBy = sortBy == "asc" ? ["createdAt", "ASC"] : ["createdAt", "DESC"];
  const irrigation = await db.Irrigation.findAll({
    where: {
      userId,
      cropId: cropTypeId,
      ...(startDate
        ? {
            createdAt: {
              [Op.between]: [startDate, endDate],
            },
          }
        : {}),
    },
    attributes: ["id", "cropId", "createdAt"],
    include: [
      {
        model: db.Option,
        as: "irrigation_cropType",
        attributes: ["id", "name"],
      },
    ],
    offset: (page - 1) * pageSize,
    limit: pageSize,
    order: [sortBy],
  });
  return irrigation;
};

exports.getSoilManagementReports = async ({
  userId,
  startDate,
  endDate,
  sortBy,
  page,
  pageSize,
  cropTypeId,
}) => {
  sortBy = sortBy == "asc" ? ["createdAt", "ASC"] : ["createdAt", "DESC"];
  const soilManagement = await db.SoilManagement.findAll({
    where: {
      userId,
      cropType: cropTypeId,

      ...(startDate
        ? {
            [Op.or]: [
              {
                dateOfApplication: {
                  [Op.between]: [startDate, endDate],
                },
              },
              {
                createdAt: {
                  [Op.between]: [startDate, endDate],
                },
              },
            ],
          }
        : {}),
    },
    include: [
      {
        model: db.Option,
        as: "crop_type",
        attributes: ["id", "name"],
      },
    ],
    attributes: ["id", "dateOfApplication", "cropType", "createdAt"],
    offset: (page - 1) * pageSize,
    limit: pageSize,
    order: [sortBy],
  });
  return soilManagement;
};

exports.getWeedingReports = async ({
  userId,
  startDate,
  endDate,
  sortBy,
  page,
  pageSize,
  cropTypeId,
}) => {
  sortBy = sortBy == "asc" ? ["createdAt", "ASC"] : ["createdAt", "DESC"];
  const weeding = await db.Weed.findAll({
    where: {
      userId,
      cropTypeId,
      ...(startDate
        ? {
            createdAt: {
              [Op.between]: [startDate, endDate],
            },
          }
        : {}),
    },
    include: [
      {
        model: db.Option,
        as: "weed_cropType",
        attributes: ["id", "name"],
      },
    ],
    attributes: ["id", "createdAt", "cropTypeId", "createdAt"],
    offset: (page - 1) * pageSize,
    limit: pageSize,
    order: [sortBy],
  });
  return weeding;
};

exports.harvestingReport = async ({
  userId,
  startDate,
  endDate,
  sortBy,
  page,
  pageSize,
  cropTypeId,
}) => {
  // return 'hello world';
  sortBy = sortBy == "asc" ? ["createdAt", "ASC"] : ["createdAt", "DESC"];
  const data = await db.Harvest.findAll({
    where: {
      userId,
      cropType: cropTypeId,
      ...(startDate
        ? {
            [Op.or]: [
              {
                start_date_harvesting: {
                  [Op.between]: [startDate, endDate],
                },
              },
              {
                createdAt: {
                  [Op.between]: [startDate, endDate],
                },
              },
            ],
          }
        : {}),
    },
    include: [
      {
        model: db.Option,
        as: "harvest_cropType",
        attributes: ["id", "name"],
      },
    ],
    attributes: ["start_date_harvesting", "id", "cropType", "createdAt"],
    offset: (page - 1) * pageSize,
    limit: pageSize,
    order: [sortBy],
  });
  return data;
};

exports.storageReport = async ({
  userId,
  startDate,
  endDate,
  sortBy,
  page,
  pageSize,
  cropTypeId,
}) => {
  sortBy = sortBy == "asc" ? ["createdAt", "ASC"] : ["createdAt", "DESC"];
  const data = await db.CropStorage.findAll({
    where: {
      userId,
      cropId: cropTypeId,
      ...(startDate
        ? {
          createdAt: {
              [Op.between]: [startDate, endDate],
            },
          }
        : {}),
    },
    include: [
      {
        model: db.Option,
        as: "crop_storage_cropType",
        attributes: ["id", "name"],
      },
    ],
    attributes: ["startDate", "id", "cropId", "createdAt"],
    offset: (page - 1) * pageSize,
    limit: pageSize,
    order: [sortBy],
  });
  return data;
};

exports.pestAndDeseasManagement = async ({
  userId,
  startDate,
  endDate,
  sortBy,
  page,
  pageSize,
  cropTypeId,
}) => {
  sortBy = sortBy == "asc" ? ["createdAt", "ASC"] : ["createdAt", "DESC"];
  const data = await db.CropObservation.findAll({
    where: {
      userId,
      ...(startDate
        ? {
            createdAt: {
              [Op.between]: [startDate, endDate],
            },
          }
        : {}),
    },
    attributes: ["dateOfObservation", "cropType", "id", "createdAt"],
    include: [
      {
        model: db.Option,
        as: "cropObservation_cropType",
        attributes: ["id", "name"],
      },
    ],
    offset: (page - 1) * pageSize,
    limit: pageSize,
    order: [sortBy],
  });
  return data;
};
exports.getGeneralInformation = async ({
  userId,
  startDate,
  endDate,
  sortBy,
  page,
  pageSize,
  cropTypeId,
}) => {
  sortBy = sortBy == "asc" ? ["createdAt", "ASC"] : ["createdAt", "DESC"];
  const data = await db.GeneralCropInformation.findAll({
    where: {
      userId,
      ...(startDate
        ? {
            createdAt: {
              [Op.between]: [startDate, endDate],
            },
          }
        : {}),
    },

    offset: (page - 1) * pageSize,
    limit: pageSize,
    order: [sortBy],
  });
  return data;
};
