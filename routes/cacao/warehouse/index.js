const express = require('express');
const router = express.Router();

router.use('/product', require('./product'));

router.use('/inbound-warehouse',require('./inboundWarehouse'));

router.use('/outbound-warehouse',require('./outboundWarehouse'));

router.use('/report',require('./report'));

router.use('/production-chart', require('./productionCharts'));

router.use('/low-stock',require('./lowStock'));

router.use('/warehouse-options', require('./warehouseoptions'));

router.use('/production-target', require('./ProductionTargets'))

module.exports = router;
