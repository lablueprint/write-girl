import React, { useEffect, useState } from 'react';
import {
  Image, View, Text, Dimensions, StyleSheet, ScrollView,
  TouchableOpacity, TextInput, TouchableHighlight,
} from 'react-native';
import PropTypes from 'prop-types';
import leftArrowIcon from '../assets/settings-icons/left-arrow-icon.png';
import pencilIcon from '../assets/settings-icons/pencil-icon.png';
import gears from '../assets/settings-icons/gears.png';
import accountIcon from '../assets/settings-icons/account-icon.png';
import trashIcon from '../assets/settings-icons/trash-icon.png';
import logoutIcon from '../assets/settings-icons/logout-icon.png';

const styles = StyleSheet.create({
  all: {
    backgroundColor: 'rgba(20, 22, 21, 1)',
    height: '100%',
  },
  gear: {
    position: 'absolute',
    right: 0,
  },
  content: {
    // marginTop: Dimensions.get('window').height / 12,
    marginLeft: Dimensions.get('window').width / 15,
    marginRight: Dimensions.get('window').width / 15,
  },
  title: {
    marginBottom: Dimensions.get('window').height / 20,
  },
  titleline: {
    fontFamily: 'Helvetica',
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  subtitle: {
    fontFamily: 'Helvetica',
    color: 'white',
    marginBottom: Dimensions.get('window').height / 80,
    fontSize: 16,
    fontWeight: 'bold',
  },
  backArrow: {
    paddingTop: Dimensions.get('window').height / 12,
    paddingBottom: Dimensions.get('window').height / 20,
    paddingLeft: Dimensions.get('window').width / 15,
  },
  button: {
    marginVertical: Dimensions.get('window').height / 100,
    paddingVertical: Dimensions.get('window').height / 50,
    paddingHorizontal: Dimensions.get('window').width / 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 14,
    flexDirection: 'row',
  },
  field: {
    flexGrow: 1,
  },
  buttontext: {
    marginLeft: 20,
    fontFamily: 'Helvetica',
    color: 'white',
    fontSize: 20,
    flexGrow: 1,
  },
  redbuttontext: {
    marginLeft: 20,
    fontFamily: 'Helvetica',
    color: 'red',
    fontSize: 20,
    flexGrow: 1,
  },
  body: {
    color: 'white',
    backgroundColor: 'gray',
    borderRadius: 14,
    fontSize: 20,
    marginTop: Dimensions.get('window').height / 80,
  },
  textfields: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 20,
  },
  icon: {
    justifyContent: 'center',
  },
});

function AccountInformationScreen({ navigation }) {
  const [firstName, setFirstName] = useState('Angela');
  const [email, setEmail] = useState('angelaling@gmail.com');
  const [password, onChangePassword] = useState('********');

  const navigateAppSettings = () => {
    navigation.navigate('App Settings');
  };

  const navigateEditFirstName = () => {
    navigation.navigate('Edit First Name');
  };

  const navigateEditPassword = () => {
    navigation.navigate('Edit Password');
  };

  return (
    <ScrollView style={styles.all}>
      <Image style={styles.gear} source={gears} />
      <TouchableOpacity style={styles.backArrow} onPress={navigateAppSettings}>
        <Image
          source={leftArrowIcon}
        />
      </TouchableOpacity>
      <View style={styles.content}>
        <View style={styles.title}>
          <Text style={styles.titleline}>
            Account
          </Text>
          <Text style={styles.titleline}>
            Information
          </Text>
        </View>
        <TouchableHighlight onPress={navigateEditFirstName}>
          <View style={styles.button}>
            <View style={styles.field}>
              <Text style={styles.subtitle}>
                First Name
              </Text>
              <Text style={styles.textfields}>
                {firstName}
              </Text>
            </View>
            <View style={styles.icon}>
              <Image source={pencilIcon} />
            </View>
          </View>
        </TouchableHighlight>
        <TouchableHighlight>
          <View style={styles.button}>
            <View style={styles.field}>
              <Text style={styles.subtitle}>
                Email
              </Text>
              <Text style={styles.textfields}>
                {email}
              </Text>
            </View>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={navigateEditPassword}>
          <View style={styles.button}>
            <View style={styles.field}>
              <Text style={styles.subtitle}>
                Password
              </Text>
              <Text style={styles.textfields}>
                {password}
              </Text>
            </View>
            <View style={styles.icon}>
              <Image source={pencilIcon} />
            </View>
          </View>
        </TouchableHighlight>
      </View>
    </ScrollView>
  );
}

AccountInformationScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default AccountInformationScreen;
