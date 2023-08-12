const express = require('express');
const auth = require('../services/authService');
const shipController = require('../controllers/shipController');

const router = express.Router();

router
  .route('/')
  .get(auth.validateToken, shipController.getAll);

router
  .route('/:id')
  .put(auth.validateToken, shipController.update);

module.exports = router;