const db = require(rootPath + "/models");

async function generateUniqueId() {
  try {
    const lastRecord = await db.TraceabilityExternalId.findOne({
      order: [["id", "DESC"]],
    });

    let newId = "EID-000001";

    if (lastRecord) {
      const lastId = lastRecord.id;
      const lastNumber = parseInt(lastId.split("-")[1]);
      const nextNumber = lastNumber + 1;
      newId = `EID-${nextNumber.toString().padStart(6, "0")}`;
    }

    return newId;
  } catch (error) {
    console.log(error);
  }
};

module.exports = async function insertTraceabilityExternalId(type, type_id) {
  try {
    const id = await generateUniqueId();

    const existingRecord = await db.TraceabilityExternalId.findOne({
      where: { id },
    });

    if (!existingRecord) {
      return await db.TraceabilityExternalId.create({ id, type, type_id });
    } else {
      return await db.TraceabilityExternalId.update({ id, type, type_id });
    }
  } catch (error) {
    console.log(error);
  }
};
