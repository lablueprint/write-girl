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
  const [step, setStep] = useState("getVerification")
  const [email, handleChangeEmail] = useState('');
  const [resetCode, updateCode] = useState(null);
  const redirectLogIn = () => {
    navigation.navigate('Log In');
  };

  const sendPasswordReset = async () => {
    // TODO: Check if this is a valid email format
    const hashedCode = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/passwordReset/verifyEmail`, { email });
    // If no valid email was found, we return -1.
    if (hashedCode === -1) {
      // error!
      return;
    }
    updateCode(hashedCode);
  };

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
            placeholder="Email"
            placeholderTextColor="#000000"
          />
        </View>,
        <Button title="Submit" onPress={sendPasswordReset} />,
      ];
    } else if (step === 'verifyCode') {
      view = [
        <View>
          <Button title="Back" onPress={redirectLogIn} />
        </View>,
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textfields}
            onChangeText={handleChangeEmail}
            placeholder="Email"
            placeholderTextColor="#000000"
          />
        </View>,
        <Button title="Submit" onPress={sendPasswordReset} />,
      ];
    } else if (step === 'inputNewPassword') {
      view = [
        <View>
          <Text>
            Input New Password.
          </Text>
        </View>,
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
  }

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
