import React, { useEffect } from 'react';
import {
  View, Text, StyleSheet, Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import TypeWriter from 'react-native-typewriter';

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  card: {
    height: '80%',
    width: screenWidth * 0.9,
    backgroundColor: '#E8E8E8',
    borderRadius: 20,
    borderWidth: 0,
    padding: 16,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default function HomeScreenCard({ text }) {
  console.log('HomeScreen card got', text);
  return (
    <View
      style={styles.card}
    >
      <TypeWriter typing={1} minDelay={10} maxDelay={60}>{text}</TypeWriter>
    </View>
  );
}

HomeScreenCard.propTypes = {
  text: PropTypes.string.isRequired,
};
