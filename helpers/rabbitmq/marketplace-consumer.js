const rabbitMQConsumer = require("./consume");

const { createNotification } = require('../../routes/notification/utils');

// Initialize RabbitMQ Consumer
async function initializeConsumer() {
  try {
    console.log("Initializing RabbitMQ consumer...");
    await rabbitMQConsumer.connect();

    await rabbitMQConsumer.consumeQueue(
      rabbitMQConsumer.MARKETPLACE_NOTIFICATION_QUEUE,
      rabbitMQConsumer.NOTIFICATION_ROUTING_KEY,
      async (message) => {
        console.log("Processing notification message:", message.content.toString());
        const messageData = JSON.parse(message.content.toString());
        const payload ={
            user: {id: messageData.userId},
            body:{...messageData}
        }
        try {
        const notification = await createNotification(payload);
        return res.json(
            successRespSync({
            msg: success.NOTIFICATION_CREATED,
            data: { notification },
            })
        );
        } catch (err) {
            console.log("Error creating notification:", err.message);
        return serverError(res, err);
        }
      }
    );

    console.log("RabbitMQ consumer initialized.");
  } catch (error) {
    console.error("Error initializing RabbitMQ consumer:", error.message);
    throw error;
  }
}

// Graceful Shutdown
async function shutdown() {
  console.log("Shutting down services...");
  try {
    await rabbitMQConsumer.closeConnection();
    process.exit(0);
  } catch (error) {
    console.error("Error during shutdown:", error.message);
    process.exit(1);
  }
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

module.exports = {
  initializeConsumer,
};