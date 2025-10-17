// soilAnalysisService.js
const axios = require('axios');

const fetchSoilAnalysis = async (latitude, longitude, parameters =  [
  "bdod", "cec", "cfvo", "clay" ,"nitrogen", "phh2o", "sand", "silt", "soc", "ocd", "ocs"
  ]) => {
    const url = `${process.env.AI_SERVICE_URL_SOIL_INFO_CALCULATOR}/get-soil-info`;
    const body = { latitude, longitude, parameters };
    const options = {
      method: 'post',
      url: url,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'en-US,en;q=0.9',
        'Connection': 'keep-alive',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-site',
        'Sec-GPC': '1',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
        'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6ODc5fSwiaWF0IjoxNzI5NTIyMDI0LCJleHAiOjIzMjk1MjIwMjR9.wlw0XS9vryEiWKaMne_ldCk0e0H7LJvqD599eGDnDug',
        'screensize': '1080x1872',
        'sec-ch-ua': '"Not)A;Brand";v="99", "Brave";v="127", "Chromium";v="127"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
      data: body,
      timeout: 200000, // Set a timeout of 10 seconds
    };
  
    try {
      const response = await axios(options);
      return response.data;
    } catch (err) {
      console.error("Error in fetchSoilAnalysis:", err);
      return null;
    }
  };

module.exports = fetchSoilAnalysis;
