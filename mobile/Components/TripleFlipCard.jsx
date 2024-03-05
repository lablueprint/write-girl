import {
  View, StyleSheet, Text, Image,
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
  },
  cardBack: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    backfaceVisibility: 'hidden',
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
    return {
      transform: [
        {
          rotateY: withTiming(`${spinVal}deg`, { duration: 500 }),
        },
      ],
    };
  }, []);

  return (
    <View onPress={() => { spin.value = spin.value ? 0 : 1; }} style={[styles.card, palette[color]]}>
      <Animated.View style={[styles.cardFront, frontAnimatedStyle]}>
        <Image style={styles.image} source={image} />
      </Animated.View>
      <Animated.View style={styles.cardBack}>
        <Text>
          Back!
        </Text>
      </Animated.View>
    </View>
  );
}

TripleFlipCard.propTypes = {
  image: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};
