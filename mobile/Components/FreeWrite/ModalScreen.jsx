import React, {
  useCallback, useMemo, useRef,
} from 'react';
import {
  View, Text, StyleSheet, Pressable, Dimensions, useWindowDimensions,
} from 'react-native';
import BottomSheet, {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetScrollView,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import {
  GestureHandlerRootView, NativeViewGestureHandler, ScrollView, FlatList,
} from 'react-native-gesture-handler';
import { SvgXml } from 'react-native-svg';
import PropTypes from 'prop-types';
import ScrollList from './ScrollList';
import VerticalList from './VerticalList';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const playIcon = `<svg width="142" height="36" viewBox="0 0 142 36" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="142" height="36" rx="14" fill="url(#paint0_linear_3635_5130)"/>
<path d="M65.3103 29C64.9265 28.9993 64.5495 28.9031 64.2164 28.7208C63.4663 28.3143 63 27.5252 63 26.6685V9.33162C63 8.47254 63.4663 7.68581 64.2164 7.27929C64.5575 7.09183 64.9449 6.99543 65.3382 7.00017C65.7316 7.0049 66.1163 7.11059 66.4524 7.30619L81.9451 16.1755C82.268 16.3691 82.5342 16.638 82.7187 16.9569C82.9032 17.2759 83 17.6344 83 17.9989C83 18.3633 82.9032 18.7219 82.7187 19.0408C82.5342 19.3597 82.268 19.6286 81.9451 19.8222L66.4499 28.6939C66.106 28.8927 65.7121 28.9985 65.3103 29Z" fill="#2A2A2A"/>
<defs>
<linearGradient id="paint0_linear_3635_5130" x1="0" y1="18" x2="142" y2="18" gradientUnits="userSpaceOnUse">
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
    display: 'flex',
    position: 'absolute',
    width: windowWidth,
    left: '50%',
    transform: [{ translateX: -windowWidth * 0.5 }],
    zIndex: 4,
    // height: 'auto',
    // bottom: '0%',
    // overflow: 'auto',
    // flex: 1,

    borderColor: 'red',
    borderWidth: 2,
    borderStyle: 'dotted',
  },
  imageModal: {
    display: 'flex',

    position: 'absolute',
    width: windowWidth,
    left: '50%',
    transform: [{ translateX: -windowWidth * 0.91 }],
    zIndex: 4,

    borderColor: 'green',
    borderWidth: 2,
    borderStyle: 'dotted',
  },
  title: {
    color: 'white',
    margin: 10,
    fontSize: 30,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  rectangle: {
    width: '80%',
    height: '20%',
    backgroundColor: '#2A2A2A',
    alignSelf: 'center',
    borderRadius: 14,
  },
  scrollable: {
    height: '30%',
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
  modalIcon: {
    // height: '90%',
    // left: '5%',
    alignSelf: 'center',
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
  const snapPoints = useMemo(() => ['65%', '100%'], []);
  const { height } = useWindowDimensions();
  const musicHeight = isMusicOpen ? height : 0;
  const imageHeight = isImageOpen ? height : 0;
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

  const data = useMemo(
    () => Array(1)
      .fill(0)
      .map((_, index) => `index-${index}`),
    [],
  );

  const content = () => (
    <View style={styles.rectangle}>
      {name === 'Music' && (
      <>
        <View style={styles.square}>
          <SvgXml xml={modalIcon} style={styles.modalIcon} />
        </View>
        <SvgXml xml={playIcon} style={styles.playIcon} />
      </>
      )}
      <Text style={name === 'Music' ? styles.text : { ...styles.text, left: '5%', top: '10%' }}>{mediaTitle}</Text>
      <Text style={name === 'Music' ? styles.subtext : { ...styles.subtext, left: '5%', top: '20%' }}>{mediaName}</Text>
    </View>

  );

  const list = () => (
    <View style={styles.scrollable}>
      <VerticalList title="Nature Sounds" />
    </View>
  );

  const renderItem = useCallback(
    (item) => (
      <View key={item}>
        {content()}
      </View>
    ),
    [],
  );

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
            </Text>
          </BottomSheetView>
          {content()}
          {list()}
          {/* <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={() => (
              // <View>
              content()
              // </View>
            )}
          /> */}
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
