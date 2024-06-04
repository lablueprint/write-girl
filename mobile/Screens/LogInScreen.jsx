import { React, useState } from 'react';
import {
  // eslint-disable-next-line max-len
  View, TextInput, StyleSheet, Text, Pressable, Image, ImageBackground, Dimensions, TouchableOpacity, Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import emailIcon from '../assets/sign-up/emailIcon.png';
import passwordIcon from '../assets/sign-up/passwordIcon.png';
import welcomeBackground from '../assets/sign-up/signupbackground.png';
import warningIcon from '../assets/sign-up/warning.png';

const { width: screenWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    width: '100%',
    height: '100%',
  },
  paddingContainer: {
    paddingLeft: 30,
    paddingRight: 30,
  },
  heading: {
    marginTop: 120,
    paddingBottom: 70,
    fontSize: 50,
    color: 'white',
    fontFamily: 'Helvetica Neue',
    fontWeight: 'bold',
    lineHeight: 50,
    maxWidth: screenWidth * 0.7,
  },
  forgotContainer: {
    paddingTop: 20,
    paddingBottom: 35,
  },
  resetButton: {
    fontSize: 16,
    textAlign: 'right',
    fontFamily: 'Helvetica Neue',
    color: 'white',
  },
  textfields: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Helvetica Neue',
  },
  inputContainer: {
    backgroundColor: '#ffffff33',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    marginTop: 14,
    padding: 14,
  },
  inputContainerWarning: {
    backgroundColor: '#DE5B45', // Change to red for warnings
  },
  icon: {
    marginRight: 14,
    marginLeft: 10,
  },
  signButton: {
    backgroundColor: '#BFD25A',
    borderRadius: 14,
    marginTop: 20,
    marginBottom: 10,
    padding: 5,
  },
  button: {
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#214553',
    fontSize: 18,
    fontFamily: 'Helvetica Neue',
  },
  signUpText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white',
    fontFamily: 'Helvetica Neue',
  },
  signUpRedirect: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Helvetica Neue',
    textDecorationLine: 'underline',
  },
  signUpTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
  },
  warningIcon: {
    height: 15,
    width: 15,
    marginRight: 10,
  },
  emailWarningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 14,
    borderRadius: 14,
  },
  emailWarningText: {
    color: 'red',
    fontSize: 16,
  },
  passwordWarningContainer: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 14,
    borderRadius: 14,
  },
  passwordWarningText: {
    color: 'red',
    fontSize: 16,
  },
});
export default function LogIn({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, onChangePassword] = useState('');

  const [hiddenPassword, onChangeHiddenPassword] = useState('');
  const [bool, setBool] = useState(false);

  const [emailWarning, setEmailWarning] = useState(false);
  const [passwordWarning, setPasswordWarning] = useState(false);

  // Make the display of the password hidden
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

  const handleLogIn = () => {
    if (email !== 'Writegirl@gmail.com') {
      setEmailWarning(true);
    } else if (password !== '12345678') {
      setPasswordWarning(true);
      if (email === 'Writegirl@gmail.com') {
        setEmailWarning(false);
      }
    } else {
      setEmailWarning(false);
      setPasswordWarning(false);
      setEmail('');
      onChangePassword('');
      navigation.navigate('Home');
    }
  };

  const redirectSignUp = () => {
    navigation.navigate('Sign Up');
  };

  const redirectPasswordReset = () => {
    navigation.navigate('Forgot Password');
  };

  return (
    <View className="logIn" style={styles.container}>
      <ImageBackground
        source={welcomeBackground} // Replace with your image path
        style={styles.imageBackground}
      >
        <View style={styles.paddingContainer}>
          <Text style={styles.heading}>
            Nice to see you again!
          </Text>
          {(emailWarning) && (
            <View style={styles.emailWarningContainer}>
              <Image source={warningIcon} style={styles.warningIcon} />
              <Text style={styles.emailWarningText}>Hmmm... we don't recognize that email</Text>
            </View>
          )}
          <View style={[styles.inputContainer, emailWarning && styles.inputContainerWarning]}>
            <Image source={emailIcon} style={styles.icon} />
            <TextInput
              style={styles.textfields}
              onChangeText={setEmail}
              value={email}
              placeholder="Email Address"
              placeholderTextColor="white"
            />
          </View>
          <View style={[styles.inputContainer, passwordWarning && styles.inputContainerWarning]}>
            <Image source={passwordIcon} style={styles.icon} />
            <TextInput
              style={styles.textfields}
              secureTextEntry={bool}
              onChangeText={handleChangePassword}
              value={hiddenPassword}
              placeholder="Password"
              placeholderTextColor="white"
            />
          </View>
          {(passwordWarning) && (
            <View style={styles.passwordWarningContainer}>
              <Image source={warningIcon} style={styles.warningIcon} />
              <Text style={styles.passwordWarningText}>Ooops! That's the wrong password</Text>
            </View>
          )}

          <View style={styles.forgotContainer}>
            <Pressable onPress={redirectPasswordReset}>
              <Text style={styles.resetButton}> Forgot Password? </Text>
            </Pressable>
          </View>

          <View style={styles.signButton}>
            <TouchableOpacity onPress={handleLogIn} style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.signUpTextContainer}>
            <Text style={styles.signUpText}>
              Don't have an account?
            </Text>
            <Pressable onPress={redirectSignUp}>
              <Text style={styles.signUpRedirect}> Sign Up</Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

LogIn.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
