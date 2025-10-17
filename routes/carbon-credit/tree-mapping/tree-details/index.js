const express = require('express');
const router = express.Router();
const auth = require(rootPath + '/middleware/auth');
const db = require(rootPath + '/models');
const { successRespSync, serverError, errorRespSync } = require(rootPath + '/helpers/api');
const { success } = require(rootPath + '/helpers/language');
const { logErrorOccurred } = require(rootPath + '/helpers/general');
const { Op } = require("sequelize");

// Get all tree details
router.get("/", auth, async (req, res) => {
    try {
        const {
            search,
            page = 1,
            limit = 10,
            sortBy = 'createdAt',
            sortType = 'DESC',
            plot_id
        } = req.query;

        const query = {
            offset: (page - 1) * limit,
            limit: Number.parseInt(limit),
            order: [[sortBy, sortType]],
            where: {},
            attributes: ['id', 'treeUUID', 'treeName', 'treeType', 'tree_mapping_plot_id', 'diameter_at_breast_height', 'height', 'crown_base_height', 'vigor', 'defect']
        };

        // Add plot_id filter if provided
        if (plot_id) {
            query.where.tree_mapping_plot_id = plot_id;
        }

        // Add search functionality
        if (search && search.length > 2) {
            query.where[Op.or] = [
                { treeName: { [Op.like]: `%${search}%` } },
                { treeType: { [Op.like]: `%${search}%` } },
                { notes: { [Op.like]: `%${search}%` } }
            ];
        }

        const treeDetails = await db.TreeDetail.findAndCountAll(query);

        return res.json(
            successRespSync({
                msg: "Tree Details Fetched Successfully",
                data: treeDetails,
            })
        );
    } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res, err);
    }
});

// Get a single tree detail by ID
router.get("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;

        const whereClause = { id };

        const treeDetail = await db.TreeDetail.findOne({
            where: whereClause,
            attributes: ['id', 'treeUUID', 'treeName', 'treeType', 'tree_mapping_plot_id', 'diameter_at_breast_height', 'height', 'crown_base_height', 'vigor', 'defect']
        });

        if (!treeDetail) {
            return res.status(404).json(
                errorRespSync({
                    msg: "Tree Detail not found"
                })
            );
        }

        return res.json(
            successRespSync({
                msg: "Tree Detail Fetched Successfully",
                data: treeDetail,
            })
        );
    } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res, err);
    }
});


// Create a new tree detail
router.post("/", auth, async (req, res) => {
    let transaction = await db.sequelize.transaction();

    try {
        const {
            recordId,
            treeName,
            treeType,
            tree_mapping_plot_id,
            diameter_at_breast_height,
            height,
            crown_base_height,
            vigor,
            defect,
            farmId,
        } = req.body;


        // Check if plot exists if plot_id is provided
        if (tree_mapping_plot_id) {
            let plotExists = await db.TreeMappingPlot.findByPk(tree_mapping_plot_id);
            if (!plotExists) {
                throw Error("Plot doesn't exist.");
            }
        }

        const dataToSave = {
            recordId,
            treeName,
            treeType,
            tree_mapping_plot_id: tree_mapping_plot_id || null,
            diameter_at_breast_height: diameter_at_breast_height || null,
            height: height || null,
            crown_base_height: crown_base_height || null,
            vigor: vigor || null,
            defect: defect !== undefined ? defect : null,
            userId: req.user.id,
            farmId: farmId
        };
        
        // Validate that farmId is provided
        if (!dataToSave.farmId) {
            throw Error("farmId is required. Please provide a valid farm ID.");
        }

        const treeDetail = await db.TreeDetail.create(dataToSave, { transaction });

        await transaction.commit();

        res.json(
            successRespSync({ msg: success.INSERTED, data: treeDetail })
        );
    } catch (err) {
        await transaction.rollback();

        logErrorOccurred(__filename, err);
        return serverError(res, err);
    }
});

// Update a tree detail
router.put("/:id", auth, async (req, res) => {
    let transaction = await db.sequelize.transaction();

    try {
        const { id } = req.params;

        const {
            treeName,
            treeType,
            tree_mapping_plot_id,
            diameter_at_breast_height,
            height,
            crown_base_height,
            vigor,
            defect,
            farmId,
        } = req.body;

        // Check if tree detail exists
        let existingTreeDetail = await db.TreeDetail.findOne({
            where: {
                id,
            },
        });

        if (!existingTreeDetail) {
            existingTreeDetail = await db.TreeDetail.findOne({
                where: {
                    recordId: id,
                },
            });

            if (!existingTreeDetail) {
                throw new Error("Tree Detail not found");
            }
        }

        // Check if plot exists if plot_id is provided
        if (tree_mapping_plot_id) {
            let plotExists = await db.TreeMappingPlot.findByPk(tree_mapping_plot_id);
            if (!plotExists) {
                throw Error("Plot doesn't exist.");
            }
        }

        const set = {
            treeName,
            treeType,
            tree_mapping_plot_id: tree_mapping_plot_id || null,
            diameter_at_breast_height: diameter_at_breast_height || null,
            height: height || null,
            crown_base_height: crown_base_height || null,
            vigor: vigor || null,
            defect: defect !== undefined ? defect : null,
            farmId
        };

        // Filter out undefined values
        const filteredSet = Object.fromEntries(
            Object.entries(set).filter(([_, v]) => v !== undefined)
        );

        const updatedData = await db.TreeDetail.update(filteredSet, {
            where: {
                id: existingTreeDetail.id,
            },
            transaction,
        });

        await transaction.commit();

        return res.json(
            successRespSync({ msg: success.UPDATED, data: updatedData })
        );
    } catch (err) {
        await transaction.rollback();

        logErrorOccurred(__filename, err);
        return serverError(res, err);
    }
});

// Delete a tree detail
router.delete("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;

        // Check if tree detail exists
        let existingTreeDetail = await db.TreeDetail.findOne({
            where: {
                id,
            },
        });

        if (!existingTreeDetail) {
            existingTreeDetail = await db.TreeDetail.findOne({
                where: {
                    recordId: id,
                },
            });

            if (!existingTreeDetail) {
                throw new Error("Tree Detail not found");
            }
        }

        await db.TreeDetail.destroy({
            where: {
                id: existingTreeDetail.id,
            },
        });

        return res.json(
            successRespSync({ msg: success.DELETED })
        );
    } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res, err);
    }
});

// Create multiple tree details in bulk
router.post("/bulk", auth, async (req, res) => {
    let transaction = await db.sequelize.transaction();

    try {
        const { treeDetails, farmId } = req.body;

        if (!Array.isArray(treeDetails) || treeDetails.length === 0) {
            throw Error("treeDetails must be a non-empty array");
        }

        // Validate that farmId is provided
        if (!farmId) {
            throw Error("farmId is required. Please provide a valid farm ID.");
        }

        // Check if all plot IDs exist
        const plotIds = treeDetails
            .filter(detail => detail.tree_mapping_plot_id)
            .map(detail => detail.tree_mapping_plot_id);

        if (plotIds.length > 0) {
            const plots = await db.TreeMappingPlot.findAll({
                where: {
                    id: {
                        [Op.in]: plotIds
                    }
                },
                attributes: ['id']
            });

            const existingPlotIds = plots.map(plot => plot.id);
            const nonExistingPlotIds = plotIds.filter(id => !existingPlotIds.includes(id));

            if (nonExistingPlotIds.length > 0) {
                throw Error(`The following plot IDs don't exist: ${nonExistingPlotIds.join(', ')}`);
            }
        }

        // Add userId and farmId to each tree detail and ensure measurement fields are properly handled
        const treeDetailsWithUserAndFarm = treeDetails.map(detail => ({
            ...detail,
            tree_mapping_plot_id: detail.tree_mapping_plot_id || null,
            diameter_at_breast_height: detail.diameter_at_breast_height !== undefined ? detail.diameter_at_breast_height : null,
            height: detail.height !== undefined ? detail.height : null,
            crown_base_height: detail.crown_base_height !== undefined ? detail.crown_base_height : null,
            vigor: detail.vigor !== undefined ? detail.vigor : null,
            defect: detail.defect !== undefined ? detail.defect : null,
            userId: req.user.id,
            farmId: farmId
        }));

        const createdTreeDetails = await db.TreeDetail.bulkCreate(treeDetailsWithUserAndFarm, { transaction });

        await transaction.commit();

        res.json(
            successRespSync({
                msg: "Tree Details Created Successfully",
                data: createdTreeDetails,
            })
        );
    } catch (err) {
        await transaction.rollback();

        logErrorOccurred(__filename, err);
        return serverError(res, err);
    }
});

module.exports = router;