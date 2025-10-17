"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const requests = [
      {
        request_id: "RE-00101432",
        fix: "RE-JOSE1432"
      },
      {
        request_id: "RE-00101433",
        fix: "RE-JOSE1433"
      },
      {
        request_id: "RE-00101434",
        fix: "RE-JOSE1434"
      },
      {
        request_id: "RE-00101435",
        fix: "RE-GAUR1435"
      },
      {
        request_id: "RE-00101437",
        fix: "RE-GAUR1437"
      },
      {
        request_id: "RE-00101438",
        fix: "RE-GAUR1438"
      },
      {
        request_id: "RE-00101439",
        fix: "RE-GAUR1439"
      },
    ];

    for await (const {request_id, fix} of requests) {
        await queryInterface.bulkUpdate('tree_mapping_requests', 
            {
                request_id: fix
            },
            {
                request_id
            }
        );
    }
  },

  async down(queryInterface, Sequelize) {},
};
