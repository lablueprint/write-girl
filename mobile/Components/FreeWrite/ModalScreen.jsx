import React, {
  useCallback, useMemo, useRef, useState,
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
  modal: {
    position: 'absolute',
    width: windowWidth,
    maxWidth: '100%',
    left: -100,

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
  icon, name, modalIcon, isOpen, setIsOpen,
}) {
  // const [isOpen, setIsOpen] = useState(false);
  const modalizeRef = useRef(null);
  const snapPoints = useMemo(() => ['100%'], []);
  const { height } = useWindowDimensions();
  const modalHeight = isOpen ? height : height * 0.5;
  const top = -height * 0.55;

  const handlePresentModalPress = useCallback(() => {
    if (modalizeRef.current) {
      modalizeRef.current.present();
      setIsOpen(true);
      console.log('Modal pressed');
    } else {
      console.log('Modal not opened');
    }
  }, []);
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
    if (index === -1) {
      setIsOpen(false);
    }
  }, []);

  const displayModal = () => (
    <GestureHandlerRootView style={{ ...styles.modal, height: modalHeight, top }}>
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
      {!isOpen ? (
        <Pressable onPress={handlePresentModalPress}>
          <SvgXml xml={icon} />
        </Pressable>
      ) : null}
      {displayModal()}

      {/* <Pressable onPress={handlePresentModalPress}>
        <SvgXml xml={icon} />
      </Pressable>
      {displayModal()} */}
    </View>
  );
}

ModalScreen.propTypes = {
  icon: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  modalIcon: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

/// ////////////////////////////////////// using Medium article
// import {
//   Dimensions, StyleSheet, Text, View,
// } from 'react-native';
// import React, { useEffect } from 'react';
// import { Gesture, GestureDetector } from 'react-native-gesture-handler';
// import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

// const { height: SCREEN_HEIGHT } = Dimensions.get('window');
// const MAX_TRANSLATE_Y = SCREEN_HEIGHT / 1.5;
// const MIN_TRANSLATE_Y = SCREEN_HEIGHT / 5;

// export default function MusicModal() {
//   const translateY = useSharedValue(0);
//   const context = useSharedValue({ y: 0 });
//   const styles = StyleSheet.create({
//     bottomsheet_container: {
//       width: '100%',
//       height: SCREEN_HEIGHT,
//       backgroundColor: '#00f8f8',
//       position: 'absolute',
//       top: SCREEN_HEIGHT / 3,
//       zIndex: 12000,
//       borderRadius: 25,
//       paddingHorizontal: 10,
//     },
//     line: {
//       width: 75,
//       height: 4,
//       backgroundColor: 'white',
//       borderRadius: 20,
//       alignSelf: 'center',
//       marginVertical: 10,
//     },
//   });

//   const gesture = Gesture.Pan()
//     .onStart((e) => {
//       context.value = { y: translateY.value };
//     })
//     .onUpdate((e) => {
//       translateY.value = e.translationY + context.value.y;
//       translateY.value = Math.max(translateY.value, -MAX_TRANSLATE_Y);
//     })
//     .onEnd((e) => {
//       if (translateY.value > -MIN_TRANSLATE_Y) {
//         translateY.value = withSpring(SCREEN_HEIGHT);
//       }
//       if (translateY.value < -MIN_TRANSLATE_Y) {
//         translateY.value = withSpring(-MAX_TRANSLATE_Y);
//       }
//     });

//   /**
//      * Animated style for the bottom sheet
//      */
//   const reanimatedBottomStyle = useAnimatedStyle((e) => ({
//     transform: [{ translateY: translateY.value }],
//   }));

//   /**
//      * Scrolls to a specific destination
//      * @param {number} destination - The destination to scroll to
//      */
//   const scrollTo = (destination) => {
//     'worklet';

//     translateY.value = withSpring(destination, { damping: 50 });
//   };

//   useEffect(() => {
//     // Initial scroll to show the bottom sheet partially
//     scrollTo(-SCREEN_HEIGHT / 3);
//   }, []);

//   return (
//     <View>
//       {console.log('SCREEN_HEIGHT: ', SCREEN_HEIGHT)}
//       <GestureDetector gesture={gesture}>
//         <Animated.View style={[styles.bottomsheet_container, reanimatedBottomStyle]}>
//           <View style={styles.line} />
//           <Text>Bottomsheet</Text>
//         </Animated.View>
//       </GestureDetector>
//     </View>
//   );
// }

/// ///////////////////////////////////////////////////////// first attempt

// import React, { useMemo, useRef } from 'react';
// import {
//   StyleSheet, Text, View,
// } from 'react-native';
// import BottomSheet from '@gorhom/bottom-sheet';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// // import PropTypes from 'prop-types';

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   contentContainer: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   containerHeadline: {
//     fontSize: 24,
//     fontWeight: '600',
//     padding: 20,
//   },
// });

// export default function MusicModal() {
//   const snapPoints = useMemo(() => ['25%', '50%', '70%'], []);
//   const bottomSheetRef = useRef < BottomSheet > (null);

//   const handleOpenPress = () => bottomSheetRef.current?.expand();

//   return (
//     <View style={styles.container}>
//       <GestureHandlerRootView style={{ flex: 1 }}>
//         <BottomSheet index={1} snapPoints={snapPoints}>
//           <View style={styles.contentContainer}>
//             <Text style={styles.containerHeadline}>Awesome Bottom Sheet 🎉</Text>
//           </View>
//         </BottomSheet>
//       </GestureHandlerRootView>
//     </View>
//   );
// }
