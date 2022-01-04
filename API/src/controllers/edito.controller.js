const { isValidObjectId } = require("mongoose");
const editoModel = require("../../models/edito.model");

module.exports.getEdito = async (req,res) => {
    
    const editos = await editoModel.find({isPublish: true});
    res.status(200).json(editos);
}

module.exports.getEditos = async (req,res) => {
    
    if (res.locals.user && res.locals.user.permissions.has('DEV') || res.locals.user && res.locals.user.permissions.has('ADMIN')) {
        const editos = await editoModel.find().sort({ createdAt: -1 });
        res.status(200).json(editos);
    } 
}

module.exports.newEdito = async (req,res) => {

    if (res.locals.user) {

        if (res.locals.user.permissions.has('ADMIN') || res.locals.user.permissions.has('DEV')) {
            const newEdito = new editoModel({
                title: req.body.title,
                body: req.body.edito,
                author: req.body.author
            });
        
            try {
                const edito = await newEdito.save();
                res.status(201).json(edito);
            } catch(err) {
                let errors = editoErrors(err);
                res.status(200).send({errors});
            }
        } else {
            return res.status(403).send('Forbidden action')
        }
    } else {
        return res.status(401).send('unauthorized action')
    }

}

module.exports.editEdito = (req,res) => {

    if (!isValidObjectId(req.params.id)) 
        return res.status(200).send('invalid id');

    if (res.locals.user) {

        if (res.locals.user.permissions.has('DEV') || res.locals.user.permissions.has('ADMIN')) {
            try {
                editoModel.findByIdAndUpdate(
                    req.params.id, {
                        $set: {
                            title : req.body.title,
                            body : req.body.edito,
                            isEdited: true,
                            isPublish: req.body.isPublish
                        }
                    }, (err, data) => {
                        if (!err) res.status(201).send(data)
                        else console.log(err);
                    })
            } catch (error) {
                console.log(error);
            }
        } else {
            return res.status(403).send('Forbidden action')
        }
    } else {
        return res.status(401).send('unauthorized action')
    }

}

module.exports.publishEdito = (req,res) => {

    if (!isValidObjectId(req.params.id)) 
        return res.status(200).send('invalid id');

    if (res.locals.user) {

        if (res.locals.user.permissions.has('DEV') || res.locals.user.permissions.has('ADMIN')) {
            try {
                editoModel.findByIdAndUpdate(
                    req.params.id, {
                        $set: {
                            isPublish: req.body.isPublish
                        }
                    }, (err, data) => {
                        if (!err) res.status(201).send(data)
                        else console.log(err);
                    })
            } catch (error) {
                console.log(error);
            }
        } else {
            return res.status(403).send('Forbidden action')
        }
    } else {
        return res.status(401).send('unauthorized action')
    }

}

module.exports.deleteEdito = (req,res) => {
    
    if (!isValidObjectId(req.params.id)) 
        return res.status(200).send('invalid id');

    if (res.locals.user) {

        if (res.locals.user.permissions.has('ADMIN') || res.locals.user.permissions.has('DEV')) {
            try {

                editoModel.findByIdAndRemove(req.params.id, (err, data) => {
                    if (err) console.log(err)
                    else res.status(200).send(data);
                });

            } catch (error) {
                console.log(error);
            }
        } else {
            return res.status(403).send('Forbidden action')
        }
    } else {
        return res.status(401).send('unauthorized action')
    }
}