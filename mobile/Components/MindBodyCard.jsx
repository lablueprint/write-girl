import React from 'react';
import {
  View, Text, Dimensions, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  card: {
    height: '100%',
    width: Dimensions.get('window').width * 0.8,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    textAlign: 'center',
    lineHeight: 24,
    fontSize: 16,
  },
});

export default function MindBodyCard({ activity, duration }) {
  return (
    <View
      style={styles.card}
    >
      <Text style={styles.cardText}>
        {activity}
      </Text>
      <Text style={styles.cardText}>
        {'Duration: '}
        {duration}
      </Text>
    </View>
  );
}

MindBodyCard.propTypes = {
  activity: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
};
