const articleRoutes = require('../controllers/article.controller');

let router = require('express').Router();

router.get('/', articleRoutes.getArticles);
router.get('/:id', articleRoutes.getArticle);

router.post('/post', articleRoutes.articlePost);

router.patch('/like/:id', articleRoutes.likeArticle);
router.patch('/dislike/:id', articleRoutes.dislikeArticle);

router.get('/comments', articleRoutes.getComments);
router.post('/post/comment/', articleRoutes.postComment);
router.put('/edit/comment/:id', articleRoutes.editComment);

router.patch('/like/comment/:id', articleRoutes.likeComment);
router.patch('/dislike/comment/:id', articleRoutes.dislikeComment);


module.exports = router;