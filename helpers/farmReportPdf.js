const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const db = require(rootPath + '/models');
const html_to_pdf = require('html-pdf-node');
const AWSS3 = require(rootPath + '/components/s3.js');
const { default: axios } = require('axios');
const { deforestationCredentials } = require(rootPath + "/helpers/consts");
const s3 = AWSS3.getClient();
const puppeteer = require("puppeteer");
const { toDataURL } = require('qrcode');
const ejsTranslation = require(rootPath + "/locales/ejsTranslation.json")
module.exports = async function farmReportPdf(req, data, userId, imageBase64) {
  let query = req.body
  let {
    farmId,
    deforestation,
    geographic,
    farmPerimeter,
    areasPerimeter,
  } = query;
  
  try {
    let base64MapImage = null;
    let base64GeofenceImage = null;
    let base64SegmentsImage = null;
    let deforestationImageBase64 = null;
    const imagePath = path.join(__dirname, "/report_" + Date.now() + ".png");
    const imagePath2 = path.join(__dirname, "/report2_" + Date.now() + ".png");
    const imagePath3 = path.join(__dirname, "/report3_" + Date.now() + ".png");
    const deforestationImagePath = path.join(__dirname, "/deforestation_" + Date.now() + ".png");
    const apiUrl = `https://maps.googleapis.com/maps/api/staticmap`;
    let deforestationData

    let unitRes = await db.UserUnitConfiguration.findOne({
      where: {
        userId,
      },
      include: [
        {
          model: db.UnitTypes,
          as: "user_config_unitType",
          where: {
            name: "Area",
          },
        },
        {
          model: db.UnitsList,
          as: "user_config_unit",
        },
      ],
    });

    let userUnit = unitRes?.user_config_unit || { abbvr: "ac", name: "Acre", factor: 1 };
    if (deforestation) {      
      const url = process.env.DEFORESTATION_SERVICE_URL;

      const graphqlQuery = {
        query: `
          query DeforestationByFarmId($farmId: Int!) {
            deforestationByFarmid(farmId: $farmId) {
              totalArea,
              status,
              metrics {
                label
                colorCode
                colorName
                percent
                area
              },
              centerLatitude,
              centerLongitude,
              reportType,
              radius,
              overallProb,
              overallProbColorCode,
              transactionHash,
              storedInBlockchain,
              etherScanLink,
              sateliteResponse{
                imagePath
              },
              coordinates{
                latitude,
                longitude,
                
              },
              farm {
                areaUomId
              }
            }
          }
        `,
        variables: {
          farmId: +farmId
        }
      };


      const headers = { 
        'content-type': 'application/json',
        "Authorization": req.headers["oauth-token"],
        lang: req.headers.lang,
      };

      deforestationData = await axios({
        url: url,
        method: 'post',
        headers: headers,
        data: graphqlQuery
      });

      if (deforestationData && !deforestationData?.data?.errors) { // when there is deforestation query
        data.deforestationData = deforestationData.data?.data?.deforestationByFarmid;

        if (data.deforestationData?.transactionHash) {
          data.deforestationData.storedInBlockchain = true;
          const link = `${process.env.ETHER_SCAN}/${data.deforestationData.transactionHash}`;
          data.deforestationData.etherScanLink = link;
          data.deforestationData.qrCode = await toDataURL(link);
        }
        if(Array.isArray(data.deforestationData?.metrics) && userUnit.factor) {
          data.deforestationData.totalArea = data.deforestationData.totalArea / userUnit.factor;
          for (const metric of data.deforestationData.metrics) {
            metric.area = metric.area / userUnit.factor;
          }
        }

        if(data?.deforestationData?.coordinates.length) {
          let coordinateString = data.deforestationData?.coordinates.map(coord => `${coord.latitude},${coord.longitude}`).join('|');
          const firstCoordinate = `${data.deforestationData?.coordinates[0].latitude},${data.deforestationData?.coordinates[0].longitude}`;
          coordinateString += `|${firstCoordinate}`;
          const polygonParam = {
            size: '1920x1080',
            markers: `color:red|${data.deforestationData?.coordinates[0].latitude},${data.deforestationData?.coordinates[0].longitude}`,
            maptype: "satellite",
            key: 'AIzaSyBxEppGyQ3YatmT9C8RJjXAh9HsVtpKLh4', // Replace with your Google Maps API key
          };
          if (coordinateString.length > 1) {
            await axios.get(apiUrl, { params: polygonParam, responseType: 'stream' })
              .then(response => {
                response.data.pipe(fs.createWriteStream(deforestationImagePath));
            
                // Wait for the stream to finish writing
                return new Promise((resolve, reject) => {
                  response.data.on('end', resolve);
                  response.data.on('error', reject);
                });
              })
              .then(() => {
                var imageBuffer = fs.readFileSync(deforestationImagePath);   
                deforestationImageBase64 = imageBuffer.toString('base64');
            
                // Remove the temporary file
                fs.unlinkSync(deforestationImagePath);
            
              })
              .catch(error => {
                console.error('Error fetching map image:', error);
              });
            }
        }

      }
    }
    if (geographic) {
      const params = {
        size: '1920x1080',
        markers: `color:red|label:A|${data.lat},${data.log}`,
        maptype: "satellite",
        key: 'AIzaSyBxEppGyQ3YatmT9C8RJjXAh9HsVtpKLh4', // Replace with your Google Maps API key
      };
      
      await axios.get(apiUrl, { params, responseType: 'stream' })
        .then(response => {
          response.data.pipe(fs.createWriteStream(imagePath));
      
          // Wait for the stream to finish writing
          return new Promise((resolve, reject) => {
            response.data.on('end', resolve);
            response.data.on('error', reject);
          });
        })
        .then(() => {
          var imageBuffer = fs.readFileSync(imagePath);   
          base64MapImage = imageBuffer.toString('base64');
          // Remove the temporary file
          fs.unlinkSync(imagePath);
      
        })
        .catch(error => {
          console.error('Error fetching map image:', error);
        });
    }
    if (farmPerimeter) {
      let coordinateString = data.coordinates.map(coord => `${coord.lat},${coord.log}`).join('|');
      const firstCoordinate = `${(data?.coordinates[0] && data.coordinates[0].lat) || data.lat},${(data?.coordinates[0] && data.coordinates[0].log) || data.log}`;
      coordinateString += `|${firstCoordinate}`;
      const polygonParam = {
        size: '1920x1080',
        path: `color:0xFFB443|weight:5|fillcolor:0xFFB443|${coordinateString}`,
        maptype: "satellite",
        key: 'AIzaSyBxEppGyQ3YatmT9C8RJjXAh9HsVtpKLh4', // Replace with your Google Maps API key
      };
      if (coordinateString.length > 1) {
        await axios.get(apiUrl, { params: polygonParam, responseType: 'stream' })
          .then(response => {
            response.data.pipe(fs.createWriteStream(imagePath2));
        
            // Wait for the stream to finish writing
            return new Promise((resolve, reject) => {
              response.data.on('end', resolve);
              response.data.on('error', reject);
            });
          })
          .then(() => {
            var imageBuffer = fs.readFileSync(imagePath2);   
            base64GeofenceImage = imageBuffer.toString('base64');
        
            // Remove the temporary file
            fs.unlinkSync(imagePath2);
        
          })
          .catch(error => {
            console.error('Error fetching map image:', error);
          });
        }
    }
    if (areasPerimeter) {
      let coordinateString = data.zones?.map(zone => {
        if (zone.coordinates && Array.isArray(zone.coordinates) && zone.coordinates.length > 0) {
            return zone.coordinates.map(coordinate => `${coordinate.lat},${coordinate.log}`).join('|');
        }
        return '|'; // Placeholder if coordinates are not valid
    });
    coordinateString = coordinateString.join('|');
    const firstCoordinate = coordinateString.split('|')[0];
      coordinateString += `|${firstCoordinate}`;
      const polygonParam = {
        size: '1920x1080',
        path: `color:0xFFB443|weight:5|fillcolor:0x2EFF2E|${coordinateString}`,
        maptype: "satellite",
        key: 'AIzaSyBxEppGyQ3YatmT9C8RJjXAh9HsVtpKLh4', // Replace with your Google Maps API key
      };
    if (coordinateString.length > 1 || coordinateString != '|') {
      await axios.get(apiUrl, { params: polygonParam, responseType: 'stream' })
        .then(response => {
          response.data.pipe(fs.createWriteStream(imagePath3));
      
          // Wait for the stream to finish writing
          return new Promise((resolve, reject) => {
            response.data.on('end', resolve);
            response.data.on('error', reject);
          });
        })
        .then(() => {
          var imageBuffer = fs.readFileSync(imagePath3);   
          base64SegmentsImage = imageBuffer.toString('base64');
      
          // Remove the temporary file
          fs.unlinkSync(imagePath3);
      
        })
        .catch(error => {
          console.error('Error fetching map image:', error);
        });
      }
    }

    let templatePath;
    if (query.deforestation == 'false' || !deforestationData?.data?.data?.deforestationByFarmid || deforestationData?.data?.errors) {
      templatePath = path.resolve(__dirname, '../views', 'farmReportWOdefo.html');
    } else {
      templatePath = path.resolve(__dirname, '../views', 'farmReport.html');
    }
    let html = await ejs.renderFile(
      templatePath,
      {
        query, 
        data: data, 
        report: data?.deforestationData && data?.deforestationData,
        reportType: "REGISTERED_FARM",
        coordinates:data?.deforestationData && data?.deforestationData.coordinates,
        imageBase64: imageBase64,
        status: data?.deforestationData && data?.deforestationData.status.includes("CERTIFICATE") ,
        qrBase64Img: data?.deforestationData?.qrCode?.split(',')[1],
        deforestationImageBase64,
        base64MapImage, 
        base64GeofenceImage, 
        base64SegmentsImage,
        translations: ejsTranslation[req.headers.lang || 'en'],
        radius: data?.deforestationData?.radius,
        userUnit,
      },
      {
        async: true
      });

    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    page
    .on('console', message => console.log(`${message.type().toUpperCase()} ${message.text()}`))
    .on('pageerror', ({ message }) => console.log(message));


    
    if(!query.deforestation || (deforestationData && (deforestationData?.data?.errors || !deforestationData?.data?.data?.deforestationByFarmid))) // no deforestation 
        {
          await page.setContent(html);
      
           pdfBuffer = await page.pdf({
            format: "a4",
            margin: {
              top: '5mm',
              right: '20mm',
              bottom: '5mm',
              left: '20mm'
            }
          });

          filePath = data.title.split(' ').join('_') + '-'+ Date.now() + '.pdf'
          filePath = filePath.replace(/\//g, '-')

          fs.writeFileSync(filePath, pdfBuffer)

         }    else {
          
          await page.setContent(html);
          await page.waitForSelector("#map", { visible: true, timeout: 60000 });
          await page.waitForFunction(() => {
            const image = document.querySelector("#map img");
      
            if (image === null) return false;
            return image.complete;
          });
      
            pdfBuffer = await page.pdf({
            format: "a4",
            margin: {
              top: '5mm',
              right: '20mm',
              bottom: '5mm',
              left: '20mm'
            }
          });

          filePath = data.title.split(' ').join('_') + '-'+ Date.now() + '.pdf'
          filePath = filePath.replace(/\//g, '-')

          fs.writeFileSync(filePath, pdfBuffer)
        }

   
    const uploadParam ={
      Bucket: process.env.AWS_PRIVATE_BUCKET || 'dimitra-private',
      Key: `reports/${filePath}`,
      Body: pdfBuffer,
      ContentType: 'application/pdf'
    }
    const uploadResult = await s3.upload(uploadParam).promise();
    const farmReportData = {
      userId,
      farmId,
      url: uploadResult.Location,
      createdAt: new Date()
    }
    await db.FarmReport.create(farmReportData);
    if (pdfBuffer) {
      return {
        filePath,
        // path: uploadResult.Location,
      }
    }
  } catch (error) {
    console.log(error)
    throw error;
  }
}