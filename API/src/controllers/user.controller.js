const { isValidObjectId } = require('mongoose');
let userModel = require('../../models/user.model');

module.exports.getAllUsers = async(req, res) => {

    const users = await userModel.find().select('-password -email -permissions -_id');
    res.status(200).json(users);

}


module.exports.getUser = (req, res) => {

    if (!isValidObjectId(req.params.id)) 
        return res.status(200).send('invalid id');

    
    if (res.locals.user) {

        if (res.locals.user._id.toString() === req.params.id) {
            
            if (res.locals.user.permissions.includes('ADMIN') || res.locals.user.permissions.includes('MOD') ) {
                return userModel.findById(req.params.id, (err, user) =>{ //Connected and Admin Or Mod user (own page)
                    if (err) throw err;
                    else res.status(200).send({user});
                }).select('-password')
            } else {
                return userModel.findById(req.params.id, (err, user) =>{ // Just Connected user (own page)
                    if (err) throw err;
                    else res.status(200).send({user});
                }).select('-permissions -password');
            }
        } else {
            userModel.findById(req.params.id, (err, user) =>{   // Connected User (not own page)
                if (err) throw err;
                else res.status(200).send({user});
            }).select('-password -permissions -email');
        }  
         
        if (res.locals.user.permissions.includes('ADMIN') || res.locals.user.permissions.includes('MOD')) {
            return userModel.findById(req.params.id, (err, user) =>{ //Admin or mod user (not own page)
                if (err) throw err;
                else res.status(200).send({user});
            }).select('-password');
        }
    } else {
        userModel.findById(req.params.id, (err, user) =>{ //Not connected user (not own page)
            if (err) throw err;
            else res.status(200).send({user});
        }).select('-password -permissions -email');
    }
}