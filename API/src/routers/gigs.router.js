let router = require("express").Router()

//import
let gigsController = require('../controllers/gigs.controller');

router.get('/', gigsController.getAll);
router.get('/integration', gigsController.integration);
router.get('/:id', gigsController.getOne);


router.post('/post', gigsController.postOne);


module.exports = router;