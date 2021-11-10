let router = require('express').Router()

//import
let authController = require('../controllers/auth.controller')
let userController = require('../controllers/user.controller')

let multer = require('multer');
const upload = multer();

//auth
router.post('/register', authController.signup);
router.post('/login', authController.signin);

router.get('/logout', authController.logout);

//user
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUser);

router.post('/upload/picture', upload.single('file') ,userController.uploadUserPic);

router.put('/:id', userController.updateUser);
router.put('/:id/email', userController.updateEmail);
router.put('/:id/permissions', userController.updatePermissions);

router.delete('/delete/:id', userController.deleteUser);



module.exports = router;