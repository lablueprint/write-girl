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

const { S3Client, ListObjectsV2Command } = require('@aws-sdk/client-s3');

const TripleFlip = require('../models/tripleFlipModel');

const uploadTripleFlip = async (req, res) => {
  console.log('testing');
  const S3_BUCKET_NAME = process.env.S3_BUCKET;
  const client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.accessKeyId,
      secretAccessKey: process.env.secretAccessKey,
    },
  });
  const command = new ListObjectsV2Command({
    Bucket: 'my-bucket',
    // The default and maximum number of keys returned is 1000. This limits it to
    // one for demonstration purposes.
    MaxKeys: 1,
  });

  try {
    let isTruncated = true;

    console.log('Your bucket contains the following objects:\n');
    let contents = '';

    while (isTruncated) {
      const { Contents, IsTruncated, NextContinuationToken } = await client.send(command);
      const contentsList = Contents.map((c) => ` • ${c.Key}`).join('\n');
      contents += `${contentsList}\n`;
      isTruncated = IsTruncated;
      command.input.ContinuationToken = NextContinuationToken;
    }
    console.log(contents);
  } catch (err) {
    console.error(err);
  }

  // const s3 = new AWS.S3({
  //   accessKeyId: process.env.ACCESS_KEY_ID,
  //   secretAccessKey: process.env.SECRET_ACCESS_KEY,
  //   region: process.env.S3_REGION,
  // });
  // // response is of type array of blobs
  // const response = req.body.images;
  // // console.log(s3.listBuckets((err, data) => {
  // //   if (err) console.log(err, err.stack);
  // //   else console.log(data);
  // // }));
  // console.log('testing');
  // try {
  //   console.log('starting');
  //   // const fin = await s3.upload({
  //   //   Bucket: S3_BUCKET_NAME,
  //   //   Key: 'test.txt',
  //   //   Body: response,
  //   // });
  //   // console.log(fin);
  // } catch (e) {
  //   console.log('error uploading images');
  //   console.log(e);
  // }
  // const imageKeys = response.map(async (blob) => {
  //   const key = `images/${Date.now()}.jpg`;
  //   await s3.putObject({
  //     Bucket: S3_BUCKET_NAME,
  //     Key: key,
  //     ContentType: 'image/jpeg',
  //     Body: blob,
  //   });
  //   return (key);
  // });
  // console.log(imageKeys);
  // const resp = new s3.listObjectsV2({ Bucket: S3_BUCKET_NAME });
  // console.log(resp);
};
// const key = `images/${Date.now()}_${i}.jpg`; // Change the key format as per your requirement

module.exports = { uploadTripleFlip };
