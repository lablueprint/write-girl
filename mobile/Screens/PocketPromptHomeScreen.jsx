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
    marginTop: Dimensions.get('window').height / 10,
    fontSize: 50,
    marginLeft: Dimensions.get('window').width / 11,
    marginRight: Dimensions.get('window').width / 7,
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 20,
    marginTop: Dimensions.get('window').height / 40,
    marginHorizontal: Dimensions.get('window').width / 11,
    color: '#FFFFFF',
  },
  runButtonAlign: {
    marginTop: Dimensions.get('window').height / 2.4,
  },
  runButton: {
    alignSelf: 'center',
    backgroundColor: '#84C2C9',
    borderRadius: 15,
    paddingVertical: Dimensions.get('window').width / 35,
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
        Designed to fire up your creativity. Mine your response for nuggets of words,
        phrases or ideas that can become part of a story, scene or poem.
      </Text>
      <TouchableOpacity style={styles.runButtonAlign} onPress={handleRun}>
        <LinearGradient
          colors={['#84C2C9', '#BFD25A']}
          style={styles.runButton}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.runText}>Start</Text>
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
