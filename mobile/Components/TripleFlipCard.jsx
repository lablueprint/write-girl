import {
  View, StyleSheet, Text, Image, TouchableOpacity, Button, Pressable,
} from 'react-native';
import PropTypes from 'prop-types';
import Animated, {
  useSharedValue, useAnimatedStyle, withTiming, interpolate,
} from 'react-native-reanimated';

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    borderWidth: 8,
    flex: 1,
    justifyContent: 'center', // Vertically center
    alignItems: 'center', // Horizontally center
  },
  image: {
    width: '50%',
    height: '80%',
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

export default function TripleFlipCard({ image, color }) {
  const spin = useSharedValue(0);
  // WriteGirl logo

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
  console.log(spin.value);
  return (
    <Animated.View style={[styles.card, palette[color], frontAnimatedStyle]}>
      <Animated.View accessible accessibilityRole="button" style={[styles.cardFront, palette[color], frontAnimatedStyle]}>
        <Pressable onPress={() => { spin.value = spin.value ? 0 : 1; console.log('pressed'); }}>
          <Image style={styles.image} source={image} />
        </Pressable>
      </Animated.View>
      <Animated.View style={[styles.cardBack, backAnimatedStyle]}>
        <Pressable>
          <Text>
            Back!
          </Text>
        </Pressable>
      </Animated.View>
    </Animated.View>
  );
}

TripleFlipCard.propTypes = {
  image: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};
