const express = require('express');

const itemRouter = express.Router();
const itemController = require('../../controllers/storyStarter/itemController');

itemRouter.post('/post', itemController.createItem);

itemRouter.get('/get', async (req, res) => {
  try {
    const randomItem = await itemController.getRandomItem();
    res.send(randomItem);
  } catch (err) {
    console.error(err);
    // Handle the error appropriately
    res.status(500).send('Internal Server Error');
  }
});

itemRouter.get('/getByID/:id', itemController.getItemByID);

module.exports = itemRouter;
