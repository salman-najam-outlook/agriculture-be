const axios = require("axios");
const FormData = require('form-data');
const API_BASE_URL = `${process.env.AI_SERVICE_URL_NUTRIENT_CALCULATOR}`;

const getRequestOptions = (url, method, data) => {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Connection: "keep-alive",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-site",
    };
    return {
    url: `${API_BASE_URL}${url}`,
    method: method,
    data: JSON.stringify(data),
    headers: headers
  };
  };




const getCropsData = async () => {
  try {
    const REQUEST_OPTIONS = getRequestOptions('/crops/uptake', 'get');
    const response = await axios(REQUEST_OPTIONS);
    return response.data;
  } catch (error) {
    console.error("Error fetching crops data:", error);
    throw error;
  }
};

const getUnitOfSalesData = async () => {
  try {
    const REQUEST_OPTIONS = getRequestOptions('/unit-of-sales', 'get');
    const response = await axios(REQUEST_OPTIONS);
    return response.data;
  } catch (error) {
    console.error("Error fetching unit of sales data:", error);
    throw error;
  }
};

const getLeftOverCropsData = async (req,res) => {

    try {
        const { harvestId } = req.body;
        const REQUEST_OPTIONS = getRequestOptions('/crops/leftovers', 'post', { harvestId });
        const response = await axios(REQUEST_OPTIONS);
        return response.data;
        } catch (error) {
        console.error('Error fetching left over crops data:', error);
        console.error('Request method:', error.config.method);
        console.error('Request headers:', error.config.headers);
        throw error;
    }
};

const getNPKValues = async (coordinates) => {
  try {
    const REQUEST_OPTIONS = getRequestOptions('/get-npk/', 'post', { coordinates });
    const response = await axios(REQUEST_OPTIONS);
    return response.data;
  } catch (error) {
    console.error("Error fetching npk values", error);
    throw error;
  }
};

const getSystemFertilizers = async () => {
  try {
    const REQUEST_OPTIONS = getRequestOptions('/fertilizers', 'get');
    const response = await axios(REQUEST_OPTIONS);
    return response.data;
  } catch (error) {
    console.error("Error fetching fertilizers data:", error);
    throw error;
  }
};

const getUserFertilizersData = async (userId) => {
  try {
    const REQUEST_OPTIONS = getRequestOptions(`/user-fertilizers/${userId}`, 'get');
    const response = await axios(REQUEST_OPTIONS);
    return response.data;
  } catch (error) {
    console.error("Error fetching user fertilizers data:", error);
    throw error;
  }
};

const createUserFertilizer = async (userId, fertilizerData) => {
  try {
    let formData = new FormData()
    for(let key in fertilizerData) {
      formData.append(key, fertilizerData[key])
    }
    formData.append("userId", userId)

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: API_BASE_URL + "/create-user-fertilizer/",
      headers: { 
        'Content-Type': 'application/json', 
        ...formData.getHeaders()
      },
      data : formData
    };

    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error("Error creating user fertilizer:", error);
    throw error;
  }
};

const calculateNutrient = async (requestBody) => {
    try {
      const REQUEST_OPTIONS = getRequestOptions('/calculate-nutrient/', 'post', requestBody);
      const response = await axios(REQUEST_OPTIONS);
      return response.data;
    } catch (error) {
      console.error('Error calculating nutrient:', error);
      console.error('Request method:', error.config.method);
      console.error('Request headers:', error.config.headers);
      throw error;
    }
  };

module.exports = {
  getCropsData,
  getUnitOfSalesData,
  getLeftOverCropsData,
  getNPKValues,
  getSystemFertilizers,
  getUserFertilizersData,
  createUserFertilizer,
  calculateNutrient,
};
