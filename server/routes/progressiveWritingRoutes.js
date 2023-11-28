const express = require('express');

const progressiveWritingRouter = express.Router();
const progressiveWritingController = require('../controllers/progressiveWritingController');

progressiveWritingRouter.post('/createActivity', progressiveWritingController.createActivity);

progressiveWritingRouter.get('/getAllActivities', progressiveWritingController.getAllActivities);

module.exports = progressiveWritingRouter;
