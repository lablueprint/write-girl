const PlotPoint = require('../../models/storyStarter/plotPointModel');

// Example of creating a document in the database
const createPlotPoint = async (req, res) => {
  const point = new PlotPoint(req.body);
  try {
    const data = await point.save(point);
    res.send(data);
  } catch (err) {
    console.error(err);
  }
};

const getRandomPlotPoint = async () => {
  // Generate a random index based on the count
  // Use aggregation to get a random document
  try {
    const randomPoint = await PlotPoint.aggregate([
      { $sample: { size: 1 } }, // $sample stage to get a random document
    ]);
      // Extract the talk string from the random document
    const extractedRandomPoint = randomPoint.length > 0 ? randomPoint[0] : null;
    if (extractedRandomPoint === null) {
      console.log('No valid plot point found');
      return 'No plot points here!';
    }
    return extractedRandomPoint;
  } catch (err) {
    console.error(err);
    // Handle the error appropriately
    throw err;
  }
};

module.exports = {
  getRandomPlotPoint,
  createPlotPoint,
};
