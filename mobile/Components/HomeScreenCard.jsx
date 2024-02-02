import React from 'react';
import {
  View, StyleSheet, Dimensions, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import TypeWriter from 'react-native-typewriter';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  card: {
    height: screenHeight * 0.25,
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
  button: {
    backgroundColor: '#B4B4B4',
    borderRadius: 20,
    width: 30,
    height: 30,
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});

export default function HomeScreenCard({ text, getNewText }) {
  return (
    <View
      style={styles.card}
    >
      <TypeWriter typing={1} minDelay={10} maxDelay={60}>{text}</TypeWriter>
      <TouchableOpacity onPress={getNewText} style={styles.button} />
    </View>
  );
}

HomeScreenCard.propTypes = {
  text: PropTypes.string.isRequired,
  getNewText: PropTypes.func.isRequired,
};
