import { React, useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Button,
} from 'react-native';
import PropTypes from 'prop-types';
import Modal from "react-native-modal";

const styles = StyleSheet.create({
  /*container: {
    alignItems: 'center',
  },
  card: {
    height: 300,
    width: 400,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    padding: 20,
  }, */
  container: {
    position: 'relative',
    alignItems: 'center',
    perspective: 1000, // Add perspective to create a 3D effect
  },
  card: {
    height: 180,
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
    marginBottom: -20, // Adjust the overlap
    transform: [
      { perspective: 1000 }, // Add perspective to create a 3D effect
      { rotateX: '-10deg' }, // Tilt the card upwards
    ],
  },
  popUpCard: {
    borderRadius: 10,
  },
});

export default function ActivityNavigationCard({ activity, description, backgroundColor }) {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.card, { backgroundColor }]} onPress={toggleModal}>
        <Text>{activity}</Text>
        <Text>{description}</Text>
      </TouchableOpacity>
      <Modal style={[styles.popUpCard, { backgroundColor }]} isVisible={isModalVisible}>
        <Text>{activity}</Text>
        <Text>{description}</Text>
        <TouchableOpacity title="Hide modal" onPress={toggleModal}>
          <Text>Hello</Text>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

ActivityNavigationCard.propTypes = {
  activity: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
};
