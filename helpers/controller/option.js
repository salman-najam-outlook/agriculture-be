const db = require(rootPath + "/models");

/**
 * @desc create new option
 */
exports.createOption = async (req, optionBelongToUser = false) => {
  const { groupName, name, countryId } = req.body;

  const set = {
    countryId,
    groupName: groupName.toLowerCase(),
    name: name.toLowerCase(),
  };
  if (optionBelongToUser) {
    set.userId = req.user.id;
  }
  Object.keys(set).forEach((key) => {
    set[key] == undefined || set[key] == null ? delete set[key] : {};
  });
  // insert into option table in DB
  let option = await db.Option.create(set);
  return option;
};
