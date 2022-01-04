let router = require('express').Router();

let editoController = require('../controllers/edito.controller');

router.get('/', editoController.getEdito);
router.get('/history', editoController.getEditos);

router.post('/post', editoController.newEdito);

router.put('/:id/edit', editoController.editEdito);
router.put('/:id/publish', editoController.publishEdito);

router.delete('/:id/delete', editoController.deleteEdito)

module.exports = router;