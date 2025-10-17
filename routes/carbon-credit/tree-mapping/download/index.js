const express = require("express");
const router = express.Router();
const auth = require(rootPath + '/middleware/auth');
const db = require(rootPath + '/models');
const { successRespSync, serverError } = require(rootPath + '/helpers/api');
const { logErrorOccurred } = require(rootPath + '/helpers/general');
const xlsx = require("xlsx");
const fs = require("fs");
const path = require("path");

router.get("/request-details/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const parsedId = parseInt(id);

        if (isNaN(parsedId)) {
            return res.status(400).json({
                success: false,
                msg: "Invalid request ID",
            });
        }

        const request = await db.TreeMappingRequest.findByPk(parsedId, {
            include: [
                {
                    model: db.TreeMappingRequestAssignee,
                    as: 'assignees',
                    attributes: ['assignee_role'],
                    include: [
                        {
                            model: db.user,
                            as: 'assignee',
                            where: {
                                active: true
                            },
                            required: false
                        }
                    ],
                    required: false
                },
                {
                    model: db.user,
                    as: 'farmer',
                    where: {
                        active: true
                    },
                    required: false
                },
                {
                    model: db.user_farm,
                    as: 'farm',
                    where: {
                        isDeleted: false
                    },
                    required: false
                },
                {
                    model: db.TreeMappingPlot,
                    as: 'plots',
                    through: {
                        attributes: ['status'],
                        as: 'plotStatus',
                    },
                    required: false,
                    include: [
                        {
                            model: db.TreeDetail,
                            as: 'trees',
                            required: false
                        },
                        {
                            model: db.TreeMappingPlotAttachment,
                            as: 'attachments',
                            required: false
                        }
                    ]
                }
            ]
        });

        if (!request) {
            return res.status(404).json({
                success: false,
                msg: "Tree Mapping Request not found",
            });
        }

        // Create workbook and worksheet
        const workbook = xlsx.utils.book_new();
        
        // Define headers for comprehensive plot details table
        const headers = [
            // Request Details
            'Request ID',
            'Start Date',
            'Due Date',
            'Status',
            'Plot Radius',
            'Farm Location Address',
            'Description',
            // Assignee Details
            'Assignee Name',
            'Assignee ID',
            'Assignee Role',
            'Assignee Email',
            // Farm Information
            'Farm Name',
            'Farm Status',
            'Farm Registration ID',
            'Dimitra Farm ID',
            'Crop Growing Practices',
            'Farm Address',
            // Plot Details
            'Plot Number',
            'Plot ID',
            'Plot Latitude',
            'Plot Longitude',
            'Plot Radius (m)',
            'Plot Slope',
            'Plot Aspect',
            'Number of Trees',
            'Plot Status',
            'Plot Notes',
            'Plot Created At',
            'Plot Updated At'
        ];

        // Prepare plot data rows with all request information repeated
        const plotDataRows = [];
        
        // Get assignee information
        const assignee = request.assignees && request.assignees.length > 0 ? request.assignees[0] : null;
        const assigneeName = assignee && assignee.assignee ? 
            (assignee.assignee.fullName || assignee.assignee.firstName + ' ' + assignee.assignee.lastName) : 'N/A';
        const assigneeId = assignee && assignee.assignee ? assignee.assignee.id : 'N/A';
        const assigneeRole = assignee ? assignee.assignee_role : 'N/A';
        const assigneeEmail = assignee && assignee.assignee ? assignee.assignee.email : 'N/A';

        // Get farm information
        const farm = request.farm;
        const farmName = farm ? farm.name : 'N/A';
        const farmStatus = farm ? farm.status : 'N/A';
        const farmRegId = farm ? farm.registrationId : 'N/A';
        const farmDimitraId = farm ? farm.dimitraFarmId : 'N/A';
        const farmCropPractices = farm ? farm.cropGrowingPractices : 'N/A';
        const farmAddress = farm ? farm.address : 'N/A';
        
        // Get request information
        const requestStartDate = request.createdAt ? new Date(request.createdAt).toLocaleDateString('en-US') : 'N/A';
        const requestDueDate = request.dueDate ? new Date(request.dueDate).toLocaleDateString('en-US') : 'N/A';
        const requestDescription = request.description || 'N/A';
        
        if (request.plots && request.plots.length > 0) {
            request.plots.forEach((plot, index) => {
                const row = [
                    // Request Details
                    request.id,
                    requestStartDate,
                    requestDueDate,
                    request.status || 'N/A',
                    plot.radius || 'N/A',
                    farmAddress,
                    requestDescription,
                    // Assignee Details
                    assigneeName,
                    assigneeId,
                    assigneeRole,
                    assigneeEmail,
                    // Farm Information
                    farmName,
                    farmStatus,
                    farmRegId,
                    farmDimitraId,
                    farmCropPractices,
                    farmAddress,
                    // Plot Details
                    plot.plot_no || `Plot ${index + 1}`,
                    plot.id,
                    plot.latitude || 'N/A',
                    plot.longitude || 'N/A',
                    plot.radius || 'N/A',
                    plot.slope || 'N/A',
                    plot.aspect || 'N/A',
                    plot.trees ? plot.trees.length : 0,
                    plot.plotStatus ? plot.plotStatus.status : 'N/A',
                    plot.notes || 'N/A',
                    plot.created_at ? new Date(plot.created_at).toLocaleDateString('en-US') : 'N/A',
                    plot.updated_at ? new Date(plot.updated_at).toLocaleDateString('en-US') : 'N/A'
                ];
                plotDataRows.push(row);
            });
        } else {
            // If no plots, create one row with request data only
            const row = [
                // Request Details
                request.id,
                requestStartDate,
                requestDueDate,
                request.status || 'N/A',
                'N/A',
                farmAddress,
                requestDescription,
                // Assignee Details
                assigneeName,
                assigneeId,
                assigneeRole,
                assigneeEmail,
                // Farm Information
                farmName,
                farmStatus,
                farmRegId,
                farmDimitraId,
                farmCropPractices,
                farmAddress,
                // Plot Details
                'N/A',
                'N/A',
                'N/A',
                'N/A',
                'N/A',
                'N/A',
                'N/A',
                0,
                'N/A',
                'N/A',
                'N/A',
                'N/A'
            ];
            plotDataRows.push(row);
        }

        // Combine headers and data
        const excelData = [headers, ...plotDataRows];

        // Create worksheet
        const worksheet = xlsx.utils.aoa_to_sheet(excelData);

        // Set column widths for better readability
        const columnWidths = [
            // Request Details
            { wch: 12 }, // Request ID
            { wch: 12 }, // Start Date
            { wch: 12 }, // Due Date
            { wch: 10 }, // Status
            { wch: 12 }, // Plot Radius
            { wch: 40 }, // Farm Location Address
            { wch: 50 }, // Description
            // Assignee Details
            { wch: 20 }, // Assignee Name
            { wch: 12 }, // Assignee ID
            { wch: 15 }, // Assignee Role
            { wch: 25 }, // Assignee Email
            // Farm Information
            { wch: 20 }, // Farm Name
            { wch: 12 }, // Farm Status
            { wch: 20 }, // Farm Registration ID
            { wch: 15 }, // Dimitra Farm ID
            { wch: 20 }, // Crop Growing Practices
            { wch: 40 }, // Farm Address
            // Plot Details
            { wch: 15 }, // Plot Number
            { wch: 10 }, // Plot ID
            { wch: 15 }, // Plot Latitude
            { wch: 15 }, // Plot Longitude
            { wch: 12 }, // Plot Radius (m)
            { wch: 10 }, // Plot Slope
            { wch: 10 }, // Plot Aspect
            { wch: 15 }, // Number of Trees
            { wch: 12 }, // Plot Status
            { wch: 30 }, // Plot Notes
            { wch: 15 }, // Plot Created At
            { wch: 15 }  // Plot Updated At
        ];
        worksheet['!cols'] = columnWidths;

        // Add worksheet to workbook
        xlsx.utils.book_append_sheet(workbook, worksheet, "Request Details");

        // Generate filename
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];
        const filename = `request-details-${request.id}-${timestamp}.xlsx`;

        // Create temporary file path
        const tempFilePath = path.join(__dirname, '..', '..', '..', '..', 'files', filename);

        // Write file
        xlsx.writeFile(workbook, tempFilePath);

        // Set response headers for file download
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

        // Send file
        res.download(tempFilePath, filename, (err) => {
            if (err) {
                logErrorOccurred('Error downloading file', err);
            }
            // Clean up temporary file
            fs.unlink(tempFilePath, (unlinkErr) => {
                if (unlinkErr) {
                    logErrorOccurred('Error deleting temporary file', unlinkErr);
                }
            });
        });

    } catch (error) {
        logErrorOccurred('Error in request details download', error);
        return serverError(res);
    }
});

router.get("/plot-details/:requestId/:plotId", auth, async (req, res) => {
    try {
        const { requestId, plotId } = req.params;
        const reqId = parseInt(requestId);
        const plId = parseInt(plotId);

        if (isNaN(reqId) || isNaN(plId)) {
            return res.status(400).json({
                success: false,
                msg: "Invalid requestId or plotId",
            });
        }

        const plot = await db.TreeMappingPlot.findOne({
            where: { id: plId },
            include: [
                {
                    model: db.TreeMappingRequest,
                    as: 'requests',
                    where: { 
                        id: reqId,
                        deleted_at: null
                    },
                    required: true
                },
                {
                    model: db.TreeDetail,
                    as: 'trees',
                    required: false
                },
                {
                    model: db.TreeMappingPlotAttachment,
                    as: 'attachments',
                    required: false
                }
            ]
        });

        if (!plot) {
            return res.status(404).json({
                success: false,
                msg: "Plot not found",
            });
        }

        // Create workbook and worksheet
        const workbook = xlsx.utils.book_new();
        
        // Define headers exactly as specified
        const headers = [
            'Date of Collection',
            'Plot No',
            'Radius (m)',
            'Latitude',
            'Longitude',
            'Slope',
            'Aspect',
            'Total number in plot',
            'Tree Number',
            'Tree Species',
            'DBH (cm)',
            'Height (m)',
            'Height to Crown Base (m)',
            'Vigor',
            'Defect (%)',
            'Comments by Technician',
            'Pic of Plot'
        ];

        // Prepare data rows - one row per tree
        const dataRows = [];
        const totalTrees = plot.trees ? plot.trees.length : 0;
        
        // Get plot picture URL (first attachment)
        const plotPictureUrl = plot.attachments && plot.attachments.length > 0 
            ? plot.attachments[0].s3_url || plot.attachments[0].fileUrl || 'N/A'
            : 'N/A';
        
        if (plot.trees && plot.trees.length > 0) {
            plot.trees.forEach((tree, index) => {
                const row = [
                    plot.created_at ? new Date(plot.created_at).toLocaleDateString('en-US') : 'N/A',
                    plot.plot_no || 'N/A',
                    plot.radius || 'N/A',
                    plot.latitude || 'N/A',
                    plot.longitude || 'N/A',
                    plot.slope || 'N/A',
                    plot.aspect || 'N/A',
                    totalTrees,
                    tree.treeName || `TREE${String(index + 1).padStart(3, '0')}`,
                    tree.treeType || 'N/A',
                    tree.diameter_at_breast_height || 'N/A',
                    tree.height || 'N/A',
                    tree.crown_base_height || 'N/A',
                    tree.vigor || 'N/A',
                    tree.defect || 'N/A',
                    plot.notes || 'N/A',
                    plotPictureUrl
                ];
                dataRows.push(row);
            });
        } else {
            // If no trees, create one row with plot data only
            const row = [
                plot.created_at ? new Date(plot.created_at).toLocaleDateString('en-US') : 'N/A',
                plot.plot_no || 'N/A',
                plot.radius || 'N/A',
                plot.latitude || 'N/A',
                plot.longitude || 'N/A',
                plot.slope || 'N/A',
                plot.aspect || 'N/A',
                0,
                'N/A',
                'N/A',
                'N/A',
                'N/A',
                'N/A',
                'N/A',
                'N/A',
                plot.notes || 'N/A',
                plotPictureUrl
            ];
            dataRows.push(row);
        }

        // Combine headers and data
        const excelData = [headers, ...dataRows];

        // Create worksheet
        const worksheet = xlsx.utils.aoa_to_sheet(excelData);

        // Set column widths for better readability
        const columnWidths = [
            { wch: 15 }, // Date of Collection
            { wch: 12 }, // Plot No
            { wch: 12 }, // Radius (m)
            { wch: 12 }, // Latitude
            { wch: 12 }, // Longitude
            { wch: 8 },  // Slope
            { wch: 8 },  // Aspect
            { wch: 18 }, // Total number in plot
            { wch: 12 }, // Tree Number
            { wch: 20 }, // Tree Species
            { wch: 10 }, // DBH (cm)
            { wch: 10 }, // Height (m)
            { wch: 20 }, // Height to Crown Base (m)
            { wch: 8 },  // Vigor
            { wch: 12 }, // Defect (%)
            { wch: 25 }, // Comments by Technician
            { wch: 50 }  // Pic of Plot
        ];
        worksheet['!cols'] = columnWidths;

        // Add worksheet to workbook
        xlsx.utils.book_append_sheet(workbook, worksheet, 'Plot Details');

        // Generate filename
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];
        const filename = `plot-details-${plot.plot_no || plotId}-${timestamp}.xlsx`;

        // Create temporary file path
        const tempFilePath = path.join(__dirname, '..', '..', '..', '..', 'files', filename);

        // Write file
        xlsx.writeFile(workbook, tempFilePath);

        // Set response headers for file download
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

        // Send file
        res.download(tempFilePath, filename, (err) => {
            if (err) {
                logErrorOccurred('Error downloading file', err);
            }
            // Clean up temporary file
            fs.unlink(tempFilePath, (unlinkErr) => {
                if (unlinkErr) {
                    logErrorOccurred('Error deleting temporary file', unlinkErr);
                }
            });
        });

    } catch (error) {
        logErrorOccurred('Error in plot details download', error);
        return serverError(res);
    }
});

router.get("/all-request-details", auth, async (req, res) => {
    try {
        const { dateFilter } = req.query;
        
        // Build where clause
        let whereClause = { deleted_at: null };
        
        // Add date filter if specified
        if (dateFilter) {
            let targetDate;
            
            if (dateFilter === 'yesterday') {
                targetDate = new Date();
                targetDate.setDate(targetDate.getDate() - 1);
            } else {
                // Try to parse as YYYY-MM-DD format
                const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
                if (dateRegex.test(dateFilter)) {
                    targetDate = new Date(dateFilter);
                    // Check if the date is valid
                    if (isNaN(targetDate.getTime())) {
                        return res.status(400).json({ 
                            success: false,
                            message: 'Please enter a valid date in YYYY-MM-DD format (e.g., 2024-01-15) or use "yesterday" to get yesterday\'s data.',
                            error: 'Invalid date provided'
                        });
                    }
                } else {
                    return res.status(400).json({ 
                        success: false,
                        message: 'Please enter a valid date in YYYY-MM-DD format (e.g., 2024-01-15) or use "yesterday" to get yesterday\'s data.',
                        error: 'Invalid date format'
                    });
                }
            }
            
            // Set to start of day
            targetDate.setHours(0, 0, 0, 0);
            
            const endOfDay = new Date(targetDate);
            endOfDay.setHours(23, 59, 59, 999);
            
            // Filter for requests created on target date OR requests with plots/trees added on target date
            whereClause[db.Sequelize.Op.or] = [
                {
                    created_at: {
                        [db.Sequelize.Op.gte]: targetDate,
                        [db.Sequelize.Op.lte]: endOfDay
                    }
                },
                {
                    '$plots.created_at$': {
                        [db.Sequelize.Op.gte]: targetDate,
                        [db.Sequelize.Op.lte]: endOfDay
                    }
                },
                {
                     '$plots.trees.createdAt$': {
                         [db.Sequelize.Op.gte]: targetDate,
                         [db.Sequelize.Op.lte]: endOfDay
                     }
                 }
            ];
        }
        
        const requests = await db.TreeMappingRequest.findAll({
            where: whereClause,
            include: [
                {
                    model: db.TreeMappingRequestAssignee,
                    as: 'assignees',
                    attributes: ['assignee_role'],
                    include: [{ 
                        model: db.user, 
                        as: 'assignee',
                        where: {
                            active: true
                        },
                        required: false
                    }],
                    required: false
                },
                {
                    model: db.user,
                    as: 'farmer',
                    where: {
                        active: true
                    },
                    required: false
                },
                {
                    model: db.user_farm,
                    as: 'farm',
                    where: {
                        isDeleted: false
                    },
                    required: false
                },
                {
                    model: db.TreeMappingPlot,
                    as: 'plots',
                    through: { attributes: ['status'], as: 'plotStatus' },
                    required: false,
                    include: [
                        {
                            model: db.TreeDetail,
                            as: 'trees',
                            required: true
                        }
                    ]
                }
            ]
        });

        if (!requests || requests.length === 0) {
            return res.status(404).json({
                success: false,
                msg: "No tree mapping requests found",
            });
        }

        const workbook = xlsx.utils.book_new();

        for (const request of requests) {
            const sheetData = [];

            // Header
            sheetData.push([
                'Request ID', 'Request Code', 'Start Date', 'Due Date', 'Status', 'Description',
                'Assignee Name', 'Assignee Role', 'Farm Name', 'Farm Reg ID',
                'Plot No', 'Plot ID', 'Latitude', 'Longitude', 'Radius (M)',
                'Tree No', 'Tree Species', 'Slope', 'Aspect', 'DBH (M)', 'Height (M)', 'Crown Base Height (M)', 'Vigor', 'Defect', 'Plot Notes'
            ]);

            const assignee = request.assignees[0]?.assignee || {};
            const assigneeRole = request.assignees[0]?.assignee_role || 'N/A';
            const farm = request.farm || {};

            // Filter plots and trees based on dateFilter if specified
            let plotsToProcess = request.plots || [];
            if (dateFilter) {
                let targetDate;
                
                if (dateFilter === 'yesterday') {
                    targetDate = new Date();
                    targetDate.setDate(targetDate.getDate() - 1);
                } else {
                    targetDate = new Date(dateFilter);
                }
                
                targetDate.setHours(0, 0, 0, 0);
                const endOfDay = new Date(targetDate);
                endOfDay.setHours(23, 59, 59, 999);
                
                plotsToProcess = plotsToProcess.filter(plot => {
                    const plotCreatedOnDate = plot.created_at >= targetDate && plot.created_at <= endOfDay;
                    const hasTreesCreatedOnDate = plot.trees && plot.trees.some(tree => 
                        tree.createdAt >= targetDate && tree.createdAt <= endOfDay
                    );
                    return plotCreatedOnDate || hasTreesCreatedOnDate;
                });
            }
            
            for (const plot of plotsToProcess) {
                let treesToProcess = plot.trees && plot.trees.length > 0 ? plot.trees : [null];
                
                // If dateFilter is specified, only include trees created on target date
                if (dateFilter && plot.trees && plot.trees.length > 0) {
                    let targetDate;
                    
                    if (dateFilter === 'yesterday') {
                        targetDate = new Date();
                        targetDate.setDate(targetDate.getDate() - 1);
                    } else {
                        targetDate = new Date(dateFilter);
                    }
                    
                    targetDate.setHours(0, 0, 0, 0);
                    const endOfDay = new Date(targetDate);
                    endOfDay.setHours(23, 59, 59, 999);
                    
                    const targetDateTrees = plot.trees.filter(tree => 
                        tree.createdAt >= targetDate && tree.createdAt <= endOfDay
                    );
                    
                    // If plot was created on target date but no trees created on target date, show plot with null tree
                    // If trees were created on target date, show only those trees
                    treesToProcess = targetDateTrees.length > 0 ? targetDateTrees : 
                        (plot.created_at >= targetDate && plot.created_at <= endOfDay ? [null] : []);
                }
                
                for (const tree of treesToProcess) {
                    sheetData.push([
                        request.id,
                        request.request_id || 'N/A',
                        request.start_date?.toLocaleDateString('en-US') || 'N/A',
                        request.due_date?.toLocaleDateString('en-US') || 'N/A',
                        request.status || 'N/A',
                        request.description || 'N/A',
                        assignee.fullName || `${assignee.firstName || ''} ${assignee.lastName || ''}`.trim() || 'N/A',
                        assigneeRole,
                        farm.farmName || farm.name || 'N/A',
                        farm.registrationId || 'N/A',
                        plot.plot_no || 'N/A',
                        plot.id || 'N/A',
                        plot.latitude || 'N/A',
                        plot.longitude || 'N/A',
                        plot.radius ? plot.radius / 100 : plot.radius, // we only have 2 units for length
                        tree?.treeName || 'N/A',
                        tree?.treeType || 'N/A',
                        plot.slope || 'N/A',
                        plot.aspect || 'N/A',
                        tree?.diameter_at_breast_height ?   tree?.diameter_at_breast_height / 100 : tree?.diameter_at_breast_height ,
                        tree?.height ?   tree?.height / 100 : tree?.height ,
                        tree?.crown_base_height ?   tree?.crown_base_height / 100 : tree?.crown_base_height ,
                        tree?.vigor,
                        tree?.defect,
                        plot.notes || 'N/A'
                    ]);
                }
            }

            const sheetName = `${request.request_id}`;
            const worksheet = xlsx.utils.aoa_to_sheet(sheetData);
            xlsx.utils.book_append_sheet(workbook, worksheet, sheetName.slice(0, 31));
        }

        // Filename and file path
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];
        const filename = `all-request-details-${timestamp}.xlsx`;
        const tempFilePath = path.join(__dirname, '..', '..', '..', '..', 'files', filename);

        // Write workbook to file
        xlsx.writeFile(workbook, tempFilePath);

        // Set headers for download
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

        // Send file
        res.download(tempFilePath, filename, (err) => {
            if (err) {
                logErrorOccurred('Error sending all-request-details file', err);
            }
            fs.unlink(tempFilePath, (unlinkErr) => {
                if (unlinkErr) {
                    logErrorOccurred('Error deleting temp file after download', unlinkErr);
                }
            });
        });
    } catch (error) {
        logErrorOccurred('Error in /all-request-details', error);
        return serverError(res);
    }
});


module.exports = router;