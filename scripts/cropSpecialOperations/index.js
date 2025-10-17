#!/usr/bin/env node
const app = require('../../app');
const spreadsheetId = '1UP0Iz61s_JIBzeGZgxxYxLzihxhOCxf5PVfKdS_0zEk';
const _ = require('lodash');
const db = require(rootPath + '/models');
const {
  getAuthToken,
  getSheetsName,
  getSpreadSheetValues,
} = require('../../components/googleSheetsService');

async function main() {
  try {
    const auth = await getAuthToken();

    const { sheets } = await getSheetsName(spreadsheetId, auth);
    const allSheetNames = sheets
      ?.filter(({ properties }) => properties.title == 'potato-nepal') //for temporary
      // ?.filter(({ properties }) => /\w*\s*\-\s*\w*/.test(properties.title))
      // ?.slice(0, 40)
      ?.map(({ properties }) => properties.title);

    // get sheet data
    const { data } = await getSpreadSheetValues({
      auth,
      spreadsheetId,
      sheetName: allSheetNames,
    });

    // get crop type id from option table
    const cropTypesOptions = await db.Option.findAll({
      raw: true,
      attribute: ['id', 'name'],
      where: { groupName: 'crop-type' },
    });
    if (_.isEmpty(cropTypesOptions))
      throw new Error('no crop types found in option table');

    // get crop practices id from option table
    const practiceOptions = await db.Option.findAll({
      raw: true,
      attribute: ['id', 'name'],
      where: { groupName: 'CropPractices' },
    });
    if (_.isEmpty(practiceOptions))
      throw new Error('no Practices found in option table');

    let saveData = [];
    for (const [index, sheetData] of data.valueRanges.entries()) {
      console.log(index);
      const result = await importSpecialOperations(
        sheetData,
        practiceOptions,
        cropTypesOptions
      );
      if (_.isEmpty(result)) continue;
      saveData = [...saveData, ...result];
    }

    var transaction = await db.sequelize.transaction();

    await db.SpecialOperationRecommendation.destroy({
      truncate: true,
      transaction,
    });
    await db.SpecialOperationRecommendation.bulkCreate(saveData, {
      updateOnDuplicate: ['summary', 'period'],
      transaction,
    });

    await transaction.commit();

    process.exit();
  } catch (err) {
    await transaction?.rollback();
    console.log(err);
    process.exit();
  }
}

/**
 * @description get practice id by practice name
 * @param {*} practice
 * @param {*} practicesArray
 * @returns
 */
function getPracticeId(practice, practicesArray) {
  const data = practicesArray?.filter(
    ({ name }) =>
      name.toString().toLowerCase() == practice.toString().toLowerCase()
  );

  if (_.isEmpty(data)) return null;
  return data[0].id;
}
/**
 * @description get crop type id by crop type name
 * @param {*} cropType
 * @param {*} cropTypeArray
 * @returns
 */
function getCropTypeId(cropType, cropTypeArray) {
  const data = cropTypeArray?.filter(
    ({ name }) =>
      name.toString().toLowerCase() == cropType.toString().toLowerCase()
  );

  if (_.isEmpty(data)) return null;
  return data[0].id;
}

/**
 * @description get formatted array for bulk creating data
 * @param {*} result
 * @param {*} practiceOptions
 * @param {*} cropTypeOptions
 * @returns
 */
async function importSpecialOperations(
  result,
  practiceOptions,
  cropTypeOptions
) {
  const cropType = result?.values[2][3]?.toString().trim();
  result = result?.values.filter(
    ([name]) => name == 'Method & period of practice' || name == 'Practice'
  );
  let [practiceArr, periodArr] = result;

  const mappedData = practiceArr?.reduce(function (final, current, index) {
    if (index < 3) return final;

    const practice = practiceArr[index];
    const period = periodArr[index]
      ?.split('•')
      .filter((name) => !_.isEmpty(name))
      .map((name) => name?.trim());

    const cropTypeId = getCropTypeId(cropType, cropTypeOptions);
    const cropPracticeId = getPracticeId('Earthing', practiceOptions);
    // const practiceId = getPracticeId(practice, practiceOptions);

    return (final = [
      ...final,
      {
        practice,
        period,
        cropTypeId,
        cropPracticeId,
      },
    ]);
  }, []);

  return mappedData;
}

main();
