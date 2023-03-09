const express = require('express');
const router = express();

const { index } = require('./controller');

router.post('/downloader/:id_campaign', index);

module.exports = router;