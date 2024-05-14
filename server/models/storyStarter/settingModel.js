const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
  setting: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model('setting', settingSchema);
