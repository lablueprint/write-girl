const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const passport = require('../utils/passportConfig');

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
      { _id: req.params.userId },
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
      { $push: { savedWritingTips: req.body } },
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
      { _id: req.params.userId },
      { $push: { savedTripleFlips: req.body } },
    );
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};

// Send [traitsID]
const addSavedTraits = async (req, res) => {
  try {
    const data = await User.updateOne(
      { _id: req.params.userId },
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
      { _id: req.params.userId },
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
      { _id: req.params.userId },
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
    const data = await User.updateOne(
      { _id: req.params.userId },
      { $push: { savedItems: req.body } },
    );
    res.json(data);
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
      { $pullAll: { savedActivities: req.body } },
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
      { _id: req.params.userId },
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
      { _id: req.params.userId },
      { $pull: { savedTripleFlips: req.body } },
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
      { _id: req.params.userId },
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
      { _id: req.params.userId },
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
      { _id: req.params.userId },
      { $pullAll: { savedItems: req.body } },
    );
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};

const userSignUp = async (req, res) => {
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists) {
    return res.json({ error: 'That email already exists.' });
  }
  try {
    // Generate a salted passwordr
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hashSync(req.body.password, salt);
    // Create a new user object with secure password
    const secureUser = { ...req.body };
    secureUser.password = hashedPassword;
    // Save user in database
    const user = new User(secureUser);
    await user.save(user);
    // Send success response
    return res.send('User successfully created!');
  } catch (err) {
    return res.status(404).json({ error: 'Unable to create a user properly' });
  }
};

const userLogIn = async (req, res, next) => {
  passport.authenticate('user-log-in', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) { return res.json({ error: info.message }); }
    return req.logIn(user, { session: false }, (e) => {
      if (err) return next(e);
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
      return res.json({ id: user._id, token });
    });
  })(req, res, next);
  // try {
  //   const { email, password } = req.body;
  //   const user = await User.findOne({ email, password });
  //   if (user) {
  //     // Authentication successful
  //     res.status(200).json({ message: 'Login successful' });
  //   } else {
  //     // Authentication failed
  //     res.status(401).json({ error: 'Invalid username or password' });
  //   }
  // } catch (err) {
  //   console.log(err);
  // }
};

module.exports = {
  updateUser,
  addSavedActivities,
  addSavedPepTalks,
  addSavedWritingTips,
  addSavedTripleFlips,
  addSavedTraits,
  addSavedPlots,
  addSavedSettings,
  addSavedItems,
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
  deleteUser,
  removeSavedActivities,
  removeSavedPepTalks,
  removeSavedWritingTips,
  removeSavedTripleFlips,
  removeSavedTraits,
  removeSavedPlots,
  removeSavedSettings,
  removeSavedItems,
  userLogIn,
  userSignUp,
};
