import { React } from 'react';
import PropTypes from 'prop-types';
import {
  View, Button, StyleSheet, Text,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function Onboarding({ navigation }) {
  const handleNext = () => {
    navigation.replace('Sign Up');
  };

  return (
    <View style={styles.container}>
      <Text>Onboarding Screen</Text>
      <Button title="Next" onPress={handleNext} color="#000000" />
    </View>
  );
};

Onboarding.propTypes = {
  navigation: PropTypes.shape({
    replace: PropTypes.func,
  }).isRequired,
};
