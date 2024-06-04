import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, Dimensions, StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { LinearGradient } from 'expo-linear-gradient';

const ITEM_SIZE = 40;

const styles = StyleSheet.create({
  container: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
  },
  timer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 240,
    position: 'relative',
    borderWidth: 2,
    borderRadius: 20,
    borderColor: 'white',
    paddingVertical: 20,
  },
  button: {
    borderRadius: 12,
    height: ITEM_SIZE * 1.20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: ITEM_SIZE * 5,
    marginTop: -ITEM_SIZE * 0.6,
  },
  contentContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontFamily: 'Helvetica',
    fontSize: 24,
  },
  cardText: {
    textAlign: 'center',
    lineHeight: 24,
    fontSize: 16,
  },
  timeEntry: {
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function TimePicker({ setIsVisible, onConfirm }) {
  const [seconds, setSeconds] = useState([]);
  const [minutes, setMinutes] = useState([]);
  const [hours, setHours] = useState([]);

  const [selectedHour, selectHour] = useState(0);
  const [selectedMinute, selectMinute] = useState(0);
  const [selectedSecond, selectSecond] = useState(0);

  const minuteRef = useRef();
  const hourRef = useRef();
  const secondRef = useRef();

  useEffect(() => {
    setMinutes([...Array(60).keys(), ...Array(60).keys(), ...Array(60).keys()]);
    setSeconds([...Array(60).keys(), ...Array(60).keys(), ...Array(60).keys()]);
    setHours([...Array(24).keys(), ...Array(24).keys(), ...Array(24).keys()]);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.timer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
          ref={hourRef}
          snapToAlignment="center"
          snapToInterval={ITEM_SIZE}
          contentInsetAdjustmentBehavior="never"
          decelerationRate={0}
          onStartReachedThreshold={1}
          onEndReachedThreshold={1}
          data={hours}
          onMomentumScrollEnd={(event) => {
            if (event.nativeEvent.contentOffset.y < ITEM_SIZE * 12) {
              const calcOffset = event.nativeEvent.contentOffset.y + 24 * ITEM_SIZE;
              hourRef.current.scrollToOffset(
                { animated: false, offset: calcOffset },
              );
              selectHour(Math.floor((calcOffset + 80) / ITEM_SIZE));
            } else if (event.nativeEvent.contentOffset.y > (60 * ITEM_SIZE)) {
              const calcOffset = event.nativeEvent.contentOffset.y - 24 * ITEM_SIZE;
              hourRef.current.scrollToOffset(
                { animated: false, offset: calcOffset },
              );
              selectHour(Math.floor((calcOffset + 80) / ITEM_SIZE));
            } else {
              selectHour(Math.floor((event.nativeEvent.contentOffset.y + 80) / ITEM_SIZE));
            }
          }}
          renderItem={({ item }) => (
            <View style={styles.timeEntry}>
              <Text style={styles.text}>
                {String(item).padStart(2, '0')}
              </Text>
            </View>
          )}
          getItemLayout={(data, index) => (
            { length: ITEM_SIZE, offset: ITEM_SIZE * index - 80, index }
          )}
          initialScrollIndex={24}
        />
        <Text style={[{
          color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center',
        }, styles.text]}
        >
          :
        </Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
          ref={minuteRef}
          snapToAlignment="center"
          snapToInterval={ITEM_SIZE}
          contentInsetAdjustmentBehavior="never"
          decelerationRate="fast"
          onStartReachedThreshold={1}
          onEndReachedThreshold={1}
          data={minutes}
          onMomentumScrollEnd={(event) => {
            if (event.nativeEvent.contentOffset.y < ITEM_SIZE * 20) {
              const calcOffset = event.nativeEvent.contentOffset.y + 60 * ITEM_SIZE;
              minuteRef.current.scrollToOffset(
                { animated: false, offset: calcOffset },
              );
              selectMinute(Math.floor((calcOffset + 80) / ITEM_SIZE));
            } else if (event.nativeEvent.contentOffset.y > (140 * ITEM_SIZE)) {
              const calcOffset = event.nativeEvent.contentOffset.y - 60 * ITEM_SIZE;
              minuteRef.current.scrollToOffset(
                { animated: false, offset: calcOffset },
              );
              selectMinute(Math.floor((calcOffset + 80) / ITEM_SIZE));
            } else {
              selectMinute(Math.floor((event.nativeEvent.contentOffset.y + 80) / ITEM_SIZE));
            }
          }}
          renderItem={({ item }) => (
            <View style={styles.timeEntry}>
              <Text style={styles.text}>
                {String(item).padStart(2, '0')}
              </Text>
            </View>
          )}
          getItemLayout={(data, index) => (
            { length: ITEM_SIZE, offset: ITEM_SIZE * index - 80, index }
          )}
          initialScrollIndex={60}
        />
        <Text style={[{
          color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center',
        }, styles.text]}
        >
          :
        </Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          ref={secondRef}
          contentContainerStyle={styles.contentContainer}
          snapToAlignment="center"
          snapToInterval={ITEM_SIZE}
          contentInsetAdjustmentBehavior="never"
          decelerationRate="fast"
          onStartReachedThreshold={1}
          onEndReachedThreshold={1}
          data={seconds}
          onMomentumScrollEnd={(event) => {
            if (event.nativeEvent.contentOffset.y < ITEM_SIZE * 20) {
              const calcOffset = event.nativeEvent.contentOffset.y + 60 * ITEM_SIZE;
              secondRef.current.scrollToOffset(
                { animated: false, offset: calcOffset },
              );
              selectSecond(Math.floor((calcOffset + 80) / ITEM_SIZE));
            } else if (event.nativeEvent.contentOffset.y > (140 * ITEM_SIZE)) {
              const calcOffset = event.nativeEvent.contentOffset.y - 60 * ITEM_SIZE;
              secondRef.current.scrollToOffset(
                { animated: false, offset: calcOffset },
              );
              selectSecond(Math.floor((calcOffset + 80) / ITEM_SIZE));
            } else {
              selectSecond(Math.floor((event.nativeEvent.contentOffset.y + 80) / ITEM_SIZE));
            }
          }}
          renderItem={({ item }) => (
            <View style={styles.timeEntry}>
              <Text style={styles.text}>
                {String(item).padStart(2, '0')}
              </Text>
            </View>
          )}
          getItemLayout={(data, index) => (
            { length: ITEM_SIZE, offset: ITEM_SIZE * index - 80, index }
          )}
          initialScrollIndex={60}
        />
        <LinearGradient
          locations={[0, 0.4, 0.8, 1]}
          colors={['rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']}
          style={{
            position: 'absolute', width: '100%', height: '120%', borderRadius: 15,
          }}
          pointerEvents="none"
        />
      </View>
      <TouchableOpacity onPress={() => {
        onConfirm(
          {
            hours: hours[selectedHour],
            minutes: minutes[selectedMinute],
            seconds: seconds[selectedSecond],
          },
        );
        setIsVisible(false);
      }}
      >
        <LinearGradient
        // Button Linear Gradient
          colors={['#84C2C9', '#BFD25A']}
          style={styles.button}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
        >
          <Text style={[styles.text, { color: 'black', fontWeight: '500' }]}>Confirm</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

TimePicker.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  setIsVisible: PropTypes.func.isRequired,
};
