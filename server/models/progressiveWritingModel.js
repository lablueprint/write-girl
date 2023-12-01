const mongoose = require('mongoose');

// Example of a model schema to validate and structure documents
const progressiveWriting = new mongoose.Schema({
  activity: {
    required: true,
    type: [String],
  },
  genre: {
    required: true,
    type: String,
  },
});



module.exports = mongoose.model('Activity', progressiveWriting);
