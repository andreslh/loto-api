const express = require('express');
const router = express.Router();

const { clientsValidations, validate } = require('../validators');
const controller = require('../controllers/clients');

router.get('/', controller.get);
router.get('/seller/:id', controller.getBySeller);
router.get('/:id', controller.getById);
router.post('/', clientsValidations(), validate, controller.post);
router.put('/:id', clientsValidations(), validate, controller.put);
router.delete('/:id', controller.remove);

module.exports = router;
