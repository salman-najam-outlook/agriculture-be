const { success, error } = require(rootPath + '/helpers/language');
const { logErrorOccurred } = require(rootPath + '/helpers/general');
const serviceTypeService = require("../../../services/esg/survey/service-type");
const { successResp, serverError, successRespSync, errorResp } = require(rootPath + '/helpers/api');

/**
 * @description Create a new Service Type
 */
exports.
createServiceType = async (req, res) => {
  try {
     const newServiceType = await serviceTypeService.createServiceType(req.body);
        return res.status(201).json(
            await successRespSync({
                msg: success.CREATED,
                data: newServiceType,
                statusCode: 201
            })
        );
  } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res, err);
    }
};

/**
 * @description Get all Service Types
 */
exports.getAllServiceTypes = async (req, res) => {
    try {
        const serviceTypes = await serviceTypeService.getAllServiceTypes();
        return res.json(
            await successResp({
                msg: success.FETCH,
                data: serviceTypes
            })
        );
    } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res, err);
    }
};

/**
 * @description Get a single Service Type by ID
 */
exports.getServiceTypeById = async (req, res) => {
    try {
        const serviceType = await serviceTypeService.getServiceTypeById(req.params.id);
        if (!serviceType) {
            return res.status(404).json(
                await errorResp({
                    msg: error.NOT_FOUND,
                    code: 404
                })
            );
        }
        return res.json(
            await successResp({
                msg: success.FETCH,
                data: serviceType
            })
        );
    } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res, err);
    }
};

/**
 * @description Update a Service Type
 */
exports.updateServiceType = async (req, res) => {
    try {
        const updatedServiceType = await serviceTypeService.updateServiceType(req.params.id, req.body);
        if (!updatedServiceType) {
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
                data: updatedServiceType,
                code: 200
            })
        );
    } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res, err);
    }
};

/**
 * @description Soft Delete a Service Type
 */
exports.deleteServiceType = async (req, res) => {
  try {
    const deletedServiceType = await serviceTypeService.deleteServiceType(req.params.id);
    if (!deletedServiceType) {
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
}