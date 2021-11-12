let mongoose = require('mongoose');

const articleSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            maxlength: 255,
            minlength: 3
        },
        body: {
            type: String
        },
        author: {
            type: String
        },
        likers: {
            type: [String],
            default: []
        },
        comments: {
            type: [
                {
                    commenterId: String,
                    commenterPic: String,
                    commenterUsername: String,
                    text: String,
                    timestamp: Number
                }
            ]
        },
        isPublish: {
            type: Boolean,
            default: false
        },
        isEdited: {
            type: Boolean,
            default: false
        },
        isDelete: {
            type: Boolean,
            default:false
        }
    }
)

module.exports = mongoose.model('article', articleSchema)