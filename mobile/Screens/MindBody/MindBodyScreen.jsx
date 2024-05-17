import React from 'react';
import {
  View, Text, StyleSheet, Pressable,
  Dimensions,
} from 'react-native';
import Animated, {
  withTiming,
} from 'react-native-reanimated';
import PropTypes from 'prop-types';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    color: '#fff',
    marginLeft: 32,
    marginRight: 32,
    fontSize: 54,
    textAlign: 'left',
    fontFamily: 'Helvetica Neue',
    fontWeight: '900',
    lineHeight: 55,
    marginBottom: 16,
  },
  body: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'left',
    marginLeft: 32,
    marginRight: 32,
    marginBottom: 32,
    fontFamily: 'Helvetica Neue',
  },
  buttonBody: {
    color: '#000',
    fontSize: 16,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 50,
    backgroundColor: 'white',
    width: '50%',
    marginBottom: 32,
  },
  toggleBar: {
    display: 'flex',
    flexDirection: 'row',
    width: screenWidth,
    alignItems: 'center',
    columnGap: screenWidth * 0.02,
    marginBottom: screenHeight * 0.02,
  },
  toggle: {
    borderWidth: 1,
    borderColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleFalse: {
    position: 'relative',
    width: screenWidth * 0.115,
    height: screenHeight * 0.03,
    backgroundColor: 'black',
    borderRadius: 20,
    marginLeft: 32,
  },
  toggleTrue: {
    position: 'relative',
    width: screenWidth * 0.115,
    height: screenHeight * 0.03,
    backgroundColor: '#5BB2CF',
    borderRadius: 20,
    marginLeft: 32,
  },
  toggleIndicatorFalse: {
    position: 'relative',
    backgroundColor: 'white',
    width: screenHeight * 0.025,
    height: screenHeight * 0.025,
    borderRadius: 20,
  },
  toggleIndicatorTrue: {
    position: 'relative',
    backgroundColor: 'white',
    width: screenHeight * 0.025,
    height: screenHeight * 0.025,
    borderRadius: 20,
    left: screenWidth * 0.115 - screenHeight * 0.031,
  },
});

const animationDuration = 350;

function CustomLayoutTransition(values) {
  'worklet';

  return {
    animations: {
      originY: withTiming(values.targetOriginY, { duration: animationDuration }),
      originX: withTiming(values.targetOriginX, { duration: animationDuration }),
    },
    initialValues: {
      originY: values.currentOriginY,
      originX: values.currentOriginX,
    },
  };
}

export default function MindBodyScreen({ navigation, enableToggle, currentToggle }) {
  const navigateToActivityTypeScreen = () => {
    navigation.navigate('Activity Type');
  };

  console.log(currentToggle);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Mind and Body Moment</Text>
      <Text style={styles.body}>Remember to take moments for yourself in your writing process</Text>
      <View style={styles.toggleBar}>
        <Pressable
          style={[styles.toggle, currentToggle ? styles.toggleTrue : styles.toggleFalse]}
          onPress={() => { enableToggle(!currentToggle); }}
        >
          <Animated.View
            style={currentToggle ? styles.toggleIndicatorTrue : styles.toggleIndicatorFalse}
            layout={CustomLayoutTransition}
          />
        </Pressable>
        <Text style={{ color: 'white' }}>
          in app notifications
        </Text>
      </View>
      <Pressable style={styles.button} onPress={navigateToActivityTypeScreen}>
        <Text style={styles.buttonBody}>Continue</Text>
      </Pressable>
    </View>
  );
}

MindBodyScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  enableToggle: PropTypes.func.isRequired,
  currentToggle: PropTypes.bool.isRequired,
};
