const express = require("express");
const fs = require("fs");
const path = require('path');
const router = express.Router();
const auth = require(rootPath + "/middleware/auth");
const translation = require(rootPath + "/middleware/translation");
const { Op, literal } = require("sequelize");
const validationErrorHandler = require("../../../../middleware/validation_error_handler");
const moment = require('moment');
const {
    farmStatusChange,
    farmLimitValidate
} = require("../../../../helpers/validators/member-data");
const {
    successRespSync,
    serverError,
    errorResp,
    errorRespSync,
} = require(rootPath + "/helpers/api");
const db = require(rootPath + "/models");
const { getUserFarmCount } = require('./utils');
const { syncFarmerDataToOCC } = require(rootPath + '/helpers/occ-komodo');

// /admin/member-data/farms
router.get(
    "/",
    auth,
    async function (req, res) {
        try {
            const userId = req.user.id;
            const organization = req.user.organization;
            const subOrganizationId = req.user?.subOrgId
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
                status
            } = req.query;

            let query = {};
            let locationWhere = {};

            let where = {
                isDeleted:0
            };

            if(status) {
                where[Op.and] = [
                    {
                        status: status,
                    }
                ];
            }

            query.order = [];
            if (!order) {
                query.order.push(["createdAt", "DESC"]);
            } else {
                query.order.push([order, orderType]);
            }
            query.where = where;
            if (page && limit) {
                page = parseInt(page);
                limit = parseInt(limit);
                query.offset = (page - 1) * limit;
                query.limit = limit;
            }

            let userWhere = {
                organization: organization,
                ...(subOrganizationId && {subOrganizationId:subOrganizationId})
            };

            let farmWhere = {
                isDeleted:0
            }
            let searchQueryArr = []
            let whereClause = []
            if (searchPhrase) {
              searchQueryArr =[
                        db.sequelize.literal(`CONCAT(user_farm.farmerFirstName, ' ', user_farm.farmerMiddleName, ' ',user_farm.farmerLastName) LIKE '%${searchPhrase}%'`),
                        db.sequelize.literal(`CONCAT(user_farm.farmerFirstName, ' ',user_farm.farmerLastName) LIKE '%${searchPhrase}%'`),
                        {
                            '$user.firstName$': {
                                [Op.like]: `%${searchPhrase}%`,
                            },
                        },
                        {
                            '$user.lastName$': {
                                [Op.like]: `%${searchPhrase}%`,
                            },
                        },
                        {
                            '$user.middleName$': {
                                [Op.like]: `%${searchPhrase}%`,
                            },
                        },
                        {
                            '$user.mobile$': {
                                [Op.like]: `%${searchPhrase}%`,
                            },
                        },
                        {
                            farmName:{
                                [Op.like] : `%${searchPhrase}%`
                            },
                           
                        },
                        {
                            address:{
                                [Op.like] : `%${searchPhrase}%`
                            }
                        },
                        {
                           
                            registrationNo:{
                                [Op.like] : `%${searchPhrase}%`
                            } 
                        },
                           {
                           
                            dimitraFarmId:{
                                [Op.like] : `%${searchPhrase}%`
                            } 
                        },
                    ]
                  whereClause[Op.and] = [
                    { [Op.or]: searchQueryArr },
                    {
                    [Op.or]: [
                        { technicianId: null },
                        { '$technician.id$': { [Op.ne]: null } },
                    ],
                    },
                ];
            } else {

            whereClause[Op.or] = [
                { technicianId: null },
                { '$technician.id$': { [Op.ne]: null } },
            ];
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
            if (state && state !== '') {
                locationWhere[Op.and] = [
                    {
                        state : {
                          [Op.substring] : state
                        }
                    }
                ]
            }

            const count = await db.user_farm.count({
                ...query,
                where: {
                    ...farmWhere, ...whereClause
                },
                include: [
                    {
                        model: db.user,
                        as: "user",
                        attributes: ["id", "firstName","middleName", "lastName", "mobile", "farm_limit"],
                        where: userWhere,
                        required: true
                    },
                            {
                        model: db.user,
                        as: "technician",
                        attributes: ["id","firstName","middleName","lastName","fullName","email","mobile"],
                        required: false,
                        where: userWhere
                        },
                ],
                subQuery: false
            });

            const isTechnicianRequired = 'id' in userWhere;
            let response = await db.user_farm.findAll({
                ...query,
                where: {
                    ...farmWhere, ...whereClause
                },
                attributes: [
                    "id",
                    "farmName",
                    "area",
                    "address",
                    "createdAt",
                    "status",
                    "farmerFirstName",
                    "farmerMiddleName",
                    "farmerLastName",
                    "dimitraFarmId",
                    "country",
                    "technicianId",
                    "region",
                    "registrationNo",
                    "farmerId",
                    "adminTechnicianId"
                ],
                include: [
                    {
                        model: db.user,
                        as: "user",
                        attributes: ["id", "firstName","middleName", "lastName", "mobile", "farm_limit", "email", "mobile"],
                        where: userWhere,
                        required:true,
                        include: [
                          {
                            model: db.Roles,
                            as: "user_role"
                          }
                        ]
                    },
                         {
                        model: db.user,
                        as: "technician",
                        attributes: ["id","firstName","middleName","lastName","fullName","email","mobile"],
                        required: false,
                        where: userWhere
                        },
                    {
                        model: db.user,
                        as: "adminTechnician",
                        attributes: ["id", "firstName","middleName", "lastName","fullName", "email", "mobile"],
                        required:false
                    },
                    {
                      model: db.FarmLocation,
                      as: "mainLocation",
                      where: locationWhere,
                    }
                ],
                subQuery: false
            });

            const userIds = response.map(farm => farm?.user?.id);
            let userFarmCount = await getUserFarmCount(userIds)
            userFarmCount = JSON.parse(JSON.stringify(userFarmCount));
            response = JSON.parse(JSON.stringify(response));
            response = response.map(userFarm => {
                const farmCountData = userFarmCount.find(x => x.userId === userFarm?.user?.id);
                let count = farmCountData ? farmCountData.count : 0;
                if(userFarm.user){
                    userFarm.user['farm_limit_used'] = count;
                }
                return userFarm;
            })

            return res.json(
                successRespSync({
                    msg: "User farm data",
                    data: {
                        count,
                        response
                    }
                })
            );
        } catch (error) {
            return serverError(res, error);
        }
    }
);

router.get('/user-farms', auth, async function(req, res) {
    const {userId} = req.query
    try{
        let result = await db.user_farm.findAll({
            attributes: [
                "id",
                "farmName",
                "area",
                "address",
                "createdAt",
                "status",
                "farmOwnershipType"
            ], 
            where:{userId:userId, isDeleted:0}
        })
        return res.json(
            successRespSync({
                msg: "User farm data",
                data: result
            })
        );
    } catch(error){
        return serverError(res, error);
    }
})

// /admin/member-data/farms/download-csv
router.get(
    "/download-csv",
    auth,
    async function (req, res) {
        try {
            const organization = req.user.organization;
            const subOrganizationId = req.user?.subOrgId
            let {
                page = 1,
                limit = 50,
                desc = '1',
                order = "createdAt",
                orderType = "DESC",
                searchPhrase,
                status,
                areaUnitId,
                userId
            } = req.query;

        
            let query = {};

            let where = {};
            if(userId) {
              where.userId = userId;
            }

            
            let farmWhere = {
                isDeleted:0
            }

            if(status) {
                where[Op.and] = [
                    {
                        status: status,
                    }
                ];
            }

            query.order = [];
            if (!order) {
                query.order.push(["createdAt", "DESC"]);
            } else {
                query.order.push([order, orderType]);
            }
            query.where = where;
            if (page && limit) {
                page = parseInt(page);
                limit = parseInt(limit);
                query.offset = (page - 1) * limit;
                query.limit = limit;
            }

            let userWhere =  {
                organization: organization,
                ...(subOrganizationId && {subOrganizationId:subOrganizationId})
            }

           
            if (searchPhrase) {
                userWhere[Op.or] = {
                    firstName: {
                        [Op.like]: `%${searchPhrase}%`,
                    },
                    middleName:{
                        [Op.like]: `%${searchPhrase}%`,
                    },
                    lastName: {
                        [Op.like]: `%${searchPhrase}%`,
                    }
                }
            }

            const count = await db.user_farm.count({
                ...query,
            });
            let response = await db.user_farm.findAll({
                ...query,
                   where: {
                    ...farmWhere, [Op.or]: [
                        { technicianId: null },               // farms without technician
                        { '$technician.id$': { [Op.ne]: null } } // OR farms with a matching technician (matched because include.where = userWhere)
                    ]
                },
                attributes: [
                    "id",
                    "farmName",
                    "area",
                    "address",
                    "createdAt",
                    "status"
                ],
                include: [
                    {
                        model: db.user,
                        as: "user",
                        attributes: ["id", "firstName","middleName" ,"lastName", "mobile", "farm_limit"],
                        where: userWhere,
                        required:true,
                    },
                    {
                        model: db.user,
                        as: "technician",
                        attributes: ["id", "firstName","middleName" ,"lastName","fullName"],
                          where: userWhere,
                        required:false
                    },
                ],
                  subQuery: false
            });

    
            const userIds = response.map(farm => farm.user.id);
            let userFarmCount = await getUserFarmCount(userIds)
            userFarmCount = JSON.parse(JSON.stringify(userFarmCount));
            response = JSON.parse(JSON.stringify(response));
            response = response.map(userFarm => {
                const farmCountData = userFarmCount.find(x => x.userId === userFarm.user.id);
                let count = farmCountData ? farmCountData.count : 0;
                userFarm.user['farm_limit_used'] = count;
                return userFarm;
            })

            let factor=1;
            let areaUnitName='Acre'


            if(areaUnitId){
                const areaUnit = await db.UnitsList.findOne({
                    where: {
                        id: areaUnitId
                    }
                })
                if (areaUnit?.name !='Acre') {
                     areaUnitName = areaUnit?.name;
                     factor = areaUnit?.factor;
                }  
            }
            
            let csvData = 'Farm Name,Farmer Name,Farm Limit Used,Phone Number,Farm Size,Farm Location, Technician Name, Date,Status\n';
            for (const item of response) {
                csvData += `"${item.farmName}","${item.user.firstName} ${item.user.middleName || ''} ${item.user.lastName}","${item.user.farm_limit_used}","${item.user.mobile || ''}","${parseFloat(item.area / (factor || 1)).toFixed(3)} ${areaUnitName || 'ac'}","${item.address}","${item.technician?.fullName || 'N/A'}","${item.createdAt}","${item.status}"\n`;
            }
            const csvFilePath = path.resolve(__dirname, `../../../../files/member-data-farms.csv`);
            fs.writeFileSync(csvFilePath, csvData, 'utf-8');

            res.writeHead(200, {
                "Content-Type": "application/octet-stream",
                "Content-Disposition": `attachment; filename=member-data-farms.csv`,
            });
            fs.createReadStream(csvFilePath).pipe(res);
            return;
        } catch (error) {
            return serverError(res, error);
        }
    }
);

// /admin/member-data/farms/userInfo
router.get(
    "/userInfo",
    auth,
    async function (req, res) {
        try {
            let {
                userId
            } = req.query;

            let query = {};

            let userWhere = {
                id: userId
            };

            let result = await db.user_farm.findAll({
                ...query,
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
                        model: db.user,
                        as: "user",
                        attributes: ["id", "firstName","middleName", "lastName", "mobile", "farm_limit"],
                        where: userWhere
                    },
                ]
            });

            let response = {}
            if( result && result.length > 0) {
                response = {
                    currentFarmLimit: result[0].user.farm_limit,
                    farmerName: `${result[0].user.firstName} ${result[0].user.middleName || ''} ${result[0].user.lastName}`.trim().replace(/\s+/g, ' '),
                    contactInformation: result[0].user.mobile,
                    requestedDate: result[0].user.createdAt,
                    farmHistory: []
                }
                for( const item of result) {
                    response.farmHistory.push({
                        farmId: item.id,
                        registeredFarms: item.farmName,
                        dateOfRegistration: item.createdAt,
                        ownershipType: item.farmOwnershipType,
                        location: item.address
                    })
                }
            }

            return res.json(
                successRespSync({
                    msg: "User farm data",
                    data: response
                })
            );
        } catch (error) {
            return serverError(res, error);
        }
    }
);

// /admin/member-data/farms/changeStatus/{id}
router.put(
    "/changeStatus/:id",
    auth,
    farmStatusChange(),
    validationErrorHandler,
    async function (req, res) {
        const transaction = await db.sequelize.transaction();
        try {
            const { id } = req.params;
            let {
                status,
                rejectMessage
            } = req.body;

            const existingData = await db.user_farm.findOne({
                where: {
                    id
                },
            });
            if (!existingData) {
                throw new Error("farm do not exists")
            }

            let set = {
                status: status,
            }

            if(status === 'rejected') set['reject_msg'] = rejectMessage

            await db.user_farm.update(set, {
                where: { id }
            });
            await transaction.commit();
            await syncFarmerDataToOCC(existingData.userId)
            return res.json(
                successRespSync({
                    msg: `Farm status is change to: ${status}`
                })
            );
        } catch (error) {
            await transaction.rollback();
            return serverError(res, error);
        }
    }
);

// /admin/member-data/farms/changeFarmLimit/{id}
router.put(
    "/changeFarmLimit/:id",
    auth,
    farmLimitValidate(),
    validationErrorHandler,
    async function (req, res) {
        const transaction = await db.sequelize.transaction();
        try {
            const { id } = req.params;
            let {
                farm_limit
            } = req.body;

            const existingData = await db.user.findOne({
                where: {
                    id
                },
            });
            if (!existingData) {
                throw new Error("user do not exists")
            }

            let set = {
                farm_limit: farm_limit,
            }

            await db.user.update(set, {
                where: { id }
            });
            await transaction.commit();
            return res.json(
                successRespSync({
                    msg: `Farm create limit is change to: ${farm_limit}`
                })
            );
        } catch (error) {
            await transaction.rollback();
            return serverError(res, error);
        }
    }
);

/**
 * @swagger
 * /admin/member-data/farms/by-farmers:
 *   get:
 *     summary: Fetch farms for a specific farmer by userId
 *     description: Fetch farms for a specific farmer using their user ID
 *     tags: [Admin]
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID of the farmer
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *         description: Number of records per page
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                     properties:
 *                       farms:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                             farmName:
 *                               type: string
 *                             address:
 *                               type: string
 *                             area:
 *                               type: number
 *                             farmOwnershipType:
 *                               type: string
 *                             farmer:
 *                               type: object
 *                               properties:
 *                                 id:
 *                                   type: integer
 *                                 firstName:
 *                                   type: string
 *                                 lastName:
 *                                   type: string
 *                                 fullName:
 *                                   type: string
 *                       totalCount:
 *                         type: integer
 *                       currentPage:
 *                         type: integer
 *                       totalPages:
 *                         type: integer
 */
router.get("/by-farmers", auth, async (req, res) => {
    try {
        const { userId, page = 1, limit = 10 } = req.query;
        const { organization } = req.user;

        if (!userId) {
            return res.json(
                errorRespSync({
                    code: 400,
                    msg: "User ID is required",
                })
            );
        }

        const parsedUserId = parseInt(userId);
        if (isNaN(parsedUserId)) {
            return res.json(
                errorRespSync({
                    code: 400,
                    msg: "Invalid user ID provided",
                })
            );
        }

        const offset = (page - 1) * limit;
        const parsedLimit = parseInt(limit);

        // Build where clause
        let whereClause = {
            userId: parsedUserId,
            isDeleted: 0
        };

        // Fetch farms with farmer details
        const result = await db.user_farm.findAndCountAll({
            attributes: [
                'id',
                'farmName',
                'address',
                'area',
                'farmOwnershipType',
                'country',
                'state',
                'city',
                'createdAt',
                'lat',
                'log',
                'registrationNo',
                'farmerFirstName',
                'farmerMiddleName',
                'farmerLastName'
            ],
            include: [
                {
                    model: db.user,
                    as: 'user',
                    attributes: ['id', 'firstName', 'middleName', 'lastName', 'fullName', 'email', 'mobile'],
                    where: {
                        organization: organization
                    },
                    required: true
                }
            ],
            where: whereClause,
            order: [['createdAt', 'DESC']],
            limit: parsedLimit,
            offset: offset,
            distinct: true
        });

        // Calculate pagination info
        const totalPages = Math.ceil(result.count / parsedLimit);

        // Format response data
        const farms = result.rows.map(farm => ({
            id: farm.id,
            farmName: farm.farmName,
            address: farm.address,
            area: farm.area,
            farmOwnershipType: farm.farmOwnershipType,
            country: farm.country,
            state: farm.state,
            city: farm.city,
            createdAt: farm.createdAt,
            lat: farm.lat,
            log: farm.log,
            registrationNo: farm.registrationNo,
            farmerFirstName: farm.farmerFirstName,
            farmerMiddleName: farm.farmerMiddleName,
            farmerLastName: farm.farmerLastName,
            farmer: {
                id: farm.user.id,
                firstName: farm.user.firstName,
                middleName: farm.user.middleName,
                lastName: farm.user.lastName,
                fullName: farm.user.fullName,
                email: farm.user.email,
                mobile: farm.user.mobile
            }
        }));

        return res.json(
            successRespSync({
                msg: "Farms fetched successfully",
                data: {
                    farms,
                    totalCount: result.count,
                    currentPage: parseInt(page),
                    totalPages,
                    hasNextPage: parseInt(page) < totalPages,
                    hasPrevPage: parseInt(page) > 1
                }
            })
        );

    } catch (err) {
        console.error("Error fetching farms by farmer:", err);
        return serverError(res, err);
    }
});

module.exports = router;