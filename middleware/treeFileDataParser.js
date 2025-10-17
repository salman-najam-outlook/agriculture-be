const fs = require("fs");
const path = require("path");
const { serverError } = require(rootPath + "/helpers/api");
const geoJson = require("../helpers/geoJson");
const topoJson = require("../helpers/topoJson");
const protoBuffer = require("../helpers/protoBuffer");
const { GeoPackageAPI } = require("@ngageoint/geopackage");
const xlsx = require(rootPath + "/helpers/xlsx");

module.exports = async (req, res, next) => {
  try {
    if (
      ![
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
        "text/csv",
        "application/geo+json",
        "application/octet-stream",
        "application/vnd.ms-excel"
      ].includes(req.file.mimetype)
    ) {
      next();
    }

    const { buffer, originalname } = req.file;
    const extension = originalname.split(".").pop();

    let response = {
      trees: [],
      headers: [],
    };
    if (extension === "csv" || extension === "xlsx" || extension === "xls") {
      const data = xlsx.bufferToJSON(buffer);
      response.headers = data.shift();
      data.forEach((row) => {
        if (row.length) {
          response.trees.push(
            response.headers.reduce((o, k, i) => {
              o[k] = row[i];
              return o;
            }, {})
          );
        }
      });
    }
    else if (extension === "geojson") {
      response = geoJson.bufferToJSON(buffer);
    } else if (extension === "topojson") {
      response = topoJson.bufferToJSON(buffer);
    } else if (extension === "pbf") {
      response = protoBuffer.bufferToJSON(buffer);
    } else if (extension === "gpkg") {
      // Write the buffer to a temporary file
      const tempFilePath = path.resolve("files", originalname); // Change the temporary file path as needed
      fs.writeFileSync(tempFilePath, buffer);

      const geoPackage = await GeoPackageAPI.open(tempFilePath);
      const featureTables = geoPackage.getFeatureTables();

      // Loop through each feature table
      for (const tableName of featureTables) {
        // Open the feature table
        const featureDao = geoPackage.getFeatureDao(tableName);
        response.headers = featureDao.columns;
        // Get the features from the feature table
        const features = featureDao.queryForAll();
        response.trees.push(...features);
        // Do something with the features
      }

      // Close the GeoPackage when done
      geoPackage.close();

      fs.unlinkSync(tempFilePath);
    } else {
      throw new Error("Input file not supported");
    }

    req.body = {
      ...req.body,
      trees: response.trees || [],
      headers: response.headers || [],
    };

    next();
  } catch (err) {
    console.error("tree data parser middleware catch err *********", err.message);
    return serverError(res);
  }
};
