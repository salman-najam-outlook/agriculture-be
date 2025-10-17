const express = require("express"),
  router = express.Router(),
  { Op, where } = require("sequelize"),
  db = require(rootPath + "/models"),
  { success } = require(rootPath + "/helpers/language"),
  { serverError, successRespSync, errorRespSync } = require(rootPath + "/helpers/api");
const checkDataComplete = require(rootPath + "/middleware/checkDataComplete");
const fs = require("fs");
const { logErrorOccurred } = require(rootPath + "/helpers/general");
const { insertImages, handleImageUpdates,
   deleteImages, generateConfirmationPDF, generatePalletPDF,
   generateSalesPDF
  } = require('./utils');
const { addOfflineFarmer } = require(rootPath + "/common/addOfflineFarmer");
var { toDataURL } = require('qrcode');
const ejsTranslation = require(rootPath + "/locales/ejsTranslation.json")
const { fetchConversionUnits,fetchCurrencySettings } = require(rootPath + "/routes/crop/utility");
const insertTraceabilityExternalId = require(rootPath +
  "/helpers/externalTracebilityId");

router.post('/', checkDataComplete.handleIncompleteData(["farmId",
  "geofenceId", "cropTypeId", "quantity",
  "finalQuantity"]),  async (req, res) => {
  try {

    let userId = req.user.id;
    let newPallet, newPurchaseOrder, newPackagingUnit, newRejectionReason, newProductType, newCropvariety;
    let newOfflineUser
    let {
      farmerId,
      farmerName,
      farmerFirstName,
      farmerMiddleName,
      farmerLastName,
      farmerAddress,
      farmId,
      geofenceId,
      cropTypeId,
      cropVarietyId,
      recordId,
      isComplete,
      qualityGrade,
      quantity,
      wasteQuantity,
      finalQuantity,
      pricePerUnit,
      totalPrice,
      privateInfo,
      publicInfo,
      images,
      packing_unit_type,
      packing_unit_value,
      no_of_units,
      pallet_size,
      number_of_pallets,
      pallets,
       reasonForWasteId,
      productTypeId,
      purchaseDate
    } = req.body;

    if(!farmerId && !(farmerName && farmerAddress)) {
      req.body.isComplete = false;
    }


    req.body.address = farmerAddress

    if(!farmerId) {
      newOfflineUser = await addOfflineFarmer(req, res, true, "purchase_confirm_farmer")
    }


    farmerId = newOfflineUser || farmerId
    newPurchaseOrder = await db.PurchaseOrderManagement.create({
      userId,
      farmerId,
      isComplete,
      farmId,
      geofenceId,
      cropTypeId,
      qualityGrade,
      quantity,
      wasteQuantity,
      finalQuantity,
      availableQuantity: finalQuantity,
      privateInfo,
      publicInfo,
      productTypeId,
      recordId,
      pricePerUnit,
      totalPrice,
      purchaseDate,
    });

    if(packing_unit_type && packing_unit_value) {
        newPackagingUnit = await db.PackagingUnit.create({
          purchase_order_id: newPurchaseOrder.id, 
          packing_unit_type,
          packing_unit_value,
          no_of_units,
          pallet_size,
          number_of_pallets
        });
    }

    if(pallets && Array.isArray(pallets) && pallets.length > 0) {
      newPallet = await db.Pallets.bulkCreate( pallets.map(pallet =>  {
        return {
          purchase_order_id: newPurchaseOrder.id,
          packing_unit_id: newPackagingUnit.id, 
          pallet_id: pallet.pallet_id,
          quantity: pallet.pallet_quantity,
          no_of_boxes: pallet.no_of_boxes,
        }
      }) );
    }
    if(reasonForWasteId && Array.isArray(reasonForWasteId) && reasonForWasteId.length > 0) {
      newRejectionReason = await db.AllTraceabilityRejection.bulkCreate( reasonForWasteId.map(rejection =>  {
        return {
          purchase_order_id: newPurchaseOrder.id,
          reason_id: rejection
        }
      }) );
    }
    if(cropVarietyId && Array.isArray(cropVarietyId) && cropVarietyId.length > 0) {
      newCropvariety = await db.PurchaseTraceabilityCropVarProduct.bulkCreate( cropVarietyId.map(cropVar =>  {
        return {
          purchase_order_id: newPurchaseOrder.id,
          crop_variety_id: cropVar, 
        }
      }) );
    }


    if(images && Array.isArray(images) && images.length > 0) {
      insertImages(images, newPurchaseOrder.id);
    }

    const externalId  = await insertTraceabilityExternalId(
      "purchase_confirmation",
      newPurchaseOrder.id
    );

    await db.PurchaseOrderManagement.update(
      {  external_id: externalId.id },
      {
        where: {
          id: newPurchaseOrder.id,
        },
      }
    );
    return res.json(successRespSync({
      msg: 'Purchase Order, Packaging Unit, and Pallet created successfully',
      data: {
       ...newPurchaseOrder.dataValues, PackagingUnit : newPackagingUnit, Pallets : newPallet,
       RejectionReasonId: newRejectionReason,
      CropVarietyId: newCropvariety,
      }
    }));
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.put('/:lotId', checkDataComplete.handleIncompleteData(["farmerId", "farmerName", "farmerAddress", "farmId",
  "geofenceId", "cropTypeId", "quantity",
  "finalQuantity"]),  async (req, res) => {
  try {
    let {lotId} = req.params;
    let userId = req.user.id;
    let newPallet, newPurchaseOrder, newPackagingUnit, newRejectionReason, newProductType, newCropvariety;
    let newOfflineUser
    let {
      farmerId,
      farmerName,
      farmerAddress,
      farmId,
      geofenceId,
      cropTypeId,
      cropVarietyId,
      recordId,
      isComplete,
      qualityGrade,
      quantity,
      wasteQuantity,
      finalQuantity,
      pricePerUnit,
      totalPrice,
      privateInfo,
      publicInfo,
      images,
      packing_unit_type,
      packing_unit_value,
      no_of_units,
      pallet_size,
      number_of_pallets,
      pallets,
      reasonForWasteId,
      productTypeId,
      purchaseDate,
      packingUnitId
    } = req.body;

    req.body.farmerFirstName = farmerName
    req.body.address = farmerAddress

    if(!farmerId) {
      newOfflineUser = await addOfflineFarmer(req, res, true, "purchase_confirm_farmer")
    }


    farmerId = newOfflineUser || farmerId
    newPurchaseOrder = await db.PurchaseOrderManagement.update({
      userId,
      farmerId,
      isComplete,
      farmId,
      geofenceId,
      cropTypeId,
      qualityGrade,
      quantity,
      wasteQuantity,
      finalQuantity,
      availableQuantity: finalQuantity,
      privateInfo,
      publicInfo,
      productTypeId,
      recordId,
      pricePerUnit,
      totalPrice,
      purchaseDate,
    },
  {  where: {id: lotId}}
  );

      if(packing_unit_type && packing_unit_value) {
        await db.PackagingUnit.destroy( {
          where: {
            purchase_order_id: lotId
          }
        });
        newPackagingUnit = await db.PackagingUnit.create({
          purchase_order_id: lotId, 
          packing_unit_type,
          packing_unit_value,
          no_of_units,
          pallet_size,
          number_of_pallets
        });
    }


    if(pallets && Array.isArray(pallets) && pallets.length > 0) {
     await db.Pallets.destroy( {
      where: {
        purchase_order_id: lotId
      }
    });
      newPallet = await db.Pallets.bulkCreate( pallets.map(pallet =>  {
        return {
          purchase_order_id: newPurchaseOrder?.id,
          packing_unit_id: newPackagingUnit?.id, 
          pallet_id: pallet?.pallet_id,
          quantity: pallet?.pallet_quantity,
          no_of_boxes: pallet?.no_of_boxes,
        }
      }) );
    } else {
      await db.Pallets.destroy( {
        where: {
          purchase_order_id: lotId
        }
      });
    }
    if(reasonForWasteId && Array.isArray(reasonForWasteId) && reasonForWasteId.length > 0) {
      await db.AllTraceabilityRejection.destroy( {
        where: {
          purchase_order_id: lotId
        }
      });
      newRejectionReason = await db.AllTraceabilityRejection.bulkCreate( reasonForWasteId.map(rejection =>  {
        return {
          purchase_order_id: lotId,
          reason_id: rejection
        }
      }) );
    } else {
      await db.AllTraceabilityRejection.destroy( {
        where: {
          purchase_order_id: lotId
        }
      });
    }
    if(cropVarietyId && Array.isArray(cropVarietyId) && cropVarietyId.length > 0) {
      await db.PurchaseTraceabilityCropVarProduct.destroy( {
        where: {
          purchase_order_id: lotId
        }
      });
      newCropvariety = await db.PurchaseTraceabilityCropVarProduct.bulkCreate( cropVarietyId.map(cropVar =>  {
        return {
          purchase_order_id: lotId,
          crop_variety_id: cropVar, 
        }
      }) );
    } else {
      await db.PurchaseTraceabilityCropVarProduct.destroy( {
        where: {
          purchase_order_id: lotId
        }
      });
    }


    if(images && Array.isArray(images) && images.length > 0) {
      handleImageUpdates(images, lotId);
    }

    return res.json(successRespSync({
      msg: 'Purchase Order, Packaging Unit, and Pallet updated successfully',
      data: {
       ...newPurchaseOrder, PackagingUnit : newPackagingUnit, Pallets : newPallet,
       RejectionReasonId: newRejectionReason,
      CropVarietyId: newCropvariety,
      }
    }));
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.get('/', async (req, res) => {
  try {
    const { cropId, page = 1, limit } = req.query;

    let where = {};       
    if(cropId) {
      where.cropTypeId = cropId;
    }
    where.userId = req.user.id;

    const queryOptions = {
      where,
      attributes: {
        include: [
          ['external_id', 'externalId']// rename 'columnName' to 'newName'
        ],
        exclude: ['external_id'] // optionally exclude the original column if needed
      },
      include: [
        {
          model: db.user_farm,
          attributes: ["id", "farmName"],
          as: 'userFarms',
        },
        {
          model: db.user,
          attributes: ["id", "firstName", "middleName", "lastName", "fullName"],
          as: 'user',
        },
        {
          model: db.user,
          attributes: ["id", "firstName", "middleName", "lastName", "fullName"],
          as: 'farmer',
        },
        {
          model: db.Geofence,
        },
        {
          model: db.Option,
          attributes: ["id", "name"],
          as: 'cropType',
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
          through: 'PurchaseTraceabilityCropVarProduct',
          as: 'cropVarieties',
          include: [
            {
              model: db.Option,
              as: "crop_variety_type",
            }
          ]
        },
        {
          model: db.CroptypeRejection,
          through: 'AllTraceabilityRejection',
          as: 'rejectionReasons',
        },
        {
          model: db.AllPurchaseTraceabilityImages,
          as: "images",
          attributes: [
            ['file_url', 'location'], "id", "batch_id", "final_product_id", 
            "purchase_order_id", "s3_key", "createdAt", "updatedAt"
          ]
        },
      ],
    };

    // Apply pagination only if limit is provided
    if (limit) {
      const limitValue = parseInt(limit, 10);
      const offsetValue = (page - 1) * limitValue;
      queryOptions.limit = limitValue;
      queryOptions.offset = offsetValue;
    }

    let results = await db.PurchaseOrderManagement.findAndCountAll(queryOptions);
    results = JSON.parse(JSON.stringify(results))
    results.rows = results.rows.map(po => {
      po.externalQR = po?.externalId ? `https://${process.env.TRACEABILITY_URL}/trace-your-product/#/new-traceability?id=${po.externalId}` : null
      return po
    })
    const totalPages = limit ? Math.ceil(results.count / limit) : undefined;
    return res.json(successRespSync({
      msg: success.FETCH,
      data: results.rows,
      pagination: limit ? {
      totalItems: results.count,
      totalPages,
      currentPage: parseInt(page),
      pageSize: parseInt(limit),
    } : undefined,
    }));
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});


router.get('/lotHistory/:lotId', async (req, res) => {
    try {
      const { lotId } = req.params;

      let ordersRes = await db.PurchaseOrderManagement.findOne({
        where: {id: lotId},
        include: [
          {
            model: db.BatchProcessingManagement,
            through: 'MapPurchaseOrderAndProcessingBatches',
            as: 'processingBatches',
            include: [
              {
                model: db.FinalProductManagement,
                through: 'FinalReportBatchProcessing',
                as: 'finalProducts',
              }
            ]
          }
        ],
      });

      return res.json(successRespSync({
        msg: success.FETCH,
        data: ordersRes
      }));
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  });

router.get('/download/pdf/confirmation', async (req, res) => {
  try {
    let results = await db.PurchaseOrderManagement.findAll({
      where: {userId: req.user.id},
      include: [
        {
          model: db.user_farm,
          attributes: ["id","farmName"],
          as: 'userFarms',
          include: [
            {
              model: db.user,
              as: "user",
              attributes: ["id","firstName", "middleName", "lastName"],
            }
          ]
        },
        {
          model: db.user,
          attributes: ["id","firstName", "middleName", "lastName"],
          as: 'user',
        },
        {
          model: db.Option,
          attributes: ["id","name"],
          as: 'cropType',
        }
      ],
    });

    const { globalSettings, userUnitConfig } = await fetchConversionUnits(
      req.user.organization,
      req.user.id
    );
    const currencyData = await fetchCurrencySettings(req, res);
   
    // Extract conversion factors and units
    const weightConversionUnit =
      userUnitConfig?.user_config_unit?.abbvr ||
      globalSettings.weightUnit?.abbvr ||
      "G";
      let weightConversionFactor = 1
      if (userUnitConfig?.user_config_unit?.abbvr) {
        // If user's abbreviation is present, use user's factor or default to 1
        weightConversionFactor = userUnitConfig.user_config_unit.factor ?? 1;
      } else {
        // If no user's abbreviation, fallback to global settings' factor or default to 1
        weightConversionFactor = globalSettings?.weightUnit?.factor ?? 1;
      }
    const currencyFactor = currencyData?.dataValues?.exchange_rate || 1;
    const currencySymbol = currencyData?.dataValues?.abbreviation || "USD"; // Default to USD if no symbol is provided
    const processedData =  []
    for(let i = 0; i < results.length; i++) {
      let tmpObj = {
        LotId: results[i].orderCode,
        Farmer: results[i] && results[i]?.userFarms?.user?.firstName,
        Quantity:
          (results[i]?.availableQuantity / weightConversionFactor).toFixed(2) +
            ` ${weightConversionUnit}` || "",
        CropType: results[i]?.cropType?.name,
        TotalPrice: `${currencySymbol} ${results[i]?.totalPrice / currencyFactor}` || "",
        Date: results[i]?.createdAt && new Date(results[i]?.createdAt).toLocaleDateString(),
    }
      const qrCode = await toDataURL(JSON.stringify(tmpObj));
      const externalQrCode = await toDataURL(`https://${process.env.TRACEABILITY_URL}/trace-your-product/#/new-traceability?id=${results[i]?.external_id}`);

      const qrBase64Img = qrCode.split(',')[1]
      tmpObj.InternalQr = qrBase64Img
      tmpObj.ExternalQr = externalQrCode?.split(',')[1]

      processedData.push(tmpObj)
    }
    let pdfInputObj = {
      title: "PURCHASE CONFIRMATIONS REPORT",
      subHeader: {
        userName: req.user,
        totalLots: results.length,
        quantity: ((results.reduce((acc, curr) => acc + parseInt(curr.availableQuantity || 0),0)) / weightConversionFactor).toFixed(2) +` ${weightConversionUnit}` || "", // we save in grams in DB so convert to kg,
        reportDate: new Date().toLocaleDateString(),
      },
      tableData: processedData,
      translations: ejsTranslation[req.headers.lang || "en"] ?? {},
    } 
    let pdfData
    if(processedData.length === 0 ) { 
      return res.json(
        errorRespSync({
          msg: success.NO_RESPONSE
        })
      );

    } else {
       pdfData = await generateConfirmationPDF(pdfInputObj, req)
    }

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
    

  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.get("/download/pdf/sales-data", async (req, res) => {
  try {
    let results = await db.PurchaseOrderManagement.findAll({
      where: { farmerId: req.user.id },
      include: [
       {
        model:db.Crop,
        
        as: 'cropVarieties',
       },
        {
          model: db.user,
          attributes: ["id", "firstName", "middleName", "lastName"],
          as: "user",
        },
        {
          model: db.Option,
          attributes: ["id", "name"],
          as: "cropType",
        },
      ],
    });

    const { globalSettings, userUnitConfig } = await fetchConversionUnits(
      req.user.organization,
      req.user.id
    );

    // Extract conversion factors and units
    const weightConversionUnit =
    userUnitConfig?.user_config_unit?.abbvr ||
    globalSettings.weightUnit?.abbvr ||
    "kg";
    "G";
  let weightConversionFactor = 1
  if (userUnitConfig?.user_config_unit?.abbvr) {
    // If user's abbreviation is present, use user's factor or default to 1
    weightConversionFactor = userUnitConfig.user_config_unit.factor ?? 1;
  } else {
    // If no user's abbreviation, fallback to global settings' factor or default to 1
    weightConversionFactor = globalSettings?.weightUnit?.factor ?? 1;
  }
    const currencyFactor = globalSettings?.currency?.exchange_rate || 1;
    const currencySymbol = globalSettings?.currency?.abbreviation || "USD"; // Default to USD if no symbol is provided

    const processedData = [];
    for (let i = 0; i < results.length; i++) {
      let tmpObj = {
        Buyer: results[i] && results[i]?.user?.fullName,
        CropType: results[i]?.cropType?.name,
        Variety: results[i]?.cropVarieties?.map((v) => v.name).join(", "),
        Quantity:
          (results[i]?.availableQuantity / weightConversionFactor).toFixed(2) +
            ` ${weightConversionUnit}` || "",
        TotalPrice:
          `${currencySymbol} ${results[i]?.totalPrice / currencyFactor}` || "",
        Date: results[i]?.purchaseDate? new Date(results[i]?.purchaseDate).toLocaleDateString() : "-",
        };
      processedData.push(tmpObj);
    }
    let pdfInputObj = {
      title: "FARMER SALES REPORT",
      subHeader: {
        userName: req.user,
        reportDate: new Date().toLocaleDateString(),
      },
      tableData: processedData,
      translations: ejsTranslation[req.headers.lang || "en"] ?? {},
    };
    let pdfData;
    if (processedData.length === 0) {
      return res.json(
        errorRespSync({
          msg: success.NO_RESPONSE,
        })
      );
    } else {
      pdfData = await generateSalesPDF(pdfInputObj, req);
    }

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
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.get("/download/pdf/packing/:lotId", async (req, res) => {
  try {
    let { lotId } = req.params;
    let results = await db.PurchaseOrderManagement.findOne({
      where: {id: lotId},
      include: [
        {
          model: db.user_farm,
          attributes: ["id","farmName"],
          as: 'userFarms',
          include: [
            {
              model: db.user,
              as: "user",
              attributes: ["id","firstName", "middleName", "lastName"],
            }
          ]
        },
        {
          model: db.PackagingUnit,
        },
        {
          model: db.Pallets,
        },
        {
          model: db.user,
          attributes: ["id","firstName", "middleName", "lastName"],
          as: 'user',
        },
        {
          model: db.Option,
          attributes: ["id","name"],
          as: 'cropType',
        }
      ],
    });
    const { globalSettings, userUnitConfig } = await fetchConversionUnits(
      req.user.organization,
      req.user.id
    );
  
    // Extract conversion factors and units
    const weightConversionFactor =
      userUnitConfig?.user_config_unit?.factor ||
      globalSettings.weightUnit?.factor ||
      1;
    const weightConversionUnit =
      userUnitConfig?.user_config_unit?.abbvr ||
      globalSettings.weightUnit?.abbvr ||
      "G";

    let totalPallets = 0, totalBoxes = 0
    const processedData =  []
    for(let i = 0; i < results.Pallets?.length; i++) {
      totalPallets++
      totalBoxes += results.PackagingUnit.no_of_units
      let tmpObj = {
        PalletId: results?.Pallets[i]?.pallet_id || "",
        FarmName: results?.userFarms?.farmName || "",
        TotalBoxes: results?.PackagingUnit?.no_of_units || "",
        Quantity:
          `${
            results?.Pallets[i]?.quantity / weightConversionFactor
          } ${weightConversionUnit}` || "",
      };
      const qrCode = await toDataURL(JSON.stringify(tmpObj));

      const qrBase64Img = qrCode.split(',')[1]
      tmpObj.InternalQr = qrBase64Img

      processedData.push(tmpObj)
    }
    let pdfInputObj = {
      title: "PACKING QR CODES",
      subHeader: {
        lotId: results.orderCode,
        totalPallets,
        totalBoxes: totalBoxes,
        reportDate: new Date().toLocaleDateString(),
      },
      tableData: processedData,
      translations: ejsTranslation[req.headers.lang || "en"] ?? {},
    } 
    let pdfData
    if(processedData.length === 0 ) { 
      return res.json(
        errorRespSync({
          msg: success.NO_RESPONSE
        })
      );

    } else {
       pdfData = await generatePalletPDF(pdfInputObj, req)
    }

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
    

  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.get('/curated-list', async (req, res) => {
  try {
    const { cropId, page = 1, limit } = req.query;

    // Convert limit and page to integers and handle missing limit
    const parsedLimit = limit ? parseInt(limit, 10) : undefined;
    const offset = parsedLimit ? (page - 1) * parsedLimit : 0;

    const where = {
      farmerId: req.user.id,
    };

    if (cropId) {
      where.cropTypeId = cropId;
    }

    const results = await db.PurchaseOrderManagement.findAndCountAll({
      where,
      include: [
        {
          model: db.user_farm,
          attributes: ["id", "farmName"],
          as: 'userFarms'
        },
        {
          model: db.user,
          attributes: ["id","firstName","middleName","lastName","fullName"],
          as: 'user',
        },
        {
          model: db.user,
          attributes: ["id", "firstName","middleName","lastName","fullName"],
          as: 'farmer',
        },
        {
          model: db.Option,
          attributes: ["id", "name"],
          as: 'cropType',
        },
        {
          model: db.CroptypeProductType,
          attributes: ["id", "name"],
        },
        {
          model: db.Crop,
          through: {
            model: db.PurchaseTraceabilityCropVarProduct,
            attributes: [],
          },
          as: 'cropVarieties',
          include: [
            {
              model: db.Option,
              attributes: ["id", "name"],
              as: "crop_variety_type",
            }
          ],
          attributes: ["id", "countryId", "cropTypeOptId", "name"],  // Exclude timestamps here too
        },
        {
          model: db.CroptypeRejection,
          through: {
            model: db.AllTraceabilityRejection,
          },
          as: 'rejectionReasons',
          attributes: ["id", "croptypeId", "name", "cropTypeId"],  // Exclude timestamps here too
        },
      ],
      attributes: [
        "id",
        "userId",
        "farmerId",
        "farmId",
        "qualityGrade",
        "quantity",
        "wasteQuantity",
        "finalQuantity",
        "availableQuantity",
        "pricePerUnit",
        "totalPrice",
        "createdAt",
        "purchaseDate",
        "isComplete",
        "orderCode"
      ],
      offset,
      limit: parsedLimit,  // Use the parsed limit value
    });

    const totalPages = parsedLimit ? Math.ceil(results.count / parsedLimit) : 1;
    const data = {
      info: results.rows,
      pagination: parsedLimit ? {
        totalItems: results.count,
        totalPages,
        currentPage: parseInt(page, 10),
        pageSize: parsedLimit,
      } : null,
    };
    
    return res.json(successRespSync({
      msg: success.FETCH,
      data
    }));
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});



module.exports = router;