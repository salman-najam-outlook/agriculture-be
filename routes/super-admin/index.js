const express = require('express');
const router = express.Router();

router.use('/enterprise', require('./enterprise'));
module.exports = router;