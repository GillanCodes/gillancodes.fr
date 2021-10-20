let userModel = require("../models/user.model");
let jwt = require('jsonwebtoken');

module.exports.checkUser = async(req, res, next) => {

    const token = req.cookies.gillancodes_user;
    if (token) {
        jwt.verify(token, process.env.TOKEN, async (err, decodedToken) => {
            if(err) {
                res.locals.user = null;
                next();
            } else {
                let user = await userModel.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        });

    } else {
        res.locals.user = null;
        next();
    }

}

module.exports.home = (req, res) => {
    res.status(200).send();
}