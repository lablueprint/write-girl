import React, { useEffect, useState } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151716',
  },
  message: {
    fontSize: 24,
    paddingHorizontal: 25,
    marginBottom: 180,
    color: '#FFFFFF',
  },
  reshuffleButton: {
    backgroundColor: '#84C2C9',
    marginTop: Dimensions.get('window').height / 2.2,
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
    <View style={styles.container}>
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
    </View>
  );
}
