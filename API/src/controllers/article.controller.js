const { isValidObjectId } = require('mongoose');
const { articleErrors } = require('../../utils/error.utils');

let articleModel = require('../../models/article.models');
let commentModel = require('../../models/comment.model');
const userModel = require('../../models/user.model');

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

module.exports.likeArticle = (req, res) => {
    if (!isValidObjectId(req.params.id)) 
        return res.status(200).send('invalid id');

        const {userId} = req.body;

        try {
           
            articleModel.findByIdAndUpdate(
                req.params.id,
                {
                    $addToSet: {likers: userId},
                },
                {new: true},
                (err, data) => {
                    if (err) return console.log(err);                    
                }
            );
            
            userModel.findByIdAndUpdate(
                userId,
                {
                    $addToSet: {likes: req.params.id},
                },
                {new: true},
                (err, data) => {
                    if (err) return console.log(err);
                    else return res.send(data);
                }
            );
    
        } catch (error) {
            console.log(error);
        }
}

module.exports.dislikeArticle = (req, res) => {
    if (!isValidObjectId(req.params.id)) 
        return res.status(200).send('invalid id');

        const {userId} = req.body;

        try {
            articleModel.findByIdAndUpdate(
                req.params.id,
                {
                    $pull: {likers: userId},
                },
                {new: true},
                (err, data) => {
                    if (err) console.log(err);
                    else {
                        userModel.findByIdAndUpdate(
                            userId,
                            {
                                $pull: {likes: req.params.id},
                            },
                            {new: true},
                            (err, data) => {
                                if (err) console.log(err);
                                else res.status(202).send(data);
                            }
                        );
                    }
                }
            );
    
        } catch (error) {
            console.log(error);
        }
}



module.exports.getComments = async (req, res) => {
    await commentModel.find((err, data) => {
        if (err) res.status(200).send(err);
        else res.status(201).json(data);
    })
}

module.exports.postComment = async(req, res) => {

    const {posterId, articleId, comment} = req.body;

    const newComment = new commentModel({
        articleId,
        posterId,
        comment
    });

    try {
        const comment = await newComment.save();
        res.status(200).send(comment);
    } catch (error) {
        console.log(error);
    }

}

module.exports.editComment = (req, res) => {
    if (!isValidObjectId(req.params.id)) 
        return res.status(200).send('invalid id');

        commentModel.findByIdAndUpdate(req.params.id, 
            {
                $set:  { comment: req.body.comment }
            }, {
                new: true,
            }, (err, data) => {
                if (err) console.log(err);
                else return res.status(202).json(data);
            });


}

module.exports.likeComment = (req, res) => {
    if (!isValidObjectId(req.params.id)) 
        return res.status(200).send('invalid id');

    const {userId} = req.body;

    try {
        commentModel.findByIdAndUpdate(
            req.params.id,
            {
                $addToSet: {likers: userId},
            },
            {new: true},
            (err, data) => {
                if (err) console.log(err);
                else {
                    userModel.findByIdAndUpdate(
                        userId,
                        {
                            $addToSet: {likes: req.params.id},
                        },
                        {new: true},
                        (err, data) => {
                            if (err) console.log(err);
                            else res.status(202).send(data);
                        }
                    );
                }
            }
        );

    } catch (error) {
        console.log(error);
    }
}

module.exports.dislikeComment = (req, res) => {
    if (!isValidObjectId(req.params.id)) 
        return res.status(200).send('invalid id');

        const {userId} = req.body;

    try {
        commentModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull: {likers: userId},
            },
            {new: true},
            (err, data) => {
                if (err) console.log(err);
                else {
                    userModel.findByIdAndUpdate(
                        userId,
                        {
                            $pull: {likes: req.params.id},
                        },
                        {new: true},
                        (err, data) => {
                            if (err) console.log(err);
                            else res.status(202).send(data);
                        }
                    );
                }
            }
        );

    } catch (error) {
        console.log(error);
    }
}