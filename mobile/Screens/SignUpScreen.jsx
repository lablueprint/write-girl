import { React, useState } from 'react';
import {
  View, TextInput, Button, Alert, StyleSheet, Text, Pressable, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import axios from 'axios';
import Storage from '../Components/Storage';
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
  logInRedirect: {
    fontWeight: 'bold',
  },
});
export default function SignUp({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, onChangePassword] = useState('');
  // const [password, setPassword] = useState('');
  // const [confirmedPassword, setConfirmedPassword] = useState('');

  const [hiddenPassword, onChangeHiddenPassword] = useState('');
  const [bool, setBool] = useState(false);

  const validateEmail = (text) => {
    const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w\w+)+$/;
    return (reg.test(text));
  };

  const handleChangePassword = (newText) => {
    const lastLetter = newText.slice(-1);
    if (newText.length > password.length) {
      onChangePassword(password + lastLetter);
    } else if (newText.length < password.length) {
      onChangePassword(password.slice(0, newText.length));
    } else if (newText === '') {
      onChangePassword('');
      setBool(false);
    }
    let newTextWithDots = '';
    newText.split('').forEach((char, index, array) => {
      if (index === array.length - 1) {
        newTextWithDots += char;
      } else {
        newTextWithDots += '•';
      }
    });
    onChangeHiddenPassword(newTextWithDots);
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
      return true;
      // Alert.alert('Password confirmation does not match password');
    } else {
      return true;
    }
    return false;
  };

  const handleSignUp = async () => {
    if (!checkInputs()) {
      return;
    }
    setFirstName('');
    setEmail('');
    // setPassword('');
    onChangePassword('');
    // setConfirmedPassword('');
    try {
      const userData = {
        email,
        password,
      };
      const res = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/user/post`, userData);
      if (res.data.error) {
        console.error(res.data.error);
      } else {
        const userId = res.data._id;
        console.log('userId: ', userId);
        Storage({ key: 'hello', value: userId, saveKey: true });
        navigation.navigate('Home');
      }
    } catch (err) {
      console.log(err.message);
    }
    onChangePassword('');
    navigation.navigate('Home');
  };

  const redirectLogIn = () => {
    navigation.navigate('Log In');
  };

  const redirectHome = () => {
    navigation.navigate('Home');
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
          secureTextEntry={bool}
          onChangeText={handleChangePassword}
          value={hiddenPassword}
          placeholder="Password"
          placeholderTextColor="#000000"
        />
      </View>

      <Text style={styles.smallSubtitle}>
        We&apos;d love to know where you&apos;re from!
      </Text>

      <View style={styles.signButton}>
        <Button title="Sign Up" onPress={handleSignUp} color="#000000" />
      </View>
      <Text style={styles.logInText}>
        Already have an account?
        <Pressable onPress={redirectLogIn}>
          <Text style={styles.logInRedirect}> Log In</Text>
        </Pressable>
      </Text>
      <View>
        <Button title="Super Special Dev Button😈" onPress={redirectHome} color="#000000" />
      </View>
    </View>
  );
}

SignUp.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
