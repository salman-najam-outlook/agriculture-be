const amqp = require("amqplib");

class RabbitMQService {
  constructor() {
    this.connection = null;
    this.channel = null;

    this.EXCHANGE_NAME = "dds-exchange";
    this.USER_QUEUE = process.env.USER_QUEUE || "user-queue";
    this.MARKETPLACE_NOTIFICATION_QUEUE = process.env.MARKETPLACE_NOTIFICATION_QUEUE || "marketplace-notification-queue";
    this.USER_ROUTING_KEY = "user";
    this.NOTIFICATION_ROUTING_KEY = "notification";
  }

  async connect() {
    try {
      const rabbitmqHost = process.env.RABBITMQ_HOST || "localhost";
      const rabbitmqPort = process.env.RABBITMQ_PORT || "5672";
      const rabbitmqUsername = process.env.RABBITMQ_USERNAME || "guest";
      const rabbitmqPassword = process.env.RABBITMQ_PASSWORD || "guest";

      const amqpUrl = `amqp://${rabbitmqUsername}:${rabbitmqPassword}@${rabbitmqHost}:${rabbitmqPort}/`;

      console.log("Connecting to RabbitMQ at", amqpUrl);

      this.connection = await amqp.connect(amqpUrl);
      this.channel = await this.connection.createChannel();

      await this.channel.assertExchange(this.EXCHANGE_NAME, "direct", {
        durable: true,
      });

      console.log("RabbitMQ connected and exchange initialized.");
    } catch (error) {
      console.error("Error connecting to RabbitMQ:", error.message);
      throw error;
    }
  }

  async closeConnection() {
    if (this.channel) await this.channel.close();
    if (this.connection) await this.connection.close();
    console.log("RabbitMQ connection and channel closed.");
  }

  async consumeQueue(queueName, routingKey, handleMessage) {
    try {
      if (!this.channel) {
        throw new Error("Channel is not initialized. Call connect() first.");
      }

      await this.channel.assertQueue(queueName, { durable: true });
      await this.channel.bindQueue(queueName, this.EXCHANGE_NAME, routingKey);

      console.log(`Waiting for messages in queue: ${queueName}`);

      this.channel.consume(queueName, async (msg) => {
        if (msg !== null) {
          try {
            console.log(`Message received in ${queueName}:`, msg.content.toString());
            await handleMessage(msg);
            this.channel.ack(msg);
          } catch (error) {
            console.error(`Error processing message in ${queueName}:`, error.message);
            // Reject the message without requeuing
            this.channel.reject(msg, false);
          }
        }
      });
    } catch (error) {
      console.error(`Error consuming queue ${queueName}:`, error.message);
      throw error;
    }
  }
}

module.exports = new RabbitMQService();