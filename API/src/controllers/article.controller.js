const { isValidObjectId } = require('mongoose');
let articleModel = require('../../models/article.models');
const { articleErrors } = require('../../utils/error.utils');


module.exports.getArticles = async(req,res) => {

    const articles = await articleModel.find();
    res.status(200).json(articles);

}

module.exports.getArticle = (req,res) => {

    if (!isValidObjectId(req.params.id)) 
        return res.status(200).send('invalid id');

    articleModel.findById(req.params.id, (err, data) => {
        if (err) throw err
        else return res.status(200).json(data);
    });

}

module.exports.articlePost = async (req, res) => {

            const newArticle = new articleModel({
                title: req.body.title,
                body: req.body.article,
                author: req.body.author
            });
        
            try {
                const article = await newArticle.save();
                res.status(201).json(article);
            } catch(err) {
                let errors = articleErrors(err);
                res.status(200).send({errors});
            }

    

}