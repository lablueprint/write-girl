import React, { useState } from 'react';
import {
  StyleSheet, Text, View, Pressable, Image,
} from 'react-native';
import axios from 'axios';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3b6674',
    alignItems: 'center',
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
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 50,
    backgroundColor: 'black',
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
});

export default function TraitsScreen() {
  const [trait, setTrait] = useState('Get a random character trait for your story');
  const [resultShown, setResultShown] = useState(false);

  const getTrait = async () => {
    try {
      const randomTrait = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/characterTrait/get`, { timeout: 20000 });
      setTrait(randomTrait.data);
      setResultShown(true);
    } catch (err) {
      console.error(err);
    }
    return true;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Character Traits</Text>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
        />
      </View>
      <View>
        {resultShown ? (
          <Text style={styles.heading}>Character Trait Result</Text>
        ) : <Text style={styles.heading}>Character Trait!</Text>}
      </View>
      <Text style={styles.body}>{trait}</Text>
      <Pressable style={styles.randomButton} onPress={getTrait}>
        <Text style={styles.body}>Randomize</Text>
      </Pressable>
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
