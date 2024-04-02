const mongoose = require('mongoose');

// Model schema for progressive writing activities to validate and structure documents
const progressiveWriting = new mongoose.Schema({
  activity: {
    required: true,
    type: [String],
  },
  genre: {
    required: true,
    type: String,
  },
  month: {
    required: true,
    type: Number,
  },
});

module.exports = mongoose.model('Activity', progressiveWriting);
