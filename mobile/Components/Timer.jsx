import React, { useState, useEffect } from 'react';
import {
  Text, View, TouchableOpacity, StyleSheet, Pressable, Dimensions,
} from 'react-native';
import { TimerPickerModal } from 'react-native-timer-picker';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { SvgXml } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const editTimer = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.9163 21.9164L21.9163 20.3608L6.76065 5.2052L5.20505 6.7608L20.3607 21.9164L21.9163 21.9164ZM23.3329 23.3331L19.764 23.3331L1.07217 4.66031C0.942757 4.5152 0.842752 4.35496 0.772154 4.1796C0.701557 4.00424 0.666259 3.82142 0.666259 3.63114C0.666259 3.44083 0.696222 3.25648 0.756147 3.07807C0.816096 2.89967 0.924164 2.7351 1.08035 2.58436L2.60054 1.07232C2.7513 0.916132 2.91667 0.809433 3.09666 0.752222C3.27664 0.695013 3.45663 0.666408 3.63662 0.666408C3.8286 0.666408 4.01227 0.698768 4.18763 0.763487C4.36299 0.82818 4.52323 0.931124 4.66834 1.07232L23.3329 19.7642L23.3329 23.3331ZM5.9965 5.99665L5.20505 6.7608L6.76065 5.2052L5.9965 5.99665Z" fill="white"/>
</svg>`;

const pauseTimer = `<svg width="14" height="21" viewBox="0 0 14 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<line x1="2.5" y1="1.09278e-07" x2="2.5" y2="21" stroke="white" stroke-width="5"/>
<line x1="11.5" y1="1.09278e-07" x2="11.5" y2="21" stroke="white" stroke-width="5"/>
</svg>`;

const stopTimer = `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.6 15.4H15.4V6.6H6.6V15.4ZM11 0C4.928 0 0 4.928 0 11C0 17.072 4.928 22 11 22C17.072 22 22 17.072 22 11C22 4.928 17.072 0 11 0Z" fill="white"/>
</svg>`;

const startTimer = `<svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.5 9.63397C18.1667 10.0189 18.1667 10.9811 17.5 11.366L1.75 20.4593C1.08333 20.8442 0.25 20.3631 0.25 19.5933V1.40673C0.25 0.636933 1.08333 0.155808 1.75 0.540708L17.5 9.63397Z" fill="white"/>
</svg>`;

const styles = StyleSheet.create({
  timer: {
    display: 'flex',
  },
  buttons: {
    display: 'flex',
    columnGap: 36,
    flexDirection: 'row',
    // aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // width: 'auto',
    // height: '40%',
  },
  pressable: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  time: {
    color: 'white',
    fontSize: 64,
    fontWeight: '800',
    // fontFamily: 'Helvetica Neue',
  },
  innerTime: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: screenHeight * 0.01,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonStyling: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const customModalStyle = StyleSheet.create({
  button: {
  },
  buttonContainer: {
  },
  confirmButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // fontFamily: 'Helvetica',
    fontWeight: '700',
    paddingHorizontal: screenWidth * 0.15,
    top: -45,
  },
  cancelButton: {
    display: 'none',
  },
  container: {
  },
  contentContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 0.8 * screenWidth,
  },
  modalTitle: {
    display: 'none',
  },
  theme: 'dark',
  pickerContainer: {
    borderWidth: 2,
    borderRadius: 20,
    borderColor: 'white',
    display: 'flex',
    marginLeft: screenWidth * 0.05,
    backgroundColor: 'black',
  },
  pickerGradientOverlay: {
  },
  pickerItem: {
  },
  pickerItemContainer: {
  },
  pickerLabel: {
    right: -20,
    fontWeight: '700',
  },
  pickerLabelContainer: {
  },
  text: {
    // fontFamily: 'Helvetica',
    fontWeight: '700',
  },

});

export default function Timer() {
  const [showPicker, setShowPicker] = useState(false);
  const [alarmString, setAlarmString] = useState(null);
  const [totalTime, setTotalTime] = useState(0);
  const [timerKey, setTimerKey] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const calculateTotalSeconds = (pickedDuration) => {
    const { hours, minutes, seconds } = pickedDuration;
    const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
    setTotalTime(totalSeconds);
  };

  const formatTime = (pickedDuration) => {
    const { hours, minutes, seconds } = pickedDuration;
    return `${hours}:${minutes}:${seconds}`;
  };

  const updateKey = () => {
    if (totalTime !== 0) {
      setTimerKey((prevKey) => prevKey + 1);
    }
  };

  const restartTimer = () => {
    setTotalTime(0);
    updateKey();
    setAlarmString(null);
  };

  const handlePause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleStop = () => {
    restartTimer();
  };

  useEffect(() => {
    updateKey();
  }, [alarmString]);

  return (
    <View style={styles.timer}>
      <TimerPickerModal
        visible={showPicker}
        setIsVisible={setShowPicker}
        onConfirm={(pickedDuration) => {
          console.log('selected duration', pickedDuration);
          setAlarmString(formatTime(pickedDuration));
          calculateTotalSeconds(pickedDuration);
          setShowPicker(false);
        }}
        modalTitle="Set Timer"
        onCancel={() => setShowPicker(false)}
        closeOnOverlayPress
        styles={customModalStyle}
        modalProps={{
          overlayOpacity: 0.2,
        }}
        hourLabel=":"
        secondLabel=""
        minuteLabel=":"
        padWithNItems={2}
      />
      <CountdownCircleTimer
        key={timerKey}
        isPlaying={isPlaying}
        duration={totalTime}
        colors={['#BFD25A', '#5BB2CF']}
        colorsTime={[totalTime, totalTime / 2]}
        onComplete={() => {
          restartTimer();
          // insert logic for adding notifications!
        }}
        size={screenWidth * 0.7}
        strokeWidth={screenWidth * 0.05}
        trailColor="#212121"
        isGrowing
        rotation="counter-clockwise"
        strokeLinecap="round"
      >
        {({ remainingTime }) => (
          <View style={styles.innerTime}>
            {
              !isPlaying ? (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setShowPicker(true)}
                  style={styles.pressable}
                >
                  <SvgXml
                    xml={editTimer}
                    style={styles.edit}
                    height={30}
                    width={30}
                  />
                </TouchableOpacity>
              ) : <View />
            }
            <Text style={styles.time}>
              {`${Math.floor(remainingTime / 3600) > 0 ? `${String(Math.floor(remainingTime / 3600)).padStart(2, '0')}:` : ''}${Math.floor((remainingTime % 3600) / 60) > 0 || Math.floor(remainingTime / 3600) > 0 ? `${String(Math.floor((remainingTime % 3600) / 60)).padStart(2, '0')}:` : '00:'}${String(remainingTime % 60).padStart(2, '0')}`}
            </Text>
            {
                isPlaying ? (
                  <View style={styles.buttons}>
                    <Pressable onPress={handlePause} style={styles.pressable}>
                      <SvgXml
                        xml={pauseTimer}
                        style={styles.pause}
                        height={35}
                        width={35}
                      />
                    </Pressable>
                    <Pressable onPress={handleStop} style={styles.pressable}>
                      <SvgXml
                        xml={stopTimer}
                        style={styles.stop}
                        height={35}
                        width={35}
                      />
                    </Pressable>
                  </View>
                ) : (
                  <View style={styles.buttons}>
                    <Pressable onPress={handlePause} style={styles.pressable}>
                      <SvgXml
                        xml={startTimer}
                        style={styles.pause}
                        height={35}
                        width={35}
                      />
                    </Pressable>
                  </View>
                )
              }
          </View>
        )}
      </CountdownCircleTimer>
    </View>
  );
}
