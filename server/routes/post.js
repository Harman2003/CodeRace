const express = require('express');
const createPostController = require('../controllers/post/createPostController');
const getPostController = require('../controllers/post/getPostController');
const createCommentController = require('../controllers/post/postActionController');
const getCommentController = require('../controllers/post/getCommentsController');
const router = express.Router();

router.post('/', createPostController);
router.get('/', getPostController);
router.post('/comment', createCommentController);
router.get('/comment/:id', getCommentController);

module.exports = router;