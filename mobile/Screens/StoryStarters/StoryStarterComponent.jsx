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
const background = require('../../assets/story-starter-icons/object-background.png');

const styles = (textColor) => StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: '15%',
    paddingBottom: '15%',
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
    fontSize: 30,
    color: textColor,
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
  saveResultButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    borderColor: 'black',
    borderWidth: 1,
    marginTop: 16,
    width: '80%',
    position: 'absolute',
  },
  bodyContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  saveResultButtonBody: {
    color: 'black',
    fontSize: 16,
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
    paddingLeft: '5%',
  },
  quoteImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
    // aspectRatio: 1,
  },
});

export default function StoryStarterComponent({ title, route, textColor }) {
  const [object, setObject] = useState(`Get a random ${title} for your story`);

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

        <Text style={[styles(textColor).heading, styles(textColor).item1]}>{title}</Text>
        <View style={styles(textColor).imageContainer}>
          <Image style={styles(textColor).quoteImage} source={handwrittenQuote} />
        </View>
        <TypeWriter typing={1} minDelay={10} maxDelay={60} style={styles(textColor).textBody}>
          {object}
        </TypeWriter>
        <LinearGradient
          colors={['#84C2C9', '#BFD25A']}
          style={styles(textColor).gradientButton}
          start={{ x: 0, y: 0 }} // Optional: Set gradient start
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
