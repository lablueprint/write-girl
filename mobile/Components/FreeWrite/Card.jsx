import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, Pressable, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import { Audio } from 'expo-av';

const icyRiver = require('../../assets/free-write-icons/icyRiverBackground.jpg');
const cliffs = require('../../assets/free-write-icons/cliffs.jpg');
const metropolitan = require('../../assets/free-write-icons/metropolitan.jpg');
const snowForest = require('../../assets/free-write-icons/snowForest.jpg');
const holiday = require('../../assets/free-write-icons/holidayFireplace.jpg');
const field = require('../../assets/free-write-icons/sunnyField.jpg');
const fire = require('../../assets/free-write-icons/fire.jpg');

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
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    borderRadius: 14,
    // borderColor: 'purple',
    // borderWidth: 2,
    // width: '100%',
    aspectRatio: 21 / 9,
    height: '100%',
    resizeMode: 'cover',
  },
  text: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'white',
  },
});

export default function Card({
  name, play, setTitle, image, changeBackground,
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
    console.log('Card: Pressed');
    console.log('play: ', play);
    setTitle(name);
    if (name === 'Icy River') {
      changeBackground(icyRiver);
    } else if (name === 'Cliffs') {
      changeBackground(cliffs);
    } else if (name === 'Metropolitan') {
      changeBackground(metropolitan);
    } else if (name === 'Snow Forest') {
      changeBackground(snowForest);
    } else if (name === 'Holiday Fireplace') {
      changeBackground(holiday);
    } else if (name === 'Sunny Field') {
      changeBackground(field);
    } else if (name === 'Campfire') {
      changeBackground(fire);
    }
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
  changeBackground: PropTypes.func,
  image: PropTypes.string.isRequired,
};

Card.defaultProps = {
  changeBackground: null,
};
