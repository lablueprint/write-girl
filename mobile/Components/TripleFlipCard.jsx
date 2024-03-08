import {
  View, StyleSheet, Text, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import Animated, {
  useSharedValue, useAnimatedStyle, withTiming, interpolate,
} from 'react-native-reanimated';
import { useEffect } from 'react';

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    borderWidth: 8,
    flex: 1,
  },
  image: {
    width: '20%',
    height: '30%',
    position: 'absolute',
    top: 10,
    right: 10,
  },
  cardFront: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    backfaceVisibility: 'hidden',
    zIndex: 10,
  },
  cardBack: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    backfaceVisibility: 'hidden',
    zIndex: -10,
    paddingHorizontal: '5%',
    paddingVertical: '5%',
  },
});

const palette = {
  red: {
    backgroundColor: '#DE5B45',
    borderColor: '#D95B30',
  },
  blue: {
    backgroundColor: '#5BB2CF',
    borderColor: '#3E99B7',
  },
  green: {
    backgroundColor: '#BFD25A',
    borderColor: '#A7C020',
  },
};

export default function TripleFlipCard({ image, color, sideShown }) {
  const spin = useSharedValue(sideShown);

  useEffect(() => {
    spin.value = sideShown;
  }, [sideShown]);

  const frontAnimatedStyle = useAnimatedStyle(() => {
    const spinVal = interpolate(spin.value, [0, 1], [0, 180]);
    console.log(spin.value);
    return {
      transform: [
        {
          rotateY: withTiming(`${spinVal}deg`, { duration: 1000 }),
        },
      ],
    };
  }, []);

  const backAnimatedStyle = useAnimatedStyle(() => {
    const spinVal = interpolate(spin.value, [0, 1], [180, 0]);
    return {
      transform: [
        {
          rotateY: withTiming(`${spinVal}deg`, { duration: 1000 }),
        }, {
          scaleX: withTiming(-1, 1000),
        },
      ],
    };
  }, []);
  return (
    <Animated.View style={[styles.card, palette[color], frontAnimatedStyle]}>
      <Animated.View accessible accessibilityRole="button" style={[styles.cardFront, palette[color], frontAnimatedStyle]}>
        <Image style={styles.image} source={image} />
      </Animated.View>
      <Animated.View style={[styles.cardBack, backAnimatedStyle]}>
        <Text>
          Back! This will be the actual card image.
        </Text>
      </Animated.View>
    </Animated.View>
  );
}

TripleFlipCard.propTypes = {
  image: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  sideShown: PropTypes.number.isRequired,
};
