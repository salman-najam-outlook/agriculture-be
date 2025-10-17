const express = require("express");
const router = express.Router();
const ServiceTypeController = require("../../../../controllers/esg/survey/service-type.js");

router.post("/", ServiceTypeController.createServiceType);

router.get("/", ServiceTypeController.getAllServiceTypes);

router.get("/:id", ServiceTypeController.getServiceTypeById);

router.put("/:id", ServiceTypeController.updateServiceType);

router.delete("/:id", ServiceTypeController.deleteServiceType);

module.exports = router;