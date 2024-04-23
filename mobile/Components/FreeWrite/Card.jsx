import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, Pressable,
} from 'react-native';
import PropTypes from 'prop-types';
import { Audio } from 'expo-av';

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'dodgerblue',
    height: 100,
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 14,
  },
});

export default function Card({ name, play, setTitle }) {
  const [sounds, setSound] = useState();

  /// /// THIS VERSION SOUND PLAYS AT ONCE
  // async function playSound() {
  //   console.log('Loading Sound');
  //   const { sound } = await Audio.Sound.createAsync(
  //     require('../../assets/sample.mp3'),
  //   );
  //   setSound(sound);
  //   console.log('Playing Sound');
  //   await sound.playAsync();
  // }

  // // async function stopRecording() {
  // //   console.log('Stopping recording..');
  // //   setRecording(undefined);
  // //   await recording.stopAndUnloadAsync();
  // //   await Audio.setAudioModeAsync(
  // //     {
  // //       allowsRecordingIOS: false,
  // //     },
  // //   );
  // //   const uri = recording.getURI();
  // //   console.log('Recording stopped and stored at', uri);
  // // }

  // const handlePress = () => {
  //   console.log('Pressed');
  //   console.log('play: ', play);
  //   setTitle(name);
  // };

  // useEffect(() => (sounds
  //   ? () => {
  //     console.log('Unloading Sound');
  //     sounds.unloadAsync();
  //   }
  //   : undefined), [sounds]);

  // return (
  //   <>
  //     {play ? playSound() : null}
  //     <Pressable style={styles.card} onPress={handlePress}>
  //       <View>
  //         <Text>{name}</Text>
  //       </View>
  //     </Pressable>
  //   </>
  // );
  /// /////////////////////////////////////////

  // THIS VERSION TOO EXCEPT WITHOUT ERROR
  useEffect(() => {
    async function playSound() {
      console.log('Loading Sound');
      const { sound } = await Audio.Sound.createAsync(
        require('../../assets/sample.mp3'),
      );
      setSound(sound);
      console.log('Playing Sound');
      await sound.playAsync();
    }

    if (play) {
      playSound();
    }

    return () => {
      if (sounds) {
        console.log('Unloading Sound');
        sounds.stopAsync(); // Stop the sound if it's playing
        sounds.unloadAsync();
      }
    };
  }, [play]);

  const handlePress = () => {
    console.log('Pressed');
    console.log('play: ', play);
    setTitle(name);
  };

  return (
    <Pressable style={styles.card} onPress={handlePress}>
      <View>
        <Text>{name}</Text>
      </View>
    </Pressable>
  );
}

Card.propTypes = {
  name: PropTypes.string.isRequired,
  play: PropTypes.bool.isRequired,
  setTitle: PropTypes.func.isRequired,
};
