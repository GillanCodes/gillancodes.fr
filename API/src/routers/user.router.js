let router = require('express').Router()

//import
let authController = require('../controllers/auth.controller')
//let userController = require('../controllers/user.controller')

//auth
router.post('/register', authController.signup);
router.post('/login', authController.signin);

router.get('/logout', authController.logout);

//Info
// router.get('/', );
// router.get('/:id', );



module.exports = router;