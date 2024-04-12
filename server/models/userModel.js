const mongoose = require('mongoose');

const tripleFlipsSchema = new mongoose.Schema({
  savedTripleFlips: {
    required: false,
    type: [Object],
  },
});

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
  savedTraits: {
    required: false,
    type: [String],
  },
  savedTripleFlips: {
    required: false,
    type: [tripleFlipsSchema],
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
