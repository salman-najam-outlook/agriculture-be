const db = require(rootPath + "/models");
const _ = require("lodash");
const fs = require("fs");
const path = require("path");
const ejs = require("ejs");
const html_to_pdf = require("html-pdf-node");
const { fetchConversionUnits, fetchCurrencySettings } = require(rootPath + "/routes/crop/utility");
var { toDataURL } = require("qrcode");
const translationsLocales = require(rootPath +
  "/helpers/translation.locale.js");
const { deleteFileS3 } = require(rootPath + '/helpers/aws_s3'); // s3 functions


// Utility function to map image data to the format required for the database
const mapImageData = (images, batchId) => {
  const baseUrl =
    process.env.PUBLIC_BUCKET_URL ||
    "https://dimitra-public-images.s3.amazonaws.com/";

  return images.map((image) => ({
    batch_id: batchId,
    s3_key: image.s3_key,
    file_url: `${baseUrl}${image.s3_key}`,
  }));
};

// Insert new images into the BatchImages table
const insertImages = async (images, batchId) => {
  if (!images?.length) return;
  const imageData = mapImageData(images, batchId);
  await db.AllPurchaseTraceabilityImages.bulkCreate(imageData);
};

// Handle updates to images associated with a batch
const handleImageUpdates = async (images, batchId) => {
  if (!images?.length) return;

  const existingImages = await db.AllPurchaseTraceabilityImages.findAll({
    where: { batch_id: batchId },
    raw: true,
  });

  const imagesToDelete = _.differenceBy(existingImages, images, "s3_key");
  const imagesToAdd = _.differenceBy(images, existingImages, "s3_key");

  // Delete images no longer associated with the batch
  if (imagesToDelete.length) {
    await Promise.all(
      imagesToDelete.map((image) =>
        deleteFileS3({
          Bucket: process.env.AWS_PUBLIC_BUCKET,
          Key: image.s3_key,
        })
      )
    );

    await db.AllPurchaseTraceabilityImages.destroy({
      where: { s3_key: imagesToDelete.map((img) => img.s3_key) },
    });
  }

  // Add new images to the batch
  if (imagesToAdd.length) {
    const newImageData = mapImageData(imagesToAdd, batchId);
    await db.AllPurchaseTraceabilityImages.bulkCreate(newImageData);
  }
};

// Delete all images associated with a batch
const deleteImages = async (batchId) => {
  const images = await db.AllPurchaseTraceabilityImages.findAll({
    where: { batch_id: batchId },
    raw: true,
  });

  if (images.length) {
    // await Promise.all(
    //   images.map((image) =>
    //     deleteFileS3({
    //       Bucket: process.env.AWS_PUBLIC_BUCKET,
    //       Key: image.s3_key,
    //     })
    //   )
    // );

    await db.AllPurchaseTraceabilityImages.destroy({
      where: { batch_id: batchId },
    });
  }
};

async function generateBatchManagementPDF(req, batches, userInfo) {
  try {
    const html = await renderBatchPDFTemplate(req, batches, userInfo);
    const fileName = `Batch_Report_${Date.now()}.pdf`;
    const fileDestination = path.resolve(
      __dirname,
      "../../..",
      `views/reports/${fileName}`
    );

    const options = createPDFOptions(fileDestination);
    const pdf = await html_to_pdf.generatePdf({ content: html }, options);

    if (pdf) {
      return { fileName, path: fileDestination };
    } else {
      throw new Error("PDF generation failed");
    }
  } catch (error) {
    console.error("Error generating batch management PDF:", error);
    throw error;
  }
}

// Renders the PDF template using EJS
async function renderBatchPDFTemplate(req, batches, userInfo) {
  const templatePath = path.resolve(
    __dirname,
    "../../..",
    "views/batch_traceability/BatchPDF.html.ejs"
  );
  const template = await fs.promises.readFile(templatePath, "utf8");

  // Prepare the data with translations
  const { data } = await preparePDFData(req, batches, userInfo);
  if(!req.headers.lang){
    req.headers.lang = 'en';
  }
  const translations = translationsLocales[req.headers.lang] || {};

  // Render the template with the data and translations
  return ejs.render(template, { data, translations });
}

// Prepares data for the PDF generation
async function preparePDFData(req, batches, userInfo) {
  // Fetch conversion units based on organization and user ID
  const { globalSettings, userUnitConfig } = await fetchConversionUnits(
    req.user.organization,
    req.user.id
  );
  const currencyData = await fetchCurrencySettings(req);

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
  const currencyFactor = currencyData.dataValues?.exchange_rate || 1;
  const currencySymbol = currencyData.dataValues?.abbreviation || "USD"; // Default to USD if no symbol is provided
  const totalQuantityInConvertedUnit = (
    batches.reduce((sum, batch) => sum + parseFloat(batch.quantity), 0) /
    weightConversionFactor
  ).toFixed(2);

  const pdfObj = {
    userName: userInfo.fullName,
    totalLots: batches.length,
    totalQuantity: `${totalQuantityInConvertedUnit} ${weightConversionUnit}`,
    reportDate: new Date().toLocaleDateString(),
    batches: await Promise.all(
      batches.map(async (batch) => {
        let qrData = JSON.parse(JSON.stringify(batch))
        if(qrData) {
          delete qrData.purchaseOrders // we dont need purchase data for batch pdf
        }
        const qrCode = await toDataURL(JSON.stringify(qrData));
        const externalQrCode = await toDataURL(`https://${process.env.TRACEABILITY_URL}/trace-your-product/#/new-traceability?id=${batch?.external_id}`);
        const qrBase64Img = qrCode.split(",")[1];
        const packagingUnitValue =
          batch.PackagingUnit?.packing_unit_value || "N/A";
        const quantityInConvertedUnit = (
          batch.quantity / weightConversionFactor
        ).toFixed(2);
        const packagingUnitConverted =
          packagingUnitValue !== "N/A"
            ? (packagingUnitValue / weightConversionFactor).toFixed(2)
            : "N/A";
       
        const totalPrice =
          batch.purchaseOrders.reduce((sum, order) => {
            let purchaseBatchMapping = order.purchase_batch_mapping?.toJSON();
            let orderTotalPrice = purchaseBatchMapping?.totalPrice != null 
              ? parseFloat(purchaseBatchMapping.totalPrice) 
              : 0;
            return sum + orderTotalPrice;
          }, 0) * currencyFactor;
        return {
          id: batch.id,
          lot_id: batch.lot_id,
          cropType: batch.cropType.name,
          selectedLots: batch.purchaseOrders.length,
          quantity: `${quantityInConvertedUnit} ${weightConversionUnit}`, // Convert quantity to the appropriate unit
          packagingUnit: `Box (${packagingUnitConverted} ${weightConversionUnit})`, // Convert packaging unit
          totalPrice: `${currencySymbol} ${totalPrice}`, // Set the calculated total price with currency symbol
          date: new Date(batch.date_of_issue).toLocaleDateString(),
          internalQR: qrBase64Img,
          externalQR: externalQrCode?.split(",")[1]
        };
      })
    ),
  };

  // const finalObj = req.headers.lang !== 'en' ? translatedReportData(pdfObj, req.header.lang) : pdfObj;

  return { data: pdfObj };
}

// Creates PDF options including the footer template
function createPDFOptions(fileDestination) {
  const footerTemplate = `
    <div style="width: 100%; background: white; padding: 0px 20px; display: flex; justify-content: space-between; font-size: 10px; color: #333;">
      <div>www.dimitra.io</div>
      <div>Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>
    </div>
  `;

  return {
    format: "A4",
    printBackground: true,
    path: fileDestination,
    displayHeaderFooter: true,
    footerTemplate,
    margin: {
      bottom: "30mm",
    },
  };
}

// (batch) => ({
//   id: batch.id,
//   lot_id: batch.lot_id,
//   cropType: batch.cropType.name,
//   selectedLots: batch.purchaseOrders.length,
//   quantity: `${batch.quantity} kg`,
//   packagingUnit: `Box (${batch.packingUnit.packing_unit_value} kg)`,
//   totalPrice: `USD ${(
//     batch.quantity * batch.packingUnit.packing_unit_value
//   ).toFixed(2)}`,
//   date: new Date(batch.date_of_issue).toLocaleDateString(),
//   internalQR: "path-to-internal-qr-code.png", // Placeholder for actual QR code data
//   externalQR: "path-to-external-qr-code.png", // Placeholder for actual QR code data
// })

// Streams the PDF directly to the response
async function streamBatchManagementPDF(req, res, batches, userInfo, images) {
  try {
    const { fileName, path: fileDestination } =
      await generateBatchManagementPDF(req, batches, userInfo);

    res.writeHead(200, {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=${fileName}`,
    });

    return fs.createReadStream(fileDestination).pipe(res);
  } catch (error) {
    console.error("Error streaming PDF:", error);
    res.status(500).send("Error generating PDF");
  }
}

const createBatchPayload = (body, isCreate) => {
  return {
    date_of_issue: body.date_of_issue,
    crop_type: body.crop_type,
    quality_grade: body.quality_grade,
    quantity: body.quantity,
    private_info: body.private_info,
    public_info: body.public_info,
    waste_quantity: body.waste_quantity,
    final_quantity: body.final_quantity,
    userId: body.userId,
    org_id: body.org_id,
    available_quantity:  body.final_quantity,
    isComplete: body.isComplete,
    recordId: body.recordId,
  };
};

// Helper function to handle pagination logic
const buildPagination = (count, page, limit) => {
  const totalPages = limit ? Math.ceil(count / parseInt(limit)) : 1;

  return {
    totalItems: count,
    totalPages,
    currentPage: parseInt(page),
    pageSize: limit ? parseInt(limit) : count,
  };
};

// Helper function to fetch the total count of rows
const fetchTotalCount = async (filters) => {
  const whereClause = buildWhereClause(filters);

  // Count all rows without any grouping
  const count = await db.BatchProcessingManagement.count({
    where: whereClause,
  });

  return count;
};

const getBatchIncludes = () => [
  { model: db.Option, as: "cropType", attributes: ["id", "name"] },
  {
    model: db.PurchaseOrderManagement,
    as: "purchaseOrders",
    through: {
      model: db.MapPurchaseOrderAndProcessingBatches,
      attributes: ["totalPrice", "purchase_quantity","purchase_order_id","processing_batch_id"],
      as: "purchase_batch_mapping",
    },
    include:[
      {
        model: db.Pallets,
        attributes: ["id", "packing_unit_id", "pallet_id", "quantity", "used","batch_id"],
        where: {
          used: { [db.Sequelize.Op.is]: true },
        },
        required: false,
      },
      {
        model:db.PackagingUnit,
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
        model:db.user,
        attributes: ["id", "firstName", "middleName", "lastName", "fullName"],
        as: "farmer",
      }
    ],
  },
  {
    model: db.CroptypeRejection,
    as: "WasteReasons",
    through: {
      model: db.AllTraceabilityRejection,
      attributes: [],
    },
    attributes: ["id", "croptypeId", "name"],
  },
  {
    model: db.user,
    attributes: ["id", "firstName", "middleName", "lastName", "fullName"],
    as: "user",
  },
  {
    model: db.AllPurchaseTraceabilityImages,
    as: "batch_images",
    attributes: ["id", "file_url", "s3_key"],
  },
  {
    model: db.PackagingUnit,
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
    attributes: ["id", "packing_unit_id", "pallet_id", "quantity", "used"],
    where: {
      purchase_order_id: { [db.Sequelize.Op.is]: null },
    },
    required: false,
  },
];

const getBatchAttributes = () => [
  "id",
  "date_of_issue",
  "crop_type",
  "quality_grade",
  "quantity",
  "private_info",
  "public_info",
  "waste_quantity",
  "final_quantity",
  "available_quantity",
  "lot_id",
  "createdAt",
  "updatedAt",
  "deletedAt",
];

// Helper function for creating packaging unit payload
const createPackagingUnitPayload = (body) => {
  return {
    packing_unit_type: body.type,
    packing_unit_value: body.packing_unit_value,
    no_of_units: body.no_of_units,
    pallet_size: body.pallet_size,
    number_of_pallets: body.number_of_pallets,
  };
};

// Helper function for creating pallets payload
const createPalletsPayload = (body, packing_unit_id) => {
  return body.map((pallet) => ({
    packing_unit_id: packing_unit_id,
    pallet_id: pallet.pallet_id,
    quantity: pallet.quantity,
    used: pallet.used,
  }));
};

const buildDateRangeClause = (startDate, endDate) => {
  const dateClause = {};
  if (startDate) dateClause[Op.gte] = new Date(startDate);
  if (endDate) dateClause[Op.lte] = new Date(endDate);
  return dateClause;
};

const buildWhereClause = ({ userId, orgId, cropId, startDate, endDate }) => {
  const whereClause = {};

  if (startDate || endDate) {
    whereClause.date_of_issue = buildDateRangeClause(startDate, endDate);
  }

  if (cropId) {
    whereClause.crop_type = cropId;
  }

  if (userId) {
    whereClause.userId = userId;
  } else if (orgId) {
    whereClause.org_id = orgId;
  }

  return whereClause;
};

module.exports = {
  insertImages,
  handleImageUpdates,
  deleteImages,
  createBatchPayload,
  streamBatchManagementPDF,
  buildPagination,
  fetchTotalCount,
  getBatchIncludes,
  getBatchAttributes,
  createPackagingUnitPayload,
  createPalletsPayload,
  buildWhereClause,
};
