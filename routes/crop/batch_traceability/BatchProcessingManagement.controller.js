const db = require(rootPath + "/models");
const { success } = require(rootPath + "/helpers/language");
const { serverError, successRespSync } = require(rootPath + "/helpers/api");
const { logErrorOccurred } = require(rootPath + "/helpers/general");
const insertTraceabilityExternalId = require(rootPath + "/helpers/externalTracebilityId");
const { result } = require("lodash");
const {
  insertImages,
  handleImageUpdates,
  deleteImages,
  streamBatchManagementPDF,
  createBatchPayload,
  buildPagination,
  fetchTotalCount,
  getBatchIncludes,
  getBatchAttributes,
  createPackagingUnitPayload,
  createPalletsPayload,
  buildWhereClause,
} = require("./utility");

// CREATE BATCH
exports.createBatch = async (req, res) => {
  try {
    req.body.userId = req.user.id;
    req.body.org_id = req.user.organization;
    if (Array.isArray(req.body.purchaseOrders)) {
      req.body.isComplete =
        req.body.purchaseOrders.length && req.body.isComplete;
    } else {
      req.body.isComplete = false;
    }
    const batchPayload = createBatchPayload(req.body);
    const batch = await db.BatchProcessingManagement.create(batchPayload);
    await processBatchDetails(req,res, batch.id);

    return res.json(successRespSync({ msg: success.REGISTERED, data: batch }));
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
};

// GET BY ID
exports.getBatchById = async (req, res) => {
  try {
    const batch = await db.BatchProcessingManagement.findByPk(req.params.id, {
      include: getBatchIncludes(),
      attributes: getBatchAttributes(),
    });

    if (!batch) {
      return res.status(404).json({ msg: "Batch not found" });
    }
    if (batch.purchaseOrders) {
      batch.purchaseOrders.forEach((order) => {
        const pallets = order.get("Pallets") || [];
        const filteredPallets = pallets.filter(
          (pallet) => pallet.batch_id === batch.id
        );
        order.set("Pallets", filteredPallets);
      });
    }

    return res.json(successRespSync({ msg: success.FETCH, data: batch }));
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
};

// GET ALL BATCHES FOR AN ORGANIZATION
// params: page, limit, startDate, endDate, cropId, scope='organization' or 'user'
exports.getBatches = async (req, res) => {
  try {
    const {
      page = 1,
      limit,
      startDate,
      endDate,
      cropId,
      scope = "user",
    } = req.query;

    const userId = req.user.id;
    const orgId = req.user.organization;

    const data = await fetchBatches(
      {
        userId: scope === "user" ? userId : undefined,
        orgId: scope === "organization" ? orgId : undefined,
        cropId,
        startDate,
        endDate,
      },
      page,
      limit
    );

    return res.json(successRespSync({ msg: success.FETCH, data }));
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
};

// UPDATE
exports.updateBatch = async (req, res) => {
  try {
    const batch = await db.BatchProcessingManagement.findByPk(req.params.id);
    if (!batch) {
      throw new Error("Batch not found");
    }

    const batchPayload = createBatchPayload(req.body);
    await batch.update(batchPayload);

    // Process additional batch details (e.g., images, packaging, pallets)
    await processBatchDetails(req, res, batch.id);

    const result = successRespSync({ msg: success.UPDATED, data: batch });

    return res.json(result);
  } catch (err) {
    return serverError(res, err);
  }
};

// DELETE
exports.deleteBatch = async (req, res) => {
  try {
    const batch = await db.BatchProcessingManagement.findByPk(req.params.id);
    if (!batch) {
      return res.status(404).json({ msg: "Batch not found" });
    }

    await processBatchDeletion(batch.id);

    await batch.destroy();

    return res.json(successRespSync({ msg: success.DELETED }));
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
};

exports.fetchPurchaseOrders = async (req, res) => {
  try {
    const { cropId, page = 1, limit, scope = "user" } = req.query;
    const offset = limit ? (page - 1) * parseInt(limit) : 0;
    const userId = req.user.id;
    const orgId = req.user.organization;

    let where = {};

    // Define the where clause based on the scope
    if (scope === "user") {
      where.userId = userId;
    } else if (scope === "organization") {
      where.userId = {
        [db.Sequelize.Op.in]: db.sequelize.literal(`(
          SELECT id FROM users WHERE organization = ${db.sequelize.escape(
            orgId
          )}
        )`),
      };
    }

    if (cropId) {
      where.cropTypeId = cropId;
    }

    // Debugging: Log the `where` clause to verify it's correct
    console.log("Where Clause:", where);

    const results = await db.PurchaseOrderManagement.findAndCountAll({
      where: where,
      include: [
        {
          model: db.user_farm,
          attributes: ["id", "farmName"],
          as: "userFarms",
        },
        {
          model: db.user,
          attributes: ["id", "firstName", "middleName", "lastName", "fullName"],
          as: "user",
        },
        {
          model: db.user,
          attributes: ["id", "firstName", "middleName", "lastName", "fullName"],
          as: "farmer",
        },
        {
          model: db.Geofence,
        },
        {
          model: db.Option,
          attributes: ["id", "name"],
          as: "cropType",
        },
        {
          model: db.CroptypeProductType,
          attributes: ["id", "name"],
        },
        {
          model: db.PackagingUnit,
        },
        {
          model: db.Pallets,
        },
        {
          model: db.Crop,
          through: "PurchaseTraceabilityCropVarProduct",
          as: "cropVarieties",
          include: [
            {
              model: db.Option,
              as: "crop_variety_type",
            },
          ],
        },
        {
          model: db.CroptypeRejection,
          through: "AllTraceabilityRejection",
          as: "rejectionReasons",
        },
        {
          model: db.AllPurchaseTraceabilityImages,
          as: "images",
          attributes: [
            ["file_url", "location"],
            "id",
            "batch_id",
            "final_product_id",
            "purchase_order_id",
            "s3_key",
            "createdAt",
            "updatedAt",
          ],
        },
      ],
      offset,
      limit: limit ? parseInt(limit) : undefined,
      logging: console.log,
    });

    const totalPages = Math.ceil(results.count / limit);

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: results.rows,
        pagination: {
          totalItems: results.count,
          totalPages,
          currentPage: parseInt(page),
          pageSize: parseInt(limit),
        },
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
};

// params: page, limit, startDate, endDate, cropId, scope='organization' or 'user'
exports.downloadBatchesPDF = async (req, res) => {
  try {
    const {
      page = 1,
      limit,
      startDate,
      endDate,
      cropId,
      scope = "user",
    } = req.query;
    const userId = req.user.id;
    const orgId = req.user.organization;

    // Determine the scope (either 'user' or 'organization')
    const whereClause = buildWhereClause({
      userId: scope === "user" ? userId : undefined,
      orgId: scope === "organization" ? orgId : undefined,
      cropId: cropId,
      startDate,
      endDate,
    });
    const offset = limit ? (page - 1) * parseInt(limit) : 0;

    // Fetch batch data
    const batches = await db.BatchProcessingManagement.findAll({
      where: whereClause,
      attributes: ["id", "quantity", "date_of_issue", "lot_id"],
      include: [
        { model: db.Option, as: "cropType", attributes: ["name"] },
        {
          model: db.PurchaseOrderManagement,
          as: "purchaseOrders",
          through: {
            model: db.MapPurchaseOrderAndProcessingBatches,
            attributes: ["totalPrice", "purchase_quantity"],
            as: "purchase_batch_mapping",
          },
        },
        {
          model: db.user,
          as: "user",
          attributes: ["firstName", "lastName", "middleName"],
        },
        {
          model: db.PackagingUnit,
          attributes: ["id", "packing_unit_value", "no_of_units"],
        },
      ],
      offset,
      limit: limit ? parseInt(limit) : undefined,
      order: [['id', 'DESC']]
    });

    if (!batches.length) {
      return res.status(404).send("No batches found for the given filters");
    }

    // Fetch user info based on the scope
    const userInfo =
      scope === "user"
        ? await db.user.findOne({
            where: { id: userId },
            attributes: ["firstName", "lastName", "middleName"],
          })
        : { name: "Organization Report" };

    // Generate and stream the PDF
    await streamBatchManagementPDF(req, res, batches, userInfo);
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).send("Error generating PDF");
  }
};

// Helper functions

const processBatchDetails = async (req,res, batchId) => {
  if (req.body.images && !req.body.id) {
    await insertImages(req.body.images, batchId);
  }
  if (req.body.images && req.body.id) {
    await handleImageUpdates(req.body.images, batchId);
  }
  let packagingUnitId = null;
  if (req.body.packagingUnit) {
    let packagingUnitPayload = createPackagingUnitPayload(
      req.body.packagingUnit
    );
    packagingUnitId = await upsertPackagingUnit(packagingUnitPayload, batchId);
  } else {
    const existingUnit = await db.PackagingUnit.findOne({
      where: { batch_id: batchId },
      attributes: ["id"],
    });
    packagingUnitId = existingUnit ? existingUnit.id : null;
  }

  if (req.body.pallets) {
    let palletsPayload = createPalletsPayload(req.body.pallets);
    await upsertPallets(palletsPayload, batchId, packagingUnitId);
  }

  // First, delete all previously mapped reasons for the batch
  await db.AllTraceabilityRejection.destroy({
    where: { batch_id: batchId },
  });

  // Then, insert new reasons if any are provided
  if (Array.isArray(req.body.reason_for_waste) && req.body.reason_for_waste.length > 0) {
    const payload = req.body.reason_for_waste?.map((reason) => ({
      batch_id: batchId,
      reason_id: reason,
    }));
    await db.AllTraceabilityRejection.bulkCreate(payload);
  }

  const externalId  = await insertTraceabilityExternalId(
    "batch_mgmt",
    batchId
  );

  await db.BatchProcessingManagement.update(
    {  external_id: externalId.id },
    {
      where: {
        id: batchId
      },
    }
  );
  await synchronizePurchaseOrderMappings(req.body.purchaseOrders,res, batchId);
};

const processBatchDeletion = async (batchId) => {
  // Delete associated images for the batch
  await deleteImages(batchId);

  // Delete records in the MapPurchaseOrderAndProcessingBatches table linked to the batch
  await db.MapPurchaseOrderAndProcessingBatches.destroy({
    where: { processing_batch_id: batchId },
  });

  // Delete pallets associated with the batch
  await db.Pallets.destroy({ where: { batch_id: batchId } });

  // Delete the packaging unit associated with the batch
  await db.PackagingUnit.destroy({ where: { batch_id: batchId } });
};

// Helper function for upserting packaging unit
const upsertPackagingUnit = async (packagingUnitData, batchId) => {
  const existingUnit = await db.PackagingUnit.findOne({
    where: { batch_id: batchId },
  });

  if (existingUnit) {
    await existingUnit.update(packagingUnitData);
    return existingUnit.id;
  } else {
    const newUnit = await db.PackagingUnit.create({
      ...packagingUnitData,
      batch_id: batchId,
    });
    return newUnit.id;
  }
};

// Helper function for upserting pallets
const upsertPallets = async (pallets, batchId, packagingUnitId) => {
  // Extract IDs of incoming pallets
  const newPalletIds = new Set(pallets.map((pallet) => pallet.id));

  // Fetch existing pallets for the given batchId and packagingUnitId
  const existingPallets = await db.Pallets.findAll({
    where: { batch_id: batchId, packing_unit_id: packagingUnitId },
  });

  // Determine which pallets need to be deleted
  const palletsToDelete = existingPallets
    .filter((pallet) => !newPalletIds.has(pallet.id))
    .map((pallet) => pallet.id);

  // Upsert new or updated pallets
  const upsertPromises = pallets.map((pallet) =>
    db.Pallets.upsert({
      ...pallet,
      batch_id: batchId,
      packing_unit_id: packagingUnitId,
    })
  );

  // Delete old pallets
  const deletePromise = palletsToDelete.length
    ? db.Pallets.destroy({
        where: { id: palletsToDelete },
      })
    : Promise.resolve();

  // Run all upserts and deletions in parallel
  await Promise.all([deletePromise, ...upsertPromises]);
};

// Helper function to fetch batches with pagination
const fetchBatches = async (filters, page = 1, limit) => {
  const offset = limit ? (page - 1) * parseInt(limit) : 0;
  const whereClause = buildWhereClause(filters);

  const options = {
    attributes: {
      include: [
        ['external_id', 'externalId']// rename 'columnName' to 'newName'
      ],
      exclude: ['external_id'] // optionally exclude the original column if needed
    },
    where: whereClause,
    include: getBatchIncludes(),
    offset,
    limit: limit ? parseInt(limit) : undefined,
    // group: ["BatchProcessingManagement.id"], // Assuming you're grouping by ID or other columns
  };

  // Fetch the batches with the constructed options
  let results = await db.BatchProcessingManagement.findAll(options);
   results = JSON.parse(JSON.stringify(results))

   
  const filteredResults = results.map((batch) => {
    batch.externalQR = batch?.externalId ? `https://${process.env.TRACEABILITY_URL}/trace-your-product/#/new-traceability?id=${batch.externalId}` : null
    batch.purchaseOrders = batch.purchaseOrders.map((order) => {
      let filteredPallets = order.Pallets.filter(
        (pallet) => pallet.batch_id === batch.id
      );
      order.Pallets = filteredPallets
      return order;
    });

    
    return batch;
  });
  // Get the total count separately
  const totalCount = await fetchTotalCount(filters);

  return {
    rows: filteredResults,
    pagination: buildPagination(totalCount, page, limit),
  };
};

const synchronizePurchaseOrderMappings = async (
  purchaseOrdersPayload,
  res,
  batchId
) => {


    if (!Array.isArray(purchaseOrdersPayload)) return;

    const purchaseOrders = purchaseOrdersPayload.map((order) => order.id);

    // Step 1: Find all existing mappings for this batch
    const existingMappings =
      await db.MapPurchaseOrderAndProcessingBatches.findAll({
        where: { processing_batch_id: batchId },
        attributes: [
          "id",
          "purchase_order_id",
          "purchase_quantity",
          "totalPrice",
        ],

      });
    if (!existingMappings) {
      throw new Error(`No existing mappings found for batch ${batchId}`);
    }

    const existingOrderIds = existingMappings.map(
      (mapping) => mapping.purchase_order_id
    );

    // Step 2: Determine which orders are being removed
    const removedOrderIds = existingOrderIds.filter(
      (orderId) => !purchaseOrders.includes(orderId)
    );

    // Step 3: Revert 'purchase_quantity' and restore 'available_quantity' for removed orders
    for (let mapping of existingMappings) {
      if (removedOrderIds.includes(mapping.purchase_order_id)) {
        const updated = await db.PurchaseOrderManagement.update(
          {
            availableQuantity: db.Sequelize.literal(
              `availableQuantity + ${mapping.purchase_quantity}`
            ),
          },
          { where: { id: mapping.purchase_order_id },  }
        );

        if (updated[0] === 0) {
          throw new Error(
            `Failed to update availableQuantity for Purchase Order ${mapping.purchase_order_id}`
          );
        }
      }
    }

    // Step 4: Check if removed orders are mapped to other batches
    for (let orderId of removedOrderIds) {
      const isMappedToOtherBatches =
        await db.MapPurchaseOrderAndProcessingBatches.count({
          where: {
            purchase_order_id: orderId,
            processing_batch_id: {
              [db.Sequelize.Op.ne]: batchId,
            },
          },

        });

      if (isMappedToOtherBatches === 0) {
        const updated = await db.PurchaseOrderManagement.update(
          { used: false },
          { where: { id: orderId },  }
        );

        if (updated[0] === 0) {
          throw new Error(
            `Failed to update used status for Purchase Order ${orderId}`
          );
        }
      }
    }

    // Step 5: Update quantities and create new mappings for orders
    for (const order of purchaseOrdersPayload) {
      const existingMappingsForOrder = existingMappings.find(
        (mapping) => mapping.purchase_order_id === order.id
      );

      const previouslyAllocatedQuantity = existingMappingsForOrder
        ? existingMappingsForOrder.purchase_quantity
        : 0;

      const remainingQuantity = await db.PurchaseOrderManagement.findOne({
        where: { id: order.id },
        attributes: ["availableQuantity"],

      });

      if (!remainingQuantity) {
        throw new Error(`Purchase Order ${order.id} not found`);
      }

      const adjustedAvailableQuantity =
        remainingQuantity.availableQuantity + previouslyAllocatedQuantity;

      const newAvailableQuantity =
        adjustedAvailableQuantity - order.totalQuantity;

      if (newAvailableQuantity < 0) {
        throw new Error(
          `Insufficient quantity available for Purchase Order ${order.id}`
        );
      }

      const updateResult = await db.PurchaseOrderManagement.update(
        { availableQuantity: newAvailableQuantity },
        { where: { id: order.id },  }
      );

      if (updateResult[0] === 0) {
        throw new Error(
          `Failed to update availableQuantity for Purchase Order ${order.id}`
        );
      }

      if (existingMappingsForOrder) {
        const updateMappingResult =
          await db.MapPurchaseOrderAndProcessingBatches.update(
            {
              purchase_quantity: order.totalQuantity,
              totalPrice: order.totalPrice,
            },
            { where: { id: existingMappingsForOrder.id },  }
          );

        if (updateMappingResult[0] === 0) {
          throw new Error(
            `Failed to update mapping for Purchase Order ${order.id}`
          );
        }
      } else {
        await db.MapPurchaseOrderAndProcessingBatches.create(
          {
            purchase_order_id: order.id,
            processing_batch_id: batchId,
            purchase_quantity: order.totalQuantity,
            totalPrice: order.totalPrice,
          },
          {  }
        );
      }

      // Step 6: Handle Pallets - update their usage status
      const existingPallets = await db.Pallets.findAll({
        where: { batch_id: batchId, purchase_order_id: order.id },
        attributes: ["id"],

      });

      const existingPalletIds = existingPallets.map((pallet) => pallet.id);

      const removedPalletIds = existingPalletIds.filter(
        (palletId) => !order.pallets.includes(palletId)
      );

      const newPalletIds = order.pallets.filter(
        (palletId) => !existingPalletIds.includes(palletId)
      );

      // Set removed pallets to used: false
      if (removedPalletIds.length > 0) {
        await db.Pallets.update(
          { used: false, batch_id: null },
          { where: { id: removedPalletIds },  }
        );
      }

      // Set new pallets to used: true
      if (newPalletIds.length > 0) {
        await db.Pallets.update(
          { batch_id: batchId, used: true },
          { where: { id: newPalletIds },  }
        );
      }
    }

    // Step 6 continued: Handle pallets for removed purchase orders
    for (const removedOrderId of removedOrderIds) {
      const removedPallets = await db.Pallets.findAll({
        where: { purchase_order_id: removedOrderId, batch_id: batchId },
        attributes: ["id"],

      });

      const removedPalletIds = removedPallets.map((pallet) => pallet.id);

      if (removedPalletIds.length > 0) {
        await db.Pallets.update(
          { used: false, batch_id: null },
          { where: { id: removedPalletIds },  }
        );
      }
    }

    // Step 7: Remove purchase orders that are no longer associated with the batch
    if (removedOrderIds.length > 0) {
      await db.MapPurchaseOrderAndProcessingBatches.destroy({
        where: {
          processing_batch_id: batchId,
          purchase_order_id: removedOrderIds,
        },

      });
    }

    // Step 8: Set purchase orders to used: true
    if (purchaseOrders.length > 0) {
      await db.PurchaseOrderManagement.update(
        { used: true },
        {
          where: { id: purchaseOrders },

        }
      );
    }



};
