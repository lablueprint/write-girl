import React from 'react';
import {
  View, Text, Dimensions, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  card: {
    height: '100%',
    width: Dimensions.get('window').width * 0.8,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    padding: 20,
  },
});

export default function MindBodyCard({ activity, duration }) {
  return (
    <View
      style={styles.card}
    >
      <Text>
        {'Activity: '}
        {activity}
      </Text>
      <Text>
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
