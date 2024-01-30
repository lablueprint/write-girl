// const AWS = require('aws-sdk');

// // Connect to the AWS S3 Storage
// const s3 = new AWS.S3({
//   accessKeyId: process.env.ACCESS_KEY_ID,
//   secretAccessKey: process.env.SECRET_ACCESS_KEY,
// });

// const retrieveImage = async (req, res) => {
// try {
//     await s3.getObject({
//       Bucket: process.env.S3_BUCKET,
//       Key: 'test.png',
//     }, (err, data) => {
//       if (err) {
//         console.log(err);
//       } else {
//        res.send((`data:${data.ContentType};
// base64,${Buffer.from(data.Body, 'binary').toString('base64')}`));
//       }
//     });
//   } catch (err) {
//     console.error(err);
// }

const AWS = require('aws-sdk');
const TripleFlip = require('../models/tripleFlipModel');

const S3_BUCKET_NAME = process.env.S3_BUCKET;

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.S3_REGION,
});

const s3 = new AWS.S3();

const uploadTripleFlip = async (req, res) => {
  try {
    const imagePaths = [];
    /* eslint-disable global-require */

    // Upload each image to S3
    await Promise.all(req.files.map(async (file) => {
      const params = {
        Bucket: S3_BUCKET_NAME,
        Key: `images/${file.filename}`,
        Body: require('fs').createReadStream(file.path),
        ContentType: file.mimetype,
      };

      const uploadResult = await s3.upload(params).promise();
      imagePaths.push(uploadResult.key);
    }));

    // Save the image paths to MongoDB
    const newTripleFlip = new TripleFlip({ images: imagePaths });
    await newTripleFlip.save();

    // Delete local image files after upload
    req.files.forEach((file) => {
      require('fs').unlinkSync(file.path);
    }); 

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error uploading image set:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

module.exports = { uploadTripleFlip };
