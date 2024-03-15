import React, {
  useCallback, useMemo, useRef,
} from 'react';
import {
  View, Text, StyleSheet, Pressable, Dimensions, useWindowDimensions,
} from 'react-native';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SvgXml } from 'react-native-svg';
import PropTypes from 'prop-types';
import { LinearGradient } from 'expo-linear-gradient';

// const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    // borderColor: 'red',
    // borderWidth: 2,
    // borderStyle: 'dotted',
  },
  musicModal: {
    position: 'absolute',
    width: windowWidth,
    left: '50%',
    transform: [{ translateX: -windowWidth * 0.5 }],

    borderColor: 'red',
    borderWidth: 2,
    borderStyle: 'dotted',
  },
  imageModal: {
    position: 'absolute',
    width: windowWidth,
    left: '90%',
    transform: [{ translateX: -windowWidth * 0.90 }],

    borderColor: 'green',
    borderWidth: 2,
    borderStyle: 'dotted',
  },
  text: {
    color: 'white',
    margin: 24,
    fontSize: 50,
  },
});

export default function ModalScreen({
  icon, name, modalIcon, isMusicOpen, setIsMusicOpen, isImageOpen, setIsImageOpen,
}) {
  // const [isOpen, setIsOpen] = useState(false);
  const modalizeRef = useRef(null);
  const snapPoints = useMemo(() => ['100%'], []);
  const { height } = useWindowDimensions();
  const musicHeight = isMusicOpen ? height : height * 0.5;
  const imageHeight = isImageOpen ? height : height * 0.5;
  const top = -height * 0.55;

  const handlePresentModalPress = useCallback(() => {
    if (modalizeRef.current) {
      modalizeRef.current.present();
      if (name === 'Music') {
        setIsMusicOpen(true);
      } else {
        setIsImageOpen(true);
      }
      console.log('Modal pressed');
    } else {
      console.log('Modal not opened');
    }
  }, []);
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
    if (index === -1 && name === 'Music') {
      setIsMusicOpen(false);
    } else if (index === -1 && name === 'Scene') {
      setIsImageOpen(false);
    }
  }, []);

  const displayModal = () => (
    <GestureHandlerRootView style={{ ...(name === 'Music' ? { ...styles.musicModal, height: musicHeight, top } : { ...styles.imageModal, height: imageHeight, top }) }}>
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={modalizeRef}
          index={0}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          <LinearGradient colors={['#81875F', '#21424F', '#21424F']}>
            <BottomSheetView>
              <Text style={styles.text}>
                {name}
                <SvgXml xml={modalIcon} style={styles.modalIcon} />
              </Text>
            </BottomSheetView>
          </LinearGradient>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );

  return (
    <View style={styles.container}>
      {!isImageOpen ? (
        <Pressable onPress={handlePresentModalPress}>
          <SvgXml xml={icon} />
        </Pressable>
      ) : null}
      {displayModal()}
    </View>
  );
}

ModalScreen.propTypes = {
  icon: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  modalIcon: PropTypes.string.isRequired,
  isMusicOpen: PropTypes.bool.isRequired,
  setIsMusicOpen: PropTypes.func.isRequired,
  isImageOpen: PropTypes.bool.isRequired,
  setIsImageOpen: PropTypes.func.isRequired,
};
