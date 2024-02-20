const express = require('express');
const router = express.Router();

const { getSingleTopic, newTopic } = require('../controllers/homeController');

router.get('/topic/:id', getSingleTopic);
// router.post('/home/topic/new', isAuthenticatedUser, authorizeRoles('admin'), newTopic)
router.post('/home/topic/new', newTopic)

module.exports = router;