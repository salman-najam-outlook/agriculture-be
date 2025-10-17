module.exports = async function (req, res, next) {
  const accessKey = req.header("Access-Key");

  if (!accessKey) {
    return res.status(401).json({
      success: false,
      code: 401,
      message: "No Access key, authorization denied.",
    });
  }

  try {
    if (accessKey === process.env.SECRET_KEY) {
      next();
    } else {
      return res.status(401).json({
        success: false,
        code: 401,
        message: "Access key failure, authorization denied.",
      });
    }
  } catch (error) {
    return res.status(401).json({
      success: false,
      code: 401,
      message: "Access key failure, authorization denied.",
    });
  }
};
