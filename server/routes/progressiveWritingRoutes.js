const express = require('express');

const pepTalkRouter = express.Router();
const progressiveWritingController = require('../controllers/progressiveWritingController');

pepTalkRouter.post('/post', progressiveWritingController.createPepTalk);

pepTalkRouter.get('/get', async (req, res) => {
  try {
    const randomTalk = await progressiveWritingController.getRandomPepTalk();
    res.send(randomTalk);
  } catch (err) {
    console.error(err);
    // Handle the error appropriately
    res.status(500).send('Internal Server Error');
  }
});

module.exports = pepTalkRouter;
