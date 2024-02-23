import { React } from 'react';
import PropTypes from 'prop-types';
import {
  View, TouchableOpacity, StyleSheet, Text, Image,
} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import welcomeIcon from '../assets/welcomeIcon.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// Skip component as a function declaration
function Skip({ ...props }) {
  return (
    <TouchableOpacity
      style={{ marginHorizontal: 10}}
      {...props}
    >
      <Text style={{ fontSize: 16 }}>Skip</Text>
    </TouchableOpacity>
  );
}

// Next component as a function declaration
function Next({ ...props }) {
  return (
    <TouchableOpacity
      style={{ marginHorizontal: 10 }}
      {...props}
    >
      <Text style={{ fontSize: 16 }}>Next</Text>
    </TouchableOpacity>
  );
}

// Done component as a function declaration
function Done({ ...props }) {
  return (
    <TouchableOpacity
      style={{ marginHorizontal: 10 }}
      {...props}
    >
      <Text style={{ fontSize: 16 }}>Done</Text>
    </TouchableOpacity>
  );
}


export default function OnboardingScreen({ navigation }) {
  /*const handleNext = () => {
    navigation.replace('Sign Up');
  }; */

  return (
    <Onboarding 
      SkipButtonComponent={Skip}
      NextButtonComponent={Next}
      DoneButtonComponent={Done}
      onSkip={() => navigation.replace('Sign Up')}
      onDone={() => navigation.navigate('Sign Up')}
      pages={[
        {
          backgroundColor: '#fff',
          image: <Image source={welcomeIcon}/>,
          title: 'Challenge your creativity!',
          subtitle: 'placeholder',
        },
        {
          backgroundColor: '#fff',
          image: <Image source={welcomeIcon}/>,
          title: 'Improve your writing skills!',
          subtitle: 'placeholder',
        },
        {
          backgroundColor: '#fff',
          image: <Image source={welcomeIcon}/>,
          title: 'Your own writing tool!',
          subtitle: "placeholder",
        },
      ]}
    />
  );
};

  /*return (
    <View style={styles.container}>

      <Onboarding
        pages={[
          {
            backgroundColor: '#fff',
            title: 'Onboarding',
            subtitle: 'Done with React Native Onboarding Swiper',
          },
        ]}
      />
      <Button title="Next" onPress={handleNext} color="#000000" />
    </View>
  ); */

OnboardingScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    replace: PropTypes.func,
  }).isRequired,
};

