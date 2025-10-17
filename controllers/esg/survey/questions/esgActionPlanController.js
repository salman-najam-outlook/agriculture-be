const { success, error } = require(rootPath + '/helpers/language');
const { logErrorOccurred } = require(rootPath + '/helpers/general');
const { successResp, serverError, successRespSync, errorResp } = require(rootPath + '/helpers/api');
const esgActionPlanService = require('../../../../services/esg/survey/questions/esgActionPlansService.js');

exports.createActionPlan = async (req, res) => {
    try {
        const newActionPlan = await esgActionPlanService.createActionPlan(req.body);
        return res.status(201).json(
            await successRespSync({
                msg: success.CREATED,
                data: newActionPlan,
                statusCode: 201
            })
        );
    } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res, err);
    }
};

exports.getAllActionPlans = async (req, res) => {
    try {
        const actionPlans = await esgActionPlanService.getAllActionPlans();
        return res.json(
            await successResp({
                msg: success.FETCH,
                data: actionPlans
            })
        );
    } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res, err);
    }
};

exports.getActionPlanById = async (req, res) => {
    try {
        const actionPlan = await esgActionPlanService.getActionPlanById(req.params.id);
        if (!actionPlan) {
            return res.status(404).json(
                await errorResp({ msg: error.NOT_FOUND, code: 404 })
            );
        }
        return res.json(
            await successResp({
                msg: success.FETCH,
                data: actionPlan
            })
        );
    } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res, err);
    }
};

exports.updateActionPlan = async (req, res) => {
    try {
        const updatedActionPlan = await esgActionPlanService.updateActionPlan(req.params.id, req.body);
        if (!updatedActionPlan) {
            return res.status(404).json(
                await errorResp({ msg: error.NOT_FOUND, code: 404 })
            );
        }
        return res.json(
            await successResp({
                msg: success.UPDATED,
                data: updatedActionPlan,
                code: 201
            })
        );
    } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res, err);
    }
};

exports.deleteActionPlan = async (req, res) => {
    try {
        const deletedActionPlan = await esgActionPlanService.deleteActionPlan(req.params.id);
        if (!deletedActionPlan) {
            return res.status(404).json(
                await errorResp({ msg: error.NOT_FOUND, code: 404 })
            );
        }
        return res.json(
            await successRespSync({ msg: success.DELETED })
        );
    } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res, err);
    }
};