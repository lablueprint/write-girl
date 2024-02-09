import { React, useState } from 'react';
import {
  View, TextInput, Button, Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import axios from 'axios';
import Storage from '../Components/Storage';

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
      Alert.alert('Password must be longer than five characters');
    } else if (password !== confirmedPassword) {
      Alert.alert('Password confirmation does not match password');
    } else {
      return true;
    }
    return false;
  };

  const handleSignUp = async () => {
    if (!checkInputs()) {
      return;
    }
    setEmail('');
    setPassword('');
    setConfirmedPassword('');
    try {
      const userData = {
        email,
        password,
      };
      const res = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/user/post`, userData);
      if (res.data.error) {
        console.error(res.data.error);
      } else {
        // const userId = res.data._id;
        const userId = '65c1caacab4c3d281f5f1aa2';
        console.log('userId: ', userId);
        Storage({ key: 'hello', value: userId, saveKey: true });
        // Storage(key, userId, true);
        // console.log('hiiii: ', userId);
        navigation.navigate('Home');
      }
    } catch (err) {
      console.log(err.message);
    }
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
