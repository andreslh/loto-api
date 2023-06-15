const { body } = require('express-validator');

const validations = () => {
  return [
    body('n1', 'N1 debe estar entre 00 y 99').isInt({ min: 0, max: 99 }),
    body('n2', 'N2 debe estar entre 00 y 99').isInt({ min: 0, max: 99 }),
    body('n3', 'N3 debe estar entre 00 y 99').isInt({ min: 0, max: 99 }),
    body('n4', 'N4 debe estar entre 00 y 99').isInt({ min: 0, max: 99 }),
  ];
};

module.exports = validations;
