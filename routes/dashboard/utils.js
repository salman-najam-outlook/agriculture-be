const db = require(rootPath + "/models");

const getFarmerWhere = (organization, countryCode, gender, farmer) => {
    let farmerWhere = { organization };
    if (countryCode) farmerWhere.countryIsoCode = countryCode;
    if (gender) farmerWhere.gender = gender;
    if (farmer) farmerWhere.id = farmer;
    return farmerWhere;
  };
  
  const fetchPurchaseOrders = async (farmerWhere, sDate, eDate) => {
    return db.CacaoPurchaseOrder.findAll({
      attributes: [
        [
          db.Sequelize.fn("AVG", db.Sequelize.col("perKgPrice")),
          "averageGrandTotal",
        ],
      ],
      include: [
        {
          model: db.user,
          as: "farmer",
          attributes: ["id", "firstName", "lastName", "fullName"],
          where: farmerWhere,
        },
      ],
      group: ["farmer.id"],
      order: [[db.Sequelize.fn("AVG", db.Sequelize.col("perKgPrice")), "DESC"]],
      where: {
        createdAt: {
          [db.Sequelize.Op.between]: [sDate, eDate],
        },
      },
    });
  };

  const generateCSVContent = (purchaseOrders) => {
    const headers = 'ID,First Name,Last Name,Full Name,Average Grand Total\n';
    const rows = purchaseOrders.map(po => 
      `${po.farmer.id},${po.farmer.firstName},${po.farmer.lastName},${po.farmer.fullName},${po.dataValues.averageGrandTotal}`
    ).join('\n');
    return headers + rows;
  };

  module.exports = {

    getFarmerWhere,
    fetchPurchaseOrders,
    generateCSVContent
  }