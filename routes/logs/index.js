const express = require('express');
const router = express.Router()
const auth = require(rootPath + "/middleware/auth");

const { success } = require(rootPath + "/helpers/language");
const { errorRespSync, successRespSync } = require(rootPath + '/helpers/api');
const fs = require('fs')
const path = require('path')
const logsPath = path.join(__dirname, '../../activity_log')
const db = require(rootPath + "/models");



router.get("/healthz", (req, res) => {
  return res.status(200).send("OK");
});


router.get("/readiness", async (req, res) => {
  try {
    
    await db.sequelize.authenticate();
    res.status(200).send("Ready");
  } catch (error) {
    console.error("Database connection failed:", error);
    res.status(500).send("Not Ready");
  }
});

router.get('/',auth, function(req, res){

    try {
        fs.readdir(logsPath, (err, files) => {      
          if (err) {
            throw err
           }
        //   res.status(HttpStatusCodes.OK).send(files)
        files = files.filter(file => file.includes("activity_log"))
          return res.json(
            successRespSync({
              msg: success.FETCH,
              data: files,
            })
          );
        })
      } catch (e) {

        return res.json(errorRespSync(e));
      }
})

router.route("/:logFileName").get((req, res) => {
  const data = []
  try {

    // activity_log_2022-03-14.log
    fs.readFileSync(`${logsPath}/activity_log_${req.params.logFileName}.log`, 'utf-8')
      .split(/\r?\n/)
      .filter(line => line.trim() !== '')
      .forEach(function(line, index) {
        if (line.trim() !== '') {
            data.push({ log: line, sno: index + 1})    
        }
      })
      return res.json(
        successRespSync({
          msg: success.FETCH,
          data
        })
      );
  } catch (e) {
    return res.json(errorRespSync(e));
  }
})



module.exports = router