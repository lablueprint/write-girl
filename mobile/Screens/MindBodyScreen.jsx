import React, { useState, useEffect } from 'react';
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

export default function MindBodyScreen() {
  const [mindBody, setMindBody] = useState({});

  // Retrieves and sets mindBody to a random mindBody json object from database
  const getRandomMindBody = async () => {
    try {
      const res = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/mindBody/getRandom`);
      setMindBody(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  // Run on first render
  useEffect(() => {
    getRandomMindBody();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Mind and Body Screen</Text>
      <Text>Description: </Text>
      <Text>{mindBody.activity}</Text>
      <Text>Duration: </Text>
      <Text>{mindBody.duration}</Text>
      <Button onPress={() => { getRandomMindBody(); }} title="Get New Mind and Body" />
    </View>
  );
}
