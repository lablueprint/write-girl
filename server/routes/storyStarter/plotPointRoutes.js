const express = require('express');

const plotPointRouter = express.Router();
const plotpointController = require('../../controllers/storyStarter/plotPointController');

plotPointRouter.post('/post', plotpointController.createPlotPoint);

plotPointRouter.get('/get', async (req, res) => {
  try {
    const randomPoint = await plotpointController.getRandomPlotPoint();
    res.send(randomPoint);
  } catch (err) {
    console.error(err);
    // Handle the error appropriately
    res.status(500).send('Internal Server Error');
  }
});

plotPointRouter.get('/getByID/:id', plotpointController.getPlotPointByID);

module.exports = plotPointRouter;
