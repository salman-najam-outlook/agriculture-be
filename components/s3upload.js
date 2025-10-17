const AWS = require("aws-sdk");
const { v4: randomSting } = require("uuid");
const multer = require('multer');
const { logErrorOccurred } = require(rootPath + "/helpers/general");
const storage = multer.memoryStorage();
const upload = multer({ storage });

class S3 {
  constructor() {
    this.s3 = new AWS.S3();
  }

  // uploading base64 image
  uploadBase64 = async ({
    bucket = process.env.AWS_PUBLIC_BUCKET,
    base64,
    fileName,
  }) => {
    try {
      const base64Data = new Buffer.from(
        base64.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      );
      // Getting the file type, ie: jpeg, png or gif
      const type = base64.split(";")[0].split("/")[1];
      const Key = fileName
        ? `${fileName}.${type}`
        : `${randomSting()}.${Date.now().toString()}.${type}`;

      const params = {
        Bucket: bucket,
        Key,
        Body: base64Data,
        ACL: "public-read",
        ContentEncoding: "base64",
        ContentType: `image/${type}`,
      };

      return await this.s3.upload(params).promise();
    } catch (err) {
      logErrorOccurred(__filename,"uploadBase64==>>>", err);
      console.log("s3_error_stack_trace ==>>>", err);
      throw new Error("upload to s3 failed");
    }
  };

  // uploading Video
  uploadVideo = async ({
    bucket = process.env.AWS_PUBLIC_BUCKET,
    file,
    fileName,
  }) => {
    try {
      const type = fileName.split(".").pop();
      const Key = fileName
        ? `${fileName}`
        : `${randomSting()}.${Date.now().toString()}.${type}`;

      const params = {
        Bucket: bucket,
        Key,
        Body: file,
        ACL: "public-read",
        ContentType: `video/${type}`,
      };

      return await this.s3.upload(params).promise();
    } catch (err) {
      console.log("s3_error_stack_trace ==>>>", err);
      throw new Error("upload to s3 failed");
    }
  };

  // uploading buffer file
  uploadBuffer = async ({
    buffer,
    type,
    bucket = process.env.AWS_PUBLIC_BUCKET,
    name = "file",
  }) => {
    try {
      const params = {
        Bucket: bucket,
        Key: `${name}${randomSting()}.${Date.now().toString()}.${type}`, // type is not required
        Body: buffer,
        ACL: "public-read",
        ContentEncoding: "base64",
        ContentType: `image/${type}`,
      };

      return await this.s3.upload(params).promise();
    } catch (err) {
      console.log("s3_error_stack_trace ==>>>", err);
      throw new Error("upload to s3 failed");
    }
  };

  async uploadFile(file, filename, bucket = process.env.AWS_PUBLIC_BUCKET) {
    try {
      const extension = file.originalname.split('.').pop();
      const Key = `${filename ?? Date.now().toString()}.${extension}`;
      return await this.s3.upload({
        Bucket: bucket,
        Key,
        ACL: 'public-read',
        Body: file.buffer,
        ContentType: file.mimetype,
      }).promise();
    } catch (err) {
      console.log("s3_error_stack_trace ==>>>", err);
      throw new Error("Upload to s3 failed");
    }
  }

  async uploadJSONFile(object, filename, bucket = process.env.AWS_PUBLIC_BUCKET) {
    try {
      const Key = `${filename ?? Date.now().toString()}.json`;
      return await this.s3.upload({
        Bucket: bucket,
        Key,
        ACL: 'public-read',
        Body: JSON.stringify(object, null, 2),
        ContentType: 'application/json',
      }).promise();
    } catch (error) {
      console.log("s3_error_stack_trace ==>>>", err);
      throw new Error('Upload to s3 failed');
    }
  }

  uploadFileStreamToS3 =  async (fileStream, key) => {
      try {
          // Create a readable stream from the file

          // Upload parameters
          const params = {
              Bucket: process.env.AWS_PUBLIC_BUCKET,
              Key: key,
              Body: fileStream,
              ACL: 'public-read',
          };

          // Upload the file to S3
          const data = await this.s3.upload(params).promise();
          console.log('File uploaded successfully:', data.Location);
          return data.Location;
      } catch (error) {
          console.error('Error uploading file:', error);
          throw error;
      }
  }
}

module.exports = new S3();
