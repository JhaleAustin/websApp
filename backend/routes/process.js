const express = require('express');
const router = express.Router();
const upload = require('../utils/multer')

const { newProcess, getProcesss,getProcess, getSingleProcess,
     updateProcess, deleteProcess }
      = require('../controllers/processController');

// const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

router.post('/process/new', upload.single('videos'), newProcess)

router.get('/process', getProcess)

router.get('/process/:id', getSingleProcess);

// router.route('/admin/Process/:id', isAuthenticatedUser,).put(upload.array('images', 10),
//  updateProcess).delete(deleteProcess);

router.route('/admin/process/:id').put(upload.array('images', 10),
 updateProcess).delete(deleteProcess);

// router.get('/admin/Processs', isAuthenticatedUser,
//  authorizeRoles('admin'), getAdminProcesss);

module.exports = router;