const express = require("express");
const router = express.Router();
const db = require(rootPath + "/models");
const auth = require(rootPath + "/middleware/auth");
const translation = require(rootPath + "/middleware/translation");
const { serverError, successRespSync } = require(rootPath + "/helpers/api");
const { success } = require(rootPath + "/helpers/language");
const { logErrorOccurred } = require(rootPath + "/helpers/general");

const projects = require("./projects");
const crop_growing = require("./crop_growing");
const tree_mapping = require("./tree-mapping");
const tree_details = require("./tree-mapping/tree-details");
const tree_species = require("./tree-mapping/tree-species");
const download = require("./tree-mapping/download");
const tree_plots = require("./tree-mapping/tree-plots");

/**
 * @route GET /api/carbon-credit/sdgs
 * @desc Get all Sustainable Development Goals (SDGs)
 * @access Public
 */
router.get("/sdgs",
  auth, 
  translation, 
  async (req, res) => {
    try {
      const sdgs = await db.CarbonCreditSDG.findAll({
        attributes: ["id", "title", "description", "icon"],
        order: [["title", "ASC"]],
      });

      return res.json(
        successRespSync({
          msg: success.CARBON_CREDIT_SDGS_FETCHED,
          data: sdgs,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
});

router.use("/projects", projects);
router.use("/crop-growing", crop_growing);
router.use("/tree-mapping", tree_mapping);

router.use("/tree-mapping/tree-details", tree_details);
router.use("/tree-mapping/tree-species", tree_species);
router.use("/tree-mapping/tree-plots", tree_plots);
router.use("/tree-mapping/download", download);

module.exports = router;
