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

// Get activity of the month
const getMonthActivity = async (req, res) => {
  try {
    const monthActivity = await Activity.aggregate([
      {
        $match: {
          month: Number(req.query.month),
        },
      },
    ]);
    console.log(monthActivity);
    res.send(monthActivity);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

module.exports = {
  getAllActivities,
  getMonthActivity,
};
