const db = require(rootPath + "/models");
const { errorRespSync, successRespSync } = require(rootPath + "/helpers/api");
const { success } = require(rootPath + "/helpers/language");

class duplicateRecordId {
    static handleIncompleteData (valuesToCheck) {
        return async (req, res, next) => {
            try {
             for(let value in valuesToCheck){
              if(this.isNullOrUndefinedOrEmpty(req.body[valuesToCheck[value]])){
                req.body["isComplete"] = false
                break;
              } else {
                req.body["isComplete"] = true
              }
             }
                next();
            } catch (error) {
                console.log(error, 'handleIncompleteData middleware error', 'valuesToCheck:', valuesToCheck)
                next();
            }
         
        };
    }
     static isNullOrUndefinedOrEmpty(value) {
      return value == null || 
             value === 0 ||
             (typeof value === 'string' && value.trim() === '') || 
             (Array.isArray(value) && value.length === 0) || 
             (typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length === 0);
  }
  
}

module.exports = duplicateRecordId;
