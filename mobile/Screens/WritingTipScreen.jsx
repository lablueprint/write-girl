import { React, useState, useEffect } from 'react';
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

export default function WritingTipScreen() {
  const [writingTip, setWritingTip] = useState('');
  const handleGetWritingTip = async () => {
    try {
      const randomWritingTip = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/writingTip/get`, { timeout: 20000 });
      setWritingTip(randomWritingTip.data);
      return randomWritingTip.data;
    } catch (err) {
      console.log(err);
    }
    return 'True';
  };

  useEffect(() => {
    // handleGetWritingTip(); unsure why we need this
  }, []);

  return (
    <View style={styles.container}>
      <Text>Writing Tip Screen</Text>
      <Text>{writingTip}</Text>
      <Button
        onPress={handleGetWritingTip}
        title="Get writing tip!"
        accessibilityLabel="Get a writing tip!"
      />
    </View>
  );
}
