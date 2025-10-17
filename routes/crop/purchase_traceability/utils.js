const db = require(rootPath + "/models");
const _ = require("lodash");
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const html_to_pdf = require('html-pdf-node');
const translatedReportData = require(rootPath + '/helpers/reportTranslator');

const mapImageData = (images, purchaseId) => {
  const baseUrl =
    process.env.PUBLIC_BUCKET_URL || "https://dimitra-public-images.s3.amazonaws.com/"

  return images.map((image) => ({
    purchase_order_id: purchaseId,
    s3_key: image.s3_key,
    file_url: `${baseUrl}${image.s3_key}`,
  }));
};

const insertImages = async (images, purchaseId) => {
  if (!images?.length) return;

  const imageData = mapImageData(images, purchaseId);
  await db.AllPurchaseTraceabilityImages.bulkCreate(imageData);
};

const handleImageUpdates = async (images, purchaseId) => {
  if (!images?.length) return;

  const existingImages = await db.AllPurchaseTraceabilityImages.findAll({
    where: { purchase_order_id: purchaseId },

    raw: true,
  });

  const imagesToDelete = _.differenceBy(existingImages, images, "s3_key");
  const imagesToAdd = _.differenceBy(images, existingImages, "s3_key");

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

  if (imagesToAdd.length) {
    const newImageData = mapImageData(imagesToAdd, purchaseId);
    await db.AllPurchaseTraceabilityImages.bulkCreate(newImageData);
  }
};

const deleteImages = async (purchaseId, ) => {
  const images = await db.AllPurchaseTraceabilityImages.findAll({
    where: { purchase_order_id: purchaseId },

    raw: true,
  });

  if (images.length) {
    await Promise.all(
      images.map((image) =>
        deleteFileS3({
          Bucket: process.env.AWS_PUBLIC_BUCKET,
          Key: image.s3_key,
        })
      )
    );

    await db.AllPurchaseTraceabilityImages.destroy({
      where: { purchase_order_id: purchaseId },

    });
  }
};

const generateConfirmationPDF = async (data, req) => {
  try {
    let fileName = data.title;

    fileName += `-${Date.now()}-${req.headers?.lang ?? 'en'}.pdf`;
    fileName = fileName.split(' ').join('-');
    fileName = fileName.replace(/\//g, '-');
    if (req.headers.lang != 'en') {
      data = translatedReportData(data, req.headers.lang);
    }
    // Read HTML Template
    const template = fs.readFileSync(path.resolve(__dirname, './pdfReport.html'), 'utf8');
    // console.log(template, 'template')
    let html = await ejs.render(template, { data: data });
    // console.log(html, 'html')
    const fileDestination = path.resolve(__dirname, `../../../views/reports/${fileName}`);
    const options = {
      format: 'A4',
      path: fileDestination,
      printBackground: true,
    };
    let file = { content: html };
    let pdf = await html_to_pdf.generatePdf(file, options);
    if (pdf) {
      return {
        fileName,
        path: fileDestination,
      };
    }

  } catch (err) {
    console.log(err)
  }
}

//generate sales pdf
const generateSalesPDF = async (data, req) => {
  try {
    let fileName = data.title;

    fileName += `-${Date.now()}-${req.headers?.lang ?? 'en'}.pdf`;
    fileName = fileName.split(' ').join('-');
    fileName = fileName.replace(/\//g, '-');
    if (req.headers.lang != 'en') {
      data = translatedReportData(data, req.headers.lang);
    }
    // Read HTML Template
    const template = fs.readFileSync(path.resolve(__dirname, './pdfSalesReport.html'), 'utf8');
    // console.log(template, 'template')
    let html = await ejs.render(template, { data: data });
    // console.log(html, 'html')
    const fileDestination = path.resolve(__dirname, `../../../views/reports/${fileName}`);
    const options = {
      format: 'A4',
      path: fileDestination,
      printBackground: true,
    };
    let file = { content: html };
    let pdf = await html_to_pdf.generatePdf(file, options);
    if (pdf) {
      return {
        fileName,
        path: fileDestination,
      };
    }

  } catch (err) {
    console.log(err)
  }
}

const generatePalletPDF = async (data, req) => {
  try {
    let fileName = data.title;

    fileName += `-${Date.now()}-${req.headers?.lang ?? 'en'}.pdf`;
    fileName = fileName.split(' ').join('-');
    fileName = fileName.replace(/\//g, '-');
    if (req.headers.lang != 'en') {
      data = translatedReportData(data, req.headers.lang);
    }
    // Read HTML Template
    const template = fs.readFileSync(path.resolve(__dirname, './palletPdfReport.html'), 'utf8');
    // console.log(template, 'template')
    let html = await ejs.render(template, { data: data });
    // console.log(html, 'html')
    const fileDestination = path.resolve(__dirname, `../../../views/reports/${fileName}`);
    const options = {
      format: 'A4',
      path: fileDestination,
      printBackground: true,
    };
    let file = { content: html };
    let pdf = await html_to_pdf.generatePdf(file, options);
    if (pdf) {
      return {
        fileName,
        path: fileDestination,
      };
    }

  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  insertImages,
  handleImageUpdates,
  deleteImages,
  generateConfirmationPDF,
  generatePalletPDF,
  generateSalesPDF
};
