import React from 'react';
import {
  View, Text, StyleSheet, Pressable,
  Dimensions, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { SvgXml } from 'react-native-svg';
import TimePicker from '../../Components/TimePicker';
import Timer from '../../Components/Timer';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    rowGap: screenHeight * 0.02,
    backgroundColor: '#151716',
    alignItems: 'center',
    paddingHorizontal: screenWidth * 0.05,
    position: 'relative',
  },
  heading: {
    color: '#fff',
    fontSize: 36,
    fontWeight: '900',
    fontFamily: 'Helvetica Neue',
  },
  banner: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    width: '100%',
    position: 'absolute',
    top: screenHeight * 0.1,
    zIndex: 1,
  },
  description: {
    fontFamily: 'Helvetica Neue',
    color: 'white',
    fontSize: 20,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '15%',
    marginTop: '30%',
    justifyContent: 'center',
    height: '80%',
  },
});

const backSVG = `<svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M9 15L2 8L9 1" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
  </svg>
  `;

export default function MindBodyActivityScreen({ navigation, route }) {
  const [showTimePicker, setShowTimePicker] = React.useState(true);
  const [showTimer, setShowTimer] = React.useState(true);
  const [alarmString, setAlarmString] = React.useState(null);
  const [totalTime, setTotalTime] = React.useState(0);
  const { prompt } = route.params;

  const formatTime = (pickedDuration) => {
    const { hours, minutes, seconds } = pickedDuration;
    return `${hours}:${minutes}:${seconds}`;
  };

  const calculateTotalSeconds = (pickedDuration) => {
    const { hours, minutes, seconds } = pickedDuration;
    const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
    setTotalTime(totalSeconds);
  };
  console.log('time', showTimePicker);

  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <TouchableOpacity style={{ width: '100%', height: '100%' }} onPress={() => { navigation.goBack(); }}>
          <SvgXml
            xml={backSVG}
            style={styles.design}
            height={15}
            width={15}
          />
        </TouchableOpacity>
        <View />
      </View>
      <View style={styles.content}>
        <Text style={styles.heading}>
          Take a minute or ... five!
        </Text>
        <View>
          <Text style={[styles.description, { fontWeight: 'bold' }]}>
            Activity
          </Text>
          <Text style={styles.description}>
            {prompt.activity}
          </Text>
        </View>
        {
            showTimePicker || showTimer ? (
              <View style={{
                height: '45%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
              >
                <Timer startSelect onEditTimer={() => { setShowTimePicker(!showTimePicker); }} />
              </View>
            ) : (
              <View style={{
                display: 'flex', alignItems: 'center', height: '45%',
              }}
              >
                <Text style={[styles.description, { textDecorationLine: 'underline' }]}>
                  Continue
                </Text>
              </View>
            )
        }
        {
            !showTimePicker && showTimer ? (
              <TouchableOpacity onPress={() => { setShowTimePicker(false); setShowTimer(false); }} style={{ display: 'flex', alignItems: 'center' }}>
                <Text style={[styles.description, { textDecorationLine: 'underline' }]}>
                  No timer
                </Text>
              </TouchableOpacity>
            ) : (<View />)
        }
      </View>
    </View>
  );
}

MindBodyActivityScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    getParam: PropTypes.func,
    goBack: PropTypes.func,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      prompt: PropTypes.shape({
        activity: PropTypes.string,
      }),
    }),
  }).isRequired,
};
