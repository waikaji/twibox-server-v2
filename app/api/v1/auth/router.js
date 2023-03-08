const express = require('express');
const router = express();
const { signinUser, registerUser } = require('./controller');

router.post('/auth/signin', signinUser);
router.post('/auth/register', registerUser);

module.exports = router;