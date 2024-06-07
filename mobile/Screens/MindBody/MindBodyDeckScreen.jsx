/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, StyleSheet, Pressable, Dimensions, Animated,
} from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import PropTypes from 'prop-types';
import { SvgXml } from 'react-native-svg';
import { withTiming } from 'react-native-reanimated';
import MindBodyCard from '../../Components/MindBodyCard';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: 70,
    paddingTop: 80,
    // paddingHorizontal: windowWidth * 0.05,
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
    // paddingHorizontal: 24,
    borderRadius: 50,
    backgroundColor: 'white',
    width: '50%',
    marginBottom: 72,
  },
  body: {
    color: '#000',
    fontSize: 16,
  },
  bar: {
    marginTop: 32,
  },
  banner: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    width: '100%',
    marginVertical: 15,
    paddingHorizontal: windowWidth * 0.05,
  },
  indicator: {
    backgroundColor: 'white',
    height: 10,
    width: 10,
    borderRadius: 20,
  },
  cardProgressIndicator: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: 10,
    marginVertical: 10,
  },
});

const backSVG = `<svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M9 15L2 8L9 1" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
  </svg>
  `;

function MindBodyDeckScreen({ setTimer, navigation }) {
  const [scrollViewWidth, setScrollViewWidth] = React.useState(0);
  const [currentIndex, setIndex] = React.useState(0);
  const boxWidth = scrollViewWidth * 0.8;
  const boxDistance = scrollViewWidth - boxWidth;
  const halfBoxDistance = boxDistance / 2;
  const pan = React.useRef(new Animated.ValueXY()).current;
  const width = React.useRef(new Animated.Value(10)).current;
  const [mindBodyDeck, setMindBodyDeck] = useState(null);

  const route = useRoute();
  const type = route.params?.type;
  const high = '60';
  const low = '0';
  console.log(type);
  // if (route.params?.duration === 'brisk') {
  //   // 0-4 minutes
  //   high = String(5);
  //   low = String(0);
  // } else if (route.params?.duration === 'casual') {
  //   // 5-10 minutes
  //   high = String(11);
  //   low = String(4);
  // } else {
  //   // 11+ minutes
  //   high = String(60);
  //   low = String(10);
  // }

  const getRandomMindBody = async () => {
    try {
      const res = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/mindBody/getFiveRandom?high=${high}&low=${low}&type=${type}`);
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
    <View style={styles.container}>
      <View style={styles.banner}>
        <Pressable onPress={() => { navigation.goBack(); }}>
          <SvgXml
            xml={backSVG}
            height={15}
            width={15}
          />
        </Pressable>
        <View />
      </View>
      <Progress.Bar progress={0.66} width={windowWidth * 0.8} height={8} borderRadius={50} borderWidth={0} unfilledColor="#333333" color="white" style={styles.bar} />
      <Text style={styles.heading}>Swipe through suggested activities</Text>
      <View />
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
            listener: (event) => {
              const index = Math.round(event.nativeEvent.contentOffset.x / boxWidth);
              setIndex(index);
            },
          },
        )}
        keyExtractor={(item, index) => `${index}-${item}`}
        renderItem={renderItem}
      />
      <View style={styles.cardProgressIndicator}>
        {[...Array(5).keys()].map((idx) => (
          <View
            key={idx}
            style={
              [
                styles.indicator,
                currentIndex === idx ? { width: 30 } : {},
              ]
            }
          />
        ))}
      </View>
      <Pressable
        style={styles.button}
        onPress={() => { console.log('test'); navigation.navigate('Activity Screen', { prompt: mindBodyDeck[currentIndex] }); }}
      >
        <Text style={styles.body}>Confirm</Text>
      </Pressable>
    </View>
  );
}

MindBodyDeckScreen.propTypes = {
  setTimer: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    goBack: PropTypes.func,
  }).isRequired,
};
export default MindBodyDeckScreen;
