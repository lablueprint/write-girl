const express = require('express');

const userRouter = express.Router();
const userController = require('../controllers/userController');

userRouter.post('/post', userController.createUser);

userRouter.get('/get', userController.getAllUserInfo);
userRouter.get('/getEmail/:email', userController.getEmail);
userRouter.get('/getPepTalks/:id', userController.getSavedPepTalks);
userRouter.get('/getWritingTips/:id', userController.getSavedWritingTips);
userRouter.get('/getTripleFlips/:id', userController.getSavedTripleFlips);
userRouter.get('/getTraits/:id', userController.getSavedTraits);
userRouter.get('/getPlots/:id', userController.getSavedPlots);
userRouter.get('/getSettings/:id', userController.getSavedSettings);
userRouter.get('/getItems/:id', userController.getSavedItems);

userRouter.patch('/update/:id', userController.updateUser);
userRouter.patch('/addPepTalks/:id', userController.addSavedPepTalks);
userRouter.patch('/addWritingTips/:id', userController.addSavedWritingTips);
userRouter.patch('/addTripleFlips/:id', userController.addSavedTripleFlips);
userRouter.patch('/addTraits/:id', userController.addSavedTraits);
userRouter.patch('/addPlots/:id', userController.addSavedPlots);
userRouter.patch('/addSettings/:id', userController.addSavedSettings);
userRouter.patch('/addItems/:id', userController.addSavedItems);
userRouter.patch('/removePepTalks/:id', userController.removeSavedPepTalks);
userRouter.patch('/removeWritingTips/:id', userController.removeSavedWritingTips);
userRouter.patch('/removeTripleFlips/:id', userController.removeSavedTripleFlips);
userRouter.patch('/removeTraits/:id', userController.removeSavedTraits);
userRouter.patch('/removePlots/:id', userController.removeSavedPlots);
userRouter.patch('/removeSettings/:id', userController.removeSavedSettings);
userRouter.patch('/removeItems/:id', userController.removeSavedItems);

userRouter.delete('/delete/:id', userController.deleteUser);

module.exports = userRouter;
