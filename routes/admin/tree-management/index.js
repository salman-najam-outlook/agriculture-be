const { Op } = require("sequelize");
const TREE_TYPES = require("../../../constants/TREE_TYPES");
const express = require("express");

const router = express.Router();
const db = require(rootPath + "/models");
const auth = require(rootPath + "/middleware/auth");
const { logErrorOccurred } = require(rootPath + "/helpers/general");
const { success } = require(rootPath + "/helpers/language");
const { successRespSync, serverError, errorRespSync } = require(rootPath +
  "/helpers/api");
const moment = require("moment");
const translatedReportData = require("../../../helpers/reportTranslator");
const XLSX = require("xlsx");
const path = require("path");
const fs = require("fs");
const generatePDF = require(rootPath + "/helpers/pdfGenerator");

const circularJson = (array) => {
  return JSON.stringify(array, (key, value) => {
    // If the value is an object with a "parent" property, it's a circular reference
    if (key === "parent" && typeof value === "object" && value !== null) {
      return; // return undefined to remove the circular reference
    }
    return value; // return the original value for other properties
  });
};
const getTrees = async (req, res, isAdmin) => {
  try {
    const userId = req.user?.id;
    const organization = req.user?.organization;

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
            treeName: { [Op.like]: `%${searchValue}%` },
          },
          {
            latitude: { [Op.like]: `%${searchValue}%` },
          },
          {
            longitude: { [Op.like]: `%${searchValue}%` },
          },
          {
            altitude: { [Op.like]: `%${searchValue}%` },
          },
          {
            notes: { [Op.like]: `%${searchValue}%` },
          },
          {
            country: { [Op.like]: `%${searchValue}%` },
          },
          {
            region: { [Op.like]: `%${searchValue}%` },
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
          where: isAdmin ? { organization } : {},
          attributes: ["id", "firstName","middleName", "lastName", "fullName"],
          model: db.user,
          as: "farmer",
        },
        {
          attributes: ["id", "firstName","middleName", "lastName", "fullName"],
          model: db.user,
          as: "lastUpdatedBy",
        },
      ],
      ...paginationQuery,
      order: [[sortColumn, sortOrder]],
    });

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: trees,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
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
      `../../../files/${Date.now()}-tree-management-report.xlsx`
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
        `../../../files/${Date.now()}-tree-management-report.csv`
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

router.get("/", auth, async (req, res) => {
  return await getTrees(req, res, true);
});

router.get("/export/:type", auth, async (req, res) => {
  try {
    const userId = req.user?.id;
    const organization = req.user?.organization;

    const { type } = req.params;
    const {
      page = 1,
      limit = 10000,
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

    let whereQuery = {};

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
          where: {
            organization,
          },
          attributes: ["firstName","middleName", "lastName", "fullName"],
          model: db.user,
          as: "farmer",
        },
      ],
      ...paginationQuery,
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

router.delete("/:id", auth, async function (req, res) {
  try {
    const { id } = req.params;

    await db.TreeDetail.destroy({
      where: {
        id: id,
      },
    });

    return res.json(successRespSync({ msg: "Tree detail deleted." }));
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

module.exports = router;
