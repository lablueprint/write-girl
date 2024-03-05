import React from 'react';
import {
  View, Text, StyleSheet, Image,
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    justifyContent: 'center',
  },
  title:{
    fontWeight: '800',
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontWeight: '300',
    textAlign: 'center',
    paddingHorizontal: 64,
  },
});

export default function OnboardingItem({ item }) {
  return (
    <View style={styles.container}>
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
