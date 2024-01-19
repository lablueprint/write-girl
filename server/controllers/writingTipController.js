const WritingTip = require('../models/writingTipModel');

// Create a writing tip
const createWritingTip = async (req, res) => {
  const writingTip = new WritingTip(req.body);
  try {
    const data = await writingTip.save(writingTip);
    res.send(data);
  } catch (err) {
    console.error(err);
  }
};

// Get writing tip
const getRandomWritingTip = async () => {
    // Generate a random index based on the count
    // Use aggregation to get a random document
    try {
      const randomWritingTip = await WritingTip.aggregate([
        { $sample: { size: 1 } }, // $sample stage to get a random document
      ]);
      // Extract the talk string from the random document
      const randomWritingTipMsg = randomWritingTip.length > 0 ? randomWritingTip[0].writingTip : null;
      if (randomWritingTipMsg === null) {
        console.log('No valid writing tip found');
        return 'No writing tips here!';
      }
      return randomWritingTipMsg;
    } catch (err) {
      console.error(err);
    }
}

module.exports = {
    createWritingTip,
    getRandomWritingTip,
};
