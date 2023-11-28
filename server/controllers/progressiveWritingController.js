const Activity = require('../models/progressiveWritingModel');

// Example of creating a document in the database
const createActivity = async (req, res) => {
  const activity = new Activity(req.body);
  try {
    const data = await activity.save(activity);
    res.send(data);
  } catch (err) {
    console.error(err);
  }
};

const getAllActivities = async (req, res) => {
  try {
    const data = await Activity.find({});
    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

module.exports = {
  createActivity,
  getAllActivities,
};
