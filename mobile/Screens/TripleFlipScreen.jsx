import axios from 'axios';

const React = require('react');
const { useState, useEffect } = require('react');
const {
  View, Text, Button, Image,
} = require('react-native');
const ImagePicker = require('react-native-image-picker');

function ImageUploadComponent() {
  const [selectedImages, setSelectedImages] = useState([]);

  const pickImages = () => {
    ImagePicker.showImagePicker({ maxFiles: 3 }, (response) => {
      if (!response.didCancel && !response.error) {
        setSelectedImages(response.assets);
      }
    });
  };

  const uploadImages = async () => {
    try {
      const formData = new FormData();

      selectedImages.forEach((image, index) => {
        formData.append('images', {
          uri: image.uri,
          type: image.type,
          name: `image${index}.jpg`,
        });
      });

      await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/api/tripleFlipUpload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Refresh the UI or perform other actions after successful upload
      console.log('Images uploaded successfully');
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };

  return (
    <View>
      <Text>Image Upload Component</Text>
      <Button title="Pick Images" onPress={pickImages} />
      <Button title="Upload Images" onPress={uploadImages} />
    </View>
  );
}

module.exports = ImageUploadComponent;
