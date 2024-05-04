const express = require('express');

const router = express.Router();

const validationCheck = require('../middelware/validation');

const authController = require('../controllers/auth');

router.post('/auth/register', validationCheck.signUpValidation, authController.registerUser);

router.post('/auth/login', authController.loginUser);

module.exports = router;