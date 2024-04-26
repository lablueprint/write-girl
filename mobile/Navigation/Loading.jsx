import {
  View, Text, StyleSheet, Dimensions, Image,
} from 'react-native';
import logo from '../assets/writegirl-logo.png';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: screenWidth,
    height: screenHeight,
  },

  image: {
    flex: 1,
    width: '90%',
    resizeMode: 'contain',
  },

});

export default function LoadingScreen() {
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.image} />
    </View>
  );
}
