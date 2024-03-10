const express = require('express');
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles }  = require('../middlewares/auth')

const { newAnalysis, getAllAnalysis}
     = require('../controllers/analysisController');

router.post('/analysis', newAnalysis);
router.get('/admin/analysis', isAuthenticatedUser, authorizeRoles('admin'), getAllAnalysis);


module.exports = router;