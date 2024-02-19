const nodemailer = require('nodemailer');

const bcrypt = require('bcrypt');

const User = require('../models/userModel');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: '3dward.ng@gmail.com',
    pass: `${process.env.EMAIL_PASSWORD}`,
  },
});

// Generate a random number between 0000 and 9999
const generateFourDigitCode = () => {
  const fourDigitCode = String(Math.floor(Math.random() * 10000));
  return fourDigitCode;
};

const hash = async (code) => {
  const saltRounds = 8;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedCode = await bcrypt.hash(code, salt);
  return hashedCode;
};

const verifyEmail = async (req, res) => {
  // TODO: Check if the user with the provided email exists. Send back -1 if the user doesn't exist

  const resetCode = generateFourDigitCode();
  const mailOptions = {
    from: '3dward.ng@gmail.com',
    to: req.body.email,
    subject: `WriteGirl Reset Password Code: ${resetCode} `,
    text: `Your reset code for WriteGirl: ${resetCode}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email: ', error);
    } else {
      console.log('Email sent: ', info.response);
    }
  });
  res.send(await hash(resetCode));
};

// transporter.sendMail(mailOptions, (error, info) => {
// if (error) {
// console.error('Error sending email: ', error);
// } else {
// console.log('Email sent: ', info.response);
// }
// });

module.exports = {
  verifyEmail,
};