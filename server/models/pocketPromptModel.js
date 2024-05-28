const mongoose = require('mongoose');

const pocketPromptSchema = new mongoose.Schema({
  talk: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model('PocketPrompt', pocketPromptSchema);
