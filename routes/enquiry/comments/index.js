const express = require("express");
const router = express.Router();
const auth = require(rootPath + "/middleware/auth");
const fileUpload = require(rootPath + "/middleware/file_upload");
const { 
    createEnquiryCommentValidation,
      } = require(rootPath + "/helpers/validation");
const validationErrorHandler = require(rootPath + "/middleware/validation_error_handler");
const {
  successRespSync,
  serverError,
  errorResp,
  errorRespSync,
} = require(rootPath + "/helpers/api");
const db = require(rootPath + "/models");

/**
 * @swagger
 * /enquiry/comments:
 *   post:
 *     summary: Add Enquiry Comment From App side
 *     description: Add Enquiry Comment From App side
 *     tags: [Enquiry]
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         example:
 *            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDk3NTUxMTUsImV4cCI6MTY0OTgxNTExNX0.KgDwMvqMANCLH5NMRN3lmtUu4CA3WOIqNbDygTlw1cI'
 *         description: authorization token
 *       - in: query
 *         name: ticketId
 *         type: integer
 *       - in: query
 *         name: comment_type
 *         schema:
 *           type: string
 *           enum: ["string", "file", "both"]
 *       - in: query
 *         name: comment
 *         type: string
 *     requestBody:
 *       description: Add Enquiry Comment
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                type: string
 *                format: binary
 *     responses:
 *       200:
 *         description: show success response
 *         content:
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
 *                 example:
 *                   success: true
 *                   code: 200
 *               example: { "success": true, "code": 200, "message": "Enquiry comment created", "data": { "id": 1,"ticketId": 1,"comment_type": "string","comment": "This is a dummy comment","file_url": null,"userId": 165,"createdAt": "2022-07-19T02:40:03.000Z","updatedAt": "2022-07-19T02:40:03.000Z" } }
 *       500:
 *         description: Server error
 *         content:
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
 *                 example:
 *                   success: true
 *                   code: 200
 *               example: { "success": false, "code": 500, "message": "Internal Error" }
 */

router.post("/", auth,
 fileUpload({
    fields: 'file',
    acl: 'public-read',
    bucket: process.env.AWS_TICKET_BUCKET,
    whiteListMimeTypes: [
      'image/png',
      'image/jpeg',
      'image/jpg',
    ],
  }),
  createEnquiryCommentValidation(),
  validationErrorHandler,  
  async function (req, res) {
    try {
      let userId = req.user.id
      let {
        ticketId,
        comment_type,
        comment
      } = req.query;
      
      ticketId = parseInt(ticketId)
      const enquiryComment = await db.TicketComments.create({
        ticketId,
        comment_type,
        file_url: req?.file?.location,
        userId,
        comment
      });
      return res.json(
        successRespSync({
          msg: "Enquiry comment created",
          data: enquiryComment,
        })
      );
    } catch (error) {
      return serverError(res, error);
    }
  }
);

/**
 * @swagger
 * /enquiry/comments/{id}:
 *   get:
 *     summary: API to get Single Enquiry
 *     description: API to get Single Enquiry.
 *     tags: [Enquiry]
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         example:
 *           'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDkwNTE0OTMsImV4cCI6MTY0OTExMTQ5M30.0Z2_N28-K_0Nx1lPV5hjssFCtdb3p5Xw7iQcvZf5IAI'
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 'It will be the Ticket Id'
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
 *                 example: {"success": true, "code": 200, "message": "Successfully fetched Enquiry comments", "data": [{"id": 2,"ticketId": 1,"comment_type": "both","comment": "This is a dummy comment with image","file_url": "https://dimitra-public-images-stage.s3.us-west-1.amazonaws.com/89bea8e2-ba49-468a-abf5-c4fc3ac3fbd7.1658198458365.png","userId": 165,"createdAt": "2022-07-19T02:41:02.000Z","updatedAt": "2022-07-19T02:41:02.000Z","sent": true},{"id": 1,"ticketId": 1,"comment_type": "string","comment": "This is a dummy comment","file_url": null,"userId": 165,"createdAt": "2022-07-19T02:40:03.000Z","updatedAt": "2022-07-19T02:40:03.000Z","sent": true}] }
 *
 */


router.get("/:id", auth,  async function (req, res) {
    try {
      let enquiryComments = await db.TicketComments.findAll({
        where: { ticketId: req.params.id},
        order: [['id', 'DESC']]
      });
      if (!enquiryComments) {
        return res.json(
          errorRespSync({
            msg: "no Enquiry comments found",
          })
        );
      } else {
        let resArr = JSON.parse(JSON.stringify(enquiryComments));
        enquiryComments = resArr.map((enquiryComment) => {
          if(req.user.id == enquiryComment.userId){
            return {
              ...enquiryComment,
              sent: true
            }
          } else {
            return {
              ...enquiryComment,
              sent: false
            }
          }
        })
        return res.json(
          successRespSync({
            msg: "Successfully fetched Enquiry comments",
            data: enquiryComments,
          })
        );
      }
    } catch (error) {
      return serverError(res, error);
    }
  });


module.exports = router;