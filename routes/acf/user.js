const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const db = require('../../models');
const { user: User, AdminUserRoles } = db;
const { successRespSync, errorRespSync, serverError } = require(rootPath + "/helpers/api");
const { logErrorOccurred } = require(rootPath + "/helpers/general");
const { createPassword } = require(rootPath + '/helpers/hash');

// Get all users (paginated, search by firstName, lastName, email, country)
router.get('/:orgId', async (req, res) => {
	try {
		const page = parseInt(req.query.page) || 1;
		const limit = 10;
		const offset = (page - 1) * limit;
		const where = {
            organization:req.params.orgId
        };
		if (req.query.firstName) {
			where.firstName = { [Op.like]: `%${req.query.firstName}%` };
		}
		if (req.query.lastName) {
			where.lastName = { [Op.like]: `%${req.query.lastName}%` };
		}
		if (req.query.email) {
			where.email = { [Op.like]: `%${req.query.email}%` };
		}
		if (req.query.country) {
			where.country = { [Op.like]: `%${req.query.country}%` };
		}

		const { rows: resData, count } = await User.findAndCountAll({
            attributes:['id','firstName','lastName','email','country','stateId','city','mobile','organization','subOrganizationId'],
            include:[
               {
                    model: db.Roles,
                    as: "user_role_assoc",
                    attributes:['id','name'],
                    through: { model: db.AdminUserRoles, attributes: [] },
                },
            ],
			where,
			offset,
			limit,
			order: [['id', 'DESC']]
		});
		res.json(
			successRespSync({
				msg: "Fetched successfully",
				data: {
					numRows: count,
					data: resData,
					total: count,
					page,
				},
			})
		);
	} catch (err) {
		logErrorOccurred(__filename, err);
		return serverError(res, err);
	}
});

// Get one user by id
router.get('/:id', async (req, res) => {
	try {
		const usr = await User.findByPk(req.params.id);
		if (!usr) {
			return res.status(404).json(errorRespSync({ msg: 'User not found', code: 404 }));
		}
		res.json(
			successRespSync({
				msg: "Fetched successfully",
				data: { numRows: 1, data: [usr] },
			})
		);
	} catch (err) {
		logErrorOccurred(__filename, err);
		return serverError(res, err);
	}
});

// Create user
router.post('/', async (req, res) => {
	try {
		const { firstName, lastName, email, password, country, stateId, city, mobile, roleIds, organization, subOrganizationId=null } = req.body;
        if (!firstName || !lastName || !email || !password || !country || !stateId || !city || !mobile || !roleIds) {
            return res.status(400).json(errorRespSync({ msg: 'All fields are required', code: 400 }));
        }
        // Check if email already exists
        const existing = await User.findOne({ where: { email } });
        if (existing) {
            return res.status(409).json(errorRespSync({ msg: 'Email already exists', code: 409 }));
        }
        const su = subOrganizationId ? subOrganizationId : null;
        // Hash password before saving
        const hashedPassword = await createPassword(password);
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            country,
            stateId,
            city,
            mobile,
            organization,
            subOrganizationId:su
        });
        const userRoleEntries = roleIds.map((roleId) => ({id:`${newUser.id}_${roleId}`, user_id: newUser.id, role_id:roleId }));
        await AdminUserRoles.bulkCreate(userRoleEntries);
        res.json(
            successRespSync({
                msg: "User created successfully",
                data: { numRows: 1, data: [newUser] },
            })
        );
	} catch (err) {
		logErrorOccurred(__filename, err);
		return serverError(res, err);
	}
});

// Update user
router.put('/:id', async (req, res) => {
	try {
		const { firstName, lastName, email, roleIds} = req.body;
		const usr = await User.findByPk(req.params.id);
		if (!usr) {
			return res.status(404).json(errorRespSync({ msg: 'User not found', code: 404 }));
		}
		// If email is being updated, check for uniqueness
		if (email && email !== usr.email) {
			const existing = await User.findOne({ where: { email } });
			if (existing) {
				return res.status(409).json(errorRespSync({ msg: 'Email already exists', code: 409 }));
			}
		}
		await usr.update({ firstName, lastName });
        const userRoleEntries = roleIds.map((roleId) => ({id:`${usr.id}_${roleId}`, user_id: usr.id, role_id:roleId }));
        await AdminUserRoles.destroy({ where: { user_id: usr.id } });
        await AdminUserRoles.bulkCreate(userRoleEntries);
		res.json(
			successRespSync({
				msg: "User updated successfully",
				data: { numRows: 1, data: [usr] },
			})
		);
	} catch (err) {
		logErrorOccurred(__filename, err);
		return serverError(res, err);
	}
});

// Delete user
router.delete('/:id', async (req, res) => {
	try {
		const usr = await User.findByPk(req.params.id);
		if (!usr) {
			return res.status(404).json(errorRespSync({ msg: 'User not found', code: 404 }));
		}
		await usr.destroy();
		res.json(successRespSync({ msg: 'User deleted successfully', data: { numRows: 1, data: [usr] } }));
	} catch (err) {
		logErrorOccurred(__filename, err);
		return serverError(res, err);
	}
});

module.exports = router;
