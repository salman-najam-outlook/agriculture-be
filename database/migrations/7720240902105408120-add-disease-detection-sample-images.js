'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  const  pythonDataArr = [
      {
          "id": "0191e135-b20d-4ce5-8cb0-db71bbbf16df",
          "labels": [
              {
                  "id": "c0467507-ec22-4e25-b5c0-b4a54085bc96",
                  "name": "Apple - Apple scab"
              },
              {
                  "id": "87c800f8-6344-48c5-9f1a-cc17da0b7ebc",
                  "name": "Apple - Black rot"
              },
              {
                  "id": "f121dac5-5fce-4dcb-9f3f-4c13bf1086c8",
                  "name": "Apple - Cedar apple rust"
              },
              {
                  "id": "a9d85212-dfa6-43f4-87ad-4846d9cd6c45",
                  "name": "Apple - healthy"
              }
          ],
          "name": "Apple"
      },
      {
          "id": "d1cd9258-2a9c-4b7a-b037-ffaa7068967a",
          "labels": [
              {
                  "id": "03faf47c-fd2c-4637-ac69-8e01b4c63a79",
                  "name": "Corn (maize) - Cercospora leaf spot Gray leaf spot"
              },
              {
                  "id": "3e08c5f4-159e-4b3d-acf5-c2e78306bf3c",
                  "name": "Corn (maize) - Common rust"
              },
              {
                  "id": "5d1d4a52-aa96-481d-a22b-1740a145b390",
                  "name": "Corn (maize) - Northern Leaf Blight"
              },
              {
                  "id": "09654a1d-6fa6-4782-be4c-92c7c53000de",
                  "name": "Corn (maize) - healthy"
              }
          ],
          "name": "Corn"
      },
      {
          "id": "e2369969-5240-430c-a1b7-1d76d9f28084",
          "labels": [
              {
                  "id": "91881f03-427d-4b60-8c85-f5b58b9ca77b",
                  "name": "Grape - Black rot"
              },
              {
                  "id": "96134484-76f7-4ea7-96ea-c5a2095dc4ed",
                  "name": "Grape - Esca (Black Measles) "
              },
              {
                  "id": "f8840824-943f-40d0-9ed9-2a924fa31121",
                  "name": "Grape - Leaf blight (Isariopsis Leaf Spot)"
              },
              {
                  "id": "6b92bc32-2479-4ada-8eb4-e1860cd7489f",
                  "name": "Grape - healthy"
              }
          ],
          "name": "Grape"
      },
      {
          "id": "8def2be7-46d5-43aa-862f-d55986ae69d7",
          "labels": [
              {
                  "id": "6091e058-6b5c-4247-9a31-c83a6cb55c88",
                  "name": "Potato - Early blight"
              },
              {
                  "id": "d0051041-3bf6-4881-aea6-498f06947763",
                  "name": "Potato - Late blight"
              },
              {
                  "id": "9ac9532c-69c9-4eef-860e-ce16e7044118",
                  "name": "Potato - healthy"
              }
          ],
          "name": "Potato"
      },
      {
          "id": "36f64fa4-c480-4cc7-b31d-b29cee5203f4",
          "labels": [
              {
                  "id": "d1dfddea-84b9-4286-a77b-7548121b5f5f",
                  "name": "Tomato - Bacterial spot"
              },
              {
                  "id": "fadd5991-fc2c-49d3-bac7-f53fc00d3033",
                  "name": "Tomato - Early blight"
              },
              {
                  "id": "a68fa02c-df81-4cd3-8de7-1fe16a05ef48",
                  "name": "Tomato - Late blight"
              },
              {
                  "id": "fd8dcac8-2403-48c1-b77a-5182c331d8b7",
                  "name": "Tomato - Leaf Mold"
              },
              {
                  "id": "20126601-da25-465b-89f8-a5deb5944257",
                  "name": "Tomato - Septoria leaf spot"
              },
              {
                  "id": "6f41ca1f-b55c-41fd-aef1-e21e99eb770e",
                  "name": "Tomato - Spider mites Two-spotted spider mite"
              },
              {
                  "id": "5c0e1694-853f-43b0-b30b-03dec802ba87",
                  "name": "Tomato - Target Spot"
              },
              {
                  "id": "4af9daf4-2b5b-498e-9261-8eee2d322dca",
                  "name": "Tomato - Tomato Yellow Leaf Curl Virus"
              },
              {
                  "id": "e49775c8-c97c-4653-9cb5-67309a82b9fa",
                  "name": "Tomato - Tomato mosaic virus"
              },
              {
                  "id": "aac24c1f-9db2-4632-aa99-449853765a5a",
                  "name": "Tomato - healthy"
              }
          ],
          "name": "Tomato"
      },
      {
          "id": "59104ece-fb08-4903-aad8-acd7626a956e",
          "labels": [
              {
                  "id": "ecbe765e-eb85-44c6-af96-07c35d36002d",
                  "name": "Peach___Bacterial_spot"
              },
              {
                  "id": "3fa410d1-ac4d-484a-bb1a-27086da22092",
                  "name": "Peach___healthy"
              }
          ],
          "name": "Peach"
      },
      {
          "id": "1384f2ad-a9c2-4cb6-bbb7-dbc326567624",
          "labels": [
              {
                  "id": "6aefd571-4a26-4377-a684-15fea5339b63",
                  "name": "Pepper,_bell___Bacterial_spot"
              },
              {
                  "id": "f78c418e-8a9a-4dc6-a20e-6f28b08215f2",
                  "name": "Pepper,_bell___healthy"
              }
          ],
          "name": "Pepper"
      },
      {
          "id": "aca13cfd-8997-44ed-b833-b9ffa196fa37",
          "labels": [
              {
                  "id": "1f3e8e1c-d5c9-4c50-953b-21d37d904818",
                  "name": "Strawberry___Leaf_scorch"
              },
              {
                  "id": "8d1a9a13-326b-41d7-a74f-1bf42508b868",
                  "name": "Strawberry___healthy"
              }
          ],
          "name": "Strawberry"
      },
      {
          "id": "d769039d-e5e1-4e0d-a5d9-25885f3c3b8b",
          "labels": [
              {
                  "id": "cb73be84-00dc-4feb-93dd-10dbed34cd21",
                  "name": "Citrus Blackspot"
              },
              {
                  "id": "80358641-5145-4b25-b658-2707397dd8dd",
                  "name": "Citrus Canker"
              },
              {
                  "id": "86429b5e-eb72-4390-ace2-c146c6542d85",
                  "name": "Citrus Greening"
              },
              {
                  "id": "a6d2fe99-2b72-4f51-9d90-219dba1ac4bc",
                  "name": "Citrus Healthy"
              }
          ],
          "name": "Citrus"
      },
      {
          "id": "25e4ae0e-30c0-4ce0-84b7-c63f5db1cc01",
          "labels": [
              {
                  "id": "e91dc718-f07b-492c-a1ba-8ee1dae529b9",
                  "name": "Anthracnose"
              },
              {
                  "id": "f90b09ab-4b90-4d8c-8406-e64098b390da",
                  "name": "Bacterial canker"
              },
              {
                  "id": "0c00b6a9-cb55-4355-80de-cbc0e98a112d",
                  "name": "Dieback"
              },
              {
                  "id": "52baf68e-f7a8-4abf-bd5b-47b8d31dcfcf",
                  "name": "gall_midge"
              },
              {
                  "id": "d037f0fc-5ba3-4e07-aee4-2175270df9f2",
                  "name": "Powderymildew"
              },
              {
                  "id": "98636997-0fec-4b15-a269-de30a9d56794",
                  "name": "Sootymould"
              }
          ],
          "name": "Mango"
      },
      {
          "id": "acaa3ef9-e288-4388-9a3e-377b2dee55c3",
          "labels": [
              {
                  "id": "02b0579e-3084-4a35-8790-21cc015268be",
                  "name": "Coffee - Cercospora"
              },
              {
                  "id": "7afd14bb-ca9e-4c46-be24-d923b2130c55",
                  "name": "Coffee - Healthy"
              },
              {
                  "id": "eccbc5d4-ebcf-45a4-8ec2-f496a1be0bfd",
                  "name": "Coffee - Leaf Rust"
              },
              {
                  "id": "11dfc6f8-039c-4b8e-97d0-031868e21289",
                  "name": "Coffee - Miner"
              },
              {
                  "id": "95b27e8e-a486-42b4-8b4f-6b9508d4d436",
                  "name": "Coffee - Phoma"
              }
          ],
          "name": "Coffee"
      },
      {
          "id": "1c434b05-2a46-44f8-917b-19bd3df9afd6",
          "labels": [
              {
                  "id": "80f55d36-ba87-4d7b-b40c-f18b3cf35b5e",
                  "name": "Cocoa - Black Pod Rot"
              },
              {
                  "id": "cbd11d41-08b2-4cec-b056-c890b067467b",
                  "name": "Cocoa - Healthy"
              },
              {
                  "id": "bfab9539-d469-4f52-b1f1-50e52c6d8b23",
                  "name": "Cocoa - Swollen Virus"
              }
          ],
          "name": "Cocoa"
      },
      {
          "id": "8129b5a3-76e8-4314-a54b-1edf9a9f731f",
          "labels": [
              {
                  "id": "e5cc7847-c917-4859-a931-2b01662237fa",
                  "name": "Banana - Cordana"
              },
              {
                  "id": "1e2b3f3e-2e3a-408f-ba98-a2e03b677deb",
                  "name": "Banana - Healthy"
              },
              {
                  "id": "f086e500-cf7c-44f5-9f82-77baaafcb4ad",
                  "name": "Banana - Pestalotiopsis"
              },
              {
                  "id": "5f6d8a42-5f54-4d95-aade-857a8cbb306c",
                  "name": "Banana - Sigatoka"
              }
          ],
          "name": "Banana"
      },
      {
          "id": "588fcddf-c50a-40a4-a38b-88b1f7dade9a",
          "labels": [
              {
                  "id": "5f6460e2-bb18-42b8-af3d-8732ece97d28",
                  "name": "Sugarcane - Healthy"
              },
              {
                  "id": "20f0c860-dad3-47de-bf41-b5af101708d2",
                  "name": "Sugarcane - Mosaic"
              },
              {
                  "id": "a39ac10f-61e6-4d71-943c-d360147ddcaf",
                  "name": "Sugarcane - Red Rot"
              },
              {
                  "id": "da15715b-0675-43c3-b6f5-87f7c52f3ee3",
                  "name": "Sugarcane - Rust"
              },
              {
                  "id": "c7e30e2a-7b08-4b9f-b399-6a33e05ad764",
                  "name": "Sugarcane - Yellow"
              }
          ],
          "name": "Sugarcane"
      },
      {
          "id": "da9abfc6-6f61-494d-b426-ae6241269712",
          "labels": [
              {
                  "id": "36d0ccff-ae54-4f29-8c98-bcc0536d4e17",
                  "name": "Sunflower - Downy Mildew"
              },
              {
                  "id": "0e07587d-29f2-498d-a79f-1b5399c3fe91",
                  "name": "Sunflower - Fresh Leaf"
              },
              {
                  "id": "d0582258-389e-493b-88b1-083e5ffae20a",
                  "name": "Sunflower - Gray Mold"
              },
              {
                  "id": "efc97607-6f95-46c1-b4d5-e7db34566a72",
                  "name": "Sunflower - Leaf Scars"
              }
          ],
          "name": "Sunflower"
      },
      {
          "id": "01a6a184-de1a-4494-9277-98929833a849",
          "labels": [
              {
                  "id": "6bbebf8e-6f84-43b2-a450-9e6e6624f4d3",
                  "name": "Watermelon - Anthracnose"
              },
              {
                  "id": "9fdcd3c2-90eb-4152-99f8-62073dce74b6",
                  "name": "Watermelon - Downy Mildew"
              },
              {
                  "id": "145f113a-ae1f-4e95-82ad-9bdd60ed1164",
                  "name": "Watermelon - Healthy"
              },
              {
                  "id": "2eb7bb73-21bb-4909-9896-ff623a359ba6",
                  "name": "Watermelon - Mosaic Virus"
              }
          ],
          "name": "Watermelon"
      }
  ]
  
  const imageArr = [
      "/diseases/mango/sample/anthracnose.jpg",
      "/diseases/apple/sample/apple - apple scab.jpg",
      "/diseases/apple/sample/apple - black rot.jpg",
      "/diseases/apple/sample/apple - cedar apple rust.jpg",
      "/diseases/apple/sample/apple - healthy.jpg",
      "/diseases/mango/sample/bacterial canker.jpg",
      "/diseases/banana/sample/banana - cordana.jpg",
      "/diseases/banana/sample/banana - healthy.jpg",
      "/diseases/banana/sample/banana - pestalotiopsis.jpg",
      "/diseases/banana/sample/banana - sigatoka.jpg",
      "/diseases/citrus/sample/citrus black spot.jpg",
      "/diseases/citrus/sample/citrus canker.jpg",
      "/diseases/citrus/sample/citrus greening.jpg",
      "/diseases/citrus/sample/citrus healthy.jpg",
      "/diseases/cocoa/sample/cocoa - black pod rot.jpg",
      "/diseases/cocoa/sample/cocoa - healthy.jpg",
      "/diseases/cocoa/sample/cocoa - swollen virus.jpg",
      "/diseases/coffee/sample/coffee - cercospora.jpg",
      "/diseases/coffee/sample/coffee - healthy.jpg",
      "/diseases/coffee/sample/coffee - leaf rust.jpg",
      "/diseases/coffee/sample/coffee - miner.jpg",
      "/diseases/coffee/sample/coffee - phoma.jpg",
      "/diseases/corn/sample/corn (maize) - cercospora leaf spot gray leaf spot.jpg",
      "/diseases/corn/sample/corn (maize) - common rust.jpg",
      "/diseases/corn/sample/corn (maize) - healthy.jpg",
      "/diseases/corn/sample/corn (maize) - northern leaf blight.jpg",
      "/diseases/mango/sample/cutting weevil.jpg",
      "/diseases/mango/sample/die back.jpg",
      "/diseases/mango/sample/gall midge.jpg",
      "/diseases/grape/sample/grape - black rot.jpg",
      "/diseases/grape/sample/grape - esca (black measles).jpg",
      "/diseases/grape/sample/grape - healthy.jpg",
      "/diseases/grape/sample/grape - leaf blight (isariopsis leaf spot).jpg",
      "/diseases/mango/sample/healthy.jpg",
      "/diseases/peach/sample/peach___bacterial_spot.jpg",
      "/diseases/peach/sample/peach___healthy.jpg",
      "/diseases/pepper/sample/pepper,_bell___bacterial_spot.jpg",
      "/diseases/pepper/sample/pepper,_bell___healthy.jpg",
      "/diseases/potato/sample/potato - early blight.jpg",
      "/diseases/potato/sample/potato - healthy.jpg",
      "/diseases/potato/sample/potato - late blight.jpg",
      "/diseases/mango/sample/powdery mildew.jpg",
      "/diseases/mango/sample/sooty mould.jpg",
      "/diseases/strawberry/sample/strawberry___healthy.jpg",
      "/diseases/strawberry/sample/strawberry___leaf_scorch.jpg",
      "/diseases/sugarcane/sample/sugarcane - healthy.jpg",
      "/diseases/sugarcane/sample/sugarcane - mosaic.jpg",
      "/diseases/sugarcane/sample/sugarcane - red rot.jpg",
      "/diseases/sugarcane/sample/sugarcane - rust.jpg",
      "/diseases/sugarcane/sample/sugarcane - yellow.jpg",
      "/diseases/sunflower/sample/sunflower - downy mildew.jpg",
      "/diseases/sunflower/sample/sunflower - fresh leaf.jpg",
      "/diseases/sunflower/sample/sunflower - gray mold.jpg",
      "/diseases/sunflower/sample/sunflower - leaf scars.jpg",
      "/diseases/tomato/sample/tomato - bacterial spot.jpg",
      "/diseases/tomato/sample/tomato - early blight.jpg",
      "/diseases/tomato/sample/tomato - healthy.jpg",
      "/diseases/tomato/sample/tomato - late blight.jpg",
      "/diseases/tomato/sample/tomato - leaf mold.jpg",
      "/diseases/tomato/sample/tomato - septoria leaf spot.jpg",
      "/diseases/tomato/sample/tomato - spider mites two-spotted spider mite.jpg",
      "/diseases/tomato/sample/tomato - target spot.jpg",
      "/diseases/tomato/sample/tomato - tomato mosaic virus.jpg",
      "/diseases/tomato/sample/tomato - tomato yellow leaf curl virus.jpg",
      "/diseases/watermelon/sample/watermelon - anthracnose.jpg",
      "/diseases/watermelon/sample/watermelon - downy mildew.jpg",
      "/diseases/watermelon/sample/watermelon - healthy.jpg",
      "/diseases/watermelon/sample/watermelon - mosaic virus.jpg",
  ]
  
  const optionsData = []
  
  let labelLength = 0
  pythonDataArr.forEach(pythonEl => {
      labelLength += pythonEl.labels.length
      pythonEl.labels.forEach(labelEl => {
          optionsData.push({
              name: labelEl.name,
              groupName: "disease-sample-images",
              recordId: labelEl.id,
              countryCode: pythonEl.id,
              region: pythonEl.name.toLowerCase(),
              optionCode: `/diseases/${pythonEl.name.toLowerCase()}/sample/${labelEl.name.toLowerCase()}.jpg`,
              info: labelEl.name.toLowerCase()
          })
      })
  });

  return queryInterface.bulkInsert('options', optionsData);
  
  },

  down: async (queryInterface, Sequelize) => {
   
  },
};
