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
    zIndex: 3,
    top: '50%',
    right: '25s%',
    width: '40%',
    height: '25%',
    borderRadius: 70,
  },
  plotPointsContainer: {
    position: 'absolute',
    flex: 1,
    top: '45%',
    right: '50%',
    width: '50%',
    height: '25%',
    zIndex: 4,
    borderRadius: '70%',
    borderBottomRightRadius: '100%',
  },
  characterTraitsContainer: {
    position: 'absolute',
    flex: 1,
    bottom: '5%',
    right: '45%',
    width: 200,
    borderRadius: 70,
    aspectRatio: 1,
  },
  objectsContainer: {
    position: 'absolute',
    flex: 1,
    bottom: '47%',
    left: '35%',
    height: '25%',
    zIndex: 2,
  },
  image: {
    resizeMode: 'contain',
    flex: 1,
    width: '120%',
    height: undefined,
    borderRadius: 35,
  },
  imagePlotPoints: {
    resizeMode: 'contain',
    flex: 1,
    width: undefined,
    height: undefined,
    margin: -5,
    borderRadius: 80,
    borderBottomRightRadius: 100,
  },
  imageCharacterTrait: {
    resizeMode: 'contain',
    flex: 1,
    width: '120%',
    height: undefined,
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
    paddingTop: '20%',
  },
  bodyText: {
    color: 'white',
    fontSize: 14, // Optional: Set the font size
    fontWeight: 'bold', // Optional: Set the font weight
    paddingLeft: 15,
    paddingRight: 15,
  },
  textContainer: {
    margin: 5,
    padding: 5,
    flexDirection: 'column',
  },
});

const traitsImage = require('../assets/story-starter-icons/CharacterTraits.png');
const objectsImage = require('../assets/story-starter-icons/Objects.png');
const plotPointsImage = require('../assets/story-starter-icons/Plotpoints.png');
const settingsImage = require('../assets/story-starter-icons/Settings.png');
const backgroundImage = require('../assets/story-starter-icons/background.png');

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
          <Text style={styles.titleText}> Story Starters</Text>
          <Text style={styles.bodyText}>Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing. </Text>
        </View>
        <Pressable onPress={navigateToSettingsScreen} title="Get random setting" style={styles.settingsContainer}>
          <ImageBackground source={settingsImage} style={styles.button} imageStyle={styles.image} />
        </Pressable>
        <Pressable onPress={navigateToTraitsScreen} title="Get random character trait" style={styles.characterTraitsContainer}>
          <ImageBackground source={traitsImage} style={styles.button} imageStyle={styles.imageCharacterTrait} />
        </Pressable>
        <Pressable onPress={navigateToPlotPointsScreen} title="Get random plot point" style={styles.plotPointsContainer}>
          <ImageBackground source={plotPointsImage} style={styles.button} imageStyle={styles.imagePlotPoints} />
        </Pressable>
        <Pressable onPress={navigateToObjectsScreen} title="Get random object" style={styles.objectsContainer}>
          <ImageBackground source={objectsImage} style={styles.button} imageStyle={styles.image} />
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
