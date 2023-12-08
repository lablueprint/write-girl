const mongoose = require('mongoose');

const characterTraitSchema = new mongoose.Schema({
  trait: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model('characterTrait', characterTraitSchema);
