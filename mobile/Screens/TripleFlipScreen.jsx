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
  // displays local selected images to upload
  const [selectedImages, setSelectedImages] = useState([]);
  // stores image data to upload
  const [assetArray, setAssetArray] = useState([]);
  // displays images requested from AWS/Mongo combo
  const [displayedImages, setDisplayedImages] = useState([]);

  const getImage = async () => {
    const test = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/tripleFlip/GetTripleFlip`);
    setDisplayedImages(test.data);
  };

  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
      selectionLimit: 3,
    });

    if (!result.canceled) {
      const pickedURIs = result.assets.map(({ uri, assetId }) => ({
        uri, assetId,
      }));

      if (assetArray.length + result.assets.length <= 3) {
        setSelectedImages((images) => [...images, ...pickedURIs]);
        setAssetArray(result.assets);
      } else {
        alert('Invalid number of images: triple flip requires 3 images');
      }
    } else {
      alert('Please select 3 images');
    }
  };

  const resetImages = () => {
    setSelectedImages([]);
    setAssetArray([]);
    setDisplayedImages([]);
  };

  const uploadImages = async () => {
    const respObj = { assetArray };
    try {
      await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/tripleFlip/tripleFlipUpload`, respObj);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.titleText}>Triple Flip Upload</Text>
      </View>
      <Button title="Get Images" onPress={getImage} />
      <Button title="Reset Images" onPress={resetImages} />
      <Button title="Pick Images" onPress={pickImageAsync} />
      {/* only show upload image button if there are exactly 3 images to upload */}
      {selectedImages.length === 3
        ? (<Button title="Upload Images" onPress={uploadImages} />) : null }

      {selectedImages
        ? (
          <View>
            {selectedImages.map((imageUri) => (
              <View>
                <Image
                  key={imageUri.uri}
                  source={{ uri: imageUri.uri }}
                  style={{ width: 200, height: 200 }}
                />
                <Text>
                  {imageUri.assetId}
                  {' '}
                </Text>
              </View>

            ))}
          </View>
        ) : null}
      <View />
      {displayedImages
        ? (
          <View>
            {displayedImages.map((imageUri) => (
              <View>
                <Image
                  key={imageUri}
                  source={{ uri: imageUri }}
                  style={{
                    width: 200, height: 200, borderColor: 'red', borderWidth: 5,
                  }}
                />
              </View>

            ))}
          </View>
        ) : null}
    </ScrollView>
  );
}
