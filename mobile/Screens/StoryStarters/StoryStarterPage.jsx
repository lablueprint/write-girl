import React, { useEffect, useState } from 'react';
import {
  StyleSheet, Text, View, Pressable, Image,
  ImageBackground,
} from 'react-native';
import axios from 'axios';
import PropTypes from 'prop-types';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import TypeWriter from 'react-native-typewriter';

const handwrittenQuote = require('../../assets/story-starter-icons/inspiring-handwriting.png');
const objectBackground = require('../../assets/story-starter-icons/object-background.png');
const settingBackground = require('../../assets/story-starter-icons/settings-background.png');
const traitsBackground = require('../../assets/story-starter-icons/character-traits-background.png');
const plotpointBackground = require('../../assets/story-starter-icons/plot-point-background.png');

const styles = (textColor) => StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'left',
    paddingTop: '15%',
    paddingBottom: '15%',
    paddingLeft: '10%',
  },
  heading: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    margin: 16,
  },
  body: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  textBody: {
    fontSize: 40,
    color: textColor,
    fontWeight: 'bold',
  },
  textTitle: {
    fontSize: 24,
    fontFamily: 'Helvetica Neue',
    color: '#AFAFAF',
    fontWeight: 'bold',
  },
  randomButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 30,
    backgroundColor: 'transparent',
    width: '80%',
  },
  gradientButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    backgroundColor: 'transparent',
    marginTop: 64,
    width: '90%',
  },
  item1: {
    marginBottom: 'auto',
  },
  imageContainer: {
    width: '100%',
    height: '20%',
  },
  quoteImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
  },
});

export default function StoryStarterComponent({ title, route, textColor }) {
  const [object, setObject] = useState(`Get a random ${title} for your story`);
  let background;
  switch (title) {
    case 'OBJECT':
      background = objectBackground;
      break;
    case 'SETTING':
      background = settingBackground;
      break;
    case 'PLOT POINT':
      background = plotpointBackground;
      break;
    default:
      background = traitsBackground;
  }
  const getObject = async () => {
    try {
      const randomItem = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/${route}/get`, { timeout: 20000 });
      setObject(randomItem.data);
      return randomItem.data;
    } catch (err) {
      console.log(err);
    }
    return true;
  };
  useEffect(() => {
    getObject();
  }, []);

  return (
    <ImageBackground source={background} style={{ width: '100%', height: '100%' }}>
      <View style={styles(textColor).container}>

        <Text style={styles(textColor).item1} />
        <View style={[styles(textColor).imageContainer]}>
          <Image style={styles(textColor).quoteImage} source={handwrittenQuote} />
        </View>
        <Text style={styles(textColor).textTitle}>
          {title}
        </Text>
        <TypeWriter typing={1} minDelay={10} maxDelay={60} style={styles(textColor).textBody}>
          {object}
        </TypeWriter>
        <LinearGradient
          colors={['#84C2C9', '#BFD25A']}
          style={styles(textColor).gradientButton}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Pressable style={styles(textColor).randomButton} onPress={getObject}>
            <Ionicons name="shuffle" size={24} color="black" />
            <Text style={styles(textColor).body}>  Randomize</Text>
          </Pressable>
        </LinearGradient>
      </View>
    </ImageBackground>
  );
}

StoryStarterComponent.propTypes = {
  title: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
};
