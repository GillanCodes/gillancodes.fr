let mongoose = require('mongoose');
let {isEmail} = require('validator');
let bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 5,
            maxlength: 55,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            validate: [isEmail],
            lowercase: true,
        },
        password: {
            type: String, 
            required: true,
            maxlength: 1024,
            minlength: 8
        },
        permissions: {
            type: Map,
            of: Boolean,
            default: {"member" : true}
        },
        userpic: {
            type:String,
            default: './uploads/profil/default-user-pic.png'
        },
        bio: {
            type:String,
            maxlength: 1024
        },
        links: {
            type: Map,
            of: String,
        },
        followers: {
            type: [String],
        },
        following: {
            type: [String]
        },
        likes: {
            type: [String]
        }
    }
);


userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.statics.login = async function(username, password) {
    const user = await this.findOne({username});
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        } else {
            throw Error('incorrect password')
        }
    } else {
        throw Error('incorrect username')
    }
};

module.exports = mongoose.model('user', userSchema)