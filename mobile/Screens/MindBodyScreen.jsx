//Green: #c4d735
//Blue: #0f91a4

/*
import React, { useState, useRef, useEffect } from 'react';
import Swiper from 'react-native-deck-swiper';
import {
  Button, StyleSheet, View,
} from 'react-native';
import axios from 'axios';
import MindBodyCard from '../Components/MindBodyCard';

// demo purposes only
function* range(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

function Example() {
  const [cards, setCards] = useState([...range(1, 5)]);
  const [swipedAllCards, setSwipedAllCards] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState('');
  const [cardIndex, setCardIndex] = useState(0);
  const swiperRef = useRef(null);

  const getRandomMindBody = async () => {
    try {
      const res = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/mindBody/getFiveRandom`);
      setCards(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  // Run on first render
  useEffect(() => {
    getRandomMindBody();
  }, []);

  const renderCard = (card, index) => (
    <MindBodyCard
      activity={card.activity}
      duration={card.duration}
    />
  );

  const onSwiped = (type) => {
    console.log(`on swiped ${type}`);
  };

  const onSwipedAllCards = () => {
    setSwipedAllCards(true);
  };

  const swipeLeft = () => {
    swiperRef.current.swipeLeft();
  };

  return (
    <View style={styles.container}>
      <Swiper
        ref={swiperRef}
        onSwiped={() => onSwiped('general')}
        onSwipedLeft={() => onSwiped('left')}
        onSwipedRight={() => onSwiped('right')}
        onSwipedTop={() => onSwiped('top')}
        onSwipedBottom={() => onSwiped('bottom')}
        onTapCard={swipeLeft}
        cards={cards}
        cardIndex={cardIndex}
        cardVerticalMargin={80}
        renderCard={renderCard}
        onSwipedAll={onSwipedAllCards}
        stackSize={3}
        stackSeparation={15}
        overlayLabels={{
          bottom: {
            title: 'BLEAH',
            style: {
              label: {
                backgroundColor: 'black',
                borderColor: 'black',
                color: 'white',
                borderWidth: 1,
              },
              wrapper: {
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              },
            },
          },
          left: {
            title: 'NOPE',
            style: {
              label: {
                backgroundColor: 'black',
                borderColor: 'black',
                color: 'white',
                borderWidth: 1,
              },
              wrapper: {
                flexDirection: 'column',
                alignItems: 'flex-end',
                justifyContent: 'flex-start',
                marginTop: 30,
                marginLeft: -30,
              },
            },
          },
          right: {
            title: 'LIKE',
            style: {
              label: {
                backgroundColor: 'black',
                borderColor: 'black',
                color: 'white',
                borderWidth: 1,
              },
              wrapper: {
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                marginTop: 30,
                marginLeft: 30,
              },
            },
          },
          top: {
            title: 'SUPER LIKE',
            style: {
              label: {
                backgroundColor: 'black',
                borderColor: 'black',
                color: 'white',
                borderWidth: 1,
              },
              wrapper: {
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              },
            },
          },
        }}
        animateOverlayLabelsOpacity
        animateCardOpacity
        swipeBackCard
      >
        <Button onPress={() => swiperRef.current.swipeBack()} title="Swipe Back" />
      </Swiper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  card: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  text: {
    textAlign: 'center',
    fontSize: 50,
    backgroundColor: 'transparent',
  },
  done: {
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
    backgroundColor: 'transparent',
  },
});

export default Example;
*/

import React, { useEffect, useState } from 'react';
import {
  View, Animated, FlatList,
} from 'react-native';
import axios from 'axios';
import MindBodyCard from '../Components/MindBodyCard';

function Card() {
  const [scrollViewWidth, setScrollViewWidth] = React.useState(0);
  const [scrollViewHeight, setScrollViewHeight] = React.useState(0);
  const boxWidth = scrollViewWidth * 0.8;
  // const boxHeight = scrollViewHeight * 0.5;
  const boxDistance = scrollViewWidth - boxWidth;
  const halfBoxDistance = boxDistance / 2;
  const pan = React.useRef(new Animated.ValueXY()).current;
  const [data, setData] = useState([
    {
      activity: 'activity1',
      duration: 1,
    },
    {
      activity: 'activity2',
      duration: 2,
    },
    {
      activity: 'activity3',
      duration: 3,
    },
    {
      activity: 'activity4',
      duration: 4,
    },
    {
      activity: 'activity5',
      duration: 5,
    }]);

  const getRandomMindBody = async () => {
    try {
      const res = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/mindBody/getFiveRandom`);
      setData(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  // Run on first render
  useEffect(() => {
    getRandomMindBody();
  }, []);

  const renderItem = ({ item, index }) => (
    <Animated.View
      style={{
        transform: [
          {
            scale: pan.x.interpolate({
              inputRange: [
                (index - 1) * boxWidth - halfBoxDistance,
                index * boxWidth - halfBoxDistance,
                (index + 1) * boxWidth - halfBoxDistance, // adjust positioning
              ],
              outputRange: [0.8, 1, 0.8], // scale down when out of scope
              extrapolate: 'clamp',
            }),
          },
        ],
      }}
    >
      <MindBodyCard activity={item.activity} duration={item.duration} boxWidth={boxWidth} />
    </Animated.View>
  );

  return (
    <View>
      <FlatList
        horizontal
        data={data}
        style={{ backgroundColor: '#c4d735', height: { scrollViewHeight } }}
        contentContainerStyle={{ paddingVertical: 16 }}
        contentInsetAdjustmentBehavior="never"
        snapToAlignment="center"
        decelerationRate="fast"
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={1}
        snapToInterval={boxWidth}
        contentInset={{
          left: halfBoxDistance,
          right: halfBoxDistance,
        }}
        contentOffset={{ x: halfBoxDistance * -1, y: 0 }}
        onLayout={(e) => {
          setScrollViewWidth(e.nativeEvent.layout.width);
          setScrollViewHeight(e.nativeEvent.layout.height);
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: pan.x } } }],
          {
            useNativeDriver: false,
          },
        )}
        keyExtractor={(item, index) => `${index}-${item}`}
        renderItem={renderItem}
      />
    </View>
  );
}

export default Card;
