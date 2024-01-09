const express = require('express');

const mindBodyRouter = express.Router();
const mindBodyController = require('../controllers/mindBodyController');

mindBodyRouter.post('/create', mindBodyController.createMoment);
mindBodyRouter.get('/getRandom', mindBodyController.getRandomMoment);

module.exports = mindBodyRouter;
