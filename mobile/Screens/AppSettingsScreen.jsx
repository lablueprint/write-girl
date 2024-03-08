import React, { useEffect, useState } from 'react';
import {
  Image, View, Text, Dimensions, StyleSheet, ScrollView, TouchableHighlight,
} from 'react-native';
import PropTypes from 'prop-types';
import accountIcon from '../assets/settings-icons/account-icon.png';
import arrowIcon from '../assets/settings-icons/arrow-icon.png';
import trashIcon from '../assets/settings-icons/trash-icon.png';
import logoutIcon from '../assets/settings-icons/logout-icon.png';

const styles = StyleSheet.create({
  all: {
    backgroundColor: 'black',
    height: '100%',
  },
  content: {
    marginTop: Dimensions.get('window').height / 12,
    marginLeft: Dimensions.get('window').width / 15,
    marginRight: Dimensions.get('window').width / 15,
  },
  title: {
    fontFamily: 'Helvetica',
    color: 'white',
    fontSize: 50,
    fontWeight: 'bold',
  },
  subtitle: {
    fontFamily: 'Helvetica',
    color: 'white',
    marginTop: Dimensions.get('window').height / 18,
    marginBottom: Dimensions.get('window').height / 80,
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    marginVertical: Dimensions.get('window').height / 70,
    flexDirection: 'row',
    // backgroundColor: 'green',

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
    fontSize: 20,
    marginTop: Dimensions.get('window').height / 80,
  },
});

function AppSettingsScreen({ navigation }) {
  const navigateAccountInfo = () => {
    console.log('press');
    navigation.navigate('Account Information');
  };

  return (
    <ScrollView style={styles.all}>
      <View style={styles.content}>
        <Text style={styles.title}>
          Settings
        </Text>
        <Text style={styles.subtitle}>
          Account
        </Text>
        <TouchableHighlight onPress={navigateAccountInfo}>
          <View style={styles.button}>
            <Image
              source={accountIcon}
            />
            <Text style={styles.buttontext}>Account Information</Text>
            <Image
              source={arrowIcon}
            />
          </View>
        </TouchableHighlight>
        <View style={styles.button}>
          <Image
            source={logoutIcon}
          />
          <Text style={styles.buttontext}>Logout</Text>
        </View>
        <View style={styles.button}>
          <Image
            source={trashIcon}
          />
          <Text style={styles.redbuttontext}>Delete Account</Text>
        </View>
        <Text style={styles.subtitle}>
          How To
        </Text>
        <Text style={styles.body}>
          The purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that doesn't distract from the layout. A practice not without controversy, laying out pages with meaningless filler text can be very useful when the focus is meant to be on design, not content.

          The passage experienced a surge in popularity during the 1960s when Letraset used it on their dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with their software. Today it's seen all around the web; on templates, websites, and stock designs. Use our generator to get your own, or read on for the authoritative history of lorem ipsum
        </Text>
      </View>
    </ScrollView>
  );
}

AppSettingsScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default AppSettingsScreen;
