import React, { useState } from 'react';
import {
  StyleSheet, View, Text, Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const cardHeight = screenHeight * 0.20;
const expandBox = cardHeight * 0.5;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#19333D',
    borderRadius: '20',
    height: cardHeight,
    margin: '5%',
  },
  header: {
    flex: 'row',
    flexDirection: 'row',
    backgroundColor: 'blue',
    paddingVertical: '5%',
    paddingHorizontal: '5%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: expandBox,
    // width: 100% - expandBox,
    width: '80%',
  },
  headerText: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  expand: {
    backgroundColor: '#151716',
    height: expandBox,
    width: expandBox,
    borderRadius: '20',
  },
});

// Pulls the associated Triple Flip from AWS with the respective flipID :D
export default function TripleFlipHistoryCard({ flipId, date }) {
  console.log(date);
  const current = new Date(date);
  const dateInfo = current.toLocaleDateString('en-US', { weekday: 'long' }).split(', ');

  return (
    <View style={styles.card}>
      <View style={{ flex: 1, flexDirection: 'row', height: '20%' }}>
        <View style={styles.header}>
          <Text style={[styles.headerText, { color: '#BFD25A' }]}>
            {dateInfo[0]}
            ,
          </Text>
          <Text style={[styles.headerText, { color: '#FFF' }]}>{dateInfo[1]}</Text>
        </View>
        <View style={styles.expand}>
          <Text>
            ICON
          </Text>
        </View>
      </View>
      <View style={{ backgroundColor: 'red', borderTopRightRadius: '20', height: '50%' }}>
        <Text>{flipId}</Text>
      </View>

    </View>
  );
}
TripleFlipHistoryCard.propTypes = {
  flipId: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};
