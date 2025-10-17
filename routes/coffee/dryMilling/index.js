const express = require('express');
const router = express.Router();
const auth = require(rootPath + '/middleware/auth');
const db = require(rootPath + '/models');

const { successRespSync, serverError } = require(rootPath + '/helpers/api');
const { success } = require(rootPath + '/helpers/language');
const { logErrorOccurred } = require(rootPath + '/helpers/general');

const fileUpload = require(rootPath + '/middleware/file_upload');
const { createPassword } = require(rootPath + '/helpers/hash');

router.use('/parchment-coffee', require('./parchmentCoffee'));
router.use('/inbound-warehouse', require('./inboundWarehouse'));
router.use('/outbound-warehouse', require('./outboundWarehouse'));
router.use('/low-stock',require('./lowStock'));

router.use('/report', require('./report'));

// register dry milling
router.post(
  '/register',
  fileUpload({
    fields: [
      { name: 'dryMillingPic', maxCount: 1 },
    ],
    acl: 'public-read',
    bucket: process.env.DRY_MILLING_BUCKET,
    whiteListMimeTypes: ['image/png', 'image/jpeg', 'image/jpg'],
  }),
  async (req, res) => {
    try {
        const {
            address,
            countryId,
            district,
            email,
            firstName,
            middleName,
            lastName,
            language,
            managerTribe,
            password,
            stateId,
            village,
            website,
        } = req.body;
        
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
            address,
            countryId,
            district,
            email,
            firstName,
            middleName,
            lastName,
            language,
            managerTribe,
            password,
            stateId,
            village,
            website,
            source: 'saas_api_dry_milling'
        };
        set.password = await createPassword(password);

        for (let keyName in req.files) {
            const { size, location, key } = req.files?.[keyName].pop();
            set[keyName] = { size, location, key };

            if (keyName == 'dryMillingPic') {
                set.profilePicUrl = location;
                set.profilePicS3Key = key;
            }
        }

        let dryMilling = await db.user.create(set);
        dryMilling = await dryMilling?.toJSON();
        delete dryMilling?.password;

        return res.json(
            successRespSync({
                msg: success.REGISTERED,
                data: { dryMilling },
            })
        );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

module.exports = router;
