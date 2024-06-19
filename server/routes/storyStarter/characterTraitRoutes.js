const express = require('express');

const traitRouter = express.Router();
const traitController = require('../../controllers/storyStarter/characterTraitController');

traitRouter.post('/post', traitController.createCharacterTrait);

traitRouter.get('/get', async (req, res) => {
  try {
    const randomTrait = await traitController.getRandomCharacterTrait();
    res.send(randomTrait);
  } catch (err) {
    console.error(err);
    // Handle the error appropriately
    res.status(500).send('Internal Server Error');
  }
});

traitRouter.get('/getByID/:id', traitController.getCharacterTraitByID);

module.exports = traitRouter;
