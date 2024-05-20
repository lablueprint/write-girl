import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, Dimensions, ScrollView, ImageBackground,
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

const window = Dimensions.get('window');
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  all: {
    flex: 1,
    backgroundColor: 'rgba(20, 22, 21, 1)',
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    position: 'relative',
    marginTop: -20,
  },
  textContainer: {
    position: 'absolute',
    paddingTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
  },
  name: {
    color: 'white',
    fontSize: 50,
    paddingTop: 90,
  },
  greeting: {
    color: 'white',
    fontSize: 20,
    marginBottom: 30,
    paddingTop: 20,
  },
  carouselContainer: {
    flex: 1,
    marginTop: 10,
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

export default function HomeScreen({ navigation }) {
  const [pepTalks, setPepTalks] = useState('');
  const [writingTips, setWritingTips] = useState('');
  const [page, setPage] = React.useState('pep_talk');
  const [cardData, setCardData] = React.useState('default_text');

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

  useEffect(() => {
    getCardText('/pepTalk/get');
  }, []);

  return (
    <ScrollView style={styles.all}>
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
      <View style={styles.carouselContainer}>
        <Carousel
          loop
          width={width}
          height={width}
          autoPlay
          data={activityData}
          scrollAnimationDuration={10000}
          onSnapToItem={(index) => console.log('current index:', index)}
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
    </ScrollView>
  );
}

HomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
