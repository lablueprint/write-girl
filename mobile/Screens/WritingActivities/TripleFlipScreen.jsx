import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, Dimensions, Button,
} from 'react-native';
import PropTypes from 'prop-types';
import Animated, {
  useAnimatedStyle, useSharedValue, withTiming, withDelay, withSpring,
} from 'react-native-reanimated';
import TripleFlipCard from '../../Components/TripleFlipCard';

const logo = require('../../assets/logo.png');

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const cardHeight = screenHeight * 0.16;
const animationDuration = 350;

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
      originY: withTiming(values.targetOriginY, { duration: animationDuration }),
      originX: withTiming(values.targetOriginX, { duration: animationDuration }),
    },
    initialValues: {
      originY: values.currentOriginY,
      originX: values.currentOriginX,
    },
  };
}

const SHUFFLE_OFFSET = 50;
const CHOSEN_CARDS_OFFSET = cardHeight * 0.25;
const locationsY = [
  [2 * cardHeight, cardHeight, 0, -cardHeight + 10, -2 * cardHeight + 20],
  [2 * cardHeight, cardHeight, 0, -cardHeight, -2 * cardHeight],
  [0, 0, 0, 0, 0],
  [2 * cardHeight + 2*SHUFFLE_OFFSET, cardHeight - 3 * SHUFFLE_OFFSET, 0, -cardHeight - 4 * SHUFFLE_OFFSET, -2 * cardHeight + 1*SHUFFLE_OFFSET],
  [2 * cardHeight - SHUFFLE_OFFSET, cardHeight + 3*SHUFFLE_OFFSET, 0 - SHUFFLE_OFFSET, -cardHeight, -2 * cardHeight - 4 * SHUFFLE_OFFSET],
  [2 * cardHeight -3*SHUFFLE_OFFSET, cardHeight - 4*SHUFFLE_OFFSET, 0 + 2*SHUFFLE_OFFSET, -cardHeight +1*SHUFFLE_OFFSET, -2 * cardHeight -1*SHUFFLE_OFFSET],
  [2 * cardHeight - 2 * SHUFFLE_OFFSET, cardHeight + 3 * SHUFFLE_OFFSET, 0 - SHUFFLE_OFFSET, -cardHeight, -2 * cardHeight - 4 * SHUFFLE_OFFSET],
  [2 * cardHeight, cardHeight, 0, -cardHeight + 10, -2 * cardHeight + 20],
  [2 * cardHeight, cardHeight, 0, -cardHeight, -2 * cardHeight],
  [2 * cardHeight, cardHeight, 0, -cardHeight, -2 * cardHeight],
  [2 * cardHeight, 0, 0, 0, 0],
  [cardHeight - CHOSEN_CARDS_OFFSET, cardHeight, 0, 0, 0],
  [CHOSEN_CARDS_OFFSET, 2 * CHOSEN_CARDS_OFFSET, 3 * CHOSEN_CARDS_OFFSET, 0, 0],
];

const locationsX = [
  [0, 0, 0, 5, 10],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 5, 10],
  [0, 0, 0, 0, 0],
  [-screenWidth, -screenWidth, -screenWidth, -screenWidth, -screenWidth],
  [0, -screenWidth, -screenWidth, -screenWidth, -screenWidth],
  [0, 0, -screenWidth, -screenWidth, -screenWidth],
  [0, 0, 0, -screenWidth, -screenWidth],
];

export default function TripleFlipScreen() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (step >= locationsY.length - 1 || step === 0) {
      return;
    }
    setTimeout(() => {
      setStep(step + 1);
    }, animationDuration);
  }, [step]);
  const animateShuffle = () => {
    // for (let i = step + 1; i < locationsY.length; i += 1) {
    //   setStep(i);
    //   // console.log(step);
    // }
    setStep(1);
  };

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
      <Button title="animate" onPress={() => { animateShuffle(); }} />
      <View style={styles.cardContainer}>
        <Animated.View
          layout={CustomLayoutTransition}
          style={[styles.card, { zIndex: -1, top: locationsY[step][0], left: locationsX[step][0] }]}
        >
          <TripleFlipCard image={logo} color="red" />
        </Animated.View>
        <Animated.View
          layout={CustomLayoutTransition}
          style={[styles.card, { zIndex: 0, top: locationsY[step][1], left: locationsX[step][1] }]}
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
