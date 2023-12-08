import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MindBodyCard from '../Components/MindBodyCard';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function MindBodyScreen() {
  return (
    <View style={styles.container}>
      <Text>Mind and Body Screen</Text>
      <MindBodyCard />
    </View>
  );
}
