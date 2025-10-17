const { findEsgReports } = require("../../services/esg-report/esg-report");

const { logErrorOccurred } = require(rootPath + '/helpers/general');
const { success, error } = require(rootPath + '/helpers/language');
const { 
    createEsgReport, 
    findEsgReportById, 
    updateEsgReport, 
    deleteEsgReportById 
} = require(rootPath + '/services/esg-report/esg-report.js');
const { successResp, serverError, successRespSync, errorResp } = require(rootPath + '/helpers/api');

exports.createEsgReport = async (req, res) => {
    try {
        // Set default values
        const reportData = {
            ...req.body,
            dateGenerated: new Date(),
            status: 'saved',
            organizationId: req.user?.mongoOrganizationId
        };
        const newReport = await createEsgReport(reportData);
        return res.status(201).json(
            await successRespSync({
                msg: success.CREATED,
                data: newReport,
                statusCode: 201
            })
        );
    } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res, err);
    }
};

exports.getEsgReportById = async (req, res, next) => {
    try {
        const report = await findEsgReportById(req.params.id);
        if (!report) {
            return res.status(404).json(
                await errorResp({
                    msg: error.NOT_FOUND,
                    code: 404
                })
            );
        }
        res.locals.data = report;
        next();
    } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res, err);
    }
};

exports.getEsgReports = async (req, res, next) => {
    try {
        const orgId = req.user?.mongoOrganizationId;

        if (!orgId) {
            throw new Error("User organization not available");
        }

        const reports = await findEsgReports(orgId);
        if (!reports) {
            throw new Error("No reports found on server")
        }
        return res.status(200).json(
            successRespSync({
                msg: success.FETCH,
                data: reports,
                statusCode: 200
            })
        );
    } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res, err);
    }
};

exports.updateEsgReport = async (req, res) => {
    try {
        const updatedReport = await updateEsgReport(req.params.id, req.body);
        if (!updatedReport) {
            return res.status(404).json(
                await errorResp({
                    msg: error.NOT_FOUND,
                    code: 404
                })
            );
        }
        return res.json(
            await successResp({
                msg: success.UPDATED,
                data: updatedReport,
                code: 200
            })
        );
    } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res, err);
    }
};

exports.deleteEsgReport = async (req, res) => {
    try {
        const deletedReport = await deleteEsgReportById(req.params.id);
        if (!deletedReport) {
            return res.status(404).json(
                await errorResp({
                    msg: error.NOT_FOUND,
                    code: 404
                })
            );
        }
        return res.json(
            await successRespSync({
                msg: success.DELETED
            })
        );
    } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res, err);
    }
};