const express = require('express');
const createPostController = require('../controllers/post/createPostController');
const getPostController = require('../controllers/post/getPostController');
const postActionController = require('../controllers/post/postActionController');
const getCommentController = require('../controllers/post/getCommentsController');
const router = express.Router();

router.post('/', createPostController);
router.get('/', getPostController);
router.post('/upvote', postActionController);
router.post('/comment', postActionController);
router.get('/comment/:id', getCommentController);
router.post('/share', postActionController);
router.post('/save', postActionController);

module.exports = router;