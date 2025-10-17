const express = require("express");
const router = express.Router();
/********************   Custom Modules    *********************/
const db = require(rootPath + "/models");
const auth = require(rootPath + "/middleware/auth");
const { logErrorOccurred } = require(rootPath +
  "/helpers/general");
const { error, success, message } = require(rootPath + "/helpers/language");
const { successRespSync, errorRespSync, serverError } = require(rootPath + "/helpers/api");
const validate = require(rootPath + "/helpers/validation");
const validationErrorHandler = require(rootPath +
  "/middleware/validation_error_handler");
const { syncFarmerDataToOCC } = require(rootPath + '/helpers/occ-komodo');

/**
 * @swagger
 * /farm/community:
 *   put:
 *     summary: Add farming community details
 *     description: Add farming community details
 *     tags: [Farm-Community]
 *     requestBody:
 *       description: Add farming community details
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *            example: {"farmId":539, "communityName":"testComunity", }
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
 *                   data:
 *                     type: object
 *                 example: { "success": true, "code": 200, "message": "Updated successfully.", "data": {} }
 */

router.put(
  "/",
  auth,
  validate.community_put(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const userId = req.user.id;
      const { communityName, farmId } = req.body;

      let set = { communityName };

      // insert farm data into DB
      let isNameExist = await db.user_farm.findOne({
        where: { communityName },
      });

      // If community name exist already
      if (isNameExist != null) {
        return res.status(success.code.OK).json(
          await errorRespSync({
            code: success.code.OK,
            msg: "Community name exist already",
          })
        );
      }

      // update community details into DB
      let [result] = await db.user_farm.update(set, {
        where: {
          id: farmId,
          userId,
        },
      });
      await syncFarmerDataToOCC(userId);
      // send response to the client
      return res.json(
        await successRespSync({
          msg: result ? success.UPDATED : error.NOT_FOUND,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

/**
 * @desc invite peoples for joining community
 */
 /**
 * @swagger
 * /farm/community/invite:
 *   post:
 *     summary: Invite people for joining community
 *     description: Invite people for joining community
 *     tags: [Farm-Community]
 *     requestBody:
 *       description: Invite people for joining community
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *            example: { "inviteLink":"invite_link", "mobiles": [{"code":91,"number":8759474839},{"code":81,"number":6559474839}], "communityName":"test_community" }
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
 *                   data:
 *                     type: object
 *                 example: { "success": true, "code": 200, "message": "Invitation message is sent successfully.", "data": {} }
 */

router.post(
  "/invite",
  validate.communityInvite_post(),
  validationErrorHandler,
  auth,
  async (req, res) => {
    try {
      const { inviteLink, mobiles, communityName } = req.body;

      const invitationMessage = message.COMMUNITY_INVITATION.replace(
        /\[COMMUNITY_NAME\]|\[LINK\]/g,
        function (x) {
          switch (x) {
            case "[COMMUNITY_NAME]":
              return communityName;
            case "[LINK]":
              return inviteLink;
            default:
              return;
          }
        }
      );

      let mobileNumbers = mobiles.map((element) => {
        return parseInt(element.code + element.number);
      });

      mobileNumbers = mobileNumbers.slice(0, 1); // send SMS to only one number for now
      // send invitation message
      // const status = await sendBulkMessages(invitationMessage, mobileNumbers);
      // send response to the client
      return res.json(
        await successRespSync({
          msg: success.COMMUNITY_INVITATION_SENT,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

router.get("/societies", auth, async (req, res) => {
  try {
    let { organization, subOrgId } = req.user;
    

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const offset = (page - 1) * pageSize;

   
    const { count, rows: societies } = await db.user.findAndCountAll({
      where: { organization, subOrganizationId: subOrgId || null },
      attributes: [
        "id",
        "fullName",
        "firstName",
        "lastName",
        "email",
        "address",
        "mobile",
        "city",
        "district",
        "village",
        "address",
        "createdAt",
      ],
      include: [
        {
          model: db.Membership,
          as: "user_membership",
          required: true,
          through: {
            model: db.UserMembershipMap,
          },
          include: [
            {
              model: db.UserRoleMembershipMap,
              as: "userRoleMembershipMap",
              where: {
                user_role_id: "society",
              },
            },
          ],
        },
      ],
      limit: pageSize,
      offset: offset,
      distinct: true,
      order: [["id", "DESC"]],
    });

    return res.json(
      await successRespSync({
        msg: success.FETCHED,
        data: {
          societies,
          totalCount: count,
          currentPage: page,
          pageSize,
          totalPages: Math.ceil(count / pageSize),
        },
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});
module.exports = router;
