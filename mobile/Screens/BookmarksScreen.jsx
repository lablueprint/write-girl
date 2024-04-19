import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, Button, TouchableOpacity, Dimensions, ScrollView, Image,
} from 'react-native';
import axios from 'axios';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    gap: 0,
    padding: 20,
    paddingTop: 60,
  },
  heading: {
    fontSize: 32,
    color: '#fff',
    marginBottom: 20,
  },
  collection: {
    backgroundColor: 'white',
  },
});

const collections = ['All Saved', 'Sample 1', 'Sample 2'];

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
        <Text styles={{ color: 'white' }}>
          All Saved
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
