const express = require('express');
const router = express();
const upload = require('../../../middlewares/multer');

const { findEmail, findUserId, editPassword, editUserProfile, editProfilePicture } = require('./controller');
const { authenticateUser } = require('../../../middlewares/auth');

router.get('/users/email', authenticateUser, findEmail);
router.get('/users/:id', authenticateUser, findUserId);
router.put('/users/profile', authenticateUser, editUserProfile);
router.put('/users/password', authenticateUser, editPassword);
router.put('/users/image', upload.single('avatar'), authenticateUser, editProfilePicture);

module.exports = router;