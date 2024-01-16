import React from 'react';
import {
  View, Text,
} from 'react-native';
import PropTypes from 'prop-types';
/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  card: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  text: {
    textAlign: 'center',
    fontSize: 50,
    backgroundColor: 'transparent',
  },
  done: {
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
    backgroundColor: 'transparent',
  },
}); */

export default function MindBodyCard({ activity, duration, boxWidth }) {
  return (
    /*
    <View style={styles.card}>
      <Text>
        Activity:
        {' '}
        {activity}
      </Text>
      <Text>
        Duration:
        {' '}
        {duration}
      </Text>
    </View>
    */
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
