const moment = require("moment");
const express = require("express");
const router = express.Router();
const auth = require(rootPath + "/middleware/auth");
const db = require(rootPath + "/models");
const { Op } = require("sequelize");
const fs = require("fs");
const path = require("path");
const pdfGeneratorCacao = require("../../../../helpers/pdfGeneratorCacao");
const { errorRespSync } = require("../../../../helpers/api");
const pdfGeneratorCacaoDetails = require("../../../../helpers/pdfGeneratorCacaoDetails");
const XLSX = require("xlsx");
const { successRespSync, serverError } = require(rootPath + "/helpers/api");
const { success } = require(rootPath + "/helpers/language");
const { logErrorOccurred } = require(rootPath + "/helpers/general");

router.get("/", auth, async (req, res) => {
  try {
    const { organization } = req.user;
    const { gender, country, startDate, endDate } = req.query;
    let where = {
      ...(startDate && endDate
        ? {
            createdAt: {
              [Op.between]: [startDate, endDate],
            },
          }
        : {}),
    };

    // actual result
    const result = await db.CacaoPurchaseOrder.findAndCountAll({
      attributes: ["cacao_weight", "perKgPrice", "grandTotal"],
      include: [
        {
          model: db.user,
          as: "farmer",
          attributes: [
            "id",
            "firstName",
            "address",
            "middleName",
            "lastName",
            "countryIsoCode",
          ],
          where: {
            organization,
            ...(gender ? { gender } : {}),
            ...(country ? { countryIsoCode: country } : {}),
          },
        },
      ],
      where,
    });

    let totalMonetaryTransaction = result.rows
      .reduce((acc, cur) => {
        return (acc += cur.grandTotal);
      }, 0)
      .toFixed(2);

    let totalWeightTransaction = result.rows
      .reduce((acc, cur) => {
        return (acc += cur.cacao_weight);
      }, 0)
      .toFixed(2);

    let avgPrice =
      result.rows.reduce((acc, cur) => {
        return (acc += cur.perKgPrice);
      }, 0) / result.count;

    let result2,
      totalMonetaryTransactionCompare,
      totalWeightTransactionCompare,
      avgPriceCompare,
      transactionTrend,
      weightTrend,
      costTrend,
      avgPriceTrend,
      trend;

    if (startDate && endDate) {
      // compare result
      const start = moment(startDate, "YYYY-MM-DD");
      const end = moment(endDate, "YYYY-MM-DD");
      const diff = end.diff(start, "days");

      const newStartDate = start.subtract(diff, "days").format("YYYY-MM-DD");
      const newEndDate = end.subtract(diff, "days").format("YYYY-MM-DD");

      result2 = await db.CacaoPurchaseOrder.findAndCountAll({
        attributes: ["cacao_weight", "perKgPrice", "grandTotal"],
        include: [
          {
            model: db.user,
            as: "farmer",
            attributes: [
              "id",
              "firstName",
              "address",
              "middleName",
              "lastName",
              "countryIsoCode",
            ],
            where: {
              organization,
              ...(gender ? { gender } : {}),
              ...(country ? { countryIsoCode: country } : {}),
            },
          },
        ],
        where: {
          ...(newStartDate && newEndDate
            ? {
                createdAt: {
                  [Op.between]: [newStartDate, newEndDate],
                },
              }
            : {}),
        },
      });

      totalMonetaryTransactionCompare = result2.rows
        .reduce((acc, cur) => {
          return (acc += cur.grandTotal);
        }, 0)
        .toFixed(2);

      totalWeightTransactionCompare = result2.rows
        .reduce((acc, cur) => {
          return (acc += cur.cacao_weight);
        }, 0)
        .toFixed(2);

      avgPriceCompare =
        result2.rows.reduce((acc, cur) => {
          return (acc += cur.perKgPrice);
        }, 0) / result.count;

      transactionTrend = ((result.count - result2.count) / result2.count) * 100;
      weightTrend =
        ((totalWeightTransaction - totalWeightTransactionCompare) /
          totalWeightTransactionCompare) *
        100;
      costTrend =
        ((totalMonetaryTransaction - totalMonetaryTransactionCompare) /
          totalMonetaryTransactionCompare) *
        100;
      avgPriceTrend = ((avgPrice - avgPriceCompare) / avgPriceCompare) * 100;
    }

    if (result2) {
      trend = {
        transactionTrend,
        weightTrend,
        costTrend,
        avgPriceTrend,
      };
    } else {
      trend = null;
    }

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: {
          info: {
            totalTransaction: result.count,
            totalWeight: totalWeightTransaction,
            totalMonetaryTransaction,
            avgPrice: avgPrice.toFixed(2),
          },
          trend,
        },
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.get("/list", auth, async (req, res) => {
  try {
    const { organization } = req.user;
    let {
      searchPhrase,
      page,
      limit =10 ,
      gender,
      country,
      startDate,
      endDate,
    } = req.query;

    let farmWhere = {};
    let userWhere = { organization };
    let query = {};
    farmWhere.userId = {
      [db.Sequelize.Op.in]: db.sequelize.literal(`(
        SELECT id FROM users WHERE organization = ${db.sequelize.escape(organization)}
      )`),
    };
    // Prepare searchPhrase and filters
    if (searchPhrase) {
      const lowerCaseSearchPhrase = `%${searchPhrase.toLowerCase()}%`;

      // Search in farmName and user fields
      farmWhere[Op.or] = [
        { farmName: { [Op.like]: lowerCaseSearchPhrase } },
      ];
      userWhere[Op.or] = [
        { firstName: { [Op.like]: lowerCaseSearchPhrase } },
        { middleName: { [Op.like]: lowerCaseSearchPhrase } },
        { lastName: { [Op.like]: lowerCaseSearchPhrase } }
      ];
    }

    // Pagination
    // if (page && limit) {
    //   page = parseInt(page);
    //   limit = parseInt(limit);
    //   query.offset = (page - 1) * limit;
    //   query.limit = limit;
    // }

    // Additional filters
    if (gender) {
      userWhere.gender = gender;
    }
    if (country) {
      farmWhere.country = country;
      userWhere.countryIsoCode = country;
    }

    // Query user_farm with user data
    const result1 = await db.user_farm.findAndCountAll({
      attributes: ["id", "farmName", "address", "area", "registrationNo", "country",   [db.sequelize.fn('SUM', db.sequelize.col('cacaoBuyingStationOders.cacao_weight')), 'totalCacaoWeight'],],
      include: [
        {
          model: db.CacaoPurchaseOrder,
          attributes: ["id", "buyer", "cacao_weight", "perKgPrice", "createdAt"],
          as: "cacaoBuyingStationOders",
          where: {
            ...(startDate && endDate ? { createdAt: { [Op.between]: [startDate, endDate] } } : {}),
          },
        },
        {
          model: db.user,
          as: "user",
          attributes: [
            "firstName",
            "middleName",
            "lastName",
            "gender",
            "countryIsoCode",
            "country",
          ],
          where: userWhere,
        },
      ],
      order: [['id', 'DESC']],
      group: ['user_farm.id'],
      ...query,
    });

    // If no results from the first query, perform a second query
    let result2 = { rows: [], count:[] };
   
      result2 = await db.user_farm.findAndCountAll({
        attributes: ["id", "farmName", "address", "area", "registrationNo", "country"],
        include: [
          {
            model: db.CacaoPurchaseOrder,
            attributes: ["id", "buyer", "cacao_weight", "perKgPrice", "createdAt"],
            as: "cacaoBuyingStationOders",
            where: {
              ...(startDate && endDate ? { createdAt: { [Op.between]: [startDate, endDate] } } : {}),
            },
          },
          {
            model: db.user,
            as: "user",
            attributes: [
              "firstName",
              "middleName",
              "lastName",
              "gender",
              "countryIsoCode",
              "country",
            ],
          },
        ],
        where: farmWhere,
        group: ['user_farm.id'],
        order: [['id', 'DESC']],
        ...query,
      });
    

    // Combine results from both queries
    const combinedRowsWithoutPagination = [
      ...result1.rows,
      ...result2.rows.filter(row2 => 
        !result1.rows.some(row1 => row1.id === row2.id)
      ),
    ];
    let farmOrderCountObj =  {}
    result1?.count.forEach((farm) => {
      farmOrderCountObj[farm.id] = farm.count 
    })


    const combinedRows = combinedRowsWithoutPagination.slice((page - 1) * limit, page * limit);
    const combinedCount = combinedRowsWithoutPagination.length

    // Perform calculations on the combined data
    const processedData = JSON.parse(JSON.stringify(combinedRows)).map((farm) => {
      let totalWeightPO = 0;
      let totalWeightSO = 0;
      let totalPricePO = 0;
      let totalPriceSO = 0;
      let countPO = 0;
      let countSO = 0;

      farm.cacaoBuyingStationOders.forEach((order) => {
        if (order.buyer === null) {
          totalWeightPO += order.cacao_weight;
          totalPricePO += order.perKgPrice;
          countPO += farmOrderCountObj[farm.id]
        } else {
          totalWeightSO += order.cacao_weight;
          totalPriceSO += order.perKgPrice;
          countSO += farmOrderCountObj[farm.id]
        }
      });

      const avgPerKgPricePO = countPO ? totalPricePO / countPO : 0;
      const avgPerKgPriceSO = countSO ? totalPriceSO / countSO : 0;

      return {
        id: farm.id,
        farmName: farm.farmName,
        country: farm.country,
        totalCacaoWeight: farm.totalCacaoWeight,
        cacaoBuyingStationOrders: {
          purchaseOrder: {
            totalPurchaseOrder: countPO,
            totalWeight: totalWeightPO,
            avgPerKgPrice: avgPerKgPricePO,
          },
          sellOrder: {
            totalSellOrder: countSO,
            totalWeight: totalWeightSO,
            avgPerKgPrice: avgPerKgPriceSO,
          },
        },
        user: farm.user,
      };
    });

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: {
          count: combinedCount,
          rows: processedData,
        },
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});



router.get("/download", auth, async (req, res) => {
  try {
    const { organization } = req.user;
    let { gender, country, startDate, endDate, exportType } = req.query;
    let result = await db.user_farm.findAll({
      attributes: ["id", "farmName", "address", "area", "registrationNo"],
      include: [
        {
          model: db.CacaoPurchaseOrder,
          attributes: ["id", "buyer", "cacao_weight", "perKgPrice"],
          as: "cacaoBuyingStationOders",
          where: {
            ...(startDate && endDate
              ? {
                  createdAt: {
                    [Op.between]: [startDate, endDate],
                  },
                }
              : {}),
          },
        },
        {
          model: db.user,
          as: "user",
          attributes: [
            "firstName",
            "middleName",
            "lastName",
            "gender",
            "countryIsoCode",
            "country",
          ],
          where: {
            organization,
            ...(gender ? { gender } : {}),
            ...(country ? { countryIsoCode: country } : {}),
          },
        },
      ],
    });

    const processedData = result.map((farm) => {
      let totalWeightPO = 0;
      let totalWeightSO = 0;
      let totalPricePO = 0;
      let totalPriceSO = 0;
      let countPO = 0;
      let countSO = 0;

      farm.cacaoBuyingStationOders.forEach((order) => {
        if (order.buyer === null) {
          totalWeightPO += order.cacao_weight;
          totalPricePO += order.perKgPrice;
          countPO++;
        } else {
          totalWeightSO += order.cacao_weight;
          totalPriceSO += order.perKgPrice;
          countSO++;
        }
      });

      const avgPerKgPricePO = countPO ? totalPricePO / countPO : 0;
      const avgPerKgPriceSO = countSO ? totalPriceSO / countSO : 0;

      return {
        id: farm.id,
        farmName: farm.farmName,
        cacaoBuyingStationOrders: {
          purchaseOrder: {
            totalPurchaseOrder: countPO,
            totalWeight: totalWeightPO,
            avgPerKgPrice: parseInt(avgPerKgPricePO.toFixed(2)),
          },
          sellOrder: {
            totalSellOrder: countSO,
            totalWeight: totalWeightSO,
            avgPerKgPrice: parseInt(avgPerKgPriceSO.toFixed(2)),
          },
        },
        user: farm.user,
      };
    });

    let totalSellOrder = 0;
    let totalPurchaseOrder = 0;
    let totalAverage = 0;
    let countryFilter = country;
    let csvFormatted = []

    processedData.forEach((data) => {
      let obj = {};
      totalSellOrder += data.cacaoBuyingStationOrders.sellOrder.totalSellOrder;
      totalPurchaseOrder +=
        data.cacaoBuyingStationOrders.purchaseOrder.totalPurchaseOrder;
      totalAverage += data.cacaoBuyingStationOrders.purchaseOrder.avgPerKgPrice;
      countryFilter = data.user.country ? data.user.country : countryFilter;

      obj['Farm Name'] = data.farmName;
      obj['Farmer Name'] = [data.user.firstName, data.user.middleName, data.user.lastName].filter(Boolean).join(' ');
      obj['Gender'] = data.user.gender;
      obj['Country'] = data.user.country;
      obj['# of Orders Sold'] = data.cacaoBuyingStationOrders.sellOrder.totalSellOrder;
      obj['# of Purchase Orders'] = data.cacaoBuyingStationOrders.purchaseOrder.totalPurchaseOrder;
      obj['Total Sell Volume'] = data.cacaoBuyingStationOrders.sellOrder.totalWeight + ' KG'; // base weight
      obj['Total Avg. Price'] = '$ ' + data.cacaoBuyingStationOrders.purchaseOrder.avgPerKgPrice; // base price

      csvFormatted.push(obj);
    });

    if (exportType === 'pdf') {
      const _data = {
        title: "CACAO SELL-BUY REPORT",
        subHeader: {
          farmerGender: gender,
          country: countryFilter,
          reportPeriod: startDate + ' to ' + endDate,
          totalSellOrder,
          totalPurchaseOrder,
          totalAverage,
        },
        tableData: processedData,
      };
      const pdfData = await pdfGeneratorCacao(_data, req);
      if (!pdfData) {
        return res.json(
          errorRespSync({
            msg: "PDF report generation failed.",
          })
        );
      } else {
        res.writeHead(200, {
          "Content-Type": "application/pdf",
          "Content-Disposition": "attachment; filename=" + pdfData.fileName,
        });
        return fs.createReadStream(pdfData.path).pipe(res);
      }
    } else if (exportType === 'csv') {
      let filepath = await generateCacaoXLSReport("csv", csvFormatted);
      res.writeHead(200, {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename=cacao-overview.csv`,
      });
      fs.createReadStream(filepath).pipe(res);
      return;
    } else if (exportType === 'xls') {
      let filepath = await generateCacaoXLSReport("xlsx", csvFormatted);
      res.writeHead(200, {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename=cacao-overview.xlsx`,
      });
      fs.createReadStream(filepath).pipe(res);
      return;
    }
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.get("/countries", auth, async (req, res) => {
  try {
    const { organization } = req.user;
    const result = await db.user_farm.findAll({
      attributes: [[db.Sequelize.fn('DISTINCT', db.Sequelize.col('country')), 'country']],
      where: {
        country: {
          [db.Sequelize.Op.not]: null,
        },
      },
    });
    const countryList = result.map((item) => ({
      country: item.country,
      countryIsoCode: item.country, // Setting countryIsoCode the same as country
    }));
    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: countryList,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});



router.get("/:farmId", auth, async (req, res) => {
  try {
    const { organization } = req.user;
    let { farmId } = req.params;

    let { searchPhrase, page, limit, startDate, endDate, orderField, order } =
      req.query;
    let orderWhere = {};
    let query = {};
    if (searchPhrase) {
      orderWhere[Op.or] = {
        id: { [Op.like]: `%${searchPhrase}%` },
      };
    }
    if (page && limit) {
      page = parseInt(page);
      limit = parseInt(limit);
      query.offset = (page - 1) * limit;
      query.limit = limit;
    }
    const farmDetails = await db.user_farm.findOne({
      attributes: ["id", "farmName", "address", "area", "registrationNo"],
      include: [
        {
          model: db.user,
          as: "user",
          attributes: [
            "firstName",
            "middleName",
            "lastName",
            "gender",
            "countryIsoCode",
            "country",
          ],
          where: {
            organization,
          },
        },
      ],
      where: {
        id: farmId,
      },
    });

    const purchaseOrder = await db.CacaoPurchaseOrder.findAndCountAll({
      attributes: [
        "id",
        "orderCode",
        "buyer",
        "cacao_weight",
        "purchasedAt",
        "product_type",
        "perKgPrice",
        "grandTotal",
      ],
      include: [
        {
          model: db.user_farm,
          as: "userFarms",
          attributes: ["id", "farmName", "address", "area", "registrationNo"],
          where: {
            id: farmId,
          },
        },
        {
          model: db.user,
          as: "farmer",
          attributes: [
            "id",
            "firstName",
            "address",
            "middleName",
            "lastName",
            "countryIsoCode",
          ],
          where: {
            organization,
          },
        },
      ],
      where: {
        ...orderWhere,
        buyer: null,
        ...(startDate && endDate
          ? {
              createdAt: {
                [Op.between]: [startDate, endDate],
              },
            }
          : {}),
      },
      ...query,
    });


    const sellOrder = await db.CacaoPurchaseOrder.findAndCountAll({
      attributes: [
        "id",
        "orderCode",
        "buyer",
        "cacao_weight",
        "purchasedAt",
        "product_type",
        "perKgPrice",
        "grandTotal",
        "premiumPrice"
      ],
      include: [
        {
          model: db.user_farm,
          as: "userFarms",
          attributes: ["id", "farmName", "address", "area", "registrationNo"],
          where: {
            id: farmId,
          },
        },
        {
          model: db.user,
          as: "farmer",
          attributes: [
            "id",
            "firstName",
            "address",
            "middleName",
            "lastName",
            "countryIsoCode",
          ],
          where: {
            organization,
          },
        },
        {
          model: db.CacaoCoffeePurchaseBuyer,
          as: "cacaoPurchaseBuyer",
          attributes: ["id", "name"],
          required: false, // This allows orders with or without a buyer name to be included.
          where: {
            id: db.sequelize.col("CacaoPurchaseOrder.buyer"),
          },
        },
      ],
      where: {
        ...orderWhere,
        buyer: {
          [Op.not]: null,
        },
        ...(startDate && endDate
          ? {
              createdAt: {
                [Op.between]: [startDate, endDate],
              },
            }
          : {}),
      },
      ...query,
    });
    
    let totalPO = 0;
    let totalSO = 0;
    purchaseOrder.rows.forEach((order) => {
      totalPO += order.grandTotal;
    });
    // sellOrder.rows.forEach((order) => {
    //   totalSO += order.grandTotal;
    // });
    sellOrder.rows = sellOrder.rows.map((order) => {
      if (order.buyer && order.cacaoPurchaseBuyer) {
        order.buyer = order.cacaoPurchaseBuyer.name;
      }
      totalSO += order.grandTotal;
      return order;
    });

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: {
          farmDetails,
          totalSO,
          totalPO,
          purchaseOrders: purchaseOrder,
          sellOrders: sellOrder,
        },
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.get("/download/:farmId", auth, async (req, res) => {
  try {
    const { organization } = req.user;
    let { farmId } = req.params;

    let { startDate, endDate, orderType, exportType } =
      req.query;
    const farmDetails = await db.user_farm.findOne({
      attributes: ["id", "farmName", "address", "area", "registrationNo"],
      include: [
        {
          model: db.user,
          as: "user",
          attributes: [
            "firstName",
            "middleName",
            "lastName",
            "gender",
            "countryIsoCode",
            "country",
          ],
          where: {
            organization,
          },
        },
      ],
      where: {
        id: farmId,
      },
    });
    let sellOrder, purchaseOrder;
    if (orderType === 'sell') {
      let totalSO = 0;
      let totalWeight = 0;
      let csvFormatted = [];
      sellOrder = await db.CacaoPurchaseOrder.findAndCountAll({
        attributes: [
          "id",
          "orderCode",
          "buyer",
          "cacao_weight",
          "purchasedAt",
          "product_type",
          "perKgPrice",
          "grandTotal",
          "premiumPrice"
        ],
        include: [
          {
            model: db.user_farm,
            as: "userFarms",
            attributes: ["id", "farmName", "address", "area", "registrationNo"],
            where: {
              id: farmId,
            },
          },
          {
            model: db.user,
            as: "farmer",
            attributes: [
              "id",
              "firstName",
              "address",
              "middleName",
              "lastName",
              "countryIsoCode",
            ],
            where: {
              organization,
            },
          },
        ],
        where: {
          buyer: {
            [Op.not]: null,
          },
          ...(startDate && endDate
            ? {
                createdAt: {
                  [Op.between]: [startDate, endDate],
                },
              }
            : {}),
        },
      });
      sellOrder.rows.forEach((order) => {
        let obj = {};
        totalSO += order.perKgPrice;
        totalWeight += order.cacao_weight;

        obj['Selling ID'] = order.orderCode;
        obj['Buyer Name'] = order.buyer;
        obj['Weight'] = order.cacao_weight + ' KG'; // base weight unit
        obj['Selling Date'] = order.purchasedAt;
        obj['Quality'] = order.quality ? d.quality : '-';
        obj['Price'] = '$ ' + order.perKgPrice; // base price unit
        obj['I Received a Bonus'] = order.premiumPrice;

        csvFormatted.push(obj)
      });
      if (exportType === 'pdf') {
        const _data = {
          title: 'SELL ORDER REPORT',
          subHeader: {
            type: 'sell',
            farmName: farmDetails.farmName,
            farmerName: [farmDetails.user.firstName, farmDetails.user.middleName, farmDetails.user.lastName].filter(Boolean).join(' '),
            farmLocation: farmDetails.address,
            areaSize: farmDetails.area,
            farmRegistrationId: farmDetails.registrationNo,
            reportPeriod: `${startDate} to ${endDate}`,
            totalSO: totalSO,
            totalWeight: totalWeight
          },
          tableData: sellOrder.rows
        }
        const pdfData = await pdfGeneratorCacaoDetails(_data, req);
        if (!pdfData) {
          return res.json(
            errorRespSync({
              msg: "PDF report generation failed.",
            })
          );
        } else {
          res.writeHead(200, {
            "Content-Type": "application/pdf",
            "Content-Disposition": "attachment; filename=" + pdfData.fileName,
          });
          return fs.createReadStream(pdfData.path).pipe(res);
        }
      } else if (exportType === 'csv') {
        let filepath = await generateCacaoFarmXLSReport("csv", csvFormatted, 'SELL ORDER REPORT');
        res.writeHead(200, {
          "Content-Type": "application/octet-stream",
          "Content-Disposition": `attachment; filename=cacao-overview-details.csv`,
        }); 
        fs.createReadStream(filepath).pipe(res);
        return;
      } else if (exportType === 'xls') {
        let filepath = await generateCacaoFarmXLSReport("xlsx", csvFormatted, 'SELL ORDER REPORT');
        res.writeHead(200, {
          "Content-Type": "application/octet-stream",
          "Content-Disposition": `attachment; filename=cacao-overview-details.xlsx`,
        });
        fs.createReadStream(filepath).pipe(res);
        return;
      }
    } else if (orderType === 'purchase') {
      let totalPO = 0;
      let totalWeight = 0;
      let csvFormatted = [];
      purchaseOrder = await db.CacaoPurchaseOrder.findAndCountAll({
        attributes: [
          "id",
          "buyer",
          "cacao_weight",
          "purchasedAt",
          "product_type",
          "perKgPrice",
          "grandTotal",
          "orderCode"
        ],
        include: [
          {
            model: db.user_farm,
            as: "userFarms",
            attributes: ["id", "farmName", "address", "area", "registrationNo"],
            where: {
              id: farmId,
            },
          },
          {
            model: db.user,
            as: "farmer",
            attributes: [
              "id",
              "firstName",
              "address",
              "middleName",
              "lastName",
              "countryIsoCode",
            ],
            where: {
              organization,
            },
          },
        ],
        where: {
          buyer: null,
          ...(startDate && endDate
            ? {
                createdAt: {
                  [Op.between]: [startDate, endDate],
                },
              }
            : {}),
        },
      });
      purchaseOrder.rows.forEach((order) => {
        let obj = {};
        totalPO += order.perKgPrice;
        totalWeight += order.cacao_weight;

        obj['Purchase ID'] = order.orderCode;
        obj['Buyer Name'] = [order.farmer.firstName, order.farmer.middleName, order.farmer.lastName].filter(Boolean).join(' ');
        obj['Weight'] = order.cacao_weight + ' KG'; // base weight unit
        obj['Purchasing Date'] = order.purchasedAt;
        obj['Quality'] = order.quality ? d.quality : '-';
        obj['Price'] = '$ ' + order.perKgPrice; // base price unit

        csvFormatted.push(obj)
      });

      if (exportType === 'pdf') {
        const _data = {
          title: 'PURCHASE ORDER REPORT',
          subHeader: {
            type: 'purchase',
            farmName: farmDetails.farmName,
            farmerName: [farmDetails.user.firstName, farmDetails.user.middleName, farmDetails.user.lastName].filter(Boolean).join(' '),
            farmLocation: farmDetails.address,
            areaSize: farmDetails.area,
            farmRegistrationId: farmDetails.registrationNo,
            reportPeriod: `${startDate} to ${endDate}`,
            totalPO: totalPO,
            totalWeight: totalWeight
          },
          tableData: purchaseOrder.rows
        }
        const pdfData = await pdfGeneratorCacaoDetails(_data, req);
        if (!pdfData) {
          return res.json(
            errorRespSync({
              msg: "PDF report generation failed.",
            })
          );
        } else {
          res.writeHead(200, {
            "Content-Type": "application/pdf",
            "Content-Disposition": "attachment; filename=" + pdfData.fileName,
          });
          return fs.createReadStream(pdfData.path).pipe(res);
        }
      } else if (exportType === 'csv') {
        let filepath = await generateCacaoFarmXLSReport("csv", csvFormatted, 'PURCHASE ORDER REPORT');
        res.writeHead(200, {
          "Content-Type": "application/octet-stream",
          "Content-Disposition": `attachment; filename=cacao-overview-details.csv`,
        }); 
        fs.createReadStream(filepath).pipe(res);
        return;
      } else if (exportType === 'xls') {
        let filepath = await generateCacaoFarmXLSReport("xlsx", csvFormatted, 'PURCHASE ORDER REPORT');
        res.writeHead(200, {
          "Content-Type": "application/octet-stream",
          "Content-Disposition": `attachment; filename=cacao-overview-details.xlsx`,
        });
        fs.createReadStream(filepath).pipe(res);
        return;
      }
    }
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
})

const generateCacaoXLSReport = async (csvOrXlsx, response) => {
  try {
    const workbook = XLSX.utils.book_new();

    const directoryPath = "files";
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true });
    }

    const worksheet = XLSX.utils.json_to_sheet(response);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Cacao Overview");

    const filePath = path.resolve(
      __dirname,
      `../../../../files/cacao-overview.xlsx`
    );
    XLSX.writeFile(workbook, filePath);

    if (csvOrXlsx === "xlsx") {
      return filePath;
    }

    if (csvOrXlsx === "csv") {
      const csvWorkbook = XLSX.readFile(filePath);
      const csvWorksheet = csvWorkbook.Sheets[csvWorkbook.SheetNames[0]];
      const csvData = XLSX.utils.sheet_to_csv(csvWorksheet);
      const csvFilePath = path.resolve(
        __dirname,
        `../../../../files/cacao-overview.csv`
      );
      fs.writeFileSync(csvFilePath, csvData, "utf-8");
      return csvFilePath;
    }

    return;
  } catch (err) {
    console.log("Error processing request: " + err);
  }
};

const generateCacaoFarmXLSReport = async (csvOrXlsx, response, reportName) => {
  try {
    const workbook = XLSX.utils.book_new();

    const directoryPath = "files";
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true });
    }

    const worksheet = XLSX.utils.json_to_sheet(response);
    XLSX.utils.book_append_sheet(workbook, worksheet, reportName);

    const filePath = path.resolve(
      __dirname,
      `../../../../files/cacao-overview-details.xlsx`
    );
    XLSX.writeFile(workbook, filePath);

    if (csvOrXlsx === "xlsx") {
      return filePath;
    }

    if (csvOrXlsx === "csv") {
      const csvWorkbook = XLSX.readFile(filePath);
      const csvWorksheet = csvWorkbook.Sheets[csvWorkbook.SheetNames[0]];
      const csvData = XLSX.utils.sheet_to_csv(csvWorksheet);
      const csvFilePath = path.resolve(
        __dirname,
        `../../../../files/cacao-overview-details.csv`
      );
      fs.writeFileSync(csvFilePath, csvData, "utf-8");
      return csvFilePath;
    }

    return;
  } catch (err) {
    console.log("Error processing request: " + err);
  }
};

function filterFarms(data, searchPhrase) {
  if (!searchPhrase) return data;

  const lowerCaseSearchPhrase = searchPhrase.toLowerCase();

  return data.filter(farm => {
    const { farmName, user } = farm;
    const { firstName, middleName, lastName } = user;

    return (
      (farmName && farmName.toLowerCase().includes(lowerCaseSearchPhrase)) ||
      (firstName && firstName.toLowerCase().includes(lowerCaseSearchPhrase)) ||
      (middleName && middleName.toLowerCase().includes(lowerCaseSearchPhrase)) ||
      (lastName && lastName.toLowerCase().includes(lowerCaseSearchPhrase))
    );
  });
}
module.exports = router;
