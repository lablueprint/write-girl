import { React, useState } from 'react';
import {
  View, Button, StyleSheet, Text,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function OnboardingScreen() {
  return (
    <View style={styles.container}>
      <Text>Hi</Text>
    </View>
  );
}
