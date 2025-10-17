'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Step 1: Calculate the used weight for each order
    // This involves a complex query that joins the three tables and sums up the totalCoffeeCherryQty for each order
    const usedWeights = await queryInterface.sequelize.query(`
      SELECT 
        cpo.id AS orderId,
        COALESCE(SUM(cfp.finalWeight), 0) AS usedWeight
      FROM
        cacao_purchase_orders cpo
      LEFT JOIN 
        cacao_fermentation_and_purchase_orders cfpo on cpo.id = cfpo.purchaseOrderId
      LEFT JOIN 
        cacao_fermentation_process cfp ON cfpo.fermentationId = cfp.id
      GROUP BY 
      cpo.id
    `, { type: Sequelize.QueryTypes.SELECT });

    for (const weight of usedWeights) {
    
      const orderDetails = await queryInterface.sequelize.query(`
        SELECT cacao_weight
        FROM cacao_purchase_orders
        WHERE id = ${weight.orderId}
      `, { type: Sequelize.QueryTypes.SELECT });
    
      if(orderDetails.length > 0) {
        const cacao_weight = orderDetails[0].cacao_weight;
        const availableWeight = Math.max(0, cacao_weight - weight.usedWeight); // Ensuring availableWeight doesn't go below 0
    
        // Validate that availableWeight is a number and not NaN
        if (!isNaN(availableWeight)) {
          await queryInterface.sequelize.query(`
            UPDATE cacao_purchase_orders
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
