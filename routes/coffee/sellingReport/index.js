const express = require("express")
const moment = require('moment')
const { body } = require("express-validator")
const router = express.Router()
const auth = require(rootPath + "/middleware/auth")
const {
  successRespSync,
  serverError,
  errorResp,
  errorRespSync,
} = require(rootPath + "/helpers/api")
const {} = require("../../../models")
const db = require(rootPath + "/models")
const { Op, literal, Sequelize } = require("sequelize")
var path = require('path');
const generatePDF = require(rootPath + "/helpers/pdfGenerator")
const fs = require('fs');

// Selling Report

router.get("/", auth, async (req, res) => {
  try {
    const userId = req.user.id

    // Filters
    let where = { [Op.and]: [{
      buyingStationId: userId,
      isDeleted: {
        [Op.eq]: null
      }
    }
    ]}
    let query= {}
    query.order = []
    let { page, limit, searchPhrase, purchasedAt, buying_station_name, order, orderType } = req.query
    if (!order) {
      query.order.push(['createdAt', 'DESC'])  
    } else {
      query.order.push([order, orderType])
    }

    if( searchPhrase ) {
      where['$user.firstName$'] = { 
        [Op.like]: `%${searchPhrase}%`
      }
    }
    if( purchasedAt){
      where.purchasedAt = {
        [Op.in]: purchasedAt
      }
    }
    if( buying_station_name && buying_station_name != "All" ){
      where.buyingStationId = {
        [Op.in]: buying_station_name
      }
    }
    query.where = where
    if( page && limit ){
      page = parseInt(page)
      limit = parseInt(limit)
      query.offset = (page - 1) * limit
      query.limit = limit
    }

    // count number of plantations
    const count = await db.BuyingStationOrder.count({   
      ...query,  
    })
    const total =  await db.BuyingStationOrder.findAll({
      attributes: [
        [Sequelize.fn('ROUND', Sequelize.fn('sum', Sequelize.col('grandTotal')), 2), 'total_amount'],
        [Sequelize.fn('ROUND', Sequelize.fn('sum', Sequelize.col('coffeeCherryQty')), 2), 'total_weight'],
      ],
      ...query,  
    });


    const response = await db.BuyingStationOrder.findAll({
      attributes: [
        "id",
        "orderCode",
        "coffeeCherryQty",
        "coffeeCherryQlty",
        "coffeeCherryPic",
        "perKgprice",
        "grandTotal",
        "isPaid",
        "purchasedAt",
        "recordId",
        "createdAt",
    ],
      ...query,
      include: [
        {
          attributes: ["id", "firstName","middleName", "lastName", "email", "mobile"],
          model: db.user,
          as: "buyingStation" 
        },
      ]
    })

    if (!response) {
      return res.json(
        errorRespSync({
          msg: "Selling report data not found.",
        })
      )
    } else {
      return res.json(
        successRespSync({
          msg: "Seeling report data successfully fetched.",
          data: {
            count,
            total,
            response
          },
          
        })
      )
    }

  } catch (error) {
    return serverError(res, error)
  }
})

router.get("/getBuyingStations", auth, async (req, res) => {
  try {
    const userId = req.user.id

    let buyingStationIds = await db.BuyingStationOrder.findAll({
      attributes: [
        [Sequelize.fn('DISTINCT', Sequelize.col('buyingStationId')) ,'buyingStationId'],
      ],
      where: { [Op.and]: [{
        farmerId: userId,
        isDeleted: {
          [Op.eq]: null
        }
      }
      ]}
    })
    if (buyingStationIds) {
      buyingStationIds = buyingStationIds.map(item => item.buyingStationId)
    }

    const response = await db.user.findAll({
      attributes: ["id", "firstName", "middleName","lastName", "email", "mobile"],
      where: {
        id: {
          [Op.in]: buyingStationIds
        }
      }
    })
    if (!response) {
      return res.json(
        errorRespSync({
          msg: "Buying stations data not found.",
        })
      )
    } else {
      return res.json(
        successRespSync({
          msg: "Buying stations data successfully fetched.",
          data: response,
          
        })
      )
    }
  } catch (error) {
    return serverError(res, error)
  }
})

router.get("/getPDFReport", auth, async(req, res) => {
  

  try {
    const userId = req.user.id

    const currencySetting = await db.UserCurrencySettings.findOne({
      where: { userId: userId },
      include: [{ model: db.Currency, as: "currency" }],
    });
    const userName = await db.user.findOne({
      attributes: ['firstName','middleName', 'lastName'],
      where: {
        id: userId
      }
    })

    // Filters
    let where = { [Op.and]: [{
      farmerId: userId,
      isDeleted: {
        [Op.eq]: null
      }
    }
    ]}
    let query= {}
    let { purchasedAt, buying_station_name } = req.query

    if( purchasedAt){
      where.purchasedAt = {
        [Op.in]: purchasedAt
      }
    }
    if( buying_station_name && buying_station_name != "All" ){
      where.buyingStationId = {
        [Op.in]: buying_station_name
      }
    }
    query.where = where
    const total =  await db.BuyingStationOrder.findAll({
      attributes: [
        [Sequelize.fn('sum', Sequelize.col('grandTotal')), 'total_amount'],
        [Sequelize.fn('sum', Sequelize.col('coffeeCherryQty')), 'total_weight'],
      ],
      ...query,  
      raw: true
    });


    const response = await db.BuyingStationOrder.findAll({
      attributes: [
        "purchasedAt",
        "coffeeCherryQty",
        "coffeeCherryQlty",
        "grandTotal",
    ],
      ...query,
      include: [
        {
          attributes: ["firstName", "middleName","lastName"],
          model: db.user,
          as: "buyingStation" 
        },
      ]
    })
    const abbreviation = (currencySetting && 'currency' in  currencySetting) ? currencySetting.currency.abbreviation : ''
    if (response && Array.isArray(response) && response.length > 0) {
      const data =  {
        title: 'Farmer Sales Report',
        subHeader: {
          user_name: `${userName.firstName} ${userName.lastName}`,
          date: moment(response[0].purchasedAt).format('DD-MM-yyyy'),
        },
        total: {
          'weight': `${total[0].total_weight} KG`,
          'price': `${abbreviation} ${total[0].total_amount}`,
        },
        tableData: response.map(item => ({
          date: moment(item.purchasedAt).format('DD-MM-yyyy'),
          buying_station_name: `${item.buyingStation.firstName} ${item.buyingStation.lastName}`,
          weight: `${item.coffeeCherryQty} KG`,
          quality: item.coffeeCherryQlty,
          price: `${abbreviation} ${item.grandTotal}`,
        }))
      }
      const pdfData = await generatePDF(data, req)
      if (!pdfData) {
        return res.json(
          errorRespSync({
            msg: "PDF report generation failed."
          })
        )
      } else {
        res.writeHead(200, {
          "Content-Type": "application/octet-stream",
          "Content-Disposition": "attachment; filename=" + pdfData.fileName
        });
        fs.createReadStream(pdfData.path).pipe(res)
        return
      }
    } else {
      res.status(404).json({ error: "Pdf data not found" });
    }
  } catch (error) {
    return serverError(res, error)
  }
})

module.exports = router