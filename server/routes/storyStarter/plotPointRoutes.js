const express = require('express');

const plotPointRouter = express.Router();
const plotpointController = require('../../controllers/storyStarter/plotPointController');

plotPointRouter.post('/post', plotpointController.createPlotPoint);

plotPointRouter.get('/get', async (req, res) => {
  try {
    const randomPoint = await plotpointController.getRandomPlotPoint();
    console.log('got a thing in routes');
    res.send(randomPoint);
  } catch (err) {
    console.error(err);
    // Handle the error appropriately
    res.status(500).send('Internal Server Error');
  }
});

module.exports = plotPointRouter;
