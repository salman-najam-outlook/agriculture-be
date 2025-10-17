var fcmInit = require('firebase-admin');
const serviceAccount = require(rootPath+'/dimitra-82a9a-firebase-adminsdk-l61bm-a0069f9547.json');

const FCMINIT = fcmInit.initializeApp({
    credential: fcmInit.credential.cert(serviceAccount)
});

exports.fcmInit = FCMINIT;