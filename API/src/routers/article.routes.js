const { articlePost, getArticles, getArticle, postComment, editComment, getComments, likeComment, dislikeComment, likeArticle, dislikeArticle } = require('../controllers/article.controller');

let router = require('express').Router();

router.get('/', getArticles);
router.get('/:id', getArticle);

router.post('/post', articlePost);

router.patch('/like/:id', likeArticle);
router.patch('/dislike/:id', dislikeArticle);

router.get('/:id/comments', getComments);
router.post('/post/comment/', postComment);
router.put('/edit/comment/:id', editComment);

router.patch('/like/comment/:id', likeComment);
router.patch('/dislike/comment/:id', dislikeComment);


module.exports = router;