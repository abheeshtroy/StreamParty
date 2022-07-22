const express = require('express');
const router = express.Router();

router.use('/api', require('./api/index2'));

module.exports = router;

