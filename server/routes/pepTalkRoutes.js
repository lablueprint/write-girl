const express = require('express');

const pepTalkRouter = express.Router();
const pepTalkController = require('../controllers/pepTalkController');

pepTalkRouter.post('/post', pepTalkController.createPepTalk);

pepTalkRouter.get('/get', async (req, res) => {
  try {
    const randomTalk = await pepTalkController.getRandomPepTalk();
    res.send(randomTalk);
  } catch (err) {
    console.error(err);
    // Handle the error appropriately
    res.status(500).send('Internal Server Error');
  }
});

module.exports = pepTalkRouter;
