const express = require('express');
const router = express();

const { create, index, find, update, destroy } = require('./controller');

router.post('/cms/categories', create);
router.get('/cms/categories', index);
router.get('/cms/categories/:id', find);
router.put('/cms/categories/:id', update);
router.delete('/cms/categories/:id', destroy);

module.exports = router;