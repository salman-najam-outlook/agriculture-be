const db = require(rootPath + "/models");
const { errorRespSync, successRespSync } = require(rootPath + "/helpers/api");
const { success } = require(rootPath + "/helpers/language");

class duplicateRecordId {
    static handleDuplicateRecordId (dbModel) {
        return async (req, res, next) => {
            try {
                let data = [],set={}, updateRes = [];
                set = req.body
                if (req.body.recordId && req.method != 'DELETE' && req.method != 'PUT') {
                  updateRes = await db[dbModel].findAll({where: {recordId: req.body.recordId}})
                  if(updateRes.length > 0) {
                      return res.json(
                        errorRespSync({
                          msg: "recordId already exists",
                          data: req.body
                        })
                      );
                  }
                }
                next();
            } catch (error) {
                console.log(error, 'recordid middleware error', 'dbModel:', dbModel)
                next();
            }
         
        };
    }
}

module.exports = duplicateRecordId;
