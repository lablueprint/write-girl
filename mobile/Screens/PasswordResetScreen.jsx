import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  View, Text, StyleSheet, Button, TextInput,
} from 'react-native';
import nodemailer from 'nodemailer';

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
  const [email, handleChangeEmail] = useState('');
  const redirectLogIn = () => {
    navigation.navigate('Log In');
  };

  const sendPasswordReset = () => {
    // This is code meant for the backend.
    // const transporter = nodemailer.createTransport({
    //   service: 'Gmail',
    //   host: 'smtp.gmail.com',
    //   port: 465,
    //   secure: true,
    //   auth: {
    //     user: '3dward.ng@gmail.com',
    //     pass: 'cqom vdir enrc zgoc',
    //   },
    // });
    // const mailOptions = {
    //   from: '3dward.ng@gmail.com',
    //   to: email,
    //   subject: 'Hello from Nodemailer',
    //   text: 'This is a test email sent using Nodemailer.',
    // };
    // transporter.sendMail(mailOptions, (error, info) => {
    //   if (error) {
    //     console.error('Error sending email: ', error);
    //   } else {
    //     console.log('Email sent: ', info.response);
    //   }
    // });
  };

  return (
    <View style={styles.container}>
      <View>
        <Button title="Back" onPress={redirectLogIn} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textfields}
          onChangeText={handleChangeEmail}
          placeholder="Email"
          placeholderTextColor="#000000"
        />
      </View>
      <Button title="Submit" onPress={sendPasswordReset} />
    </View>
  );
}

PasswordResetScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
