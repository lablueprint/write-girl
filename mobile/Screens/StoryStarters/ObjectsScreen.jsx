import React, { useState } from 'react';
import {
  StyleSheet, Text, View, Pressable, Image,
} from 'react-native';
import axios from 'axios';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#43456f',
    alignItems: 'center',
  },
  heading: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    margin: 16,
  },
  body: {
    color: '#fff',
    fontSize: 16,
  },
  randomButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 50,
    backgroundColor: 'black',
    marginTop: 64,
    width: '80%',
  },
  saveResultButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    borderColor: 'black',
    borderWidth: 1,
    marginTop: 16,
    width: '80%',
    position: 'absolute',
  },
  imageContainer: {
    overflow: 'hidden',
    alignItems: 'center',
    backgroundColor: '#ccc',
    position: 'relative',
    height: '30%',
    width: '65%',
    margin: 16,
  },
  saveResultButtonBody: {
    color: 'black',
    fontSize: 16,
  },
});

export default function ObjectsScreen() {
  const [object, setObject] = useState('Get a random object for your story');
  const [resultShown, setResultShown] = useState(false);
  const [saved, setSaved] = useState(false);

  const checkIfSaved = async (value) => {
    try {
      const userId = '65bd4fce479f4d7759aa4bc6';
      const response = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/user/checkIfSavedItem/${userId}/${value}`);
      setSaved(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
    }
    return false;
  };

  const getObject = async () => {
    try {
      const randomItem = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/item/get`, { timeout: 20000 });
      setObject(randomItem.data);
      setResultShown(true);
      checkIfSaved(randomItem.data._id);
      return randomItem.data;
    } catch (err) {
      console.log(err);
    }
    return true;
  };

  const saveItem = async () => {
    const userId = '65bd4fce479f4d7759aa4bc6';
    const date = new Date();
    const objectJSON = {
      date: date.toDateString(),
      objectID: object._id,
    };

    try {
      if (!saved && userId) {
        const response = await axios.patch(`${process.env.EXPO_PUBLIC_SERVER_URL}/user/addItems/${userId}`, objectJSON);
        checkIfSaved(object._id);
        return response;
      }
      console.log('User ID is null or already saved.');
    } catch (err) {
      console.log(err);
    }
    return -1;
  };

  const removeItem = async () => {
    const userId = '65bd4fce479f4d7759aa4bc6';
    const objectJSON = {
      objectID: object._id,
    };

    try {
      if (saved && userId) {
        const response = await axios.patch(`${process.env.EXPO_PUBLIC_SERVER_URL}/user/removeItems/${userId}`, objectJSON);
        checkIfSaved(object._id);
        return response;
      }
      console.log('User ID is null or it is not already saved.');
    } catch (err) {
      console.log(err);
    }
    return -1;
  };

  const saveButton = () => {
    let button = <View />;
    if (resultShown && !saved) {
      button = (
        <Pressable style={styles.saveResultButton} onPress={saveItem}>
          <Text style={styles.saveResultButtonBody}>Save Result</Text>
        </Pressable>
      );
    } else if (resultShown) {
      button = (
        <Pressable style={styles.saveResultButton} onPress={removeItem}>
          <Text style={styles.saveResultButtonBody}>Unsave Result</Text>
        </Pressable>
      );
    }
    return button;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Objects</Text>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
        />
      </View>
      <View>
        {resultShown ? (
          <Text style={styles.heading}>Object Result</Text>
        ) : <Text style={styles.heading}>Object!</Text>}
      </View>
      <Text style={styles.body}>{object.item}</Text>
      <Pressable style={styles.randomButton} onPress={getObject}>
        <Text style={styles.body}>Randomize</Text>
      </Pressable>
      <View style={styles.container}>
        {saveButton()}
      </View>
    </View>
  );
}
