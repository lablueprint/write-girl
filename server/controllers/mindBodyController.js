const MindBody = require('../models/mindBodyModel');

// Creating a mindBody document in the database
const createMoment = async (req, res) => {
  const test = new MindBody(req.body);
  try {
    const data = await test.save(test);
    res.send(data);
  } catch (err) {
    console.error(err);
  }
};

// Retrieve a random mindBody document from the collection
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
      console.log('No valid Mind and Body Moment found');
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

// Retrieve 5 random mindBody documents from the collection
const getFiveRandomMoments = async (req, res) => {
  try {
    // Use aggregation to get 5 random documents from the collection
    const randomMindBodies = await MindBody.aggregate([
      // Change the number below to change number of cards generated
      {
        $match: {
          $and: [
            { duration: { $gt: Number(req.query.low), $lt: Number(req.query.high) } },
            { type: req.query.type },
          ],
        },
      },
      { $sample: { size: 5 } }, // $sample stage to get 5 random documents
    ]);

    // Extract the moment string from each random document
    const randomMoments = randomMindBodies.map((mindBody) => ({
      activity: mindBody.activity || null,
      duration: mindBody.duration || null,
      type: mindBody.type || null,
    }));

    // Check for valid moments
    randomMoments.forEach((randomMoment, index) => {
      if (randomMoment.activity === null || randomMoment.activity === undefined) {
        console.log(`No valid Mind and Body Moment found at index ${index}`);
      }
      if (randomMoment.duration === null || randomMoment.duration === undefined) {
        console.log(`No valid Mind and Body Moment Duration found at index ${index}`);
      }
    });

    res.send(randomMoments);
  } catch (err) {
    console.error(err);
    // Handle the error appropriately
    throw err;
  }
};

module.exports = {
  createMoment,
  getRandomMoment,
  getFiveRandomMoments,
};
