const { successRespSync } = require(rootPath + '/helpers/api');

module.exports = (model) => {
  return async (req, res, next) => {
    try {
      const { recordId } = req.body;
      if (recordId) {
        const recordExists = await model.findOne({
          where: {
            recordId,
          },
        });
        if (recordExists !== null) {
          return res.json(
            successRespSync({
              data: recordExists,
            }),
          );
        }
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
