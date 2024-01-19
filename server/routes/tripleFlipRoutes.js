const express = require('express');
const multer = require('multer');
const imageController = require('../controllers/imageAWSController');

const tripleFlipRouter = express.Router();
const upload = multer({ dest: 'uploads/' });

// Define the route for uploading an image set
tripleFlipRouter.post('/tripleFlipUpload', upload.array('images', 3), imageController.uploadTripleFlip);

module.exports = tripleFlipRouter;
