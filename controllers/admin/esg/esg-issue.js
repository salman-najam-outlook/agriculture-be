const { errorRespSync, successRespSync, serverError } = require('../../../helpers/api');
const { logErrorOccurred } = require('../../../helpers/general');
const { error, success } = require('../../../helpers/language');
const {
  createEsgIssue,
  reorderEsgIssues,
  updateEsgIssue,
  deleteEsgIssueById,
  findEsgIssueById,
} = require('../../../services/esg/esg-issue');

exports.createEsgIssueRouteHandler = async (req, res) => {
  try {
    const user = req.user;
    const issue = await createEsgIssue(req.body, user);
    if (!issue) {
      return res.json(
        errorRespSync({
          code: 400,
          msg: error.BAD_REQUEST,
        })
      );
    }

    return res.json(
      successRespSync({
        msg: success.SAVED,
        data: issue,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    serverError(res, err);
  }
};

exports.reorderEsgIssuesRouteHandler = async (req, res) => {
  try {
    const user = req.user;
    const updatedIssues = await reorderEsgIssues(req.body.issues, user);

    if (!updatedIssues) {
      return res.json(
        errorRespSync({
          code: 404,
          msg: error.NOT_FOUND,
        })
      );
    }
    return res.json(
      successRespSync({
        msg: success.SAVED,
        data: updatedIssues,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    serverError(res, err);
  }
};

exports.updateEsgIssueRouteHandler = async (req, res) => {
  try {
    const user = req.user;

    const updatedIssue = await updateEsgIssue(req.params.issueId, req.body, user);

    if (!updatedIssue) {
      return res.json(
        errorRespSync({
          code: 404,
          msg: error.NOT_FOUND,
        })
      );
    }

    return res.json(
      successRespSync({
        msg: success.SAVED,
        data: updatedIssue,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    serverError(res, err);
  }
};

exports.deleteEsgIssueRouteHandler = async (req, res) => {
  try {
    const user = req.user;
    const deletedIssue = await deleteEsgIssueById(req.params.issueId, user);
    if (!deletedIssue) {
      return res.json(
        errorRespSync({
          code: 404,
          msg: error.NOT_FOUND,
        })
      );
    }

    return res.json(
      successRespSync({
        msg: success.DELETED,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    serverError(res, err);
  }
};

exports.getEsgIssueRouteHandler = async (req, res) => {
  try {
    const user = req.user;
    const issue = await findEsgIssueById(req.params.issueId, user, true);
    if (!issue) {
      return res.json(
        errorRespSync({
          code: 404,
          msg: error.NOT_FOUND,
        })
      );
    }

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: issue,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    serverError(res, err);
  }
};
