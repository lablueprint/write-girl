/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, Pressable, Dimensions,
} from 'react-native';
import * as Progress from 'react-native-progress';
import PropTypes from 'prop-types';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
  },
  heading: {
    color: '#fff',
    margin: 24,
    fontSize: 24,
    textAlign: 'center',
  },
  body: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
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
    paddingHorizontal: 24,
    borderRadius: 50,
    backgroundColor: 'white',
    width: '50%',
    marginBottom: 24,
  },
  unselectedOption: {
    alignItems: 'left',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: '#333333',
    width: '80%',
    marginBottom: 24,
    borderWidth: '2',
    borderColor: 'black',
  },
  selectedOption: {
    alignItems: 'left',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: '#333333',
    width: '80%',
    marginBottom: 24,
    borderWidth: '2',
    borderColor: 'white',
  },
  bar: {
    marginTop: 32,
  },
});

export default function ActivityTypeScreen({ navigation }) {
  const [option, setOption] = useState('');
  const navigateToActivityDurationScreen = () => {
    if (option !== '') {
      navigation.navigate('Activity Duration', {
        type: option,
      });
    }
  };

  const selectMental = () => {
    setOption('mental');
  };
  const selectPhysical = () => {
    setOption('physical');
  };
  const selectBoth = () => {
    setOption('both');
  };

  return (
    <View style={styles.container}>
      <Progress.Bar progress={0.333} width={windowWidth * 0.8} height={16} borderRadius={50} borderWidth={0} unfilledColor="#333333" color="white" style={styles.bar} />
      <Text style={styles.heading}>What type of break would you prefer right now?</Text>
      <Pressable style={[option === 'mental' ? styles.selectedOption : styles.unselectedOption]} onPress={selectMental}>
        <Text style={styles.optionHeading}>Mental</Text>
        <Text style={styles.optionBody}>Give your mind a break</Text>
      </Pressable>
      <Pressable style={[option === 'physical' ? styles.selectedOption : styles.unselectedOption]} onPress={selectPhysical}>
        <Text style={styles.optionHeading}>Physical</Text>
        <Text style={styles.optionBody}>Adjust your posture, stretch, and hydrate</Text>
      </Pressable>
      <Pressable style={[option === 'both' ? styles.selectedOption : styles.unselectedOption]} onPress={selectBoth}>
        <Text style={styles.optionHeading}>Both</Text>
        <Text style={styles.optionBody}>Take a moment to stretch and clear your mind</Text>
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
