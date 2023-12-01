const express = require('express');

const progressiveWritingRouter = express.Router();
const progressiveWritingController = require('../controllers/progressiveWritingController');

progressiveWritingRouter.post('/createActivity', progressiveWritingController.createActivity);

progressiveWritingRouter.get('/getAllActivities', progressiveWritingController.getAllActivities);

progressiveWritingRouter.get('/getActivityGenre', progressiveWritingController.getActivityGenre);

module.exports = progressiveWritingRouter;
