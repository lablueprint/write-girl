import { React, useState } from 'react';
import {
  View, TextInput, Button, Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import { StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  signButton: {
    backgroundColor: '#D9D9D9',
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 10,
    padding: 5,
  },
  heading: {
    fontSize: 40,
  },
  textfields: {
    fontSize: 16,
    backgroundColor: '#D9D9D9',
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
    padding: 15,
  },
  image: {
    width: 254,
    height: 254,
    backgroundColor: '#DCDCDC',
  },
});
export default function SignUp({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  /* const [confirmedPassword, setConfirmedPassword] = useState(''); */

  const validateEmail = (text) => {
    const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      return false;
    }
    return true;
  };

  const checkInputs = () => {
    if (username === '') {
      Alert.alert('Please enter an username to proceed');
    } else if (email === '') {
      Alert.alert('Please enter an email to proceed');
    } else if (!validateEmail(email)) {
      Alert.alert('Please enter a valid email to proceed');
    } else if (password === '') {
      Alert.alert('Please enter a password to proceed');
    } else if (password.length < 6) {
      Alert.alert('Password must be longer than five');
    } /* else if (password !== confirmedPassword) {
      Alert.alert('Password confirmation does not match password');
    } */ else {
      return true;
    }
    return false;
  };

  const handleSignUp = () => {
    if (!checkInputs()) {
      return;
    }
    setUsername('');
    setEmail('');
    setPassword('');
    navigation.navigate('Home');
  };

  const handleLogIn = () => {
    navigation.navigate('Log In');
  };

  return (
    <View className="signUp" style={styles.container}>
      <View style={styles.image} />
      <Text style={styles.heading}>
        Register
      </Text>
      <Text>
        Please Register to login.
      </Text>
      <TextInput
        style={styles.textfields}
        onChangeText={setUsername}
        value={username}
        placeholder="Username"
      />
      <TextInput
        style={styles.textfields}
        onChangeText={setEmail}
        value={email}
        placeholder="Email Address"
      />
      <TextInput
        style={styles.textfields}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
      />

      <View style={styles.signButton}>
        <Button title="Sign Up" onPress={handleSignUp} color="#000000" />
      </View>
      <Text>
        Already have an account?
        <Button title="Log In" onPress={handleLogIn} color="#000000" />
      </Text>
    </View>
  );
}

SignUp.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
