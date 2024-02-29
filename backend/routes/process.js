const express = require('express');
const router = express.Router();
const upload = require('../utils/multer')

const { newProcess, getProcesss,getProcess, getSingleProcess,
     updateProcess, deleteProcess, getAllProcess }
      = require('../controllers/processController');

// const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

// router.post('/process/new', upload.single('videos'), newProcess)



// Assuming you are using multer for file uploads
const multer = require('multer');
const upload1 = multer({ dest: 'uploads/' });

router.post('/process/new', newProcess);



router.get('/process', getProcess)

router.get('/process/:id', getSingleProcess);

// router.route('/admin/Process/:id', isAuthenticatedUser,).put(upload.array('images', 10),
//  updateProcess).delete(deleteProcess);

router.get('/admin/process', getAllProcess)

router.route('/admin/process/:id').put(upload.array('images', 10),
 updateProcess).delete(deleteProcess);

// router.get('/admin/Processs', isAuthenticatedUser,
//  authorizeRoles('admin'), getAdminProcesss);

module.exports = router;