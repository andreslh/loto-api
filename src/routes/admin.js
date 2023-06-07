const express = require('express');
const router = express.Router();

const controller = require('../controllers/admin');

router.get('/:role', controller.getByRole);
router.post('/', controller.signup);
router.put('/:id', controller.edit);
router.delete('/:id', controller.remove);

module.exports = router;