import React from 'react';
import {
  StyleSheet, Text, TouchableOpacity, ScrollView, Dimensions, Image,
} from 'react-native';
import PropTypes from 'prop-types';

const window = Dimensions.get('window');
const collectionDim = window.width * 0.5 - 30;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#151716',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    gap: 0,
    padding: '5%',
    paddingTop: '15%',
    paddingBottom: '15%',
  },
  heading: {
    fontSize: 40,
    color: '#fff',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  collection: {
    marginTop: 20,
    width: collectionDim,
  },
  collectionImage: {
    resizeMode: 'cover',
  },
  collectionText: {
    color: '#fff',
    marginTop: 20,
  },
});

export default function BookmarksScreen({ navigation }) {
  const goToAllSaved = () => {
    navigation.navigate('All Saved');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>
        Bookmarks
      </Text>
      <TouchableOpacity onPress={goToAllSaved} style={styles.collection}>
        <Image source={require('../assets/all-saved.png')} style={styles.collectionImage} />
        <Text style={styles.collectionText}>
          All Saved
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

BookmarksScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
