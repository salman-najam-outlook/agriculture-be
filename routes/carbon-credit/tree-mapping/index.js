const express = require('express');
const router = express.Router();
const auth = require(rootPath + '/middleware/auth');
const db = require(rootPath + '/models');
const { successRespSync, serverError } = require(rootPath + '/helpers/api');
const { success } = require(rootPath + '/helpers/language');
const { logErrorOccurred } = require(rootPath + '/helpers/general');
const validationErrorHandler = require(rootPath + '/middleware/validation_error_handler');
const { Op } = require("sequelize");
const { generatePlotNumber } = require('./tree-plots/helpers');

/**
 * Updates the status of a tree mapping request based on its associated plots
 * @param {number} requestId - The ID of the tree mapping request to update
 */
async function updateRequestStatus(requestId) {
    try {
        // Fetch all request-plot associations for this request with their statuses
        const requestPlots = await db.TreeMappingRequestPlots.findAll({
            where: { tree_mapping_request_id: requestId },
            attributes: ['status']
        });

        const plotStatuses = requestPlots.map(rp => rp.status);
        
        // Determine new request status
        let newRequestStatus = 'pending';
        
        // If there are any plots, the request has been started
        if (plotStatuses.length > 0) {
            if (plotStatuses.every(s => s === 'submitted')) {
                // All plots are submitted
                newRequestStatus = 'submitted';
            } else {
                // Started but not all plots submitted (any plot in pending, partially_submitted, etc.)
                newRequestStatus = 'in_progress';
            }
        }

        // Update the request status
        await db.TreeMappingRequest.update(
            { status: newRequestStatus },
            { where: { id: requestId } }
        );
    } catch (error) {
        console.error(`Error updating request status for request ${requestId}:`, error);
        throw error;
    }
}

const requestInclude = {
    include: [
        {
            model: db.TreeMappingRequestAssignee,
            as: 'assignees',
            include: [{ model: db.user, as: 'assignee' }]
        },
        { model: db.user, as: 'farmer' },
        { model: db.user_farm, as: 'farm' },
        {
            model: db.TreeMappingPlot,
            as: 'plots',
            through: { 
                attributes: ['status'],  // Include status from the association table
                as: 'plotStatus'  // Alias for the through table data
            }
        }
    ]
};

router.get("/requests",
    async (req, res) => {
        try {
            
            let {
                search,
                page = 1,
                limit = 10 ,
                sortBy,
                sortType
            } = req.query;

            const query = {
                offset: (page - 1) * limit,
                limit: Number.parseInt(limit),
                order: [['created_at', 'DESC']],
                where: { 'deleted_at': null },
                attributes: {
                    include: [
                        [
                            db.Sequelize.literal(`(
                            SELECT COUNT(*)
                            FROM tree_mapping_request_plots tmpr
                            JOIN tree_mapping_plots tmp ON tmpr.tree_mapping_plot_id = tmp.id
                            WHERE tmpr.tree_mapping_request_id = TreeMappingRequest.id
                            AND tmp.deleted_at IS NULL
                            )`),
                            'plot_count'
                        ]
                    ]
                },
                include: [
                    {
                        model: db.TreeMappingRequestAssignee,
                        as: 'assignees',
                        attributes: ['assignee_role'],
                        include: [
                            {
                                model: db.user,
                                attributes: [
                                    'id',
                                    'fullName',
                                ],
                                as: 'assignee'
                            }
                        ]
                    },
                    {
                        model: db.user,
                        as: 'farmer',
                        attributes: ['id', 'fullName']
                    },
                    {
                        model: db.user_farm,
                        as: 'farm',
                        attributes: ['id', 'address', 'farmName', 'lat', 'log']
                    }
                ]
            };

            if (search && search.length > 2) {
                query.where["request_id"] = {
                    [Op.like]: `%${search}%`
                };
            }

            if (sortBy && sortBy.length > 0) {
                query.order = [[sortBy, sortType]];
            }

            const requests = await db.TreeMappingRequest.findAndCountAll(query);

            return res.json(
                successRespSync({
                    msg: "Tree Mapping Requests Fetched Successfully",
                    data: requests,
                })
            );
        } catch (err) {
            logErrorOccurred(__filename, err);
            return serverError(res, err);
        }
    }
);

router.get("/requests/:id",
    async (req, res) => {
        try {
            const { id } = req.params;

            const query = {
                include: [
                    {
                        model: db.TreeMappingRequestAssignee,
                        as: 'assignees',
                        attributes: ['assignee_role'],
                        include: [
                            {
                                model: db.user,
                                as: 'assignee'
                            }
                        ]
                    },
                    {
                        model: db.user,
                        as: 'farmer'
                    },
                    {
                        model: db.user_farm,
                        as: 'farm'
                    },
                    {
                        model: db.TreeMappingPlot,
                        as: 'plots',
                        through: { 
                            attributes: ['status'],
                            as: 'plotStatus'
                        },
                        include: [
                            {
                                model: db.TreeDetail,
                                as: 'trees'
                            },
                            {
                                model: db.TreeMappingPlotAttachment,
                                as: 'attachments'
                            }
                        ]
                    }
                ]
            };

            const request = await db.TreeMappingRequest.findByPk(id, query);

            return res.json(
                successRespSync({
                    msg: "Tree Mapping Request Fetched Successfully",
                    data: request,
                })
            );
        } catch (err) {
            logErrorOccurred(__filename, err);
            return serverError(res, err);
        }
    }
);

router.post("/requests",
    auth,
    validationErrorHandler,
    async (req, res) => {
        try {
            const {
                recordId,
                farmer_id,
                farm_id,
                start_date,
                due_date,
                notes,
                country,
                farm_location_address,
                assignees = [],
                plots = []
            } = req.body;

            // Validate that country is provided
            if (!country || country.trim() === '') {
                return res.status(400).json(
                    successRespSync({
                        msg: "Country is required for creating tree mapping requests",
                        data: null,
                    })
                );
            }

            // Generate a unique request_id based on count of existing requests
            const requestCount = await db.TreeMappingRequest.count({ paranoid: false });
            const request_id = `RE-${requestCount + 1}`;

            const request = await db.TreeMappingRequest.create({
                recordId,
                request_id,
                farmer_id,
                farm_id,
                start_date,
                due_date,
                notes,
                status: 'pending',
                country: country || null,
                farm_location_address: farm_location_address || null
            });

            if (assignees.length > 0) {
                const assigneeRecords = assignees.map(assignee => ({
                    tree_mapping_request_id: request.id,
                    assignee_id: assignee.assignee_id,
                    assignee_role: assignee.assignee_role
                }));

                await db.TreeMappingRequestAssignee.bulkCreate(assigneeRecords);
            }

            // Link plots if provided
            if (plots.length > 0) {
                // Validate that all plot IDs exist in the database
                const existingPlots = await db.TreeMappingPlot.findAll({
                    where: {
                        id: plots
                    },
                    attributes: ['id']
                });
                
                // Get the IDs of plots that exist
                const validPlotIds = existingPlots.map(plot => plot.id);
                
                // Check if any plot IDs don't exist
                const invalidPlotIds = plots.filter(plotId => !validPlotIds.includes(plotId));
                
                if (invalidPlotIds.length > 0) {
                    return res.status(400).json(
                        successRespSync({
                            msg: `The following plot IDs do not exist: ${invalidPlotIds.join(', ')}`,
                            data: null,
                        })
                    );
                }
                
                // Create associations between request and valid plots
                const plotAssociations = validPlotIds.map(plotId => ({
                    tree_mapping_request_id: request.id,
                    tree_mapping_plot_id: plotId
                }));
                
                await db.TreeMappingRequestPlots.bulkCreate(plotAssociations);
                
                // Update request status based on associated plots
                await updateRequestStatus(request.id);
            }

            // Fetch the created request with all associations
            const createdRequest = await db.TreeMappingRequest.findByPk(request.id, requestInclude);

            // Ensure we have a valid response object
            if (!createdRequest) {
                return res.status(404).json(
                    successRespSync({
                        msg: "Failed to retrieve created request",
                        data: null,
                    })
                );
            }

            // Return success response
            return res.status(200).json(
                successRespSync({
                    msg: "Tree Mapping Request Created Successfully",
                    data: createdRequest,
                })
            );
        } catch (err) {
            logErrorOccurred(__filename, err);
            return serverError(res, err);
        }
    }
);

router.put("/requests/:id",
    auth,
    validationErrorHandler,
    async (req, res) => {
        try {
            const { id } = req.params;
            const {
                farmer_id,
                farm_id,
                start_date,
                due_date,
                notes,
                status,
                country,
                farm_location_address,
                assignees = [],
                plots = []
            } = req.body;

            let request = await db.TreeMappingRequest.findByPk(id);
            if (!request) {
                request = await db.TreeMappingRequest.findOne({
                    where: {
                        recordId: id
                    }
                });
                
                if (!request) {
                    return serverError(
                        res,
                        `Failed to find request with id/recordId: ${id}`
                    )
                }
            }

            await request.update({
                farmer_id,
                farm_id,
                start_date,
                due_date,
                notes,
                status: status || request.status,
                country: country !== undefined ? country : request.country,
                farm_location_address: farm_location_address !== undefined ? farm_location_address : request.farm_location_address
            });

            if (assignees.length > 0) {
                await db.TreeMappingRequestAssignee.destroy({
                    where: { tree_mapping_request_id: request.id }
                });

                const assigneeRecords = assignees.map(assignee => ({
                    tree_mapping_request_id: id,
                    assignee_id: assignee.assignee_id,
                    assignee_role: assignee.assignee_role
                }));

                await db.TreeMappingRequestAssignee.bulkCreate(assigneeRecords);
            }

            // Handle plots if provided
            if (plots.length > 0) {
                await db.TreeMappingRequestPlots.destroy({
                    where: { tree_mapping_request_id: request.id }
                });
                
                const existingPlots = await db.TreeMappingPlot.findAll({
                    where: {
                        id: plots
                    },
                    attributes: ['id']
                });
                
                const validPlotIds = existingPlots.map(plot => plot.id);
                
                const invalidPlotIds = plots.filter(plotId => !validPlotIds.includes(plotId));
                
                if (invalidPlotIds.length > 0) {
                    return res.status(400).json(
                        successRespSync({
                            msg: `The following plot IDs do not exist: ${invalidPlotIds.join(', ')}`,
                            data: null,
                        })
                    );
                }
                
                const plotAssociations = validPlotIds.map(plotId => ({
                    tree_mapping_request_id: id,
                    tree_mapping_plot_id: plotId
                }));
                
                await db.TreeMappingRequestPlots.bulkCreate(plotAssociations);
                
                // Update request status based on associated plots
                await updateRequestStatus(request.id);
            }

            // Fetch the updated request with all associations
            const updatedRequest = await db.TreeMappingRequest.findByPk(request.id, requestInclude);

            return res.json(
                successRespSync({
                    msg: "Tree Mapping Request Updated Successfully",
                    data: updatedRequest,
                })
            );
        } catch (err) {
            logErrorOccurred(__filename, err);
            return serverError(res, err);
        }
    }
);

// Update an existing plot with tree details for a specific request
router.put("/requests/:requestId/plots/:id",
    auth,
    validationErrorHandler,
    async (req, res) => {
        try {
            const { id, requestId: request_id } = req.params;
            const plotData = req.body;
            const plotInclude = [{
                model: db.TreeMappingRequest,
                as: 'request',
                include: [{
                    model: db.TreeMappingRequestAssignee,
                    as: 'assignees'
                }]
            }];

            // Check if the user is authorized to update this plot
            const requestPlot = await db.TreeMappingRequestPlots.findOne({
                where: { tree_mapping_plot_id: id },
                include: plotInclude
            });

            if (!requestPlot || !requestPlot.request) {
                return serverError(
                    res,
                    "Plot is not associated with any request"
                );
            }

            // Check if the current user is assigned to this request
            // const isUserAssigned = requestPlot.request.assignees.some(
            //     assignee => assignee.assignee_id === currentUserId
            // );

            // Also check if the user is the farmer associated with the request
            // const isFarmer = requestPlot.request.farmer_id === currentUserId;
            
            // Check if the user has admin role_type
            // const isAdmin = req.user.userRoles && req.user.userRoles.some(
            //     role => role['role_id'].includes('admin')
            // );

            // if (!isUserAssigned && !isFarmer && !isAdmin) {
            //     return res.status(403).json(
            //         successRespSync({
            //             msg: "You don't have permission to edit or update this data",
            //             data: null,
            //         })
            //     );
            // }

            // Check if the plot exists
            const plot = await db.TreeMappingPlot.findByPk(id);
            if (!plot) {
                return res.status(404).json(
                    successRespSync({
                        msg: "Plot not found",
                        data: null,
                    })
                );
            }

            // Update the plot (note: status is now handled in request-plot association)
            await plot.update({
                radius: plotData.radius,
                notes: plotData.notes,
                no_of_trees: plotData.no_of_trees,
                slope: plotData.slope,
                aspect: plotData.aspect
            });

            // Handle attachments if provided
            if (plotData.attachments && plotData.attachments.length > 0) {
                const bucketURL = process.env.PUBLIC_BUCKET_URL || "https://dimitra-public-images.s3.amazonaws.com/";

                // Remove existing attachments
                await db.TreeMappingPlotAttachment.destroy({
                    where: { plot_id: id }
                });

                // Create new attachments
                const attachmentRecords = plotData.attachments.map(attachment => ({
                    plot_id: id,
                    file_name: attachment.file_name,
                    file_type: attachment.file_type,
                    s3_url: `${bucketURL}${attachment.file_name}`
                }));

                await db.TreeMappingPlotAttachment.bulkCreate(attachmentRecords);
            }

            // Handle tree details if provided
            if (plotData.trees && Array.isArray(plotData.trees)) {
                const currentTrees = await db.TreeDetail.findAll({
                    where: { tree_mapping_plot_id: id },
                    attributes: ['id']
                });
                const currentTreeIds = currentTrees.map(tree => tree.id);

                const keepTreeIds = [];

                const requestPlot = await db.TreeMappingRequestPlots.findOne({
                    where: { tree_mapping_plot_id: id },
                    include: [{
                        model: db.TreeMappingRequest,
                        as: 'request',
                        attributes: ['farm_id']
                    }]
                });

                const farmId = requestPlot?.request?.farm_id;
                if (!farmId) throw new Error("Could not determine farm ID for the plot");
                const plotNumber = plot.plot_no.toString();

                for (let i = 0; i < plotData.trees.length; i++) {
                    const treeData = plotData.trees[i];
                    if (!treeData.treeName) {
                        treeData.treeName = `${plotNumber}${(i + 1).toString().padStart(3, '0')}`;
                    }
                    if (treeData.id) {
                        // Update existing tree
                        const treeDetail = await db.TreeDetail.findByPk(treeData.id);
                        if (treeDetail) {
                            const treeUpdateData = {
                                treeName: treeData.treeName,
                                treeType: treeData.treeType,
                                diameter_at_breast_height: treeData.diameter_at_breast_height !== undefined ? treeData.diameter_at_breast_height : null,
                                height: treeData.height !== undefined ? treeData.height : null,
                                crown_base_height: treeData.crown_base_height !== undefined ? treeData.crown_base_height : null,
                                vigor: treeData.vigor !== undefined ? treeData.vigor : null,
                                defect: treeData.defect !== undefined ? treeData.defect : null,
                                updatedBy: req.user.id,
                                tree_mapping_plot_id: id
                            };
                            const filteredTreeUpdateData = Object.fromEntries(
                                Object.entries(treeUpdateData).filter(([_, v]) => v !== undefined)
                            );
                            await treeDetail.update(filteredTreeUpdateData);
                            keepTreeIds.push(treeData.id);
                        } else {
                            throw new Error(`Tree detail with ID ${treeData.id} not found`);
                        }
                    } else {
                        // Create new tree
                        const treeDetail = await db.TreeDetail.create({
                            treeName: treeData.treeName,
                            treeType: treeData.treeType,
                            tree_mapping_plot_id: id,
                            diameter_at_breast_height: treeData.diameter_at_breast_height !== undefined ? treeData.diameter_at_breast_height : null,
                            height: treeData.height !== undefined ? treeData.height : null,
                            crown_base_height: treeData.crown_base_height !== undefined ? treeData.crown_base_height : null,
                            vigor: treeData.vigor !== undefined ? treeData.vigor : null,
                            defect: treeData.defect !== undefined ? treeData.defect : null,
                            userId: req.user.id,
                            farmId: farmId
                        });
                        keepTreeIds.push(treeDetail.id);
                        // Create association in the join table
                        await db.sequelize.models.tree_mapping_plots_tree_details.create({
                            tree_detail_id: treeDetail.id,
                            tree_mapping_plot_id: id
                        });
                    }
                }

                // 4. Delete all trees for this plot except those in keepTreeIds
                const treesToDelete = currentTreeIds.filter(id => !keepTreeIds.includes(id));
                if (treesToDelete.length > 0) {
                    await db.TreeDetail.destroy({ where: { id: treesToDelete } });
                }

                // Update plot status in the request-plot association based on tree count
                const expectedTreeCount = plotData.no_of_trees;
                const actualTreeCount = keepTreeIds.length;
                let plotStatus;
                if (actualTreeCount === 0) {
                    plotStatus = 'pending';
                } else if (expectedTreeCount > 0 && actualTreeCount < expectedTreeCount) {
                    plotStatus = 'partially_submitted';
                } else {
                    plotStatus = 'submitted';
                }

                // Update status in the specific request-plot association
                await db.TreeMappingRequestPlots.update(
                    { status: plotStatus },
                    { where: { 
                        tree_mapping_plot_id: id,
                        tree_mapping_request_id: request_id 
                    }}
                );
            }

            // Fetch the updated plot with attachments, trees, and status from request-plot association
            const updatedPlot = await db.TreeMappingPlot.findByPk(id, {
                include: [
                    { model: db.TreeMappingPlotAttachment, as: 'attachments' },
                    { model: db.TreeDetail, as: 'trees' },
                    {
                        model: db.TreeMappingRequest,
                        as: 'requests',
                        through: { 
                            attributes: ['status'],
                            as: 'plotStatus'
                        },
                        attributes: ['id', 'request_id']  // Only include minimal request data
                    }
                ]
            });


            // Update request status based on plot changes for the specific request
            await updateRequestStatus(request_id);

            return res.json(
                successRespSync({
                    msg: "Plot Updated Successfully",
                    data: updatedPlot,
                })
            );
        } catch (err) {
            logErrorOccurred(__filename, err);
            return serverError(res, err);
        }
    }
);

// Create a new plot with tree details, attachments(if any)
router.post("/requests/:requestId/plots",
    auth,
    validationErrorHandler,
    async (req, res) => {
        try {
            const { requestId: request_id } = req.params;
            const plotData = req.body;
            const currentUserId = req.user.id;

            // Check if the request exists
            let request = await db.TreeMappingRequest.findOne({
                where: { id: request_id },
                include: [
                    {
                        model: db.TreeMappingRequestAssignee,
                        as: 'assignees'
                    },
                    {
                        model: db.user_farm,
                        as: 'farm'
                    }
                ]
            });

            if (!request) {
                request = await db.TreeMappingRequest.findOne({
                    where: { recordId: request_id },
                    include: [
                        {
                            model: db.TreeMappingRequestAssignee,
                            as: 'assignees'
                        },
                        {
                            model: db.user_farm,
                            as: 'farm'
                        }
                    ]
                });

                if (!request) {
                    return serverError(
                        res,
                        `Request not found with id/recordId: ${request_id}`
                    );
                }
            }

            // Check if the current user is assigned to this request
            // const isUserAssigned = request.assignees.some(
            //     assignee => assignee.assignee_id === currentUserId
            // );

            // Also check if the user is the farmer associated with the request
            // const isFarmer = request.farmer_id === currentUserId;
            
            // Check if the user has admin role_type
            // const isAdmin = req.user.userRoles && req.user.userRoles.some(
            //     role => role['role_id'].includes('admin')
            // );

            // if (!isUserAssigned && !isFarmer && !isAdmin) {
            //     return res.status(403).json(
            //         successRespSync({
            //             msg: "You don't have permission to create plots for this request",
            //             data: null,
            //         })
            //     );
            // }

            // Generate a unique plot number using country from the request or farm
            const plotCountry = request.country || request.farm?.country || 'Unknown';
            const plotNo = await generatePlotNumber(plotCountry);

            // Create the plot (status is now handled in request-plot association)
            const plot = await db.TreeMappingPlot.create({
                recordId: plotData.recordId,
                plot_no: plotNo,
                latitude: plotData.latitude,
                longitude: plotData.longitude,
                radius: plotData.radius,
                notes: plotData.notes,
                slope: plotData.slope !== undefined ? plotData.slope : null,
                aspect: plotData.aspect !== undefined ? plotData.aspect : null,
                no_of_trees: plotData.no_of_trees !== undefined ? plotData.no_of_trees : null,
                created_by: currentUserId
            });

            // Associate the plot with the request (status defaults to 'pending')
            await db.TreeMappingRequestPlots.create({
                tree_mapping_plot_id: plot.id,
                tree_mapping_request_id: request_id,
                status: 'pending'
            });

            // Handle attachments if provided
            if (plotData.attachments && plotData.attachments.length > 0) {
                const bucketURL = process.env.PUBLIC_BUCKET_URL || "https://dimitra-public-images.s3.amazonaws.com/";

                const attachmentRecords = plotData.attachments.map(attachment => ({
                    plot_id: plot.id,
                    file_name: attachment.file_name,
                    file_type: attachment.file_type,
                    s3_url: `${bucketURL}${attachment.file_name}`
                }));

                await db.TreeMappingPlotAttachment.bulkCreate(attachmentRecords);
            }

            // Handle tree details if provided
            if (plotData.trees && Array.isArray(plotData.trees) && plotData.trees.length > 0) {
                const farmId = request.farm_id;
                if (!farmId) {
                    throw new Error("Could not determine farm ID for the plot");
                }

                const plotNumber = plot.plot_no.toString();
                
                for (let i = 0; i < plotData.trees.length; i++) {
                    const treeData = plotData.trees[i];

                    // Generate tree name if not provided
                    if (!treeData.treeName) {
                        treeData.treeName = `${plotNumber}${(i + 1).toString().padStart(3, '0')}`;
                    }

                    // Create new tree detail
                    const treeDetail = await db.TreeDetail.create({
                        recordId: treeData.recordId,
                        treeName: treeData.treeName,
                        treeType: treeData.treeType,
                        tree_mapping_plot_id: plot.id,
                        diameter_at_breast_height: treeData.diameter_at_breast_height || null,
                        height: treeData.height || null,
                        crown_base_height: treeData.crown_base_height || null,
                        vigor: treeData.vigor || null,
                        defect: treeData.defect !== undefined ? treeData.defect : null,
                        userId: req.user.id,
                        farmId: farmId
                    });

                    // Create association in the join table
                    await db.sequelize.models.tree_mapping_plots_tree_details.create({
                        tree_detail_id: treeDetail.id,
                        tree_mapping_plot_id: plot.id
                    });
                }

                // Get the expected tree count from the plot data
                const expectedTreeCount = plotData.no_of_trees;
                const actualTreeCount = plotData.trees.length;
                
                // Determine the plot status based on tree count
                let plotStatus;
                if (actualTreeCount === 0) {
                    plotStatus = 'pending';
                } else if (expectedTreeCount > 0 && actualTreeCount < expectedTreeCount) {
                    plotStatus = 'partially_submitted';
                } else {
                    plotStatus = 'submitted';
                }
                
                // Update status in the specific request-plot association
                await db.TreeMappingRequestPlots.update(
                    { status: plotStatus },
                    { where: { 
                        tree_mapping_plot_id: plot.id,
                        tree_mapping_request_id: request_id 
                    }}
                );
            }

            // Fetch the created plot with attachments, trees, and status from request-plot association
            const createdPlot = await db.TreeMappingPlot.findByPk(plot.id, {
                include: [
                    { model: db.TreeMappingPlotAttachment, as: 'attachments' },
                    { model: db.TreeDetail, as: 'trees' },
                    {
                        model: db.TreeMappingRequest,
                        as: 'requests',
                        through: { 
                            attributes: ['status'],
                            as: 'plotStatus'
                        },
                        attributes: ['id', 'request_id']  // Only include minimal request data
                    }
                ]
            });


            // Update request status based on new plot for the specific request
            await updateRequestStatus(request_id);

            return res.status(201).json(
                successRespSync({
                    msg: "Plot Created Successfully",
                    data: createdPlot,
                })
            );
        } catch (err) {
            logErrorOccurred(__filename, err);
            return serverError(res, err);
        }
    }
);

router.delete("/requests/:id",
    auth,
    validationErrorHandler,
    async (req, res) => {
        try {
            const { id } = req.params;
            const request = await db.TreeMappingRequest.findByPk(id);

            if (!request) {
                return serverError(
                    res,
                    `Request not found with id: ${id}`
                );
            }

            await request.destroy();

            return res.json(
                successRespSync({
                    msg: "Request Deleted Successfully",
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