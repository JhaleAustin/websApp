const express = require('express');
const router = express.Router();

const { getTopics, newType, newTopic,getAllHome, deletePeanutShell, deleteMulching, deletePeanutShellMulching, deleteBenefit, updatePeanutShell, updateMulching, updatePeanutShellMulching, updateBenefits, getSinglePeanutShell, getSingleMulching, getSinglePeanutShellMulching, getSingleBenefit} = require('../controllers/homeController');

router.get('/topics', getTopics);
// router.post('/home/topic/new', isAuthenticatedUser, authorizeRoles('admin'), newTopic)
router.post('/home/type/new', newType)
router.post('/home/topic/:id', newTopic)
router.get('/', getAllHome);


router.route('/home/peanutshell/:id').put(updatePeanutShell).delete(deletePeanutShell);
router.get('/home/show/peanutshell/:id', getSinglePeanutShell);

router.route('/home/mulching/:id').put(updateMulching).delete(deleteMulching);
router.get('/home/show/mulching/:id', getSingleMulching);

router.route('/home/peanutshellmulching/:id').put(updatePeanutShellMulching).delete(deletePeanutShellMulching);
router.get('/home/show/peanutshellmulching/:id', getSinglePeanutShellMulching);

router.route('/home/benefit/:id').put(updateBenefits).delete(deleteBenefit);
router.get('/home/show/benefit/:id', getSingleBenefit);

module.exports = router;