const { logErrorOccurred } = require(rootPath + '/helpers/general');
const { success, error } = require(rootPath + '/helpers/language');
const {createEsgReportTemplate, findEsgReportTemplates, findEsgReportTemplateById, updateEsgReportTemplate, deleteEsgReportTemplateById } = require(rootPath + '/services/esg-report/esg-report-template.js');
const { successResp, serverError, successRespSync, errorResp } = require(rootPath + '/helpers/api');


exports.createEsgReportTemplate = async (req, res) => {
    try {
        const newTemplate = await createEsgReportTemplate(req.body);
        return res.status(201).json(
            await successRespSync({
                msg: success.CREATED,
                data: newTemplate,
                statusCode: 201
            })
        );
    } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res, err);
    }
};

exports.getEsgReportTemplates = async (req, res, next) => {
    try {
        const orgId = req.user?.mongoOrganizationId;

        if (!orgId) {
            throw new Error("User organization not available");
        }

        const templates = await findEsgReportTemplates(orgId);
        if (!templates) {
            throw new Error("No templates found on server")
        }
        return res.status(200).json(
            successRespSync({
                msg: success.FETCH,
                data: templates,
                statusCode: 200
            })
        );
    } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res, err);
    }
};


exports.getEsgReportTemplateById = async (req, res, next) => {
    try {
        const template = await findEsgReportTemplateById(req.params.id);
        if (!template) {
            return res.status(404).json(
                await errorResp({
                    msg: error.NOT_FOUND,
                    code: 404
                })
            );
        }
        res.locals.data = template;
        next();
    } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res, err);
    }
};


exports.updateEsgReportTemplate = async (req, res) => {
    try {
        const updatedTemplate = await updateEsgReportTemplate(req.params.id, req.body);
        if (!updatedTemplate) {
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
                data: updatedTemplate,
                code: 200
            })
        );
    } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res, err);
    }
};

exports.deleteEsgReportTemplate = async (req, res) => {
    try {
        const deletedTemplate = await deleteEsgReportTemplateById(req.params.id);
        if (!deletedTemplate) {
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