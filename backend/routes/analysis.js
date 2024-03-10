const express = require('express');
const router = express.Router();

const { newAnalysis}
     = require('../controllers/analysisController');

router.post('/analysis', newAnalysis);

module.exports = router;