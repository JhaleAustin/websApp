const express = require('express');
const router = express.Router();
const upload = require('../utils/multer')

const { newPlantTypes, newDocumentation, getDocumentations, getWithMulching, getWithoutMulching, getSingleDocumentation,
     updateDocumentation, deleteDocumentation }
      = require('../controllers/docuController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

router.get('/Documentations', getDocumentations)

//ADMIN
router.post('/planttypes/new', isAuthenticatedUser, authorizeRoles('admin'), newPlantTypes)

router.get('/documentation/show/withmulch', isAuthenticatedUser, authorizeRoles('admin'), getWithMulching)
router.get('/documentation/show/withoutmulch', isAuthenticatedUser, authorizeRoles('admin'), getWithoutMulching)
router.get('/admin/documentation/:id', getSingleDocumentation);

router.post('/admin/documentation/:id', isAuthenticatedUser, authorizeRoles('admin'), upload.array('images'), newDocumentation)
router.route('/admin/documentation/:id', isAuthenticatedUser, authorizeRoles('admin')).put(upload.array('images'), updateDocumentation).delete(deleteDocumentation);

module.exports = router;