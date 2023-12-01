const MindBody = require('../models/mindBodyModel');

// Example of creating a document in the database
const createMoment = async (req, res) => {
  const test = new MindBody(req.body);
  try {
    const data = await test.save(test);
    res.send(data);
  } catch (err) {
    console.error(err);
  }
};

const getRandomMoment = async (req, res) => {
  try {
    // Generate a random index based on the count
    // Use aggregation to get a random document from the collection
    const randomMindBody = await MindBody.aggregate([
      { $sample: { size: 1 } }, // $sample stage to get a random document
    ]);
    // Extract the moment string from the random document
    const randomMindBodyActivity = randomMindBody.length > 0 ? randomMindBody[0].activity : null;
    const randomMindBodyDuration = randomMindBody.length > 0 ? randomMindBody[0].duration : null;
    if (randomMindBodyActivity === null || randomMindBodyActivity === undefined) {
      console.log('No valid Mind and Body Moment  found');
    }
    if (randomMindBodyDuration === null || randomMindBodyDuration === undefined) {
      console.log('No valid Mind and Body Moment Duration found');
    }
    res.send(randomMindBody[0]);
  } catch (err) {
    console.error(err);
    // Handle the error appropriately
    throw err;
  }
};

module.exports = {
  createMoment,
  getRandomMoment,
};
