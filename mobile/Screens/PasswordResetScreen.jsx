import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  View, Text, StyleSheet, Button, TextInput,
} from 'react-native';
import axios from 'axios';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 100,
    padding: 40,
  },
  textfields: {
    fontSize: 16,
    width: '100%',
  },
  inputContainer: {
    backgroundColor: '#D9D9D9',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
    padding: 10,
  },
  errorContainer: {
    backgroundColor: 'red',
  },
  errorMsg: {
    color: 'white',
    fontSize: 16,
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
          <Button title="Back" onPress={redirectLogIn} />
        </View>,
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textfields}
            onChangeText={handleChangeEmail}
            value={email}
            placeholder="Email"
            placeholderTextColor="#000000"
            autoCapitalize="none"
          />
        </View>,
        <Button title="Submit" onPress={sendPasswordReset} />,
      ];
    } else if (step === 'verifyCode') {
      view = [
        <View>
          <Button title="Back" onPress={() => { setStep('getVerification'); }} />
        </View>,
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textfields}
            onChangeText={handleChangeCode}
            placeholder="Verification Code"
            placeholderTextColor="#000000"
            value={code}
          />
        </View>,
        <Button title="Get Another Code" onPress={sendPasswordReset} />,
        <Button title="Check Code" onPress={verifyCode} />,
      ];
    } else if (step === 'inputNewPassword') {
      view = [
        <View>
          <Button title="Cancel" onPress={redirectLogIn} />
        </View>,
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textfields}
            onChangeText={setNewPassword}
            placeholder="New Password"
            placeholderTextColor="#000000"
            autoCapitalize="none"
            value={newPassword}
            secureTextEntry="true"
          />
        </View>,
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textfields}
            onChangeText={setConfirmation}
            placeholder="Confirm New Password"
            placeholderTextColor="#000000"
            autoCapitalize="none"
            value={confirmation}
            secureTextEntry="true"
          />
        </View>,
        <Button title="Reset" onPress={updatePassword} />,
      ];
    }
    return view.map((elem) => elem);
  };

  return (
    <View style={styles.container}>
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
  );
}

PasswordResetScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
