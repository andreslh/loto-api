const express = require('express');
const router = express.Router();

const controller = require('../controllers/admin');

router.get('/:role', controller.getByRole);
router.post('/', controller.signup);
router.delete('/:id', controller.remove);
router.put('/reset-password/', controller.resetPassword);

module.exports = router;