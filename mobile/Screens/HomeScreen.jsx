import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet, Text, View, Dimensions, TouchableOpacity, ImageBackground, Animated,
} from 'react-native';
import axios from 'axios';
import PropTypes from 'prop-types';
import Carousel from 'react-native-reanimated-carousel';
import ActivityNavigationCard from '../Components/ActivityNavigationCard';
import PocketPromptsImage from '../assets/pocketprompts.png';
import StoryStartersImage from '../assets/storystarters.png';
import DoorActivityImage from '../assets/dooractivity.png';
import TripleFlipsImage from '../assets/tripleflips.png';
import HomeBackground from '../assets/home-screen.png';

import PostItsImage from '../assets/post_it.png';
import FreeWriteImage from '../assets/free-write-card.png';
import MindAndBodyImage from '../assets/mind-and-body-card.png';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  all: {
    flex: 1,
    backgroundColor: 'rgba(20, 22, 21, 1)',
  },
  imageBackground: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
    marginTop: -20,
  },
  textContainer: {
    paddingTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
  },
  name: {
    color: 'white',
    fontSize: 50,
    paddingTop: 90,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    padding: '5%',
    paddingTop: 0,
    paddingBottom: '5%',
  },
  greeting: {
    color: 'white',
    fontSize: 20,
    marginBottom: 30,
    paddingTop: 20,
  },
  needInspoText: {
    color: '#BFD25A',
  },
  needInspoText2: {
    color: 'white',
    fontSize: 20,
    paddingLeft: '5%',
  },
  carouselContainer: {
    height: Dimensions.get('window').width / 1.5,
    marginTop: 10,
    marginBottom: '5%',
  },
  card: {
    marginVertical: 10,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    borderRadius: 20,
    height: Dimensions.get('window').height / 4.5, // Adjust based on your image height
    width: Dimensions.get('window').width,
  },
  cardText: {
    fontSize: 18,
    color: 'black',
  },
  postItContainer: {
    flex: 1,
    height: Dimensions.get('window').height,
    borderWidth: 2,
    borderColor: 'red',
  },
  PostItBackground: {
    height: Dimensions.get('window').height / 2.9, // Adjust based on your image height
    width: '100%',
    borderWidth: 2,
    borderColor: 'red',
  },
  invisibleButton: {
    position: 'absolute',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'red',
    width: 175,
    height: 100,
  },
  postIt1: {
    top: 70, // Adjust based on the position of the first post-it note
    left: 10,
  },
  postIt2: {
    top: 180, // Adjust based on the position of the second post-it note
    left: 80,
  },
  postIt3: {
    top: 70, // Adjust based on the position of the third post-it note
    left: 190,
  },
});

const activityData = [
  {
    activity: 'Pocket Prompts',
    description: 'Writing some random things in here to make it look nice but I will be replacing the text in here later.',
    image: PocketPromptsImage,
    pageDirect: 'Home',
  },
  {
    activity: 'Story Starters',
    description: 'Writing some random things in here to make it look nice but I will be replacing the text in here later.',
    image: StoryStartersImage,
    pageDirect: 'Story Starters',
  },
  {
    activity: 'Door Activity',
    description: 'Writing some random things in here to make it look nice but I will be replacing the text in here later.',
    image: DoorActivityImage,
    pageDirect: 'Home',
  },
  {
    activity: 'Triple Flips',
    description: 'Writing some random things in here to make it look nice but I will be replacing the text in here later.',
    image: TripleFlipsImage,
    pageDirect: 'Triple Flip',
  },
];

const exploreMoreData = [
  { id: 1, text: 'Explore Card 1', background: FreeWriteImage },
  { id: 2, text: 'Explore Card 2', background: MindAndBodyImage },
];

export default function HomeScreen({ navigation }) {
  const [pepTalks, setPepTalks] = useState('');
  const [writingTips, setWritingTips] = useState('');
  const [page, setPage] = React.useState('pep_talk');
  const [cardData, setCardData] = React.useState('default_text');
  const scrollY = useRef(new Animated.Value(0)).current;

  // Retrieves and sets cardText to a PepTalk json object from database
  const getCardText = async (route) => {
    setCardData('');
    try {
      const res = await axios.get(process.env.EXPO_PUBLIC_SERVER_URL + route);
      setCardData(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  };
  const handlePress = (screen) => {
    navigation.navigate(screen);
  };

  useEffect(() => {
    getCardText('/pepTalk/get');
  }, []);

  const renderExploreMoreCards = () => exploreMoreData.map((item, index) => {
    const inputRange = [-1, 0, (index) * 100, (index + 1) * 100];
    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [0, 0, 1, 1],
      extrapolate: 'clamp',
    });
    const opacity = scrollY.interpolate({
      inputRange,
      outputRange: [0, 0, 0, 1],
      extrapolate: 'clamp',
    });
    const translateY = scrollY.interpolate({
      inputRange,
      outputRange: [-30, -20, -30, -40],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        key={item.id}
        style={[
          // styles.card,
          {
            transform: [{ scale }, { translateY }],
            opacity,
          },
        ]}
      >
        <ImageBackground source={item.background} style={styles.card}>
          <Text style={styles.cardText}>{item.text}</Text>
        </ImageBackground>
      </Animated.View>
    );
  });

  return (
    <Animated.ScrollView
      style={styles.all}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true },
      )}
      scrollEventThrottle={16}
    >
      <ImageBackground
        source={HomeBackground} // Replace with your image path
        style={styles.imageBackground}
      >
        <View style={styles.textContainer}>
          <Text style={styles.name}>
            Hi Angela,
          </Text>
          <Text style={styles.greeting}>
            This is home to all your tools to help guide your creative writing!
          </Text>
        </View>
      </ImageBackground>
      <Text style={styles.title}>Writing Activities</Text>
      <View style={styles.carouselContainer}>
        <Carousel
          loop
          width={width}
          height={width}
          autoPlay
          data={activityData}
          scrollAnimationDuration={10000}
          renderItem={({ item, index }) => (
            <ActivityNavigationCard
              key={index}
              activity={item.activity}
              description={item.description}
              image={item.image}
              pageDirect={item.pageDirect}
              navigation={navigation}
            />
          )}
        />
      </View>
      <Text style={[styles.title, { paddingBottom: '10%' }]}>Explore More</Text>
      {renderExploreMoreCards()}
      <Text style={styles.title}>Need Inspo?</Text>
      <Text style={styles.needInspoText2}>
        <Text style={styles.needInspoText}>Tap on one </Text>
        of these sticky notes
      </Text>
      <Text style={styles.needInspoText2}>to get a tip </Text>
      <ImageBackground
        source={PostItsImage}
        style={styles.PostItBackground}
      >
        <TouchableOpacity
          style={[styles.invisibleButton, styles.postIt1]}
          onPress={() => handlePress('Writing Activities')}
        />
        <TouchableOpacity
          style={[styles.invisibleButton, styles.postIt2]}
          onPress={() => handlePress('Story Starter Stack')}
        />
        <TouchableOpacity
          style={[styles.invisibleButton, styles.postIt3]}
          onPress={() => handlePress('')}
        />
      </ImageBackground>
    </Animated.ScrollView>
  );
}

HomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
