import React from 'react';
import {
  View, Text, TouchableOpacity, Dimensions, StyleSheet,
  ImageBackground,
} from 'react-native';
import axios from 'axios';
import { PropTypes } from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';

const styles = StyleSheet.create({
  modalContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 1000,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalImage: {
    width: Dimensions.get('window').width / 1.1,
    height: Dimensions.get('window').height / 4,
    resizeMode: 'contain',
  },
  modalText: {
    color: 'white',
    fontSize: 18,
    margin: 30,
    paddingTop: '15%',
    textAlign: 'center',
    fontFamily: 'Shadows Into Light',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    borderRadius: 16,
    padding: 8,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 25,
  },
});
function PostItModal({
  visible, onClose, postItImage, postItRoute,
}) {
  const [modalText, setModalText] = React.useState('');

  React.useEffect(() => {
    const fetchModalText = async () => {
      try {
        const response = await axios.get(process.env.EXPO_PUBLIC_SERVER_URL + postItRoute);
        setModalText(response.data);
      } catch (error) {
        setModalText('testing');
        console.error('Error fetching modal text:', error);
      }
    };

    if (visible) {
      fetchModalText();
    }
  }, [visible, postItRoute]);

  if (!visible) {
    return null;
  }

  return (
    <View style={styles.modalContainer}>
      <ImageBackground source={postItImage} style={styles.modalImage}>
        <Text style={styles.modalText}>{modalText}</Text>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <CloseIcon style={styles.closeButtonText} />
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

export default PostItModal;

PostItModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.string.isRequired,
  postItImage: PropTypes.number.isRequired,
  postItRoute: PropTypes.string.isRequired,
};
