/**
 * @description read buffer and convert into JSON
 */
exports.bufferToJSON =  (buffer) => {
  const fileData = buffer.toString("utf8");
  const json = JSON.parse(fileData);
  const geometries = [];
  Object.keys(json?.objects).forEach((keys) => {
    if (json.objects[keys].geometries?.length) {
      const g = json.objects[keys].geometries;
      return geometries.push(...g);
    }
  });
  const headers =
    geometries.length && geometries[0]?.properties
      ? Object.keys(geometries[0].properties)
      : [];
  const trees = geometries?.map((f) => {
    return f.properties;
  });

  return { headers, trees };
};
