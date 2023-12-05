const express = require('express');

// Initialization of router and import of corresponding endpoint functions.
const progressiveWritingRouter = express.Router();
const progressiveWritingController = require('../controllers/progressiveWritingController');

// Generate all the routes necessary for endpoints connecting front-end to database.
progressiveWritingRouter.post('/createActivity', progressiveWritingController.createActivity);
progressiveWritingRouter.get('/getAllActivities', progressiveWritingController.getAllActivities);
progressiveWritingRouter.get('/getActivityGenre', progressiveWritingController.getActivityGenre);

module.exports = progressiveWritingRouter;
