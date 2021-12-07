let userModel = require('../../models/user.model');
let jwt = require('jsonwebtoken');
const { loginUserErrors, registerUserErrors } = require('../../utils/error.utils');

const maxAge = 3*21*60*60*1000;
    
const createToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN, {
        expiresIn: maxAge   
        });
}

module.exports.signup = async(req,res) => {

    const {username, email, password} = req.body;

    try {
        const user = await userModel.create({username, email, password});
        res.status(201).json({user:user._id});
    } catch (error) {
        let errors = registerUserErrors(error);
        res.status(200).send({errors});
    }

}

module.exports.signin = async(req,res) => {
    const {username, password} = req.body;

    try {
        const user = await userModel.login(username, password);
        const token = createToken(user._id);
        res.cookie('gillancodes_user', token, {httpOnly: true, maxAge, sameSite:"none"});
        res.status(201).json({user:user.username});
    } catch (error) {
        const errors = loginUserErrors(error);
        res.status(200).send({errors});
    }

}

module.exports.logout = (req,res) => {
    res.cookie('gillancodes_user', '',{httpOnly: true, maxAge: 1});
    res.redirect('/');
}