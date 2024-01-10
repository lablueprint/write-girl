const Activity = require('../models/progressiveWritingModel');

/*
  createActivity
    Finds the exact genre in the database with the appropriate genre label and
    pushes the new activity's information into the activity array.
*/
const createActivity = async (req, res) => {
  const data = new Activity({ genre: req.body.genre, activity: req.body.activity });
  try {
    data.save();
    res.send(data);
  } catch (err) {
    console.error(err);
  }
};

/*
  getAllActivities
    Queries the MongoDB for all of the activities regardless of label.
*/
const getAllActivities = async (req, res) => {
  try {
    const data = await Activity.find({});
    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

/*
  getActivityGenre
    Queries and filters specifically for the objects with related genre title.
*/
const getActivityGenre = async (req, res) => {
  try {
    const data = await Activity.find({ genre: req.genre });
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
