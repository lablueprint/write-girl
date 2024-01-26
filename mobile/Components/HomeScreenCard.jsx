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
    backgroundColor: '#fff',
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#888',
  },
});

export default function HomeScreenCard({ text }) {
  return (
    <View
      style={styles.card}
    >
      <Text>
        <TypeWriter typing={1}>{text}</TypeWriter>
      </Text>
    </View>
  );
}

HomeScreenCard.propTypes = {
  text: PropTypes.string.isRequired,
};
