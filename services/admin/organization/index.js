const { createPassword } = require("../../../helpers/hash");
const { generateOrgCode, generateRandomPassword } = require("../../../helpers/utils");
const XLSX = require('xlsx');
const Organization = require(rootPath + "/mongoose-models/Organization.js")
const db = require(rootPath + '/models');
const mailer = require(rootPath + '/components/mailer');
const ejs = require('ejs');
const path = require("path");
const { Op } = require('sequelize');
const { syncUserData } = require("../../../helpers/dds_sync");

async function sendWelcomeEmail(email, data) {
    try {
        const { password, organizationName } = data;

        const emailData = {
            fullName: email,
            enterpriseName: organizationName,
            password,
            welcomeMessage: `Welcome to Dimitra! Your account has been successfully created under the organization ${organizationName}.`
        };

        const title = 'Welcome to Dimitra';
        const template = await ejs.renderFile(
            path.join(rootPath, 'views', 'users/welcome-email.html'),
            emailData
        );

        await mailer.sendMail(email, title, template);
    } catch (error) {
        console.error('Error sending welcome email:', error);
        throw error;
    }
}

async function assignRoleAndPermissions(email, orgId, transaction) {
    try {
        const user = await db.user.findOne({
            where: { email },
            transaction
        });

        if (!user) {
            throw new Error('User not found');
        }

        const [role] = await db.Roles.findOrCreate({
            where: { id: 'sub_enterprise' },
            defaults: {
                id: 'sub_enterprise',
                name: 'Sub Enterprise',
                role_type: 'admin',
                description: "Sub enterprise role",
                organization: orgId,
                editable: true,
            },
            transaction
        });

        const adminUserRoleId = `${user.id}_${role.id}`;
        await db.AdminUserRoles.create({
            id: adminUserRoleId,
            user_id: user.id,
            role_id: role.id,
            createdAt: new Date(),
            updatedAt: new Date()
        }, { transaction });
    } catch (error) {
        console.error('Error in assignRoleAndPermissions:', error);
        throw error;
    }
}

async function createOrUpdateSubOrg(parentOrgId, payload) {
    const transaction = await db.sequelize.transaction();
    let newUser;

    try {
        const {
            id,
            name,
            email,
            mobile,
            country,
            countryCode,
            countryId,
            state,
            region,
            village,
            address,
            logoUrl,
            linkedProducts,
            assessmentUrl,
            licenseId,
            status,
            subscriptionEndDate,
            registrationDate,
        } = payload;

        const parentOrg = await db.Organization.findOne({
            where: { id: parentOrgId },
            transaction,
        });

        if (!parentOrg) {
            throw new Error('Parent organization not found.');
        }

        // Check if an organization with the same name already exists
        const existingOrgWithName = await db.Organization.findOne({
            where: { name },
            transaction,
        });

        if (existingOrgWithName && existingOrgWithName.id !== id) {
            throw new Error('An organization with this name already exists.');
        }

        const orgCode = generateOrgCode(name);

        let orgPayload = {
            name,
            code: orgCode,
            logo: logoUrl,
            status,
            subscriptionEndDate: subscriptionEndDate ? new Date(subscriptionEndDate).toISOString() : null,
            registrationDate: registrationDate ? new Date(registrationDate).toISOString() : null,
            country: countryId,
            licenseId,
            isSubOrganization: 1,
            parentId: parentOrg?.id,
            activationKeysAllowed: 5000, // default value change it later
            dimitraPointSystem: 0, // default value change it later
            accessmentReportUrl: assessmentUrl,
            cfOrgId: id,
            primaryUserId: null,
            isTest: name.toLowerCase().includes('dimitra test') ? true : false,
        };

        let newSubOrg;

        if (id) {
            // Update existing sub-organization
            newSubOrg = await db.Organization.findOne({ where: { id }, transaction });
            orgPayload.primaryUserId = newSubOrg.primaryUserId;

            if (!newSubOrg) {
                throw new Error('Sub-organization not found.');
            }
            await newSubOrg.update(orgPayload, { transaction });
        } else {
            // Create new sub-organization
            const [createdSubOrg, created] = await db.Organization.findOrCreate({
                where: { code: orgCode },
                defaults: orgPayload,
                transaction,
            });

            if (!created) {
                throw new Error('Organization with this code already exists');
            }
            newSubOrg = createdSubOrg;
        }

        let  products = [];
        // Handle linked products
        if (linkedProducts && linkedProducts.length > 0) {
            // Delete existing linked products for update
            if (id) {
                await db.OrganizationProduct.destroy({ 
                    where: { organizationId: newSubOrg.id }, 
                    transaction,
                });
            }

            const organizationProducts = linkedProducts.map((id) => ({
                organizationId: newSubOrg.id,
                product_id: id,
            }));

             products = await db.Product.findAll({
                where: {
                    id: {
                        [Op.in]: linkedProducts.map(id => id)
                    }
                }
            })
            
            await db.OrganizationProduct.bulkCreate(organizationProducts, { transaction });
        }

        const userPayload = {
            firstName: name,
            lastName: '',
            email,
            mobile,
            countryId,
            country,
            stateId: state,
            district: region,
            village,
            address,
            organization: parentOrgId,
            subOrganizationId: newSubOrg.id,
            active: true,
            source: 'saas_api_organization_creation'
        };

        if (id && newSubOrg.primaryUserId) {
            // Update existing user
             newUser = await db.user.findOne({ 
                where: { id: newSubOrg.primaryUserId }, 
                transaction,
            });
            if (newUser) {
                await newUser.update(userPayload, { transaction });
            }
        } else {
            // Check if email already exists
            const existingUser = await db.user.findOne({ 
                where: { email: userPayload.email }, 
                transaction,
            });
            if (existingUser) {
                throw new Error('Email already exists');
            }

            // Create new user
            const defaultPassword = generateRandomPassword();
            const hashedPassword = await createPassword(defaultPassword);

            userPayload.password = hashedPassword;

            newUser = await db.user.create(userPayload, { transaction });

            // Assign Role to newly created user (within the transaction)
            await assignRoleAndPermissions(newUser.email, newSubOrg.id, transaction);

            newSubOrg.primaryUserId = newUser.id;
            await newSubOrg.save({ transaction });

            // Update organization payload with primary user ID
            orgPayload.primaryUserId = newUser.id;
            orgPayload.cfOrgId = newSubOrg.id;


            // Send welcome email with credentials
            await sendWelcomeEmail(email, {
                password: defaultPassword,
                organizationName: newSubOrg.name,
            });
        }

        await syncUserData(
            {
                id: newUser.id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                mobile: newUser.mobile,
                countryId: newUser.countryId,
                countryCode: newUser.countryCode ? parseInt(newUser.countryCode) : null,
                address: newUser.address,
                active: newUser.active,
                role: 'sub_enterprise',
                verified: newUser.verified,
                address: newUser.address,
                eoriNumber: newUser.eori_number,
                organization: parentOrg.id,
                subOrganizationId: newSubOrg.id,
                registrationUserType: newUser.registrationUserType,
            },
            {
                ...parentOrg.toJSON(),
                cfOrgId: parentOrg.id,
                subOrganization: {
                    ...newSubOrg.toJSON(),
                    cfOrgId: newSubOrg.id,
                    product: products.length ? products.map(product => {
                        return {
                            cfId: product.id,
                            name: product.name,
                            hsCode: product.hsCode,
                            s3Url: product.s3Url,
                        }
                    }) : [],
                }
            }
        );
        await transaction.commit();

        return {
            organization: newSubOrg,
            user: id ? undefined : {
                id: newUser.id,
                email: newUser.email,
            },
        };
    } catch (error) {
        await transaction.rollback();
        console.error('Error in createOrUpdateSubOrg:', error);
        throw error;
    }
}

async function getMongoSubOrgs(parentOrgId, { page = 1, limit = 10, search }) {

    const offset = (page - 1) * limit;
    let query = { 
        parentId: parentOrgId, 
        isSubOrganization: true 
    };
    if (search) {
        query.$or = [
            { name: { $regex: search, $options: 'i' } },
            { code: { $regex: search, $options: 'i' } }
        ];
    }

    const count = await Organization.countDocuments(query);
    const rows = await Organization.find(query)
    .sort({ createdAt: -1 })
    .skip(offset)
    .limit(parseInt(limit));
    return  {
       count,
       rows
    };
}

async function getSubOrgs(parentOrgId, { page = 1, limit = 10, search }) {
    const offset = (page - 1) * limit;

    const where = {
        parentId: parentOrgId,
        isSubOrganization: true
    };

    if (search) {
        where[Op.or] = [
            { name: { [Op.like]: `%${search}%` } },
            { code: { [Op.like]: `%${search}%` } }
        ];
    }

    const { count, rows } = await db.Organization.findAndCountAll({
        where,
        limit: parseInt(limit),
        offset: offset,
        distinct: true,
        order: [['createdAt', 'DESC']],
        include: [
            {
                model: db.user,
                as: 'users',
                attributes: ['id'],
            },
            {
                model: db.user,
                as: 'primaryUser',
                attributes: ['id', 'email', 'mobile', 'country', 'stateId', 'district', 'village', 'address']
            },
            {
                model: db.Product,
                as: 'products',
                attributes: ['id', 'name']
            }
        ],
    });

    return {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        rows,
    }
}

async function getSubOrgDetails(id) {
    const subOrg = await db.Organization.findOne({
        where: {
            id,
            isSubOrganization: true
        },
    });
    if (!subOrg) {
        throw new Error('Sub-organization not found');
    }

    return subOrg;
}

async function deactivateSubOrg(id) {
    const subOrg = await db.Organization.findOne({
        where: {
            id,
            isSubOrganization: true
        },
    });
    if (!subOrg) {
        throw new Error('Sub-organization not found');
    }

    subOrg.status = subOrg.status === 'active' ? 'deactivated' : 'active';
    await subOrg.save();

    const mongoOrg = await Organization.findOne({cfOrgId: +id});

    if (mongoOrg) {
         mongoOrg.status = mongoOrg.status  ? false : true;
        await mongoOrg.save();
    }

    return subOrg;
}

async function deleteSubOrg(id) {
    const transaction = await db.sequelize.transaction();

    try {
        const subOrg = await db.Organization.findOne({
            where: {
                id,
                isSubOrganization: true,
            },
            transaction,
        });

        if (!subOrg) {
            throw new Error('Sub-organization not found');
        }

        // Fetch all users associated with the sub-organization
        const users = await db.user.findAll({
            where: {
                organization: subOrg.id,
            },
            transaction,
        });

        // Extract user IDs
        const userIds = users.map(user => user.id);

        // Delete AdminUserRoles for these users
        await db.AdminUserRoles.destroy({
            where: {
                user_id: userIds,
            },
            transaction,
        });

        // Delete associated users
        await db.user.destroy({
            where: {
                organization: subOrg.id,
            },
            transaction,
        });

        // Nullify suborg associates users
        await db.user.update(
            {
                subOrganizationId: null,
            },
            {
                where: {
                    subOrganizationId: subOrg.id,
                },
                transaction,
            }
        );

        //TODO: Need to be deleted the user from dds & mongodb as well.

        // delete associated products
        await db.OrganizationProduct.destroy({
            where: {
                organizationId: subOrg.id,
            },
            transaction,
        });

        await subOrg.destroy({
            transaction
        });
        const mongoOrg = await Organization.findOne({cfOrgId: id});
        if (mongoOrg) {
             mongoOrg.status = false;
            await mongoOrg.save();
        }
        await transaction.commit();
    
        return { message: 'Sub-organization deleted successfully' };
    } catch (error) {
        await transaction.rollback();
        console.error('Error deleting sub-organization:', error);
        throw error;
    }
}

async function exportSubOrgsToCSV(parentOrgId) {
    console.log({parentOrgId})
    try {
        // Fetch all sub-organizations without pagination
        const subOrgs = await db.Organization.findAll({
            where: {
                parentId: parentOrgId,
                isSubOrganization: true
            },
            order: [['createdAt', 'DESC']],
            include: [
                {
                    model: db.user,
                    as: 'primaryUser',
                    attributes: ['email', 'mobile', 'country', 'stateId', 'district', 'village', 'address']
                },
                {
                    model: db.Product,
                    as: 'products',
                    attributes: ['name']
                }
            ],
        });

        // Transform the data
        const csvData = subOrgs.map(org => ({
            'Organization Name': org.name,
            'Organization Code': org.code,
            'Status': org.status,
            'Registration Date': org.registrationDate ? new Date(org.registrationDate).toLocaleDateString() : '',
            'Subscription End Date': org.subscriptionEndDate ? new Date(org.subscriptionEndDate).toLocaleDateString() : '',
            'Primary Contact Email': org.primaryUser?.email || '',
            'Primary Contact Mobile': org.primaryUser?.mobile || '',
            'Country': org.primaryUser?.country || '',
            'State': org.primaryUser?.stateId || '',
            'District': org.primaryUser?.district || '',
            'Village': org.primaryUser?.village || '',
            'Address': org.primaryUser?.address || '',
            'Products': org.products?.map(p => p.name).join(', ') || '',
            'Created At': org.createdAt ? new Date(org.createdAt).toLocaleDateString() : '',
            'Updated At': org.updatedAt ? new Date(org.updatedAt).toLocaleDateString() : ''
        }));

        // Create worksheet from data
        const worksheet = XLSX.utils.json_to_sheet(csvData);

        // Convert to CSV
        const csv = XLSX.utils.sheet_to_csv(worksheet);
        
        return csv;

    } catch (error) {
        console.error('Error exporting sub-organizations to CSV:', error);
        throw error;
    }
}

async function getFarmMetricByOrganizationIds(cfOrgIds) {
    const orgIds = Array.isArray(cfOrgIds) ? cfOrgIds : [cfOrgIds];
    if(orgIds.length === 0) return {};
    const queryResult =  await db.sequelize.query(
        `
        SELECT
        u.organization as organization,
        COUNT(DISTINCT(uf.userId)) as farmerCount,
        COUNT(DISTINCT(uf.id)) as farmCount
        FROM user_farms uf
        JOIN users u ON u.id = uf.userId
        WHERE u.organization IN (:organization) AND uf.isDeleted = 0
        GROUP BY u.organization
        `,
        {
            type: db.Sequelize.QueryTypes.SELECT,
            replacements: { organization: orgIds },
        }
    );
    const result = {};
    orgIds.forEach((id) => {
        result[id.toString()] = { farmCount: 0, farmerCount: 0 };
    });
    queryResult.forEach((item) => {
        result[item.organization.toString()].farmerCount = item.farmerCount;
        result[item.organization.toString()].farmCount = item.farmCount;
    });
    return result;
}

module.exports = {
    sendWelcomeEmail,
    assignRoleAndPermissions,
    createOrUpdateSubOrg,
    getSubOrgs,
    getMongoSubOrgs,
    getSubOrgDetails,
    deactivateSubOrg,
    deleteSubOrg,
    exportSubOrgsToCSV,
    getFarmMetricByOrganizationIds,
};