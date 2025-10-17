const express = require("express");
const router = express.Router();
const db = require(rootPath + "/models");
const auth = require(rootPath + "/middleware/auth");
const {
  errorResp,
  successRespSync,
  successResp,
  serverError,
} = require(rootPath + "/helpers/api");
const { error, success } = require(rootPath + "/helpers/language");
const { logErrorOccurred } = require(rootPath + "/helpers/general");
const S3 = require(rootPath + "/components/s3upload");
const validationErrorHandler = require(rootPath +
  "/middleware/validation_error_handler");
const translation = require(rootPath + "/middleware/translation");
const moment = require("moment");
const {
  createPassword,
} = require("../../../helpers/hash");
const { Sequelize, Op } = require('sequelize');
const shortid = require("short-uuid");
const mailer = require(rootPath + '/components/mailer');
const ejs = require('ejs');
const path = require('path');
const Queue = require("bull");
const enterpriseActivationQueue = new Queue("enterpriseActivationQueue", {
  redis: {
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD || "",
  },
});

enterpriseActivationQueue.process(async function (job, done) {
  try {
    const { enterprise: id, status } = job.data;

    await db.Organization.update({
      status
    }, {
      where: { id },
    });
    
    done();
  } catch (err) {
    const { id } = job.data;
    console.log(`Enterprise activation task with id ${id} failed!`)
    done(err);
  }
});

const checkNotSuperAdminPermissions = (req) => {
  // TODO: Could be made into a middleware and also this condition was implemented wrong
  // Will return super admin if permission not found
  let roles = req.user.userRoles.find((r) => r.role_id === "super_admin");

  //check if not super admin
  return roles && roles.role_id !== "super_admin";
}

router.post("/", auth, async function (req, res) {
  try {
    const { users, organization } = req.body;
    const { logo: base64Logo, ...enterpriseData } = organization;

    //check if not super admin
    if (checkNotSuperAdminPermissions(req)) {
      throw new Error("Unauthorized access.");
    }

    const code = enterpriseData.name.toLowerCase().replace(" ", "_");

    // Early exit cases
    // Duplicate organization
    const orgCodeDuplicationCount = await db.Organization.count({
      where: {
        code
      }
    });

    if (orgCodeDuplicationCount > 0) {
      return res.json(
        await errorResp({
          code: success.code.OK,
          msg: `Enterprise already exists with name ${enterpriseData.name}`,
        })
      );
    }

    console.log("Organization Duplication Check Passed!");
    
    // Duplicate user
    for await (const { email } of users) {
      const userEmailDuplicateCount = await db.user.count({
        where: {
          email
        }
      });

      // Exit if duplicate user account exists
      if (userEmailDuplicateCount > 0) {
        return res.json(
          await errorResp({
            code: success.code.OK,
            msg: error.EMAIL_EXIST_ALREADY,
          })
        );
      }
    }

    let  params,
    uploadedFile,
    logo,
    enterprise
    if(base64Logo) {
      
      // upload base64 image
       params = {
        bucket: process.env.AWS_PUBLIC_BUCKET,
        base64: base64Logo,
        fileName: `org/${shortid.generate()}`,
      };
       uploadedFile = await S3.uploadBase64(params);
      
      // save and format data
       logo = uploadedFile.Location;
    }

    enterprise = await db.Organization.create({
      ...enterpriseData,
      code,
      logo
    });

    console.log("Organization Created");

    if (enterprise) {
      // Creating roles
      const defaultRoles = ['Operator','Supplier','Producer']
      for (const roleName of defaultRoles) {
        const uniqueRoleId = `${enterprise.code}_${roleName
            .split(" ")
            .join("_")
            .toLowerCase()}`;

        await db.Roles.create({
          id: uniqueRoleId,
          name: roleName,
          role_type: "admin",
          description: "Default Role",
          organization: enterprise.id,
          editable:false
        });
      }

      console.log("Default Roles Created");

      const roleName = code;
      const uniqueRoleId = `${code}_${roleName
        .split(" ")
        .join("_")
        .toLowerCase()}`;
      
      await db.Roles.create(
        {
          id: uniqueRoleId,
          name: roleName,
          role_type: "admin",
          description: roleName,
          organization: enterprise.id,
        }
      );

      await db.ParentModules.create(
        {
          id: uniqueRoleId,
          name: roleName,
          module_type: "admin",
        }
      );

      let currentUserRole = "super_admin"; // super_admin must have all the modules
      const modules = await db.Modules.findAll({
        raw: true,
        nest: true,
        where: {
          parent_module_id: currentUserRole,
        },
      });

      const newModules = modules.map((item) => ({
        ...item,
        id: item.id.replace(currentUserRole, uniqueRoleId),
        parent_module_id: item.parent_module_id.replace(
          currentUserRole,
          uniqueRoleId
        ),
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

      await db.Modules.bulkCreate(newModules);

      console.log("User Roles Created!");

      const permission = await db.Permissions.findAll({ raw: true });

      const adminModulePermissions = modules.reduce(
        (previousValue, { id: module_id }) => {
          const moduleAndPermissions = permission.map(
            ({ id: permission_id }) => {
              // const id = `${rolesRows.id}_${module_id}_${permission_id}`;
              return {
                id:
                  module_id.replace(currentUserRole, uniqueRoleId) +
                  permission_id,
                role_id: uniqueRoleId,
                module_id: module_id.replace(currentUserRole, uniqueRoleId),
                permission_id,
                createdAt: moment.utc(),
                updatedAt: moment.utc(),
              };
            }
          );
          return [...previousValue, ...moduleAndPermissions];
        },
        []
      );

      await db.AdminUsersRolesModulesPermissions.bulkCreate(adminModulePermissions);

      console.log("Organization Permissions Created!");

      // Creating user accounts
      for await (const user of users) {
        const [firstName, lastName, ..._] = user.name.split(" ");
        const password = user.email.split("@")[0] + shortid.generate();
        const passwordHash = await createPassword(password);

        // Creating user accounts
        const userAccount = await db.user.create({
          firstName,
          lastName,
          email: user.email,
          password: passwordHash,
          organization: enterprise.id,
          verified: 1,
          source: 'saas_api_enterprise_creation'
        });

        if (userAccount) {
          await db.AdminUserRoles.create(
            {
              id: `${userAccount.id}_${uniqueRoleId}`,
              user_id: userAccount.id,
              role_id: uniqueRoleId,
            }
          )
        }

        delete userAccount;

        // Send Email to user to invite them to enterprise
        const data = {
          fullName: user.name,
          enterpriseName: enterpriseData.name,
          password: password
        };

        const title = 'Dimitra Enterprise Account Created';
        const template = await ejs.renderFile(
          path.join(rootPath, 'views', 'users/enterprise-account.html'),
          data
        );
        // mailer.sendMail(user.email, title, template);
      }
      console.log("User Accounts Created!");
      return res.json(
        successRespSync({
          msg: "Enterprise created succssfully.",
          data: {
            enterprise,
            adminRole: uniqueRoleId
          },
        })
      );
    } else {
      return res.json(
        await errorResp({
          code: success.code.OK,
          msg: `Could not find organization with code ${code}`,
        })
      );
    }
  } catch (error) {
    return serverError(res, error);
  }
});

router.post("/activate", auth, async function (req, res) {
  try {
    const { enterprises, status } = req.body;;
    const action = status === 'active' ? 'activation': 'deactivation';

    for (const id of enterprises) {
      const orgCount = await db.Organization.count({
        where: {
          id
        }
      });

      if (orgCount === 0) {
        throw Error(`Enterprise not found: ${id}`);
      }
    }

    enterprises.forEach((enterprise) => enterpriseActivationQueue.add({ enterprise, status }));

    return res.json(
      successRespSync({
        msg: `Enterprise ${action} queued!`
      })
    );
  } catch (error) {
    return serverError(res, error);
  }
});

router.put("/:id", auth, async function (req, res) {
  try {
    const data = req.body;
    const { id } = req.params;
    data.code = `${data.name
      .split(" ")
      .map((n) => n.substr(0, 3))
      .join("")}-${Date.now()}`;
    let roles = req.user.userRoles.find((r) => r.role_id === "super_admin");
    //check if not super admin
    if (roles && roles.role_id !== "super_admin") {
      throw new Error("Unauthorized access.");
    }
    const enterprise = await db.Organization.update(data, {
      where: { id },
    });
    return res.json(
      successRespSync({
        msg: "Enterprise updated successfully.",
        data: enterprise,
      })
    );
  } catch (error) {
    return serverError(res, error);
  }
});

router.patch("/:id/activate", auth, async function (req, res) {
  try {
    const { status } = req.body;
    const { id } = req.params;
    
    const enterprise = await db.Organization.update({
      status
    }, {
      where: { id },
    });
    return res.json(
      successRespSync({
        msg: "Enterprise updated successfully.",
        data: enterprise,
      })
    );
  } catch (error) {
    return serverError(res, error);
  }
});

router.get("/", auth, translation, async function (req, res) {
  try {
    if (checkNotSuperAdminPermissions(req)) {
      throw new Error("Unauthorized access.");
    }
    
    // Fetching route Query
    const {
      page,
      limit,
      search,
      sortBy,
      sortType
    } = req.query;

    const query = {
      offset: (page - 1) * limit,
      limit: Number.parseInt(limit),
      order: [['createdAt', 'DESC']]
    }

    const where = { isDeleted: false };

    if (search && search.length > 2) {
      where["name"] = {
        [Op.like]: `%${search}%`
      };
    }

    query.where = where;

    if (sortBy && sortBy.length > 0) {
      query.order = [[sortBy, sortType]];
    }

    const enterprises = await db.Organization.findAndCountAll(query);

    const { lang } = req?.headers;

    if (lang && lang !== "en") {
      windBreakerRes = req.translateFunction(
        enterprises,
        globalTranslationCache,
        {
          lvl1: true,
          moduleName: "super-admin/enterprise",
        }
      );
    }

    return res.json(
      successRespSync({
        msg: "Enterprises fetched successfully.",
        data: enterprises,
      })
    );
  } catch (error) {
    return serverError(res, error);
  }
});

router.get("/export", auth, translation, async function (req, res) {
  try {
    const type = req.query.type ?? 'csv';

    const enterprises = await db.Organization.findAll({
      attributes: [
        'id',
        'name',
        'code',
        'activationKeysAllowed',
        'activationKeysUsed',
        'registrationDate',
        'status',
        'country'
      ]
    });

    if (type === 'csv') {
      const items = enterprises.map((item) => item.dataValues);
      const replacer = (key, value) => value === null ? '' : value;
      const header = Object.keys(items[0]);
      const csv = [
        header.join(','),
        ...items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
      ].join('\r\n');

      return res.json(
        successRespSync({
          msg: "Enterprises fetched successfully.",
          data: csv,
        })
      );
    }

    return res.json(
      successRespSync({
        msg: "Enterprises fetched successfully.",
        data: enterprises,
      })
    );
  } catch (error) {
    return serverError(res, error);
  }
});

router.get("/modules", auth, async (req, res) => {
  try {
    const inclusions = [
      "parent_dashboard", 
      "crops_reports", 
      "dashboard", 
      "equipment_reports", 
      "farmers_reports", 
      "farms_reports", 
      "goals_achieved_reports", 
      "pests_reports", 
      "regions_reports", 
      "report_dashboard", 
      "avocado", 
      "avocado_tree", 
      "crops_trace_overview", 
      "crops_trace_overview_traceability", 
      "coffee_overview", 
      "coffee_data", 
      "plantations", 
      "reports", 
      "traceability", 
      "green_beans", 
      "cacao", 
      "traceability", 
      "cacao_buyselloverview", 
      "eudr_due_deligence", 
      "dds_dashboard", 
      "dds_due_deligence_report", 
      "dds_manage_farm", 
      "dds_producers", 
      "dds_operators", 
      "dds_dispute_resolution", 
      "dds_shipments", 
      "dds_assessment_builder", 
      "dds_settings", 
      "farm_management", 
      "farmers", 
      "farms", 
      "survey_builder", 
      "deforestation", 
      "compliance_certification", 
      "deforestation_compliance_reports", 
      "user_management", 
      "activation", 
      "membership", 
      "permissions", 
      "role_requests", 
      "users/userList", 
      "faq", 
      "tickets", 
      "activity_log", 
      "users/profiles", 
      "member_data", 
      "buying_station", 
      "manage_offline_farmers", 
      "reports_parent", 
      "pesticides_reports", 
      "land_suitability", 
      "weather_analysis_report", 
      "crop_health_report", 
      "admin_roles",
    ];

    const nestedModules = [];
    const modules = (await db.SidebarMenu.findAll({
      attributes: [
        [Sequelize.fn('DISTINCT', Sequelize.col('id')), 'id'], 'name', 'route_path_name', 'parent_menu_id', 'order'],
      where: {
        id: {
          [Op.in]: inclusions
        }
      },
      group: ['id']
    })).map((module) => module.dataValues);

    const parentModule = modules.filter((module) => module.parent_menu_id === null);
    
    for (const module of parentModule) {
      const subMenus = modules.filter((sub) => sub.parent_menu_id === module.id);

      if (subMenus.length > 0) {
        nestedModules.push({
          ...module,
          subMenus
        });
      } else {
        nestedModules.push(module);
      }
    }

    return res.json(
      successRespSync({
        msg: "Modules fetched",
        data: nestedModules,
      })
    );
  } catch (error) {
    return serverError(res, error);
  }
});

router.get("/:id", auth, translation, async function (req, res) {
  try {
    if (checkNotSuperAdminPermissions(req)) {
      throw new Error("Unauthorized access.");
    }

    // Fetch ID from route params
    const { id } = req.params;

    if (!id) {
      throw new Error("Enterprise ID not provided");
    }

    // Fetching org data
    const enterprise = await db.Organization.findByPk(id);

    if (enterprise === null) {
      throw new Error(`Enterprise with ID not provided ${id}`);
    }

    const access = await db.SidebarMenu.findAll({
      where: {
        organization: id,
        parent_menu_id: null
      }
    });

    return res.json(
      successRespSync({
        msg: "Enterprise fetched successfully.",
        data: {
          ...enterprise.dataValues,
          access
        },
      })
    );
  } catch (error) {
    return serverError(res, error);
  }
});

router.get("/:id/users", auth, translation, async function (req, res) {
  try {
    if (checkNotSuperAdminPermissions(req)) {
      throw new Error("Unauthorized access.");
    }

    // Fetch ID from route params
    const { id } = req.params;

    // Fetch status from url if exists
    const {
      status,
      search,
      country,
      page,
      limit,
      sortBy,
      sortType
    } = req.query;

    const query = {
      offset: (page - 1) * limit,
      attributes: ['id', 'firstName', 'lastName', 'email', 'active', 'createdAt'],
      where: { organization: id },
      include: [
        {
          model:db.Roles,
          attributes:['id','name'],
          as: 'user_role'
        },
        {
          model:db.activationKeys, 
          as: 'activation'
        }
      ],
      limit: Number.parseInt(limit),
      order: [['createdAt', 'DESC']]
    }

    if (status) {
      // Check status and filter
      switch(status) {
        case "offline":
          query.where["userType"] = {
            [Sequelize.Op.or]: [
              { [Sequelize.Op.like]: '%offline%' },
            ]
          }
          break;
        case "admin":
          let adminRoles = [];
          adminRoles = await db.Roles.findAll({
            where: {
              id: {
                [Op.not]: ['end_user', 'super_admin'],
              },
            },
            attributes: ['id'],
            raw: true,
          });
          adminRoles = adminRoles.map((ar) => ar.id);

          query.include.push({
            model: db.Roles,
            as: 'admin_user_roles',
            through: { model: db.AdminUserRoles, attributes: [] },
            attributes: [],
            required: true,
            where: {
              id: {
                [Op.in]: adminRoles,
              },
            },
          })
          break;
        case "active":
          query.where["active"] = true;
          break;
        case "inactive":
          query.where["active"] = false;
          break;
        case "end_user":
          query.include.push({
            model: db.Roles,
            as: 'user_role_assoc',
            through: { model: db.UserRoles, attributes: [] },
            attributes: [],
            required: true,
            where: {
              name: "App User"
            },
          });
          break;
      }
    }

    if (search && search.length > 2) {
      query.where = {
        ...query.where,
        [Op.or]: [
          { firstName: { [Op.like]: `%${search}%` } },
          { middleName: { [Op.like]: `%${search}%` } },
          { lastName: { [Op.like]: `%${search}%` } },
          { mobile: { [Op.like]: `%${search}%` } },
          { email: { [Op.like]: `%${search}%` } },
        ],
      };
    }

    if (country) {
      query.where = {
        ...query.where,
        country
      };
    }

    if (sortBy && sortBy.length > 0) {
      query.order = [[sortBy, sortType]];
    }

    if (!id) {
      throw new Error("Enterprise ID not provided");
    }

    const users = await db.user.findAndCountAll(query);

    return res.json(
      successRespSync({
        msg: "Enterprise fetched successfully.",
        data: users,
      })
    );
  } catch (error) {
    return serverError(res, error);
  }
})

router.delete("/:id", auth, async function (req, res) {
  try {
    const { id } = req.params;
    let roles = req.user.userRoles.find((r) => r.role_id === "super_admin");
    //check if not super admin
    if (roles && roles.role_id !== "super_admin") {
      throw new Error("Unauthorized access.");
    }
    const enterprise = await db.Organization.update(
      { isDeleted: true },
      { where: { id } }
    );
    return res.json(
      successRespSync({
        msg: "Enterprise deleted",
        data: enterprise,
      })
    );
  } catch (error) {
    return serverError(res, error);
  }
});

router.post(
  "/enterprise-role",
  auth,
  validationErrorHandler,
  async (req, res) => {
    try {
      const { roleName, description, organizationCode } = req.body;
      const transaction = await db.sequelize.transaction();

      const userId = req.user.id;
      const organizationData = await db.Organization.findOne({
        where: {
          code: organizationCode,
        },
      });

      // if org already exists
      if (organizationData) {
        const isRoleNameExists = await db.Roles.count({
          where: {
            name: roleName,
            organization: organizationData.id,
          },
        });
        if (isRoleNameExists > 0) {
          return res.json(
            await errorResp({
              code: success.code.OK,
              msg: `Role already exists with name ${roleName}`,
            })
          );
        }

        let count = await db.Roles.count({
          where: {
            name: roleName,
          },
        });
        let roleId = "";
        if (count > 0) {
          roleId =
            roleName.split(" ").join("_").toLowerCase() + "_" + (count + 1);
        } else {
          roleId = roleName.split(" ").join("_").toLowerCase();
        }

        try {
          const uniqueRoleId = `${organizationCode}_${roleName
            .split(" ")
            .join("_")
            .toLowerCase()}`;
          let rolesRows = await db.Roles.create(
            {
              id: uniqueRoleId,
              name: roleName,
              role_type: "admin",
              description,
              organization: organizationData.id,
            },
            { transaction }
          );
          let parentModulesRes = await db.ParentModules.create(
            {
              id: uniqueRoleId,
              name: roleName,
              module_type: "admin",
            },
            { transaction }
          );

          let currentUserRole = "super_admin"; // super_admin must have all the modules
          const modules = await db.Modules.findAll({
            raw: true,
            nest: true,
            where: {
              parent_module_id: currentUserRole,
            },
          });

          const newModules = modules.map((item) => ({
            ...item,
            id: item.id.replace(currentUserRole, uniqueRoleId),
            parent_module_id: item.parent_module_id.replace(
              currentUserRole,
              uniqueRoleId
            ),
            createdAt: new Date(),
            updatedAt: new Date(),
          }));

          await db.Modules.bulkCreate(newModules, {
            transaction,
          });

          const permission = await db.Permissions.findAll({ raw: true });

          const adminModulePermissions = modules.reduce(
            (previousValue, { id: module_id }) => {
              const moduleAndPermissions = permission.map(
                ({ id: permission_id }) => {
                  // const id = `${rolesRows.id}_${module_id}_${permission_id}`;
                  return {
                    id:
                      module_id.replace(currentUserRole, uniqueRoleId) +
                      permission_id,
                    role_id: uniqueRoleId,
                    module_id: module_id.replace(currentUserRole, uniqueRoleId),
                    permission_id,
                    createdAt: moment.utc(),
                    updatedAt: moment.utc(),
                  };
                }
              );
              return [...previousValue, ...moduleAndPermissions];
            },
            []
          );

          await db.AdminUsersRolesModulesPermissions.bulkCreate(
            adminModulePermissions,
            {
              transaction,
            }
          );

          await transaction.commit();

          return res.json(
            successRespSync({
              msg: "Roles created successfully",
              data: {
                rolesRows,
              },
            })
          );
        } catch (err) {
          await transaction?.rollback();
          return serverError(res, err);
        }
      } else {
      }
    } catch (err) {
      return res.json(
        await errorResp({
          code: err?.original?.code || 500,
          msg:
            err?.original?.code == "ER_DUP_ENTRY"
              ? error.ALREADY_EXISTS
              : error.SERVER,
        })
      );
    }
  }
);

router.post(
  "/enterprise-account",
  auth,
  validationErrorHandler,
  async (req, res) => {
    try {
      const { email, password, organizationCode, adminRole } = req.body;

      // generate password hash
      const passwordHash = await createPassword(password);
      let orgObj = await db.Organization.findOne({
        where: {
          code: organizationCode,
        },
      });
      let userData = {
        organization: orgObj.id,
        email,
        password: passwordHash,
        verified: 1,
        source: 'saas_api_enterprise_admin'
      };

      // check if user already exist
      let isAlreadyExist = await db.user.findOne({
        attributes: ["email", "id"],
        where: { email },
      });

      // create admin user if user doesn't exists
      let userResult = null;

      let roleResult = null;
      if (isAlreadyExist == null) {
        userResult = await db.user.create(userData);
        if (userResult) {
          roleResult = await db.AdminUserRoles.create(
            {
              id: `${userResult.id}_${adminRole}`,
              user_id: userResult.id,
              role_id: adminRole,
            }
          );
        }
        delete userResult.dataValues.password;
        res.json(
          await successResp({
            msg: success.ADMIN_USER_CREATED,
            data: {
              ...userResult.dataValues,

              role_id: roleResult.id,
            },
          })
        );
      } else {
        // send response if user alredy exist
        return res.json(
          await errorResp({
            code: success.code.OK,
            msg: error.EMAIL_EXIST_ALREADY,
          })
        );
      }
    } catch (err) {
      logErrorOccurred(__filename, err);
      console.log("error occured in catch*************", err.message);
      return res.status(error.code.SERVER_ERROR).json(await errorResp());
    }
  }
);

router.post("/sidebar-menu", auth, validationErrorHandler, async (req, res) => {
/** sample req body:
//   {
//     "menuItems": [
//         {
//             "id": "dashboard",
//             "name": "Dashboard",
//             "route": "Dashboard",
//             "icon": "/icons/dashboard.png",
//             "order": 1
//         },
//         {
//             "id": "reports_parent",
//             "name": "Reports",
//             "route": "ReportsParents",
//             "icon": "/icons/bar.png",
//             "order": 2,
//             "subMenus": [
//                 {
//                     "id": "crops_reports",
//                     "name": "Crops",
//                     "route": "CropsReports",
//                     "icon": null,
//                     "order": 2,
//                     "label": "Crops"
//                 },
//                 {
//                     "id": "equipment_reports",
//                     "name": "Equipment",
//                     "route": "EquipmentReports",
//                     "icon": null,
//                     "order": 3,
//                     "label": "Equipment"
//                 },
//                 {
//                     "id": "farmers_reports",
//                     "name": "Farmers",
//                     "route": "FarmersReports",
//                     "icon": null,
//                     "order": 4,
//                     "label": "Farmers"
//                 },
//                 {
//                     "id": "farms_reports",
//                     "name": "Farms",
//                     "route": "FarmsReports",
//                     "icon": null,
//                     "order": 5,
//                     "label": "Farms"
//                 },
//                 {
//                     "id": "goals_achieved_reports",
//                     "name": "Goals Achieved",
//                     "route": "GoalsAchievedReports",
//                     "icon": null,
//                     "order": 6,
//                     "label": "Goals Achieved"
//                 },
//                 {
//                     "id": "pests_reports",
//                     "name": "Pests",
//                     "route": "PestsReports",
//                     "icon": null,
//                     "order": 7,
//                     "label": "Pests"
//                 },
//                 {
//                     "id": "regions_reports",
//                     "name": "Regions",
//                     "route": "regions",
//                     "icon": null,
//                     "order": 1,
//                     "label": "Regions"
//                 },
//                 {
//                     "id": "report_dashboard",
//                     "name": "Report Dashboard",
//                     "route": "dashboard-reports",
//                     "icon": null,
//                     "order": 8,
//                     "label": "Report Dashboard"
//                 }
//             ]
//         },
//         {
//             "id": "users/userList",
//             "name": "Users",
//             "route": "Users",
//             "icon": "/icons/users.png",
//             "order": 3
//         },
//         {
//             "id": "activation",
//             "name": "Activation Keys",
//             "route": "ActivationKey",
//             "icon": "/icons/activationKey.png",
//             "order": 4
//         },
//         {
//             "id": "admin_roles",
//             "name": "Admin Roles",
//             "route": "AdminRoles",
//             "icon": "/icons/roles.png",
//             "order": 5
//         },
//         {
//             "id": "activity_log",
//             "name": "Activity Log",
//             "route": "ActivityLogs",
//             "icon": "/icons/logs.png",
//             "order": 7
//         },
//         {
//             "id": "faq",
//             "name": "FAQ",
//             "route": "Faq",
//             "icon": "/icons/faq.png",
//             "order": 8
//         },
//         {
//             "id": "membership",
//             "name": "Membership Plan",
//             "route": "MembershipTypes",
//             "icon": "/icons/membership.png",
//             "order": 9
//         },
//         {
//             "id": "permissions",
//             "name": "Permissions",
//             "route": "AdminPermissions",
//             "icon": "/icons/permissions.png",
//             "order": 10
//         },
//         {
//             "id": "tickets",
//             "name": "Tickets",
//             "route": "Tickets",
//             "icon": "/icons/tickets.png",
//             "order": 12
//         },
//         {
//             "id": "role_requests",
//             "name": "Role Requests",
//             "route": "RoleRequest",
//             "icon": "/icons/usersettings.png",
//             "order": 13
//         },
//         {
//             "id": "users/profiles",
//             "name": "Settings",
//             "route": "ProfileAuthSet",
//             "icon": "/icons/usersettings.png",
//             "order": 14
//         }
//     ],
//     "orgId": 23,
//     "adminRole": "ladivisoria_ladivisoria_admin"
// }
*/
  try {
    let { menuItems, orgId, adminRole } = req.body;

    let sidebarMenuInputArr = [],
      adminUserRolePerm = [],
      moduleArr = [],
      promiseArr = [],
      methodsArr = ["put", "get", "post", "delete"];

    // first deal with adminRole, adminRole is also parent_module, so need to upsert in both roles and parent_module table

    let roleExists = await db.Roles.findOne({
      where: {
        id: adminRole,
      },
    });

    if (!roleExists) {
      let newRole = await db.Roles.create({
        id: adminRole.split(" ").join("_").toLowerCase(),
        name: adminRole,
        role_type: "admin",
        organization: req.user.organization,
      });
      adminRole = newRole.id;
    }

    let parentModuleExists = await db.ParentModules.findOne({
      where: {
        id: adminRole,
      },
    });

    if (!parentModuleExists) {

      await db.ParentModules.create({
        id: adminRole,
        name: adminRole,
        module_type: "admin"
      });
      let newParentModule = await db.Roles.findOrCreate({
        where: {
          id: adminRole.split(" ").join("_").toLowerCase()
        },
        defaults: {
          id: adminRole.split(" ").join("_").toLowerCase(),
          name: adminRole,
          role_type: "admin",
          organization: orgId
        }
     
      });
      adminRole = newParentModule && newParentModule[0].id;
    }

    adminRole = adminRole.split(" ").join("_").toLowerCase();

    menuItems.forEach((menu) => {
      //parent menu data entry
          sidebarMenuInputArr.push({
            id: menu?.id,
            name: menu?.name,
            parent_menu_id: null,
            route_path_name: menu?.route_path_name,
            icon: null,
            active: menu?.active == 0 ? 0 : 1,
            order: menu?.order,
            icon: menu?.icon,
            organization: orgId,
          });

          moduleArr.push({
            id: `${adminRole}_${menu?.id}`,
            name: menu?.name,
            description: null,
            parent_module_id: adminRole,
          });


          methodsArr.forEach((perm) => {
            adminUserRolePerm.push({
              id: `${adminRole}_${menu?.id}_${perm}`,
              role_id: adminRole,
              module_id: `${adminRole}_${menu?.id}`,
              permission_id: perm,
              permitted: 1,
            });
          });

    //sub menu data entry
      menu?.subMenus?.forEach((subMenu) => {
        moduleArr.push({
          id: `${adminRole}_${subMenu?.id}`,
          name: subMenu?.name,
          description: null,
          parent_module_id: adminRole,
        });

        methodsArr.forEach((perm) => {
          adminUserRolePerm.push({
            id: `${adminRole}_${subMenu?.id}_${perm}`,
            role_id: adminRole,
            module_id: `${adminRole}_${subMenu?.id}`,
            permission_id: perm,
            permitted: 1,
          });
        });

        sidebarMenuInputArr.push({
          id: subMenu?.id,
          name: subMenu?.name,
          parent_menu_id: menu?.id,
          route_path_name: subMenu?.route_path_name,
          icon: null,
          active: subMenu?.active == 0 ? 0 : 1,
          order: subMenu?.order,
          icon: subMenu?.icon,
          organization: orgId,
        });
      });
    });

    let modulesRes = await db.Modules.bulkCreate(moduleArr, {
      updateOnDuplicate: ["id", "parent_module_id"],
    });

    let sidebarRes = await db.SidebarMenu.bulkCreate(sidebarMenuInputArr, {
      updateOnDuplicate: ["id", "organization"],
    });

    let resData = await db.AdminUsersRolesModulesPermissions.bulkCreate(
      adminUserRolePerm,
      {
        updateOnDuplicate: ["id", "role_id"],
      }
    );

    res.json(
      await successResp({
        msg: "New sidebar data added for the provided role",
        data: resData,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    console.log("error occured in catch*************", err.message);
    return res.status(error.code.SERVER_ERROR).json(await errorResp());
  }
});

module.exports = router;
