const express = require('express');

const userRouter = express.Router();
const userController = require('../controllers/userController');

userRouter.post('/post', userController.createUser);

userRouter.get('/get/:id', userController.getUser);
userRouter.get('/getAllSaved/:userId', userController.getAllSaved);
userRouter.get('/getStoryStarters/:userId', userController.getStoryStarters);
userRouter.get('/getEmail/:email', userController.getEmail);
userRouter.get('/getActivities/:userId', userController.getSavedActivities);
userRouter.get('/getPepTalks/:userId', userController.getSavedPepTalks);
userRouter.get('/getWritingTips/:userId', userController.getSavedWritingTips);
userRouter.get('/getTripleFlips/:userId', userController.getSavedTripleFlips);
userRouter.get('/getTraits/:userId', userController.getSavedTraits);
userRouter.get('/getPlots/:userId', userController.getSavedPlots);
userRouter.get('/getSettings/:userId', userController.getSavedSettings);
userRouter.get('/getItems/:userId', userController.getSavedItems);
userRouter.get('/getTripleFlipHistory/:userId', userController.getTripleFlipHistory);
userRouter.get('/checkIfSavedItem/:userId/:value', userController.checkIfSavedItem);
userRouter.get('/checkIfSavedSetting/:userId/:value', userController.checkIfSavedSetting);
userRouter.get('/checkIfSavedPlot/:userId/:value', userController.checkIfSavedPlot);
userRouter.get('/checkIfSavedTrait/:userId/:value', userController.checkIfSavedTrait);
userRouter.get('/checkIfSavedTripleFlip/:userId/:value', userController.checkIfSavedTripleFlip);
userRouter.get('/checkIfSavedActivity/:userId/:value', userController.checkIfSavedActivity);
userRouter.patch('/update/:id', userController.updateUser);
userRouter.patch('/addActivities/:userId', userController.addSavedActivities);
userRouter.patch('/addPepTalks/:userId', userController.addSavedPepTalks);
userRouter.patch('/addWritingTips/:userId', userController.addSavedWritingTips);
userRouter.patch('/addTripleFlips/:userId', userController.addSavedTripleFlips);
userRouter.patch('/addTraits/:userId', userController.addSavedTraits);
userRouter.patch('/addPlots/:userId', userController.addSavedPlots);
userRouter.patch('/addSettings/:userId', userController.addSavedSettings);
userRouter.patch('/addItems/:userId', userController.addSavedItems);
userRouter.patch('/removeActivities/:userId', userController.removeSavedActivities);
userRouter.patch('/removePepTalks/:userId', userController.removeSavedPepTalks);
userRouter.patch('/removeWritingTips/:userId', userController.removeSavedWritingTips);
userRouter.patch('/removeTripleFlips/:userId', userController.removeSavedTripleFlips);
userRouter.patch('/removeTraits/:userId', userController.removeSavedTraits);
userRouter.patch('/removePlots/:userId', userController.removeSavedPlots);
userRouter.patch('/removeSettings/:userId', userController.removeSavedSettings);
userRouter.patch('/removeItems/:userId', userController.removeSavedItems);
userRouter.patch('/addTripleFlipHistory/:userId', userController.addTripleFlipHistory);

userRouter.delete('/delete/:id', userController.deleteUser);

module.exports = userRouter;
