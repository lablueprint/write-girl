import React, {
  useCallback, useMemo, useRef,
} from 'react';
import {
  View, Text, StyleSheet, Pressable, Dimensions, useWindowDimensions,
} from 'react-native';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetScrollView,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { GestureHandlerRootView, NativeViewGestureHandler, ScrollView } from 'react-native-gesture-handler';
import { SvgXml } from 'react-native-svg';
import PropTypes from 'prop-types';
import ScrollList from './ScrollList';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const playIcon = `<svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.31032 22C1.92653 21.9993 1.54954 21.9031 1.21642 21.7208C0.466315 21.3143 0 20.5252 0 19.6685V2.33162C0 1.47254 0.466315 0.685809 1.21642 0.279289C1.55747 0.0918332 1.94491 -0.00456619 2.33824 0.000166217C2.73157 0.00489863 3.11635 0.110589 3.45236 0.306191L18.9451 9.1755C19.268 9.36912 19.5342 9.63801 19.7187 9.95693C19.9032 10.2759 20 10.6344 20 10.9989C20 11.3633 19.9032 11.7219 19.7187 12.0408C19.5342 12.3597 19.268 12.6286 18.9451 12.8222L3.44986 21.6939C3.10599 21.8927 2.71214 21.9985 2.31032 22Z" fill="url(#paint0_linear_3073_17125)"/>
<defs>
<linearGradient id="paint0_linear_3073_17125" x1="0" y1="11" x2="20" y2="11" gradientUnits="userSpaceOnUse">
<stop stop-color="#84C2C9"/>
<stop offset="1" stop-color="#BFD25A"/>
</linearGradient>
</defs>
</svg>`;

const styles = StyleSheet.create({
  container: {
    // borderColor: 'purple',
    // borderWidth: 2,
    // borderStyle: 'dotted',
  },
  musicModal: {
    position: 'absolute',
    width: windowWidth,
    left: '50%',
    transform: [{ translateX: -windowWidth * 0.5 }],
    height: 'auto',
    bottom: '0%',
    overflow: 'auto',

    borderColor: 'red',
    borderWidth: 2,
    borderStyle: 'dotted',
  },
  imageModal: {
    position: 'absolute',
    width: windowWidth,
    left: '100%',
    transform: [{ translateX: -windowWidth * 0.886 }],

    borderColor: 'green',
    borderWidth: 2,
    borderStyle: 'dotted',
  },
  title: {
    color: 'white',
    margin: 24,
    fontSize: 50,
  },
  rectangle: {
    width: '80%',
    height: '20%',
    backgroundColor: '#2A2A2A',
    alignSelf: 'center',
    borderRadius: 14,
  },
  square: {
    width: '20%',
    height: '40%',
    left: '5%',
    top: '10%',
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 14,
    justifyContent: 'center',
  },
  playIcon: {
    position: 'absolute',
    alignSelf: 'center',
    top: '70%',
  },
  text: {
    position: 'absolute',
    left: '30%',
    top: '20%',
    color: 'white',
    fontWeight: 'bold',
  },
  subtext: {
    position: 'absolute',
    left: '30%',
    top: '30%',
    color: 'rgba(255, 255, 255, 0.5)',
  },
});

export default function ModalScreen({
  icon, name, modalIcon, isMusicOpen, setIsMusicOpen, isImageOpen, setIsImageOpen,
  mediaTitle, creator, mediaName,
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
          backgroundStyle={{ backgroundColor: '#151716' }}
          ref={modalizeRef}
          index={0}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          <BottomSheetView>
            <Text style={styles.title}>
              {name}
              <SvgXml xml={modalIcon} style={styles.modalIcon} />
            </Text>
          </BottomSheetView>
          <View style={styles.rectangle}>
            <View style={styles.square} />
            <Text style={styles.text}>
              {mediaTitle}
            </Text>
            <Text style={styles.subtext}>
              {mediaName}
            </Text>
            <SvgXml xml={playIcon} style={styles.playIcon} />
            <ScrollList title="Navigate" />
          </View>
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
  isMusicOpen: PropTypes.bool,
  setIsMusicOpen: PropTypes.func,
  isImageOpen: PropTypes.bool,
  setIsImageOpen: PropTypes.func,
  mediaTitle: PropTypes.string.isRequired,
  creator: PropTypes.string,
  mediaName: PropTypes.string,
};

ModalScreen.defaultProps = {
  isMusicOpen: false,
  setIsMusicOpen: null,
  isImageOpen: false,
  setIsImageOpen: null,
  creator: '',
  mediaName: '',
};
