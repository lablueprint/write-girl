import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, Pressable, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import { Audio } from 'expo-av';

const styles = StyleSheet.create({
  card: {
    // backgroundColor: 'dodgerblue',
    flex: 1,
    height: 150,
    // alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 14,
    overflow: 'hidden', // Clip the image to the border radius
    position: 'relative', // Required for absolute positioning of text
  },
  image: {
    // // flex: 1,;;
    // alignSelf: 'center',
    // justifyContent: 'center',
    // alignItems: 'center',
    // // margin: 10,
    // // top: '10%',
    borderRadius: 14,
    // borderColor: 'purple',
    // borderWidth: 2,
    // width: '100%',
    // aspectRatio: 1, // Maintain the current aspect ratio of the image
    aspectRatio: 21 / 9,
    height: '100%',
    resizeMode: 'cover', // or 'contain' depending on your needs
  },
  text: {
    position: 'absolute',
    // top: '50%', // Position the text in the middle vertically
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'white',
    // fontSize: 14,
  },
});

export default function Card({
  name, play, setTitle, image,
}) {
  const [sounds, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);

  // THIS VERSION PLAYS ALL AT ONCE
  // useEffect(() => {
  //   async function playSound() {
  //     console.log('Loading Sound');
  //     const { sound } = await Audio.Sound.createAsync(
  //       require('../../assets/sample.mp3'),
  //     );
  //     setSound(sound);
  //     console.log('Playing Sound');
  //     await sound.playAsync();
  //   }

  //   if (play) {
  //     playSound();
  //   }

  //   return () => {
  //     if (sounds) {
  //       console.log('Unloading Sound');
  //       sounds.stopAsync(); // Stop the sound if it's playing
  //       sounds.unloadAsync();
  //     }
  //   };
  // }, [play]);
  /// ////////////////////////////////////////////

  // THIS STOPS/PLAYS WITH SOME FAULINESS
  // async function playSound() {
  //   const { sound } = await Audio.Sound.createAsync(require('../../assets/sample.mp3'));
  //   setSound(sound);
  //   await sound.playAsync();
  // }

  // async function stopSound() {
  //   if (sounds) {
  //     await sounds.stopAsync();
  //   }
  // }

  // useEffect(() => (sounds ? () => {
  //   sounds.unloadAsync();
  // } : undefined), [sounds]);

  // useEffect(() => {
  //   setIsPlaying(play);
  //   console.log('play in useEffect: ', play);
  //   if (isPlaying) {
  //     playSound();
  //   } else {
  //     stopSound();
  //   }
  // }, [play]);

  // const handlePress = () => {
  //   console.log('Pressed');
  //   console.log('play: ', play);
  //   setTitle(name);
  //   // if (isPlaying) {
  //   //   playSound();
  //   // } else {
  //   //   stopSound();
  //   // }
  // };

  /// /////////////////////////////////////////

  useEffect(() => {
    async function playSound() {
      const { sound } = await Audio.Sound.createAsync(require('../../assets/sample.mp3'));
      setSound(sound);
      await sound.playAsync();
    }

    async function stopSound() {
      if (sounds) {
        await sounds.stopAsync();
        await sounds.unloadAsync();
      }
    }

    if (play) {
      playSound();
    } else {
      stopSound();
    }

    return () => {
      if (sounds) {
        stopSound();
      }
    };
  }, [play]);

  const handlePress = () => {
    console.log('Pressed');
    console.log('play: ', play);
    setTitle(name);
    // if (isPlaying) {
    //   playSound();
    // } else {
    //   stopSound();
    // }
  };

  return (
    <Pressable style={styles.card} onPress={handlePress}>
      <Image source={image} style={styles.image} />
      <Text style={styles.text}>{name}</Text>
    </Pressable>
  );
}

Card.propTypes = {
  name: PropTypes.string.isRequired,
  play: PropTypes.bool.isRequired,
  setTitle: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
};
