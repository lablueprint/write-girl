require('dotenv').config();

// Module Imports
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const uri = process.env.MONGODB_URI;
const port = process.env.PORT;

// Route Imports
const testRouter = require('./routes/testRoute');
const characterTraitRouter = require('./routes/storyStarter/characterTraitRoutes');
const plotPointRouter = require('./routes/storyStarter/plotPointRoutes');
const settingRouter = require('./routes/storyStarter/settingRoutes');
const itemRouter = require('./routes/storyStarter/itemRoutes');
const activityRouter = require('./routes/progressiveWritingRoutes');
const pepTalkRouter = require('./routes/pepTalkRoutes');
const writingTipRouter = require('./routes/writingTipRoutes');
const mindBodyRouter = require('./routes/mindBodyRoute');
const userRouter = require('./routes/userRoutes');
const passwordResetRouter = require('./routes/passwordResetRoute');

// Connect to the MongoDB database
async function connectToDatabase() {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connectToDatabase();

// Start the Node Express server
const app = express();
app.use(cors());
app.use(express.json());

// API Routes
app.use('/test', testRouter);
app.use('/characterTrait', characterTraitRouter);
app.use('/plotPoint', plotPointRouter);
app.use('/setting', settingRouter);
app.use('/item', itemRouter);
app.use('/activity', activityRouter);
app.use('/pepTalk', pepTalkRouter);
app.use('/writingTip', writingTipRouter);
app.use('/mindBody', mindBodyRouter);
app.use('/user', userRouter);
app.use('/passwordReset', passwordResetRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
