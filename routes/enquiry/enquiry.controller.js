

const db = require(rootPath + "/models");
const { Op, fn, col, literal } = db.Sequelize;
const mailer = require(rootPath + "/components/mailer");
const ejs = require('ejs');
const path = require('path');
const { CreateAdminNotification } = require(rootPath + "/helpers/systemNotifications");

const assignToSupportAdmin = async (req, ticket) => {
   // get support admin user list from user organization
   let supportUserList = []
  supportUserList =  await db.AdminUserRoles.findAll({
      include: [
         {
            model : db.Roles,
            where: {
               role_type: "support_admin",
               organization: req.user.organization,
            },
            as: "roles",
         }
      ],
      raw: true
   })
   
const supportUserIds = supportUserList.map(user => user.user_id);


   // Get support user from state with lowest ticket count
   const leastLoadedSupportUser = await db.user.findOne({
   where: {
      id: { [Op.in]: supportUserIds },
      organization: req.user.organization,
      ...(req.body.state ? { stateId: req.body.state } : {})
   },
   attributes: {
      include: [
         [
         // Subquery to count tickets where this user is the assignee
         literal(`(
            SELECT COUNT(*) FROM tickets
            WHERE tickets.asigneeId = user.id
         )`),
         'ticketCount'
         ]
      ]
   },
   order: [[literal('ticketCount'), 'ASC']],
   limit: 1,
   raw: true
   });


   // If a support admin is found, assign the ticket to them
   if (leastLoadedSupportUser) {
      await db.Ticket.update(
         { asigneeId: leastLoadedSupportUser.id },
         { where: { id: ticket.id } }
      );

      // send mail to support admin

      const emailData = {
            userName: `${ leastLoadedSupportUser.firstName } ${ leastLoadedSupportUser.middleName || '' } ${ leastLoadedSupportUser.lastName }`,
            ticketID: ticket.id,
            ticketSubject: ticket.subject,
            ticketPriority: ticket.priority,
            assignedBy: req.user.firstName + ' ' + (req.user.middleName || '') + ' ' + req.user.lastName,
            dueDate: ticket.dueDate,
            ticketLink: `${process.env.FRONTEND_URL}tickets/all-tickets`,
         };

         const title = 'New Ticket Assigned: ' + ticket.subject;
         let templatePath = path.join(rootPath, 'views', 'users/ticket-support-new-assigned.html')
         const template = await ejs.renderFile(
         templatePath,
         emailData
         );

         await mailer.sendMail([leastLoadedSupportUser.email], title, template);

      // Create a notification for the support admin
      const notification = await CreateAdminNotification(
         req.user.id,
         leastLoadedSupportUser.id,
         `You have been assigned a new ticket with ID: ${ticket.id}. Please check the details.`,
         {
            type: "ticket_assigned",
            title: `New Ticket Assigned: ${ticket.subject}`,
            body: `You have been assigned a new ticket with ID: ${ticket.id}. Please check the details.`,
            data: {
               ticketId: ticket.id,
               ticketSubject: ticket.subject,
               assignedBy: req.user.id
            }
         }
      );
   } else {
      console.error("No support admin found to assign the ticket.");
   }





   return leastLoadedSupportUser?.id || null;
}
module.exports = {
   assignToSupportAdmin
  }