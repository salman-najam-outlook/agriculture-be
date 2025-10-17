const express = require("express")
const router = express.Router()
const translation = require(rootPath + "/middleware/translation");
const batchProcessingManagementController = require("./BatchProcessingManagement.controller");
const checkDataComplete = require(rootPath + "/middleware/checkDataComplete");
const auth = require(rootPath + "/middleware/auth");

// CREATE a new batch
router.post('/',checkDataComplete.handleIncompleteData(["crop_type", "quantity"]), batchProcessingManagementController.createBatch);

// READ all batches with pagination
router.get('/', translation, batchProcessingManagementController.getBatches);

// Purchase Orders
router.get('/purchase-orders', translation, batchProcessingManagementController.fetchPurchaseOrders);

// READ a single batch by ID
router.get('/:id', translation, batchProcessingManagementController.getBatchById);

// UPDATE a batch by ID
router.put('/:id', batchProcessingManagementController.updateBatch);

// DELETE a batch by ID
router.delete('/:id', batchProcessingManagementController.deleteBatch);

// DOWNLOAD a PDF report for a batch
router.get('/download/pdf', translation, batchProcessingManagementController.downloadBatchesPDF);


module.exports = router;