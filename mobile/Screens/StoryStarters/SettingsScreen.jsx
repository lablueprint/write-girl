import React, { useState } from 'react';
import {
  StyleSheet, Text, View, Pressable, Image,
} from 'react-native';
import axios from 'axios';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#43c6be',
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

export default function SettingsScreen() {
  const [setting, setSetting] = useState('Get a random setting for your story');
  const [resultShown, setResultShown] = useState(false);
  const [saved, setSaved] = useState(false);

  const checkIfSaved = async (value) => {
    try {
      const userId = '65bd4fce479f4d7759aa4bc6';
      const response = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/user/checkIfSavedSetting/${userId}/${value}`);
      setSaved(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
    }
    return false;
  };

  const getSetting = async () => {
    try {
      const randomSetting = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/setting/get`, { timeout: 20000 });
      setSetting(randomSetting.data);
      setResultShown(true);
      checkIfSaved(randomSetting.data._id);
    } catch (err) {
      console.log(err);
    }
    return true;
  };

  const saveSetting = async () => {
    const userId = '65bd4fce479f4d7759aa4bc6';
    const date = new Date();
    const settingJSON = {
      date: date.toDateString(),
      settingID: setting._id,
    };

    try {
      if (!saved && userId) {
        const response = await axios.patch(`${process.env.EXPO_PUBLIC_SERVER_URL}/user/addSettings/${userId}`, settingJSON);
        checkIfSaved(setting._id);
        return response;
      }
      console.log('User ID is null or already saved.');
    } catch (err) {
      console.log(err);
    }
    return -1;
  };

  const removeSetting = async () => {
    const userId = '65bd4fce479f4d7759aa4bc6';
    const settingJSON = {
      settingID: setting._id,
    };

    try {
      if (saved && userId) {
        const response = await axios.patch(`${process.env.EXPO_PUBLIC_SERVER_URL}/user/removeSettings/${userId}`, settingJSON);
        checkIfSaved(setting._id);
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
        <Pressable style={styles.saveResultButton} onPress={saveSetting}>
          <Text style={styles.saveResultButtonBody}>Save Result</Text>
        </Pressable>
      );
    } else if (resultShown) {
      button = (
        <Pressable style={styles.saveResultButton} onPress={removeSetting}>
          <Text style={styles.saveResultButtonBody}>Unsave Result</Text>
        </Pressable>
      );
    }
    return button;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Settings</Text>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
        />
      </View>
      <View>
        {resultShown ? (
          <Text style={styles.heading}>Setting Result</Text>
        ) : <Text style={styles.heading}>Setting!</Text>}
      </View>
      <Text style={styles.body}>{setting.setting}</Text>
      <Pressable style={styles.randomButton} onPress={getSetting}>
        <Text style={styles.body}>Randomize</Text>
      </Pressable>
      <View style={styles.container}>
        {saveButton()}
      </View>
    </View>
  );
}
