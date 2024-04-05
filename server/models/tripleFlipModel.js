const mongoose = require('mongoose');

const imageSetSchema = new mongoose.Schema({
  images: [{
    type: String,
  }], // Array of image paths
});

const TripleFlip = mongoose.model('TripleFlip', imageSetSchema);

module.exports = TripleFlip;
