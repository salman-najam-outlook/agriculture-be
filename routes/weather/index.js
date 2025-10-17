const express = require('express');
const router = express.Router();
const axios = require('axios');
const auth = require(rootPath + '/middleware/auth');
const db = require(rootPath + '/models');
const { successRespSync, serverError } = require(rootPath + '/helpers/api');
const { success } = require(rootPath + '/helpers/language');
const { logErrorOccurred } = require(rootPath + '/helpers/general');
const validatorWeather = require(rootPath + '/helpers/validators/weather');
const validationErrorHandler = require(rootPath +
  '/middleware/validation_error_handler');
  const { Op } = require("sequelize");


  let langObj = {
    en: "en",
    hi: "hi",
    mr: "en",
    ne: "en",
    es: "sp",
    id: "id",
    in: "id",
    ar: "ar",
    pt: "pt",
    fr: "fr",
    vi: "vi",
    am: "en",
    so: "en",
    om: "en",
    bn: "en",
    sw: "en",
    el: "el",
    tr: "tr",
  };


/**
 * @swagger
 * /weather:
 *   get:
 *     description: Fetch weather details of the user farms
 *     tags: [Weather]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MTd9LCJpYXQiOjE2NDg1NTAxNzYsImV4cCI6MTY0ODYxMDE3Nn0.tacCMSuqGtBnSqoieFkc2J3bXKUQqwxPRvbR25lM5IA'
 *      - in: query
 *        name: farm
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          1
 *     responses:
 *       200:
 *         description: On success response if data is present.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   success:
 *                     type: boolean
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *               example:
 *                    success: true
 *                    code: 200
 *                    message: Fetched successfully.
 *                    data:
 *                      weather:
 *                        lat: 30.7555
 *                        lon: 76.6524
 *                        timezone: Asia/Kolkata
 *                        timezone_offset: 19800
 *                        current:
 *                          dt: 1648618103
 *                          sunrise: 1648601113
 *                          sunset: 1648645826
 *                          temp: 34.9
 *                          feels_like: 32.21
 *                          pressure: 1008
 *                          humidity: 7
 *                          dew_point: -5.29
 *                          uvi: 6.73
 *                          clouds: 0
 *                          visibility: 10000
 *                          wind_speed: 2.25
 *                          wind_deg: 163
 *                          wind_gust: 1.48
 *                          weather:
 *                            - id: 800
 *                              main: Clear
 *                              description: clear sky
 *                              icon: 01d
 *                        minutely:
 *                          - dt: 1648618140
 *                            precipitation: 0
 *                        hourly:
 *                          - dt: 1648616400
 *                            temp: 34.9
 *                            feels_like: 32.21
 *                            pressure: 1008
 *                            humidity: 7
 *                            dew_point: -5.29
 *                            uvi: 6.73
 *                            clouds: 0
 *                            visibility: 10000
 *                            wind_speed: 2.25
 *                            wind_deg: 163
 *                            wind_gust: 1.48
 *                            weather:
 *                              - id: 800
 *                                main: Clear
 *                                description: clear sky
 *                                icon: 01d
 *                            pop: 0
 *                        daily:
 *                          - dt: 1648621800
 *                            sunrise: 1648601113
 *                            sunset: 1648645826
 *                            moonrise: 1648597860
 *                            moonset: 1648639260
 *                            moon_phase: 0.93
 *                            temp:
 *                              day: 35.49
 *                              min: 22.43
 *                              max: 39.94
 *                              night: 26.85
 *                              eve: 38.15
 *                              morn: 22.43
 *                            feels_like:
 *                              day: 32.71
 *                              night: 25.72
 *                              eve: 34.84
 *                              morn: 21.15
 *                            pressure: 1008
 *                            humidity: 6
 *                            dew_point: -6.7
 *                            wind_speed: 4.27
 *                            wind_deg: 340
 *                            wind_gust: 6.25
 *                            weather:
 *                              - id: 800
 *                                main: Clear
 *                                description: clear sky
 *                                icon: 01d
 *                            clouds: 0
 *                            pop: 0
 *                            uvi: 9.28
 *
 */
router.get(
  '/',
  auth,
  validatorWeather.get(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const { farm: id } = req.query;
      const { id: userId } = req.user;

      const farm = await db.user_farm.findOne({
        raw: true,
        attributes: ['lat', 'log'],
        where: { id, [Op.or]: [{ userId: userId }, { technicianId: userId }] },
      });


      // https://api.openweathermap.org/data/2.5/weather?lat=-0.024143233180821056&lon=37.90624111890793&appid=82caa5fff01becb204bedbc3ed86d00d
      // https://api.openweathermap.org/data/2.5/forecast?lat=-0.024143233180821056&lon=37.90624111890793&appid=82caa5fff01becb204bedbc3ed86d00d
      const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
      const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';
      const params = {
        units: 'metric',
        lang: 'en',
        lat: farm.lat,
        lon: farm.log,
        appid: process.env.OPENWEATHER_APPID,
      };

      const weather = await axios.get(weatherUrl, { params });
      const forecast = await axios.get(forecastUrl, { params });

      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: { weather: weather.data, forecast: forecast.data }
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

router.get(
  '/v2',
  auth,
  validationErrorHandler,
  async (req, res) => {
    try {
      const {lat, log, date } = req.query;
      const { id: userId } = req.user;
      const { lang = "en" } = req.headers;
      const unixTimestamp = Math.floor(Date.parse(date) / 1000); // Convert to Unix timestamp

      console.log(unixTimestamp);

        // https://api.openweathermap.org/data/2.5/weather?lat=-0.024143233180821056&lon=37.90624111890793&appid=82caa5fff01becb204bedbc3ed86d00d
      // https://api.openweathermap.org/data/2.5/forecast?lat=-0.024143233180821056&lon=37.90624111890793&appid=82caa5fff01becb204bedbc3ed86d00d
      const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
      const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';
      const params = {
        units: 'metric',
        lang: 'en',
        lat: lat,
        lon: log,
        appid: process.env.OPENWEATHER_APPID,
      };

      const weather = await axios.get(weatherUrl, { params });
      const forecast = await axios.get(forecastUrl, { params });

      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: { weather: weather.data, forecast: forecast.data },
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

router.get(
  '/v3',
  auth,
  validationErrorHandler,
  async (req, res) => {
    try {
      const {lat, log, date } = req.query;
      const { id: userId } = req.user;
      const { lang = "en" } = req.headers;
      const unixTimestamp = Math.floor(Date.parse(date) / 1000); // Convert to Unix timestamp

      console.log(unixTimestamp);

        // https://api.openweathermap.org/data/2.5/weather?lat=-0.024143233180821056&lon=37.90624111890793&appid=82caa5fff01becb204bedbc3ed86d00d
      // https://api.openweathermap.org/data/2.5/forecast?lat=-0.024143233180821056&lon=37.90624111890793&appid=82caa5fff01becb204bedbc3ed86d00d
      const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
      const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';
      const params = {
        units: 'metric',
        lang: 'en',
        lat: lat,
        lon: log,
        appid: process.env.OPENWEATHER_APPID,
      };

      const weather = await axios.get(weatherUrl, { params });
      const forecast = await axios.get(forecastUrl, { params });

      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: { weather: weather.data, forecast: forecast.data },
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);
module.exports = router;
