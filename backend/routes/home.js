const express = require('express');
const router = express.Router();

const { getTopics, newType, newTopic,getAllHome, deletePeanutShell, deleteMulching, deletePeanutShellMulching, deleteBenefit, updatePeanutShell, updateMulching, updatePeanutShellMulching, updateBenefits, getSinglePeanutShell, getSingleMulching, getSinglePeanutShellMulching, getSingleBenefit} = require('../controllers/homeController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')


router.get('/topics', getTopics);
router.post('/home/type/new', newType)
router.get('/', getAllHome);

//ADMIN

router.post('/home/topic/:id', isAuthenticatedUser, authorizeRoles('admin'), newTopic)

router.route('/home/peanutshell/:id', isAuthenticatedUser, authorizeRoles('admin')).put(updatePeanutShell).delete(deletePeanutShell);
router.get('/home/show/peanutshell/:id', getSinglePeanutShell);

router.route('/home/mulching/:id', isAuthenticatedUser, authorizeRoles('admin')).put(updateMulching).delete(deleteMulching);
router.get('/home/show/mulching/:id', getSingleMulching);

router.route('/home/peanutshellmulching/:id', isAuthenticatedUser, authorizeRoles('admin')).put(updatePeanutShellMulching).delete(deletePeanutShellMulching);
router.get('/home/show/peanutshellmulching/:id', getSinglePeanutShellMulching);

router.route('/home/benefit/:id', isAuthenticatedUser, authorizeRoles('admin')).put(updateBenefits).delete(deleteBenefit);
router.get('/home/show/benefit/:id', getSingleBenefit);

module.exports = router;