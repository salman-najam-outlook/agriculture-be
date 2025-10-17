const fs = require('fs');
const path = require('path');

// Directory to start renaming
const baseDirectory = 'C:/Users/pc/Downloads/diseases/diseases';
let diseaseToId = {
    'apple - apple scab': 'c0467507-ec22-4e25-b5c0-b4a54085bc96',
    'apple - black rot': '87c800f8-6344-48c5-9f1a-cc17da0b7ebc',
    'apple - cedar apple rust': 'f121dac5-5fce-4dcb-9f3f-4c13bf1086c8',
    'apple - healthy': 'a9d85212-dfa6-43f4-87ad-4846d9cd6c45',
    'corn (maize) - cercospora leaf spot gray leaf spot': '03faf47c-fd2c-4637-ac69-8e01b4c63a79',
    'corn (maize) - common rust': '3e08c5f4-159e-4b3d-acf5-c2e78306bf3c',
    'corn (maize) - northern leaf blight': '5d1d4a52-aa96-481d-a22b-1740a145b390',
    'corn (maize) - healthy': '09654a1d-6fa6-4782-be4c-92c7c53000de',
    'grape - black rot': '91881f03-427d-4b60-8c85-f5b58b9ca77b',
    'grape - esca (black measles)': '96134484-76f7-4ea7-96ea-c5a2095dc4ed',
    'grape - leaf blight (isariopsis leaf spot)': 'f8840824-943f-40d0-9ed9-2a924fa31121',
    'grape - healthy': '6b92bc32-2479-4ada-8eb4-e1860cd7489f',
    'potato - early blight': '6091e058-6b5c-4247-9a31-c83a6cb55c88',
    'potato - late blight': 'd0051041-3bf6-4881-aea6-498f06947763',
    'potato - healthy': '9ac9532c-69c9-4eef-860e-ce16e7044118',
    'tomato - bacterial spot': 'd1dfddea-84b9-4286-a77b-7548121b5f5f',
    'tomato - early blight': 'fadd5991-fc2c-49d3-bac7-f53fc00d3033',
    'tomato - late blight': 'a68fa02c-df81-4cd3-8de7-1fe16a05ef48',
    'tomato - leaf mold': 'fd8dcac8-2403-48c1-b77a-5182c331d8b7',
    'tomato - septoria leaf spot': '20126601-da25-465b-89f8-a5deb5944257',
    'tomato - spider mites two-spotted spider mite': '6f41ca1f-b55c-41fd-aef1-e21e99eb770e',
    'tomato - target spot': '5c0e1694-853f-43b0-b30b-03dec802ba87',
    'tomato - tomato yellow leaf curl virus': '4af9daf4-2b5b-498e-9261-8eee2d322dca',
    'tomato - tomato mosaic virus': 'e49775c8-c97c-4653-9cb5-67309a82b9fa',
    'tomato - healthy': 'aac24c1f-9db2-4632-aa99-449853765a5a',
    'peach___bacterial_spot': 'ecbe765e-eb85-44c6-af96-07c35d36002d',
    'peach___healthy': '3fa410d1-ac4d-484a-bb1a-27086da22092',
    'pepper,_bell___bacterial_spot': '6aefd571-4a26-4377-a684-15fea5339b63',
    'pepper,_bell___healthy': 'f78c418e-8a9a-4dc6-a20e-6f28b08215f2',
    'strawberry___leaf_scorch': '1f3e8e1c-d5c9-4c50-953b-21d37d904818',
    'strawberry___healthy': '8d1a9a13-326b-41d7-a74f-1bf42508b868',
    'citrus black spot': 'cb73be84-00dc-4feb-93dd-10dbed34cd21',
    'citrus canker': '80358641-5145-4b25-b658-2707397dd8dd',
    'citrus greening': '86429b5e-eb72-4390-ace2-c146c6542d85',
    'citrus healthy': 'a6d2fe99-2b72-4f51-9d90-219dba1ac4bc',
    'anthracnose': 'e91dc718-f07b-492c-a1ba-8ee1dae529b9',
    'bacterial canker': 'f90b09ab-4b90-4d8c-8406-e64098b390da',
    'die back': '0c00b6a9-cb55-4355-80de-cbc0e98a112d',
    'gall midge': '52baf68e-f7a8-4abf-bd5b-47b8d31dcfcf',
    'powdery mildew': 'd037f0fc-5ba3-4e07-aee4-2175270df9f2',
    'sooty mould': '98636997-0fec-4b15-a269-de30a9d56794',
    'coffee - cercospora': '02b0579e-3084-4a35-8790-21cc015268be',
    'coffee - healthy': '7afd14bb-ca9e-4c46-be24-d923b2130c55',
    'coffee - leaf rust': 'eccbc5d4-ebcf-45a4-8ec2-f496a1be0bfd',
    'coffee - miner': '11dfc6f8-039c-4b8e-97d0-031868e21289',
    'coffee - phoma': '95b27e8e-a486-42b4-8b4f-6b9508d4d436',
    'cocoa - black pod rot': '80f55d36-ba87-4d7b-b40c-f18b3cf35b5e',
    'cocoa - healthy': 'cbd11d41-08b2-4cec-b056-c890b067467b',
    'cocoa - swollen virus': 'bfab9539-d469-4f52-b1f1-50e52c6d8b23',
    'banana - cordana': 'e5cc7847-c917-4859-a931-2b01662237fa',
    'banana - healthy': '1e2b3f3e-2e3a-408f-ba98-a2e03b677deb',
    'banana - pestalotiopsis': 'f086e500-cf7c-44f5-9f82-77baaafcb4ad',
    'banana - sigatoka': '5f6d8a42-5f54-4d95-aade-857a8cbb306c',
    'sugarcane - healthy': '5f6460e2-bb18-42b8-af3d-8732ece97d28',
    'sugarcane - mosaic': '20f0c860-dad3-47de-bf41-b5af101708d2',
    'sugarcane - red rot': 'a39ac10f-61e6-4d71-943c-d360147ddcaf',
    'sugarcane - rust': 'da15715b-0675-43c3-b6f5-87f7c52f3ee3',
    'sugarcane - yellow': 'c7e30e2a-7b08-4b9f-b399-6a33e05ad764',
    'sunflower - downy mildew': '36d0ccff-ae54-4f29-8c98-bcc0536d4e17',
    'sunflower - fresh leaf': '0e07587d-29f2-498d-a79f-1b5399c3fe91',
    'sunflower - gray mold': 'd0582258-389e-493b-88b1-083e5ffae20a',
    'sunflower - leaf scars': 'efc97607-6f95-46c1-b4d5-e7db34566a72',
    'watermelon - anthracnose': '6bbebf8e-6f84-43b2-a450-9e6e6624f4d3',
    'watermelon - downy mildew': '9fdcd3c2-90eb-4152-99f8-62073dce74b6',
    'watermelon - healthy': '145f113a-ae1f-4e95-82ad-9bdd60ed1164',
    'watermelon - mosaic virus': '2eb7bb73-21bb-4909-9896-ff623a359ba6',
    "cutting weevil": "ae805f46-7d98-4ae4-854d-39e5fbacaf27",
    "healthy": "f8a5602f-608a-4220-8615-52cd1701162c"

  }
// Function to rename files using iteration
function renameFilesIteratively(baseDir) {
    let directories = [baseDir];

    while (directories.length > 0) {
        const currentDir = directories.pop();
        
        try {
            const entries = fs.readdirSync(currentDir);

            entries.forEach(entry => {
                const fullPath = path.join(currentDir, entry);
                const stats = fs.statSync(fullPath);

                if (stats.isDirectory()) {
                    // Add directory to the stack for further processing
                    directories.push(fullPath);
                } else {
                    // Rename file
                    const newFileName = `${diseaseToId[entry.toLowerCase().split('.jpg')[0]]}.jpg` || entry.toLowerCase();
                    const newFilePath = path.join(currentDir, newFileName);

                    if (fullPath !== newFilePath) {
                        fs.renameSync(fullPath, newFilePath);
                        console.log(`Renamed: ${fullPath} -> ${newFilePath}`);
                    }
                }
            });
        } catch (error) {
            console.error(`Error processing directory ${currentDir}:`, error);
        }
    }
}

// Start renaming
renameFilesIteratively(baseDirectory);
