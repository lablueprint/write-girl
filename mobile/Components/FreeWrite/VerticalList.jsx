import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, Pressable,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // top: '50%',
    // flex: 1,
    // position: 'absolute',
    // top: '110%',
    width: '80%',
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 14,
  },
  card: {
    backgroundColor: 'dodgerblue',
    height: 100,
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
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

const handlePress = () => {
  console.log('Pressed!');
};
function Card({ name }) {
  return (
    <Pressable style={styles.card} onPress={handlePress}>
      <View>
        <Text>{name}</Text>
      </View>
    </Pressable>

  );
}

export default function VerticalList({ title }) {
  return (
    <View>
      <View style={styles.line} />
      <Text style={styles.title}>{title}</Text>
      <ScrollView
        contentContainerStyle={styles.listContainer}
      >
        {data.map((item) => (
          <View style={styles.allCards}>
            <Card name={item.name} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

Card.propTypes = {
  name: PropTypes.string.isRequired,
};

VerticalList.propTypes = {
  title: PropTypes.string.isRequired,
};
