const express = require("express");

const { body } = require("express-validator");
const router = express.Router();
const auth = require(rootPath + "/middleware/auth");
const translation = require(rootPath + "/middleware/translation");
const fileUpload = require(rootPath + "/middleware/file_upload");
const { langObj } = require(rootPath + "/helpers/consts");
const { error, success } = require(rootPath + "/helpers/language");
const { deleteFileS3 } = require(rootPath + '/helpers/aws_s3');
const { 
    createTicketCommentValidation,
      } = require(rootPath + "/helpers/validation");
const {
    createOTP,
    fileFilterGen,
    sendSMS,
    logErrorOccurred,
    validateMobileNumber,
  } = require(rootPath + '/helpers/general');
const validationErrorHandler = require(rootPath + "/middleware/validation_error_handler");
const {
  successRespSync,
  serverError,
  errorResp,
  errorRespSync,
} = require(rootPath + "/helpers/api");
const { user, ticketMedia } = require(rootPath + "/models");
const db = require(rootPath + "/models");
const { CreateUserNotification } = require(rootPath + "/helpers/systemNotifications");
const {
  sendPushNotification
} = require(rootPath + '/helpers/pushNotification');
const { sendEmail } = require(rootPath + '/helpers/general');
const multer = require("multer");
var multerS3 = require("multer-s3");
var aws = require("aws-sdk");
const REGION = "ap-south-1";
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  bucket: process.env.AWS_PUBLIC_BUCKET,
});
const {recordLogs} = require("../tickets.controller")

router.post("/", auth,
 fileUpload({
    fields: 'file',
    acl: 'public-read',
    bucket: process.env.AWS_PUBLIC_BUCKET,
    whiteListMimeTypes: [
      'image/png',
      'image/jpeg',
      'image/jpg',
    ],
  }),
  createTicketCommentValidation(),
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
      
      // Get ticket details to find the requester
      const ticket = await db.Ticket.findByPk(ticketId);
      if (!ticket) {
        return res.json(
          errorRespSync({
            msg: "Ticket not found",
          })
        );
      }

      const ticketComment = await db.TicketComments.create({
        ticketId,
        comment_type,
        file_url: req?.file?.location,
        userId,
        comment
      });

      // Get the commenter's details
      const commenter = await db.user.findByPk(userId, {
        attributes: ['firstName', 'lastName', 'email']
      });

      // Create notification for the ticket requester
      if (ticket.requesterId && ticket.requesterId !== userId) {
        const message = `New response on your enquiry (ID: ${ticketId}) from ${commenter.firstName} ${commenter.lastName}`;
        
        //         // Create in-app notification
        const notificationData = JSON.stringify({
          type: "notification",
          title: `Response on Enquiry #${ticketId}`,
          body: message,
          data: {
            ticketId: ticketId,
            commenterName: `${commenter.firstName} ${commenter.lastName}`,
            commentType: comment_type
          }
        });
        
        await CreateUserNotification(
          ticket.requesterId, // receiver (ticket requester)
          notificationData
        );

        // Send push notification
        const deviceRegistrationToken = await db.UserRegistrationToken.findAll({
          attributes: ['device_registration_token'],
          where: {
            userId: ticket.requesterId
          }
        });

        console.log(deviceRegistrationToken, 'deviceRegistrationToken');
        const firebaseToken = deviceRegistrationToken.map(device => device.device_registration_token);

        console.log('message',message)
        if (firebaseToken.length > 0) {
          await sendPushNotification(
            firebaseToken, 
            `Response on Enquiry #${ticketId}`, 
            { message: message }
          );
        }

        // Send email notification
        //   const requester = await db.user.findByPk(ticket.requesterId, {
        //     attributes: ['firstName', 'lastName', 'email']
        //   });

        //   if (requester && requester.email) {
        //     const emailSubject = `Response on Your Enquiry #${ticketId}`;
        //     const emailHtml = `
        //       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        //         <h2 style="color: #333;">Response on Your Enquiry</h2>
        //         <p>Dear ${requester.firstName} ${requester.lastName},</p>
        //         <p>You have received a response on your enquiry (ID: ${ticketId}).</p>
        //         <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
        //           <p><strong>From:</strong> ${commenter.firstName} ${commenter.lastName}</p>
        //           <p><strong>Response:</strong></p>
        //           <p>${comment}</p>
        //           ${ticketComment.file_url ? `<p><strong>Attachment:</strong> <a href="${ticketComment.file_url}" target="_blank">View File</a></p>` : ''}
        //         </div>
        //         <p>Please log in to your account to view the complete conversation and respond if needed.</p>
        //         <p>Best regards,<br>Team Dimitra</p>
        //       </div>
        //     `;

        //     try {
        //       await sendEmail({
        //         to: requester.email,
        //         subject: emailSubject,
        //         html: emailHtml
        //       });
        //     } catch (emailError) {
        //       console.error('Failed to send email notification:', emailError);
        //       // Don't fail the entire request if email fails
        //     }
        //   }




      }

      await recordLogs(req, ticketComment, "support_ticket_comment_logs");
      return res.json(
        successRespSync({
          msg: "Ticket comment created",
          data: ticketComment,
        })
      );
    } catch (error) {
      return serverError(res, error);
    }
  }
);

router.get("/:id", auth,  async function (req, res) {
    try {
      let ticketComments = await db.TicketComments.findAll({
        where: { ticketId: req.params.id},
        include: [
          {
            model: db.user,
            as: "user"         
          }
        ],
        order: [['id', 'DESC']]
      });
      if (!ticketComments) {
        return res.json(
          errorRespSync({
            msg: "no tickets comments found",
          })
        );
      } else {
        let resArr = JSON.parse(JSON.stringify(ticketComments));
        ticketComments = resArr.map((ticketComment) => {
          if(req.user.id == ticketComment.userId){
            return {
              ...ticketComment,
              sent: true
            }
          } else {
            return {
              ...ticketComment,
              sent: false
            }
          }
        })
        return res.json(
          successRespSync({
            msg: "Successfully fetched ticket comments",
            data: ticketComments,
          })
        );
      }
    } catch (error) {
      return serverError(res, error);
    }
  });


module.exports = router;