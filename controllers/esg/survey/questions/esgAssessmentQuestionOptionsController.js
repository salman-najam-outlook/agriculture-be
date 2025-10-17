const { success, error } = require(rootPath + '/helpers/language');
const { logErrorOccurred } = require(rootPath + '/helpers/general');
const { successResp, serverError, successRespSync, errorResp } = require(rootPath + '/helpers/api');
const esgQuestionOptionService = require('../../../../services/esg/survey/questions/esgAssessmentQuestionOptionsService.js');

exports.createQuestionOption = async (req, res) => {
    try {
        const newOption = await esgQuestionOptionService.createQuestionOption(req.body);
        return res.status(201).json(
            await successRespSync({
                msg: success.CREATED,
                data: newOption,
                statusCode: 201
            })
        );
    } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res, err);
    }
};

exports.getAllQuestionOptions = async (req, res) => {
    try {
        const questionOptions = await esgQuestionOptionService.getAllQuestionOptions();
        return res.json(
            await successResp({
                msg: success.FETCH,
                data: questionOptions,
            })
        );
    } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res, err);
    }
};

exports.getQuestionOptionById = async (req, res) => {
    try {
        const questionOption = await esgQuestionOptionService.getQuestionOptionById(req.params.id);
        if (!questionOption) {
            return res.status(404).json(
                await errorResp({ msg: error.NOT_FOUND, code: 404 })
            );
        }
        return res.json(
            await successResp({
                msg: success.FETCH,
                data: questionOption,
            })
        );
    } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res, err);
    }
};

exports.updateQuestionOption = async (req, res) => {
    try {
        const updatedOption = await esgQuestionOptionService.updateQuestionOption(req.params.id, req.body);
        if (!updatedOption) {
            return res.status(404).json(
                await errorResp({ msg: error.NOT_FOUND, code: 404 })
            );
        }
        return res.json(
            await successResp({
                msg: success.UPDATED,
                data: updatedOption,
                code: 201
            })
        );
    } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res, err);
    }
};

exports.deleteQuestionOption = async (req, res) => {
    try {
        const deletedOption = await esgQuestionOptionService.deleteQuestionOption(req.params.id);
        if (!deletedOption) {
            return res.status(404).json(
                await errorResp({ msg: error.NOT_FOUND, code: 404 })
            );
        }
        return res.json(await successRespSync({ msg: success.DELETED }));
    } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res, err);
    }
};