let mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
    {
        articleId: {
            type: String,
            require: true
        },
        posterId : {
             type: String,
             require: true
        },
        comment: {
            type:String,
            minlength: 3,
            maxlength: 255
        },
        likers: {
            type: [String],
            default : []
        }
    }
);

module.exports = mongoose.model('comment', commentSchema)