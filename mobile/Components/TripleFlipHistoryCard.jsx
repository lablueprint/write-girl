import React, { useState } from 'react';
import {
  StyleSheet, View, Text, Dimensions, TouchableOpacity,
} from 'react-native';
import Animated, {
  useAnimatedStyle, useSharedValue, withTiming, withDelay, withSpring,
} from 'react-native-reanimated';
import PropTypes from 'prop-types';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const cardHeight = screenHeight * 0.20;
const cardWidth = screenWidth * 0.9;
const expandBoxHeight = 0.35 * cardHeight;
const expandBoxWidth = 0.15 * cardWidth;

const styles = StyleSheet.create({
  card: {
    borderRadius: '20',
    width: cardWidth,
    marginTop: '5%',
  },
  header: {
    backgroundColor: '#19333D',
    flex: 'row',
    flexDirection: 'row',
    paddingLeft: cardWidth * 0.05,
    paddingTop: cardHeight * 0.1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: cardHeight * 0.35,
    width: cardWidth * 0.85,
  },
  headerText: {
    fontSize: 26,
    fontWeight: '900',
  },
  expand: {
    backgroundColor: '#151716',
    height: expandBoxHeight,
    width: expandBoxWidth,
    borderBottomLeftRadius: 20,
    marginLeft: '-15%',
  },
  arrow: {
    backgroundColor: '#BFD25A',
    height: expandBoxWidth * 0.5,
    width: '12.5%',
    borderRadius: 20,
  },
});

const animationDuration = 350;

function CustomLayoutTransition(values) {
  'worklet';

  return {
    animations: {
      originY: withTiming(values.targetOriginY, { duration: animationDuration }),
      originX: withTiming(values.targetOriginX, { duration: animationDuration }),
      height: withTiming(values.targetHeight, { duration: animationDuration }),
    },
    initialValues: {
      originY: values.currentOriginY,
      originX: values.currentOriginX,
      height: values.currentHeight,
    },
  };
}

// Pulls the associated Triple Flip from AWS with the respective flipID :D
export default function TripleFlipHistoryCard({ flipId, date }) {
  const [expanded, setExpanded] = useState(false);
  const current = new Date(date);
  const dateInfo = current.toLocaleDateString('en-US', { weekday: 'long' }).split(', ');
  // Query for the flip id here!
  const tripleFlip = ['hello', 'world', 'card'];
  return (
    <Animated.View
      layout={CustomLayoutTransition}
      style={styles.card}
    >
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <View>
          <View style={styles.header}>
            <Text style={[styles.headerText, { color: '#BFD25A' }]}>
              {dateInfo[0]}
              ,
            </Text>
            <Text style={[styles.headerText, { color: '#FFF' }]}>{dateInfo[1]}</Text>
          </View>

          <View style={{
            backgroundColor: '#19333D', height: cardHeight * 0.08, width: cardWidth, marginTop: -0.08 * cardHeight,
          }}
          />
        </View>

        <View style={styles.expand}>
          <TouchableOpacity
            style={{
              paddingVertical: '10%', paddingHorizontal: '10%', height: expandBoxHeight, width: expandBoxWidth,
            }}
            onPress={() => { setExpanded(!expanded); }}
          >
            <Animated.View
              layout={CustomLayoutTransition}
              style={
                [styles.arrow, { transform: [{ rotate: '90deg' }], top: expanded ? '40%' : '-8%', right: '-45%' }]
              }
            />
            <Animated.View
              layout={CustomLayoutTransition}
              style={
                [styles.arrow, { top: '-40%', right: expanded ? '-20%' : '-75%' }]
              }
            />
            <Animated.View
              style={{
                backgroundColor: '#BFD25A', height: expandBoxWidth * 0.6, width: '12.5%', borderRadius: 20, transform: [{ rotate: '-135deg' }], top: '-100%', right: '-50%',
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Animated.View
        layout={CustomLayoutTransition}
        style={{
          display: 'flex', flexDirection: 'column', rowGap: '5%', backgroundColor: '#19333D', borderTopRightRadius: '20', borderBottomRightRadius: '20', borderBottomLeftRadius: '20', alignItems: 'center', paddingTop: '2.5%', paddingBottom: '2.5%',
        }}
      >
        {
          tripleFlip.map((flipTopic) => (
            <Animated.View
              layout={CustomLayoutTransition}
              style={{
                height: expanded ? 2 * expandBoxHeight : expandBoxHeight, backgroundColor: '#D9D9D9BF', width: '95%', paddingHorizontal: '5%', paddingVertical: '5%', borderRadius: 20, alignItems: 'center',
              }}
            >
              <Text style={{ fontSize: 25, fontWeight: 600 }}>
                { flipTopic }
              </Text>
            </Animated.View>
          ))
        }
      </Animated.View>

    </Animated.View>
  );
}
TripleFlipHistoryCard.propTypes = {
  flipId: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};
