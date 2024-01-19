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
  savedWritingTips: {
    required: true,
    type: Array,
  },
  savedTripleFlips: {
    required: true,
    type: Array,
  },
  savedTraits: {
    required: true,
    type: Array,
  },
  savedPlots: {
    required: true,
    type: Array,
  },
  savedSettings: {
    required: true,
    type: Array,
  },
  savedItems: {
    required: true,
    type: Array,
  },
});

module.exports = mongoose.model('User', userSchema);
