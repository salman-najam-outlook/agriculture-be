const { successRespSync, serverError } = require('../../../helpers/api');
const { logErrorOccurred } = require('../../../helpers/general');
const { success } = require('../../../helpers/language');
const { getUserActivityLogs } = require('../../../services/logs/user-activity-log');

exports.listUserActivityLogsRouteHandler = async (req, res) => {
  try {
    const result = await getUserActivityLogs(req.query);
    return res.json(
      successRespSync({
        data: result,
        msg: success.FETCH,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
};
