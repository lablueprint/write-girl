import React, { useState } from 'react';
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
  optionHeading: {
    color: '#fff',
    margin: 8,
    fontSize: 24,
    textAlign: 'left',
  },
  optionBody: {
    color: '#fff',
    margin: 8,
    fontSize: 16,
    textAlign: 'left',
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
  unselectedOption: {
    alignItems: 'left',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: '#333333',
    width: '80%',
    marginBottom: 32,
  },
  selectedOption: {
    alignItems: 'left',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: '#333333',
    width: '80%',
    marginBottom: 32,
    borderWidth: '2',
    borderColor: 'white',
  },
});

export default function MindBodyScreen({ navigation }) {
  const [option, setOption] = useState('');
  const navigateToMindBodyDeckScreen = () => {
    if (option !== '') {
      navigation.navigate('Mind and Body Deck');
    }
  };

  const selectBrisk = () => {
    setOption('Brisk');
  };
  const selectCasual = () => {
    setOption('Casual');
  };
  const selectVacation = () => {
    setOption('Vacation');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>How much time would you like to allocate to this break?</Text>
      <Pressable style={[option === 'Brisk' ? styles.selectedOption : styles.unselectedOption]} onPress={selectBrisk}>
        <Text style={styles.optionHeading}>Brisk</Text>
        <Text style={styles.optionBody}>Give your mind a break</Text>
      </Pressable>
      <Pressable style={[option === 'Casual' ? styles.selectedOption : styles.unselectedOption]} onPress={selectCasual}>
        <Text style={styles.optionHeading}>Casual</Text>
        <Text style={styles.optionBody}>Give your mind a break</Text>
      </Pressable>
      <Pressable style={[option === 'Vacation' ? styles.selectedOption : styles.unselectedOption]} onPress={selectVacation}>
        <Text style={styles.optionHeading}>Vacation</Text>
        <Text style={styles.optionBody}>Give your mind a break</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={navigateToMindBodyDeckScreen}>
        <Text style={styles.buttonBody}>Next</Text>
      </Pressable>
    </View>
  );
}

MindBodyScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
