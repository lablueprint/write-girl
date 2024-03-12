import React from 'react';
import {
  View, Text, StyleSheet, Image, useWindowDimensions,
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    bottom: '10%',
  },
  image: {
    width: 430,
    height: 500,
    marginBottom: 50,
  },
  title: {
    fontWeight: '800',
    fontSize: 40,
    marginBottom: 20,
    marginLeft: 50,
    color: '#fff',
  },
  description: {
    fontSize: 20,
    marginLeft: 50,
    marginRight: 80,
    color: '#fff',
  },
});

export default function OnboardingItem({ item }) {
  const { width } = useWindowDimensions();

  return (
    <View style={[styles.container, { width }]}>
      <Image source={item.image} style={styles.image} />

      <View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
}

OnboardingItem.propTypes = {
  item: PropTypes.shape({
    image: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};
