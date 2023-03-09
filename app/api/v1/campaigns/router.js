const express = require('express');
const router = express();
const upload = require('../../../middlewares/multer');

const { index, findById, findBySlug, create, destroy, update, updateImage, getSearchCampaign } = require('./controller');
const { authenticateUser } = require('../../../middlewares/auth');

router.get('/campaigns', index);
router.get('/campaigns/:id', findById);
router.get('/campaigns/detail/:url_slug', findBySlug);
router.post('/campaigns', upload.single('campaign'), authenticateUser, create);
router.delete('/campaigns/:id', authenticateUser, destroy);
router.put('/campaigns/:id', authenticateUser, update);
router.put('/campaigns/:id/image', upload.single('campaign'), authenticateUser, updateImage);

module.exports = router;
