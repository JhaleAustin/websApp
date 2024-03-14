const express = require('express');
const router = express.Router();
const upload = require('../utils/multer')

const { newInquiry, getAllInquiries, deleteInquiry}
     = require('../controllers/inquiriesController');

const { isAuthenticatedUser, authorizeRoles }  = require('../middlewares/auth')

router.post('/inquiry', upload.array('images'), newInquiry);
router.get('/inquiries', getAllInquiries)
router.route('/inquiry/:id', isAuthenticatedUser, authorizeRoles('admin')).delete(deleteInquiry);

module.exports = router;