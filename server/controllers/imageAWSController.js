const {
  S3Client, GetObjectCommand, PutObjectCommand,
} = require('@aws-sdk/client-s3');

const TripleFlip = require('../models/tripleFlipModel');

const client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
});

const uploadImageAWS = async (imageAsset) => {
  try {
    const { uri, base64 } = imageAsset;
    const parts = uri.split('/');
    const fileName = parts[parts.length - 1];
    const imageBuffer = Buffer.from(base64, 'base64');
    const params = {
      Bucket: process.env.S3_BUCKET,
      Key: fileName,
      Body: imageBuffer,
      ContentType: 'image/jpeg',
    };
    const command = new PutObjectCommand(params);
    await client.send(command);
    console.log('Image uploaded successfully');
  } catch (err) {
    console.error(err);
  }
};

const uploadKeysMongo = async (imageKeys) => {
  const tripleFlip = new TripleFlip({ images: imageKeys });
  try {
    await tripleFlip.save(tripleFlip);
  } catch (err) {
    console.error(err);
  }
};

const uploadTripleFlip = async (req, res) => {
  const imageList = req.body.assetArray;
  try {
    // upload images to AWS S3
    imageList.forEach(uploadImageAWS);
    const mongoDBkeys = imageList.map((obj) => {
      const parts = obj.uri.split('/');
      return parts[parts.length - 1];
    });
    // upload image keys to MongoDB
    uploadKeysMongo(mongoDBkeys);
  } catch (e) {
    console.log(e);
  }
};

const getImageAWS = async (key) => {
  const command = new GetObjectCommand({
    Bucket: process.env.S3_BUCKET,
    Key: key,
  });
  try {
    const response = await client.send(command);
    // The Body object also has 'transformToByteArray' and 'transformToWebStream' methods.
    const str = await response.Body.transformToString('base64');
    const b64str = `data:image/${response.ContentType};base64,${str}`;
    // console.log(b64str.slice(0, 100));
    return (b64str);
  } catch (err) {
    console.error(err);
  }
  return 'error';
};

const getImage = async (req, res) => {
  try {
    const randomTripleflip = await TripleFlip.aggregate([
      { $sample: { size: 1 } }, // $sample stage to get a random document
    ]);
    // Extract the talk string from the random document
    const randomTripleFlipKeys = randomTripleflip.length > 0 ? randomTripleflip[0].images : null;
    if (randomTripleFlipKeys === null) {
      console.log('No valid keys found');
      return 'ERROR: Empty MongoDB collection';
    }
    const b64Arr = await Promise.all(randomTripleFlipKeys.map(getImageAWS));
    res.send(b64Arr);
  } catch (err) {
    console.error(err);
    throw err;
  }
  return 'ERROR: MongoDB Error';
};

module.exports = { uploadTripleFlip, getImage };
