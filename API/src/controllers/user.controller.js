const { isValidObjectId } = require('mongoose');
let userModel = require('../../models/user.model');
const { uploadUserPicErrors } = require('../../utils/error.utils');

let fs = require('fs');

let bcrypt = require('bcrypt');

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
                    else res.status(200).send(user);
                }).select('-password')
            } else {
                return userModel.findById(req.params.id, (err, user) =>{ // Just Connected user (own page)
                    if (err) throw err;
                    else res.status(200).send(user);
                }).select('-password');
            }
        } else {
            userModel.findById(req.params.id, (err, user) =>{   // Connected User (not own page)
                if (err) throw err;
                else res.status(200).send(user);
            }).select('-password -email');
        }  
         
        if (res.locals.user.permissions.includes('ADMIN') || res.locals.user.permissions.includes('MOD')) {
            return userModel.findById(req.params.id, (err, user) =>{ //Admin or mod user (not own page)
                if (err) throw err;
                else res.status(200).send(user);
            }).select('-password');
        }
    } else {
        userModel.findById(req.params.id, (err, user) =>{ //Not connected user (not own page)
            if (err) throw err;
            else res.status(200).send(user);
        }).select('-password -email');
    }
}

module.exports.updateUser = (req, res) => {
    
    if (!isValidObjectId(req.params.id)) 
        return res.status(200).send('invalid id');

    try {
        
        if (req.params.id === res.locals.user._id.toString() || res.locals.user.permissions.admin === true || res.locals.user.permissions.mod === true) {

            const updatedRecord = {
                bio: req.body.bio,
                links: req.body.links
            }

            userModel.findByIdAndUpdate(
                req.params.id, {
                    $set : updatedRecord
                }, {
                    new: true
                },
                (err, data) => {
                    if (err) throw Error(error)
                    else return res.status(202).send(data)
                }
            )
         } else {
            throw Error('unauthorized action');
         }

    } catch (error) {
        return res.status(200).send(error);
    }
}

module.exports.updateEmail = async (req, res) => {

    const {newEmail ,password} = req.body;

    if (!isValidObjectId(req.params.id)) 
        return res.status(200).send('invalid id');

    if (!res.locals.user || res.locals.user._id.toString() !== req.params.id){
        return res.status(403).send('unauthorized action')
    } else {
        
        if (newEmail && password) {

            const user = await userModel.findOne({_id: req.params.id});
            if (user) {
                if (user.email !== newEmail) {
                    const auth = await bcrypt.compare(password, user.password)
                    if (auth) {
                        const updatedRecord = {
                            email: newEmail
                        }
                        
                        userModel.findByIdAndUpdate(
                            req.params.id, {
                                $set: updatedRecord
                            }, {
                                new:true
                            },
                            (err, data) => {
                                if (err) throw err;
                                else res.status(201).send(data);
                            }
                        )
                    } else {
                        res.status(200).send('incorrect pass');
                    }
                } else {
                    res.status(200).send('Same Email');
                }
            } else {
                res.status(200).send('unknown user')
            }

        } else {
            res.status(200).send('empty field')
        }
    }
}

module.exports.uploadUserPic = (req, res) => {
    
    if (res.locals.user) {

        if (res.locals.user._id.toString() === req.body.userId || res.locals.user.permissions.includes('ADMIN') || res.locals.user.permissions.includes('MOD') && res.locals.user.permissions.includes('UPDATE')) {

            try {
                if (req.file.mimetype !== "image/jpg" && req.file.mimetype !== "image/png" && req.file.mimetype !== "image/jpeg") throw Error('invalid_type');
                if (req.file.size > 500000) throw Error('max_size'); //Taille en KO
            } catch (error) {
                const errors = uploadUserPicErrors(error);
                return res.status(201).json({errors})
            }

            const fileName = req.body.username + ".jpg"

            fs.writeFile(`${__dirname}/../../../client/public/uploads/profil/${fileName}`, req.file.buffer, (err) =>{
                if (err) throw err;
            });
        
            try {
                userModel.findByIdAndUpdate(
                    req.body.userId,
                    {$set: {userpic: "./uploads/profil/" + fileName}},
                    {new: true, upsert: true, setDefaultsOnInsert: true},
                    (err, data) => {
                        if (err) throw Error(err);
                        else return res.send(data);
                    }
                )
            } catch(error) {
                res.status(200).send(error);
            }
        } else {
            return res.status(401).send('unauthorized action')
        }

    } else {
        return res.status(403).send('forbidden action')
    }    
    
}


module.exports.deleteUser = (req, res) => {

    if (!isValidObjectId(req.params.id)) 
        return res.status(200).send('invalid id');

    if (res.locals.user) {

        if (res.locals.user._id.toString() === req.params.id) {
            userModel.findByIdAndDelete(req.params.id, (err, data) => {
                if (err) throw err;
                else return res.send(data)
            });

        } else {
            if (res.locals.user.permissions.includes('ADMIN') || res.locals.user.permissions.includes('MOD')) {

                userModel.findByIdAndDelete(req.params.id, (err, data) => {
                    if (err) throw err;
                    else return res.send(data)
                });

            } else {
                return res.status(401).send('Unauthorized action')
            }
        }
    } else {
        return res.status(401).send('Unauthorized action')
    }

}