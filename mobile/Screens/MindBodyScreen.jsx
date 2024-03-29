import React, { useEffect, useState } from 'react';
import {
  View, Animated, FlatList, StyleSheet,
} from 'react-native';
import axios from 'axios';
import MindBodyCard from '../Components/MindBodyCard';

const styles = StyleSheet.create({
  flatList: {
    backgroundColor: '#c4d735',
  },
  flatListContainer: {
    paddingVertical: 16,
  },
});

function Card() {
  const [scrollViewWidth, setScrollViewWidth] = React.useState(0);
  const boxWidth = scrollViewWidth * 0.8;
  const boxDistance = scrollViewWidth - boxWidth;
  const halfBoxDistance = boxDistance / 2;
  const pan = React.useRef(new Animated.ValueXY()).current;
  const [mindBodyDeck, setMindBodyDeck] = useState([
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
      setMindBodyDeck(res.data);
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
        data={mindBodyDeck}
        style={styles.flatList}
        contentContainerStyle={styles.flatListContainer}
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
