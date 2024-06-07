import {
  View, Text, StyleSheet, TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import PropTypes from 'prop-types';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    paddingTop: screenHeight * 0.05,
    flex: 1,
    flexDirection: 'column',
    rowGap: screenHeight * 0.02,
    backgroundColor: '#151716',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
});

export default function MindBodyFinishScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View>
        <Text>
          Great Job!
        </Text>
        <Text>
          We hope that you are feeling refreshed and geared up for the next task!
        </Text>
      </View>
      <TouchableOpacity onPress={() => { navigation.navigate('Mind and Body Stack'); }}>
        <LinearGradient
        // Button Linear Gradient
          colors={['#84C2C9', '#BFD25A']}
          style={styles.button}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
        >
          <Text style={[styles.text, { color: 'black', fontWeight: '500' }]}>Back to Main</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

MindBodyFinishScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
