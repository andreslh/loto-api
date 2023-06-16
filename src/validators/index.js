const { validationResult } = require('express-validator');

const clientsValidations = require('./clients');
const lotteryValidations = require('./lottery');
const playsValidations = require('./plays');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  clientsValidations,
  lotteryValidations,
  playsValidations,
  validate,
};
