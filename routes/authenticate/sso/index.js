const express = require('express');
const router = express.Router();
const axios = require("axios")


const translation = require(rootPath + "/middleware/translation");
const GOOGLE_CLIENT_ID = process.env.GOOGLE_SSO_CLIENT_ID || "";
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "";
const GOOGLE_REDIRECT_URI = `http://${process.env.APP_URL || 'sass-api-pre-prod.dimitra.dev'}/api/user/google/callback`;

const FB_CLIENT_ID = process.env.FB_SSO_CLIENT_ID || "";
const FB_CLIENT_SECRET = process.env.FB_CLIENT_SECRET || "";


const {loginProcess, authCodes} = require("../v2/auth.controller")

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(GOOGLE_CLIENT_ID);
// Initiates the Google Login flow
router.get('/auth/google', (req, res) => {
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=profile email`;
  res.redirect(url);
});

// Callback URL for handling the Google Login response
router.post('/google/callback', translation, async (req, res) => {
  const token = req.body.idToken;

  console.log(token, "idtoken log");

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID
    });

    console.log(token, "idtoken log");
    const payload = ticket.getPayload();

    // You can access the user info from the payload
    console.log('User ID:', payload.sub);

    let credential = payload.email

    // set values in req object
    req.body.credential = payload.email;
    req.body.sso = true

    const response = await loginProcess(req)
    res.status(200).json({
      success: true,
      code: 200,
      message: authCodes[903],
      data: response,
      customCode: 903
    });
  } catch (err) {
    console.error('Error verifying token:', err);
           res.status(err.code || 500).json({
          success: false,
          customCode: err.message,
          message: authCodes[err.message] || 'Internal Server Error',
        });
  }
  });

  router.post('/fb/callback', translation, async (req, res) => {

  
    try {
      let accessToken = req.body.authResponse.accessToken
      const appAccessToken = `${FB_CLIENT_ID}|${FB_CLIENT_SECRET}`;

      const url = `https://graph.facebook.com/v20.0/me?access_token=${accessToken}&debug=all&fields=email%2Cpermissions&format=json&method=get&origin_graph_explorer=1&pretty=0&suppress_http_code=1&transport=cors`;

      const response = await axios.get(url);

    // Check if the token is valid
    const { data } = response;

    if (data) {


   // set values in req object
   req.body.credential = data.email;
   req.body.sso = true

   const response = await loginProcess(req)

   res.status(200).json({
    success: true,
    code: 200,
    message: authCodes[903],
    data: response,
    customCode: 903
  });
    } else {
      res.status(401).json({ valid: false, message: 'Invalid token' });
    }

    } catch (err) {
      console.error('Error verifying token:', err);
      res.status(err.code || 500).json({
          success: false,
          customCode: err.message,
          message: authCodes[err.message] || 'Internal Server Error',
        });
    }
    });
  
module.exports = router;