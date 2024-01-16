import React from 'react';
import {
  View, Text,
} from 'react-native';
import PropTypes from 'prop-types';

export default function MindBodyCard({ activity, duration, boxWidth }) {
  return (
    <View
      style={{
        height: '100%',
        width: boxWidth,
        borderRadius: 24,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        padding: 20,
      }}
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
  boxWidth: PropTypes.number.isRequired,
};
