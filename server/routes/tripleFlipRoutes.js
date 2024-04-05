const express = require('express');
const imageAWSController = require('../controllers/imageAWSController');

const tripleFlipRouter = express.Router();

// Define the route for uploading an image set
tripleFlipRouter.post('/tripleFlipUpload', imageAWSController.uploadTripleFlip);

tripleFlipRouter.get('/GetTripleFlip', imageAWSController.getImage);

module.exports = tripleFlipRouter;
