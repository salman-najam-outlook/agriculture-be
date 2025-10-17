const express = require('express');
const router = express.Router();

router.use('/buying', require('./buying'));
router.use('/production', require('./production'));

module.exports = router;
