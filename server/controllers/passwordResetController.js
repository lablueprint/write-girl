const nodemailer = require('nodemailer');

const bcrypt = require('bcrypt');

const User = require('../models/userModel');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: `${process.env.EMAIL}`,
    pass: `${process.env.EMAIL_PASSWORD}`,
  },
});

// Generate a random number between 0000 and 9999
const generateFourDigitCode = () => {
  let fourDigitCode = '';
  for (let i = 0; i < 4; i += 1) {
    fourDigitCode += String(Math.floor(Math.random() * 10));
  }
  return fourDigitCode;
};

// Hash Function
const hash = async (code) => {
  const hashedCode = await bcrypt.hash(code, `${process.env.SALT}`);
  return hashedCode;
};

// Return true if the code and hashedCode match
const verifyCode = async (req, res) => {
  // Retrieve info from req.body.[your_param], code and hashedCode
  const rehash = await hash(req.body.code);
  res.send(rehash === req.body.hashedCode);
};

// Sends an email with a 4 digit verification code
// Returns the hashedCode
// Return -1 if the user doesn't exist
const verifyEmail = async (req, res) => {
  // Send back -1 if the user doesn't exist
  const user = await User.findOne({ email: req.body.email });
  if (user == null) {
    res.send('-1');
    return;
  }
  const resetCode = generateFourDigitCode();
  const mailOptions = {
    from: `${process.env.EMAIL}`,
    to: req.body.email,
    subject: `WriteGirl Reset Password Code: ${resetCode} `,
    text: `Your reset code for WriteGirl: ${resetCode}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email: ', error);
    }
  });
  res.send(await hash(resetCode));
};

// Updates the password in the databased for the user with the given email
const updatePassword = async (req, res) => {
  try {
    const data = await User.updateOne(
      { email: req.body.email },
      { $set: { password: req.body.newPassword } },
    );
    res.send(data.acknowledged);
  } catch (err) {
    console.log('Error updating password');
  }
};

module.exports = {
  verifyEmail,
  verifyCode,
  updatePassword,
};
