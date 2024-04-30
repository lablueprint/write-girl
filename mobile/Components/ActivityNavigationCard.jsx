import { React, useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Image
} from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import Arrow from '../assets/activityhomeicon.png';
// import LinearGradient from 'expo-linear-gradient';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    perspective: 1000, // Add perspective to create a 3D effect
  },
  card: {
    height: 248,
    width: 350,
    borderRadius: 10,
    padding: 20,
    backgroundColor: '#73c2fb', //delete later
    color: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 6,
    zIndex: 1, // Ensure it's above other elements
    marginBottom: -90, // Adjust the overlap
    transform: [
      { perspective: 1000 }, // Add perspective to create a 3D effect
      { rotateX: '-6deg' }, // Tilt the card upwards
    ],
  },
  popUpCard: {
    marginVertical: 310,
    borderRadius: 10,
    padding: 20,
    justifyContent: 'flex-start',
    backgroundColor: '#73c2fb', //delete later
  },
  activityTitle: {
    fontSize: 32,
  },
  activityDescript: {
    marginTop: 10,
    fontSize: 14,
  },
  navigateButton: {
    backgroundColor: '#fff',
    height: 60,
    width: 60,
    borderRadius: 30,
    position: 'absolute',
    bottom: 40, // Adjust as needed
    left: 20, // Adjust as needed
  },
  arrow: {
    marginRight: 5,
    width: 12,
    height: 15,
    position: 'absolute',
    bottom: 22, // Adjust as needed
    left: 25, // Adjust as needed
  },
});

export default function ActivityNavigationCard({ activity, description, backgroundColor, pageDirect, navigation}) {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const navigatePage = () => {
    setModalVisible(!isModalVisible);
    navigation.navigate(pageDirect);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.card} onPress={toggleModal}>
        <Text style={styles.activityTitle}>{activity}</Text>
        <Text style={styles.activityDescript}>{description}</Text>
      </TouchableOpacity>
      <Modal
        style={styles.popUpCard}
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
      >
        <Text style={styles.activityTitle}>{activity}</Text>
        <Text style={styles.activityDescript}>{description}</Text>
        <TouchableOpacity style={styles.navigateButton} onPress={navigatePage}>
          <Image source={Arrow} style={styles.arrow} />
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

ActivityNavigationCard.propTypes = {
  activity: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  backgroundColor: PropTypes.arrayOf(PropTypes.string).isRequired,
  pageDirect: PropTypes.string.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
