const { Joi } = require('express-validation');

const getShipDataValidation = {
  query: Joi.object({
    limit: Joi.number().min(1),
    offset: Joi.number().min(0).max(100)
  }),
}

module.exports = {
    getShipDataValidation
};