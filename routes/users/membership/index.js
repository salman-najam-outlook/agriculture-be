const express = require('express');
const router = express.Router();
const moment = require('moment');
const auth = require(rootPath + '/middleware/auth');
const db = require(rootPath + '/models');
const { successRespSync, serverError } = require(rootPath + '/helpers/api');
const { success } = require(rootPath + '/helpers/language');
const { logErrorOccurred } = require(rootPath + '/helpers/general');
const validatorMembership = require(rootPath + '/helpers/validators/membership');
const validationErrorHandler = require(rootPath +
  '/middleware/validation_error_handler');
/*
NOTE- Make changes in other API related to user organization for supporting multiple organization of user(BE task).
*/

/**
 * @swagger
 * /user/membership:
 *   get:
 *     summary: users membership information according to organizations
 *     description: get membership details of user according to there organization
 *     tags: [User Membership]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MTd9LCJpYXQiOjE2NDg1NTAxNzYsImV4cCI6MTY0ODYxMDE3Nn0.tacCMSuqGtBnSqoieFkc2J3bXKUQqwxPRvbR25lM5IA
 *      - in: query
 *        name: organizationId
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          1
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
 *                     type: object
 *             example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": { "userRole": "App User", "organizationName": "NAGRAC", "memberships": [ { "id": 6, "membership_type": "member namde", "satellite_report": 3, "advanced_report": 0, "membership_duration": 1, "membership_duration_in_days": 30, "membership_duration_unit": "month(s)", "membership_fee": 1, "default_status": false, "description": "member desc", "org_id": 2, "plan_type": "enterprise", "membershipMap": { "id": 14, "membership_id": 6, "activation": { "membershipValidity": "11/25/2022", "membershipExtendedDays": null } }, "accessToModules": [ { "name": "Soil Management", "ParentModule": { "name": "My Farm" } }, { "name": "Crop Registration", "ParentModule": { "name": "My Farm" } }, { "name": "My Documents", "ParentModule": { "name": "My Farm" } }, { "name": "Farm Registration", "ParentModule": { "name": "My Farm" } }, { "name": "My Geofences", "ParentModule": { "name": "My Farm" } }, { "name": "Harvesting", "ParentModule": { "name": "My Crops" } }, { "name": "Irrigation", "ParentModule": { "name": "My Crops" } }, { "name": "Animal Registration", "ParentModule": { "name": "My Livestock" } }, { "name": "My Goals", "ParentModule": { "name": "My Livestock" } }, { "name": "Observations", "ParentModule": { "name": "My Crops" } }, { "name": "Soil Management", "ParentModule": { "name": "My Farm" } }, { "name": "Land/Soil Preparation", "ParentModule": { "name": "My Crops" } }, { "name": "Sowing/Planting", "ParentModule": { "name": "My Crops" } }, { "name": "Storage", "ParentModule": { "name": "My Crops" } }, { "name": "My Goals", "ParentModule": { "name": "My Crops" } }, { "name": "Weeding", "ParentModule": { "name": "My Crops" } } ] } ] } }
 */
router.get(
  '/',
  auth,
  validatorMembership.getMembershipDetails(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const { id: userId } = req.user;
      const { organizationId } = req.query;

      let organizations = await db.Organization.findOne({
        include: [
          {
            required: true,
            where: { userId },
            model: db.MapUserOrganization,
            as: 'mapUserOrganization',
            attributes: [],
          },
          {
            required: true,
            model: db.Membership,
            as: 'memberships',
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: [
              {
                required: false,
                model: db.UserMembershipMap,
                as: 'membershipMap',
                where: { user_id: userId },
                attributes: { exclude: ['user_id', 'createdAt', 'updatedAt'] },
                include: [
                  {
                    model: db.activationKeys,
                    as: 'activation',
                    where: { user_id: userId },
                    attributes: [
                      'membershipValidity',
                      'membershipExtendedDays',
                    ],
                  },
                ],
              },
              {
                required: false,
                model: db.Modules,
                as: 'accessToModules',
                attributes: ['name'],
                include: [{ model: db.ParentModules, attributes: ['name'] }],
                through: { attributes: [] },
              },
            ],
          },
        ],
        attributes: [['name', 'organizationName']],
        where: { id: organizationId },
      });

      const user = await (
        await db.UserRoles.findOne({
          include: [
            {
              model: db.Roles,
              as: 'roles',
              attributes: [],
            },
          ],
          where: { user_id: userId },
          attributes: [[db.Sequelize.literal('roles.name'), 'userRole']],
        })
      ).toJSON();

      organizations = {
        userRole: user?.userRole,
        ...(await organizations?.toJSON()),
      };

      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: organizations,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

/**
 * @swagger
 * /user/membership:
 *   put:
 *     summary: upgrade or renew user membership
 *     description: upgrade or renew user membership via a in app payment or by requesting admin
 *     tags: [User Membership]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                membershipId:
 *                  type: integer
 *                organizationId:
 *                  type: integer
 *              required:
 *                - organizationId
 *                - membershipId
 *            example: { "membershipId": 6, "organizationId": 2 }
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                 example: { "success": true, "code": 200, "message": "saved successfully.", "data": {} }
 */
router.put(
  '/',
  auth,
  validatorMembership.updateUserMembership(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const { id: user_id } = req.user;
      const { membershipId: membership_id, organizationId: org_id } = req.body;

      const activation = await db.activationKeys.findOne({
        where: { user_id, org_id },
      });

      let remainingDaysForExpiration = 0;
      if (activation.membership_type == membership_id) {
        const validity = moment.utc(activation?.membershipValidity);
        const today = moment.utc();
        remainingDaysForExpiration = validity.diff(today, 'd');
        if (remainingDaysForExpiration <= 0) remainingDaysForExpiration = 0;
      }

      const membershipValidity = await getMembershipValidity(
        {
          id: membership_id,
          org_id,
        },
        remainingDaysForExpiration
      );

      if (activation === null) throw new Error('Activation key not found');

      var transaction = await db.sequelize.transaction();

      const whereUserMembershipMap = {
        membership_id: activation.membership_type,
        user_id,
      };
      const setUserMembershipMap = { membership_id, user_id };
      const [updated] = await db.UserMembershipMap.update(
        setUserMembershipMap,
        {
          where: whereUserMembershipMap,
          transaction,
        }
      );
      // throw new Error('sdfsdfsdf');
      if (updated)
        await activation
          .set({
            membership_type: membership_id,
            membershipValidity,
            membershipExtendedDays: null,
            membershipExtensionReason: null,
            membershipExtendedBy: null,
          })
          .save({ transaction });

      await transaction.commit();

      return res.json(
        successRespSync({
          msg: success.SAVED,
          // data: organizations,
        })
      );
    } catch (err) {
      await transaction?.rollback();
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

async function getMembershipValidity(where, remainingDaysForExpiration) {
  const { membership_duration_in_days } = await db.Membership.findOne({
    raw: true,
    where,
    attributes: ['membership_duration_in_days'],
  });
  const duration =
    parseInt(remainingDaysForExpiration) +
    parseInt(membership_duration_in_days);
  return moment.utc().add(duration, 'd') || null;
}

module.exports = router;
