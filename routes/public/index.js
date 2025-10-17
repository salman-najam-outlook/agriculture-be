const express = require('express');
const router = express.Router();
const db = require(rootPath + '/models');
const { successResp, serverError } = require(rootPath + '/helpers/api');
const { success } = require(rootPath + '/helpers/language');
const { logErrorOccurred } = require(rootPath + '/helpers/general');
const _ = require('lodash')
const {UserFarmCreatedPublisher} = require('../../helpers/event_bus/userfarm-created-publisher')
const {natsWrapper} = require('../../helpers/event_bus/nats-wrapper')
const request = require('supertest');
const fs = require('fs');


/**
 * @swagger
 * /public/language:
 *   get:
 *     description: List all the available language
 *     tags: [Language Options]
 *     responses:
 *       200:
 *         description: On success response if data is present.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   success:
 *                     type: boolean
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *               example:
 *                  success: true
 *                  code: 200
 *                  message: Fetched successfully.
 *                  data:
 *                    num_rows: 5
 *                    info:
 *                      - id: 1
 *                        name: english
 *                      - id: 2
 *                        name: hindi
 *                      - id: 3
 *                        name: urdu
 */
router.get('/language', async (req, res) => {
  try {
    let result = await db.language.findAll({
      attributes: ['id', 'name'],
    });

    result = {
      num_rows: result.length,
      data: result,
    };

    res.json(
      await successResp({
        msg: success.FETCH,
        data: result,
      }),
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return res.status(error.code.SERVER_ERROR).json(await errorResp());
  }
});

/**
 * @swagger
 * /public/organization:
 *   get:
 *     description: List all the organization
 *     tags: [Organization]
 *     responses:
 *       200:
 *         description: Get list of organization
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   success:
 *                     type: boolean
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *               example:
 *                  success: true
 *                  code: 200
 *                  message: Fetched successfully.
 *                  data: [{"name": "Agzon","logo": "https://dimitra-public-images.s3.amazonaws.com/org/agzon-logo-big.png","splashScreen": "https://dimitra-public-images.s3.amazonaws.com/org/agzonSplashScreen.png"},{"name": "OBC","logo": "https://dimitra-public-images.s3.amazonaws.com/org/agzon-logo-big.png","splashScreen": "https://dimitra-public-images.s3.amazonaws.com/org/agzonSplashScreen.png"}]
 */
router.get('/organization', async (req, res) => {
  try {
    let organization = await db.Organization.findAll({
      attributes: ['id', 'name', 'logo', 'splashScreen', 'code'],
    });
    res.json(
      await successResp({
        msg: success.FETCH,
        data: organization,
      }),
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.get('/traceability', async (req, res) => {
  try {
    let {parchmentId} = req.query
    let parchmentRes =  await db.ParchmentCoffee.findOne({
      where: {id: parchmentId}
    });
    let user = await db.user.findOne({
      where: {
        id: parchmentRes.dryMillingUserId
      }
    })
    const { organization, subOrgId } = user;

    let traceability = await db.Traceability.findOne({
      where: { 
           include: [
            {
              attributes: [],
              model: db.user,
              as: "user",
              where:  { 
                organization,
                ...(subOrgId ? {subOrganizationId: subOrgId } : {})
              },
              required: true,
            },
          ],
       },
    });
    res.json(
      await successResp({
        msg: success.FETCH,
        data: traceability,
      }),
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.get('/cacao/traceability', async (req, res) => {
  try {
    let {parchmentId} = req.query
    let parchmentRes =  await db.CacaoDryingProcess.findOne({
      where: {id: parchmentId}
    });
    let user = await db.user.findOne({
      where: {
        id: parchmentRes.dryRegisterUserId
      }
    })

    let traceability = await db.CacaoTraceability.findOne({
      where: { organization_id: user.organization },
    });
    res.json(
      await successResp({
        msg: success.FETCH,
        data: traceability,
      }),
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.post('/insertUserRoles', async(req, res) => {
  try {
    let userRolesRes = await db.UserRoles.findAll({})
    let usersRes = await db.user.findAll({})
    let rolesUserIdArr = userRolesRes.map(user => user.user_id)
    let userIdArr = usersRes.map(user => user.id)
    console.log(rolesUserIdArr, 'build alter faq fix')
    console.log("test git automation111")
    console.log("test git automation11123")
    console.log("test git automation1112233")
    console.log("test git automation1112233")
    console.log(userIdArr)
    console.log(userIdArr)

    let newUsers = []
     newUsers = _.difference(userIdArr, rolesUserIdArr)

    let newUserRolesInsertions = []
    newUserRolesInsertions = newUsers.map(user => {
      return {
        id: `${user}_end_user`,
        user_id: user,
        role_id: 'end_user'
      }
    })

    console.log(newUserRolesInsertions)
     await db.UserRoles.bulkCreate(newUserRolesInsertions)
     res.json(
      await successResp({
        msg: success.FETCH,
        data: {},
      }),
    );


  } catch (error) {
    logErrorOccurred(__filename, error);
    return res.status(error.code.SERVER_ERROR).json(await errorResp());
  }
})

router.get('/testEvents', async(req, res) => {
  await new UserFarmCreatedPublisher(natsWrapper.client).publish( {
    id: 'id1',
    title: 'title1',
    price: 123
  })
  res.json(
    await successResp({
      msg: success.FETCH,
      data: {},
    }),
  );
  
})

router.get('/tesTranslations', async(req, res) => {
  console.log('trigger trigger build trigger trigger trigger trigg 123')
    const client = request(req.app);
  const token = req.header('oauth-token');
  const lang = req.header('lang') || 'en';

  let promiseArr =  ["hi", "mr", "np", "es", "id", "ar", "pt", "fr"].map(async lang => {
    return await client.get('/api/offline-api/weeding')
    .set('oauth-token', token)
    .set('lang', lang)
    .set('route', 'crop')
  })
  
  let promiseArrRes = await Promise.all(promiseArr)

  for(let i = 0; i < promiseArrRes.length; i++) {
    fs.writeFile(`output${i}.log`, JSON.stringify(promiseArrRes[i]),async function(err) {
      if(err) {
          return console.log(err);
      }
   
      console.log("The file was saved! trigger build trigger");
  }); 

  }
  res.json(
    await successResp({
      msg: success.FETCH,
      data: {},
    }),
  );


 
  
})

// router.get('/testOther', async(req, res) => {
//   let userMembershipRes
//   let   membershipRes = await db.Membership.findAll({where: {default_status: 1}})

//   if(membershipRes.length > 0) {
//     userMembershipRes = await db.UserMembershipMap.create({
//       user_id: 415,
//       membership_id: membershipRes[0].id
//     })
//   }
//   res.json(
//     await successResp({
//       msg: success.FETCH,
//       data: userMembershipRes,
//     }),
//   );


 
  
// })
module.exports = router;
