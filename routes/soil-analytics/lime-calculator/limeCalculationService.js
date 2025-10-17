const axios = require("axios");
const API_BASE_URL = `${process.env.AI_SERVICE_URL_LIME_CALCULATOR}`;

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
exports.calculateLime = async (limeReq) => {
  const {
    areaUnit,
    currentPH,
    env,
    limePrice,
    soilDepth,
    soilType,
    targetPH,
    useCoordinates,
    latitude,
    longitude,
  } = limeReq;

  const requestBody = useCoordinates
    ? { areaUnit, env, latitude, limePrice, longitude, soilDepth, targetPH, useCoordinates }
    : { areaUnit, currentPH, env, limePrice, soilDepth, soilType, targetPH, useCoordinates };

  try {
    const response = await axios(getRequestOptions("/calculate", "post", requestBody));
    return response.data
  } catch (error) {
    console.error("ERROR IN CACLULATIONS", error);
    return { success: false, message:  error.response?.data?.message || error.message || "Failed to calculate lime requirements." };
  }
};
