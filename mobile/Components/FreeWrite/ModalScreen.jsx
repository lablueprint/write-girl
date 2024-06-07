import React, {
  useCallback, useMemo, useRef, useState, useEffect,
} from 'react';
import {
  View, Text, StyleSheet, Pressable, Dimensions, useWindowDimensions,
} from 'react-native';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import {
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import { SvgXml } from 'react-native-svg';
import PropTypes from 'prop-types';
import { Audio } from 'expo-av';
import VerticalList from './VerticalList';

const windowWidth = Dimensions.get('window').width;

const playIcon = `<svg width="233" height="36" viewBox="0 0 233 36" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="1.10352" y="1" width="230.793" height="34" rx="13" stroke="url(#paint0_linear_4773_8984)" stroke-width="2"/>
<path d="M108.916 29C108.537 28.9993 108.166 28.9031 107.837 28.7208C107.097 28.3143 106.637 27.5252 106.637 26.6685V9.33162C106.637 8.47254 107.097 7.68581 107.837 7.27929C108.173 7.09183 108.555 6.99543 108.943 7.00017C109.331 7.0049 109.711 7.11059 110.042 7.30619L125.323 16.1755C125.642 16.3691 125.904 16.638 126.086 16.9569C126.268 17.2759 126.364 17.6344 126.364 17.9989C126.364 18.3633 126.268 18.7219 126.086 19.0408C125.904 19.3597 125.642 19.6286 125.323 19.8222L110.04 28.6939C109.701 28.8927 109.312 28.9985 108.916 29Z" fill="url(#paint1_linear_4773_8984)"/>
<defs>
<linearGradient id="paint0_linear_4773_8984" x1="0.103516" y1="18" x2="232.897" y2="18" gradientUnits="userSpaceOnUse">
<stop stop-color="#84C2C9"/>
<stop offset="1" stop-color="#BFD25A"/>
</linearGradient>
<linearGradient id="paint1_linear_4773_8984" x1="106.637" y1="18" x2="126.364" y2="18" gradientUnits="userSpaceOnUse">
<stop stop-color="#84C2C9"/>
<stop offset="1" stop-color="#BFD25A"/>
</linearGradient>
</defs>
</svg>`;

const pauseIcon = `<svg width="233" height="36" viewBox="0 0 233 36" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.103516" width="232.793" height="36" rx="14" fill="url(#paint0_linear_4843_11950)"/>
<path d="M106.5 11.4C106.5 9.3254 106.5 8.2892 107.086 7.6446C107.672 7 108.614 7 110.5 7C112.386 7 113.328 7 113.914 7.6446C114.5 8.2892 114.5 9.3254 114.5 11.4V24.6C114.5 26.6746 114.5 27.7108 113.914 28.3554C113.328 29 112.386 29 110.5 29C108.614 29 107.672 29 107.086 28.3554C106.5 27.7108 106.5 26.6746 106.5 24.6V11.4ZM118.5 11.4C118.5 9.3254 118.5 8.2892 119.086 7.6446C119.672 7 120.614 7 122.5 7C124.386 7 125.328 7 125.914 7.6446C126.5 8.2892 126.5 9.3254 126.5 11.4V24.6C126.5 26.6746 126.5 27.7108 125.914 28.3554C125.328 29 124.386 29 122.5 29C120.614 29 119.672 29 119.086 28.3554C118.5 27.7108 118.5 26.6746 118.5 24.6V11.4Z" fill="#2A2A2A"/>
<defs>
<linearGradient id="paint0_linear_4843_11950" x1="0.103516" y1="18" x2="232.897" y2="18" gradientUnits="userSpaceOnUse">
<stop stop-color="#84C2C9"/>
<stop offset="1" stop-color="#BFD25A"/>
</linearGradient>
</defs>
</svg>`;

const back = `<svg width="37" height="35" viewBox="0 0 37 35" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M25.7913 24.8097C25.5673 24.9339 25.3138 24.9995 25.0557 25C24.7855 24.999 24.5206 24.9269 24.2894 24.7913L14.5061 19.1122V23C14.5061 24.1046 13.6107 25 12.5061 25C11.4015 25 10.5061 24.1046 10.5061 23V12C10.5061 10.8954 11.4015 10 12.5061 10C13.6107 10 14.5061 10.8954 14.5061 12V15.8862L24.2877 10.2088C24.5137 10.0754 24.7724 10.0033 25.0369 10.0001C25.3014 9.99689 25.562 10.0626 25.7913 10.1904C26.2958 10.4676 26.6094 11.004 26.6094 11.5897V23.4103C26.6094 23.9944 26.2958 24.5325 25.7913 24.8097Z" fill="white" fill-opacity="0.35"/>
</svg>`;

const forwards = `<svg width="37" height="35" viewBox="0 0 37 35" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.2087 24.8097C11.4327 24.9339 11.6862 24.9995 11.9443 25C12.2145 24.999 12.4794 24.9269 12.7106 24.7913L22.494 19.1122V23C22.494 24.1046 23.3894 25 24.494 25C25.5986 25 26.494 24.1046 26.494 23V12C26.494 10.8954 25.5986 10 24.494 10C23.3894 10 22.494 10.8954 22.494 12V15.8863L12.7123 10.2088C12.4863 10.0754 12.2276 10.0033 11.9631 10.0001C11.6986 9.99689 11.438 10.0626 11.2087 10.1904C10.7042 10.4676 10.3906 11.004 10.3906 11.5897V23.4103C10.3906 23.9944 10.7042 24.5325 11.2087 24.8097Z" fill="white" fill-opacity="0.35"/>
</svg>`;

const defaultBackground = require('../../assets/free-write-icons/background.jpg');

const styles = StyleSheet.create({
  container: {
    zIndex: '1',
  },
  musicModal: {
    display: 'flex',
    position: 'absolute',
    width: windowWidth,
    left: '50%',
    transform: [{ translateX: -windowWidth * 0.5 }],
    zIndex: 4,
  },
  imageModal: {
    display: 'flex',
    position: 'absolute',
    width: windowWidth,
    left: '90%',
    transform: [{ translateX: -windowWidth * 0.84 }],
    zIndex: 4,
  },
  title: {
    fontFamily: 'Helvetica Neue',
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
    flexDirection: 'column',
    justifyContent: 'flex-end',
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
    alignSelf: 'center',
  },
  group: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 15,
  },
  scrollable: {
    height: '20%',
  },
  text: {
    position: 'absolute',
    left: '5%',
    top: '10%',
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Helvetica Neue',
  },
  subtext: {
    position: 'absolute',
    left: '5%',
    top: '20%',
    color: 'rgba(255, 255, 255, 0.5)',
    fontFamily: 'Helvetica Neue',
  },
});

export default function ModalScreen({
  icon, name, modalIcon, isMusicOpen, setIsMusicOpen, isImageOpen, setIsImageOpen, changeBackground,
}) {
  const modalizeRef = useRef(null);
  const snapPoints = useMemo(() => ['65%', '100%'], []);
  const { height } = useWindowDimensions();
  const musicHeight = isMusicOpen ? height : 0;
  const imageHeight = isImageOpen ? height : 0;
  const top = -height * 0.55;
  const [playMusic, setPlay] = useState(false);
  const [songTitle, setSongTitle] = useState('No Audio');
  const [imageTitle, setImageTitle] = useState('No Scene');
  const [musicDetail, setMusicDetail] = useState('----');
  const [imageDetail, setImageDetail] = useState('----');
  const [sound, setSound] = useState(null);
  const [messageValue, setMessageValue] = useState(0);
  const [goBack, setGoBack] = useState(false);
  const [goForward, setGoForward] = useState(false);
  const [i, setI] = useState(0);
  const [musicHistory, setMusicHistory] = useState([]);

  const handlePresentModalPress = useCallback(() => {
    if (modalizeRef.current) {
      modalizeRef.current.present();
      if (name === 'Audio') {
        setIsMusicOpen(true);
      } else {
        setIsImageOpen(true);
      }
    }
  }, []);

  const handleSheetChanges = useCallback((index) => {
    if (index === -1 && name === 'Audio') {
      setIsMusicOpen(false);
    } else if (index === -1 && name === 'Scenery') {
      setIsImageOpen(false);
    }
  }, []);

  async function playSound() {
    if (playMusic && sound) {
      await sound.playAsync();
    }
  }

  useEffect(() => {
    if (sound) {
      setI(i + 1);
    }
    playSound();
  }, [sound]);

  async function unloadSound() {
    await sound.unloadAsync();
  }

  const changeMusic = async (message, direction) => {
    if (direction === 'backward') {
      setGoForward(false);
      const { sound: music } = await Audio.Sound.createAsync(message);
      setSound(music);
    } else if (direction === 'forward') {
      setGoBack(false);
      const { sound: music } = await Audio.Sound.createAsync(message);
      setSound(music);
    } else {
      setGoBack(false);
      setGoForward(false);
      setMessageValue(message);
      if (sound) {
        unloadSound();
      }
      const { sound: music } = await Audio.Sound.createAsync(message);
      setSound(music);
    }
  };

  useEffect(() => {
    if (songTitle !== 'No Audio' && !goBack && !goForward) {
      setMusicHistory([...musicHistory, { key: songTitle, value: messageValue }]);
    }
  }, [songTitle]);

  const handlePlay = () => {
    setPlay(!playMusic);
  };

  useEffect(() => {
    if (songTitle === 'No Audio' && !sound) {
      return;
    }
    if (playMusic) {
      playSound();
    } else if (!playMusic && sound) {
      sound.pauseAsync();
    }
  }, [playMusic]);

  const handleTitle = (message) => {
    if (name === 'Audio') {
      setSongTitle(message);
      setMusicDetail(message);
    } else if (name === 'Scenery') {
      setImageTitle(message);
      setImageDetail('Current Scene');
    }
  };

  const handleBack = () => {
    setGoBack(true);
    if (name === 'Audio') {
      if (i - 2 < 0) {
        return;
      }
      setI(i - 2);
      sound.pauseAsync();
      changeMusic(musicHistory[i - 2].value, 'backward');
      handleTitle(musicHistory[i - 2].key);
    }
  };

  const handleForward = () => {
    setGoForward(true);
    if (name === 'Audio') {
      if (i > musicHistory.length - 1) {
        return;
      }
      sound.pauseAsync();
      changeMusic(musicHistory[i].value, 'forward');
      handleTitle(musicHistory[i].key);
    }
  };

  const handleScenePlay = () => {
    changeBackground(defaultBackground);
    setImageTitle('No Scene');
    setImageDetail('----');
  };

  const content = () => (
    <View style={styles.rectangle}>
      {name === 'Audio' ? (
        <>
          <View style={styles.square}>
            <SvgXml xml={modalIcon} style={styles.modalIcon} />
          </View>

          <View style={styles.group}>
            <Pressable onPress={handleBack}>
              <SvgXml xml={back} style={styles.back} />
            </Pressable>
            {!playMusic ? (
              <Pressable onPress={handlePlay}>
                <SvgXml xml={playIcon} style={styles.playIcon} />
              </Pressable>
            ) : (
              <Pressable onPress={handlePlay}>
                <SvgXml xml={pauseIcon} style={styles.playIcon} />
              </Pressable>
            )}

            <Pressable onPress={handleForward}>
              <SvgXml xml={forwards} style={styles.forwards} />
            </Pressable>
          </View>
        </>
      ) : null }
      {name === 'Scenery' ? (
        <View style={styles.group}>
          <Pressable onPress={handleBack}>
            <SvgXml xml={back} style={styles.back} />
          </Pressable>

          {imageTitle === 'No Scene' ? (
            <Pressable>
              <SvgXml xml={playIcon} style={styles.playIcon} />
            </Pressable>
          ) : (
            <Pressable onPress={handleScenePlay}>
              <SvgXml xml={pauseIcon} style={styles.playIcon} />
            </Pressable>
          )}

          <Pressable onPress={handleForward}>
            <SvgXml xml={forwards} style={styles.forwards} />
          </Pressable>
        </View>
      ) : null }
      {name === 'Audio' ? (
        <Text style={{ ...styles.text, left: '30%', top: '20%' }}>
          {songTitle}
        </Text>
      )
        : (
          <Text style={styles.text}>
            {imageTitle}
          </Text>
        )}

      {name === 'Audio' ? <Text style={{ ...styles.subtext, left: '30%', top: '30%' }}>{musicDetail}</Text>
        : <Text style={styles.subtext}>{imageDetail}</Text>}
    </View>
  );

  const list = () => (
    <View style={styles.scrollable}>
      <VerticalList title={name === 'Audio' ? 'Nature Sounds' : 'All Scenes'} setTitle={handleTitle} changeMusic={changeMusic} changeBackground={changeBackground} />
    </View>
  );

  const displayModal = () => (
    <GestureHandlerRootView style={{ ...(name === 'Audio' ? { ...styles.musicModal, height: musicHeight, top } : { ...styles.imageModal, height: imageHeight, top }) }}>
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
  changeBackground: PropTypes.func,
};

ModalScreen.defaultProps = {
  isMusicOpen: false,
  setIsMusicOpen: null,
  isImageOpen: false,
  setIsImageOpen: null,
  changeBackground: null,
};
