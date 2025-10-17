const express = require('express');
const db = require(rootPath + "/models");
const router = express.Router();


router.get('/' , async (req, res) => {
    try {
      const { farmName } = req.query;
      const farm = await db.user_farm.findOne({
        where: {
          farmName,
          isDeleted: 0,
        }
      });
      if (farm) {
        return res.status(200).json({
          success: false,
          message: 'Farm name already exists'
        })
      }
      return res.status(200).json({
        success: true,
        message: 'Farm name is available'
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        success: false,
        message: 'Internal server error'
      })
    }
  })

  module.exports = router;
  