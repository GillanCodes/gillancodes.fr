let mongoose = require('mongoose');

const editoSchema = new mongoose.Schema(
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
        isPublish: {
            type: Boolean,
            default: false
        },
        isEdited: {
            type: Boolean,
            default: false
        }
    }, {
        timestamps: true
    }
)

module.exports = mongoose.model('edito', editoSchema)