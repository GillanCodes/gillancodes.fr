let router = require('express').Router()

//import
let authController = require('../controllers/auth.controller')
let userController = require('../controllers/user.controller')

//auth
router.post('/register', authController.signup);
router.post('/login', authController.signin);

router.get('/logout', authController.logout);

//user
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUser);



module.exports = router;