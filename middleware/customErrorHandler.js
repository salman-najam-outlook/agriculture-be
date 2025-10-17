const { validationResult } = require("express-validator");
const { validationErrorRespSync, errorResp } = require(rootPath + "/helpers/api");
const { error } = require(rootPath + "/helpers/language");

exports.importErrorHandler = async function (req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return validationErrorRespSync(res, {
        msg: { errors: { msg: "file doesn't contain formated data" } },
      });
    }
    next();
  } catch (err) {
    console.error(
      "import error handler middleware catch err *********",
      err.message
    );
    return res.status(error.code.SERVER_ERROR).json(await errorResp());
  }
};
