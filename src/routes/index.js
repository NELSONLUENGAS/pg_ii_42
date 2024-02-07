const { updatePostController } = require('../controllers');
const { updatePostMiddleware } = require('../middlewares');

const router = require('express').Router();

router.put('/post/:id/update', updatePostMiddleware, updatePostController);

module.exports = router;
