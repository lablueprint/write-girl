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

const addSavedPepTalks = async (req, res) => {
  try {
    const data = await User.updateOne(
      { _id: req.params.id },
      { $push: { savedPepTalks: req.body } },
    );
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};

const addSavedWritingTips = async (req, res) => {
  try {
    const data = await User.updateOne(
      { _id: req.params.id },
      { $push: { savedWritingTips: req.body } },
    );
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};

const addSavedTripleFlips = async (req, res) => {
  try {
    const data = await User.updateOne(
      { _id: req.params.id },
      { $push: { savedTripleFlips: req.body } },
    );
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};

const addSavedTraits = async (req, res) => {
  try {
    const data = await User.updateOne(
      { _id: req.params.id },
      { $push: { savedTraits: req.body } },
    );
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};

const addSavedPlots = async (req, res) => {
  try {
    const data = await User.updateOne(
      { _id: req.params.id },
      { $push: { savedPlots: req.body } },
    );
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};

const addSavedSettings = async (req, res) => {
  try {
    const data = await User.updateOne(
      { _id: req.params.id },
      { $push: { savedSettings: req.body } },
    );
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};

const addSavedItems = async (req, res) => {
  try {
    const data = await User.updateOne(
      { _id: req.params.id },
      { $push: { savedItems: req.body } },
    );
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};

const getAllUserInfo = async (req, res) => {
  try {
    const data = await User.find();
    res.send(data);
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

const getSavedPepTalks = async (req, res) => {
  try {
    const data = await User.find({ _id: req.params.id }, 'savedPepTalks -_id');
    res.json({
      msg: data,
    });
  } catch (err) {
    console.log(err);
  }
};

const getSavedWritingTips = async (req, res) => {
  try {
    const data = await User.find({ _id: req.params.id }, 'savedWritingTips -_id');
    res.json({
      msg: data,
    });
  } catch (err) {
    console.log(err);
  }
};

const getSavedTripleFlips = async (req, res) => {
  try {
    const data = await User.find({ _id: req.params.id }, 'savedTripleFlips -_id');
    res.json({
      msg: data,
    });
  } catch (err) {
    console.log(err);
  }
};

const getSavedTraits = async (req, res) => {
  try {
    const data = await User.find({ _id: req.params.id }, 'savedTraits -_id');
    res.json({
      msg: data,
    });
  } catch (err) {
    console.log(err);
  }
};

const getSavedPlots = async (req, res) => {
  try {
    const data = await User.find({ _id: req.params.id }, 'savedPlots -_id');
    res.json({
      msg: data,
    });
  } catch (err) {
    console.log(err);
  }
};

const getSavedSettings = async (req, res) => {
  try {
    const data = await User.find({ _id: req.params.id }, 'savedSettings -_id');
    res.json({
      msg: data,
    });
  } catch (err) {
    console.log(err);
  }
};

const getSavedItems = async (req, res) => {
  try {
    const data = await User.find({ _id: req.params.id }, 'savedItems -_id');
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

const removeSavedPepTalks = async (req, res) => {
  try {
    const data = await User.updateOne(
      { _id: req.params.id },
      { $pullAll: { savedPepTalks: req.body } },
    );
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};

const removeSavedWritingTips = async (req, res) => {
  try {
    const data = await User.updateOne(
      { _id: req.params.id },
      { $pullAll: { savedWritingTips: req.body } },
    );
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};

const removeSavedTripleFlips = async (req, res) => {
  try {
    const data = await User.updateOne(
      { _id: req.params.id },
      { $pullAll: { savedTripleFlips: req.body } },
    );
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};

const removeSavedTraits = async (req, res) => {
  try {
    const data = await User.updateOne(
      { _id: req.params.id },
      { $pullAll: { savedTraits: req.body } },
    );
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};

const removeSavedPlots = async (req, res) => {
  try {
    const data = await User.updateOne(
      { _id: req.params.id },
      { $pullAll: { savedPlots: req.body } },
    );
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};

const removeSavedSettings = async (req, res) => {
  try {
    const data = await User.updateOne(
      { _id: req.params.id },
      { $pullAll: { savedSettings: req.body } },
    );
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};

const removeSavedItems = async (req, res) => {
  try {
    const data = await User.updateOne(
      { _id: req.params.id },
      { $pullAll: { savedItems: req.body } },
    );
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createUser,
  updateUser,
  addSavedPepTalks,
  addSavedWritingTips,
  addSavedTripleFlips,
  addSavedTraits,
  addSavedPlots,
  addSavedSettings,
  addSavedItems,
  getAllUserInfo,
  getEmail,
  getSavedPepTalks,
  getSavedWritingTips,
  getSavedTripleFlips,
  getSavedTraits,
  getSavedPlots,
  getSavedSettings,
  getSavedItems,
  deleteUser,
  removeSavedPepTalks,
  removeSavedWritingTips,
  removeSavedTripleFlips,
  removeSavedTraits,
  removeSavedPlots,
  removeSavedSettings,
  removeSavedItems,
};
