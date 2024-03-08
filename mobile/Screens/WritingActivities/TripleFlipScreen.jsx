import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, Dimensions, Button, TouchableOpacity,
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
    backgroundColor: '#21424F',
  },
  titleText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    marginTop: 10,
  },
  card: {
    height: cardHeight,
    width: '90%',
    display: 'relative',
  },
  cardContainer: {
    height: '72%',
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#BFD25A',
    color: '#fff',
    padding: 10,
    alignItems: 'center',
    fontSize: 16,
    borderRadius: 20,
    width: '80%',
    alignSelf: 'center',
    marginTop: '-12%',
  },
  buttonText: {
    color: '#21424F',
    fontSize: 16,
    fontWeight: 'bold',
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
const CHOSEN_CARDS_OFFSET = cardHeight * 0.20;
const OFFSET = cardHeight * 0.30;
const locationsY = [
  [2 * cardHeight - OFFSET, cardHeight - OFFSET, 0 - OFFSET, -cardHeight + 10 - OFFSET, -2 * cardHeight + 20 - OFFSET],
  [2 * cardHeight - OFFSET, cardHeight - OFFSET, 0 - OFFSET, -cardHeight - OFFSET, -2 * cardHeight - OFFSET] ,
  [0, - CHOSEN_CARDS_OFFSET, - 2*CHOSEN_CARDS_OFFSET,- 3* CHOSEN_CARDS_OFFSET,- 4*CHOSEN_CARDS_OFFSET],
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
  [0, 0, 0, -screenWidth, -screenWidth],
];

export default function TripleFlipScreen() {
  const [step, setStep] = useState(0);
  const [shuffleButtonShow, setShuffleButtonShow] = useState(true);
  const [flipButtonShow, setFlipButtonShow] = useState(false);
  const [cardShowBack, setCardShowBack] = useState(0);

  useEffect(() => {
    if (step === 0) {
      return;
    }
    if (step >= locationsY.length - 1) {
      setFlipButtonShow(true);
      return;
    }
    setTimeout(() => {
      setStep(step + 1);
    }, animationDuration);
  }, [step]);

  const animateShuffle = () => {
    setStep(1);
    setShuffleButtonShow(false);
  };

  const flipCards = () => {
    setCardShowBack(1);
    setFlipButtonShow(false);
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.titleText}>
          Triple Flips
        </Text>
        <Text style={styles.text}>
          Hit the button. Let the collection of ojects and words inspire a poem,
          story or even a song. Don&apos;t think...
        </Text>
      </View>
      <View style={styles.cardContainer}>
        <Animated.View
          layout={CustomLayoutTransition}
          style={[styles.card, { zIndex: -1, top: locationsY[step][0], left: locationsX[step][0] }]}
        >
          <TripleFlipCard image={logo} color="red" sideShown={cardShowBack} />
        </Animated.View>
        <Animated.View
          layout={CustomLayoutTransition}
          style={[styles.card, { zIndex: 0, top: locationsY[step][1], left: locationsX[step][1] }]}
        >
          <TripleFlipCard image={logo} color="green" sideShown={cardShowBack} />
        </Animated.View>
        <Animated.View
          layout={CustomLayoutTransition}
          style={[styles.card, { zIndex: 1, top: locationsY[step][2], left: locationsX[step][2] }]}
        >
          <TripleFlipCard image={logo} color="blue" sideShown={cardShowBack} />
        </Animated.View>
        <Animated.View
          layout={CustomLayoutTransition}
          style={[styles.card, { zIndex: 2, top: locationsY[step][3], left: locationsX[step][3] }]}
        >
          <TripleFlipCard image={logo} color="red" sideShown={cardShowBack} />
        </Animated.View>
        <Animated.View
          layout={CustomLayoutTransition}
          style={[styles.card, { zIndex: 3, top: locationsY[step][4], left: locationsX[step][4] }]}
        >
          <TripleFlipCard image={logo} color="green" sideShown={cardShowBack} />
        </Animated.View>
      </View>
      {
        shuffleButtonShow
        && (
          <TouchableOpacity style={styles.button} onPress={animateShuffle}>
            <Text style={styles.buttonText}>Shuffle</Text>
          </TouchableOpacity>
        )
      }
      {
        flipButtonShow
        && (
          <TouchableOpacity style={styles.button} onPress={flipCards} >
            <Text style={styles.buttonText}>Flip</Text>
          </TouchableOpacity>
        )
      }
    </View>
  );
}

TripleFlipScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
