const express = require('express');
const router = express.Router();
const upload = require('../utils/multer')

const { newProcess, getProcesss,getProcess, getSingleProcess,
     updateProcess, deleteProcess, getAllProcess }
      = require('../controllers/processController');

// const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

router.post('/process/new', newProcess);

router.get('/process', getProcess)

router.get('/process/show/:id', getSingleProcess);

router.get('/admin/process', getAllProcess)

router.route('/admin/process/:id').put(updateProcess).delete(deleteProcess);

module.exports = router;