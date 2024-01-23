import React from 'react';
import {
  StyleSheet, Text, View, Pressable, Image,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#43456f',
    alignItems: 'center',
    justifyContent: 'center',
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
    elevation: 3,
    backgroundColor: 'black',
    marginTop: 64,
    width: 300,
  },
  image: {
  },
  imageContainer: {
    overflow: 'hidden',
    alignItems: 'center',
    backgroundColor: '#ccc',
    position: 'relative',
    height: '35%',
    width: '65%',
    margin: 16,
  },
});

export default function ObjectsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Objects</Text>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
        />
      </View>
      <Text style={styles.heading}>Object!</Text>
      <Text style={styles.body}>
        Get a random object for your story
      </Text>
      <Pressable style={styles.randomButton}>
        <Text style={styles.body}>Randomize</Text>
      </Pressable>
    </View>
  );
}
