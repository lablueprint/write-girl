import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import TripleFlipCard from '../../Components/TripleFlipCard';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: '5%',
    paddingTop: '15%',
    weidth: screenWidth,
    height: screenHeight,
    backgroundColor: 'grey',
  },
});

export default function TripleFlipScreen() {
  return (
    <View style={styles.container}>
      <View>
        <Text>
          Triple Flips
        </Text>
        <Text>
          Hit the button. Let the collection of ojects and words inspire a poem,
          story or even a song. Don`&apos`t think...
        </Text>
      </View>
      <TripleFlipCard image="../assets/logo.svg" step={0} color="green" />
      <TripleFlipCard image="../assets/logo.svg" step={0} color="blue" />
      <TripleFlipCard image="../assets/logo.svg" step={0} color="red" />
    </View>
  );
}

TripleFlipScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
