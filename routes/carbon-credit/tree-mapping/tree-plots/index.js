const express = require('express');
const router = express.Router();
const auth = require(rootPath + '/middleware/auth');
const db = require(rootPath + '/models');
const { successRespSync, serverError } = require(rootPath + '/helpers/api');
const { logErrorOccurred } = require(rootPath + '/helpers/general');
const validationErrorHandler = require(rootPath + '/middleware/validation_error_handler');
const { generatePlotNumber } = require('./helpers');
const { validateCreateTreeMappingPlot, validateUpdateTreeMappingPlot } = require(rootPath + '/helpers/validators/tree-mapping');

router.get("/", auth, async (req, res) => {
    const userId = req.user.id;
    try {
        const plots = await db.TreeMappingPlot.findAll({
            order: [['created_at', 'DESC']]
        });
        return res.json(successRespSync({ data: plots }));
    } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res, err);
    }
});

router.get("/:id", auth, async (req, res) => {
    try {
        const plotId = req.params.id;
        const plot = await db.TreeMappingPlot.findByPk(plotId);
        return res.json(successRespSync({ data: plot }));
    } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res, err);
    }
});

router.post("/",
    auth,
    validateCreateTreeMappingPlot(),
    validationErrorHandler,
    async (req, res) => {
        try {
            const plotData = req.body;
            const userId = req.user.id;
            
            // Generate plot number if not provided
            let plotNumber = plotData.plot_no;
            if (!plotNumber) {
                plotNumber = await generatePlotNumber(plotData.country);
            }
            
            // Check if plot number already exists (scoped to request if provided)
            let whereClause = { plot_no: plotNumber };
            if (plotData.request_id) {
                whereClause.tree_mapping_request_id = plotData.request_id;
            }
            
            const existingPlot = await db.TreeMappingPlot.findOne({
                where: whereClause
            });

            if (existingPlot) {
                return res.status(400).json(
                    successRespSync({
                        msg: "Plot number already exists",
                        data: null,
                    })
                );
            }

            // Create the plot (status is now handled in request-plot association)
            const plotCreateData = {
                plot_no: plotNumber,
                latitude: plotData.latitude,
                longitude: plotData.longitude,
                radius: plotData.radius,
                notes: plotData.notes,
                slope: plotData.slope !== undefined ? plotData.slope : null,
                aspect: plotData.aspect !== undefined ? plotData.aspect : null,
                no_of_trees: plotData.no_of_trees !== undefined ? plotData.no_of_trees : null,
                status: plotData.status || 'pending',
                created_by: userId
            };
            
            // Only add tree_mapping_request_id if it's provided
            if (plotData.request_id) {
                plotCreateData.tree_mapping_request_id = plotData.request_id;
            }
            
            const plot = await db.TreeMappingPlot.create(plotCreateData);

            return res.json(
                successRespSync({
                    msg: "Plot Created Successfully",
                    data: plot,
                })
            );
        } catch (err) {
            logErrorOccurred(__filename, err);
            return serverError(res, err);
        }
    }
);

router.put("/:id",
    auth,
    validateUpdateTreeMappingPlot(),
    validationErrorHandler,
    async (req, res) => {
        try {
            const plotId = req.params.id;
            const updateData = req.body;
            
            // Find the plot by ID
            const plot = await db.TreeMappingPlot.findByPk(plotId);
            
            if (!plot) {
                return res.status(404).json(
                    successRespSync({
                        msg: "Plot not found",
                        data: null,
                    })
                );
            }
            
            // Update the plot (status is now handled in request-plot association)
            await plot.update({
                latitude: updateData.latitude !== undefined ? updateData.latitude : plot.latitude,
                longitude: updateData.longitude !== undefined ? updateData.longitude : plot.longitude,
                radius: updateData.radius !== undefined ? updateData.radius : plot.radius,
                notes: updateData.notes !== undefined ? updateData.notes : plot.notes,
                slope: updateData.slope !== undefined ? updateData.slope : plot.slope,
                aspect: updateData.aspect !== undefined ? updateData.aspect : plot.aspect,
                no_of_trees: updateData.no_of_trees !== undefined ? updateData.no_of_trees : plot.no_of_trees
            });
            
            return res.json(
                successRespSync({
                    msg: "Plot Updated Successfully",
                    data: plot,
                })
            );
        } catch (err) {
            logErrorOccurred(__filename, err);
            return serverError(res, err);
        }
    }
);

router.delete("/:id",
    auth,
    async (req, res) => {
        try {
            const plotId = req.params.id;
            
            // Find the plot by ID
            const plot = await db.TreeMappingPlot.findByPk(plotId);
            
            if (!plot) {
                return res.status(404).json(
                    successRespSync({
                        msg: "Plot not found",
                        data: null,
                    })
                );
            }
            
            // Delete the plot
            await plot.destroy();
            
            return res.json(
                successRespSync({
                    msg: "Plot Deleted Successfully",
                    data: null,
                })
            );
        } catch (err) {
            logErrorOccurred(__filename, err);
            return serverError(res, err);
        }
    }
);

module.exports = router;
