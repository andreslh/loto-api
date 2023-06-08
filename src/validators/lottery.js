const { body } = require('express-validator');

const validations = () => {
  return [
    body('n1', 'N1 debe estar entre 00 y 99').isInt({ min: 0, max: 99 }),
    body('n2', 'N2 debe estar entre 00 y 99').isInt({ min: 0, max: 99 }),
    body('n3', 'N3 debe estar entre 00 y 99').isInt({ min: 0, max: 99 }),
    body('n4', 'N4 debe estar entre 00 y 99').isInt({ min: 0, max: 99 }),
    body('n5', 'N5 debe estar entre 00 y 99').isInt({ min: 0, max: 99 }),
    body('n6', 'N6 debe estar entre 00 y 99').isInt({ min: 0, max: 99 }),
    body('n7', 'N7 debe estar entre 00 y 99').isInt({ min: 0, max: 99 }),
    body('n8', 'N8 debe estar entre 00 y 99').isInt({ min: 0, max: 99 }),
    body('n9', 'N9 debe estar entre 00 y 99').isInt({ min: 0, max: 99 }),
    body('n10', 'N10 debe estar entre 00 y 99').isInt({ min: 0, max: 99 }),
    body('n11', 'N11 debe estar entre 00 y 99').isInt({ min: 0, max: 99 }),
    body('n12', 'N12 debe estar entre 00 y 99').isInt({ min: 0, max: 99 }),
    body('n13', 'N13 debe estar entre 00 y 99').isInt({ min: 0, max: 99 }),
    body('n14', 'N14 debe estar entre 00 y 99').isInt({ min: 0, max: 99 }),
    body('n15', 'N15 debe estar entre 00 y 99').isInt({ min: 0, max: 99 }),
    body('n16', 'N16 debe estar entre 00 y 99').isInt({ min: 0, max: 99 }),
    body('n17', 'N17 debe estar entre 00 y 99').isInt({ min: 0, max: 99 }),
    body('n18', 'N18 debe estar entre 00 y 99').isInt({ min: 0, max: 99 }),
    body('n19', 'N19 debe estar entre 00 y 99').isInt({ min: 0, max: 99 }),
    body('n20', 'N20 debe estar entre 00 y 99').isInt({ min: 0, max: 99 }),
  ];
};

module.exports = validations;
