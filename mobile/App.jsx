import 'react-native-gesture-handler';
import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AppNavigation from './Navigation/AppNavigation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 1,
    backgroundColor: 'red',
    marginTop: 100,
    position: 'absolute',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
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
  const [notification, setNotification] = useState(null);
  // Setup the notfications in top-level.
  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <Text>
          Hello
        </Text>
      </View>
      <View style={screenStyles.container}>
        <AppNavigation />
      </View>
    </View>
  );
}
