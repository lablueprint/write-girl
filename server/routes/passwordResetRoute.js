const express = require('express');

const passwordResetRouter = express.Router();
const passwordResetController = require('../controllers/passwordResetController');

passwordResetRouter.post('/verifyEmail', passwordResetController.verifyEmail);

module.exports = passwordResetRouter;
