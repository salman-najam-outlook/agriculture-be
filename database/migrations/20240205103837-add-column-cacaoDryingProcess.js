"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("cacao_drying_process", "dryingType", {
      type: Sequelize.INTEGER,
      allowNull: true,
      comment: "Unique ID for dryingType table",
      references: {
        model: "drying_type",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
    const cdpArray = (await queryInterface.sequelize.query('select cdp.id, cdp.typeOfDrying from cacao_drying_process cdp where cdp.typeOfDrying is not NULL ;'))[0];
    const dryingTypeList = (await queryInterface.sequelize.query('select dt.name, dt.id from drying_type dt ;'))[0];

    const finalArray = cdpArray.map((cdp) => {
      const matchingItem = dryingTypeList?.find(type => type.name === cdp.typeOfDrying);
      return { ...matchingItem, cdpId: cdp.id };
    })

    for (const fa of finalArray) {
      if(fa.id) {
        await queryInterface.sequelize.query(`UPDATE cacao_drying_process cdp SET dryingType=${fa.id} WHERE cdp.id = ${fa.cdpId}`);
      }
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("cacao_drying_process", "dryingType")
  },
};
