import React from 'react';
import {
  View, StyleSheet, Text, Image, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import playButton from '../assets/doors/play-button.png';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#ffffff1a',
    borderRadius: '14',
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    color: 'white',
    fontFamily: 'Helvetica Neue',
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  description: {
    color: 'white',
    fontFamily: 'Helvetica Neue',
    fontSize: 16,
  },
  playButton: {
    paddingTop: 10,
  },
  leftSide: {
    flex: 1,
    flexDirection: 'column',
  },
  doorImage: {
    height: 150,
    width: 150,
  },
});

export default function DoorListViewCard({
  title, description, image, handlePlayButton,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.leftSide}>
        <Text style={styles.title}>
          {title}
        </Text>
        <Text style={styles.description}>
          {description}
        </Text>
        <TouchableOpacity onPress={handlePlayButton} style={styles.playButton}>
          <Image source={playButton} />
        </TouchableOpacity>
      </View>
      <Image
        source={image}
        style={styles.doorImage}
      />
    </View>
  );
}

DoorListViewCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
  ]).isRequired,
  handlePlayButton: PropTypes.func.isRequired,
};
