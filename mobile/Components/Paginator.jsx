import { React } from 'react';
import PropTypes from 'prop-types';
import {
  View, StyleSheet, Animated, useWindowDimensions,
} from 'react-native';

const styles = StyleSheet.create({
  dot: {
    height: 9.7,
    color: '#fff',
    borderRadius: 5,
    marginHorizontal: 2,
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
          outputRange: ['rgba(255,255,255,0.6)', 'rgba(191, 210, 90, 1)', 'rgba(191, 210, 90, 1)'],
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
  scrollX: PropTypes.instanceOf(Animated.Value).isRequired,
};
