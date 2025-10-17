const { Op, where } = require("sequelize");
const TREE_TYPES = require("../../constants/TREE_TYPES");
const { deleteFileS3, uploadToS3 } = require("../../helpers/aws_s3");
const express = require("express");
const _ = require("lodash");
const XLSX = require("xlsx");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const db = require(rootPath + "/models");
const auth = require(rootPath + "/middleware/auth");
const { logErrorOccurred } = require(rootPath + "/helpers/general");
const { success } = require(rootPath + "/helpers/language");
const { successRespSync, serverError, errorRespSync } = require(rootPath +
  "/helpers/api");
const moment = require("moment");
const { treeDetailValidator, invalidTreeDetail } = require("../../helpers/validators/treeDetail");
const translatedReportData = require("../../helpers/reportTranslator");
const generatePDF = require(rootPath + "/helpers/pdfGenerator");
const { getSignedURL } = require(rootPath + "/helpers/aws_s3");
const axios = require('axios');
const { checkIfInteger } = require("../../helpers/general");
const { uploadSingleBuffer } = require(rootPath + "/middleware/upload");
const treeFileDataParser = require(rootPath + "/middleware/treeFileDataParser");
const { importErrorHandler } = require(rootPath +
  "/middleware/customErrorHandler");

const {
  WHITELIST_MIMETYPE,
  // ANIMAL_IMAGE_UPLOAD_PATH,
} = require(rootPath + "/helpers/constant");

let params = {
  // uploadpath: ANIMAL_IMAGE_UPLOAD_PATH,
  whiteListMimeTypes: WHITELIST_MIMETYPE.treeBulkUploadFiles,
  maxFileSize: 10,
  fieldName: "treesFile",
  // fields: [{ name: "treesFile", maxCount: 2 }],
};

let paramsImage = {
  whiteListMimeTypes: WHITELIST_MIMETYPE.images,
  maxFileSize: 10,
  fieldName: "treesFile",
};

const circularJson = (array) => {
  return JSON.stringify(array, (key, value) => {
    // If the value is an object with a "parent" property, it's a circular reference
    if (key === "parent" && typeof value === "object" && value !== null) {
      return; // return undefined to remove the circular reference
    }
    return value; // return the original value for other properties
  });
};

const getTreeImageObject = (treeId, images) => {
  return images.map((i) => {
    return {
      treeId,
      imageName: i.imageName,
      key: i.key,
      location: i.location,
      notes: i.notes,
      timestamp: i.timestamp,
    };
  });
};

const deleteFileFromS3 = async (keysArray = []) => {
  await Promise.all(
    keysArray.map(async (key) => {
      await deleteFileS3({ Bucket: process.env.AWS_PUBLIC_BUCKET, Key: key });
    })
  );
};

const addAndUpdateBulkUploadImages = async (imagesToInsert, notes) => {

  console.log(imagesToInsert, "imagesToInsert")
  for (const imageToInsert of imagesToInsert) {
    console.log("inside loop")

    const existingTreeDetail = await db.TreeDetail.findOne({
      where: {
        importImageName: imageToInsert.imageName
      }
    });

    console.log(existingTreeDetail, "existingTreeDetail")

    if (existingTreeDetail) {

      await db.TreeDetail.update({
        notes
      }, {
        where: {
          id: existingTreeDetail.id
        }
      });

      const existingImage = await db.TreeImage.findOne({
        where: {
          treeId: existingTreeDetail.id,
          key: imageToInsert.key
        }
      });

      console.log(existingImage, "existingImage")

      if (!existingImage) {

        console.log("inside existingImage")

        const image = getTreeImageObject(existingTreeDetail.id, [imageToInsert]);

        await db.TreeImage.create(image[0]);

        const updateObj = {
          treeId: existingTreeDetail.id,
          treeUUID: existingTreeDetail.treeUUID,
          treeName: existingTreeDetail.treeName,
          treeType: existingTreeDetail.treeType,
          plantationDate: existingTreeDetail.plantationDate,
          latitude: existingTreeDetail.latitude,
          longitude: existingTreeDetail.longitude,
          altitude: existingTreeDetail.altitude,
          notes: existingTreeDetail.notes,
          userId: existingTreeDetail.userId,
          farmId: existingTreeDetail.farmId,
          zoneId: existingTreeDetail.zoneId,
          country: existingTreeDetail.country,
          region: existingTreeDetail.region,
          updatedBy: existingTreeDetail.updatedBy,
          images: image
        };

        await db.TreeDetailUpdateHistory.create(updateObj);
      }
    }
  }
};


const addAndUpdateImages = async (
  existingTreeDetail,
  imagesToInsert,
  imagesToRemove,
  userId
) => {
  if (imagesToRemove?.length) {
    // await deleteFileFromS3(imagesToRemove);
    await db.TreeImage.destroy({
      where: {
        key: {
          [Op.in]: imagesToRemove,
        },
      },
    });
  }

  const imageArray = getTreeImageObject(existingTreeDetail.id, imagesToInsert);
  const newImageToInsert = [];
  for (const image of imageArray) {
    const existingImage = await db.TreeImage.findOne({
      where: {
        treeId: image.treeId,
        key: image.key,
      },
    });
    if (!existingImage) {
      newImageToInsert.push(image);
      continue;
    }
    db.TreeImage.update(image, {
      where: {
        id: existingImage.id,
      },
    });
  }
  let imageInsertRes = await db.TreeImage.bulkCreate(newImageToInsert, {});

  const existingImages = await db.TreeImage.findAll({
    where: {
      treeId: existingTreeDetail.id,
    },
    attributes: [
      "treeId",
      "imageName",
      "key",
      "location",
      "notes",
      "timestamp",
    ],
  });
  const updateObj = {
    treeId: existingTreeDetail.id,
    treeUUID: existingTreeDetail.treeUUID,
    treeName: existingTreeDetail.treeName,
    treeType: existingTreeDetail.treeType,
    plantationDate: existingTreeDetail.plantationDate,
    latitude: existingTreeDetail.latitude,
    longitude: existingTreeDetail.longitude,
    altitude: existingTreeDetail.altitude,
    notes: existingTreeDetail.notes,
    userId: existingTreeDetail.userId,
    farmId: existingTreeDetail.farmId,
    zoneId: existingTreeDetail.zoneId,
    country: existingTreeDetail.country,
    region: existingTreeDetail.region,
    updatedBy: userId,
    images: imageInsertRes,
  };

  await db.TreeDetailUpdateHistory.create(updateObj);
};

const generateExcelReport = async (fileType, response, req) => {
  try {
    if (req.headers.lang != "en") {
      response = translatedReportData(response, req.headers.lang);
    }
    const workbook = XLSX.utils.book_new();

    const directoryPath = "files";
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true });
    }

    const worksheet = XLSX.utils.json_to_sheet(Object.values(response));
    XLSX.utils.book_append_sheet(workbook, worksheet, "Tree Management");

    const filePath = path.resolve(
      __dirname,
      `../../files/${Date.now()}-tree-management-report.xlsx`
    );
    XLSX.writeFile(workbook, filePath);

    if (fileType === "xlsx") {
      return filePath;
    }

    if (fileType === "csv") {
      const csvWorkbook = XLSX.readFile(filePath);
      const csvWorksheet = csvWorkbook.Sheets[csvWorkbook.SheetNames[0]];
      const csvData = XLSX.utils.sheet_to_csv(csvWorksheet);
      const csvFilePath = path.resolve(
        __dirname,
        `../../files/${Date.now()}-tree-management-report.csv`
      );
      fs.writeFileSync(csvFilePath, csvData, "utf-8");
      return csvFilePath;
    }

    return;
  } catch (err) {
    console.log("Error processing request: " + err);
    throw err;
  }
};

const getTrees = async (req, res, isAdmin) => {
  try {
    const userId = req.user?.id;
    const organization = req.user?.organization;

    const {
      sortColumn = "createdAt",
      sortOrder = "DESC",
    } = req.query;

    const {
      farmId,
      zoneId,
      country,
      region,
      searchValue,
      treeType = TREE_TYPES.AVOCADO,
      fromDate,
      toDate = new Date(),
    } = req.query;

    let whereQuery = !isAdmin
      ? {
        userId,
      }
      : {};

    if (farmId) {
      whereQuery.farmId = farmId;
    }

    if (zoneId) {
      whereQuery.zoneId = zoneId;
    }

    if (region) {
      whereQuery.region = region;
    }

    if (country) {
      whereQuery.country = country;
    }

    if (treeType) {
      whereQuery.treeType = treeType;
    }

    if (searchValue) {
      whereQuery = {
        ...whereQuery,
        [Op.or]: [
          {
            treeName: {
              [Op.like]: `%${searchValue}%`,
            },
          },
          {
            latitude: {
              [Op.like]: `%${searchValue}%`,
            },
          },
          {
            longitude: {
              [Op.like]: `%${searchValue}%`,
            },
          },
          {
            altitude: {
              [Op.like]: `%${searchValue}%`,
            },
          },
          {
            notes: {
              [Op.like]: `%${searchValue}%`,
            },
          },
          {
            country: {
              [Op.like]: `%${searchValue}%`,
            },
          },
          {
            region: {
              [Op.like]: `%${searchValue}%`,
            },
          },
        ],
      };
    }

    if (fromDate && toDate) {
      const formattedFromDate = moment(fromDate).format("DD-MM-YYYY");
      const formattedToDate = moment(toDate).format("DD-MM-YYYY");

      whereQuery = {
        ...whereQuery,
        createdAt: {
          [Op.and]: {
            [Op.gte]: formattedFromDate,
            [Op.lte]: formattedToDate,
          },
        },
      };
    }
    let trees = await db.TreeDetail.findAndCountAll({
      where: whereQuery,
      include: [
        {
          attributes: ["imageName", "key", "location", "notes", "timestamp"],
          model: db.TreeImage,
          as: "images",
        },
        {
          attributes: ["id", "farmName", "area", "address"],
          model: db.user_farm,
          as: "farm",
        },
        {
          attributes: ["id", "geofenceName", "geofenceArea"],
          model: db.Geofence,
          as: "zone",
        },
        {
          where: isAdmin
            ? {
              organization,
            }
            : {},
          attributes: ["id", "firstName", "lastName","middleName", "fullName"],
          model: db.user,
          as: "farmer",
        },
        {
          attributes: ["id", "firstName", "lastName","middleName", "fullName"],
          model: db.user,
          as: "lastUpdatedBy",
        },
      ],
      order: [[sortColumn, sortOrder]],
    });

    return res.json(successRespSync({ msg: success.FETCH, data: trees }));
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
};
router.post("/", auth, async (req, res) => {
  let transaction = await db.sequelize.transaction();

  try {
    const userId = req.user?.id;

    const {
      treeName,
      plantationDate,
      latitude,
      longitude,
      altitude,
      notes,
      treeType = TREE_TYPES.AVOCADO,
      farmId,
      zoneId,
      clientTreeId,

      country,
      region,

      images = [],
    } = req.body;

    if (!farmId) throw Error("Farm is required");

    const doesFarmExists = await db.user_farm.findOne({
      where: {
        id: +farmId,
      },
    });

    if (!doesFarmExists) throw Error("Farm doesn't exists.");

    if (zoneId) {
      const doesZoneExists = await db.Geofence.findOne({
        where: {
          id: +zoneId,
          farmId: +farmId,
        },
      });

      if (!doesZoneExists) throw Error("Zone doesn't exists.");
    }

    const dataToSave = {
      treeName,
      plantationDate: plantationDate || new Date(),
      latitude,
      longitude,
      altitude,
      notes,
      treeType,

      farmId,
      zoneId,

      country: country || doesFarmExists.country,
      region: region || doesFarmExists.region,

      userId: doesFarmExists.technicianId || doesFarmExists.userId,
      updatedBy: req.user.id,
      clientTreeId,
    };

    const treeDetail = await db.TreeDetail.create(dataToSave, { transaction });

    // const imageArray = getTreeImageObject(treeDetail.id, images);
    // await db.TreeImage.bulkCreate(imageArray, { transaction });

    await transaction.commit();

    // if (images?.length) { //need to create images entry even if there are no images
    await addAndUpdateImages(treeDetail, images, [], userId);
    // }

    res.json(
      await successRespSync({ msg: success.INSERTED, data: treeDetail })
    );
  } catch (err) {
    await transaction.rollback();

    logErrorOccurred(__filename, err);
    console.log("error occured in catch*************", err.message);
    return serverError(res, err);
  }
});

router.post("/add-images/:treeId", auth, async (req, res) => {
  try {
    const userId = req.user?.id;

    const {
      imagesToInsert = [],
      imagesToRemove = [],
      imageName,
      notes,
    } = req.body;

    const { treeId } = req.params;

    const existingTreeDetail = await db.TreeDetail.findOne({
      where: {
        id: treeId,
      },
    });

    if (!existingTreeDetail) {
      throw new Error(" Tree Not found");
    }
    // const updatedData = await db.TreeDetail.update(
    //   {
    //     notes,
    //   },
    //   {
    //     where: {
    //       id: treeId,
    //     },
    //   }
    // );
    existingTreeDetail.notes = notes // this is needed to update the respective image note


    //let user add image history without image for now, we will update this according to client requirement later
    // if (imagesToInsert?.length || imagesToRemove.length) {
    await addAndUpdateImages(
      existingTreeDetail,
      imagesToInsert,
      imagesToRemove,
      userId
    );
    // }

    return res.json(
      successRespSync({ msg: success.INSERTED, data: existingTreeDetail })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.post("/bulk-upload-add-images", auth, async (req, res) => {
  try {
    const userId = req.user?.id;

    const {
      imageArr,
      notes
    } = req.body;

    await addAndUpdateBulkUploadImages(imageArr, notes);

    return res.json(successRespSync({ msg: success.INSERTED }));
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});


router.put("/:id", auth, async (req, res) => {
  let transaction = await db.sequelize.transaction();

  try {
    const userId = req.user?.id;

    const {
      treeName,
      plantationDate,
      latitude,
      longitude,
      altitude,
      notes,
      treeType = TREE_TYPES.AVOCADO,
      farmId,
      zoneId,

      country,
      region,

      imagesToInsert = [],
      imagesToRemove = [],
      clientTreeId,
    } = req.body;

    const { id } = req.params;


    if (!farmId) throw Error("Farm is required");

    const doesFarmExists = await db.user_farm.findOne({
      where: {
        id: +farmId,
      },
    });

    if (!doesFarmExists) throw Error("Farm doesn't exists.");

    if (zoneId) {
      const doesZoneExists = await db.Geofence.findOne({
        where: {
          id: +zoneId,
          farmId: +farmId,
        },
      });

      if (!doesZoneExists) throw Error("Zone doesn't exists.");
    }

    const existingTreeDetail = await db.TreeDetail.findOne({
      where: {
        id,
      },
    });

    if (!existingTreeDetail) {
      throw new Error(" Tree Not found");
    }

    const set = {
      treeName,
      plantationDate: plantationDate || new Date(),
      latitude,
      longitude,
      altitude,
      notes,
      treeType,

      farmId,
      zoneId,

      country: country || doesFarmExists.country,
      region: region || doesFarmExists.region,

      updatedBy: userId,
      clientTreeId,
    };

    const updatedData = await db.TreeDetail.update(
      Object.fromEntries(Object.entries(set).filter(([_, v]) => v != null)),
      {
        where: {
          id,
        },
        transaction,
      }
    );

    await transaction.commit();
    const updatedTreeRecord = await db.TreeDetail.findOne({
      where: {
        id,
      },
    });
    if (imagesToInsert?.length || imagesToRemove.length) {
      await addAndUpdateImages(
        updatedTreeRecord,
        imagesToInsert,
        imagesToRemove,
        userId
      );
    }

   

    return res.json(
      successRespSync({ msg: success.UPDATED, data: updatedData })
    );
  } catch (err) {
    await transaction.rollback();

    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.get("/", auth, async (req, res) => {
  return await getTrees(req, res, false);
});

// router.get("/admin", auth, async (req, res) => {
//   return await getTrees(req, res, true);
// });
router.get("/farm-view/:farmId", auth, async (req, res) => {
  try {
    const userId = req.user?.id;
    const { farmId } = req.params;

    let trees = await db.user_farm.findAll({
      attributes: ["id", "farmName"],
      where: {
        id: farmId,
      },
      include: [
        {
          attributes: [
            "id",
            "geofenceName",
            "geofenceArea",
            "geofenceRadius",
            "geofenceCenterLat",
            "geofenceCenterLog",
          ],
          model: db.Geofence,
          as: "zones",
          include: [
            {
              attributes: ["id", "lat", "log"],
              model: db.GeofenceCoordinate,
              as: "geofence_coordinates",
            },
          ],
        },
        {
          attributes: ["id", "latitude", "longitude", 'clientTreeId'],
          model: db.TreeDetail,
          as: "trees",
        },
      ],
    });

    return res.json(successRespSync({ msg: success.FETCH, data: trees }));
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.get("/export/:type", auth, async (req, res) => {
  try {
    const userId = req.user?.id;
    const organization = req.user?.organization;

    const { type } = req.params;
    const {
      sortColumn = "createdAt",
      sortOrder = "DESC",
    } = req.query;

    const {
      farmId,
      zoneId,
      country,
      region,
      searchValue,
      treeType = TREE_TYPES.AVOCADO,
      fromDate,
      toDate = new Date(),
    } = req.query;

    let whereQuery = { userId };
    if (farmId) {
      whereQuery.farmId = farmId;
    }

    if (zoneId) {
      whereQuery.zoneId = zoneId;
    }

    if (region) {
      whereQuery.region = region;
    }

    if (country) {
      whereQuery.country = country;
    }

    if (treeType) {
      whereQuery.treeType = treeType;
    }

    if (searchValue) {
      whereQuery = {
        ...whereQuery,
        [Op.or]: [
          {
            treeName: {
              [Op.like]: `%${searchValue}%`,
            },
          },
          {
            latitude: {
              [Op.like]: `%${searchValue}%`,
            },
          },
          {
            longitude: {
              [Op.like]: `%${searchValue}%`,
            },
          },
          {
            altitude: {
              [Op.like]: `%${searchValue}%`,
            },
          },
          {
            notes: {
              [Op.like]: `%${searchValue}%`,
            },
          },
          {
            country: {
              [Op.like]: `%${searchValue}%`,
            },
          },
          {
            region: {
              [Op.like]: `%${searchValue}%`,
            },
          },
        ],
      };
    }

    if (fromDate && toDate) {
      const formattedFromDate = moment(fromDate).format("DD-MM-YYYY");
      const formattedToDate = moment(toDate).format("DD-MM-YYYY");

      whereQuery = {
        ...whereQuery,
        createdAt: {
          [Op.and]: {
            [Op.gte]: formattedFromDate,
            [Op.lte]: formattedToDate,
          },
        },
      };
    }
    let trees = await db.TreeDetail.findAll({
      where: whereQuery,
      attributes: [
        "id",
        "treeUUID",
        "treeName",
        "treeType",
        "plantationDate",
        "latitude",
        "longitude",
        "altitude",
        "notes",
        "createdAt",
        'clientTreeId',
      ],
      include: [
        {
          attributes: ["location"],
          model: db.TreeImage,
          as: "images",
        },
        {
          attributes: ["id", "farmName"],
          model: db.user_farm,
          as: "farm",
        },
        {
          attributes: ["id", "geofenceName"],
          model: db.Geofence,
          as: "zone",
        },
        {
          attributes: ["firstName", "lastName","middleName", "fullName"],
          model: db.user,
          as: "farmer",
        },
      ],
      order: [[sortColumn, sortOrder]],
    });

    trees = JSON.parse(circularJson(trees));
    trees = trees.map((tree) => {
      return {
        "Tree ID": tree.clientTreeId,
        "Tree Name": tree.treeName,
        "Tree Type": tree.treeType,
        "Tree UUID": tree.treeUUID,
        Latitude: tree.latitude,
        Longitude: tree.longitude,
        Altitude: tree.altitude,
        "Plantation Date": moment(tree.plantationDate).format("DD-MM-YYYY"),
        Notes: tree.notes,
        "Farm ID": tree.farm?.id,
        "Farm Name": tree.farm?.farmName,
        "Zone ID": tree.zone?.id,
        "Zone Name": tree.zone?.geofenceName,
        "Farmer Name": tree.farmer?.fullName,
        // Images: tree.images ?. map((image) => image.location).join(";")
      };
    });

    let filepath = "";
    if (type === "pdf") {
      const _data = {
        title: "Tree Management",
        subHeader: {},
        tableData: trees,
      };
      const pdfData = await generatePDF(_data, req);
      if (!pdfData) {
        return res.json(
          errorRespSync({ msg: "PDF report generation failed." })
        );
      } else {
        res.writeHead(200, {
          "Content-Type": "application/octet-stream",
          "Content-Disposition": "attachment; filename=" + pdfData.fileName,
        });
        fs.createReadStream(pdfData.path).pipe(res);
        return;
      }
    } else if (type === "csv") {
      filepath = await generateExcelReport("csv", trees, req);

      res.writeHead(200, {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename=${Date.now()}-Tree-Management.csv`,
      });
      fs.createReadStream(filepath).pipe(res);
      return;
    } else if (type === "xlsx") {
      filepath = await generateExcelReport("xlsx", trees, req);

      res.writeHead(200, {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename=${Date.now()}-Tree-Management.xlsx`,
      });
      fs.createReadStream(filepath).pipe(res);
      return;
    }
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.get("/update-history/:treeId", auth, async (req, res) => {
  try {
    const treeId = req.params?.treeId;

    const {
      page = 1,
      limit = 10,
      sortColumn = "createdAt",
      sortOrder = "DESC",
    } = req.query;
    const paginationQuery = {
      offset: 0,
      limit: 10,
    };
    if (page && limit) {
      paginationQuery.offset = parseInt((page - 1) * limit);
      paginationQuery.limit = parseInt(limit);
    }

    let trees = await db.TreeDetailUpdateHistory.findAndCountAll({
      where: {
        treeId: +treeId,
      },
      include: [
        {
          attributes: ["id", "farmName", "area", "address"],
          model: db.user_farm,
          as: "farm",
        },
        {
          attributes: ["id", "geofenceName", "geofenceArea"],
          model: db.Geofence,
          as: "zone",
        },
        {
          attributes: ["id", "firstName", "lastName","middleName", "fullName"],
          model: db.user,
          as: "farmer",
        },
        {
          attributes: ["id", "firstName", "lastName","middleName", "fullName"],
          model: db.user,
          as: "lastUpdatedBy",
        },
      ],
      ...paginationQuery,
      order: [[sortColumn, sortOrder]],
    });

    return res.json(successRespSync({ msg: success.FETCH, data: trees }));
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.get("/get-upload-history", auth, async (req, res) => {
  return await getUploadedTreesHistories(req, res, false);
});

router.get('/fetch-upload-history-file', async (req, res) => {
  try {
    // Fetch the Excel file from S3

    // Get the last portion of the URL after the last "/"
    const filename = req.query.fileLocation.split("/").pop();

    // Get the file extension by splitting the filename at the last "."
    const fileExtension = filename.split(".").pop();

    console.log(fileExtension); // Output: pbf


    const response = await axios.get(req.query.fileLocation, {
      responseType: 'arraybuffer'
    });


    if (fileExtension == 'xlsx') {
      // Set the appropriate headers
      res.setHeader('Content-disposition', 'attachment; filename=example.xlsx');
      res.setHeader('Content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

    } else if (fileExtension == 'csv') {
      res.setHeader('Content-disposition', 'attachment; filename=example.csv');
      res.setHeader('Content-type', 'text/csv');
    } else if (fileExtension == 'geojson') {
      res.setHeader('Content-disposition', 'attachment; filename=example.geojson');
      res.setHeader('Content-type', 'application/json');
    } else if (fileExtension == 'topojson') {
      res.setHeader('Content-disposition', 'attachment; filename=example.topojson');
      res.setHeader('Content-type', 'application/json');
    } else if (fileExtension == 'gpkg') {
      res.setHeader('Content-disposition', 'attachment; filename=example.geopackage');
      res.setHeader('Content-type', 'application/octet-stream');
    } else if (fileExtension == 'pbf') {
      res.setHeader('Content-disposition', 'attachment; filename=example.pbf');
      res.setHeader('Content-type', 'application/x-protobuf');
    }


    // Send the file as the response
    res.send(response.data);
  } catch (error) {
    console.error('Error fetching file:', error);
    res.status(500).send('Error fetching file');
  }
});

router.get("/get-upload-history/:historyId", auth, async (req, res) => {
  try {
    const { historyId } = req.params;

    const history = await db.TreeUploadHistory.findOne({
      where: {
        id: historyId
      }
    });
    return res.json(successRespSync({ msg: success.FETCH, data: history }));

  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.get("/get-uploaded-trees", auth, async (req, res) => {
  return await getUploadedTrees(req, res, false);
});

router.get("/:id", async (req, res) => {
  try {
    let { id } = req.params;

    let treeDetail = await db.TreeDetail.findOne({
      where: {
        id: id,
      },
      include: [
        {
          attributes: ["imageName", "key", "location", "notes", "timestamp"],
          model: db.TreeImage,
          as: "images",
        },
        {
          attributes: ["id", "farmName", "area"],
          model: db.user_farm,
          as: "farm",
        },
        {
          attributes: ["id", "geofenceName", "geofenceArea"],
          model: db.Geofence,
          as: "zone",
        },
        {
          attributes: ["id", "firstName", "lastName","middleName", "fullName"],
          model: db.user,
          as: "farmer",
        },
        {
          attributes: ["id", "firstName", "lastName","middleName", "fullName"],
          model: db.user,
          as: "lastUpdatedBy",
        },
      ],
    });
    if (!treeDetail) {
      throw new Error("Tree Detail Not Found");
    }

    return res.json(successRespSync({ msg: success.FETCH, data: treeDetail }));
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.delete("/:id", auth, async function (req, res) {
  try {
    const { id: userId } = req.user;
    const { id } = req.params;

    await db.TreeDetail.destroy({
      where: {
        id: id,
        userId: userId,
      },
    });

    return res.json(successRespSync({ msg: "Tree detail deleted." }));
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.post(
  "/bulkUpload",
  auth,
  uploadSingleBuffer(params),
  importErrorHandler,
  treeFileDataParser,
  async (req, res, next) => {
    try {
      const farmId = req.body.farmId;
      if (!farmId) throw Error("Farm is required");

      const doesFarmExists = await db.user_farm.findOne({
        where: {
          id: +farmId,
        },
      });
      if (!doesFarmExists) throw Error("Farm doesn't exists.");

      const zoneId = req.body.zoneId;
      let geofenceName = '';
      if (zoneId != '') {

        const doesZoneExists = await db.Geofence.findOne({
          where: {
            id: +zoneId,
            farmId: +farmId,
          },
        });
        if (!doesZoneExists) throw Error("Zone doesn't exists.");

        geofenceName = doesZoneExists?.geofenceName;
      }

      const columns = [
        "Name (PictureTag)",
        "Farm ID",
        "Zone ID",
        "Timestamp",
        "Datestamp",
        "Latitude",
        "Longitude",
        "Altitude",
        "Avocado Seedling Name",
        // 'OrchaLatituderd Farm Centroid Coordinates (X,Y)'
      ];

      const user = req.user;
      if (!req.body.trees) {
        const msg = "Error acquiring data from file";
        return res.json(errorRespSync({ msg }));
      }

      const MAX_ROWS = 100000;
      const recordCount = req.body.trees.length;

      if (recordCount > MAX_ROWS || recordCount === 0) {
        const msg = `Row count not within limit. Expected 1 - ${MAX_ROWS}`;
        return res.json(errorRespSync({ msg }));
      }
      if (columns.some((column) => !req.body.headers.includes(column))) {
        const msg = "Invalid template file, missing columns!";
        return res.json(errorRespSync({ msg: msg }));
      }

      let trees = req.body.trees;
      const originalName = req.file.originalname;
      try {
        let uploadRes = await uploadToS3(
          `${req.file.originalname}`,
          req.file.buffer
        );

        const treesUploadHistory = {
          numberOfRowsFailed: 0,
          numberOfRowsInserted: 0,
          farmId: req.body.farmId,
          zoneId: req.body.zoneId == '' ? null : req.body.zoneId,
          fileName: req.file.originalname,
          userId: user.id,
          location: uploadRes.Location,
          key: uploadRes.Key,
        };
        const uploadHistory = await db.TreeUploadHistory.create(
          treesUploadHistory,
        );

        const treesDatas = trees.map((tree) => {

          // Given timestamp and datestamp
          const timestamp = tree["Timestamp"];
          const datestamp = tree["Datestamp"];

          let combinedDateTimeStr = null;
          let plantationDate = new Date();
          if (datestamp) {
            // Combine datestamp and timestamp
            combinedDateTimeStr = `${datestamp}`;
          }
          // Format the timestamp
          if (datestamp && timestamp) {
            const timeStr = String(timestamp).padStart(6, '0'); // Ensure leading zeros if needed
            const timeFormatted = `${timeStr.slice(0, 2)}:${timeStr.slice(2, 4)}:${timeStr.slice(4)}`;
            combinedDateTimeStr = `${datestamp} ${timeFormatted}`;
          }

          if (combinedDateTimeStr) {
            var parsedDate = moment(combinedDateTimeStr, 'YYYYMMDD HH:mm:ss');
            if (parsedDate.isValid()) {
              plantationDate = parsedDate;
            }
          }




          return {
            farmId: req.body.farmId,
            farmName: doesFarmExists.farmName,
            zoneId: req.body.zoneId == '' ? null : req.body.zoneId,
            zoneName: geofenceName,
            latitude: checkIfInteger(tree["Latitude"]) ? tree["Latitude"] : null,
            longitude: checkIfInteger(tree["Longitude"]) ? tree["Longitude"] : null,
            altitude: checkIfInteger(tree["Altitude"]) ? tree["Altitude"] : null,
            treeName: tree["Avocado Seedling Name"],
            importImageName: tree["Name (PictureTag)"],
            clientFarmId: tree["Farm ID"],
            clientZoneId: tree["Zone ID"],
            clientTimestamp: tree["Timestamp"],
            clientDatestamp: tree["Datestamp"],
            plantationDate: plantationDate,
            userId: doesFarmExists.technicianId || doesFarmExists.userId,
            uploadhistoryId: uploadHistory.id,
            clientTreeId: tree['Tree ID'],
            updatedBy: req.user.id,
          }
        }

        );

        let numberOfRowsInserted = 0;
        let numberOfRowsFailed = 0;
        let errors = [];
        // for (const treesData of treesDatas) {

        for (const [index, treesData] of treesDatas.entries()) {
          if (invalidTreeDetail(treesData)) {
            continue;
          }

          let singleTreesData = treesData;

          numberOfRowsInserted = numberOfRowsInserted + 1;
          singleTreesData = {
            ...singleTreesData,
            status: "Success",
          };
          await db.TreeDetail.create(singleTreesData);

          //working
          // const error = treeDetailValidator(treesData);
          // let singleTreesData = treesData;
          // if (error.length != 0) {

          //   singleTreesData = {
          //     ...singleTreesData,
          //     status: "Failed",
          //   };
          //   const insertedData = await db.TreeDetail.create(singleTreesData,);

          //   errors.push({
          //     data: singleTreesData,
          //     row: index + 1,
          //     id: insertedData.id,
          //     error,
          //   });
          //   numberOfRowsFailed = numberOfRowsFailed + 1;
          // } else {
          //   numberOfRowsInserted = numberOfRowsInserted + 1;
          //   singleTreesData = {
          //     ...singleTreesData,
          //     status: "Success",
          //   };
          //   await db.TreeDetail.create(singleTreesData);
          // }


          // if (error.length == 0) {
          //   numberOfRowsInserted = numberOfRowsInserted + 1;
          //   singleTreesData = {
          //     ...singleTreesData,
          //     status: "success",
          //   };
          //   await db.TreeDetail.create(singleTreesData, );
          // } else {
          //   errors.push({
          //     data: singleTreesData,
          //     row: index + 1,
          //     error,
          //   });
          //   numberOfRowsFailed = numberOfRowsFailed + 1;
          //   singleTreesData = {
          //     ...singleTreesData,
          //     status: "fail",
          //   };
          //   //await db.TreeDetail.create(singleTreesData, {transaction});
          // }
        }

        await db.TreeUploadHistory.update({
          numberOfRowsFailed,
          numberOfRowsInserted,
          errors: JSON.stringify(errors)
        }, {
          where: {
            id: uploadHistory.id
          }
        });
        // await db.TreeDetail.bulkCreate(treesData, {transaction});

        return res.json(
          successRespSync({
            msg: "success",
            data: {
              originalName,
              numberOfRowsFailed,
              numberOfRowsInserted,
              uploadHistoryId: uploadHistory.id,
              errors,
            },
          })
        );
      } catch (err) {
        console.log("error", err);
        logErrorOccurred(__filename, err);
        return serverError(res);
      }
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res);
    }
  }
);

const getUploadedTreesHistories = async (req, res, isAdmin) => {
  try {
    const userId = req.user?.id;
    const organization = req.user?.organization;

    const {
      page = 1,
      limit = 10,
      searchValue,
      sortColumn = "createdAt",
      sortOrder = "DESC",
    } = req.query;


    const paginationQuery = {
      offset: 0,
      limit: 10,
    };

    if (page && limit) {
      paginationQuery.offset = parseInt((page - 1) * limit);
      paginationQuery.limit = parseInt(limit);
    }


    let whereQuery = !isAdmin
      ? {
        userId,
      }
      : {};

      if (searchValue) {
      whereQuery = {
        ...whereQuery,
        [Op.or]: [
          {
            fileName: {
              [Op.like]: `%${searchValue}%`,
            },
          },
          {
            location: {
              [Op.like]: `%${searchValue}%`,
            },
          },
        ],
      };
    }

    let trees = await db.TreeUploadHistory.findAndCountAll({
      where: whereQuery,
      attributes: ["id", "userId", "farmId", "zoneId", "fileName", "location"],
      include: [
        //   {
        //     attributes: ["id", "geofenceName", "geofenceArea"],
        //     model: db.Geofence,
        //     as: "zone",
        //   },
        //   {
        //     where: isAdmin
        //       ? {
        //           organization,
        //         }
        //       : {},
        //     attributes: ["id", "firstName", "lastName","middleName", "fullName"],
        //     model: db.user,
        //     as: "farmer",
        //   },
        //   {
        //     attributes: ["id", "firstName", "lastName","middleName", "fullName"],
        //     model: db.user,
        //     as: "lastUpdatedBy",
        //   },
      ],
      ...paginationQuery,
      order: [[sortColumn, sortOrder]],
    });

    return res.json(successRespSync({ msg: success.FETCH, data: trees }));
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
};


const getUploadedTrees = async (req, res, isAdmin) => {
  try {
    const userId = req.user?.id;
    const organization = req.user?.organization;

    const {
      sortColumn = "createdAt",
      sortOrder = "DESC",
    } = req.query;

    const whereQuery = {};
    if (req.query.uploadHistoryId) {
      whereQuery.uploadhistoryId = req.query.uploadHistoryId;
    }
    let trees = await db.TreeDetail.findAndCountAll({
      where: whereQuery,
      include: [
        {
          attributes: ["id", "geofenceName", "geofenceArea"],
          model: db.Geofence,
          as: "zone",
        },
        {
          attributes: ["id", "firstName", "lastName","middleName", "fullName"],
          model: db.user,
          as: "farmer",
        },
        {
          attributes: ["id", "firstName", "lastName","middleName", "fullName"],
          model: db.user,
          as: "lastUpdatedBy",
        },
      ],
      order: [[sortColumn, sortOrder]],
    });

    return res.json(successRespSync({ msg: success.FETCH, data: trees }));
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
};

router.post(
  "/uploadSingleTreeImage",
  uploadSingleBuffer(paramsImage),
  auth,
  async (req, res) => {
    try {
      const bucket = process.env.AWS_PRIVATE_BUCKET;
      let fileNameParts, finalFileName;

      if (req.file.originalname.includes(".png")) {
        fileNameParts = req.file.originalname.split(".png");
        finalFileName = `${fileNameParts[0]}_${new Date().getTime()}.png`;
      } else if (req.file.originalname.includes(".jpg")) {
        fileNameParts = req.file.originalname.split(".jpg");
        finalFileName = `${fileNameParts[0]}_${new Date().getTime()}.jpg`;
      } else if (req.file.originalname.includes(".jpeg")) {
        fileNameParts = req.file.originalname.split(".jpeg");
        finalFileName = `${fileNameParts[0]}_${new Date().getTime()}.jpeg`;
      }
      let uploadRes = await uploadToS3(
        `treeImages/${finalFileName}`,
        req.file.buffer
      );

      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: uploadRes,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);
router.put("/update-history/:historyId", auth, async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { historyId } = req.params;

    const { imageArr = [], removedArr = [], notes } = req.body;

    const existingLog = db.TreeDetailUpdateHistory.findOne({
      where: {
        id: historyId,
      },
    });

    const filteredImages = [];

    if (removedArr?.length) {
      const existingImages = existingLog.images;
      filteredImages = existingImages.filter(
        (img) => !removedArr.includes(img.key)
      );
    }

    filteredImages.push(...getTreeImageObject(existingLog.treeId, imageArr));

    await db.TreeDetailUpdateHistory.update(
      {
        images: filteredImages,
        notes: notes,
      },
      {
        where: {
          id: historyId,
        },
      }
    );

    return res.json(
      successRespSync({ msg: "Tree  Image Update history detail updated." })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.delete("/update-history/:historyId", auth, async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { historyId } = req.params;

    await db.TreeDetailUpdateHistory.destroy({
      where: {
        id: historyId,
      },
    });

    return res.json(
      successRespSync({ msg: "Tree  Image Update history detail deleted." })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

module.exports = router;
