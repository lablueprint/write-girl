const mongoose = require('mongoose');

const plotPointSchema = new mongoose.Schema({
  plotPoint: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model('plotPoint', plotPointSchema);
