const express = require('express');

const pocketPromptRouter = express.Router();
const pocketPromptController = require('../controllers/pocketPromptController');

pocketPromptRouter.post('/post', pocketPromptController.createPocketPrompt);

pocketPromptRouter.get('/get', async (req, res) => {
  try {
    const randomPrompt = await pocketPromptController.getRandomPocketPrompt();
    res.send(randomPrompt);
  } catch (err) {
    console.error(err);
    // Handle the error appropriately
    res.status(500).send('Internal Server Error');
  }
});

module.exports = pocketPromptRouter;
