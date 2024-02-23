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

export default function ActivityTypeScreen({ navigation }) {
  const [option, setOption] = useState('');
  const navigateToActivityDurationScreen = () => {
    if (option !== '') {
      navigation.navigate('Activity Duration');
    }
  };

  const selectMental = () => {
    setOption('Mental');
  };
  const selectPhysical = () => {
    setOption('Physical');
  };
  const selectBoth = () => {
    setOption('Both');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>What type of break would you prefer right now?</Text>
      <Pressable style={[option === 'Mental' ? styles.selectedOption : styles.unselectedOption]} onPress={selectMental}>
        <Text style={styles.optionHeading}>Mental</Text>
        <Text style={styles.optionBody}>Give your mind a break</Text>
      </Pressable>
      <Pressable style={[option === 'Physical' ? styles.selectedOption : styles.unselectedOption]} onPress={selectPhysical}>
        <Text style={styles.optionHeading}>Physical</Text>
        <Text style={styles.optionBody}>Give your mind a break</Text>
      </Pressable>
      <Pressable style={[option === 'Both' ? styles.selectedOption : styles.unselectedOption]} onPress={selectBoth}>
        <Text style={styles.optionHeading}>Both</Text>
        <Text style={styles.optionBody}>Give your mind a break</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={navigateToActivityDurationScreen}>
        <Text style={styles.buttonBody}>Next</Text>
      </Pressable>
    </View>
  );
}

ActivityTypeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
