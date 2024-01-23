const PepTalk = require('../models/pepTalkModel');

const createPepTalk = async (req, res) => {
  const test = new PepTalk(req.body);
  try {
    const data = await test.save(test);
    res.send(data);
  } catch (err) {
    console.error(err);
  }
};

const getRandomPepTalk = async () => {
  // Generate a random index based on the count
  // Use aggregation to get a random document
  try {
    const randomPepTalk = await PepTalk.aggregate([
      { $sample: { size: 1 } }, // $sample stage to get a random document
    ]);
    // Extract the talk string from the random document
    const randomPepTalkName = randomPepTalk.length > 0 ? randomPepTalk[0].talk : null;
    if (randomPepTalkName === null) {
      console.log('No valid pep talk found');
      return 'No pep talks here!';
    }
    return randomPepTalkName;
  } catch (err) {
    console.error(err);
    // Handle the error appropriately
    // throw err;
  }
};
module.exports = {
  createPepTalk,
  getRandomPepTalk,
};
