module.exports = function (bodyObj, defaultValues = {}) {
    // Get token from header
    if(typeof bodyObj == "object" && Object.keys(bodyObj).length > 0) {
        for(let key in bodyObj){
            if(bodyObj[key] == "" && !defaultValues.hasOwnProperty(key)){
                bodyObj[key] = null;
            } else if(bodyObj[key] == "" && defaultValues.hasOwnProperty(key)) {
                bodyObj[key] = defaultValues[key];
            }
        }
    }
    return bodyObj
    
}