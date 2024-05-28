/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import {
  View, Animated, Text, FlatList, StyleSheet, Pressable, Dimensions,
} from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import MindBodyCard from '../../Components/MindBodyCard';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    color: '#fff',
    margin: 24,
    fontSize: 24,
    textAlign: 'center',
  },
  flatList: {
    backgroundColor: '#000',
  },
  flatListContainer: {
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 50,
    backgroundColor: 'white',
    width: '50%',
    marginBottom: 72,
    marginTop: 24,
  },
  body: {
    color: '#000',
    fontSize: 16,
  },
  bar: {
    marginTop: 32,
  },
});

function Card() {
  const [scrollViewWidth, setScrollViewWidth] = React.useState(0);
  const boxWidth = scrollViewWidth * 0.8;
  const boxDistance = scrollViewWidth - boxWidth;
  const halfBoxDistance = boxDistance / 2;
  const pan = React.useRef(new Animated.ValueXY()).current;
  const [mindBodyDeck, setMindBodyDeck] = useState(null);

  const route = useRoute();
  const type = route.params?.type;
  let high = '';
  let low = '';
  if (route.params?.duration === 'brisk') {
    // 0-4 minutes
    high = String(5);
    low = String(0);
  } else if (route.params?.duration === 'casual') {
    // 5-10 minutes
    high = String(11);
    low = String(4);
  } else {
    // 11+ minutes
    high = String(60);
    low = String(10);
  }

  const getRandomMindBody = async () => {
    try {
      const res = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/mindBody/getFiveRandom?high=${high}&low=${low}&type=${type}`);
      setMindBodyDeck(res.data);
      return res.data;
    } catch (err) {
      console.error(err);
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
    <View style={styles.container}>
      <Progress.Bar progress={1} width={windowWidth * 0.8} height={16} borderRadius={50} borderWidth={0} unfilledColor="#333333" color="white" style={styles.bar} />
      <Text style={styles.heading}>Swipe through suggested activities</Text>
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
      <Pressable style={styles.button}>
        <Text style={styles.body}>Confirm</Text>
      </Pressable>
    </View>
  );
}

export default Card;
