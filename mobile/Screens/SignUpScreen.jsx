import { React, useState } from 'react';
import {
  View, TextInput, Button, Alert,
} from 'react-native';
import PropTypes from 'prop-types';

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');

  const validateEmail = (text) => {
    const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w\w+)+$/;
    return (reg.test(text));
  };

  const checkInputs = () => {
    if (email === '') {
      Alert.alert('Please enter an email to proceed');
    } else if (!validateEmail(email)) {
      Alert.alert('Please enter a valid email to proceed');
    } else if (password === '') {
      Alert.alert('Please enter a password to proceed');
    } else if (password.length < 6) {
      Alert.alert('Password must be longer than five');
    } else if (password !== confirmedPassword) {
      Alert.alert('Password confirmation does not match password');
    } else {
      return true;
    }
    return false;
  };

  const handleSignUp = () => {
    if (!checkInputs()) {
      return;
    }
    setEmail('');
    setPassword('');
    navigation.navigate('Home');
  };

  return (
    <View className="signUp">
      <TextInput
        onChangeText={setEmail}
        value={email}
        placeholder="Please enter your email"
      />
      <TextInput
        onChangeText={setPassword}
        value={password}
        placeholder="Please enter your password"
      />
      <TextInput
        onChangeText={setConfirmedPassword}
        value={confirmedPassword}
        placeholder="Please confirm your password"
      />

      <Button title="Sign Up!" onPress={handleSignUp} />
    </View>
  );
}

SignUp.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
