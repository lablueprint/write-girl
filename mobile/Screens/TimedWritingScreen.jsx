import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { TimerPickerModal } from 'react-native-timer-picker';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

export default function TimedWritingScreen() {
  const [showPicker, setShowPicker] = useState(false);
  const [alarmString, setAlarmString] = useState(null);
  const [totalTime, setTotalTime] = useState(0);
  const [timerKey, setTimerKey] = useState(0);

  const calculateTotalSeconds = (pickedDuration) => {
    const { hours, minutes, seconds } = pickedDuration;
    const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
    setTotalTime(totalSeconds);
    // return seconds;
  };

  const formatTime = (pickedDuration) => {
    const { hours, minutes, seconds } = pickedDuration;
    console.log('formatted time: ', `${hours}:${minutes}:${seconds}`);
    return `${hours}:${minutes}:${seconds}`;
  };

  const restartTimer = () => {
    console.log('totalTime: ', totalTime);
    if (totalTime !== 0) {
      setTimerKey((prevKey) => prevKey + 1);
    }
  };

  useEffect(() => {
    restartTimer();
    console.log('alarmString: ', alarmString);
  }, [alarmString]);

  return (
    <View style={{ backgroundColor: '#514242', alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 18, color: '#F1F1F1' }}>
        {alarmString !== null
          ? 'Timer set for'
          : 'No timer set'}
      </Text>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setShowPicker(true)}
      >
        <View style={{ alignItems: 'center' }}>
          {alarmString !== null ? (
            <Text style={{ color: '#F1F1F1', fontSize: 48 }}>
              {alarmString}
            </Text>
          ) : null}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setShowPicker(true)}
          >
            <View style={{ marginTop: 30 }}>
              <Text
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 18,
                  borderWidth: 1,
                  borderRadius: 10,
                  fontSize: 16,
                  overflow: 'hidden',
                  borderColor: '#C2C2C2',
                  color: '#C2C2C2',
                }}
              >
                Set Timer 🔔
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      <TimerPickerModal
        visible={showPicker}
        setIsVisible={setShowPicker}
        onConfirm={(pickedDuration) => {
          console.log('pickedDuration: ', pickedDuration);
          setAlarmString(formatTime(pickedDuration));
          calculateTotalSeconds(pickedDuration);
          setShowPicker(false);
        }}
        modalTitle="Set Alarm"
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
        isPlaying
        duration={totalTime}
        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
        colorsTime={[7, 5, 2, 0]}
        // onComplete={() => {
        //   if (totalTime === 0) {
        //     setTotalTime(0);
        //     restartTimer();
        //     setAlarmString(null);
        //   }
        //   console.log('completed!');
        // }}
      >
        {({ remainingTime }) => (
          <Text style={{ color: 'white', fontSize: 20 }}>
            {/* {children(remainingTime)} */}
            {`${Math.floor(remainingTime / 3600)}:${Math.floor((remainingTime % 3600) / 60)}:${remainingTime % 60}`}
            {remainingTime === 0 && (
            <>
              {setTotalTime(0)}
              {restartTimer()}
              {setAlarmString(null)}
            </>
            )}
          </Text>
        )}
      </CountdownCircleTimer>
    </View>
  );
}
