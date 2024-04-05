import React, { useEffect, useState } from 'react';
import {
  StyleSheet, Text, View, Button,
} from 'react-native';
import axios from 'axios';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
      <Text>{pocketPrompt}</Text>
      <Button onPress={handleGetPocketPrompt} title="Reshuffle" />
    </View>
  );
}
