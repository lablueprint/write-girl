import React from 'react';
import {
  View, Text, Dimensions, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  card: {
    height: 300,
    width: 400,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    padding: 20,
  },
});

export default function ActivityNavigationCard({ activity, description, backgroundColor }) {
  return (
    <View style={styles.container}>
      <View style={[styles.card, { backgroundColor }]}>
        <Text>{activity}</Text>
        <Text>{description}</Text>
      </View>
    </View>
  );
}

ActivityNavigationCard.propTypes = {
  activity: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
};
