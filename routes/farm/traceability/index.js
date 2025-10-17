const express = require("express");
const { Op } = require("sequelize");
const moment = require("moment");
const router = express.Router();
const db = require(rootPath + "/models");
const auth = require(rootPath + "/middleware/auth");
const translation = require(rootPath + "/middleware/translation");
const { logErrorOccurred, fileFilterGen, notEmpty } = require(rootPath +
  "/helpers/general");
const { error, success } = require(rootPath + "/helpers/language");
const {
  successRespSync,
  serverError,
  errorResp,
  errorRespSync,
} = require(rootPath + "/helpers/api");
const S3 = require(rootPath + "/components/s3upload");
var aws = require("aws-sdk");
const multer = require("multer");
var multerS3 = require("multer-s3");
const { deleteFileS3 } = require("../../../helpers/aws_s3");
const duplicateRecordId = require(rootPath + "/middleware/duplicateRecordId");

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  bucket: process.env.AWS_PUBLIC_BUCKET,
});

// storage configuration
const storage = multerS3({
  s3,
  bucket: process.env.AWS_PUBLIC_BUCKET,
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    // create custom key name on s3 cloud
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});

var params, whiteListMimeTypes, lang;
// allowed mime types
whiteListMimeTypes = ["image/jpeg", "image/png"];
// params
params = {
  bucket: process.env.AWS_PUBLIC_BUCKET,
  whiteListMimeTypes,
};
// allowed mimetypes
const fileFilter = fileFilterGen(whiteListMimeTypes); // get filter function

// create upload
var upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2000000 },
});

const deleteFileFromS3 = async (keysArray = []) => {
  await Promise.all(
    keysArray.map(async (key) => {
      await deleteFileS3({
        Bucket: process.env.AWS_PUBLIC_BUCKET,
        Key: key,
      });
    })
  );
};

const filterFilesToRemove = (filesOrFile = [], jsonPhotoKeysToRemove = []) => {
  if (!filesOrFile?.length) return [];
  const files = Array.isArray(filesOrFile) ? filesOrFile : [filesOrFile];
  const filteredFiles = files.filter((file) => {
    return jsonPhotoKeysToRemove.findIndex((key) => key === file.key) === -1;
  });

  return filteredFiles;
};

router.post(
  "/",
  auth,
  // async (req, res, next) => {
  //   let fileUpload = upload.fields([
  //     { name: "photos", maxCount: 10 },
  //     { name: "videos", maxCount: 5 },
  //   ]);
  //   fileUpload(req, res, function (err) {
  //     if (err instanceof multer.MulterError || err) {
  //       return res.json(errorRespSync({ code: 200, msg: err.message }));
  //     } else {
  //       next();
  //     }
  //   });
  // },
  async (req, res) => {
    try {
      const userId = req.user?.id;

      const {
        farmId,
        farmName,
        farmerName,
        country,
        state,
        city,
        farmCoordinates,
        description,
        photos,
        videos,
        photosToAdd,
        videosToAdd,
        farmImage,
        // photoKeysToRemove,
        // videoKeysToRemove,
        recordId,
      } = req.body;

      if (!farmId) throw Error("Farm is required");

      const doesFarmExists = await db.user_farm.findOne({
        where: { id: +farmId },
      });

      if (!doesFarmExists) throw Error("Farm doesn't exists.");

      // const jsonPhotoKeysToRemove = photoKeysToRemove
      //   ? JSON.parse(photoKeysToRemove)
      //   : [];
      // const jsonVideoKeysToRemove = videoKeysToRemove
      //   ? JSON.parse(videoKeysToRemove)
      //   : [];

      // const photos = req.files["photos"] ? req.files["photos"] : [];
      // const videos = req.files["videos"] ? req.files["videos"] : [];

      const farmPhotos = await photosToAdd?.map((a) => {
        return {
          location: `${
            process.env.PUBLIC_BUCKET_URL ||
            "https://dimitra-public-images.s3.amazonaws.com/"
          }${a.location}`,
        };
      });

      const farmVideos = await videosToAdd?.map((a) => {
        return {
          location: `${
            process.env.PUBLIC_BUCKET_URL ||
            "https://dimitra-public-images.s3.amazonaws.com/"
          }${a.location}`,
        };
      });

      const dataToSave = {
        farmId: doesFarmExists.id,
        farmName,
        farmerName,
        farmImage,
        country,
        state,
        city,
        farmCoordinates,
        description,
        userId,
        photos: farmPhotos,
        videos: farmVideos,
        recordId,
      };

      const existingFarmTracebility = await db.FarmTraceability.findOne({
        where: {
          farmId: farmId,
        },
      });

      let farmTraceability = null;
      if (!existingFarmTracebility)
        farmTraceability = await db.FarmTraceability.create(dataToSave);
      else {
        dataToSave.photos = [
          ...photos,
          ...farmPhotos
          // ...filterFilesToRemove(
          //   existingFarmTracebility.photos,
          //   jsonPhotoKeysToRemove
          // ),
        ];
        dataToSave.videos = [
          ...videos,
          ...farmVideos,
          // ...filterFilesToRemove(
          //   existingFarmTracebility.videos,
          //   jsonVideoKeysToRemove
          // ),
        ];
        await db.FarmTraceability.update(dataToSave, {
          where: { id: existingFarmTracebility.id },
        });

        // jsonPhotoKeysToRemove?.length &&
        //   (await deleteFileFromS3(jsonPhotoKeysToRemove));

        // jsonVideoKeysToRemove?.length &&
        //   (await deleteFileFromS3(jsonVideoKeysToRemove));

        farmTraceability = await db.FarmTraceability.findOne({
          where: {
            id: existingFarmTracebility.id,
          },
        });
      }
      res.json(
        await successRespSync({
          msg: success.INSERTED,
          data: farmTraceability,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      console.log("error occured in catch*************", err.message);
      return serverError(res, err);
    }
  }
);

router.put(
  "/:id",
  auth,
  async (req, res, next) => {
    let fileUpload = upload.fields([
      { name: "files", maxCount: 10 },
      { name: "videos", maxCount: 5 },
    ]);

    fileUpload(req, res, function (err) {
      if (err instanceof multer.MulterError || err) {
        return res.json(errorRespSync({ code: 200, msg: err.message }));
      } else {
        next();
      }
    });
  },
  async (req, res) => {
    try {
      const userId = req.user?.id;

      const {
        farmId,
        farmName,
        farmerName,
        country,
        state,
        city,
        farmCoordinates,
        description,
        photoKeysToRemove,
        videoKeysToRemove,
        farmImage,
        recordId,
      } = req.body;
      const { id } = req.params;

      if (!farmId) throw Error("Farm is required");
      const doesFarmExists = await db.user_farm.findOne({
        where: { id: +farmId },
      });

      if (!doesFarmExists) throw Error("Farm doesn't exists.");

      const jsonPhotoKeysToRemove = photoKeysToRemove
        ? JSON.parse(photoKeysToRemove)
        : [];
      const jsonVideoKeysToRemove = videoKeysToRemove
        ? JSON.parse(videoKeysToRemove)
        : [];
      const photos = req.files["photos"] ? req.files["photos"] : [];
      const videos = req.files["videos"] ? req.files["videos"] : [];

      const farmPhotos = await photos?.map((a) => {
        const { key, originalname, location, mimetype } = a;
        return { key, originalname, location, mimetype };
      });
      const farmVideos = await videos?.map((a) => {
        const { key, originalname, location, mimetype } = a;
        return { key, originalname, location, mimetype };
      });

      const existingFarmTracebility = await db.FarmTraceability.findOne({
        where: {
          id: id,
        },
      });

      if (!existingFarmTracebility) {
        throw new Error("Not found");
      }

      const set = {
        farmId,
        farmName: farmName === "true" || farmName === "1" ? true : false,
        farmerName: farmerName === "true" || farmerName === "1" ? true : false,
        country: country === "true" || country === "1" ? true : false,
        state: state === "true" || state === "1" ? true : false,
        city: city === "true" || city === "1" ? true : false,
        farmImage: farmImage === "true" || farmImage === "1" ? true : false,
        farmCoordinates:
          farmCoordinates === "true" || farmCoordinates === "1" ? true : false,
        description,
        userId,
        photos: [
          ...farmPhotos,
          ...filterFilesToRemove(
            existingFarmTracebility.photos,
            jsonPhotoKeysToRemove
          ),
        ],
        videos: [
          ...farmVideos,
          ...filterFilesToRemove(
            existingFarmTracebility.videos,
            jsonVideoKeysToRemove
          ),
        ],
        recordId,
      };

      let updatedData = await db.FarmTraceability.update(set, {
        where: { id },
      });

      jsonPhotoKeysToRemove?.length &&
        (await deleteFileFromS3(jsonPhotoKeysToRemove));
      jsonVideoKeysToRemove?.length &&
        (await deleteFileFromS3(jsonVideoKeysToRemove));

      return res.json(
        successRespSync({
          msg: success.UPDATED,
          data: updatedData,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

router.get("/", auth, async (req, res) => {
  try {
    const userId = req.user?.id;
    
    let traceability = await db.FarmTraceability.findAll({
      where: {
        userId,
      },
    });

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: traceability,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    let { id } = req.params;

    let traceability = await db.FarmTraceability.findOne({
      where: { id: id },
    });
    if (!traceability) {
      throw new Error("Not found");
    }

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: traceability,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.get("/byFarmId/:farmId", async (req, res) => {
  try {
    let { farmId } = req.params;

    let traceability = await db.FarmTraceability.findOne({
      where: { farmId: farmId },
      include: [
        {
          model: db.user_farm,
          as: 'userFarms',
          required: true,
          attributes: ['id', 'farmName', 'state', 'country', 'lat', 'log', 'farmerFirstName', 'farmerMiddleName', 'farmerLastName', 'city', 'isTechnician'],
          include: [
            {
              model: db.user,
              as: 'user',
              attributes: ['firstName','middleName', 'lastName', 'fullName'],
            }
          ],
        }
      ],
    });
    if (!traceability) {
      throw new Error("Not found");
    }

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: traceability,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.delete("/:id", auth, async function (req, res) {
  try {
    const { id: userId } = req.user;
    const { id } = req.params;

    await db.FarmTraceability.destroy({
      where: { id: id, userId: userId },
    });

    return res.json(
      successRespSync({
        msg: "Tracebility deleted.",
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

module.exports = router;
