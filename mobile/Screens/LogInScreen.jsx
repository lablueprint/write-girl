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
    paddingTop: 100,
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
  subTitle: {
    marginTop: 5,
    marginBottom: 20,
  },
  smallSubtitle: {
    marginTop: 10,
    marginBottom: 50,
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
  signUpText: {
    textAlign: 'center',
    fontSize: 15,
  },
  signUpRedirect: {
    fontWeight: 'bold',
  },
});
export default function LogIn({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    } else {
      return true;
    }
    return false;
  };

  const handleLogIn = () => {
    if (!checkInputs()) {
      return;
    }
    setEmail('');
    setPassword('');
    navigation.navigate('Home');
  };

  const redirectSignUp = () => {
    navigation.navigate('Sign Up');
  };

  return (
    <View className="logIn" style={styles.container}>
      <View style={styles.centered}>
        <View style={styles.image} />
      </View>
      <Text style={styles.heading}>
        Login
      </Text>
      <Text style={styles.subTitle}>
        Please Sign in to continue.
      </Text>
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
        Forgot your passwords? Reset Here.
      </Text>

      <View style={styles.signButton}>
        <Button title="Sign In" onPress={handleLogIn} color="#000000" />
      </View>
      <Text style={styles.signUpText}>
        Don't have an account?
        <Pressable onPress={redirectSignUp}>
          <Text style={styles.signUpRedirect}> Sign Up</Text>
        </Pressable>
      </Text>
    </View>
  );
}

LogIn.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
