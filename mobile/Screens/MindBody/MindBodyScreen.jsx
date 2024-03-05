import React from 'react';
import {
  View, Text, StyleSheet, Pressable,
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    color: '#fff',
    margin: 32,
    fontSize: 24,
    textAlign: 'center',
  },
  body: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
  },
  buttonBody: {
    color: '#000',
    fontSize: 16,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 50,
    backgroundColor: 'white',
    width: '50%',
    marginBottom: 32,
  },
});

export default function MindBodyScreen({ navigation }) {
  const navigateToActivityTypeScreen = () => {
    navigation.navigate('Activity Type');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Mind and Body Moment</Text>
      <Text style={styles.body}>Remember to take moments for yourself in your writing process</Text>
      <Pressable style={styles.button} onPress={navigateToActivityTypeScreen}>
        <Text style={styles.buttonBody}>Continue</Text>
      </Pressable>
    </View>
  );
}

MindBodyScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
