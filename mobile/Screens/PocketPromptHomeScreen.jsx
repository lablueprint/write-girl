import {
  StyleSheet, Text, View, TouchableOpacity, Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151716',
  },
  title: {
    marginTop: 100,
    fontSize: 50,
    paddingLeft: 40,
    paddingRight: 60,
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 20,
    paddingTop: 20,
    paddingLeft: 40,
    paddingRight: 60,
    color: '#FFFFFF',
  },
  runButtonAlign: {
    marginTop: Dimensions.get('window').height / 2.2,
  },
  runButton: {
    alignSelf: 'center',
    backgroundColor: '#84C2C9',
    borderRadius: 15,
    paddingVertical: Dimensions.get('window').width / 25,
    paddingHorizontal: Dimensions.get('window').width / 2.5,
  },
  runText: {
    borderColor: '#000',
    fontSize: 20,
  },
});

export default function PocketPromptHomeScreen({ navigation }) {
  const handleRun = () => {
    navigation.navigate('Pocket Prompts');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pocket Prompts</Text>
      <Text style={styles.subtitle}>
        Opening warmup chat activities to help you jumpstart your writing
      </Text>
      <TouchableOpacity style={styles.runButtonAlign} onPress={handleRun}>
        <LinearGradient
          colors={['#84C2C9', '#BFD25A']}
          style={styles.runButton}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.runText}>Run</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

PocketPromptHomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
