const { Router } = require('express');
const { errorRespSync } = require(rootPath + '/helpers/api');
const { error } = require(rootPath + '/helpers/language');

const portalRouter = Router();
portalRouter.use((req, res, next) => {
  const secretKey = process.env.PORTAL_AUTHORIZATION_KEY;
  if (secretKey) {
    if (!req.headers['auth-key'] || req.headers['auth-key'] !== secretKey) {
      return res.json(
        errorRespSync({
          code: 401,
          msg: error.UNAUTHORIZED,
        })
      );
    }
  }
  next();
});

portalRouter.use('/nfts', require('./nft'));
portalRouter.use('/farmers', require('./farmers'));
portalRouter.use('/user-scores', require('./score'));
module.exports = portalRouter;
