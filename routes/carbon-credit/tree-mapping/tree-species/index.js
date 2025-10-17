const express = require('express');
const router = express.Router();
const auth = require(rootPath + '/middleware/auth');
const db = require(rootPath + '/models');
const { successRespSync, serverError, errorRespSync } = require(rootPath + '/helpers/api');
const { success } = require(rootPath + '/helpers/language');
const { logErrorOccurred } = require(rootPath + '/helpers/general');
const { Op } = require("sequelize");

// Get all tree species with pagination and search
router.get("/", auth, async (req, res) => {
    try {
        const {
            search,
            page = 1,
            limit = 10,
            sortBy = 'name',
            sortType = 'ASC',
            tree_type_id
        } = req.query;

        const query = {
            offset: (page - 1) * limit,
            limit: Number.parseInt(limit),
            order: [[sortBy, sortType]],
            where: {},
            attributes: ['id', 'name','genus', 'tree_type_id', 'createdAt', 'updatedAt', 'symbol', 'species']
        };

        // Add tree_type_id filter if provided
        if (tree_type_id) {
            query.where.tree_type_id = tree_type_id;
        }

        // Add search functionality
        if (search && search.length > 2) {
            query.where[Op.or] = [
                { name: { [Op.like]: `%${search}%` } },
                { symbol: { [Op.like]: `%${search}%` } },
                { species: { [Op.like]: `%${search}%` } }
            ];
        }

        const treeSpecies = await db.TreeSpecies.findAndCountAll(query);

        return res.json(
            successRespSync({
                msg: "Tree Species Fetched Successfully",
                data: treeSpecies,
            })
        );
    } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res, err);
    }
});

// Get a single tree species by ID
router.get("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;

        const treeSpecies = await db.TreeSpecies.findByPk(id, {
            attributes: ['id', 'name', 'tree_type_id', 'createdAt', 'updatedAt', 'symbol', 'species']
        });

        if (!treeSpecies) {
            return res.status(404).json(
                errorRespSync({
                    msg: "Tree Species not found"
                })
            );
        }

        return res.json(
            successRespSync({
                msg: "Tree Species Fetched Successfully",
                data: treeSpecies,
            })
        );
    } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res, err);
    }
});

module.exports = router;