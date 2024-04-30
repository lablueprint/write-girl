import React, { useState } from 'react';
import {
  StyleSheet, Text, View, Pressable, Image,
  ImageBackground,
} from 'react-native';
import axios from 'axios';
import PropTypes from 'prop-types';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const handwrittenQuote = require('../../assets/story-starter-icons/inspiring-handwriting.png');
const background = require('../../assets/story-starter-icons/object-background.png');

const styles = StyleSheet.create({
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
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textBody: {
    fontSize: 24,
    color: 'green',
    fontWeight: 'bold',
  },
  randomButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 50,
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
    borderRadius: 50,
    backgroundColor: 'transparent',
    marginTop: 64,
    width: '80%',
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

export default function StoryStarterComponent({ title, route }) {
  const [object, setObject] = useState(`Get a random ${title} for your story`);
  const [resultShown, setResultShown] = useState(false);

  const getObject = async () => {
    try {
      const randomItem = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/${route}/get`, { timeout: 20000 });
      setObject(randomItem.data);
      setResultShown(true);
      return randomItem.data;
    } catch (err) {
      console.log(err);
    }
    return true;
  };

  return (
    <ImageBackground source={background} style={{ width: '100%', height: '100%' }}>
      <View style={styles.container}>

        <Text style={[styles.heading, styles.item1]}>{title}</Text>
        <View style={styles.imageContainer}>
          <Image style={styles.quoteImage} source={handwrittenQuote} />
        </View>
        <View>
          {resultShown ? (
            <Text style={styles.heading}>
              {object}
            </Text>
          ) : (
            <Text style={styles.heading}>
              {title}
              !
            </Text>
          )}
        </View>
        <LinearGradient
          colors={['#84C2C9', '#BFD25A']}
          style={styles.gradientButton}
          start={{ x: 0, y: 0 }} // Optional: Set gradient start
          end={{ x: 1, y: 0 }}
        >
          <Pressable style={styles.randomButton} onPress={getObject}>
            <Ionicons name="shuffle" size={24} color="black" />
            <Text style={styles.body}>  Randomize</Text>
          </Pressable>
        </LinearGradient>
      </View>
    </ImageBackground>
  );
}

StoryStarterComponent.propTypes = {
  title: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
};
