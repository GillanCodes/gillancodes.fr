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
        isEdited: {
            type: Boolean,
            default: false
        }
    }
)

module.exports = mongoose.model('article', articleSchema)