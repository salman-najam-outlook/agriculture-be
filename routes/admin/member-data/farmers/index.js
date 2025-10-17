const express = require("express");
const fs = require("fs");
const path = require('path');
const router = express.Router();
const auth = require(rootPath + "/middleware/auth");
const translation = require(rootPath + "/middleware/translation");
const { error } = require(rootPath + '/helpers/language');
const { Op, literal, Sequelize } = require("sequelize");
const validationErrorHandler = require("../../../../middleware/validation_error_handler");
const moment = require('moment');
const {
    successRespSync,
    serverError,
    errorResp,
    errorRespSync,
} = require(rootPath + "/helpers/api");
const db = require(rootPath + "/models");

// /admin/member-data/farmers
router.get(
    "/",
    auth,
    async function (req, res) {
        try {
            const organization = req.user.organization;
            const subOrganizationId = req.user?.subOrgId || null;
            let {
                page = 1,
                limit,
                desc = '1',
                order = "createdAt",
                orderType = "DESC",
                searchPhrase,
                status
            } = req.query;
    
            // Build WHERE clause
            let where = `WHERE u.organization="${organization}"`;

            if(subOrganizationId) {
                where += ` AND u.subOrganizationId="${subOrganizationId}"`;
            }
    
            if (searchPhrase) {
                where += `
                    AND (
                        u.firstName LIKE "%${searchPhrase}%" OR 
                        u.middleName LIKE "%${searchPhrase}%" OR
                        u.lastName LIKE "%${searchPhrase}%" OR
                        CONCAT_WS(' ', u.firstName, u.middleName, u.lastName) LIKE "%${searchPhrase}%"
                    )
                `;
            }
    
            // Optional farm status filter (only affects JOINed farms)
            let statusCondition = '';
            if (status) {
                statusCondition = `AND uf.status = "${status}"`;
            }
    
            let subSql = `
                SELECT
                    u.firstName,
                    u.middleName,
                    u.lastName,
                    u.mobile,
                    u.id as userId, 
                    MAX(uf.farmerId) as farmerId,
                    COUNT(DISTINCT uf.id) as farms, 
                    SUM(uf.area) as farmSize,
                    COUNT(DISTINCT eu.id) as equipmentCount,
                    COUNT(DISTINCT ucf.id) as cropCount,
                    u.createdAt
                FROM users u
                LEFT JOIN user_farms uf ON u.id = uf.userId AND uf.isDeleted = 0 ${status ? `AND uf.status = "${status}"` : ''}
                LEFT JOIN equipment_userfarm eu ON eu.farmID = uf.id
                LEFT JOIN user_crop_farms ucf ON ucf.farmId = uf.id
                ${where}
                GROUP BY u.id
            `;
    
            let countQuery = `
                SELECT COUNT(*) AS total_count FROM (${subSql}) as subquery
            `;
            const count = await db.sequelize.query(countQuery, {
                type: db.Sequelize.QueryTypes.SELECT
            });
    
            let sql = `${subSql} ORDER BY u.${order} ${orderType}`;
    
            if (limit && page) {
                let offset = (page - 1) * limit;
                sql += ` LIMIT ${offset}, ${limit}`;
            }
    
            const rows = await db.sequelize.query(sql, {
                type: db.Sequelize.QueryTypes.SELECT,
            });
    
            return res.json(
                successRespSync({
                    msg: "User farm data",
                    data: {
                        count: count[0].total_count,
                        response: rows
                    }
                })
            );
        } catch (error) {
            return serverError(res, error);
        }
    }
);

// /admin/member-data/farmers/download-csv
router.get(
    "/download-csv",
    auth,
    async function (req, res) {
        try {
            const organization = req.user.organization;
            let {
                page = 1,
                limit = 50,
                desc = '1',
                order = "createdAt",
                orderType = "DESC",
                searchPhrase,
                status
            } = req.query;

            let offset = (page - 1) * limit;

            let where = `WHERE u.organization="${organization}" `

            if(status) {
                where += ` AND uf.status = "${status}" `
            }

            if(searchPhrase) {
                where += ` AND (u.firstName LIKE "%${searchPhrase}%" OR u.middleName LIKE "%${searchPhrase}%" OR u.lastName LIKE "%${searchPhrase}%") `
            }

            let subSql = `
            SELECT
                u.firstName,
                u.middleName,
                u.lastName,
                u.mobile,
                uf.userId, 
                COUNT(uf.id) as farms, 
                sum(uf.area) farmSize,
                count(eu.farmID) equipmentCount,
                count(ucf.farmID) cropCount,
                u.createdAt
            FROM dbdimitra.user_farms uf 
            JOIN users u ON u.id = uf.userId
            LEFT JOIN equipment_userfarm eu ON eu.farmID = uf.id
            LEFT JOIN user_crop_farms ucf ON ucf.farmId = uf.id
            ${where}
            GROUP BY userId`;

            let sql = `
                ${subSql}
                ORDER BY uf.${order} ${orderType}
                LIMIT ${offset}, ${limit}
            `
            const response = await db.sequelize.query(sql, {
                type: db.Sequelize.QueryTypes.SELECT,
            });

            let csvData = 'Farmer Name,Farms,Phone Number,Farm Size,Crops,Equipment,Date\n';
            for (const item of response) {
                csvData += `"${item.firstName} ${item.middleName ? item.middleName + ' ' : ''}${item.lastName}","${item.farms}","${item.mobile || ''}","${parseFloat(item.farmSize).toFixed(2)}","${item.cropCount}","${item.equipmentCount}","${moment(item.createdAt).format('YYYY-MM-DD')}"\n`;
            }

            const csvFilePath = path.resolve(__dirname, `../../../../files/member-data-farms.csv`);
            fs.writeFileSync(csvFilePath, csvData, 'utf-8');

            res.writeHead(200, {
                "Content-Type": "application/octet-stream",
                "Content-Disposition": `attachment; filename=member-data-farmers.csv`,
            });
            fs.createReadStream(csvFilePath).pipe(res);
            return;
        } catch (error) {
            return serverError(res, error);
        }
    }
);

// /admin/member-data/farmers/farm-detail-info/{id}
router.get(
    "/farm-detail-info",
    auth,
    async function (req, res) {
        try {
            let {
                userId
            } = req.query;

            const userResponse = await db.user.findByPk(userId);
            if(!userResponse || userResponse.organization != req.user.organization) {
                return res.json(
                    errorRespSync({
                        code: error.code.NOT_FOUND,
                        msg: error.DOESNT_EXISTS,
                    })
                );
            }
            const user = {
                id: userResponse.id,
                profilePicUrl: userResponse.profilePicUrl,
                firstName: userResponse.firstName,
                middleName: userResponse.middleName,
                lastName: userResponse.lastName,
                email: userResponse.email,
                mobile: userResponse.mobile,
                registration: moment(userResponse.createdAt).format('DD/MM/YYYY'),
                country: userResponse.country,
                gender: userResponse.gender,
                state: userResponse.stateId,
                city: userResponse.city,
                address: userResponse.address,
            }

            let userFarmResponse = await db.user_farm.findOne({
                where: {
                    userId: userId
                },
                attributes: [
                    "id",
                    "farmName",
                    "area",
                    "address",
                    "createdAt",
                    "status",
                    "farmOwnershipType"
                ],
                include: [
                    {
                        model: db.UserFarmingGoal,
                        as: "farmGoals",
                        attributes: ["id", "farmingGoal"]
                    },
                    {
                        model: db.UserfarmCrop,
                        as: "UserfarmCrop",
                        attributes: ["id"],
                        include: [
                            {
                                model: db.Option,
                                as: "showCropTypes",
                                attributes: ["name"],
                            }
                        ]
                    },
                    {
                        model: db.Geofence,
                        as: "zones",
                        attributes: ["id", "geofenceName"]
                    },
                    {
                        model: db.userLiveStock,
                        as: "farmLivestocks",
                    },
                    {
                        model: db.Equipment,
                        as: "farmEquipments",
                    }
                ],
                order:[
                    ['createdAt', 'ASC']
                ]
            });

            let farmingGoal = "";
            if(userFarmResponse?.farmGoals && userFarmResponse.farmGoals.length > 0) {
                farmingGoal = userFarmResponse.farmGoals?.map((item) => { return item?.farmingGoal});
                farmingGoal = [...new Set(farmingGoal)];
                farmingGoal = farmingGoal.join(', ')
            }
            let farmInformation = {
                dateOfEntry: userFarmResponse?.createdAt,
                farmID: userFarmResponse?.id,
                ownershipType: userFarmResponse?.farmOwnershipType,
                address: userFarmResponse?.address,
                goalType: farmingGoal,
                totalSize: userFarmResponse?.area,
            }

            let crops = [];
            if(userFarmResponse?.UserfarmCrop && userFarmResponse.UserfarmCrop.length > 0) {
                crops = userFarmResponse.UserfarmCrop.map((item) => { return item.showCropTypes.name});
                crops = [...new Set(crops)];
            }

            let zones = [];
            if(userFarmResponse?.zones && userFarmResponse.zones.length > 0) {
                let i = 1;
                for (const item of userFarmResponse.zones) {
                    zones.push({
                        zone: `Zone ${i++}`,
                        name: item.geofenceName
                    })
                }
            }

            let livestocks = [];
            if(userFarmResponse?.farmLivestocks && userFarmResponse.farmLivestocks.length > 0) {
                livestocks = userFarmResponse.farmLivestocks.map((item) => item.displayName);
            }

            let equipments = [];
            if(userFarmResponse?.farmEquipments && userFarmResponse.farmEquipments.length > 0) {
                equipments = userFarmResponse.farmEquipments.map((item) => item.displayName);
            }

            
            return res.json(
                successRespSync({
                    msg: "User farm data",
                    data: {
                        user,
                        farmInformation,
                        crops,
                        zones,
                        livestocks,
                        equipments
                    }
                })
            );

        } catch (error) {
            return serverError(res, error);
        }
    }
);

// /admin/member-data/farmers/show-on-maps
router.get(
    "/show-on-maps",
    auth,
    async function (req, res) {
        const {farmId} = req.query
        try {

            let farm = await db.user_farm.findOne({
                include:[
                    {
                        model: db.Geofence,
                        attributes:['id','geofenceName'],
                        as: 'zones',
                        include:[
                            {
                                model: db.GeofenceCoordinate,
                                attributes: ['lat', 'log'],
                                as: 'coordinates',
                            },
                        ]
                    },
                    {
                        model: db.UserFarmingGoal,
                        as: "farmGoals",
                        attributes: ["id", "farmingGoal"]
                    },
                    {
                        model: db.UserFarmCoordinate,
                        attributes: ['id', 'lat', 'log'],
                        as: 'farmCoordinates'
                    },
                    {
                        model: db.userLiveStock,
                        as: "farmLivestocks",
                    },
                    {
                    model: db.Option,
                        as: 'farmCertifications',
                        attributes:['id','name']
                    }
                ],
                attributes:[
                    "id",
                    "userId",
                    "farmName",
                    "area",
                    "address",
                    "createdAt",
                    "status",
                    "farmOwnershipType",
                    "productionType",
                    "farmGeofenceName"
                ],
                where: {id: farmId}
            })
    
             return res.json(
                successRespSync({
                    msg: "User farm map data fetched",
                    data: farm
                })
            );
        }catch (error) {
            return serverError(res, error);
        }
    }

)

// /admin/member-data/farmers/view-all-farms
router.get(
    "/view-all-farms",
    auth,
    async function (req, res) {
        let {
          page = 1,
          limit = 50,
          desc = '1',
          order = "createdAt",
          orderType = "DESC",
          searchPhrase,
          date,
          country,
          state,
          status,
          userId
      } = req.query;
      let farmWhere = {
        userId,
        isDeleted: 0
      }
      let query = {};

        try {
          query.order = [];
            if (!order) {
                query.order.push(["createdAt", "DESC"]);
            } else {
                query.order.push([order, orderType]);
            }
            if (page && limit) {
                page = parseInt(page);
                limit = parseInt(limit);
                query.offset = (page - 1) * limit;
                query.limit = limit;
            }
            if (searchPhrase) {
              farmWhere[Op.or] = {
                  [Op.or]:[
                      db.sequelize.literal(`CONCAT(user_farm.farmerFirstName, ' ', user_farm.farmerMiddleName, ' ',user_farm.farmerLastName) LIKE '%${searchPhrase}%'`),
                      db.sequelize.literal(`CONCAT(user_farm.farmerFirstName, ' ',user_farm.farmerLastName) LIKE '%${searchPhrase}%'`),
                      {
                          farmName:{
                              [Op.like] : `%${searchPhrase}%`
                          },
                        
                      },
                      {
                          address:{
                              [Op.like] : `%${searchPhrase}%`
                          }
                      }
                  ]
              }
            }
            if (date && date !== '') {
              farmWhere[Op.and] = [
                  {
                      createdAt: {
                        [Op.between]: [
                          moment(date[0]).startOf('day'),
                          moment(date[1]).endOf('day')
                        ],
                      }
                  }
              ]
            }
            if (country && country !== '') {
                farmWhere[Op.and] = [
                    {
                        country
                    }
                ]
            }
            const userResponse = await db.user.findByPk(userId);
            if(!userResponse || userResponse.organization != req.user.organization) {
                return res.json(
                    errorRespSync({
                        code: error.code.NOT_FOUND,
                        msg: error.DOESNT_EXISTS,
                    })
                );
            }
            const user = {
                id: userResponse.id,
                profilePicUrl: userResponse.profilePicUrl,
                firstName: userResponse.firstName,
                middleName: userResponse.middleName,
                lastName: userResponse.lastName,
                email: userResponse.email,
                mobile: userResponse.mobile,
                farm_limit:userResponse.farm_limit
            }

            let farms = await db.user_farm.findAndCountAll({
                ...query,
                attributes:[
                    "id",
                    "farmName",
                    "area",
                    "address",
                    "createdAt",
                    "status",
                    "farmOwnershipType",
                    "farmerFirstName",
                    "farmerMiddleName",
                    "farmerLastName",
                    "dimitraFarmId",
                    "country",
                    "technicianId",
                    "region"
                ],
                include: [
                    {
                        model: db.UserFarmingGoal,
                        as: "farmGoals",
                        attributes: ["id", "farmingGoal"]
                    },
                    {
                        model: db.UserfarmCrop,
                        as: "UserfarmCrop",
                        attributes: ["id"],
                        include: [
                            {
                                model: db.Option,
                                as: "showCropTypes",
                                attributes: ["name"],
                            }
                        ]
                    },
                    {
                        model: db.Geofence,
                        as: "zones",
                        attributes: ["id", "geofenceName"]
                    },
                    {
                        model: db.userLiveStock,
                        as: "farmLivestocks",
                    },
                    {
                        model: db.Equipment,
                        as: "farmEquipments",
                    }
                ],
                where: farmWhere
            })
    
             return res.json(
                successRespSync({
                    msg: "User all farm data fetched",
                    data: {
                        user:user,
                        farms:farms
                    }
                })
            );
        }catch (error) {
            return serverError(res, error);
        }
    }

)
module.exports = router;