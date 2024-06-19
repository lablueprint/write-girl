const User = require('../models/userModel');

const createUser = async (req, res) => {
  const user = new User(req.body);
  try {
    const data = await user.save(user);
    res.send(data);
  } catch (err) {
    console.error(err);
  }
};

const updateUser = async (req, res) => {
  try {
    const data = await User.findByIdAndUpdate(req.params.id, req.body);
    res.json(data);
  } catch (err) {
    console.error(err);
  }
};

// Send [activityID]
const addSavedActivities = async (req, res) => {
  try {
    const data = await User.updateOne(
      { _id: req.params.userId, 'savedActivities.activityID': { $ne: req.body.activityID } },
      { $push: { savedActivities: req.body } },
    );
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};

// Send [pepTalkID]
const addSavedPepTalks = async (req, res) => {
  try {
    const data = await User.updateOne(
      { _id: req.params.userId },
      { $push: { savedPepTalks: req.body } },
    );
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};

// Send [writingTipID]
const addSavedWritingTips = async (req, res) => {
  try {
    const data = await User.updateOne(
      { _id: req.params.userId },
      { $push: { savedWritingTips: req.body.objectID } },
    );
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};

// Send [tripleFlipID]
const addSavedTripleFlips = async (req, res) => {
  try {
    const data = await User.updateOne(
      { _id: req.params.userId, 'savedTripleFlips.flipID': { $ne: req.body.flipID } },
      { $push: { savedTripleFlips: req.body } },
    );
    res.send(data);
  } catch (err) {
    console.log(err);
  }
};

const addTripleFlipHistory = async (req, res) => {
  const history = await User.findOne(
    { _id: req.params.userId },
    {
      _id: 0,
      tripleFlipHistory: 1,
    },
  );
  let data = null;
  try {
    if (history.tripleFlipHistory.length >= 5) {
      await User.updateOne(
        { _id: req.params.userId },
        { $pop: { tripleFlipHistory: -1 } },
      );

      data = await User.updateOne(
        { _id: req.params.userId },
        { $push: { tripleFlipHistory: req.body } },
      );
    } else {
      data = await User.updateOne(
        { _id: req.params.userId },
        { $push: { tripleFlipHistory: req.body } },
      );
    }
    res.send(data);
  } catch (err) {
    console.log(err);
  }
};

const getTripleFlipHistory = async (req, res) => {
  try {
    const data = await User.findOne({ _id: req.params.userId }, 'tripleFlipHistory -_id');
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};

// Send [traitsID]
const addSavedTraits = async (req, res) => {
  try {
    const data = await User.updateOne(
      { _id: req.params.userId, 'savedTraits.traitID': { $ne: req.body.traitID } },
      { $push: { savedTraits: req.body } },
    );
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};

// Send [plotID]
const addSavedPlots = async (req, res) => {
  try {
    const data = await User.updateOne(
      { _id: req.params.userId, 'savedPlots.plotID': { $ne: req.body.plotID } },
      { $push: { savedPlots: req.body } },
    );
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};

// Send [settingID]
const addSavedSettings = async (req, res) => {
  try {
    const data = await User.updateOne(
      { _id: req.params.userId, 'savedSettings.settingID': { $ne: req.body.settingID } },
      { $push: { savedSettings: req.body } },
    );
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};

// Send [itemID]
const addSavedItems = async (req, res) => {
  try {
    // console.log(req.body.objectID);
    const data = await User.updateOne(
      { _id: req.params.userId, 'savedItems.objectID': { $ne: req.body.objectID } },
      { $push: { savedItems: req.body } },
    );
    // console.log(data);
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).send('Error processing your request');
  }
};

const checkIfSavedItem = async (req, res) => {
  try {
    const data = await User.findOne(
      { _id: req.params.userId, 'savedItems.objectID': req.params.value },
    );
    const exists = data !== null;
    res.json(exists);
  } catch (err) {
    console.log(err);
  }
};

const checkIfSavedSetting = async (req, res) => {
  try {
    const data = await User.findOne(
      { _id: req.params.userId, 'savedSettings.settingID': req.params.value },
    );
    const exists = data !== null;
    res.json(exists);
  } catch (err) {
    console.log(err);
  }
};

const checkIfSavedPlot = async (req, res) => {
  try {
    const data = await User.findOne(
      { _id: req.params.userId, 'savedPlots.plotID': req.params.value },
    );
    const exists = data !== null;
    res.json(exists);
  } catch (err) {
    console.log(err);
  }
};

const checkIfSavedTrait = async (req, res) => {
  try {
    const data = await User.findOne(
      { _id: req.params.userId, 'savedTraits.traitID': req.params.value },
    );
    const exists = data !== null;
    res.json(exists);
  } catch (err) {
    console.log(err);
  }
};

const checkIfSavedTripleFlip = async (req, res) => {
  try {
    const data = await User.findOne(
      { _id: req.params.userId, 'savedTripleFlips.flipID': req.params.value },
    );
    const exists = data !== null;
    res.json(exists);
  } catch (err) {
    console.log(err);
  }
};

const checkIfSavedActivity = async (req, res) => {
  try {
    const data = await User.findOne(
      { _id: req.params.userId, 'savedActivities.activityID': req.params.value },
    );
    const exists = data !== null;
    res.json(exists);
  } catch (err) {
    console.log(err);
  }
};

const getUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    res.send(user);
  } catch (err) {
    console.error(err);
  }
};

const getAllSaved = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      console.log(res.status(404).json({ message: 'User not found' }));
    }

    const {
      savedActivities,
      savedPepTalks,
      savedWritingTips,
      savedTripleFlips,
      savedTraits,
      savedPlots,
      savedSettings,
      savedItems,
    } = user;

    const result = {
      savedActivities,
      savedPepTalks,
      savedWritingTips,
      savedTripleFlips,
      savedTraits,
      savedPlots,
      savedSettings,
      savedItems,
    };
    res.json(result);
  } catch (err) {
    console.error(err);
  }
};

const getStoryStarters = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      console.log(res.status(404).json({ message: 'User not found' }));
    }
    const {
      savedTraits,
      savedPlots,
      savedSettings,
      savedItems,
    } = user;

    const result = {
      savedTraits,
      savedPlots,
      savedSettings,
      savedItems,
    };
    res.json(result);
  } catch (err) {
    console.error(err);
  }
};

const getEmail = async (req, res) => {
  try {
    const data = await User.find({ email: req.params.email }, 'email');
    if (data.length === 0) {
      res.json(false);
    } else {
      res.json(true);
    }
  } catch (err) {
    console.error(err);
  }
};

const getSavedActivities = async (req, res) => {
  try {
    const data = await User.find({ _id: req.params.userId }, 'savedActivities -_id');
    res.json({
      msg: data,
    });
  } catch (err) {
    console.log(err);
  }
};

const getSavedPepTalks = async (req, res) => {
  try {
    const data = await User.find({ _id: req.params.userId }, 'savedPepTalks -_id');
    res.json({
      msg: data,
    });
  } catch (err) {
    console.log(err);
  }
};

const getSavedWritingTips = async (req, res) => {
  try {
    const data = await User.find({ _id: req.params.userId }, 'savedWritingTips -_id');
    res.json({
      msg: data,
    });
  } catch (err) {
    console.log(err);
  }
};

const getSavedTripleFlips = async (req, res) => {
  try {
    const data = await User.find({ _id: req.params.userId }, 'savedTripleFlips -_id');
    res.json({
      msg: data,
    });
  } catch (err) {
    console.log(err);
  }
};

const getSavedTraits = async (req, res) => {
  try {
    const data = await User.find({ _id: req.params.userId }, 'savedTraits -_id');
    res.json({
      msg: data,
    });
  } catch (err) {
    console.log(err);
  }
};

const getSavedPlots = async (req, res) => {
  try {
    const data = await User.find({ _id: req.params.userId }, 'savedPlots -_id');
    res.json({
      msg: data,
    });
  } catch (err) {
    console.log(err);
  }
};

const getSavedSettings = async (req, res) => {
  try {
    const data = await User.find({ _id: req.params.userId }, 'savedSettings -_id');
    res.json({
      msg: data,
    });
  } catch (err) {
    console.log(err);
  }
};

const getSavedItems = async (req, res) => {
  try {
    const data = await User.find({ _id: req.params.userId }, 'savedItems -_id');
    res.json({
      msg: data,
    });
  } catch (err) {
    console.log(err);
  }
};

const deleteUser = async (req, res) => {
  try {
    const data = await User.findByIdAndRemove(req.params.id);
    res.json({
      msg: data,
    });
  } catch (err) {
    console.log(err);
  }
};

const removeSavedActivities = async (req, res) => {
  try {
    const data = await User.updateOne(
      { _id: req.params.userId },
      { $pull: { savedActivities: { activityID: req.body.activityID } } },
    );
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};

const removeSavedPepTalks = async (req, res) => {
  try {
    const data = await User.updateOne(
      { _id: req.params.userId },
      { $pull: { savedPepTalks: { talkID: req.body.talkID } } },
    );
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};

const removeSavedWritingTips = async (req, res) => {
  try {
    const data = await User.updateOne(
      { _id: req.params.userId },
      { $pull: { savedWritingTips: { tipID: req.body.tipID } } },
    );
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};

const removeSavedTripleFlips = async (req, res) => {
  try {
    const data = await User.updateOne(
      { _id: req.params.userId },
      { $pull: { savedTripleFlips: { flipID: req.body.flipID } } },
    );
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};

const removeSavedTraits = async (req, res) => {
  try {
    const data = await User.updateOne(
      { _id: req.params.userId },
      { $pull: { savedTraits: { traitID: req.body.traitID } } },
    );
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};

const removeSavedPlots = async (req, res) => {
  try {
    const data = await User.updateOne(
      { _id: req.params.userId },
      { $pull: { savedPlots: { plotID: req.body.plotID } } },
    );
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};

const removeSavedSettings = async (req, res) => {
  try {
    const data = await User.updateOne(
      { _id: req.params.userId },
      { $pull: { savedSettings: { settingID: req.body.settingID } } },
    );
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};

const removeSavedItems = async (req, res) => {
  try {
    const data = await User.updateOne(
      { _id: req.params.userId },
      { $pull: { savedItems: { objectID: req.body.objectID } } },
    );
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createUser,
  updateUser,
  addTripleFlipHistory,
  addSavedActivities,
  addSavedPepTalks,
  addSavedWritingTips,
  addSavedTripleFlips,
  addSavedTraits,
  addSavedPlots,
  addSavedSettings,
  addSavedItems,
  checkIfSavedItem,
  checkIfSavedSetting,
  checkIfSavedPlot,
  checkIfSavedTrait,
  checkIfSavedTripleFlip,
  checkIfSavedActivity,
  getUser,
  getAllSaved,
  getStoryStarters,
  getEmail,
  getSavedActivities,
  getSavedPepTalks,
  getSavedWritingTips,
  getSavedTripleFlips,
  getSavedTraits,
  getSavedPlots,
  getSavedSettings,
  getSavedItems,
  getTripleFlipHistory,
  deleteUser,
  removeSavedActivities,
  removeSavedPepTalks,
  removeSavedWritingTips,
  removeSavedTripleFlips,
  removeSavedTraits,
  removeSavedPlots,
  removeSavedSettings,
  removeSavedItems,
};
