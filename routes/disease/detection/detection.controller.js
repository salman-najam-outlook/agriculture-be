const db = require(rootPath + "/models")
let DETECTION_URL = process.env.DETECTION_URL || "https://ai-api-dev.dimitra.dev/dd/get-prediction"
let CROPS_DATA_URL = process.env.CROPS_DATA_URL || 'https://ai-api-dev.dimitra.dev/dd/get-crops'
let FEEDBACK_URL = process.env.FEEDBACK_URL || 'https://ai-api-dev.dimitra.dev/dd/save-feedback'
let DETECTION_AUTH_TOKEN = process.env.DETECTION_URL || '3ff79c2950681c571fbd13572c0144ca'
const { default: axios } = require('axios')


const getDiseaseDetection = async (req, formData, imageArr) => {
    

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: DETECTION_URL,
      headers: { 
        'Content-Type': 'application/json', 
        'Auth-Token': DETECTION_AUTH_TOKEN, 
        ...formData.getHeaders()
      },
      data : formData
    };
    let classIdArr = [], diseaseImagesLookup = {}, cropLookup = {}

    const detectionResponse = await axios.request (config);
    let detectionResult = {}
    detectionResult = JSON.parse(JSON.stringify(detectionResponse?.data?.result))
    if(detectionResult) {
      classIdArr = [detectionResult?.primary.class_id,
        detectionResult?.secondary.class_id ]

        let diseaseImagesRes = await db.Option.findAll({
  
          where: {
          recordId: classIdArr
        },
        raw: true
      })

      if(diseaseImagesRes) {
        diseaseImagesRes.forEach(el => {
          diseaseImagesLookup[el.recordId] = el?.optionCode //  to avoid creating new columns in options table, we are basically recycling column
          cropLookup[el.countryCode] = el.region //  to avoid creating new columns in options table, we are basically recycling column
    
        })
      }
      
        for(const key in detectionResult) {
          // console.log(key)
          detectionResult[key].classImage =   `${(process.env.PUBLIC_BUCKET_URL ? process.env.PUBLIC_BUCKET_URL + "disease_detection_image_samples/diseases" : null) || 'https://dimitra-prod-public-images.s3.amazonaws.com/disease_detection_image_samples/diseases'}/${cropLookup[req.body.cropTypeId].toLowerCase()}/sample/${detectionResult[key].class_id}.jpg`

        }

        }

    let diseaseDetectionRes = await db.DiseaseDetection.create({
      cropTypeId : req.body.cropTypeId ,
      primaryAccuracy : detectionResult?.primary.accuracy ,
      primaryClass : detectionResult?.primary.class ,
      primaryInfoLink : detectionResult?.primary.infoLink ,
      primaryClassId : detectionResult?.primary.class_id ,
      primaryClassImage : detectionResult?.primary.classImage ,
      secondaryAccuracy : detectionResult?.secondary.accuracy ,
      secondaryClass : detectionResult?.secondary.class ,
      secondaryInfoLink : detectionResult?.secondary.infoLink ,
      secondaryClassId : detectionResult?.secondary.class_id ,
      secondaryClassImage : detectionResult?.secondary.classImage ,
      userId: req.user.id
    })

    await db.DiseaseDetectionImages.bulkCreate(imageArr.map(el => {
      return {
        disease_detect_id: diseaseDetectionRes.id,
        file_name: el.location,
        s3_key: el.name,
        userId: req.user.id
      }
    }))

    detectionResult.id = diseaseDetectionRes.id
    detectionResult.cropType = cropLookup[req.body.cropTypeId]
    detectionResult.cropTypeId = req.body.cropTypeId

      return detectionResult

}

const getDetectionListing = async (req) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;


   let cropLookup = {}

    let diseaseImagesRes = await db.Option.findAll({
   
           where: {
           groupName: "disease-sample-images"
         },
         raw: true
       })
  if(diseaseImagesRes) {
        diseaseImagesRes.forEach(el => {
          cropLookup[el.countryCode] = el.region // this is to avoid creating new columns in options table, we are basically recycling column
    
        })
      }

    
    const searchQuery = req.query.search || '';

    
    const where = searchQuery
      ? {
          [db.Sequelize.Op.or]: [
            { primaryClass: { [db.Sequelize.Op.like]: `%${searchQuery}%` } },   
            { secondaryClass: { [db.Sequelize.Op.like]: `%${searchQuery}%` } },
            { primaryInfoLink: { [db.Sequelize.Op.like]: `%${searchQuery}%` } },
          ],
          userId: req.user.id
        }
      : {
         userId: req.user.id
      };


    const listingRes = await db.DiseaseDetection.findAndCountAll({
      where,
      offset,
      limit,
      order: [['createdAt', 'DESC']],
      raw: true
    });
    listingRes.rows = listingRes.rows?.map(el => {
      el.cropType = cropLookup[el.cropTypeId]
      return el
    })
    return listingRes;
}

const getDetectionDetails = async (req) => {
    const diseaseDetectionId = req.params.id;
  
      
    const diseaseDetection = await db.DiseaseDetection.findOne({
      where: { id: diseaseDetectionId },
      include: [
        {
          model: db.DiseaseDetectionImages,
          as: 'diseaseDetectionImages', 
          attributes: ['id', 'file_name', 's3_key', 'createdAt', 'updatedAt'],
        },
      ],
    });

    if (!diseaseDetection) {
      throw new Error('Disease detection data not found');
    }

    return diseaseDetection

}


const getCropsData = async (req) => {
    let sampleImagesQuery = `
    SELECT 
        countryCode AS id,
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'id', recordId,
                'name', name,
                'urlPath', CONCAT('${(process.env.PUBLIC_BUCKET_URL ? process.env.PUBLIC_BUCKET_URL + "disease_detection_image_samples/diseases/" : null) || 'https://dimitra-prod-public-images.s3.amazonaws.com/disease_detection_image_samples/diseases/'}', region, '/sample/', recordId, '.jpg')
            )
        ) AS labels,
        region AS name
    FROM options o WHERE groupName = "disease-sample-images"
    GROUP BY countryCode, region;
  `;

  const sampleImagesRes = await db.sequelize.query(sampleImagesQuery, {
    type: db.sequelize.QueryTypes.SELECT,
  });

  return sampleImagesRes
}


const postFeedbackData = async (req, formData) => {
  const { agree, diseaseId, accuracyDegree, notes, diseaseDetectionId } = req.body;
  let diseaseDetection = await db.DiseaseDetection.findOne({where:{id: diseaseDetectionId}})

  if(agree) {

    formData.append('confirmed', "true");
    formData.append('class', diseaseDetection.primaryClassId);

  } else {
    formData.append('confirmed', "false");
    formData.append('confidence', accuracyDegree);
    formData.append('label_id', diseaseId);
  }
  
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: FEEDBACK_URL,
    headers: { 
      'Content-Type': 'application/json', 
      'Auth-Token': DETECTION_AUTH_TOKEN, 
      ...formData.getHeaders()
    },
    data : formData
  };

  const detectionRes = await axios.request (config);
  // Create a new entry in the database
  const newData = await db.DiseaseDetectionFeedback.create({
    agree,
    diseaseId,
    accuracyDegree,
    notes,
    diseaseDetectionId
  });

  return newData;
}

module.exports = {
    getDetectionListing,
    getDetectionDetails,
    getDiseaseDetection,
    getCropsData,
    postFeedbackData
  }