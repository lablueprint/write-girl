import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { TimerPickerModal } from 'react-native-timer-picker';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

export default function TimedWritingScreen() {
  const [showPicker, setShowPicker] = useState(false);
  const [alarmString, setAlarmString] = useState(null);
  // const [alarmString, setAlarmString] = useState<string | null>(null);

  const formatTime = ({ time }) => {
    // const { hoursNum, minutesNum, secondsNum, } = time;
  };

  return (
    <View style={{ backgroundColor: '#514242', alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 18, color: '#F1F1F1' }}>
        {alarmString !== null
          ? 'Alarm set for'
          : 'No alarm set'}
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
                Set Alarm 🔔
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
    </View>
  );

  // return (
  //   <View>
  //     <Text>Timed Writing Screen</Text>
  //     <TimerPicker
  //       padWithNItems={2}
  //       hourLabel=":"
  //       minuteLabel=":"
  //       secondLabel=""
  //       // LinearGradient={LinearGradient}
  //       styles={{
  //         theme: 'dark',
  //         backgroundColor: '#202020',
  //         pickerItem: {
  //           fontSize: 34,
  //         },
  //         pickerLabel: {
  //           fontSize: 32,
  //           marginTop: 0,
  //         },
  //         pickerContainer: {
  //           marginRight: 6,
  //         },
  //       }}
  //     />
  //   </View>
  // );
}
