import React from 'react';
import {
  View, Text, StyleSheet, ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import Card from './Card';

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    // backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 14,
  },
  allCards: {
    width: '100%',
    flexDirection: 'row',
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
    padding: '10%',
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    width: '100%',
    padding: 10,
  },
});

const musicData = [
  {
    id: 1,
    name: 'Rain Sounds',
  },
  {
    id: 2,
    name: 'Forest Sounds',
  },
  {
    id: 3,
    name: 'Ocean Sounds',
  },
  {
    id: 4,
    name: 'Wind Sounds',
  },
  {
    id: 5,
    name: 'Insect Sounds',
  },
  {
    id: 6,
    name: 'Fire Sounds',
  },
];

const imageData = [
  {
    id: 1,
    name: 'Icy River',
    image: require('../../assets/free-write-icons/icyRiver.jpg'),
  },
  {
    id: 2,
    name: 'Cliffs',
    image: require('../../assets/free-write-icons/cliffs.jpg'),
  },
  {
    id: 3,
    name: 'Metropolitan',
    image: require('../../assets/free-write-icons/metropolitan.jpg'),
  },
  {
    id: 4,
    name: 'Snow Forest',
    image: require('../../assets/free-write-icons/snowForest.jpg'),
  },
  {
    id: 5,
    name: 'Holiday Fireplace',
    image: require('../../assets/free-write-icons/holidayFireplace.jpg'),
  },
  {
    id: 6,
    name: 'Sunny Field',
    image: require('../../assets/free-write-icons/sunnyField.jpg'),
  },
  {
    id: 7,
    name: 'Campfire',
    image: require('../../assets/free-write-icons/fire.jpg'),
  },
];

export default function VerticalList({ title, play, setTitle }) {
  return (
    <View>
      <View style={styles.line} />
      <Text style={styles.title}>{title}</Text>
      <ScrollView
        contentContainerStyle={styles.listContainer}
      >
        {title === 'Nature Sounds' ? musicData.map((item) => (
          <View style={styles.allCards}>
            <Card name={item.name} play={play} setTitle={setTitle} />
          </View>
        ))
          : imageData.map((item) => (
            <View style={styles.allCards}>
              <Card name={item.name} play={play} setTitle={setTitle} image={item.image} />
            </View>
          ))}
      </ScrollView>
    </View>
  );
}

VerticalList.propTypes = {
  title: PropTypes.string.isRequired,
  play: PropTypes.bool.isRequired,
  setTitle: PropTypes.func.isRequired,
};