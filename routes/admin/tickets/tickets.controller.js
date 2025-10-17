const db = require(rootPath + "/models");
const {
  successRespSync,
  serverError,
  errorResp,
  errorRespSync,
} = require(rootPath + "/helpers/api");
const mailer = require(rootPath + "/components/mailer");
const ejs = require('ejs');
const path = require('path');
const { CreateAdminNotification } = require(rootPath + "/helpers/systemNotifications");

const recordLogs = async (req, ticket, logType) => {
      const mongoClient = req.app.locals.mongoClient;

      if (mongoClient) {
        const db = mongoClient.db(process.env.MONGO_DB);
        const collection = db.collection(process.env.MONGO_DB_Failure_COLLECTION)
        const activityCollection = db.collection(process.env.MONGO_DB_TICKET_ACTIVITY_COLLECTION)

        let logRes = await activityCollection.insertOne({
          module: logType || "support_ticket_logs",
          payload: logType == "support_ticket_comment_logs" ? req.query : req.body,
          createdAt: new Date(),
          createdBy: req.user.id,
          organization: parseInt(req.user.organization),
          ticketId: logType == "support_ticket_comment_logs" ?  (req.query.ticketId && parseInt(req.query.ticketId )) : ( ticket?.id && parseInt(ticket.id) ),
          assigneeId: ticket?.assigneeId || null,
          requesterId: logType == "support_ticket_comment_logs" ?  (req?.body?.requesterId && parseInt(req?.body?.requesterId)) : ( ticket?.requesterId && parseInt(ticket.requesterId) )
        })

        console.log("logged sub org registration", logRes)
      }
}

const fetchLogs = async (req, res) => {
  try {
    const mongoClient = req.app.locals.mongoClient;

    if (mongoClient) {
      const mongoDbClient = mongoClient.db(process.env.MONGO_DB);
      const collection = mongoDbClient.collection(process.env.MONGO_DB_TICKET_ACTIVITY_COLLECTION);

      const logs = await collection.find({
        ticketId: parseInt(req.params.ticketId),
        organization: req.user.organization
      }).sort({ createdAt: -1 }).project({
        _id: 0,
        module: 1,
        payload: 1,
        createdAt: 1,
        createdBy: 1,
        assigneeId: 1,
        requesterId: 1
      }).toArray();


      const createdByIds = logs.map(log => log.createdBy).filter(Boolean);
      const assigneeIds = logs.map(log => log.assigneeId).filter(Boolean);
      const requesterIds = logs.map(log => log.requesterId).filter(Boolean);

      const allUserIds = [...new Set([...createdByIds, ...assigneeIds, ...requesterIds])];

      const users = await db.user.findAll({
        where: { id: allUserIds },
        attributes: ['id', 'firstName', 'middleName', 'lastName', 'email'], 
        raw: true,
      });

     const userMap = {};
    users.forEach(user => {
      userMap[user.id] = user;
    });

   
    const enrichedLogs = logs.map(log => ({
      ...log,
      user: userMap[log.createdBy] || null,
      assignee: userMap[log.assigneeId] || null,
      requester: userMap[log.requesterId] || null,
    }));

 
    return enrichedLogs;

    } else {
      return serverError(res, "MongoDB client not initialized");
    }
  } catch (error) {
    return serverError(res, error);
  }
}

const sendTicketNotification = async (ticket, req) => {

  // get admmin user data
   let adminUserData = await db.user.findOne({
      where: {
        id: req.body.asigneeId
      }
    })

        // send mail to any admin

      const emailData = {
            userName: `${ adminUserData.firstName } ${ adminUserData.middleName || '' } ${ adminUserData.lastName }`,
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
  
          await mailer.sendMail([adminUserData.email], title, template);

               // Create a notification for the support admin
      const notification = await CreateAdminNotification(
         req.user.id,
         adminUserData.id,
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


}
module.exports = {
   recordLogs,
   fetchLogs,
   sendTicketNotification
  }