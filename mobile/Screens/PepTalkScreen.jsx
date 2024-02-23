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

export default function PepTalkScreen() {
  const [pepTalk, setPepTalk] = useState('');
  const handleGetPepTalk = async () => {
    try {
      const randomPepTalk = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/pepTalk/get`, { timeout: 20000 });
      setPepTalk(randomPepTalk.data);
      console.log('peptalk: ', randomPepTalk.data);
      return randomPepTalk.data;
    } catch (err) {
      console.log(err);
    }
    return 'True';
  };

  useEffect(() => {
    handleGetPepTalk();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Pep Talk Screen</Text>
      <Button onPress={handleGetPepTalk} title="Get random pep talk" />
      <Text>{pepTalk}</Text>
    </View>
  );
}
