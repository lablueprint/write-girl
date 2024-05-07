const Activity = require('../models/progressiveWritingModel');

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

const getActivityByID = async (req, res) => {
  try {
    const data = await Activity.findOne({ _id: req.params.id });
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getAllActivities,
  getActivityByID,
};
