const express = require("express");
const router = express.Router();
const db = require(rootPath + "/models");
const auth = require(rootPath + "/middleware/auth");
const { logErrorOccurred } = require(rootPath + "/helpers/general");
const { success, error } = require(rootPath + "/helpers/language");
const { successRespSync, serverError, errorRespSync } = require(rootPath +
  "/helpers/api");
const checkDataComplete = require(rootPath + "/middleware/checkDataComplete");
const { fetchConversionUnits,fetchCurrencySettings } = require(rootPath + "/routes/crop/utility");

const moment = require("moment");
const { Op, where } = require("sequelize");
const finalProductPdfGenerator = require("../../helpers/finalProductPdfGenerator");
const fs = require("fs");
var { toDataURL } = require("qrcode");
const path = require("path");
const { setCanvasKitWasmLocateFile } = require("@ngageoint/geopackage");
const insertTraceabilityExternalId = require(rootPath + "/helpers/externalTracebilityId");

router.post("/user", auth, async function (req, res) {
  try {
    let { organization } = req.user;
    await createUser(req.body, organization);

    return res.json(
      successRespSync({
        msg: success.REGISTERED,
        data: newUser,
      })
    );
  } catch (err) {

    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});
router.get("/user", auth, async function (req, res) {
  try {
    const { organization } = req.user;
    let users = await db.user.findAll({
      attributes: ["id", "fullName", "firstName", "middleName", "lastName", "recordId"],
      where: {
        userType: "final_product_buyer",
        organization,
      },
    });
    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: users,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.post(
  "/",
  checkDataComplete.handleIncompleteData(["buyer_id", "crop_type", "batchManagementIds"]),
  auth,
  async function (req, res) {
    try {
      const { id: user_id, organization } = req.user;
      const {
        issued_date,
        buyer_id,
        new_buyer,
        product_name,
        crop_type,
        quality,
        quantity,
        hasWaste,
        waste_quantity,
        wasteRejectionReasons,
        final_quantity,
        private_info,
        public_info,
        images,
        batchManagementIds,
        packagingUnit,
        pallets,
        recordId,
        isComplete,
      } = req.body;

      let finalProduct;
      if (buyer_id) {
        const set = {
          user_id,
          issued_date,
          buyer_id,
          product_name,
          crop_type,
          quality,
          quantity,
          hasWaste,
          waste_quantity,
          final_quantity,
          private_info,
          public_info,
          recordId,
          isComplete,
        };
        finalProduct = await db.FinalProductManagement.create(setCanvasKitWasmLocateFile);
      } else {
        let user;
        let complete = false;
        if (new_buyer && Object.keys(new_buyer).length) {
          user = await createUser(new_buyer, organization);
          complete = true;
        }
        const set = {
          user_id,
          issued_date,
          buyer_id: user?.id ?? null,
          product_name,
          crop_type,
          quality,
          quantity,
          hasWaste,
          waste_quantity,
          final_quantity,
          private_info,
          public_info,
          recordId,
          isComplete: complete, 
        };
        finalProduct = await db.FinalProductManagement.create(set,);
      }

      let updateLot = {
        lot_id: `FP-00${finalProduct.id}`,
      };
      await finalProduct.set(updateLot).save();

      // SAVING WASTE REJECTION REASON
      if (wasteRejectionReasons && wasteRejectionReasons.length > 0) {
        const setMapFinalProductRejectionReason = wasteRejectionReasons?.map(
          (rID) => ({
            final_product_id: finalProduct.id,
            reason_id: rID,
          })
        );
        await db.AllTraceabilityRejection.bulkCreate(
          setMapFinalProductRejectionReason
        );
      }

      // SAVING IMAGES
      if (images && images.length > 0) {
        let filesArr = [];
        images.forEach(async (res, index) => {
          filesArr.push({
            final_product_id: finalProduct.id,
            s3_key: res.s3_key,
            file_url: `${
              process.env.PUBLIC_BUCKET_URL ||
              "https://dimitra-public-images.s3.amazonaws.com/"
            }${res.s3_key}`,
          });
        });
        await db.AllPurchaseTraceabilityImages.bulkCreate(filesArr);
      }

      // MAPPING BATCH PROCESSING TO FINAL REPORT
      if (batchManagementIds && batchManagementIds.length > 0) {
        for (let batchMngmnt of batchManagementIds) {
          let batchProcessing = await db.BatchProcessingManagement.findOne({
            where: {
              id: batchMngmnt.batchId,
            },
            attributes: ["available_quantity", "id"],
          });
          if (!batchProcessing) {
            throw new Error(error.BATCH_PROCESSING_MANAGEMENT);
          }
          if (batchMngmnt.palletId && batchMngmnt.palletId.length > 0) {
            batchMngmnt.palletId.forEach(async (el) => {
              let pallet = await db.Pallets.findOne({
                where: {
                  id: el,
                },
              });
              await pallet.update({ used: true });
            });
          } else {
            let updatedWeight =
              batchProcessing.available_quantity - batchMngmnt.quantity;
            if (updatedWeight < 0) updatedWeight = 0;
            await db.BatchProcessingManagement.update(
              {
                available_quantity: updatedWeight,
              },
              {
                where: { id: batchProcessing.id },
              }
            );
          }
          await db.FinalReportBatchProcessing.create(
            {
              final_product_id: finalProduct.id,
              batch_quantity: batchMngmnt.quantity,
              processing_batch_id: batchProcessing.id,
            }
          );
          await batchProcessing.set({ isUsed: true }).save();
        }
      }

      let packUnit;
      if (packagingUnit) {
        let payload = {
          final_product_id: finalProduct.id,
          packing_unit_type: packagingUnit.type,
          packing_unit_value: packagingUnit.packing_unit_value,
          no_of_units: packagingUnit.no_of_units,
          pallet_size: packagingUnit.pallet_size,
          number_of_pallets: packagingUnit.number_of_pallets,
        };
        packUnit = await db.PackagingUnit.create(payload);
      }

      if (packagingUnit && pallets.length > 0) {
        const payload = pallets.map((p) => ({
          final_product_id: finalProduct.id,
          packing_unit_id: packUnit.id,
          pallet_id: p.pallet_id,
          no_of_boxes: p.no_of_boxes,
          quantity: p.quantity,
        }));
        await db.Pallets.bulkCreate(payload);
      }

      const externalId  = await insertTraceabilityExternalId(
        "final_product",
        finalProduct.id
      );
    
      await db.FinalProductManagement.update(
        {  external_id: externalId.id },
        {
          where: {
            id: finalProduct.id
          },
        }
      );
      return res.json(
        successRespSync({
          msg: success.REGISTERED,
          data: finalProduct,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

router.put(
  "/:reportId",
  checkDataComplete.handleIncompleteData(["crop_type", "batchManagementIds"]),
  auth,
  async function (req, res) {
    try {
      const { id: user_id, organization } = req.user;
      const { reportId } = req.params;
      const {
        issued_date,
        buyer_id,
        new_buyer,
        product_name,
        crop_type,
        quality,
        quantity,
        hasWaste,
        waste_quantity,
        wasteRejectionReasons,
        final_quantity,
        private_info,
        public_info,
        images,
        batchManagementIds,
        packagingUnit,
        pallets,
        recordId,
        isComplete,
      } = req.body;

      if (buyer_id) {
        const set = {
          user_id,
          issued_date,
          buyer_id,
          product_name,
          crop_type,
          quality,
          quantity,
          hasWaste,
          waste_quantity,
          final_quantity,
          private_info,
          public_info,
          recordId,
          isComplete,
        };
        await db.FinalProductManagement.update(
          set,
          { where: { id: reportId } }
        );
      } else {
        const user = await createUser(new_buyer, organization);
        const set = {
          user_id,
          issued_date,
          buyer_id: user.id,
          product_name,
          crop_type,
          quality,
          quantity,
          hasWaste,
          waste_quantity,
          final_quantity,
          private_info,
          public_info,
          recordId,
          isComplete,
        };
        await db.FinalProductManagement.update(
          set,
          {
            where: { id: reportId },
          }
        );
      }

      if (wasteRejectionReasons && wasteRejectionReasons.length > 0) {
        await db.AllTraceabilityRejection.destroy({
          where: {
            final_product_id: reportId,
          }
        });
        const setMapFinalProductRejectionReason = wasteRejectionReasons?.map(
          (rID) => ({
            final_product_id: finalProduct.id,
            reason_id: rID,
          })
        );
        await db.AllTraceabilityRejection.bulkCreate(
          setMapFinalProductRejectionReason
        );
      }

      if (images && images.length > 0) {
        await db.AllPurchaseTraceabilityImages.destroy({
          where: {
            final_product_id: reportId,
          }
        });
        let filesArr = [];
        images.forEach(async (res, index) => {
          filesArr.push({
            final_product_id: finalProduct.id,
            s3_key: res.s3_key,
            file_url: `${
              process.env.PUBLIC_BUCKET_URL ||
              "https://dimitra-public-images.s3.amazonaws.com/"
            }${res.s3_key}`,
          });
        });
        await db.AllPurchaseTraceabilityImages.bulkCreate(filesArr);
      }

      if (batchManagementIds && batchManagementIds.length > 0) {
        // Revert quantity and isUsed flags of processing batches
        for (let batchMngmnt of batchManagementIds) {
          // Check if Final report and batch mapping exist
          let mapFinalReportBatch = await db.FinalReportBatchProcessing.findOne(
            {
              where: {
                final_product_id: reportId,
                processing_batch_id: batchMngmnt.batchId,
              },
            }
          );
          // If map exist
          if (mapFinalReportBatch) {
            // Find the mapped processing batch
            let batchProcessing = await db.BatchProcessingManagement.findOne({
              where: {
                id: batchMngmnt.batchId,
              },
              attributes: ["available_quantity", "id"],
            });
            // adding the quantity back to processing batch
            let set = {
              available_quantity:
                batchProcessing + mapFinalReportBatch.batch_quantity,
            };
            // check if same batch report is used with other final product
            let hasBatchMappingwithFinalReport =
              await db.FinalReportBatchProcessing.findAll({
                where: {
                  processing_batch_id: batchMngmnt.batchId,
                },
              });
            if (
              hasBatchMappingwithFinalReport &&
              hasBatchMappingwithFinalReport.length > 0
            ) {
              set.isUsed = true;
            } else {
              set.isUsed = false;
            }
            await batchProcessing.set(set).save();
          } else {
            throw new Error(error.BATCH_PROCESSING_MANAGEMENT);
          }
        }

        // Finally destroying processing batches and final product mappings
        await db.FinalReportBatchProcessing.destroy(
          {
            final_product_id: finalProduct.id,
            batch_quantity: batchMngmnt.quantity,
            processing_batch_id: batchProcessing.id,
          },
        );

        // Register the new processing batches
        for (let batchMngmnt of batchManagementIds) {
          let batchProcessing = await db.BatchProcessingManagement.findOne({
            where: {
              id: batchMngmnt.batchId,
            },
            attributes: ["available_quantity", "id"],
          });
          if (!batchProcessing) {
            throw new Error(error.BATCH_PROCESSING_MANAGEMENT);
          }
          if (batchMngmnt.palletId && batchMngmnt.palletId.length > 0) {
            batchMngmnt.palletId.forEach(async (el) => {
              let pallet = await db.Pallets.findOne({
                where: {
                  id: el,
                },
              });
              await pallet.update({ used: true });
            });
          } else {
            let updatedWeight =
              batchProcessing.available_quantity - batchMngmnt.quantity;
            if (updatedWeight < 0) updatedWeight = 0;
            await db.BatchProcessingManagement.update(
              {
                available_quantity: updatedWeight,
              },
              {
                where: { id: batchProcessing.id },
              }
            );
          }
          await db.FinalReportBatchProcessing.create(
            {
              final_product_id: finalProduct.id,
              batch_quantity: batchMngmnt.quantity,
              processing_batch_id: batchProcessing.id,
            }
          );
          await batchProcessing.set({ isUsed: true }).save();
        }
      }

      let packUnit;
      if (packagingUnit) {
        await db.PackagingUnit.destroy({
          where: {
            final_product_id: reportId
          }
        });
        let payload = {
          final_product_id: finalProduct.id,
          packing_unit_type: packagingUnit.type,
          packing_unit_value: packagingUnit.packing_unit_value,
          no_of_units: packagingUnit.no_of_units,
          pallet_size: packagingUnit.pallet_size,
          number_of_pallets: packagingUnit.number_of_pallets,
        };
        packUnit = await db.PackagingUnit.create(payload);
      }

      if (packagingUnit && pallets.length > 0) {
        await db.Pallets.destroy({
          where: {
            final_product_id: reportId
          }
        });
        const payload = pallets.map((p) => ({
          final_product_id: finalProduct.id,
          packing_unit_id: packUnit.id,
          pallet_id: p.pallet_id,
          no_of_boxes: p.no_of_boxes,
          quantity: p.no_of_boxes * packagingUnit.packing_unit_value,
        }));
        await db.Pallets.bulkCreate(payload);
      }


      return res.json(
        successRespSync({
          msg: success.REGISTERED,
          data: finalProduct,
        })
      );
    } catch (err) {

      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

router.get("/", auth, async function (req, res) {
  try {
    let {
      page = 1,
      limit,
      startDate,
      endDate,
      searchPhrase,
      order,
      orderField,
    } = req.query;
    let where = {
      user_id: req.user.id,
    };
    let query = {
      attributes: {
        include: [
          ['external_id', 'externalId']// rename 'columnName' to 'newName'
        ],
        exclude: ['external_id'] // optionally exclude the original column if needed
      },
      where,
      include: [
        {
          model: db.user,
          as: "buyer",
          attributes: ["id", "fullName", "firstName", "middleName", "lastName"],
        },
        {
          model: db.user,
          as: "user",
          attributes: ["id", "fullName", "firstName", "middleName", "lastName"],
        },
        {
          model: db.BatchProcessingManagement,
          as: "batchProcessing",
          include: [
            {
              model: db.Option,
              as: "cropType",
            },
          ],
          through: {
            model: db.FinalReportBatchProcessing,
            attributes: [],
          },
        },
        {
          model: db.CroptypeRejection,
          as: "rejectionReason",
          attributes: ["id", "cropTypeId", "name"],
          through: {
            model: db.AllTraceabilityRejection,
            attributes: [],
          },
        },
        {
          model: db.PackagingUnit,
          as: "packingUnit",
          attributes: [
            "id",
            "packing_unit_type",
            "packing_unit_value",
            "no_of_units",
            "pallet_size",
            "number_of_pallets",
          ],
        },
        {
          model: db.Pallets,
          as: "pallets",
          attributes: [
            "id",
            "packing_unit_id",
            "pallet_id",
            "quantity",
            "used",
            "no_of_boxes"
          ],
        },
        {
          model: db.AllPurchaseTraceabilityImages,
          as: "final_product_images",
          attributes: ["id", "file_url"],
        },
      ],
      required: true,
      distinct: true,
    };
    if (searchPhrase) {
      where[Op.or] = {
        lot_id: { [Op.like]: `%${searchPhrase}%` },
      };
    }
    if (order && orderField) {
      query.order = [[orderField, order]];
    } else {
      query.order = [["createdAt", "DESC"]];
    }
    if (page && limit) {
      page = parseInt(page);
      limit = parseInt(limit);
      query.offset = (page - 1) * limit;
      query.limit = limit;
    }
    if (startDate || endDate) {
      where = {
        ...where,
        issued_date: {
          [db.Sequelize.Op.between]: [startDate, endDate],
        },
      };
    }
    let finalProduct = await db.FinalProductManagement.findAndCountAll({
      ...query,
    });
    finalProduct = JSON.parse(JSON.stringify(finalProduct))
    finalProduct.rows = finalProduct.rows.map((fp) => {
      fp.externalQR = fp?.externalId ? `https://${process.env.TRACEABILITY_URL}/trace-your-product/#/new-traceability?id=${fp.externalId}` : null
      return fp
    })
    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: finalProduct,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.get("/pdf", auth, async function (req, res) {
  let finalProduct = await db.FinalProductManagement.findAll({
    where: {
      user_id: req.user.id,
    },
    include: [
      {
        model: db.user,
        as: "buyer",
        attributes: ["id", "fullName", "firstName", "middleName", "lastName"],
      },
      {
        model: db.user,
        as: "user",
        attributes: ["id", "fullName", "firstName", "middleName", "lastName"],
      },
      {
        model: db.BatchProcessingManagement,
        as: "batchProcessing",
        include: [
          {
            model: db.Option,
            as: "cropType",
          },
        ],
        through: {
          model: db.FinalReportBatchProcessing,
          attributes: [],
        },
      },
      {
        model: db.CroptypeRejection,
        as: "rejectionReason",
        attributes: ["id", "cropTypeId", "name"],
        through: {
          model: db.AllTraceabilityRejection,
          attributes: [],
        },
      },
      {
        model: db.PackagingUnit,
        as: "packingUnit",
        attributes: [
          "id",
          "packing_unit_type",
          "packing_unit_value",
          "no_of_units",
          "pallet_size",
          "number_of_pallets",
        ],
      },
      {
        model: db.Pallets,
        as: "pallets",
        attributes: ["id", "packing_unit_id", "pallet_id", "quantity", "used"],
      },
      {
        model: db.AllPurchaseTraceabilityImages,
        as: "final_product_images",
        attributes: ["id", "file_url"],
      },
    ],
  });

  // Extract conversion factors and units
 const {weightConversionFactor,weightConversionUnit} = await fetchUserSettings(req.user,req,res);
  let finalData = [];
  for (let i = 0; i < finalProduct.length; i++) {
    let product = finalProduct[i];
    let tempObj = {
      lot_id: product.lot_id,
      buyer: product.buyer.fullName,
      productName: product.product_name,
      packingUnit:
        product.packingUnit.packing_unit_type +
        " (" +
        (product.packingUnit.packing_unit_value / weightConversionFactor).toFixed(2) +
        " " + weightConversionUnit + ")",
      qualityGrade: product.quality,
      quantity: (product.quantity / weightConversionFactor).toFixed(2) + " " + weightConversionUnit,
      date: moment(product.issued_date).format("DD/MM/YYYY"),
    };
    const qrCode = await toDataURL(JSON.stringify(tempObj));

    const qrBase64Img = qrCode.split(",")[1];
    const externalQrCode = await toDataURL(`https://${process.env.TRACEABILITY_URL}/trace-your-product/#/new-traceability?id=${finalProduct[i]?.external_id}`);
    tempObj.internalQr = qrBase64Img;
    tempObj.externalQr = externalQrCode?.split(",")[1];

    finalData.push(tempObj);
  }

  const data = {
    title: "Facility Output Report",
    userName: finalProduct[0]?.user?.fullName,
    totalLot: finalProduct.length,
    quantity: finalProduct.reduce((a, b) => a + b.final_quantity, 0).toFixed(2)/weightConversionFactor + " " + weightConversionUnit,
    date: moment().format("DD/MM/YYYY"),
    finalProduct: finalData,
  };
  let pdfData = await finalProductPdfGenerator(data,req);
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
    await fs.createReadStream(pdfData.path).pipe(res);
    fs.unlink(
      path.resolve(rootPath + `/views/reports/${pdfData.fileName}`),
      (err) => {
        if (err) {
          console.log(err, "While deleting Facility output pdf file");
          return;
        }
      }
    );
    return;
  }
});

const createUser = async (userObj, organization) => {
  const {
    fullName,
    email,
    phoneNumber,
    country,
    address,
    recordId
  } = userObj;
  
  // Check if user already exists with email
  if (email) {
    const existingUser = await db.user.findOne({
      where: { email: email }
    });
    
    if (existingUser) {
      throw new Error('User already exists with this email');
    }
  }
  
  let newUser = await db.user.create(
    {
      firstName: fullName,
      email,
      phoneNumber,
      country,
      address,
      organization,
      userType: "final_product_buyer",
      recordId,
      source: 'saas_api_final_product_buyer'
    }
  );
  return newUser;
};

async function fetchUserSettings(user, req, res) {
  // Fetch conversion units based on user's organization and user ID
  const { globalSettings, userUnitConfig } = await fetchConversionUnits(
    user.organization,
    user.id
  );

  // Fetch currency settings based on the request
  const currencyData = await fetchCurrencySettings(req, res);

  // Determine the weight conversion unit and factor
  let weightConversionUnit;
  let weightConversionFactor;

  if (userUnitConfig?.user_config_unit?.abbvr) {
    // User setting takes priority
    weightConversionUnit = userUnitConfig.user_config_unit.abbvr;
    weightConversionFactor = userUnitConfig.user_config_unit.factor ?? 1; // Default to 1 if factor is null or undefined
  } else {
    // Fallback to global settings if user config is not present
    weightConversionUnit = globalSettings?.weightUnit?.abbvr || "G";
    weightConversionFactor = globalSettings?.weightUnit?.factor ?? 1;
  }

  return {
    weightConversionUnit,
    weightConversionFactor,
    currencyFactor: currencyData?.exchange_rate ?? 1, // Default to 1 if missing
    currencySymbol: currencyData?.abbreviation ?? "USD", // Default to "USD" if missing
  };
}


module.exports = router;
