// amazon s3
const { s3Client, s3, s3West, s3East } = require(rootPath + '/components/s3-config.js');
const {
  PutObjectCommand,
  CreateBucketCommand,
  GetObjectCommand,
} = require('@aws-sdk/client-s3');
const { logErrorOccurred } = require(rootPath + '/helpers/general'); // constant messages

// send success response
exports.uploadToS3 = async (key,buffer, bucket ) => {
  try {
    // start uploading file
    const params = {
      Bucket: bucket || process.env.AWS_PUBLIC_BUCKET, // The name of the bucket. For example, 'sample_bucket_101'.
      Key: key, // The name of the object. For example, 'sample_upload.txt'.
      Body: buffer, // The content of the object. For example, 'Hello world!".
      ACL: 'public-read',
    };

  let results = await s3.upload(params).promise();
    return results;
  } catch (err) {
    console.log('inside verify has function ********', err.message);
    return false;
  }
};

const streamToString = async (stream) => {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('error', reject);
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
  });
};

exports.fetchSingleFileS3 = async (key) => {
  try {
    // start uploading file
    const params = {
      Bucket: 'santoshuploads', // The name of the bucket. For example, 'sample_bucket_101'.
      Key: key, // The name of the object. For example, 'sample_upload.txt'.
    };
    const file = new GetObjectCommand(params);
    const results = await s3Client.send(file);
    let string = await streamToString(results.Body);
    return string;
  } catch (err) {
    console.log('inside verify has function ********', err.message);
    return false;
  }
};

// get signed url of the file
exports.getSignedURL = async (action = 'getObject', params) => {
  try {
    var url = s3East.getSignedUrl(action, params);
    return url;
  } catch (err) {
    logErrorOccurred(__filename, err);
    console.log('inside verify has function ********', err.message);
    return false;
  }
};

// get signed url of the file REgion west
exports.getSignedURLs3West = async (action = 'getObject', params) => {
  try {
    var url = s3West.getSignedUrl(action, params);
    return url;
  } catch (err) {
    logErrorOccurred(__filename, err);
    console.log('inside verify has function ********', err.message);
    return false;
  }
};

// For deleting an Object/file from the S3 bucket
exports.deleteFileS3 = async (params) => {
  return await s3.deleteObject(params).promise();
};
