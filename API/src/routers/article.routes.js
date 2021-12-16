const articleRoutes = require('../controllers/article.controller');
let {checkUser} = require('../../middlewares/auth.middleware');

let router = require('express').Router();

router.get('/', articleRoutes.getArticles);
router.get('/:id', articleRoutes.getArticle);

router.post('/post', articleRoutes.articlePost);
router.put('/:id/edit', articleRoutes.articleEdit);
router.put('/:id/publish', articleRoutes.publishArticle);
router.delete('/:id/delete', articleRoutes.articleDelete);

router.patch('/like/:id', articleRoutes.likeArticle);
router.patch('/dislike/:id', articleRoutes.dislikeArticle);

// router.get('/comments', articleRoutes.getComments);
router.patch('/:id/comment/post', articleRoutes.postComment);
router.patch('/:id/comment/edit', articleRoutes.editComment);

router.patch('/like/comment/:id', articleRoutes.likeComment);
router.patch('/dislike/comment/:id', articleRoutes.dislikeComment);


module.exports = router;