const { natsWrapper } = require("./nats-wrapper");


const start = async () => {
    await natsWrapper.connect('test-cluster', 'farm-nats-cli', 'http://localhost:4222')
    natsWrapper.client.on('close', () => {
        console.log('NATS connection closed!');
        process.exit();
    });
    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());
};
start();