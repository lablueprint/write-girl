const mongoose = require('mongoose');

// Model schema to validate and structure user info
const userSchema = new mongoose.Schema({
  email: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  savedActivities: {
    required: true,
    type: Array,
  },
  savedPepTalks: {
    required: true,
    type: Array,
  },
  savedTripleFlip: {
    required: true,
    type: Array,
  },
  savedTrait: {
    required: true,
    type: Array,
  },
  savedPlot: {
    required: true,
    type: Array,
  },
  savedSetting: {
    required: true,
    type: Array,
  },
  savedItem: {
    required: true,
    type: Array,
  },
});

module.exports = mongoose.model('User', userSchema);
