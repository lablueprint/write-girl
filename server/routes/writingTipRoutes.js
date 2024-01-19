const express = require('express');

const writingTipRouter = express.Router();
const writingTipController = require('../controllers/writingTipController');

writingTipRouter.post('/post', writingTipController.createWritingTip);

writingTipRouter.get('/get', async (req, res) => {
  try {
    const writingTip = await writingTipController.getRandomWritingTip(req);
    res.send(writingTip)
  } catch (err) {
    console.error(err)
  }
});

module.exports = writingTipRouter;