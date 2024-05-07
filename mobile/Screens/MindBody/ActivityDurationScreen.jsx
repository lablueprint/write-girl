/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, Pressable, Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import { useRoute } from '@react-navigation/native';
import * as Progress from 'react-native-progress';

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
    fontSize: 24,
    textAlign: 'left',
    marginBottom: 16,
  },
  optionBody: {
    color: '#fff',
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

export default function MindBodyScreen({ navigation }) {
  const [option, setOption] = useState('');
  const route = useRoute();
  const navigateToMindBodyDeckScreen = () => {
    if (option !== '') {
      navigation.navigate('Mind and Body Deck', {
        type: route.params?.type,
        duration: option,
      });
    }
  };

  const selectBrisk = () => {
    setOption('brisk');
  };
  const selectCasual = () => {
    setOption('casual');
  };
  const selectVacation = () => {
    setOption('vacation');
  };

  return (
    <View style={styles.container}>
      <Progress.Bar progress={0.666} width={windowWidth * 0.8} height={16} borderRadius={50} borderWidth={0} unfilledColor="#333333" color="white" style={styles.bar} />
      <Text style={styles.heading}>How much time would you like to allocate to this break?</Text>
      <Pressable style={[option === 'brisk' ? styles.selectedOption : styles.unselectedOption]} onPress={selectBrisk}>
        <Text style={styles.optionHeading}>Brisk</Text>
        <Text style={styles.optionBody}>Rejuvenate with a brief break</Text>
      </Pressable>
      <Pressable style={[option === 'casual' ? styles.selectedOption : styles.unselectedOption]} onPress={selectCasual}>
        <Text style={styles.optionHeading}>Casual</Text>
        <Text style={styles.optionBody}>Relax with a 5-10-minute-long break</Text>
      </Pressable>
      <Pressable style={[option === 'vacation' ? styles.selectedOption : styles.unselectedOption]} onPress={selectVacation}>
        <Text style={styles.optionHeading}>Vacation</Text>
        <Text style={styles.optionBody}>Take a break for 10 minutes or more to unwind</Text>
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
