let mongoose = require('mongoose');

const gigsSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            require: true
        },
        description: {
            type: String,
            require: true
        },
        price: {
            type: String,
            required: true
        },
        requirements: {
            type: [String],
        },
        banner: {
            type: String
        }
    }
)

module.exports = mongoose.model('gigs', gigsSchema)