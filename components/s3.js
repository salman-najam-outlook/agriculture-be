'use strict';

const AWS = require('aws-sdk');
const { v4 } = require('uuid');

class AWSS3 {
  constructor() {
    AWS.config.update({
      region: 'us-east-1',
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
    this.S3 = new AWS.S3();
  }

  getClient() {
    return this.S3;
  }

  deleteObject(fileUrl, directory = '') {
    return new Promise((resolve, reject) => {
      if (!fileUrl) return reject('fileUrl is required');
      var fileSplit = null;
      if (fileUrl) fileSplit = fileUrl.split('/');
      if (fileSplit && fileSplit.length > 0) {
        var bucket_params = {
          Bucket: process.env.AWS_PRIVATE_BUCKET + directory,
          Key: fileSplit[fileSplit.length - 1],
        };
        this.S3.deleteObject(bucket_params, function (err) {
          if (err) return reject(err);
          return resolve(true);
        });
      }
    });
  }

  getAccessibleURL(key, directory = '') {
    return this.S3.getSignedUrl('getObject', {
      Bucket: process.env.AWS_PRIVATE_BUCKET + directory,
      Key: key,
    });
  }

  async getPresignedURLForUpload(filename, mimeType, isPublic = true, directory = null) {
    return new Promise((resolve, reject) => {
      const bucket = isPublic ? process.env.AWS_PUBLIC_BUCKET : process.env.AWS_PRIVATE_BUCKET;
      const key = directory ? directory + '/' + filename : v4() + '/' + filename;
      const params = {
        Bucket: bucket,
        Key: key,
        ContentType: mimeType,
        Expires: 60 * 60,
      };
      this.S3.getSignedUrl('putObject', params, function (err, url) {
        if (err) return reject(err);
        return resolve({
          url,
          key,
        });
      });
    });
  }

  async getObjectURL(key, isPublic = true) {
    if(!key) return null;
    const bucket = isPublic ? process.env.AWS_PUBLIC_BUCKET : process.env.AWS_PRIVATE_BUCKET;
    const url = this.S3.getSignedUrl('getObject', {
      Bucket: bucket,
      Key: key,
    });

    if (isPublic) {
      return url.split('?')[0];
    }

    return url;
  }
}
module.exports = new AWSS3();
