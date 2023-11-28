import { React, useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import PropTypes from 'prop-types';

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    if (!email.trim()) {
      alert('Please enter a valid email');
      return;
    }

    if (!password.trim()) {
      alert('Please enter a password');
      return;
    }
    setEmail('');
    setPassword('');
    navigation.navigate('Home');
  };
  return (
    <View>
      <TextInput
        onChangeText={setEmail}
        value={email}
        placeholder="Please enter your email"
      />
      <TextInput
        onChangeText={setPassword}
        value={password}
        placeholder="Please enter your password"
      />

      <Button title="Sign Up!" onPress={handleSignUp} />
    </View>
  );
}

SignUp.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
