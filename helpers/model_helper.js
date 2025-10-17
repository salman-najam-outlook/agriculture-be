const db = require("../models");
// send success response
exports.checkUserExist = async (where) => {

  const result = await db.user.findAll({ where });
  console.log(result.length);
  // check if exist return true or false
  if (result)
    return true;
  return false;
}
