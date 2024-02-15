const express = require('express');
const router = express.Router();
const upload = require('../utils/multer')

const {  getRecordCollection } = require('../controllers/recordController');

// const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')
router.get('/getRecord', getRecordCollection)
module.exports = router;