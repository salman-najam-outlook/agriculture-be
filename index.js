const mongoose = require('mongoose');
const app = require("./app");
const PORT = process.env.PORT || 3000;

// redis.getConnection();


// connect to the event bus
// (async () => {
//   try {
//     console.log(process.env.NATS_URL, 'process.env.NATS_URL')
//     await natsWrapper.connect(process.env.NATS_CLUSTER_NAME || 'dimitra-sass', process.env.NATS_CLIENT_ID || 'farm-nats-cli-publisher', process.env.NATS_URL || 'http://localhost:4222')
//     natsWrapper.client.on('close', () => {
//         console.log('NATS connection closed!');
//         process.exit();
//     });
//     process.on('SIGINT', () => natsWrapper.client.close());
//     process.on('SIGTERM', () => natsWrapper.client.close());
//    } catch (error) {
//      console.log("event bus connection error", error)
//    }
// })();

const server = app.listen(PORT, (err) => {
  if (err) {
    console.log("error when starting server");
  }
  console.log(`_______________________________________________Server is running on http://localhost:${PORT}  ...`);
});

(async function connectToMongoDB() {
  try {
    const MONGO_URL = process.env.MONGO_URL;
    if(!MONGO_URL) {
      throw new Error('MONGO_URL environment variable is not defined.');
    }
    await mongoose.connect(MONGO_URL, {
      dbName: process.env.MONGO_DB,
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 30000,
      maxPoolSize: 10,
      minPoolSize: 5,
      retryWrites: true,
      retryReads: true,
      bufferCommands: true,
      autoIndex: true,
      autoCreate: true
    });

    mongoose.connection.on('connected', () => {
      console.log('MongoDB connected successfully');
    });

    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });

    process.on('SIGINT', async () => {
      try {
        await mongoose.connection.close();
        console.log('MongoDB connection closed through app termination');
        process.exit(0);
      } catch (err) {
        console.error('Error during MongoDB disconnection:', err);
        process.exit(1);
      }
    });

    await mongoose.syncIndexes({
      continueOnError: true,
      dbName: process.env.MONGO_DB,
    });
    mongoose.set('debug', true);
    console.log('Connected to MongoDB using mongoose');
  } catch (error) {
    console.error('Error connecting to MongoDB using mongoose: ', error);
    process.exit(1); 
  }
})();

module.exports = server;

/**
*
*  Enable the below code to add https support and comment the app.listen code above
*
*/
//
// var http = require('http');
// var https = require('https');
// var server = null;
// var debug = require('debug')('api:server');
// var fs = require('fs');
// if(process.env.NODE_ENV=='production'){
//   server = https.createServer({ //Main server , Https
//     key: fs.readFileSync(path.join(__dirname, '..', process.env.SSLKEYFILEURL), 'utf8'),
//     cert: fs.readFileSync(path.join(__dirname, '..', process.env.SSLCRTFILEURL), 'utf8'),
//     ca: []
//   }, app);
//   if (process.env.PORT == 443) { //Reflection server, http -> https
//     debug('HTTP Web Server : Reflection Mode');
//     var httpApp =  express();
//     httpApp.all('*', function(req, res) {
//       return res.redirect('https://' + req.headers['host'] + req.url);
//     });
//     var httpServer = http.createServer(httpApp);
//     httpServer.listen(80);
//     httpServer.on('error', debug);
//   }
// } else {
//   server = http.createServer(app);
// }
// server.listen(process.env.PORT);
// server.on('error', onError);
// server.on('listening', onListening);
// function onListening() {
//   var addr = server.address();
//   var bind = typeof addr === 'string'
//     ? 'pipe ' + addr
//     : 'port ' + addr.port;
//   debug('Listening on ' + bind);
// }
// /**
//  * Event listener for HTTP server "error" event.
//  */
//
// function onError(error) {
//   if (error.syscall !== 'listen') {
//     throw error;
//   }
//
//   var bind = typeof port === 'string'
//     ? 'Pipe ' + port
//     : 'Port ' + port;
//
//   // handle specific listen errors with friendly messages
//   switch (error.code) {
//   case 'EACCES':
//     console.error(bind + ' requires elevated privileges');
//     process.exit(1);
//     break;
//   case 'EADDRINUSE':
//     console.error(bind + ' is already in use');
//     process.exit(1);
//     break;
//   default:
//     throw error;
//   }
// }
