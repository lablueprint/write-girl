const express = require('express');
const imageAWSController = require('../controllers/imageAWSController');

const tripleFlipRouter = express.Router();

// upload set of 3 images to AWS S3 and MongoDB
tripleFlipRouter.post('/tripleFlipUpload', imageAWSController.uploadTripleFlip);
// Gets an array of 3 images in base64 encoded format
tripleFlipRouter.get('/GetTripleFlip', imageAWSController.getImage);

module.exports = tripleFlipRouter;
