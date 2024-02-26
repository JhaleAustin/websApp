const express = require('express');
const router = express.Router();

const { getTopics, newType, newTopic,getAllHome, deletePeanutShell, deleteMulching, deletePeanutShellMulching, deleteBenefit, updateTopic} = require('../controllers/homeController');

router.get('/topics', getTopics);
// router.post('/home/topic/new', isAuthenticatedUser, authorizeRoles('admin'), newTopic)
router.post('/home/type/new', newType)
router.post('/home/topic/:id', newTopic)
router.get('/', getAllHome);


router.route('/home/peanutshell/:id').put(updateTopic).delete(deletePeanutShell);
router.route('/home/mulching/:id').put(updateTopic).delete(deleteMulching);
router.route('/home/peanutshellmulching/:id').put(updateTopic).delete(deletePeanutShellMulching);
router.route('/home/benefit/:id').put(updateTopic).delete(deleteBenefit);

module.exports = router;