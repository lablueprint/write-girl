import React, { useState } from 'react';
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
  const [pepTalk, setPepTalk] = useState('hi');
  const handleGetPepTalk = async () => {
    try {
      const randomPepTalk = await axios.get('http://localhost:4000/pepTalk/get');
      console.log(randomPepTalk);
      setPepTalk(randomPepTalk);
      return randomPepTalk.data;
    } catch (err) {
      console.log(err);
    }
    return 'True';
  };

  return (
    <View style={styles.container}>
      <Text>Pep Talk Screen</Text>
      <Button onClick={handleGetPepTalk} title="Get random pep talk" />
      <Text>{pepTalk}</Text>
    </View>
  );
}
