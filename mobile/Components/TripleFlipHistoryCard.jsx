import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  main: {
    paddingVertical: '10%',
    paddingHorizontal: '10%',
  },
});

// Pulls the associated Triple Flip from AWS with the respective flipID :D
export default function TripleFlipHistoryCard({ flipId, date }) {
  return (
    <View>
      <Text>{date}</Text>
      <Text>{flipId}</Text>
    </View>
  );
}
TripleFlipHistoryCard.propTypes = {
  flipId: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};
