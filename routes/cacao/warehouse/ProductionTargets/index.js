const express = require('express');
const moment = require('moment');
const router = express.Router();
const auth = require(rootPath + '/middleware/auth');
const db = require(rootPath + '/models');
const { Op, Sequelize } = require('sequelize');
const { errorRespSync } = require(rootPath + '/helpers/api');
const { successRespSync, serverError } = require(rootPath + '/helpers/api');
const { success, error } = require(rootPath + '/helpers/language');
const { logErrorOccurred } = require(rootPath + '/helpers/general');
const { productionTargetValidations, productionTargetEditValidations } = require(rootPath + '/helpers/validation');
const validationErrorHandler = require(rootPath + '/middleware/validation_error_handler');
const { isEmpty } = require('lodash');

router.post('/', auth, productionTargetValidations(), validationErrorHandler, async (req, res) => {
   try {  
        const userId = req.user.id;
        const currentYear = moment().format("YYYY");
        let { target, year, recordId } = req.body;
       // Check If year is from past
        if(year < currentYear){
            return res.status(error.code.SERVER_ERROR).json(
                errorRespSync({
                    msg: "Year Cannot be from Past"
                })
            )
        }

        // Check If target Already set for this year
        const isRecordExist = await db.CacaoProductionTarget.findOne({
            where: {
                userId, year
            }
        })

        if(isRecordExist){
            return res.json(
                errorRespSync({
                  code: error.code.CONFLICT,
                  msg: error.TARGET_EXIST,
                })
              );
        }

        let set = {userId, target, year, recordId};

        const transaction = await db.sequelize.transaction();
        try {
            const data = await db.CacaoProductionTarget.create(set, { transaction });
            await transaction.commit();
            return res.json(
                successRespSync({
                  msg: success.TARGET_ADDED,
                  data
                })
              )
        } catch (err) {
            await transaction.rollback()
            logErrorOccurred(__filename, err);
            return serverError(res, err);
        }

   } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
   }
})


router.get('/list', auth, async (req, res) => {
    try {  
        const userId = req.user.id;

        // Check If target Already set for this year
        const targetRecord = await db.CacaoProductionTarget.findAll({
            attributes: ['id','target', 'year', 'recordId'],
            where: {
                userId
            },
            order : [['year', 'desc']],
            limit: 10,
            raw: true
        })
        
        return res.json(
            successRespSync({
                msg: success.FETCH,
                data: {
                    numRows: targetRecord?.length ?? 0, 
                    targetRecord
                },
            })
        );
    } catch (err) {
     logErrorOccurred(__filename, err);
     return serverError(res, err);
    }
})
/

router.put('/:id', auth, productionTargetEditValidations(), validationErrorHandler, async (req, res) => {
    try {  
        const userId = req.user.id, currentYear = moment().format("YYYY");;
        let id = req.params.id;
        let { target } = req.body;

        // Check If target Already set for this year
        const targetRecord = await db.CacaoProductionTarget.findOne({
            where: {
            id, userId
            }
        })
        
        if(isEmpty(targetRecord)){
            return res.json(
                errorRespSync({
                    code: error.code.NOT_FOUND,
                    msg: error.TARGET_NOT_FOUND,
                })
            );
        }
        if(targetRecord.year < currentYear){
        return res.status(error.code.SERVER_ERROR).json(
            errorRespSync({
                msg: "You cannot Edit data of Past"
            })
        )
        }
        
        let set = {target};

        const transaction = await db.sequelize.transaction();
        try {
            // Updating the Target
            await db.CacaoProductionTarget.update(set, {
                where: {
                    id
                }
            }, { transaction });

            await transaction.commit();
            return res.json(
                successRespSync({
                msg: success.TARGET_UPDATED
                })
            )
        } catch (err) {
            await transaction.rollback()
            logErrorOccurred(__filename, err);
            return serverError(res, err);
        }
    } catch (err) {
     logErrorOccurred(__filename, err);
     return serverError(res, err);
    }
})

module.exports = router;