const express = require('express');
const router = express.Router();
const db = require(rootPath + '/models');
const { successRespSync, serverError } = require(rootPath + '/helpers/api');
const { success } = require(rootPath + '/helpers/language');
const { logErrorOccurred } = require(rootPath + '/helpers/general');
const fileUpload = require(rootPath + '/middleware/file_upload');
const { createPassword } = require(rootPath + '/helpers/hash');

// register buying station
router.post(
  '/',
  fileUpload({
    fields: [
      { name: 'buyingStationPic', maxCount: 1 },
      { name: 'partnerPic', maxCount: 1 },
    ],
    acl: 'public-read',
    bucket: process.env.BUYING_STATION_BUCKET,
    whiteListMimeTypes: ['image/png', 'image/jpeg', 'image/jpg'],
  }),
  // validatorWeather.get(),
  // validationErrorHandler,
  async (req, res) => {
    try {
      const { firstName,middleName, lastName, partnerTribe, address, email, password } =
        req.body;
      console.log(req.files);
      
      // Check if user already exists with email
      if (email) {
        const existingUser = await db.user.findOne({
          where: { email: email }
        });
        
        if (existingUser) {
          throw new Error('User already exists with this email');
        }
      }
      
      const set = {
        firstName,
        middleName,
        lastName,
        address,
        email,
        password,
        partnerTribe,
        source: 'saas_api_buying_station'
      };
      set.password = await createPassword(password);

      for (let keyName in req.files) {
        const { size, location, key } = req.files?.[keyName].pop();
        set[keyName] = { size, location, key };
        if (keyName == 'partnerPic') {
          set.profilePicUrl = location;
          set.profilePicS3Key = key;
        }
      }

      let buyingStation = await db.user.create(set);
      buyingStation = await buyingStation?.toJSON();
      delete buyingStation?.password;

      return res.json(
        successRespSync({
          msg: success.REGISTERED,
          data: { buyingStation },
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

module.exports = router;
