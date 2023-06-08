const express = require('express');
const router = express.Router();

const { lotteryValidations, validate } = require('../validators');
const controller = require('../controllers/lottery');

router.get('/', controller.get);
router.get('/:id', controller.getById);
router.post('/', lotteryValidations(), validate, controller.post);
router.put('/:id', lotteryValidations(), validate, controller.put);
router.delete('/:id', controller.remove);

module.exports = router;
