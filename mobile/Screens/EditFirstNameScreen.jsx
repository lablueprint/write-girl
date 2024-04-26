import React, { useEffect, useState } from 'react';
import {
  Image, View, Text, Dimensions, StyleSheet, ScrollView, TouchableOpacity, TextInput,
} from 'react-native';
import PropTypes from 'prop-types';
import { LinearGradient } from 'expo-linear-gradient';
import leftArrowIcon from '../assets/settings-icons/left-arrow-icon.png';
import gears from '../assets/settings-icons/gears.png';
import xIcon from '../assets/settings-icons/x-icon.png';

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
    marginLeft: Dimensions.get('window').width / 15,
    marginRight: Dimensions.get('window').width / 15,
    height: Dimensions.get('window').height * 7 / 10,
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
  saveButton: {
    marginVertical: Dimensions.get('window').height / 100,
    paddingVertical: Dimensions.get('window').height / 50,
    paddingHorizontal: Dimensions.get('window').width / 20,
    borderRadius: 14,
    marginTop: 'auto',
  },
  field: {
    flexGrow: 1,
  },
  saveText: {
    fontSize: 20,
    textAlign: 'center',
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

function EditFirstNameScreen({ navigation }) {
  const [firstName, setFirstName] = useState('asdf');

  const navigateAccountInfo = () => {
    navigation.navigate('Account Information');
  };

  return (
    <ScrollView style={styles.all}>
      <Image style={styles.gear} source={gears} />
      <TouchableOpacity style={styles.backArrow} onPress={navigateAccountInfo}>
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
        <View style={styles.button}>
          <View style={styles.field}>
            <Text style={styles.subtitle}>
              First Name
            </Text>
            <TextInput
              style={styles.textfields}
              onChangeText={setFirstName}
              value={firstName}
              placeholder="Enter First Name"
              placeholderTextColor="#000000"
            />
          </View>
          <TouchableOpacity style={styles.icon} onPress={() => { setFirstName(''); }}>
            <Image source={xIcon} />
          </TouchableOpacity>
        </View>
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#84C2C9', '#BFD25A']} style={styles.saveButton}>
          <Text style={styles.saveText}>
            Save
          </Text>
        </LinearGradient>
      </View>
    </ScrollView>
  );
}

EditFirstNameScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default EditFirstNameScreen;
