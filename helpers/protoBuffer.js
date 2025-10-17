const Pbf = require("pbf");
const geobuf = require("geobuf");

/**
 * @description read buffer and convert into JSON
 */
exports.bufferToJSON =  (buffer) => {
  // Parse the PBF buffer
  const data = new Pbf(buffer);
  const geojson = geobuf.decode(data);
  const headers =
    geojson?.features?.length && geojson?.features[0]?.properties
      ? Object.keys(geojson.features[0].properties)
      : [];
  const trees = geojson?.features?.map((f) => {
    return f.properties;
  });
  return { headers, trees };
};
