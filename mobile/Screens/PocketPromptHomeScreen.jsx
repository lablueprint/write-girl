import {
  StyleSheet, Text, View, TouchableOpacity,
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
  runButton: {
    backgroundColor: '#84C2C9',
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 160,
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
      <LinearGradient
        colors={['#84C2C9', '#BFD25A']}
        style={styles.runButton}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <TouchableOpacity onPress={handleRun}>
          <Text style={styles.runText}>Run</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}

PocketPromptHomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
