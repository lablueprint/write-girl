const mongoose = require('mongoose');

// Mind and Body Moments schema to validate and structure documents
const mindBodySchema = new mongoose.Schema({
  activity: {
    required: true,
    type: String,
  },
  duration: {
    required: true,
    type: Number,
  },
});

module.exports = mongoose.model('MindBody', mindBodySchema);
