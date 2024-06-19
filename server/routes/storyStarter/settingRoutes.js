const express = require('express');

const settingRouter = express.Router();
const settingController = require('../../controllers/storyStarter/settingController');

settingRouter.post('/post', settingController.createSetting);

settingRouter.get('/get', async (req, res) => {
  try {
    const randomSetting = await settingController.getRandomSetting();
    res.send(randomSetting);
  } catch (err) {
    console.error(err);
    // Handle the error appropriately
    res.status(500).send('Internal Server Error');
  }
});

settingRouter.get('/getByID/:id', settingController.getSettingByID);

module.exports = settingRouter;
