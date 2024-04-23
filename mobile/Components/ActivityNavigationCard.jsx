import { React, useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import LinearGradient from 'expo-linear-gradient';

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
  },
  activityTitle: {
    fontSize: 32,
  },
  activityDescript: {
    marginTop: 10,
    fontSize: 14,
  },
});

export default function ActivityNavigationCard({ activity, description, backgroundColor }) {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      {/* <LinearGradient colors={backgroundColor}> fix errorsss*/}
        <TouchableOpacity style={styles.card} onPress={toggleModal}>
          <Text style={styles.activityTitle}>{activity}</Text>
          <Text style={styles.activityDescript}>{description}</Text>
        </TouchableOpacity>
      </LinearGradient>
      <Modal
        style={styles.popUpCard}
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
      >
        <Text style={styles.activityTitle}>{activity}</Text>
        <Text style={styles.activityDescript}>{description}</Text>
      </Modal>
    </View>
  );
}

ActivityNavigationCard.propTypes = {
  activity: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  backgroundColor: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};
