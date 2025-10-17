const db = require(rootPath + "/models");
const auth = require(rootPath + "/middleware/auth");
const express = require("express");
const router = express.Router();


const { successRespSync, serverError } = require(rootPath + "/helpers/api");
const { fetchLogs } = require("../tickets.controller");

router.get("/:ticketId", auth, async (req, res) => {
  try {
    const logs = await fetchLogs(req, res);
    return res.json(
      successRespSync({
        msg: "Logs fetched successfully", 
         data: logs
       })
    );
  } catch (error) {
    return serverError(res, error);
  }
});
module.exports = router;