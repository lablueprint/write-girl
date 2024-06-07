const PocketPrompt = require('../models/pocketPromptModel');

const createPocketPrompt = async (req, res) => {
  const test = new PocketPrompt(req.body);
  try {
    const data = await test.save(test);
    res.send(data);
  } catch (err) {
    console.error(err);
  }
};

const getRandomPocketPrompt = async () => {
  // Generate a random index based on the count
  // Use aggregation to get a random document
  try {
    const randomPocketPrompt = await PocketPrompt.aggregate([
      { $sample: { size: 1 } }, // $sample stage to get a random document
    ]);
    // Extract the talk string from the random document
    const randomPocketPromptName = randomPocketPrompt.length > 0 ? randomPocketPrompt[0].talk : null;
    if (randomPocketPromptName === null) {
      console.log('No valid pep talk found');
      return 'No pep talks here!';
    }
    return randomPocketPromptName;
  } catch (err) {
    console.error(err);
    // Handle the error appropriately
    throw err;
  }
};
module.exports = {
  createPocketPrompt,
  getRandomPocketPrompt,
};
