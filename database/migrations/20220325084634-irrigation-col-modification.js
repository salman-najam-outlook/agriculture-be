'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((transaction) => {
      return Promise.all([
        queryInterface.changeColumn(
          'irrigation',
          'waterSource',
          {
            type: Sequelize.INTEGER,
            allowNull: true,
          },
          { transaction }
        ),
        queryInterface.addConstraint(
          'irrigation',
          {
            fields: ['waterSource'],
            type: 'foreign key',
            name: 'waterSourceFK',
            references: {
              table: 'options',
              field: 'id',
            },
          },
          { transaction }
        ),
      ]);
    });

    // return queryInterface.sequelize.transaction(async (transaction) => {
    //   try {
    //     await Promise.all([

    //       // queryInterface.addConstraint(
    //       //   'irrigation',
    //       //   {
    //       //     fields: ['waterSource'],
    //       //     type: 'foreign key',
    //       //     name: 'waterSourceFK',
    //       //     references: {
    //       //       table: 'options',
    //       //       field: 'id',
    //       //     },
    //       //   },
    //       //   { transaction }
    //       // ),
    //     ]);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // });
  },

  async down(queryInterface, Sequelize) {},
};
