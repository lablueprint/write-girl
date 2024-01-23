const mongoose = require('mongoose');

const writingTipSchema = new mongoose.Schema({
  writingTip: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model('WritingTip', writingTipSchema);
