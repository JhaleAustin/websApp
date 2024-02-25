const express = require('express');
const router = express.Router();

const { getTopics, newType, newTopic,getAllHome } = require('../controllers/homeController');

router.get('/topics', getTopics);
// router.post('/home/topic/new', isAuthenticatedUser, authorizeRoles('admin'), newTopic)
router.post('/home/type/new', newType)
router.post('/home/topic/:id', newTopic)
router.get('/home', getAllHome);
module.exports = router;