var aws = require('aws-sdk');
const fs = require('fs');
const { now } = require('lodash');
const QRCode = require('qrcode');
const { DATE } = require('sequelize');

const s3 = new aws.S3({
    params: {
        region: process.env.AWS_REGION || 'us-east-1',
        signatureVersion: process.env.AWS_SIGNATURE_V || 'v4',
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
        Bucket: process.env.AWS_PUBLIC_BUCKET || "dimitra-public-images",
    }
});
module.exports = async (data) => {
    try {
        return new Promise(resolve => {


            QRCode.toDataURL(data, async function (err, base64) {
                const buf = new Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ""), 'base64')
                var data = {
                    Key: `${new Date().getTime()}`,
                    Body: buf,
                    ACL: 'public-read',
                    ContentEncoding: 'base64',
                    ContentType: 'image/png'
                };
                const { Location, key } = await s3.upload(data).promise();
                console.log(Location);
                resolve({ Location, key });
            });
        });
    } catch (err) {
        console.log('qr generation failed', err.message);
        return false;
    }

}