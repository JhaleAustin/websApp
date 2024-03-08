const express = require('express');
const router = express.Router();
const upload = require('../utils/multer')

const { isAuthenticatedUser, authorizeRoles }  = require('../middlewares/auth')


const { newAnswer, getAllAnswers, updateAnswer, deleteAnswer}
     = require('../controllers/answersController');

router.post('/answer/:id', isAuthenticatedUser, upload.array('images'), newAnswer);
router.get('/answers', getAllAnswers)
router.route('/answers/:id', isAuthenticatedUser, authorizeRoles('admin')).delete(deleteAnswer);

module.exports = router;