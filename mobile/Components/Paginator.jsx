import { React, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  View, StyleSheet, Animated, useWindowDimensions,
} from 'react-native';
import welcomeIcon from '../assets/welcomeIcon.png';

const styles = StyleSheet.create({
  dot: {
    height: 10,
    backgroundColor: '#000',
    borderRadius: 5,
    marginHorizontal: 5,
  },
});

export default function Paginator({ data, scrollX }) {
  const { width } = useWindowDimensions();

  return (
    <View style={{ flexDirection: 'row', height: 64 }}>
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

        const dotBackgroundColor = scrollX.interpolate({
          inputRange,
          outputRange: ['rgba(0,0,0,0.3)', 'rgba(0,0,0,1)', 'rgba(0,0,0,0.3)'],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            style={[
              styles.dot,
              {
                width: 10,
                backgroundColor: dotBackgroundColor,
              },
            ]}
            key={i.toString()}
          />
        );
      })}
    </View>
  );
}

Paginator.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape,
  ).isRequired,
  scrollX: PropTypes.instanceOf(Animated.Value).isRequired, // Assuming scrollX is an Animated.Value
};
