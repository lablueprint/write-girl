const Activity = require('../models/progressiveWritingModel');

// Example of creating a document in the database
const createActivity = async (req, res) => {
  const data = await Activity.findOne({ genre: req.body.genre });
  try {
    data.activity.push(req.body.activity);
    data.save();
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

const getActivityGenre = async (req, res) => {
  console.log(req.params);
  try {
    const data = await Activity.findOne({ genre: req.genre });
    console.log(data);
    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

module.exports = {
  createActivity,
  getAllActivities,
  getActivityGenre,
};
