import { React, useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground, Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import Arrow from '../assets/activityhomeicon.png';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Dimensions.get('window').width / 11,
  },
  card: {
    height: 255,
    width: 350,
    marginBottom: -100,
    borderRadius: 10,
    shadowColor: '#fff',
    shadowRadius: 10,
    shadowOpacity: 0.25,
    transform: [
      { perspective: 1000 },
      { rotateX: '-10deg' },
      { translateY: 8 },
    ],
  },
  cardImage: {
    height: 255,
    width: 350,
  },
  borderStyle: {
    borderRadius: 10,
  },
  popUpCard: {
    marginVertical: 310,
    borderRadius: 10,
    padding: 20,
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
    marginHorizontal: Dimensions.get('window').width / 20,
    marginVertical: Dimensions.get('window').height / 20,
  },
  arrow: {
    marginRight: 5,
    width: 12,
    height: 15,
    marginHorizontal: Dimensions.get('window').width / 18,
    marginVertical: Dimensions.get('window').height / 40,
  },
});

export default function ActivityNavigationCard({
  activity, description, image, pageDirect, navigation,
}) {
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
        <ImageBackground style={styles.cardImage} imageStyle={styles.borderStyle} source={image}>
          <Text style={styles.activityTitle}>{activity}</Text>
          <Text style={styles.activityDescript}>{description}</Text>
        </ImageBackground>
      </TouchableOpacity>
      <Modal
        style={styles.popUpCard}
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
      >
        <ImageBackground style={styles.cardImage} imageStyle={styles.borderStyle} source={image}>
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
