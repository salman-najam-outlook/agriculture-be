var aws = require('aws-sdk');
const { S3Client } = require('@aws-sdk/client-s3');
const REGION = process.env.AWS_REGION||'us-east-1';

// Create an Amazon S3 service client object.
exports.s3Client = new S3Client({ region: REGION });
// AWS sdk s3 object
aws.config = new aws.Config({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: REGION,
  signatureVersion: 'v4',
});

exports.s3West = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  signatureVersion: 'v4',
}) 

// this is for compatibility with prod branch
exports.s3WestLandWeather = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_WEST_REGION, // this is for compatibility with prod branch
  signatureVersion: 'v4',
}) 


exports.s3East = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION_US_EAST,
  signatureVersion: 'v4',
}) 

exports.sqs = new aws.SQS({});
exports.s3 = new aws.S3({});
