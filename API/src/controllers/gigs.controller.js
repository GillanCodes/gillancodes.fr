const { isValidObjectId } = require('mongoose');
let gigsModel = require('../../models/gigs.model');


module.exports.getAll = (req, res) => {

    gigsModel.find((err, docs) => {
        if (err) throw err;
        res.status(201).send(docs)
    }).select("-_id")

}

module.exports.getOne = (req, res) => {

    var id = req.params.id;

    if (!isValidObjectId(req.params.id)) // on verifie que l'id est un id valide
        return res.status(400).send('Unknown ID : ' + req.params.id) //sinon on err

    gigsModel.findById(id, (err, docs) => {
        if (err) throw err;
        res.status(201).send(docs)
    }).select("-_id")

}

module.exports.integration = (req, res) => {

    gigsModel.find((err, docs) => {
        if (err) throw err;
        res.status(201).render('cards', {cards:docs})
    }).select("-_id")

}

module.exports.postOne = async (req, res) => {

    if (res.locals.user) {
        
        for (i=0; i < res.locals.user.permissions.length; i++){

            console.log(res.locals.user.permissions[i]);

            if (res.locals.user.permissions[i] === "ADMIN") {
                
                const props = req.body;

                const newGigs = new gigsModel({
                    title: props.title,
                    description: props.desc,
                    price: props.price,
                    requirements: props.requirements,
                    banner: props.banner,
                });

                try {
                    const gigs = await newGigs.save();
                    return res.status(201).json(gigs);
                } catch (err) {
                    return res.status(201).send(err);
                }
            }             
        }
        return res.status(401).send('Unauthorized Action');
        
    } else {
        return res.status(403).send('Forbidden Action');
    }

}