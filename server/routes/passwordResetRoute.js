const express = require('express');

const passwordResetRouter = express.Router();
const passwordResetController = require('../controllers/passwordResetController');

passwordResetRouter.post('/verifyEmail', passwordResetController.verifyEmail);
passwordResetRouter.post('/verifyCode', passwordResetController.verifyCode);
passwordResetRouter.post('/updatePassword', passwordResetController.updatePassword);

module.exports = passwordResetRouter;
