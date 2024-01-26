import React from 'react';
import {
  StyleSheet, Text, View, Pressable, Image,
} from 'react-native';
import PropTypes from 'prop-types';
// import { useRoute } from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e916e',
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
  image: {
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
});
// const route = useRoute();

export default function PlotPointsScreen({ key }) {
  return (
    <View style={styles.container} key={key}>
      <Text style={styles.heading}>Plot Points</Text>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
        />
      </View>
      <Text style={styles.heading}>Plot point!</Text>
      <Text style={styles.body}>
        Get a random plot point for your story
      </Text>
      <Pressable style={styles.randomButton}>
        <Text style={styles.body}>Randomize</Text>
      </Pressable>
    </View>
  );
}

PlotPointsScreen.propTypes = {
  key: PropTypes.number.isRequired,
};
