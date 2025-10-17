const express = require('express');
const { Op } = require("sequelize");
const router = express.Router();
const db = require(rootPath + '/models');
const auth = require(rootPath + '/middleware/auth');
const { errorRespSync, successRespSync, serverError } = require(rootPath +
    '/helpers/api');
const { error, success } = require(rootPath + '/helpers/language');
const { logErrorOccurred } = require(rootPath + '/helpers/general');
const { createProductValidation, updateProductValidation } = require(rootPath + "/helpers/validators/products");
const validationErrorHandler = require(rootPath +
    "/middleware/validation_error_handler");


// GET PRODUCTS LIST
router.get('/', auth, async (req, res) => {
    try {
        const { organization } = req.user;

        const { page = 1, limit = 10, search } = req.query;
        const offset = (page - 1) * limit;

        const where = {
            orgId: organization
        };

        if (search) {
            where[Op.or] = [
                { name: { [Op.like]: `%${search}%` } },
                { hsCode: { [Op.like]: `%${search}%` } }
            ];
        }

        const { count: totalRows, rows } = await db.Product.findAndCountAll({
            where,
            include: [
                {
                    model: db.user,
                    as: 'user',
                    attributes: ['id','firstName','lastName']
                }
            ],
            limit: parseInt(limit),
            offset: offset,
            order: [['createdAt', 'DESC']]
        });

        return res.json(
            successRespSync({
                msg: success.FETCH,
                data: { totalRows, numRows: rows?.length || 0, rows },
            })
        );

    } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res);
    }
});

// STORE PRODUCT
router.post('/', auth, async (req, res) => {
    try {
        const { name, hsCode, s3Url } = req.body;

        // Check if hsCode is unique
        if (hsCode) {
            const existingProduct = await db.Product.findOne({ where: { hsCode } });
            if (existingProduct) {
                return res.json(
                    errorRespSync({
                        msg: 'HS Code must be unique',
                        code: 400
                    })
                );
            }
        }

        const product = await db.Product.create({
            name,
            hsCode,
            s3Url,
            orgId: req.user.organization,
            userId: req.user.id
        });

        return res.json(
            successRespSync({
                msg: success.REGISTERED,
                data: { product },
            })
        );
    } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res);
    }
});

// UPDATE PRODUCT
router.put('/:id', auth, async (req, res) => {
    try {
        const product = await db.Product.findByPk(req.params.id);
        if (!product) {
            return res.json(
                errorRespSync({
                    msg: error.DOESNT_EXISTS,
                    code: error.code.NOT_FOUND
                })
            );
        }

        const { name, hsCode, s3Url } = req.body;

        if (hsCode && hsCode !== product.hsCode) {
            const existingProduct = await db.Product.findOne({ where: { hsCode } });
            if (existingProduct) {
                return res.json(
                    errorRespSync({
                        msg: 'HS Code must be unique',
                        code: 400
                    })
                );
            }
        }

        await product.update({
            name: name || product.name,
            hsCode: hsCode || product.hsCode,
            s3Url: s3Url || product.s3Url
        });

        return res.json(
            successRespSync({
                msg: success.UPDATED,
                data: { product }
            })
        );

    } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res);
    }
});

// DELTE PRODUCT
router.delete('/:id', async (req, res) => {
    try {
        const product = await db.Product.findByPk(req.params.id);
        if (!product) {
            return res.json(
                errorRespSync({
                    msg: error.DOESNT_EXISTS,
                    code: error.code.NOT_FOUND
                })
            )
        }
        await product.destroy();

        return res.json(
            successRespSync({
                msg: success.DELETED,
                data: {}
            })
        )

    } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res);
    }
})

module.exports = router;