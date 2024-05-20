/* eslint-disable max-len */
import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  View, Text, StyleSheet, Button, TextInput, ImageBackground, Image, TouchableOpacity, Pressable,
} from 'react-native';
import axios from 'axios';
import emailIcon from '../assets/sign-up/emailIcon.png';
import passwordIcon from '../assets/sign-up/passwordIcon.png';
import welcomeBackground from '../assets/sign-up/signupbackground.png';

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
    fontSize: 50,
    color: 'white',
    fontFamily: 'Helvetica Neue',
    fontWeight: 'bold',
    lineHeight: 50,
  },
  headingNewPass: {
    marginTop: 120,
    fontSize: 50,
    color: 'white',
    fontFamily: 'Helvetica Neue',
    fontWeight: 'bold',
    lineHeight: 50,
    marginBottom: 50,
  },
  subheading: {
    marginTop: 35,
    marginBottom: 35,
    fontSize: 20,
    color: 'white',
    fontFamily: 'Helvetica Neue',
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
    padding: 14,
  },
  inputContainerCode: {
    backgroundColor: '#ffffff33',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    padding: 20,
    justifyContent: 'center',
  },
  inputContainerNewPass: {
    backgroundColor: '#ffffff33',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    padding: 14,
    marginTop: 20,
  },
  textfieldsCode: {
    fontSize: 70,
    color: 'white',
    fontFamily: 'Helvetica Neue',
    fontWeight: 'bold',
  },
  icon: {
    marginRight: 14,
    marginLeft: 10,
  },
  errorContainer: {
    backgroundColor: 'red',
  },
  errorMsg: {
    color: 'white',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#BFD25A',
    borderRadius: 14,
    marginTop: 60,
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
    fontWeight: 'bold',
  },
  resetTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
  },
  resetText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white',
    fontFamily: 'Helvetica Neue',
  },
  resetRedirect: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Helvetica Neue',
    textDecorationLine: 'underline',
  },
});

export default function PasswordResetScreen({ navigation }) {
  // Steps are: getVerification, verifyCode, inputNewPassword, successPage
  const [step, setStep] = useState('getVerification');
  const [email, handleChangeEmail] = useState('');
  const [hashedCode, updateHashedCode] = useState(null);
  const [code, handleChangeCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  // This is the confirmation of the new password
  const [confirmation, setConfirmation] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const redirectLogIn = () => {
    navigation.navigate('Log In');
  };

  // Sends a verification code if the email exists
  // Outputs error message otherwise
  const sendPasswordReset = async () => {
    const data = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/passwordReset/verifyEmail`, { email });
    const codeData = data.data;
    // If no valid email was found, we return -1.
    if (codeData === -1) {
      setErrorMsg('No Account with this Email');
      return;
    }
    updateHashedCode(codeData);
    setStep('verifyCode');
    setErrorMsg('');
  };

  // Check if the user inputted code is correct
  const verifyCode = async () => {
    const data = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/passwordReset/verifyCode`, { code, hashedCode });
    const match = data.data;
    if (match) {
      setStep('inputNewPassword');
      setErrorMsg('');
      return;
    }
    // Banner if code doesn't match, have some indicator
    // else we indicate to user that code doesn't match, retry
    setErrorMsg('Invalid Code');
  };

  // Updates the user's password
  // Outputs an error message otherwise
  const updatePassword = async () => {
    if (confirmation !== newPassword) {
      setErrorMsg('Confirmation must match the new password.');
      return;
    }
    if (newPassword.length < 5) {
      setErrorMsg('Password must be at least 5 characters.');
      return;
    }
    const data = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/passwordReset/updatePassword`, { email, newPassword });
    redirectLogIn();
    setErrorMsg('');
  };

  // Controls the display based on which step the user is on in the password reset flow
  const updateDisplay = () => {
    let view = [<View />];
    if (step === 'getVerification') {
      view = [
        <View>
          <View key="back1">
            <Button title="Back" onPress={redirectLogIn} />
          </View>
          <Text style={styles.heading}>Forgot your password? </Text>
          <Text style={styles.subheading}>No worries! Enter your email to receive a reset code </Text>
          <View style={styles.inputContainer} key="email">
            <Image source={emailIcon} style={styles.icon} />
            <TextInput
              style={styles.textfields}
              onChangeText={handleChangeEmail}
              value={email}
              placeholder="Email"
              placeholderTextColor="white"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.submitButton}>
            <TouchableOpacity onPress={sendPasswordReset} style={styles.button}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>,
      ];
    } else if (step === 'verifyCode') {
      view = [
        <View>
          <View key="back2">
            <Button title="Back" onPress={() => { setStep('getVerification'); }} />
          </View>
          <Text style={styles.heading}>Forgot your password? </Text>
          <Text style={styles.subheading}>
            We've sent a code to 
            {email}
            . Enter the code you received in your email.
          </Text>
          <View style={styles.inputContainerCode} key="verify">
            <TextInput
              style={styles.textfieldsCode}
              onChangeText={handleChangeCode}
              placeholder="0 0 0 0"
              placeholderTextColor="white"
              value={code}
            />
          </View>
          <View style={styles.submitButton}>
            <TouchableOpacity onPress={verifyCode} style={styles.button}>
              <Text style={styles.buttonText}>Enter</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.resetTextContainer}>
            <Text style={styles.resetText}>
              Didn’t receive the email?
            </Text>
            <Pressable onPress={sendPasswordReset}>
              <Text style={styles.resetRedirect}> Click to resend</Text>
            </Pressable>
          </View>
        </View>,
      ];
    } else if (step === 'inputNewPassword') {
      view = [
        <View>
          <View key="cancel">
            <Button title="Cancel" onPress={redirectLogIn} />
          </View>
          <Text style={styles.headingNewPass}>Password reset </Text>
          <View style={styles.inputContainer} key="newpswd">
            <Image source={passwordIcon} style={styles.icon} />
            <TextInput
              style={styles.textfields}
              onChangeText={setNewPassword}
              placeholder="New Password"
              placeholderTextColor="white"
              autoCapitalize="none"
              value={newPassword}
              secureTextEntry
            />
          </View>
          <View style={styles.inputContainerNewPass} key="confirmpswd">
            <Image source={passwordIcon} style={styles.icon} />
            <TextInput
              style={styles.textfields}
              onChangeText={setConfirmation}
              placeholder="Confirm New Password"
              placeholderTextColor="white"
              autoCapitalize="none"
              value={confirmation}
              secureTextEntry
            />
          </View>
          <View style={styles.submitButton}>
            <TouchableOpacity onPress={updatePassword} style={styles.button}>
              <Text style={styles.buttonText}>Enter</Text>
            </TouchableOpacity>
          </View>
        </View>,
      ];
    }
    return view;
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={welcomeBackground} // Replace with your image path
        style={styles.imageBackground}
      >
        <View style={styles.paddingContainer}>
          {
        errorMsg ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorMsg}>
              {errorMsg}
            </Text>
          </View>
        ) : (
          <View />
        )
      }
          {updateDisplay()}
        </View>
      </ImageBackground>
    </View>
  );
}

PasswordResetScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
