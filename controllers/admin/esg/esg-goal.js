const { errorRespSync, successRespSync, serverError } = require('../../../helpers/api');
const { logErrorOccurred } = require('../../../helpers/general');
const { error, success } = require('../../../helpers/language');
const {
  createEsgGoal,
  updateGoalStatusByIds,
  reorderEsgGoals,
  updateEsgGoal,
  deleteEsgGoalById,
  findEsgGoalById,
} = require('../../../services/esg/esg-goal');

exports.createEsgGoalRouteHandler = async (req, res) => {
  try {
    const user = req.user;
    const goal = await createEsgGoal(req.body, user);
    if (!goal) {
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
        data: goal,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    serverError(res, err);
  }
};

exports.updateEsgGoalsStatusRouteHandler = async (req, res) => {
  try {
    const user = req.user;
    const deactivatedGoals = await updateGoalStatusByIds(req.body.goalIds, req.body.isActive, user);
    if (!deactivatedGoals) {
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
        data: deactivatedGoals,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    serverError(res, err);
  }
};

exports.reorderEsgGoalsRouteHandler = async (req, res) => {
  try {
    const user = req.user;
    const updatedGoals = await reorderEsgGoals(req.body.goals, user);

    if (!updatedGoals) {
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
        data: updatedGoals,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    serverError(res, err);
  }
};

exports.updateEsgGoalRouteHandler = async (req, res) => {
  try {
    const user = req.user;
    const updatedIssue = await updateEsgGoal(req.params.goalId, req.body, user);

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

exports.deleteEsgGoalRouteHandler = async (req, res) => {
  try {
    const user = req.user;
    const deletedGoal = await deleteEsgGoalById(req.params.goalId, user);
    if (!deletedGoal) {
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

exports.getEsgGoalRouteHandler = async (req, res) => {
  try {
    const user = req.user;
    const esgGoalId = req.params.goalId;
    const goal = await findEsgGoalById(esgGoalId, user);
    if (!goal) {
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
        data: goal,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    serverError(res, err);
  }
};
