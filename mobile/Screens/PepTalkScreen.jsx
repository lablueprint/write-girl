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
  const [pepTalk, setPepTalk] = useState('hi');
  const handleGetPepTalk = async () => {
    console.log('entered');
    try {
      console.log('hihi');
      const randomPepTalk = await axios.get('https://catfact.ninja/fact', { timeout: 5000 }).catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
      console.log(randomPepTalk.data.fact);
      console.log('hi');
      setPepTalk(randomPepTalk.data.fact);
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
