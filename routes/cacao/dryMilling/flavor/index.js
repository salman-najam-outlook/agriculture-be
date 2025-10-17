const express = require('express');
const router = express.Router();
const db = require(rootPath + '/models');
const { successRespSync, serverError } = require(rootPath + '/helpers/api');
const { success } = require(rootPath + '/helpers/language');
const { logErrorOccurred } = require(rootPath + '/helpers/general');
const auth = require(rootPath + '/middleware/auth');
const cacaoDryMillingValidator = require(rootPath +
    '/helpers/validators/cacao/dryMilling');
const validationErrorHandler = require("../../../../middleware/validation_error_handler");
const translation = require(rootPath + "/middleware/translation");

router.get('/', translation, auth, async function (req, res) {

    const { lang } = req?.headers;
    try {
        let dryingFlavor = await db.CacaoDryMillingFlavor.findAll();
        if (lang && lang !== "en") {
          dryingFlavor = req.translateFunction(
            dryingFlavor, 
            globalTranslationCache,
            {
              lvl1: true,
              moduleName: "cacao/drymilling",
            }
          );
        }
        return res.json(
            successRespSync(
                {
                    msg: success.FETCH,
                    data: { dryingFlavor }
                }
            )
        )
    }
    catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(req, res);
    }
});


router.post('/', auth,
    validationErrorHandler,
    cacaoDryMillingValidator.validateCacaoFlavor(),
    validationErrorHandler,
    async function (req, res) {

        try {
            const dryFlavor = await db.CacaoDryMillingFlavor.create({
                name: req.body.name
            });


            return res.json(
                successRespSync({
                    msg: success.REGISTERED,
                    data: { dryFlavor }
                })
            )
        }
        catch (err) {

            logErrorOccurred(__filename, err);
            return serverError(req, err);
        }
    })

module.exports = router;