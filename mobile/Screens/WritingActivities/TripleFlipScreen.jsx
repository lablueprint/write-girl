import React, { useState } from 'react';
import {
  View, Text, StyleSheet, Dimensions, Button,
} from 'react-native';
import PropTypes from 'prop-types';
import Animated, {
  useAnimatedStyle, useSharedValue, withTiming, withDelay, withSpring
} from 'react-native-reanimated';
import TripleFlipCard from '../../Components/TripleFlipCard';

const logo = require('../../assets/logo.png');

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const cardHeight = screenHeight * 0.16;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: '5%',
    paddingTop: '15%',
    weidth: screenWidth,
    height: screenHeight,
    display: 'absolute',
  },
  card: {
    height: cardHeight,
    width: '90%',
    display: 'relative',
  },
  cardContainer: {
    height: '80%',
    display: 'flex',
    alignItems: 'center',
  },
});

function CustomLayoutTransition(values) {
  'worklet';

  return {
    animations: {
      originY: withTiming(values.targetOriginY, { duration: 500 }),
      originX: withTiming(values.targetOriginX, { duration: 500 }),
    },
    initialValues: {
      originY: values.currentOriginY,
      originX: values.currentOriginX,
    },
  };
}

const OFFSET = 50;
const locationsY = [
  [2 * cardHeight, cardHeight, 0, -cardHeight + 10, -2 * cardHeight + 20],
  [2 * cardHeight, cardHeight, 0, -cardHeight, -2 * cardHeight],
  [0, 0, 0, 0, 0],
  [2 * cardHeight + 2*OFFSET, cardHeight - 3 * OFFSET, 0, -cardHeight - 4 * OFFSET, -2 * cardHeight + 1*OFFSET],
  [2 * cardHeight - OFFSET, cardHeight + 3*OFFSET, 0 - OFFSET, -cardHeight, -2 * cardHeight - 4 * OFFSET],
  [2 * cardHeight -3*OFFSET, cardHeight - 4*OFFSET, 0 + 2*OFFSET, -cardHeight +1*OFFSET, -2 * cardHeight -1*OFFSET],
  [2 * cardHeight - 2 * OFFSET, cardHeight + 3 * OFFSET, 0 - OFFSET, -cardHeight, -2 * cardHeight - 4 * OFFSET],
  [2 * cardHeight + 2*OFFSET, cardHeight - 3 * OFFSET, 0, -cardHeight - 4 * OFFSET, -2 * cardHeight + 1*OFFSET],
  [2 * cardHeight - OFFSET, cardHeight + 3*OFFSET, 0 - OFFSET, -cardHeight, -2 * cardHeight - 4 * OFFSET],
  [2 * cardHeight -3*OFFSET, cardHeight - 4*OFFSET, 0 + 2*OFFSET, -cardHeight +1*OFFSET, -2 * cardHeight -1*OFFSET],
  [2 * cardHeight - 2 * OFFSET, cardHeight + 3 * OFFSET, 0 - OFFSET, -cardHeight, -2 * cardHeight - 4 * OFFSET],
  [2 * cardHeight, cardHeight, 0, -cardHeight + 10, -2 * cardHeight + 20],
  [2 * cardHeight, cardHeight, 0, -cardHeight, -2 * cardHeight],
  [2 * cardHeight, cardHeight, 0, -cardHeight, -2 * cardHeight],
];

const locationsX = [
  [0, 0, 0, 5, 10],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 5, 10],
  [0, 0, 0, 0, 0],
  [-screenWidth, -screenWidth, -screenWidth, -screenWidth, -screenWidth],
];

export default function TripleFlipScreen() {
  const [step, setStep] = useState(0);
  return (
    <View style={styles.container}>
      <View>
        <Text>
          Triple Flips
        </Text>
        <Text>
          Hit the button. Let the collection of ojects and words inspire a poem,
          story or even a song. Don`&apos`t think...
        </Text>
      </View>
      <Button title="animate" onPress={() => { setStep(step + 1); }} />
      <View style={styles.cardContainer}>
        <Animated.View
          layout={CustomLayoutTransition}
          style={[styles.card, { zIndex: -1, top: locationsY[step][0], left: locationsX[step][0] }]}
        >
          <TripleFlipCard image={logo} color="red" />
        </Animated.View>
        <Animated.View
          layout={CustomLayoutTransition}
          style={[styles.card, { zIndex: 0, top: locationsY[step][1], left: locationsX[step][1]}]}
        >
          <TripleFlipCard image={logo} color="green" />
        </Animated.View>
        <Animated.View
          layout={CustomLayoutTransition}
          style={[styles.card, { zIndex: 1, top: locationsY[step][2], left: locationsX[step][2] }]}
        >
          <TripleFlipCard image={logo} color="blue" />
        </Animated.View>
        <Animated.View
          layout={CustomLayoutTransition}
          style={[styles.card, { zIndex: 2, top: locationsY[step][3], left: locationsX[step][3] }]}
        >
          <TripleFlipCard image={logo} color="red" />
        </Animated.View>
        <Animated.View
          layout={CustomLayoutTransition}
          style={[styles.card, { zIndex: 3, top: locationsY[step][4], left: locationsX[step][4] }]}
        >
          <TripleFlipCard image={logo} color="green" />
        </Animated.View>
      </View>
    </View>
  );
}

TripleFlipScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
