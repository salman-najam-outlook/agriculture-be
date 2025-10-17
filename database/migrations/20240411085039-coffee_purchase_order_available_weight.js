'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Step 1: Calculate the used weight for each order
    // This involves a complex query that joins the three tables and sums up the totalCoffeeCherryQty for each order
    const usedWeights = await queryInterface.sequelize.query(`
      SELECT 
        bo.id AS orderId,
        COALESCE(SUM(bp.totalCoffeeCherryQty), 0) AS usedWeight
      FROM 
        BuyingStationOrders bo
      LEFT JOIN 
        BuyingStationProcessingBatchAndOrders bpo ON bo.id = bpo.orderId
      LEFT JOIN 
        BuyingStationProcessingBatches bp ON bpo.processingBatchId = bp.id
      GROUP BY 
        bo.id
    `, { type: Sequelize.QueryTypes.SELECT });

    for (const weight of usedWeights) {
      // Assuming `weight.coffeeCherryQty` needs to be fetched in the same SQL query as `usedWeight` or from another data source
    
      // Fetch coffeeCherryQty for the current order
      const orderDetails = await queryInterface.sequelize.query(`
        SELECT coffeeCherryQty
        FROM BuyingStationOrders
        WHERE id = ${weight.orderId}
      `, { type: Sequelize.QueryTypes.SELECT });
    
      if(orderDetails.length > 0) {
        const coffeeCherryQty = orderDetails[0].coffeeCherryQty;
        const availableWeight = Math.max(0, coffeeCherryQty - weight.usedWeight); // Ensuring availableWeight doesn't go below 0
    
        // Validate that availableWeight is a number and not NaN
        if (!isNaN(availableWeight)) {
          await queryInterface.sequelize.query(`
            UPDATE BuyingStationOrders
            SET availableWeight = ${availableWeight}
            WHERE id = ${weight.orderId}
          `);
        } else {
          console.error(`Calculation error for order ID ${weight.orderId}: availableWeight is NaN.`);
        }
      } else {
        console.error(`Order details not found for order ID ${weight.orderId}.`);
      }
    }
  },

  async down(queryInterface, Sequelize) {
  }
};
