const mongoose = require('mongoose');

const pepTalkSchema = new mongoose.Schema({
  talk: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model('PepTalk', pepTalkSchema);
