import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  card: {
    height: '80%',
    width: screenWidth * 0.9,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
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
        {text}
        {screenWidth}
      </Text>
    </View>
  );
}

HomeScreenCard.propTypes = {
  text: PropTypes.string.isRequired,
};
