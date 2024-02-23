import axios from 'axios';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';

const {
  View, Text, Button, ScrollView, StyleSheet,
} = require('react-native');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black', // You can customize the color
    textAlign: 'center', // You can adjust the alignment
    // You can add more styles as needed
  },
});

export default function ImageUploadComponent() {
  const [selectedImages, setSelectedImages] = useState([]);

  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      const pickedURIs = result.assets.map((imageObj) => imageObj.uri);
      setSelectedImages((images) => [...images, ...pickedURIs]);
      console.log(result.assets);
    } else {
      alert('You did not select any image.');
    }
  };
  const resetImages = () => {
    setSelectedImages([]);
  };

  const uploadImages = async () => {
    const imageBlobs = [];
    try {
      async function getBlobs(images) {
        const imageData = await fetch(images);
        const imageBlob = await imageData.blob();
        imageBlobs.push(imageBlob);
      }
      await Promise.all(selectedImages.map(getBlobs));
      console.log(imageBlobs);
    } catch (error) {
      // Refresh the UI or perform other actions after successful upload
      console.error('Error uploading images:', error);
    }
    const respObj = { images: imageBlobs };
    console.log(respObj);
    await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/tripleFlip/tripleFlipUpload`, respObj);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.titleText}>Triple Flip Upload</Text>
      </View>
      <Button title="Pick Images" onPress={pickImageAsync} />
      <Button title="Upload Images" onPress={uploadImages} />
      <Button title="Reset Images" onPress={resetImages} />

      {selectedImages
        ? (
          <View>
            {selectedImages.map((imageUri) => (
              <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />
            ))}
          </View>
        ) : null}
      {/* <View>
        <Image source={{ uri: selectedImages }} style={{ width: 200, height: 200 }} />
      </View> */}
    </ScrollView>
  );
}
