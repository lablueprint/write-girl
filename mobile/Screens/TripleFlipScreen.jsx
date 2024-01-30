import axios from 'axios';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';

const {
  View, Text, Button,
} = require('react-native');

export default function ImageUploadComponent() {
  const [selectedImages, setSelectedImages] = useState(null);

  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImages(result.assets[0].uri);
    } else {
      alert('You did not select any image.');
    }
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
      <Button title="Pick Images" onPress={pickImageAsync} />
      <Button title="Upload Images" onPress={uploadImages} />
      <View>
        <Image source={{ uri: selectedImages }} style={{ width: 200, height: 200 }} />
      </View>
    </View>
  );
}
