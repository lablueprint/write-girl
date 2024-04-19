import React from 'react';
import {
  StyleSheet, Text, View, Pressable, ImageBackground,
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151716',
  },
  settingsContainer: {
    position: 'absolute',
    flex: 1,
    top: '50%',
    right: '15%',
    width: '35%',
    height: '25%',
    // borderWidth: 2,*-
    // borderColor: 'red',
  },
  plotPointsContainer: {
    position: 'absolute',
    flex: 1,
    top: '35%',
    right: '50%',
    width: '40%',
    height: '25%',
    // borderWidth: 2,
    // borderColor: 'red',
  },
  characterTraitsContainer: {
    position: 'absolute',
    flex: 1,
    bottom: '0%',
    left: '40%',
    width: 200,
    // borderWidth: 2,
    // borderColor: 'red',
    aspectRatio: 1, // Maintain the aspect ratio (1:1)
  },
  objectsContainer: {
    position: 'absolute',
    flex: 1,
    bottom: '10%',
    left: '-5%',
    height: '32%',
    // borderWidth: 2,
    // borderColor: 'red',
  },
  image: {
    resizeMode: 'contain',
    flex: 1,
    width: '120%',
    height: undefined,
  },
  imagePlotPoints: {
    resizeMode: 'contain',
    flex: 1,
    width: undefined,
    height: undefined,
  },
  imageCharacterTrait: {
    resizeMode: 'contain',
    flex: 1,
    width: '120%',
    height: undefined,
  },
  imageText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  textCharacterTrait: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
    paddingLeft: '30%',
  },
  textObjects: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
    paddingRight: '15%',
  },
  textSettings: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
    paddingLeft: '20%',
  },
  button: {
    height: 340,
    width: 190,
    flex: 1,
  },
  titleText: {
    color: 'white',
    fontSize: 45, // Optional: Set the font size
    fontWeight: 'bold', // Optional: Set the font weight
    // borderWidth: 2,
    // borderColor: 'red',
  },
  titleText1: {
    color: 'white',
    fontSize: 45, // Optional: Set the font size
    fontWeight: 'bold', // Optional: Set the font weight
    // borderWidth: 2,
    // borderColor: 'red',
    paddingTop: '20%',
  },
  bodyText: {
    color: 'white',
    fontSize: 14, // Optional: Set the font size
    fontWeight: 'bold', // Optional: Set the font weight
    // borderWidth: 2,
    // borderColor: 'red',
    paddingLeft: 15,
    paddingRight: 15,
  },
  textContainer: {
    margin: 5,
    padding: 5,
    flexDirection: 'column',
  },
});

const traitsImage = require('../assets/story-starter-icons/character-traits-blob.png');
const objectsImage = require('../assets/story-starter-icons/objects-blob.png');
const plotPointsImage = require('../assets/story-starter-icons/plot-points-blob.png');
const settingsImage = require('../assets/story-starter-icons/setting-blob.png');
const backgroundImage = require('../assets/story-starter-icons/story-starters-background.png');

export default function StoryStarterScreen({ navigation }) {
  const navigateToSettingsScreen = () => {
    navigation.navigate('Settings');
  };

  const navigateToObjectsScreen = () => {
    navigation.navigate('Objects');
  };

  const navigateToTraitsScreen = () => {
    navigation.navigate('Character Traits');
  };

  const navigateToPlotPointsScreen = () => {
    navigation.navigate('Plot Points');
  };

  return (
    <View>
      <ImageBackground source={backgroundImage} style={{ width: '100%', height: '100%' }}>
        <View style={styles.textContainer}>
          <Text style={styles.titleText1}> Story </Text>
          <Text style={styles.titleText}> Starters </Text>
          <Text style={styles.bodyText}>Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing. </Text>
        </View>
        <Pressable onPress={navigateToSettingsScreen} title="Get random setting" style={styles.settingsContainer}>
          <ImageBackground source={settingsImage} style={styles.button} imageStyle={styles.image}>
            <Text style={styles.textSettings}>Settings</Text>
          </ImageBackground>
        </Pressable>
        <Pressable onPress={navigateToTraitsScreen} title="Get random character trait" style={styles.characterTraitsContainer}>
          <ImageBackground source={traitsImage} style={styles.button} imageStyle={styles.imageCharacterTrait}>
            <Text style={styles.textCharacterTrait}>Character Traits</Text>
          </ImageBackground>
        </Pressable>
        <Pressable onPress={navigateToPlotPointsScreen} title="Get random plot point" style={styles.plotPointsContainer}>
          <ImageBackground source={plotPointsImage} style={styles.button} imageStyle={styles.imagePlotPoints}>
            <Text style={styles.imageText}>Plot Points</Text>
          </ImageBackground>
        </Pressable>
        <Pressable onPress={navigateToObjectsScreen} title="Get random object" style={styles.objectsContainer}>
          <ImageBackground source={objectsImage} style={styles.button} imageStyle={styles.image}>
            <Text style={styles.textObjects}>Objects</Text>
          </ImageBackground>
        </Pressable>
      </ImageBackground>
    </View>
  );
}

StoryStarterScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
