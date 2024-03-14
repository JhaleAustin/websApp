const express = require('express');
const router = express.Router();
const upload = require('../utils/multer')

const { isAuthenticatedUser, authorizeRoles }  = require('../middlewares/auth')


const { newFollowUp, newReply, getAllFollowUp, getAllReply, deleteFollowUp, deleteReply, getAdminFollowUp, getAdminReply}
     = require('../controllers/communicationController');

router.post('/followup/:id', upload.array('images'), newFollowUp);
router.post('/reply/:id', isAuthenticatedUser, authorizeRoles('admin'), upload.array('images'), newReply);
router.get('/followups', getAllFollowUp)
router.get('/replies', getAllReply)
router.route('/followups/:id', isAuthenticatedUser, authorizeRoles('admin')).delete(deleteFollowUp);
router.route('/replies/:id', isAuthenticatedUser, authorizeRoles('admin')).delete(deleteReply);
router.get('/admin/followup/:id', isAuthenticatedUser, authorizeRoles('admin'), getAdminFollowUp)
router.get('/admin/reply/:id', getAdminReply)
// router.get('/admin/reply/:id', isAuthenticatedUser, authorizeRoles('admin'), getAdminReply)


module.exports = router;