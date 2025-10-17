const redis = require("../components/redis");
const { successRespSync } = require(rootPath + "/helpers/api");
const { success } = require(rootPath + "/helpers/language");

const IdempotentCheck = async (req, res, next) => {
  const data = await redis.getKey(req.header("idempotent-key"));
  if (data) {
    return res.json(
      successRespSync({
        msg: success.FETCH,
        statusCode: success.code.NOT_MODIFIED,
        data: JSON.parse(data),
      })
    );
  }
  next();
};

module.exports = IdempotentCheck;
