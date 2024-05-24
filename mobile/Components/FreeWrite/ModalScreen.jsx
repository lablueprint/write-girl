import React, {
  useCallback, useMemo, useRef, useState, useEffect,
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
import { Audio } from 'expo-av';
import ScrollList from './ScrollList';
import VerticalList from './VerticalList';

const windowHeight = Dimensions.get('window').height;
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
    // flex: 1,
    zIndex: '1',
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
    // width: '100%',

    // borderColor: 'red',
    // borderWidth: 2,
    // borderStyle: 'dotted',
    // position: 'absolute',
    // width: windowWidth,
    // top: '50%', // Adjust this to set vertical positioning if needed
    // left: '-34%',
    // // transform: [{ translateX: -windowWidth * 0.5 }],
    // // zIndex: 4,
    // borderColor: 'red',
    // borderWidth: 2,
    // borderStyle: 'dotted',
  },
  imageModal: {
    display: 'flex',
    position: 'absolute',
    width: windowWidth,
    left: '90%',
    transform: [{ translateX: -windowWidth * 0.84 }],
    zIndex: 4,

    // borderColor: 'green',
    // borderWidth: 2,
    // borderStyle: 'dotted',

    // position: 'absolute',
    // width: windowWidth,
    // right: '66%',
    // // transform: [{ translateX: 0.888 }],
    // // zIndex: 4,
    // borderColor: 'green',
    // borderWidth: 2,
    // borderStyle: 'dotted',
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
    // position: 'relative',
    // flex: 1,
    // justifyContent: 'center', // Center items vertically
    flexDirection: 'column', // Ensure children are arranged in a column
    justifyContent: 'flex-end', // Push children to the bottom

    // borderColor: 'purple',
    // borderWidth: 2,
    // borderStyle: 'dotted',

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
    // position: 'relative',
    // alignSelf: 'center',
    // flex: 1,
    // top: '0',
    // borderColor: 'purple',
    // borderWidth: 2,
    // borderStyle: 'dotted',
  },
  group: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 15,
  },
  back: {
    // position: 'relative',
    // top: '70%',
    // left: '20%',
    // borderColor: 'purple',
    // borderWidth: 2,
    // borderStyle: 'dotted',
  },
  forwards: {
    // position: 'relative',
    // top: '70%',
    // right: '20%',
    // borderColor: 'blue',
    // borderWidth: 2,
    // borderStyle: 'dotted',
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
  },
  subtext: {
    position: 'absolute',
    left: '5%',
    top: '20%',
    color: 'rgba(255, 255, 255, 0.5)',
  },
});

export default function ModalScreen({
  icon, name, modalIcon, isMusicOpen, setIsMusicOpen, isImageOpen, setIsImageOpen, creator, changeBackground, sceneHistory, currIndex,
}) {
  // const [isOpen, setIsOpen] = useState(false);
  const modalizeRef = useRef(null);
  const snapPoints = useMemo(() => ['65%', '100%'], []);
  const { height } = useWindowDimensions();
  const musicHeight = isMusicOpen ? height : 0;
  const imageHeight = isImageOpen ? height : 0;
  const top = -height * 0.55;
  const [playMusic, setPlay] = useState(false);
  // const [playScene, setPlayScene] = useState(false);
  const [songTitle, setSongTitle] = useState('No Audio');
  const [imageTitle, setImageTitle] = useState('No Scene');
  const [musicDetail, setMusicDetail] = useState('----');
  const [imageDetail, setImageDetail] = useState('----');
  const [sound, setSound] = useState(null);
  const [musicSelected, setMusicSelected] = useState(null);
  // const [isPlaying, setIsPlaying] = useState(false);
  // const [isLoaded, setIsLoaded] = useState(false);
  // const [prevMusic, setPrevMusic] = useState(null);
  const [i, setI] = useState(0);
  const [j, setJ] = useState(0);
  const [musicHistory, setMusicHistory] = useState([null]);
  const [imageTitleHistory, setImageTitleHistory] = useState([]);
  // const [prevScene, setPrevScene] = useState(null);
  const [nextMusic, setNextMusic] = useState(null);
  const [nextScene, setNextScene] = useState(null);

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

  async function updateSound(message) {
    const { sound: music } = await Audio.Sound.createAsync(message);
    setSound(music);
    // if (sound) {
    //   console.log('Playing sound...');
    //   await sound.playAsync();
    // } else {
    //   console.log('sound is: ', sound);
    // }
  }

  useEffect(() => {
    async function playSound() {
      if (playMusic && sound) { // originally if (sound)
        console.log('Playing sound...');
        await sound.playAsync();
      } else {
        console.log('sound is: ', sound);
      }
    }
    playSound();
  }, [sound]);

  async function unloadSound() {
    console.log('unloading sound...');
    await sound.unloadAsync();
  }

  const changeMusic = (message) => {
    // if (musicHistory.length !== 0) {
    //   setMusicHistory([...musicHistory, { key: songTitle, value: musicSelected }]);
    // }
    // setMusicHistory([...musicHistory, { key: songTitle, value: musicSelected }]);

    // setPrevMusic(musicSelected);
    console.log('change music: ', message);
    setMusicSelected(message);
    unloadSound();
    // if (songTitle !== 'No Music') {
    //   setMusicHistory([...musicHistory, { key: songTitle, value: message }]);
    // }
    // setI(musicHistory.length - 1);
    // console.log('index right now: ', i);
    // musicHistory.map((item) => {
    //   console.log('map: ', item);
    //   // return null;
    // });
  };

  useEffect(() => {
    setMusicHistory([...musicHistory, { key: songTitle, value: musicSelected }]);
    setI(musicHistory.length - 1);
    console.log('index right now: ', i);
    musicHistory.map((item) => {
      console.log('map: ', item);
      // return null;
    });
  }, [musicSelected]);

  const handlePlay = () => {
    // if (songTitle === 'No Music') {
    //   return;
    // }
    setPlay(!playMusic);
    // console.log('playMusic: ', playMusic);
    // if (playMusic) {
    //   playSound();
    // } else {
    //   sound.unloadAsync();
    // }
  };

  useEffect(() => {
    console.log('useEffect playMusic: ', playMusic);
    if (songTitle === 'No Music' && !sound) {
      return;
    }
    if (playMusic) {
      console.log('musicSelected: ', musicSelected);
      updateSound(musicSelected);
    } else if (!playMusic) {
      unloadSound();
    }
  }, [playMusic]);

  const handleScenePlay = () => {
    changeBackground(defaultBackground);
    setImageTitle('No Scene');
    setImageDetail('----');
  };

  const handleBack = () => {
    console.log('hit back');
    console.log('currIndex: ', currIndex);
    setJ(currIndex);
    if (name === 'Music') {
      console.log('musicHistory.length: ', musicHistory.length);
      if (musicHistory.length === 0) {
        return;
      }
      unloadSound();
      // if (playMusic) {
      setI((prevI) => prevI - 1);
      console.log('index: ', i);
      console.log('backed sound: ', musicHistory[i]);
      updateSound(musicHistory[i].value);
      setSongTitle(musicHistory[i].key);
      setMusicDetail(musicHistory[i].key);
      // } else if (!playMusic) {
      // unloadSound();
      // }
    }
    if (name === 'Scene') {
      if (sceneHistory.length === 0) {
        return;
      }
      setJ(currIndex - 1);
      // console.log('index j: ', j);
      // console.log('backed image: ', sceneHistory[j]);
    }
  };

  // useEffect(() => {
  //   if (!sceneHistory) {
  //     return;
  //   }
  //   console.log('index j: ', j);
  //   console.log('backed image: ', sceneHistory[j]);
  //   changeBackground(sceneHistory[j]);
  //   setImageTitle(imageTitleHistory[j]);
  // }, [currIndex]);

  const handleForward = () => {
    console.log('hit forward');
    if (name === 'Music') {
      if (i > musicHistory.length - 1) {
        return;
      }
      unloadSound();
      if (playMusic) {
        setI((prevI) => prevI + 1);
        console.log('index: ', i);
        console.log('forward sound: ', musicHistory[i]);
        updateSound(musicHistory[i].value);
        setSongTitle(musicHistory[i].key);
        setMusicDetail(musicHistory[i].key);
      } else if (!playMusic) {
        unloadSound();
      }
    }
    if (name === 'Scene') {
      changeBackground(nextScene);
    }
  };

  const handleTitle = (message) => {
    if (name === 'Music') {
      setSongTitle(message);
      setMusicDetail(message);
    } else if (name === 'Scene') {
      setImageTitle(message);
      setImageDetail('Current Scene');
      setImageTitleHistory([...imageTitleHistory, message]);
    }
  };

  const content = () => (
    <View style={styles.rectangle}>
      {name === 'Music' ? (
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
      )
        : (
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
        ) }
      {name === 'Music' ? (
        <Text style={{ ...styles.text, left: '30%', top: '20%' }}>
          {songTitle}
        </Text>
      )
        : (
          <Text style={styles.text}>
            {imageTitle}
          </Text>
        )}

      {name === 'Music' ? <Text style={{ ...styles.subtext, left: '30%', top: '30%' }}>{musicDetail}</Text>
        : <Text style={styles.subtext}>{imageDetail}</Text>}
    </View>
  );

  const list = () => (
    <View style={styles.scrollable}>
      <VerticalList title={name === 'Music' ? 'Nature Sounds' : 'All Scenes'} play={playMusic} setTitle={handleTitle} changeMusic={changeMusic} changeBackground={changeBackground} />
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
  changeBackground: PropTypes.func,
  sceneHistory: PropTypes.array,
  currIndex: PropTypes.number,
  // mediaTitle: PropTypes.string,
  creator: PropTypes.string,
  // mediaName: PropTypes.string,
};

ModalScreen.defaultProps = {
  isMusicOpen: false,
  setIsMusicOpen: null,
  isImageOpen: false,
  setIsImageOpen: null,
  creator: '',
  changeBackground: null,
  sceneHistory: null,
  currIndex: 0,
  // mediaName: '----',
  // mediaTitle: '',
};
