const Trait = require('../../models/storyStarter/characterTraitModel');

// Example of creating a document in the database
const createCharacterTrait = async (req, res) => {
  const trait = new Trait(req.body);
  try {
    const data = await trait.save(trait);
    res.send(data);
  } catch (err) {
    console.error(err);
  }
};

const getRandomCharacterTrait = async () => {
  // Generate a random index based on the count
  // Use aggregation to get a random document
  try {
    const randomTrait = await Trait.aggregate([
      { $sample: { size: 1 } }, // $sample stage to get a random document
    ]);
      // Extract the talk string from the random document
    const extractedRandomTrait = randomTrait.length > 0 ? randomTrait[0].trait : null;
    if (extractedRandomTrait === null) {
      console.error('No valid trait found');
      return 'No traits here!';
    }
    return extractedRandomTrait;
  } catch (err) {
    console.error(err);
    // Handle the error appropriately
    throw err;
  }
};

module.exports = {
  createCharacterTrait,
  getRandomCharacterTrait,
};
