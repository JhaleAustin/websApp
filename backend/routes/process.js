const express = require('express');
const router = express.Router();
const upload = require('../utils/multer')

const { newProcess, getProcesss,getProcess, getSingleProcess,
     updateProcess, deleteProcess }
      = require('../controllers/processController');

// const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

// router.post('/Process/new', isAuthenticatedUser,
//  upload.array('images', 10), newProcess)


router.post('/Process/new',upload.array('images', 10), newProcess)


router.get('/Processs', getProcesss)

router.get('/Process', getProcess)

router.get('/Process/:id', getSingleProcess);

// router.route('/admin/Process/:id', isAuthenticatedUser,).put(upload.array('images', 10),
//  updateProcess).delete(deleteProcess);

router.route('/admin/Process/:id').put(upload.array('images', 10),
 updateProcess).delete(deleteProcess);


// router.get('/admin/Processs', isAuthenticatedUser,
//  authorizeRoles('admin'), getAdminProcesss);

module.exports = router;