const Item = require('../../models/storyStarter/itemModel');

// Example of creating a document in the database
const createItem = async (req, res) => {
  const item = new Item(req.body);
  try {
    const data = await item.save(item);
    res.send(data);
  } catch (err) {
    console.error(err);
  }
};

const getRandomItem = async () => {
  // Generate a random index based on the count
  // Use aggregation to get a random document
  try {
    const randomItem = await Item.aggregate([
      { $sample: { size: 1 } }, // $sample stage to get a random document
    ]);
      // Extract the talk string from the random document
    const extractedRandomItem = randomItem.length > 0 ? randomItem[0].item : null;
    if (extractedRandomItem === null) {
      console.log('No valid item found');
      return 'No items here!';
    }
    return extractedRandomItem;
  } catch (err) {
    console.error(err);
    // Handle the error appropriately
    throw err;
  }
};

module.exports = {
  createItem,
  getRandomItem,
};
