const { errorRespSync, successRespSync, serverError } = require('../../../helpers/api');
const { logErrorOccurred } = require('../../../helpers/general');
const { error, success } = require('../../../helpers/language');
const {
  getEsgProgressOfRespondentForProtocol,
  getEsgRecommendationOfRespondentForProtocol,
  getRecommendedUsersOfSubOrganizationByOptionId,
  updateEsgProtocolResponseStatus
} = require('../../../services/esg/esg-analytics');

exports.getEsgProgressOfRespondentForProtocolRouteHandler = async (req, res, next) => {
  try {
    const { esgProtocolId, submittedByType, submittedById } = req.params;
    const progress = await getEsgProgressOfRespondentForProtocol(
      esgProtocolId,
      submittedByType,
      submittedById,
      req.query.includeFarmerAndSupplier === 'true'
    );
    if (!progress) {
      return res.json(
        errorRespSync({
          code: 404,
          msg: error.NOT_FOUND,
        })
      );
    }

    res.locals.data = typeof progress.toObject === 'function' ? progress.toObject() : progress;
    next();
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
};

exports.getEsgRecommendationOfRespondentForProtocolRouteHandler = async (req, res) => {
  try {
    const { esgProtocolId, submittedByType, submittedById } = req.params;
    const recommendations = await getEsgRecommendationOfRespondentForProtocol(
      esgProtocolId,
      submittedByType,
      submittedById,
      req.query.includeFarmerAndSupplier === 'true'
    );
    return res.json(
      successRespSync({
        data: recommendations,
        msg: success.FETCH,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
};

exports.getRecommendedUsersOfSubOrganizationByOptionIdRouteHandler = async (req, res) => {
  try {
    const { esgProtocolId, subOrganizationId, questionOptionId } = req.params;
    const users = await getRecommendedUsersOfSubOrganizationByOptionId(
      esgProtocolId,
      subOrganizationId,
      questionOptionId,
      req.query
    );
    return res.json(
      successRespSync({
        data: users,
        msg: success.FETCH,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
};

exports.updateEsgProtocolResponseStatusHandler = async (req, res) => {
  try {
    const { status, rejectionReason } = req.body;
    const { esgProtocolId, submittedByType, submittedById } = req.params;
    const user = req.user;

    const updatedProtocol = await updateEsgProtocolResponseStatus(
      status,
      esgProtocolId,
      submittedByType,
      submittedById,
      user,
      rejectionReason
    );
    return res.json(
      successRespSync({
        data: updatedProtocol,
        msg: success.FETCH,
      })
    );
  }catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
}