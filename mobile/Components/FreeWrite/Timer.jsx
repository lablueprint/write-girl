import React, { useState, useEffect } from 'react';
import {
  Text, View, TouchableOpacity, StyleSheet, Pressable, Dimensions,
} from 'react-native';
import { TimerPickerModal } from 'react-native-timer-picker';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { SvgXml } from 'react-native-svg';

const windowHeight = Dimensions.get('window').height;

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

const styles = StyleSheet.create({
  timer: {
    alignItems: 'center',
    position: 'absolute',
    top: -windowHeight * 0.4,
    left: 0,
    right: 0,

    borderColor: 'black',
    borderWidth: 2,
    borderStyle: 'dotted',
  },
  buttons: {
    flexDirection: 'row',

    borderColor: 'red',
    borderWidth: 2,
    borderStyle: 'dotted',
  },
  pause: {
    justifyContent: 'space-between',
    alignContents: 'center',
    paddingRight: 100,

    borderColor: 'blue',
    borderWidth: 2,
    borderStyle: 'dotted',
  },
  stop: {
    justifyContent: 'flex-end',
    paddingRight: 100,

    borderColor: 'orange',
    borderWidth: 2,
    borderStyle: 'dotted',
  },
  time: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
export default function Timer() {
  const [showPicker, setShowPicker] = useState(false);
  const [alarmString, setAlarmString] = useState(null);
  const [totalTime, setTotalTime] = useState(0);
  const [timerKey, setTimerKey] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

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
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => !alarmString && setShowPicker(true)}
      >
        <SvgXml xml={editTimer} style={styles.edit} />
      </TouchableOpacity>
      <TimerPickerModal
        visible={showPicker}
        setIsVisible={setShowPicker}
        onConfirm={(pickedDuration) => {
          setAlarmString(formatTime(pickedDuration));
          calculateTotalSeconds(pickedDuration);
          setShowPicker(false);
        }}
        modalTitle="Set Timer"
        onCancel={() => setShowPicker(false)}
        closeOnOverlayPress
        styles={{
          theme: 'dark',
        }}
        modalProps={{
          overlayOpacity: 0.2,
        }}
      />
      <CountdownCircleTimer
        key={timerKey}
        isPlaying={isPlaying}
        duration={totalTime}
        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
        colorsTime={[7, 5, 2, 0]}
        isSmoothColorTransition
        onComplete={() => restartTimer()}
      >
        {({ remainingTime }) => (
          <Text style={styles.time}>
            {`${Math.floor(remainingTime / 3600) > 0 ? `${String(Math.floor(remainingTime / 3600)).padStart(2, '0')}:` : ''}${Math.floor((remainingTime % 3600) / 60) > 0 || Math.floor(remainingTime / 3600) > 0 ? `${String(Math.floor((remainingTime % 3600) / 60)).padStart(2, '0')}:` : ''}${String(remainingTime % 60).padStart(2, '0')}`}
          </Text>
        )}
      </CountdownCircleTimer>
      <View style={styles.buttons}>
        <Pressable onPress={handlePause}>
          <SvgXml xml={pauseTimer} style={styles.pause} />
        </Pressable>
        <Pressable onPress={handleStop}>
          <SvgXml xml={stopTimer} style={styles.stop} />
        </Pressable>
      </View>
    </View>
  );
}
