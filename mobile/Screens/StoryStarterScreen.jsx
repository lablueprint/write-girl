import React from 'react';
import {
  StyleSheet, Text, View, Pressable, ImageBackground,
} from 'react-native';
// import axios from 'axios';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    position: 'absolute', // Use absolute positioning
    top: 50, // Adjust top position as needed
    left: 50, // Adjust left position as needed
  },
  imageText: {
    marginTop: 5, // Adjust spacing between image and text
    textAlign: 'center',
    color: '#FFF',
    // fontFamily: 'Inter',
    fontSize: 1.25,
    fontWeight: 700,
  },
  heading: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    margin: 16,
  },
  body: {
    color: '#fff',
    fontSize: 16,
  },
  traitsButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 50,
    elevation: 3,
    backgroundColor: 'black',
    margin: 16,
  },
});

const traitsImage = require('../assets/story-starter-icons/character-traits.png');
const objectsImage = require('../assets/story-starter-icons/objects.png');
const plotPointsImage = require('../assets/story-starter-icons/plot-points.png');
const settingsImage = require('../assets/story-starter-icons/settings.png');

export default function StoryStarterScreen() {
  // const [trait, setTrait] = useState('');
  // const [plotPoint, setPlotPoint] = useState('');
  // const [setting, setSetting] = useState('');
  // const [object, setObject] = useState('');

  const navigateToScreen = ({ screenName }) => {
    console.log(screenName);
    // navigation.navigate(screenName, {});
  };

  // const getTrait = async () => {
  //   try {
  //     const randomTrait = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/characterTrait/get`, { timeout: 20000 });
  //     setTrait(randomTrait.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  //   return true;
  // };
  // const getPlotPoint = async () => {
  //   try {
  //     console.log('clicked button');
  //     const randomPlotPoint = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/plotPoint/get`, { timeout: 20000 });
  //     setPlotPoint(randomPlotPoint.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  //   return true;
  // };
  // const getSetting = async () => {
  //   try {
  //     const randomSetting = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/setting/get`, { timeout: 20000 });
  //     setSetting(randomSetting.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  //   return true;
  // };
  // const getObject = async () => {
  //   try {
  //     const randomItem = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/item/get`, { timeout: 20000 });
  //     setObject(randomItem.data);
  //     return randomItem.data;
  //   } catch (err) {
  //     console.log(err);
  //   }
  //   return true;
  // };

  // useEffect(() => {
  //   getTrait();
  // }, []);

  return (
    <View style={styles.container}>
      <Text>Story Starter Screen</Text>
      <View style={styles.imageContainer}>
        <Pressable onPress={navigateToScreen('TraitScreen')} title="Get random character trait">
          <ImageBackground source={traitsImage}>
            <Text style={styles.imageText}>Character Traits</Text>
          </ImageBackground>
        </Pressable>
      </View>
      {/* <View style={styles.imageContainer}>
        <Pressable onPress={navigateToScreen('PlotPointScreen')} title="Get random plot point">
          <Image source={plotPointsImage} />
          <Text style={styles.imageText}>Plot Points</Text>
        </Pressable>
      </View>
      <View style={styles.imageContainer}>
        <Pressable onPress={navigateToScreen('SettingScreen')} title="Get random setting">
          <Image source={settingsImage} />
          <Text style={styles.imageText}>Settings</Text>
        </Pressable>
      </View>
      <View style={styles.imageContainer}>
        <Pressable onPress={navigateToScreen('ObjectScreen')} title="Get random object">
          <Image source={objectsImage} />
          <Text style={styles.imageText}>Plot Points</Text>
        </Pressable>
      </View> */}
    </View>
  );
}
