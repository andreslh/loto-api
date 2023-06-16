const express = require('express');
const router = express.Router();

const { playsValidations, validate } = require('../validators');
const controller = require('../controllers/plays');

router.get('/', controller.get);
router.post('/', playsValidations(), validate, controller.post);
router.delete('/:id', controller.remove);

module.exports = router;
