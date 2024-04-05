import {
  StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 50,
    paddingLeft: 40,
    paddingRight: 60,
  },
  subtitle: {
    fontSize: 20,
    paddingLeft: 40,
    paddingRight: 60,
  },
  runButton: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 30,
  },
  runText: {
    backgroundColor: '#84C2C9',
    fontSize: 20,
    paddingHorizontal: 150,
    paddingVertical: 15,
  },
});

export default function PocketPromptHomeScreen({ navigation }) {
  const handleRun = () => {
    navigation.navigate('Pocket Prompts Generator');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pocket Prompts</Text>
      <Text style={styles.subtitle}>
        Opening warmup chat activities to help you jumpstart your writing
      </Text>
      <TouchableOpacity style={styles.runButton} onPress={handleRun}>
        <Text style={styles.runText}>Run</Text>
      </TouchableOpacity>
    </View>
  );
}

PocketPromptHomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
