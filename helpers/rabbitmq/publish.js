const amqp = require('amqplib');


async function publishToQueue(queue, exchange, routingKey, message) {
    try {
        const amqpUrl = `amqp://${process.env.RABBITMQ_USERNAME}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}/`;
        const connection = await amqp.connect(amqpUrl);
        const channel = await connection.createChannel();

        await channel.assertExchange(exchange, 'direct', { durable: true });
        await channel.assertQueue(queue, { durable: true });
        await channel.bindQueue(queue, exchange, routingKey);

        channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(message)));
        console.log("Queue Message", message);
        setTimeout(() => {
            connection.close();
        }, 500);
    } catch (error) {
        console.error('Error in publishing message', error);
    }
}

//Import and call the service as follows whenever required. Following are the sample calls //TODO: This section is only for example remove this later
// await publishToQueue('user-queue','dds-exchange','user',{"fname": "sushil", "lname": "Ram"})    here user-queue is queue name, dds-exchange is channel name and user is routing key
// await publishToQueue('farm-queue','dds-exchange','farm',{"farmname": "dimitra", "farmaddress": "Canada"})
// await publishToQueue('org-queue','dds-exchange','organization',['organization1','organization2'])


module.exports = { publishToQueue };
