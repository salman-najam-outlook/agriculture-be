var XLSX = require("xlsx");

/**
 * @description read buffer and convert into JSON
 */
exports.bufferToJSON = (buffer) => {
  var wb = XLSX.read(buffer);
  /* generate array of arrays */
  const data = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], {
    // header: [1,2,3,4],
    header: 1,
    raw: true,
  });
  return data;
};

/**
 * @description read file and convert into JSON
 */
exports.fileToJSON = (filePath) => {
  var wb = XLSX.read(filePath, { type: "file" });
  /* generate array of arrays */
  const data = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], {
    // header: 1,
    raw: true,
  });

  if (!Array.isArray(data)) {
    throw new Error("CustomError::Invalid file format");
  }
  return data;
};
