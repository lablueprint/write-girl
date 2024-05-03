import { React, useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground,
} from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import Arrow from '../assets/activityhomeicon.png';
// import LinearGradient from 'expo-linear-gradient';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
  },
  card: {
    height: 255,
    width: 350,
    shadowOpacity: 0.1,
    marginBottom: -100, // Adjust the overlap
    transform: [
      { perspective: 1000 }, // Add perspective to create a 3D effect
      { rotateX: '-6deg' }, // Tilt the card upwards
    ],
  },
  borderStyle:{
    borderRadius: 10,
  },
  popUpCard: {
    marginVertical: 310,
    borderRadius: 10,
    padding: 20,
    justifyContent: 'flex-start',
  },
  activityTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    paddingTop: 20,
    paddingHorizontal: 20,
    color: '#fff',
  },
  activityDescript: {
    fontSize: 14,
    paddingTop: 10,
    paddingHorizontal: 20,
    color: '#fff',
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

export default function ActivityNavigationCard({ activity, description, image, pageDirect, navigation}) {
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
        <ImageBackground style={styles.card} imageStyle={styles.borderStyle} source={image}>
          <Text style={styles.activityTitle}>{activity}</Text>
          <Text style={styles.activityDescript}>{description}</Text>
        </ImageBackground>
      </TouchableOpacity>
      <Modal
        style={styles.popUpCard}
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
      >
        <ImageBackground style={styles.card} imageStyle={styles.borderStyle} source={image}>
          <Text style={styles.activityTitle}>{activity}</Text>
          <Text style={styles.activityDescript}>{description}</Text>
          <TouchableOpacity style={styles.navigateButton} onPress={navigatePage}>
            <Image source={Arrow} style={styles.arrow} />
          </TouchableOpacity>
        </ImageBackground>
      </Modal>
    </View>
  );
}

ActivityNavigationCard.propTypes = {
  activity: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.oneOfType([PropTypes.number, PropTypes.object]).isRequired,
  pageDirect: PropTypes.string.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
