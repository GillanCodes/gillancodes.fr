let router = require('express').Router()

let adminController = require('../controllers/admin.controller.js')

router.get('/user/:id', adminController.seeUser);

module.exports = router