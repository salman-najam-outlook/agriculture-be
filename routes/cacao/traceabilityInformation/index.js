const express = require("express");
const router = express.Router();
const auth = require(rootPath + "/middleware/auth");
const {
  successRespSync,
  serverError,
  errorResp,
  errorRespSync,
} = require(rootPath + "/helpers/api");
const db = require(rootPath + "/models");
var path = require("path");
const fileUpload = require(rootPath + "/middleware/file_upload");
const S3 = require(rootPath + "/components/s3upload");
var aws = require("aws-sdk");
const multer = require("multer");
var multerS3 = require("multer-s3");
const { fileFilterGen, logErrorOccurred } = require(rootPath +
  "/helpers/general");
const { error, success } = require(rootPath + "/helpers/language"); // constant messages

router.post("/", auth, async (req, res) => {
  try {
    const {
      cacao_plantation_id,
      cacaoSpecies,
      photos,
      videos,
      photosToAdd,
      videosToAdd,
      plantation_history,
      cacaoVaritey,
      recordId,
    } = req.body;

    const user_id = req.user?.id;

    const isExisting = await db.CacaoTraceabilityInformation.findOne({
      where: { cacao_plantation_id: cacao_plantation_id },
    });

    const plantationPhotos = await photosToAdd?.map((a) => {
      return {
        location: `${
          process.env.PUBLIC_BUCKET_URL ||
          "https://dimitra-public-images.s3.amazonaws.com/"
        }${a.location}`,
      };
    });

    const plantationVideos = await videosToAdd?.map((a) => {
      return {
        location: `${
          process.env.PUBLIC_BUCKET_URL ||
          "https://dimitra-public-images.s3.amazonaws.com/"
        }${a.location}`,
      };
    });

    const dataToSave = {
      cacao_plantation_id,
      cacaoSpecies,
      plantation_history,
      cacaoVaritey,
      recordId,
      user_id,
      photos: plantationPhotos,
      videos: plantationVideos,
    };

    if(isExisting) {
      dataToSave.photos = [
        ...photos,
        ...plantationPhotos
      ];
      dataToSave.videos = [
        ...videos,
        ...plantationVideos,
      ];
    }

    let traceabilityInfo = !isExisting
      ? await db.CacaoTraceabilityInformation.create(dataToSave)
      : await db.CacaoTraceabilityInformation.update(dataToSave, {
          where: { id: isExisting.id },
        });

    if (isExisting) {
      traceabilityInfo = JSON.parse(JSON.stringify(isExisting));
    }

    res.json(
      await successRespSync({
        msg: success.INSERTED,
        data: traceabilityInfo,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    console.log("error occured in catch*************", err.message);
    return res.status(error.code.SERVER_ERROR).json(await errorResp());
  }
});

router.get("/", auth, async (req, res) => {
  try {
    let { id: userId } = req.user;

    let traceability = await db.CacaoTraceabilityInformation.findAll({
      where: { user_id: userId },
    });

    // let deepCopy = JSON.parse(JSON.stringify(traceability));
    // if (deepCopy) {
    //   deepCopy.farmerTraceabilityQRLink = `https://trace.dimitra.world/trace-your-product/#/farmProfile?ID=${userId}&currentEnv=${process.env.NODE_ENV}`;
    // }

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

    await db.CacaoTraceabilityInformation.destroy({
      where: { id: id, user_id: userId },
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
