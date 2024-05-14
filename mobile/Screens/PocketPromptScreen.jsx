import React, { useEffect, useState } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, Dimensions, ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import pocketPromptBackground from '../assets/pocket-prompt.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  message: {
    fontSize: 24,
    paddingHorizontal: 25,
    position: 'absolute',
    marginTop: Dimensions.get('window').height / 2,
    color: '#FFFFFF',
  },
  reshuffleButton: {
    backgroundColor: '#84C2C9',
    marginTop: Dimensions.get('window').height / 1.3,
    alignSelf: 'center',
    borderRadius: 15,
    paddingVertical: Dimensions.get('window').width / 25,
    paddingHorizontal: Dimensions.get('window').width / 3,
  },
  reshuffleText: {
    borderColor: '#000',
    fontSize: 20,
  },
});

export default function PocketPromptScreen() {
  const [pocketPrompt, setPocketPrompt] = useState('');
  const handleGetPocketPrompt = async () => {
    try {
      const randomPocketPrompt = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/pocketPrompt/get`, { timeout: 20000 });
      setPocketPrompt(randomPocketPrompt.data);
      return randomPocketPrompt.data;
    } catch (err) {
      console.log(err);
    }
    return 'True';
  };

  useEffect(() => {
    handleGetPocketPrompt();
  }, []);

  return (
    <ImageBackground source={pocketPromptBackground} style={styles.container}>
      <Text style={styles.message}>{pocketPrompt}</Text>
      <TouchableOpacity onPress={handleGetPocketPrompt}>
        <LinearGradient
          colors={['#84C2C9', '#BFD25A']}
          style={styles.reshuffleButton}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.reshuffleText}>Reshuffle</Text>
        </LinearGradient>
      </TouchableOpacity>
    </ImageBackground>
  );
}
