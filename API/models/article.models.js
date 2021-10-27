let mongoose = require('mongoose');

const articleSchema = new mongoose.Schema(
    {
        "title": {
            type: STRING,
            maxlength: 255,
            minlength: 3
        },
        body {
            type: 
        },
    }
)

module.exports = mongoose.model('article', articleSchema)