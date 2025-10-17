// const esgGetDataQuestionService = require(rootPath + '/services/esgGetDataQuestionService.js');
const { success, error } = require(rootPath + '/helpers/language');
const { logErrorOccurred } = require(rootPath + '/helpers/general');
const { successResp, serverError, successRespSync, errorResp } = require(rootPath + '/helpers/api');
const esgGetDataQuestionService = require('../../../../services/esg/survey/questions/esgGetDataQuestionService.js');

exports.createGetDataQuestion = async (req, res) => {
    try {
        const newGetData = await esgGetDataQuestionService.createGetDataQuestion(req.body);
        return res.status(201).json(
            await successRespSync({
                msg: success.CREATED,
                data: newGetData,
                statusCode: 201
            })
        );
    } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res, err);
    }
};

exports.getAllGetDataQuestions = async (req, res) => {
    try {
        const getDataQuestions = await esgGetDataQuestionService.getAllGetDataQuestions();
        return res.json(
            await successResp({
                msg: success.FETCH,
                data: getDataQuestions
            })
        );
    } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res, err);
    }
};

exports.getGetDataQuestionById = async (req, res) => {
    try {
        const getDataQuestion = await esgGetDataQuestionService.getGetDataQuestionById(req.params.id);
        if (!getDataQuestion) {
            return res.status(404).json(
                await errorResp({ msg: error.NOT_FOUND, code: 404 })
            );
        }
        return res.json(
            await successResp({
                msg: success.FETCH,
                data: getDataQuestion
            })
        );
    } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res, err);
    }
};

exports.updateGetDataQuestion = async (req, res) => {
    try {
        const updatedGetData = await esgGetDataQuestionService.updateGetDataQuestion(req.params.id, req.body);
        if (!updatedGetData) {
            return res.status(404).json(
                await errorResp({ msg: error.NOT_FOUND, code: 404 })
            );
        }
        return res.json(
            await successResp({
                msg: success.UPDATED,
                data: updatedGetData,
                code: 201
            })
        );
    } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res, err);
    }
};

exports.deleteGetDataQuestion = async (req, res) => {
    try {
        const deletedGetData = await esgGetDataQuestionService.deleteGetDataQuestion(req.params.id);
        if (!deletedGetData) {
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