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
    // find fileName from URI to use as S3 key
    const parts = uri.split('/');
    const fileName = parts[parts.length - 1];
    // create buffer to store image data as S3 body
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

// imageKeys is an array of 3 strings containing image URI's
const uploadKeysMongo = async (imageKeys) => {
  const tripleFlip = new TripleFlip({ images: imageKeys });
  try {
    await tripleFlip.save(tripleFlip);
  } catch (err) {
    console.error(err);
  }
};

// takes in {assetArray: array of image objects with metada}
// image data is uploaded to AWS S3
// image URI is uploaded to MongoDB in a triplet
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

// retrieves image data from AWS S3 and encodes in b64 format
const getImageAWS = async (key) => {
  const command = new GetObjectCommand({
    Bucket: process.env.S3_BUCKET,
    Key: key,
  });
  try {
    const response = await client.send(command);
    const str = await response.Body.transformToString('base64');
    const b64str = `data:image/${response.ContentType};base64,${str}`;
    return (b64str);
  } catch (err) {
    console.error(err);
  }
  return 'error';
};

// samples MongoDB for random array of 3 image URI strings
// calls getImageAWS for each URI and returns b64 encoding of each image in an array
const getImage = async (req, res) => {
  try {
    const randomTripleflip = await TripleFlip.aggregate([
      { $sample: { size: 1 } }, // $sample stage to get a random document
    ]);
    // Extract the images array from the random document
    const randomTripleFlipKeys = randomTripleflip.length > 0 ? randomTripleflip[0].images : null;
    if (randomTripleFlipKeys === null) {
      console.log('No valid keys found');
      return 'ERROR: Empty MongoDB collection';
    }
    // for each image key, get the b64 encoding from AWS S3
    const b64Arr = await Promise.all(randomTripleFlipKeys.map(getImageAWS));
    res.send(b64Arr);
  } catch (err) {
    console.error(err);
    throw err;
  }
  return 'ERROR: MongoDB Error';
};

module.exports = { uploadTripleFlip, getImage };
