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
});

export default function PasswordResetScreen({ navigation }) {
  // getVerification, verifyCode, inputNewPassword, successPage
  const [step, setStep] = useState('getVerification');
  const [email, handleChangeEmail] = useState('');
  const [hashedCode, updateHashedCode] = useState(null);
  const [code, handleChangeCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const redirectLogIn = () => {
    navigation.navigate('Log In');
  };

  const sendPasswordReset = async () => {
    // TODO: Check if this is a valid email format
    const data = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/passwordReset/verifyEmail`, { email });
    const codeData = data.data;
    // If no valid email was found, we return -1.
    if (codeData === '-1') {
      // error!
      console.log('User does not exist');
      // TODO: Banner to indicate that user does not exist
      return;
    }
    console.log('hashedCode: ', codeData);
    updateHashedCode(codeData);
    setStep('verifyCode');
  };

  const verifyCode = async () => {
    const data = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/passwordReset/verifyCode`, { code, hashedCode });
    const match = data.data;
    if (match) {
      console.log('Code matches');
      setStep('inputNewPassword');
    }
    // TODO: Banner if code doesn't match, have some indicator
    // else we indicate to user that code doesn't match, retry
  };

  const updatePassword = async () => {
    console.log('password update pressed');
    const data = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/passwordReset/updatePassword`, { email, newPassword });
    // TODO: Banner to indicate that it doesn't match OR disallow from pressing RESET until match
    redirectLogIn();
  };

  const updateDisplay = () => {
    let view = [<View />];
    console.log('Current step', step);
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
        <Button title="Reset" onPress={updatePassword} disabled={newPassword !== confirmation || newPassword.length < 5} />,
      ];
    } else {
      view = [
        <View>
          <Text>
            Password succesfully reset.
          </Text>
        </View>,
      ];
    }
    return view.map((elem) => elem);
  };

  return (
    <View style={styles.container}>
      {updateDisplay()}
    </View>
  );
}

PasswordResetScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
