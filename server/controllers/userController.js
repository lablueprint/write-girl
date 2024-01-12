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
