const express = require('express');
const router = express.Router();
const upload = require('../utils/multer')

const { newPlantTypes, newDocumentation, getDocumentations,getDocumentation, getSingleDocumentation,
     updateDocumentation, deleteDocumentation }
      = require('../controllers/docuController');

// const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

// router.post('/Documentation/new', isAuthenticatedUser,
//  upload.array('images', 10), newDocumentation)

router.post('/planttypes/new', newPlantTypes)

// router.post('/withmulch/new/:id',upload.array('images', 10), newDocumentation)

router.post('/documentation/new/:id',upload.array('images', 10), newDocumentation)


router.get('/Documentations', getDocumentations)

//  router.get('/Documentation', getDocumentation)

router.get('/Documentation/:id', getSingleDocumentation);

// router.route('/admin/Documentation/:id', isAuthenticatedUser,).put(upload.array('images', 10),
//  updateDocumentation).delete(deleteDocumentation);

router.route('/admin/Documentation/:id').put(upload.array('images', 10),
 updateDocumentation).delete(deleteDocumentation);


// router.get('/admin/Documentations', isAuthenticatedUser,
//  authorizeRoles('admin'), getAdminDocumentations);

module.exports = router;