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

module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.gillancodes_user; // On recup le token
    if (token) {
        jwt.verify(token, process.env.TOKEN, async (err, decodedToken) => { // on essaye de le decoder
            if (err) { //Si on y arrive pas
                console.log(err);
            } else { // sinon
                console.log(decodedToken.id);
                next();
            }
        });
    } else {
        console.log("no token")
    }
}

module.exports.home = (req, res) => {
    res.status(200).send();
}