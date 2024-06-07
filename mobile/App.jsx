import 'react-native-gesture-handler';
import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AppNavigation from './Navigation/AppNavigation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 1,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '12.5%',
    width: '100%',
    height: '4%',
  },
  main: {
    width: '100%',
    height: '100%',
  },
});

const screenStyles = StyleSheet.create({
  container: {
    zIndex: 0,
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
});

export default function App() {
  const [notification, setNotification] = useState(false);
  // Setup the notfications in top-level.
  const setTimer = (duration) => {
    setTimeout(() => {
      setNotification(true);
      setTimeout(() => {
        setNotification(false);
        console.log('gone');
      }, 5000);
    }, duration * 1000);
  };

  return (
    <View style={styles.main}>
      {notification
        ? (
          <View style={styles.container}>
            <View style={{
              width: '90%',
              backgroundColor: 'rgba(255,255,255,0.6)',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              borderRadius: 10,
            }}
            >
              <Text>
                Hello
              </Text>
            </View>
          </View>
        )
        : (
          <View />
        )}

      <View style={screenStyles.container}>
        <AppNavigation setTimer={setTimer} />
      </View>
    </View>
  );
}
