const { articlePost, getArticles, getArticle } = require('../controllers/article.controller');

let router = require('express').Router();

router.get('/', getArticles);
router.get('/:id', getArticle);

router.post('/post', articlePost);


module.exports = router;