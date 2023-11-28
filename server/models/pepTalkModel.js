const mongoose = require('mongoose');

// Example of a model schema to validate and structure documents
const pepTalkSchema = new mongoose.Schema({
  talk: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model('PepTalk', pepTalkSchema);
