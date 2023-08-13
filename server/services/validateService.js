const { Joi } = require('express-validation');

const getShipDataValidation = {
  query: Joi.object({
    limit: Joi.number().min(1),
    offset: Joi.number().min(0).max(100),
    shipType: Joi.string(),
    weight: Joi.number(),
    homePort: Joi.string()
  }),
}

const putShipDataValidation = {
  body: Joi.object({
    icon: Joi.string()
  }),
}

module.exports = {
    getShipDataValidation,
    putShipDataValidation
};