import React, { useState } from 'react';
import {
  StyleSheet, View, Text, Dimensions, TouchableOpacity,
} from 'react-native';
import Animated, {
  withTiming,
} from 'react-native-reanimated';
import PropTypes from 'prop-types';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const cardHeight = screenHeight * 0.20;
const cardWidth = screenWidth * 0.9;
const expandBoxHeight = 0.35 * cardHeight;
const expandBoxWidth = 0.15 * cardWidth;

const textColors = {
  'Plot Points': '#5BB2CF',
  Settings: '#BFD25A',
  Objects: '#7BAC8A',
  Traits: '#C97621',
};

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
    fontSize: 22,
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
    height: expandBoxWidth * 0.5,
    width: '12.5%',
    borderRadius: 20,
  },
  topicText: {
    fontSize: 20,
    fontWeight: 600,
  },
  topPart: {
    backgroundColor: '#19333D',
    height: cardHeight * 0.08,
    width: cardWidth,
    marginTop: -0.08 * cardHeight,
  },
  diagonalArrow: {
    height: expandBoxWidth * 0.6,
    width: '12.5%',
    borderRadius: 20,
    transform: [{ rotate: '-135deg' }],
    top: '-100%',
    right: '-50%',
  },
  outerCard: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '5%',
    backgroundColor: '#19333D',
    borderTopRightRadius: '20',
    borderBottomRightRadius: '20',
    borderBottomLeftRadius: '20',
    alignItems: 'center',
    paddingTop: '2.5%',
    paddingBottom: '2.5%',
  },
  innerCard: {
    backgroundColor: '#151716',
    width: '95%',
    paddingHorizontal: '5%',
    paddingVertical: '5%',
    borderRadius: 20,
    alignItems: 'left',
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
export default function StoryStarterCard({ category, storyStarters }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <Animated.View
      layout={CustomLayoutTransition}
      style={styles.card}
    >
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <View>
          <View style={styles.header}>
            <Text style={[styles.headerText, { color: textColors[category] }]}>
              {category}
            </Text>
          </View>

          <View style={styles.topPart} />
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
                [styles.arrow, {
                  transform: [{ rotate: '90deg' }], top: expanded ? '40%' : '-8%', right: '-45%', backgroundColor: textColors[category],
                }]
              }
            />
            <Animated.View
              layout={CustomLayoutTransition}
              style={
                [styles.arrow, { top: '-40%', right: expanded ? '-20%' : '-75%', backgroundColor: textColors[category] }]
              }
            />
            <Animated.View
              style={[styles.diagonalArrow, { backgroundColor: textColors[category] }]}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Animated.View
        layout={CustomLayoutTransition}
        style={styles.outerCard}
      >
        {
          storyStarters.map((starter, index) => (
            <Animated.View
              key={index}
              layout={CustomLayoutTransition}
              style={[{
                height: expanded ? 2 * expandBoxHeight : expandBoxHeight,
              }, styles.innerCard]}
            >
              <Text style={[styles.topicText, { color: textColors[category] }]}>
                { starter }
              </Text>
            </Animated.View>
          ))
        }
      </Animated.View>

    </Animated.View>
  );
}
StoryStarterCard.propTypes = {
  category: PropTypes.string.isRequired,
  storyStarters: PropTypes.arrayOf(PropTypes.string).isRequired,
};
