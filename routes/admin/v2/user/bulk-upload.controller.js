
const db = require(rootPath + "/models");
const { v4: uuidv4 } = require('uuid');
const xlsx = require('xlsx');
const axios = require('axios');
const validator = require('validator').default;
const shortid = require("short-uuid");
const getAllOptions = async (req) => { 

    let membershipRes

    membershipRes = await db.Membership.findAll({ 
        attributes: {
            include: [
              [db.Sequelize.fn('COUNT', db.Sequelize.col('activationKeys.id')), 'activationKeysCount']
            ]
        },
        where : {
            org_id: req.user.organization,
            subOrgId: req.user.subOrgId || null,
        },
        include: [
            {
                model : db.activationKeys,
                attributes: [],
                duplicating: false,
                where: {
                  status: "unassigned"
                }
            }
        ],
        group: ["id"]
    })

    return {
        membershipRes
    }


}

const checkKeysAgainstUserBulkUpload = async (req) => { 

    const { id, organization, subOrgId } = req.user;
    const jobId = uuidv4();
    let set = {},
      activationIdArr = [],
      activationKeyRes = [],
      jsonArray = [],
      successArr = [],
      failedArr = [],
      activationIdToData = {},
      userInsertArr = [],
      mailArr = [],
      mobileArr = []
      userExistArr = [],
      mailExistArr = [],
      mobileExistArr = []
      newActivationKeys = []
      noOfUsedExstingKeys = 0
    // get old profile pic data
    // console.log(req.file, "file");
    const file = await axios({
      method: "GET",
      url: req.file?.location,
      responseType: "arraybuffer",
      responseEncoding: "utf-8"
    });
    const wb = xlsx.read(file.data.toString(), { type: "string"});
    jsonArray = xlsx.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], {
      blankrows: false,
    });

     activationKeyRes = await db.activationKeys.findAll({ where: { membership_type: req.body.membershipId , status: 'unassigned' } });

     jsonArray = jsonArray.map((item, index) => {
        const email = item['Email'] || item['email'];
        const phone = item['Mobile Number'] || item['phone_no'];
        if(email)
        mailArr.push(email)

        if(phone)
        mobileArr.push(phone)

        let tmpObj = {}
        tmpObj.index = index
        tmpObj.first_name = item["First Name"] || ""
        tmpObj.last_name = item["Last Name"] || ""
        tmpObj.email = item["Email"] || ""
        tmpObj.country_code = item["Country Code"] || ""
        tmpObj.country = item["Country"] || ""
        tmpObj.mobile = item["Mobile Number"] || ""
        tmpObj.activation_key = item["Activation Key"] || ""
        if ((!email && !phone)) return {...tmpObj, validation_code: 101}
        return {...tmpObj, validation_code: !(validator.isEmail((email ?? '').trim()) || validator.isMobilePhone((phone ?? '').toString().trim())) ? 102 : 103 }
    });

    userExistArr = await db.user.findAll({
        where: {
            [db.Sequelize.Op.or]: [
                { email: mailArr },
                { mobile: mobileArr}
            ]
        },
        attributes: ['email','mobile']
    });

    mailExistArr = userExistArr.map(({ email }) => { return  email  });
    mobileExistArr = userExistArr.map(({ mobile }) => { return  mobile  });

    if(jsonArray.length > activationKeyRes.length) {
      //generate more keys if required
    let numberOfKeys = jsonArray.length - activationKeyRes.length

      let result = await db.generatedKeys.create({
        membership_type: req.body.membershipId,
        generated_by: req.user.id,
        admin_role: req.user.userRoles[0]["role_id"],
        number_of_keys: numberOfKeys,
        org_id: organization,
        subOrgId: subOrgId || null,
      });


      for (let i = 0; i < numberOfKeys; i++) {
        let key = shortid.generate();
  
        let inputObj = {
          license_key: key,
          membership_type: req.body.membershipId,
          generated_key_id: result.id,
          org_id: organization,
          subOrgId: subOrgId || null,
        };
        newActivationKeys.push(inputObj);
      }
     await db.activationKeys.bulkCreate(newActivationKeys);
     activationKeyRes = [...activationKeyRes, ...newActivationKeys];

    }


    for(let i =0; i < jsonArray.length; i++) { 
      if(mailExistArr.includes(jsonArray[i]["email"])) { 
        jsonArray[i].validation_code = 104; 
        jsonArray[i].license_key = null
        jsonArray[i].success = false
        continue;
      } else if (mobileExistArr.includes(jsonArray[i]["mobile"] + "")) {
        jsonArray[i].validation_code = 105; 
        jsonArray[i].license_key = null
        jsonArray[i].success = false
        continue;
      }

      if(activationKeyRes[i]) {
        jsonArray[i].license_key = activationKeyRes[i].license_key;
        jsonArray[i].success = true
        noOfUsedExstingKeys++
      } else {
        jsonArray[i].license_key = null
        jsonArray[i].success = true
        jsonArray[i].validation_code = 106; 
      }
    }
    if( jsonArray.length == 0) {
      if(req.file?.key) {
        await deleteFileS3({
          Bucket: process.env.AWS_PUBLIC_BUCKET,
          Key: req.file.key,
        });
      }
      return res.json(errorRespSync({ code: 400, msg: 'Invalid CSV data' }));
    }

    return {stagedData: jsonArray, noOfNewActivatedKeys: newActivationKeys.length, noOfUsedExstingKeys };

}

const validationCode = {
    101: "Either email or phone is required",
    102: "Either email or phone is invalid",
    103: "Email or phone is valid",
    104: "Email already exists",
    105: "Mobile already exists",
    106: "License key quota exceeded",

  }

module.exports = {
    getAllOptions,
    checkKeysAgainstUserBulkUpload
  }