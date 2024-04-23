import React, { useState } from 'react';
import {
  StyleSheet, Text, View, Pressable, Image,
} from 'react-native';
import axios from 'axios';
import PropTypes from 'prop-types';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#43456f',
    alignItems: 'center',
    borderColor: 'red',
    borderWidth: '5 px',
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
  randomButton: {
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
  imageContainer: {
    overflow: 'hidden',
    alignItems: 'center',
    backgroundColor: '#ccc',
    position: 'relative',
    height: '30%',
    width: '65%',
    margin: 16,
  },
  saveResultButtonBody: {
    color: 'black',
    fontSize: 16,
  },
  gradientButton: {
    // padding: 10,
    // borderRadius: 5,
    // alignItems: 'center',
    // justifyContent: 'center',
    // flex: 1,
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
    <View style={styles.container}>
      <Text style={styles.heading}>Where is the title</Text>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
        />
      </View>
      <View>
        {resultShown ? (
          <Text style={styles.heading}>
            {title}
            {' '}
            Result
          </Text>
        ) : (
          <Text style={styles.heading}>
            {title}
            !
          </Text>
        )}
      </View>
      <Text style={styles.body}>{object}</Text>
      <LinearGradient
        colors={['green', 'blue']}
        style={styles.gradientButton}
        start={{ x: 0, y: 0 }} // Optional: Set gradient start
        end={{ x: 1, y: 0 }}
      >
        <Pressable style={styles.randomButton} onPress={getObject}>
          <Ionicons name="shuffle" size={24} color="white" />
          <Text style={styles.body}>  Randomize</Text>
        </Pressable>
      </LinearGradient>

      <View style={styles.container}>
        {resultShown ? (
          <Pressable style={styles.saveResultButton}>
            <Text style={styles.saveResultButtonBody}>Save Result</Text>
          </Pressable>
        ) : <View />}
      </View>
    </View>
  );
}

StoryStarterComponent.propTypes = {
  title: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
};
