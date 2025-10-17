const db = require(rootPath + '/models');
const { successRespSync, serverError } = require(rootPath + '/helpers/api');
const { success } = require(rootPath + '/helpers/language');

exports.addOfflineFarmer = async (req, res, isBuyingStation = false, userType) => {
  try {
    const { organization } = req.user;
    let { name, address, type, farmerFirstName, farmerLastName, farmerMiddleName } = req.body;
    if (isBuyingStation && !name && !farmerFirstName){
      farmerFirstName = `offline farmer (${req?.body?.farmName || ""})`
    }
    if (!isBuyingStation && !name && !farmerFirstName) {
      farmerFirstName = `offline farmer (${req?.body?.farmName || ""})`
    }
    let set;

    set = {
      firstName : farmerFirstName,
      middleName : farmerMiddleName,
      lastName : farmerLastName,
      address,
      organization,
      subOrganizationId: req.user.subOrgId || null,
      userType: userType ? userType : 'offline',
      source: 'saas_api_offline_farmer'
    }
    const addOfflineFarmer = await db.user.create(set);
    //assign membership
    try {
      const membershipRes = await db.sequelize.query(`
        SELECT u.*
        FROM (
          SELECT um.*
          FROM user_role_membership_map AS um
          WHERE um.user_role_id = 'coffee_farmer'
            AND um.membership_id NOT IN (
              SELECT membership_id
              FROM user_role_membership_map
              WHERE user_role_id = 'buying_station'
            )
        ) AS urmm
        INNER JOIN user_membership AS u ON urmm.membership_id = u.id
        WHERE u.org_id = ${req.user.organization};
      `, { type: db.Sequelize.QueryTypes.SELECT });
    
      if (membershipRes.length > 0) {
        const selectedMembership = membershipRes[0];
        await db.UserMembershipMap.create({
          user_id: addOfflineFarmer.id,
          membership_id: selectedMembership.id
        });
    
        console.log(`Membership assigned to user ${addOfflineFarmer.id}`);
      } else {
        console.log('No eligible membership found.');
      }
    } catch (error) {
      console.error('Error assigning membership:', error);
    }
    if (isBuyingStation) {
      return addOfflineFarmer.id
    }
    return res.json(
      successRespSync({
        msg: success.FARMER_ADDED_SUCCESSFULLY,
        data: addOfflineFarmer.id,
      })
    )
  } catch (err) {
    return serverError(res, err);
  }
}

exports.addOfflineFarmerForAdmin = async (req, res, isBuyingStation = false, isTechnician) => {
  try {
    const { organization } = req.user;
    const { name, address, type, countryId } = req.body;
    if (isBuyingStation && name === "") throw new Error("Name is mandatory");
    if (!isBuyingStation && (name === "" || address === "")) throw new Error("Name and address are mandatory")
    let set;
    const nameParts = name.split(" ");
    let firstName, lastName, middleName;
    if (nameParts.length > 2) {
      firstName = nameParts[0];
      middleName = nameParts.slice(1, -1).join(" ");
      lastName = nameParts[nameParts.length - 1];
    } else if (nameParts.length === 2) {
      firstName = nameParts[0];
      lastName = nameParts[1];
      middleName = "";
    } else {
      firstName = name;
      middleName = "";
      lastName = "";
    }
    set = {
      firstName,
      middleName,
      lastName,
      address,
      organization,
      subOrganizationId: req.user.subOrgId || null,
      countryId,
      userType: 'offline',
      source: 'saas_api_offline_farmer'
    }
    const addOfflineFarmer = await db.user.create(set);
    //assign membership
    try {
      const membershipRes = await db.sequelize.query(`
        SELECT u.*
        FROM (
          SELECT um.*
          FROM user_role_membership_map AS um
          WHERE um.user_role_id = 'farmer'
        ) AS urmm
        INNER JOIN user_membership AS u ON urmm.membership_id = u.id
        WHERE u.org_id = ${req.user.organization};
      `, { type: db.Sequelize.QueryTypes.SELECT });
    
      if (membershipRes.length > 0) {
        const selectedMembership = membershipRes[0];
        await db.UserMembershipMap.create({
          user_id: addOfflineFarmer.id,
          membership_id: selectedMembership.id
        });
    
        console.log(`Membership assigned to user ${addOfflineFarmer.id}`);
      } else {
        console.log('No eligible membership found.');
      }
    } catch (error) {
      console.error('Error assigning membership:', error);
    }
    if (isBuyingStation) {
      return addOfflineFarmer.id
    }
    return res.json(
      successRespSync({
        msg: success.FARMER_ADDED_SUCCESSFULLY,
        data: addOfflineFarmer.id,
      })
    )
  } catch (err) {
    return serverError(res, err);
  }
}