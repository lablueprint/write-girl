import React, { useState } from 'react';
import {
  View, StyleSheet, Pressable, Text, Dimensions,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import ModalScreen from '../Components/FreeWrite/ModalScreen';
import Timer from '../Components/FreeWrite/Timer';

const background = `<svg width="430" height="932" viewBox="0 0 430 932" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M267.155 -143.966C385.938 -131.561 452.721 -8.86192 544.445 65.5968C635.342 139.384 768.148 181.614 803.594 291.497C839.021 401.32 752.84 509.211 723.518 620.724C693.859 733.516 711.687 865.351 630.263 950.678C547.469 1037.44 415.566 1059.27 294.41 1070.4C179.386 1080.97 65.2469 1058.88 -39.8734 1012.25C-143.081 966.463 -236.728 900.046 -298.381 807.422C-359.24 715.992 -378.911 606.721 -382.278 497.846C-385.656 388.629 -379.249 274.289 -317.695 182.891C-257.004 92.7749 -145.429 57.2454 -49.4015 3.57809C54.15 -54.294 148.413 -156.367 267.155 -143.966Z" fill="url(#paint0_radial_1747_12815)"/>
<defs>
<radialGradient id="paint0_radial_1747_12815" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(214.5 464) rotate(90) scale(609 597.5)">
<stop stop-color="#1872B2"/>
<stop offset="1" stop-color="#CEFF9E" stop-opacity="0.75"/>
</radialGradient>
</defs>
</svg>`;

const imageIcon = `<svg width="65" height="65" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="65" height="65" rx="32.5" fill="#BFD25A"/>
<path d="M44 41.5556V24.4444C44 23.1 42.9 22 41.5556 22H24.4444C23.1 22 22 23.1 22 24.4444V41.5556C22 42.9 23.1 44 24.4444 44H41.5556C42.9 44 44 42.9 44 41.5556ZM28.7222 34.8333L31.7778 38.5122L36.0556 33L41.5556 40.3333H24.4444L28.7222 34.8333Z" fill="white"/>
</svg>`;

const timerIcon = `<svg width="65" height="65" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="65" height="65" rx="32.5" fill="#BFD25A"/>
<path d="M36.3333 19H28.6667V21.5714H36.3333V19ZM31.2222 35.7143H33.7778V28H31.2222V35.7143ZM41.4828 27.2157L43.2972 25.39C42.7478 24.7343 42.1472 24.1171 41.4956 23.5771L39.6811 25.4029C37.7006 23.8086 35.2089 22.8571 32.5 22.8571C26.1494 22.8571 21 28.0386 21 34.4286C21 40.8186 26.1367 46 32.5 46C38.8633 46 44 40.8186 44 34.4286C44 31.7029 43.0544 29.1957 41.4828 27.2157ZM32.5 43.4286C27.555 43.4286 23.5556 39.4043 23.5556 34.4286C23.5556 29.4529 27.555 25.4286 32.5 25.4286C37.445 25.4286 41.4444 29.4529 41.4444 34.4286C41.4444 39.4043 37.445 43.4286 32.5 43.4286Z" fill="white"/>
</svg>`;

const musicIcon = `<svg width="65" height="65" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="65" height="65" rx="32.5" fill="#BFD25A"/>
<path d="M40.4563 22.0086L28.3563 23.6551C27.2562 23.7666 26.5 24.7529 26.5 25.8506V37.1366C25.993 37.0465 25.443 37.0465 24.85 37.1709C22.7617 37.7197 21 39.5593 21 41.4246C21 43.2898 22.7617 44.409 24.85 43.8601C26.9383 43.3113 28.7 41.4374 28.7 39.5721V30.1386L40.8 28.5263V35.9702C40.293 35.8802 39.743 35.9188 39.15 36.0732C37.0617 36.622 35.3 38.4616 35.3 40.3268C35.3 42.1921 37.0617 43.3113 39.15 42.7624C41.2383 42.2135 43 40.3397 43 38.4744V24.204C43 22.8876 41.7754 21.8971 40.4563 22.0086Z" fill="white"/>
</svg>`;

const imageModalIcon = `<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M26 23.1111L26 2.88888C26 1.3 24.7 -4.31868e-06 23.1111 -4.04087e-06L2.88889 -5.05109e-07C1.3 -2.27299e-07 2.27299e-07 1.3 5.05109e-07 2.88889L4.04088e-06 23.1111C4.31869e-06 24.7 1.3 26 2.88889 26L23.1111 26C24.7 26 26 24.7 26 23.1111ZM7.94445 15.1667L11.5556 19.5144L16.6111 13L23.1111 21.6667L2.88889 21.6667L7.94445 15.1667Z" fill="white"/>
</svg>`;

const musicModalIcon = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M28.3 0.0124543L10.7 2.40749C9.1 2.56965 8 4.00418 8 5.60087V22.0168C7.2625 21.8859 6.4625 21.8859 5.6 22.0667C2.5625 22.8651 0 25.5408 0 28.2539C0 30.967 2.5625 32.5949 5.6 31.7966C8.6375 30.9982 11.2 28.2726 11.2 25.5595V11.8379L28.8 9.4928V20.3204C28.0625 20.1894 27.2625 20.2455 26.4 20.47C23.3625 21.2684 20.8 23.9441 20.8 26.6572C20.8 29.3703 23.3625 30.9982 26.4 30.1999C29.4375 29.4015 32 26.6759 32 23.9628V3.20583C32 1.29105 30.2188 -0.149709 28.3 0.0124543Z" fill="white"/>
</svg>`;

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // position: 'relative',
    // marginTop: 'auto',
    // flexDirection: 'row',
    // justifyContent: 'center',

    // borderColor: 'blue',
    // borderWidth: 2,
    // borderStyle: 'dotted',
  },
  icons: {
    // flex: 1,
    // position: 'absolute',
    height: windowHeight * 0.08,
    top: windowHeight * 0.55,
    flexDirection: 'row',
    justifyContent: 'space-around',
    zIndex: 0,

    borderColor: 'purple',
    borderWidth: 2,
    borderStyle: 'dotted',
  },
  svg: {
    position: 'absolute',
    ...StyleSheet.absoluteFill,
    zIndex: -1,
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'normal',
  },
});

export default function FreeWriteScreen() {
  // const [isOpen, setIsOpen] = useState(false);
  const [isMusicOpen, setIsMusicOpen] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);

  return (
    <View style={styles.container}>
      <SvgXml xml={background} style={styles.svg} />
      <Text style={styles.title}>
        FreeWrite
        {'\n'}
        <Text style={styles.text}>This is your zone, to let your creativity run free</Text>
      </Text>

      <View style={styles.icons}>
        <ModalScreen icon={musicIcon} name="Music" modalIcon={musicModalIcon} isMusicOpen={isMusicOpen} setIsMusicOpen={setIsMusicOpen} />
        {!isMusicOpen ? (
          <>
            <Pressable>
              <SvgXml xml={timerIcon} />
            </Pressable>
            <ModalScreen icon={imageIcon} name="Scene" modalIcon={imageModalIcon} isImageOpen={isImageOpen} setIsImageOpen={setIsImageOpen} />
          </>
        ) : null}
      </View>
    </View>
  );
}
