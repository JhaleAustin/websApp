const express = require('express');
const router = express.Router();
const upload = require('../utils/multer')

const { newInquiry, getAllInquiries}
     = require('../controllers/inquiriesController');

router.post('/inquiry', upload.array('images'), newInquiry);
router.get('/inquiries', getAllInquiries)
module.exports = router;