const { Router } = require('express');
const { Op } = require('sequelize');
const db = require(rootPath + '/models');
const { successRespSync, serverError } = require(rootPath + '/helpers/api');
const { success } = require(rootPath + '/helpers/language');
const { logErrorOccurred } = require(rootPath + '/helpers/general');

const farmerRouter = new Router();

/**
 * @swagger
 * /portal/farmers:
 *   get:
 *     summary: Get list of OMA Farmers for Dimitra Portal
 *     tags: [Dimitra-Portal-NFT]
 *     parameters:
 *      - in: header
 *        name: auth-key
 *        required: true
 *        schema:
 *          type: string
 *     responses:
 *       200:
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
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         user:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               example: 1
 *                               description: Dimitra Farmer ID
 *                             firstName:
 *                               type: string
 *                               example: "John"
 *                             lastName:
 *                               type: string
 *                               example: "Doe"
 *                             country:
 *                               type: string
 *                               nullable: true
 *                               example: "Kenya"
 *                             app_type:
 *                               type: string
 *                               example: "connected_farmer"
 *                             profilePicUrl:
 *                               type: string
 *                               nullable: true
 *                             farms:
 *                               type: array
 *                               items:
 *                                 type: object
 *                                 properties:
 *                                   id:
 *                                     type: number
 *                                     description: Dimitra Farm ID
 *                                   lat:
 *                                     type: number
 *                                     example: 27.6588
 *                                   lng:
 *                                     type: number
 *                                     example: 85.3247
 *                                   userId:
 *                                     type: number
 *                                     example: 1
 *                                     description: Dimitra Farmer ID
 *                                   address:
 *                                     type: string
 *                                     nullable: true
 *                                     example: "Rongai"
 *                                   country:
 *                                     type: string
 *                                     nullable: true
 *                                     example: "Kenya"
 *                                   farmName:
 *                                     type: string
 *                                   farmerFirstName:
 *                                     type: string
 *                                   farmerLastName:
 *                                     type: string
 *                                   farmerMiddleName:
 *                                     type: string
 *                                   farmRegistrationId:
 *                                     type: string
 *                                     description: Farm Registration ID
 *                                   farmerRegistrationId:
 *                                     type: number
 *                                     description: Farmer Registration ID
 *                                   zones:
 *                                     type: array
 *                                     items:
 *                                       type: object
 *                                       properties:
 *                                         id:
 *                                           type: number
 *                                         geofenceName:
 *                                           type: string
 *                                         geofenceArea:
 *                                           type: number
 *                             userScore:
 *                               type: object
 *                               nullable: true
 *                               description: Farmer Score if available
 *                               properties:
 *                                 score:
 *                                   type: string
 *                                   example: 32 %
 */
farmerRouter.get('/', async (req, res) => {
  try {
    const FARMER_ROLES = ['farmer', 'coffee_farmer'];
    const ORGANIZATION_CODES = ['oma'];

    const farmers = await db.user.findAll({
      attributes: ['id', 'firstName', 'middleName','lastName', 'country', 'app_type', 'profilePicUrl'],
      where: {
        verified: true,
      },
      include: [
        {
          model: db.user_farm,
          as: 'farms',
          attributes: [
            'id',
            'userId',
            'lat',
            ['log', 'lng'],
            'address',
            'country',
            'farmName',
            'farmerFirstName',
            'isTechnician',
            'farmerLastName',
            'farmerMiddleName',
            ['registrationNo', 'farmRegistrationId'],
            ['farmerId', 'farmerRegistrationId'],
          ],
          where: {
            isDeleted: false,
          },
          required: false,
          include: [
            {
              model: db.Geofence,
              as: 'zones',
              required: false,
            },
          ],
        },
        {
          model: db.UserScore,
          as: 'userScore',
          required: false,
        },
        {
          required: true,
          model: db.activationKeys,
          as: 'activation',
          where: {
            is_deleted: false,
          },
          attributes: [],
          include: [
            {
              model: db.Membership,
              as: 'membership_assoc',
              attributes: [],
              required: true,
              include: [
                {
                  model: db.UserRoleMembershipMap,
                  as: 'userRoleMembershipMap',
                  attributes: [],
                  required: true,
                  where: {
                    isDeleted: false,
                    user_role_id: { [Op.in]: FARMER_ROLES },
                  },
                },
                {
                  model: db.Organization,
                  as: 'org_assoc',
                  required: true,
                  where: {
                    isDeleted: false,
                    code: { [Op.in]: ORGANIZATION_CODES },
                  },
                  attributes: [],
                },
              ],
            },
          ],
        },
      ],
    });

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: farmers,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

module.exports = farmerRouter;
