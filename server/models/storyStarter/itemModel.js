const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  item: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model('item', itemSchema);
