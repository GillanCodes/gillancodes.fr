const { isValidObjectId } = require('mongoose');
const { articleErrors } = require('../../utils/error.utils');

let articleModel = require('../../models/article.models');
const userModel = require('../../models/user.model');

module.exports.getArticles = async(req,res) => {
    
    if (res.locals.user && res.locals.user.permissions.has('AUTHOR') || res.locals.user && res.locals.user.permissions.has('ADMIN')) {
        const articles = await articleModel.find().sort({ createdAt: -1 });
        res.status(200).json(articles);
    } else {
        const articles = await articleModel.find({isPublish: true, isDelete: false}).sort({ createdAt: -1 });;
        res.status(200).json(articles);
    }

}

module.exports.getArticle = (req,res) => {

    if (!isValidObjectId(req.params.id)) 
        return res.status(200).send('invalid id');

    if (res.locals.user && res.locals.user.permissions.AUTHOR || res.locals.user && res.locals.user.permissions.ADMIN) {
        articleModel.findById(req.params.id, (err, data) => {
            if (err) throw err
            else return res.status(200).json(data);
        });
    } else {
        articleModel.findOne({_id : req.params.id, isPublish: true}, (err, data) => {
            if (err) throw err
            else return res.status(200).json(data);
        });
    }

}

module.exports.articlePost = async (req, res) => {

            if (res.locals.user) {

                if (res.locals.user.permissions.has('ADMIN') || res.locals.user.permissions.has('AUTHOR') || res.locals.user.permissions.has('DEV')) {
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
                } else {
                    return res.status(403).send('Forbidden action')
                }
            } else {
                return res.status(401).send('unauthorized action')
            }

}

module.exports.articleEdit = (req, res) => {
    if (!isValidObjectId(req.params.id)) 
        return res.status(200).send('invalid id');

    if (res.locals.user) {

        if (res.locals.user.permissions.has('AUTHOR') || res.locals.user.permissions.has('ADMIN') || res.locals.user.permissions.has('DEV')) {
            try {
                articleModel.findByIdAndUpdate(
                    req.params.id, {
                        $set: {
                            title : req.body.title,
                            body : req.body.article,
                            isEdited: true,
                            isPublish: req.body.isPublish
                        }
                    }, (err, data) => {
                        if (!err) res.status(201).send(data)
                        else console.log(err);
                    })
            } catch (error) {
                console.log(error);
            }
        } else {
            return res.status(403).send('Forbidden action')
        }
    } else {
        return res.status(401).send('unauthorized action')
    }
}

module.exports.publishArticle = (req, res) => {
    if (!isValidObjectId(req.params.id)) 
        return res.status(200).send('invalid id');

    if (res.locals.user) {

        if (res.locals.user.permissions.has('AUTHOR') || res.locals.user.permissions.has('ADMIN') || res.locals.user.permissions.has('DEV')) {
            try {
                articleModel.findByIdAndUpdate(
                    req.params.id, {
                        $set: {
                            isPublish: req.body.isPublish
                        }
                    }, (err, data) => {
                        if (!err) res.status(201).send(data)
                        else console.log(err);
                    })
            } catch (error) {
                console.log(error);
            }
        } else {
            return res.status(403).send('Forbidden action')
        }
    } else {
        return res.status(401).send('unauthorized action')
    }
}

module.exports.articleDelete = async (req, res) => {
    if (!isValidObjectId(req.params.id)) 
        return res.status(200).send('invalid id');


    if (res.locals.user) {

        if (res.locals.user.permissions.has('AUTHOR') || res.locals.user.permissions.has('ADMIN') || res.locals.user.permissions.has('DEV')) {
            try {
        
                const article = await articleModel.findOne({_id: req.params.id});
        
                if (article.isDelete) {
        
                    articleModel.findByIdAndRemove(req.params.id, (err, data) => {
                        if (err) console.log(err)
                        else res.status(200).send(data);
                    });
        
                } else {
                    articleModel.findByIdAndUpdate(req.params.id, {
                        $set: {isDelete: true}
                    }, (err, data) => {
                        if (err) console.log(err)
                        else res.status(201).send(data);   
                    })
                }
        
            } catch (error) {
                console.log(error);
            }
        } else {
            return res.status(403).send('Forbidden action')
        }
    } else {
        return res.status(401).send('unauthorized action')
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

module.exports.postComment = async(req, res) => {

    const {text} = req.body;
    
    try {
        
        console.log(req)

        if(res.locals.user) {
            articleModel.findByIdAndUpdate(
                req.params.id, {
                    $push: {
                        comments: {
                            commenterId: res.locals.user._id,
                            commenterUsername: res.locals.user.username,
                            commenterPic : res.locals.user.userpic,
                            text,
                            timestamp: new Date().getTime()
                        }
                    }
                }, {
                    new: true
                },
                (err, data) => {
                    if (err) console.log(err)
                    else res.status(200).send(data);
                }
            )
        } else {
            return res.status(401).send('unauthorized action')
        }
    
        return 

    } catch (error) {
        console.log(error);
    }

}

module.exports.editComment = (req, res) => {
    if (!isValidObjectId(req.params.id)) 
        return res.status(200).send('invalid id');

    const {commentId, commenterId, text} = req.body

    try {
        
        return articleModel.findById(
            req.params.id,
            (err, data) => {
                const thecomment = data.comments.find((comment) => {
                    return comment._id.equals(commentId);
                });

                if (!thecomment) return res.status(404).send('comment not found');
                thecomment.text = text;

                return data.save((err) => {
                    if (err) res.status(500).send(err);
                    else res.status(200).send(data);
                })
            }
        )

    } catch (error) {
        
    }


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