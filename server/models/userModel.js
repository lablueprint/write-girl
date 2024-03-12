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
    required: false,
    type: [String],
  },
  savedPepTalks: {
    required: false,
    type: [String],
  },
  savedWritingTips: {
    required: false,
    type: [String],
  },
  savedTripleFlips: {
    required: false,
    type: [Object],
  },
  savedTraits: {
    required: false,
    type: [String],
  },
  savedPlots: {
    required: false,
    type: [String],
  },
  savedSettings: {
    required: false,
    type: [String],
  },
  savedItems: {
    required: false,
    type: [String],
  },
  tripleFlipHistory: {
    required: false,
    type: [Object],
  },
});

module.exports = mongoose.model('User', userSchema);
