import { React, useState } from 'react';
import {
  View, TextInput, Button, StyleSheet, Text, Pressable, Image, Alert,
} from 'react-native';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import * as SecureStore from 'expo-secure-store';
import welcomeIcon from '../assets/welcomeIcon.png';
import { login } from '../redux/sliceAuth';

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
  loginButton: {
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
  resetButton: {
    fontSize: 10,
    textDecorationLine: 'underline',
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
  const [password, onChangePassword] = useState('');
  const dispatch = useDispatch();
  const [hiddenPassword, onChangeHiddenPassword] = useState('');
  const [bool, setBool] = useState(false);

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

  const storeToken = async () => {
    try {
      await SecureStore.setItemAsync('email', email);
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogIn = async () => {
    try {
      const userData = {
        email,
        password,
      };
      const res = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/user/user-log-in`, userData);
      console.log('res: ', res);
      if (res.data.error) {
        console.error(res.data.error);
        console.log('couldnt find?');
      } else {
        // Create tokens for persistent data
        console.log(res.data);
        console.log('hi');
        await dispatch(login(res.data));
        await storeToken();
      }
    } catch (err) {
      console.error(err.message);
      Alert.alert('Error', 'Invalid username or password');
    }
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
        Please Login to continue.
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
          secureTextEntry={bool}
          onChangeText={handleChangePassword}
          value={hiddenPassword}
          placeholder="Password"
          placeholderTextColor="#000000"
        />
      </View>

      <Text style={styles.smallSubtitle}>
        Forgot your passwords?
        <Pressable>
          <Text style={styles.resetButton}> Reset Here.</Text>
        </Pressable>
      </Text>

      <View style={styles.loginButton}>
        <Button title="Log In" onPress={handleLogIn} color="#000000" />
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
