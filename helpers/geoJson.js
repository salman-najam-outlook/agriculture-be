/**
 * @description read buffer and convert into JSON
 */
exports.bufferToJSON =  (buffer) => {
  const fileData = buffer.toString("utf8");
  const json = JSON.parse(fileData);
  const headers =
    json?.features?.length && json?.features[0]?.properties
      ? Object.keys(json.features[0].properties)
      : [];
  const trees = json?.features?.map((f) => {
    return f.properties;
  });

  return { headers, trees };
};
