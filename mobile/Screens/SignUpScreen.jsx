import { React, useState } from 'react';
import {
  View, TextInput, Button, Alert, StyleSheet, Text, Pressable, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import welcomeIcon from '../assets/welcomeIcon.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 40,
  },
  centered: {
    alignItems: 'center',
  },
  signButton: {
    backgroundColor: '#D9D9D9',
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 10,
    padding: 5,
  },
  heading: {
    marginTop: 10,
    fontSize: 40,
  },
  smallSubtitle: {
    marginTop: 10,
    fontSize: 10,
  },
  textfields: {
    fontSize: 16,
  },
  inputContainer: {
    backgroundColor: '#D9D9D9',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
    padding: 10,
  },
  icon: {
    marginRight: 5,
    width: 20,
    height: 23,
  },
  image: {
    width: 254,
    height: 254,
    backgroundColor: '#DCDCDC',
  },
  logInText: {
    textAlign: 'center',
    fontSize: 15,
  },
});
export default function SignUp({ navigation }) {
  const [firstName, setFirstName] = useState('');
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
    if (email === '') {
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
    setFirstName('');
    setEmail('');
    setPassword('');
    navigation.navigate('Home');
  };

  const handleLogIn = () => {
    navigation.navigate('Log In');
  };

  return (
    <View className="signUp" style={styles.container}>
      <View style={styles.centered}>
        <View style={styles.image} />
      </View>
      <Text style={styles.heading}>
        Register
      </Text>
      <Text>
        Please Register to login.
      </Text>
      <Text style={styles.smallSubtitle}>
        So we can call you by your name!
      </Text>
      <View style={styles.inputContainer}>
        <Image source={welcomeIcon} style={styles.icon} />
        <TextInput
          style={styles.textfields}
          onChangeText={setFirstName}
          value={firstName}
          placeholder="First Name"
          placeholderTextColor="#000000"
        />
      </View>
      <View style={styles.inputContainer}>
        <Image source={welcomeIcon} style={styles.icon} />
        <TextInput
          style={styles.textfields}
          onChangeText={setEmail}
          value={email}
          placeholder="Email Address"
          placeholderTextColor="#000000"
        />
      </View>
      <View style={styles.inputContainer}>
        <Image source={welcomeIcon} style={styles.icon} />
        <TextInput
          style={styles.textfields}
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
          placeholderTextColor="#000000"
        />
      </View>

      <Text style={styles.smallSubtitle}>
        We'd love to know where you're from!
      </Text>

      <View style={styles.signButton}>
        <Button title="Sign Up" onPress={handleSignUp} color="#000000" />
      </View>
      <Text style={styles.logInText}>
        Already have an account?
        <Pressable onPress={handleLogIn}>
          <Text style={styles.logInText}> Log In</Text>
        </Pressable>
      </Text>
    </View>
  );
}

SignUp.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
