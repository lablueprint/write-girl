import React from 'react';
import {
  StyleSheet, Text, View, Pressable, ImageBackground,
} from 'react-native';
import PropTypes from 'prop-types';
// import axios from 'axios';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
  },
  settingsContainer: {
    position: 'absolute',
    flex: 1,
    top: 0,
    left: 0,
  },
  plotPointsContainer: {
    position: 'absolute',
    flex: 1,
    top: 0,
    right: 0,
  },
  characterTraitsContainer: {
    position: 'absolute',
    flex: 1,
    bottom: 0,
    left: 0,
  },
  objectsContainer: {
    position: 'absolute',
    flex: 1,
    bottom: 0,
    right: 0,
  },
  image: {
  },
  imageText: {
    color: 'white',
    fontSize: 20, // Adjust as needed
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  button: {
    height: 200,
    // width: 'auto',
    resizeMode: 'contain',
    flex: 1,
    aspectRatio: 0.9,
  },
});

const traitsImage = require('../assets/story-starter-icons/character-traits.png');
const objectsImage = require('../assets/story-starter-icons/objects.png');
const plotPointsImage = require('../assets/story-starter-icons/plot-points.png');
const settingsImage = require('../assets/story-starter-icons/settings.png');

export default function StoryStarterScreen({ navigation, key }) {
  // const [trait, setTrait] = useState('');
  // const [plotPoint, setPlotPoint] = useState('');
  // const [setting, setSetting] = useState('');
  // const [object, setObject] = useState('');
  const navigateToSettingsScreen = () => {
    navigation.navigate('Settings', {});
  };

  const navigateToObjectsScreen = () => {
    navigation.navigate('Objects', {});
  };

  const navigateToTraitsScreen = () => {
    navigation.navigate('Character Traits', {});
  };

  const navigateToPlotPointsScreen = () => {
    navigation.navigate('Plot Points', {});
  };

  return (
    <View style={styles.container} key={key}>
      <Pressable onPress={navigateToSettingsScreen} title="Get random setting" style={styles.settingsContainer}>
        <ImageBackground source={settingsImage} style={styles.button} imageStyle={styles.image}>
          <Text style={styles.imageText}>Settings</Text>
        </ImageBackground>
      </Pressable>
      <Pressable onPress={navigateToTraitsScreen} title="Get random character trait" style={styles.characterTraitsContainer}>
        <ImageBackground source={traitsImage} style={styles.button} imageStyle={styles.image}>
          <Text style={styles.imageText}>Character Traits</Text>
        </ImageBackground>
      </Pressable>
      <Pressable onPress={navigateToPlotPointsScreen} title="Get random plot point" style={styles.plotPointsContainer}>
        <ImageBackground source={plotPointsImage} style={styles.button} imageStyle={styles.image}>
          <Text style={styles.imageText}>Plot Points</Text>
        </ImageBackground>
      </Pressable>
      <Pressable onPress={navigateToObjectsScreen} title="Get random object" style={styles.objectsContainer}>
        <ImageBackground source={objectsImage} style={styles.button} imageStyle={styles.image}>
          <Text style={styles.imageText}>Objects</Text>
        </ImageBackground>
      </Pressable>
    </View>
  );
}

StoryStarterScreen.propTypes = {
  key: PropTypes.number.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
