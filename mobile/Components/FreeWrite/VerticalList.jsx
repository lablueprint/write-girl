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
    width: '80%',
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 14,
  },
  allCards: {
    width: '50%',
    flexDirection: 'row',
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
    padding: 10,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    width: '100%',
    padding: 10,
  },
});

const data = [
  {
    id: 1,
    name: 'Rainy Ambience',
  },
  {
    id: 2,
    name: 'Italian Coffee Shop',
  },
  {
    id: 3,
    name: 'Beethoven',
  },
  {
    id: 4,
    name: 'Rainy Ambience',
  },
  {
    id: 5,
    name: 'Italian Coffee Shop',
  },
  {
    id: 6,
    name: 'Beethoven',
  },
  {
    id: 7,
    name: 'Beethoven',
  },
  {
    id: 8,
    name: 'Rainy Ambience',
  },
  {
    id: 9,
    name: 'Italian Coffee Shop',
  },
  {
    id: 10,
    name: 'Beethoven',
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
        {data.map((item) => (
          <View style={styles.allCards}>
            <Card name={item.name} play={play} setTitle={setTitle} />
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
