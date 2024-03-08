import React, { useEffect, useState } from 'react';
import {
  Image, View, Text, Dimensions, StyleSheet, ScrollView, TouchableHighlight,
} from 'react-native';
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

function AccountInformationScreen() {
  const navigateAccountInfo = () => {
    console.log('press');
  };

  return (
    <ScrollView style={styles.all}>
      <View style={styles.content}>
        <Text style={styles.title}>
          Account Information
        </Text>
      </View>
    </ScrollView>
  );
}

export default AccountInformationScreen;
