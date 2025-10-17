const express = require("express")
const moment = require('moment')
const router = express.Router();
const auth = require(rootPath + "/middleware/auth")
const {
  successRespSync,
  serverError,
  errorResp,
  errorRespSync,
} = require(rootPath + "/helpers/api")
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
      farmerId: userId,
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
    const count = await db.CacaoPurchaseOrder.count({   
      ...query,  
    })
    const total =  await db.CacaoPurchaseOrder.findAll({
      attributes: [
        [Sequelize.fn('ROUND', Sequelize.fn('sum', Sequelize.col('grandTotal')), 2), 'total_amount'],
        [Sequelize.fn('ROUND', Sequelize.fn('sum', Sequelize.col('cacao_weight')), 2), 'total_weight'],
      ],
      ...query,  
    });


    let response = null
    response = await db.CacaoPurchaseOrder.findAll({
      attributes: [
        "id",
        "orderCode",
        "cacao_weight",
        "cacao_type",
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

    let buyingStationIds = await db.CacaoPurchaseOrder.findAll({
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
      attributes: ["id", "firstName","middleName", "lastName", "email", "mobile"],
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
  // res.sendFile(path.resolve(__dirname+"/../../../views/pdfReport.html"));
  // const data = {
  //   title: 'Farmer Sales Report',
  //   subHeader: {
  //     user_name: 'Adam Henry',
  //     date: '07/04/2022',
  //   },
  //   total: {
  //     'weight': 10000,
  //     'price': 10000
  //   },
  //   tableData: [
  //     {
  //       'date': '07/04/2022',
  //       'buying_station_name': 'Buying Station Name',
  //       'weight': '214 KG',
  //       'quality': 'A',
  //       'price': 'Rp 2530'
  //     }
  //   ]
  // }
  // const data = {
  //   title: 'Farmer Sales Report',
  //   subHeader: {
  //     user_name: 'Adam Henry',
  //     type: 'Yearly Report',
  //   },
  //   tableData: [
  //     {
  //       'annual_analysis': '+800',
  //       'year': '2021',
  //       'target_value': '1400',
  //       'final_value': '2200',
  //     }
  //   ]
  // }

  try {
    const userId = req.user.id
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
    const total =  await db.CacaoPurchaseOrder.findAll({
      attributes: [
        [Sequelize.fn('sum', Sequelize.col('grandTotal')), 'total_amount'],
        [Sequelize.fn('sum', Sequelize.col('cacao_weight')), 'total_weight'],
      ],
      ...query,  
      raw: true
    });


    const response = await db.CacaoPurchaseOrder.findAll({
      attributes: [
        "purchasedAt",
        "cacao_weight",
        "cacao_type",
        "grandTotal",
    ],
      ...query,
      include: [
        {
          attributes: ["firstName","middleName", "lastName"],
          model: db.user,
          as: "buyingStation" 
        },
      ]
    })

    if (response) {
      const data =  {
        title: 'Farmer Sales Report',
        subHeader: {
          user_name: [userName.firstName, userName.middleName, userName.lastName].filter(Boolean).join(' '),
          date: moment(response[0].purchasedAt).format('DD-MM-yyyy'),
        },
        total: {
          'weight': `${total[0].total_weight} KG`,
          'price': `Rp ${total[0].total_amount}`,
        },
        tableData: response.map(item => ({
          date: moment(item.purchasedAt).format('DD-MM-yyyy'),
          buying_station_name: `${item.buyingStation.firstName} ${item.buyingStation.lastName}`,
          weight: `${item.cacao_weight} KG`,
          price: `Rp ${item.grandTotal}`,
        }))
      }
      const pdfData = await generatePDF(data,req)
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
    }
  } catch (error) {
    return serverError(res, error)
  }
})

module.exports = router;