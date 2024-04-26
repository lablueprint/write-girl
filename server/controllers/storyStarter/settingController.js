const Setting = require('../../models/storyStarter/settingModel');

// Example of creating a document in the database
const createSetting = async (req, res) => {
  const setting = new Setting(req.body);
  try {
    const data = await setting.save(setting);
    res.send(data);
  } catch (err) {
    console.error(err);
  }
};

const getRandomSetting = async () => {
  // Generate a random index based on the count
  // Use aggregation to get a random document
  try {
    const randomSetting = await Setting.aggregate([
      { $sample: { size: 1 } }, // $sample stage to get a random document
    ]);
      // Extract the talk string from the random document
    const extractedRandomSetting = randomSetting.length > 0 ? randomSetting[0] : null;
    if (extractedRandomSetting === null) {
      console.log('No valid setting found');
      return 'No settings here!';
    }
    return extractedRandomSetting;
  } catch (err) {
    console.error(err);
    // Handle the error appropriately
    throw err;
  }
};

module.exports = {
  createSetting,
  getRandomSetting,
};
