require('dotenv').config();

// Module Imports
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const uri = process.env.MONGODB_URI;
const port = process.env.PORT;

// Route Imports
const bodyParser = require('body-parser');
const testRouter = require('./routes/testRoute');
const pepTalkRouter = require('./routes/pepTalkRoutes');
const mindBodyRouter = require('./routes/mindBodyRoute');
const tripleFlipRouter = require('./routes/tripleFlipRoutes');

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
app.use(express.json({ limit: '200mb' }));
app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }));

// API Routes
app.use('/test', testRouter);
app.use('/pepTalk', pepTalkRouter);
app.use('/mindBody', mindBodyRouter);
app.use('/tripleFlip', tripleFlipRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
