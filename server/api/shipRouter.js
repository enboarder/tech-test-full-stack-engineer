const express = require('express');
const auth = require('../services/authService');
const shipController = require('../controllers/shipController');
const { validate, Joi } = require('express-validation');
const validateService = require('../services/validateService');
const cacheService = require('../services/cacheService');

const router = express.Router();

router
  .route('/')
  .get(auth.validateToken, validate(validateService.getShipDataValidation), cacheService.cacheData, shipController.getAll);

router
  .route('/:id')
  .put(auth.validateToken, shipController.update);

module.exports = router;