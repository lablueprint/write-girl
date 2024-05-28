import { React, useState, useEffect } from 'react';
import {
  View, TextInput, Alert, StyleSheet, Text, Pressable, Image, ImageBackground, TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { SelectCountry } from 'react-native-element-dropdown';
import PropTypes from 'prop-types';
import PasswordValidate from 'react-native-password-validate-checklist';
import Storage from '../Components/Storage';
import emailIcon from '../assets/sign-up/emailIcon.png';
import nameIcon from '../assets/sign-up/nameIcon.png';
import passwordIcon from '../assets/sign-up/passwordIcon.png';
import countryIcon from '../assets/sign-up/countryIcon.png';
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
  heading: {
    marginTop: 120,
    fontSize: 50,
    color: 'white',
    fontFamily: 'Helvetica Neue',
    fontWeight: 'bold',
    lineHeight: 50,
  },
  smallSubtitle: {
    marginTop: 10,
    fontSize: 10,
  },
  textfields: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Helvetica Neue',
  },
  inputContainerName: {
    backgroundColor: '#ffffff33',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    marginTop: 80,
    padding: 14,
  },
  inputContainer: {
    backgroundColor: '#ffffff33',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    marginTop: 14,
    padding: 14,
  },
  inputContainerCountry: {
    backgroundColor: '#ffffff33',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    marginTop: 60,
    padding: 14,
  },
  icon: {
    marginRight: 14,
    marginLeft: 10,
  },
  logInText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white',
    fontFamily: 'Helvetica Neue',
  },
  logInRedirect: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Helvetica Neue',
    textDecorationLine: 'underline',
  },
  logInTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
  },
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  
});
export default function SignUp({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [country, setCountry] = useState('1');
  const [localData, setLocalData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://restcountries.eu/rest/v2/all');
        const formattedData = response.data.map(country => ({
          value: country.alpha2Code,
          label: country.name,
          image: {
            uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
          },
        }));
        setLocalData(formattedData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const [hiddenPassword, onChangeHiddenPassword] = useState('');
  const [bool, setBool] = useState(false);
  const [validated, setValidated] = useState(false);

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
    onChangePassword('');
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
        await Storage({ key: 'userId', value: userId, saveKey: true });
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
      <ImageBackground
        source={welcomeBackground} // Replace with your image path
        style={styles.imageBackground}
      >
        <View style={styles.paddingContainer}>
          <Text style={styles.heading}>
            Let's get you started.
          </Text>
          <View style={styles.inputContainerName}>
            <Image source={nameIcon} style={styles.icon} />
            <TextInput
              style={styles.textfields}
              onChangeText={setFirstName}
              value={firstName}
              placeholder="First Name"
              placeholderTextColor="white"
            />
          </View>
          <View style={styles.inputContainer}>
            <Image source={emailIcon} style={styles.icon} />
            <TextInput
              style={styles.textfields}
              onChangeText={setEmail}
              value={email}
              placeholder="Email"
              placeholderTextColor="white"
            />
          </View>
          <View style={styles.inputContainer}>
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

          <PasswordValidate
            newPassword={password}
            confirmPassword={password}
            validationRules={[
              {
                key: 'MIN_LENGTH',
                ruleValue: 8,
                label: 'At least 8 characters',
              },
              { key: 'LOWERCASE_LETTER',
                label: 'A lowercase letter',
              },
              { key: 'UPPERCASE_LETTER',
                label: 'A uppercase letter',
              },
              { key: 'NUMERIC',
                label: 'A number or symbol',
              },
            ]}
            onPasswordValidateChange={(validatedBoolean) => setValidated(validatedBoolean)}
          />

          <View style={styles.inputContainerCountry}>
            <Image source={countryIcon} style={styles.icon} />
            <TextInput
              style={styles.textfields}
              secureTextEntry={bool}
              onChangeText={handleChangePassword}
              value={hiddenPassword}
              placeholder="Country"
              placeholderTextColor="white"
            />
          </View>

          <SelectCountry
            style={styles.dropdown}
            selectedTextStyle={styles.selectedTextStyle}
            placeholderStyle={styles.placeholderStyle}
            imageStyle={styles.imageStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            search
            maxHeight={200}
            value={country}
            data={localData}
            valueField="value"
            labelField="lable"
            imageField="image"
            placeholder="Select country"
            searchPlaceholder="Search..."
            onChange={e => {
              setCountry(e.value);
            }}
          />

          <View style={styles.signButton}>
            <TouchableOpacity onPress={handleSignUp} style={styles.button}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.logInTextContainer}>
            <Text style={styles.logInText}>
              Already have an account?
            </Text>
            <Pressable onPress={redirectLogIn}>
              <Text style={styles.logInRedirect}> Login</Text>
            </Pressable>
          </View>
          {/* <View>
            <Button title="Super Special Dev Button😈" onPress={redirectHome} color="#000000" />
          </View> */}
        </View>
      </ImageBackground>
    </View>
  );
}

SignUp.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
