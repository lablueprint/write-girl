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
    type: [Object],
  },
  savedPepTalks: {
    required: false,
    type: [String],
  },
  savedWritingTips: {
    required: false,
    type: [String],
  },
  savedTraits: {
    required: false,
    type: [Object],
  },
  savedTripleFlips: {
    required: false,
    type: [Object],
  },
  savedPlots: {
    required: false,
    type: [Object],
  },
  savedSettings: {
    required: false,
    type: [Object],
  },
  savedItems: {
    required: false,
    type: [Object],
  },
  tripleFlipHistory: {
    required: false,
    type: [Object],
  },
});

module.exports = mongoose.model('User', userSchema);
