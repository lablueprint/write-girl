import React, {
  useCallback, useMemo, useRef, useState,
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

const playIcon = `<svg width="107" height="36" viewBox="0 0 107 36" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.609375" width="105.781" height="36" rx="14" fill="url(#paint0_linear_4046_2960)"/>
<path d="M45.9154 29C45.5369 28.9993 45.165 28.9031 44.8365 28.7208C44.0967 28.3143 43.6367 27.5252 43.6367 26.6685V9.33162C43.6367 8.47254 44.0967 7.68581 44.8365 7.27929C45.1729 7.09183 45.555 6.99543 45.943 7.00017C46.3309 7.0049 46.7104 7.11059 47.0418 7.30619L62.3226 16.1755C62.6411 16.3691 62.9036 16.638 63.0856 16.9569C63.2675 17.2759 63.363 17.6344 63.363 17.9989C63.363 18.3633 63.2675 18.7219 63.0856 19.0408C62.9036 19.3597 62.6411 19.6286 62.3226 19.8222L47.0394 28.6939C46.7002 28.8927 46.3117 28.9985 45.9154 29Z" fill="#2A2A2A"/>
<defs>
<linearGradient id="paint0_linear_4046_2960" x1="0.609375" y1="18" x2="106.391" y2="18" gradientUnits="userSpaceOnUse">
<stop stop-color="#84C2C9"/>
<stop offset="1" stop-color="#BFD25A"/>
</linearGradient>
</defs>
</svg>`;

const shuffle = `<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
<ellipse cx="17.753" cy="18" rx="17.753" ry="18" fill="white" fill-opacity="0.15"/>
<path d="M26.5563 11.6293C26.5067 11.5081 26.434 11.398 26.3423 11.3053L23.3833 8.30529C23.2923 8.20978 23.1835 8.1336 23.0632 8.08119C22.9428 8.02878 22.8134 8.00119 22.6825 8.00004C22.5515 7.99888 22.4216 8.02419 22.3004 8.07447C22.1792 8.12475 22.0691 8.199 21.9765 8.29289C21.8839 8.38679 21.8106 8.49844 21.761 8.62133C21.7114 8.74423 21.6865 8.87591 21.6876 9.00869C21.6887 9.14147 21.716 9.27269 21.7676 9.39469C21.8193 9.5167 21.8945 9.62704 21.9887 9.71929L23.264 11.0123H13.8092C12.5012 11.0123 11.2469 11.5391 10.322 12.4768C9.39718 13.4144 8.8776 14.6862 8.8776 16.0123V18.0123C8.8776 18.2775 8.98152 18.5319 9.16649 18.7194C9.35146 18.9069 9.60233 19.0123 9.86392 19.0123C10.1255 19.0123 10.3764 18.9069 10.5613 18.7194C10.7463 18.5319 10.8502 18.2775 10.8502 18.0123V16.0123C10.8502 15.2166 11.162 14.4536 11.7169 13.891C12.2718 13.3284 13.0244 13.0123 13.8092 13.0123H23.264L21.9887 14.3053C21.809 14.4939 21.7096 14.7465 21.7119 15.0087C21.7141 15.2709 21.8178 15.5217 22.0007 15.7071C22.1836 15.8925 22.4309 15.9977 22.6896 16C22.9482 16.0022 23.1973 15.9014 23.3833 15.7193L26.3423 12.7193C26.434 12.6265 26.5068 12.5164 26.5563 12.395C26.6059 12.2737 26.6314 12.1436 26.6313 12.0123M26.5563 11.6293C26.6056 11.7498 26.6311 11.8789 26.6313 12.0093L26.5563 11.6293ZM8.95256 23.6293C8.8775 23.812 8.85776 24.0132 8.89588 24.2073C8.934 24.4014 9.02823 24.5797 9.16659 24.7193L12.1255 27.7193C12.3116 27.9014 12.5607 28.0022 12.8193 28C13.0779 27.9977 13.3253 27.8925 13.5082 27.7071C13.691 27.5217 13.7948 27.2709 13.797 27.0087C13.7993 26.7465 13.6998 26.4939 13.5202 26.3053L12.2449 25.0123H21.6997C23.0076 25.0123 24.262 24.4855 25.1868 23.5478C26.1117 22.6101 26.6313 21.3384 26.6313 20.0123V18.0123C26.6313 17.7471 26.5274 17.4927 26.3424 17.3052C26.1574 17.1176 25.9065 17.0123 25.645 17.0123C25.3834 17.0123 25.1325 17.1176 24.9475 17.3052C24.7626 17.4927 24.6586 17.7471 24.6586 18.0123V20.0123C24.6586 20.8079 24.3469 21.571 23.792 22.1336C23.2371 22.6962 22.4845 23.0123 21.6997 23.0123H12.2449L13.5202 21.7193C13.6144 21.627 13.6895 21.5167 13.7412 21.3947C13.7929 21.2727 13.8201 21.1415 13.8213 21.0087C13.8224 20.8759 13.7974 20.7442 13.7478 20.6213C13.6983 20.4984 13.625 20.3868 13.5324 20.2929C13.4398 20.199 13.3297 20.1247 13.2085 20.0745C13.0872 20.0242 12.9574 19.9989 12.8264 20C12.6954 20.0012 12.566 20.0288 12.4457 20.0812C12.3254 20.1336 12.2165 20.2098 12.1255 20.3053L9.16659 23.3053M8.95256 23.6293C9.00181 23.5089 9.07386 23.3995 9.16462 23.3073L8.95256 23.6293Z" fill="url(#paint0_linear_4046_2953)"/>
<defs>
<linearGradient id="paint0_linear_4046_2953" x1="8.87695" y1="18" x2="26.6313" y2="18" gradientUnits="userSpaceOnUse">
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

const like = `<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
<ellipse cx="18.2472" cy="18" rx="17.753" ry="18" fill="white" fill-opacity="0.15"/>
<path d="M18.246 28C18.0158 28 17.7817 27.9599 17.5437 27.8798C17.3057 27.7996 17.0959 27.6714 16.9144 27.495L15.213 25.9802C13.4706 24.4253 11.8964 22.8825 10.4906 21.352C9.08474 19.8214 8.38216 18.1341 8.38281 16.29C8.38281 14.7831 8.90063 13.5248 9.93626 12.5149C10.9719 11.505 12.2623 11 13.8075 11C14.6788 11 15.5007 11.1802 16.2733 11.5405C17.0459 11.9009 17.7035 12.394 18.246 13.0198C18.7884 12.3946 19.446 11.9019 20.2186 11.5415C20.9912 11.1811 21.8131 11.0006 22.6844 11C24.2296 11 25.52 11.505 26.5557 12.5149C27.5913 13.5248 28.1091 14.7831 28.1091 16.29C28.1091 18.1334 27.4105 19.8246 26.0132 21.3635C24.6159 22.9024 23.0296 24.4493 21.2542 26.0042L19.5775 27.495C19.3967 27.6714 19.1872 27.7996 18.9492 27.8798C18.7112 27.9599 18.4768 28 18.246 28ZM17.309 14.9434C16.8322 14.2862 16.3226 13.7851 15.7802 13.4401C15.2377 13.0951 14.5802 12.923 13.8075 12.9236C12.8212 12.9236 11.9993 13.2442 11.3418 13.8854C10.6842 14.5266 10.3554 15.3281 10.3554 16.29C10.3554 17.1235 10.6596 18.0094 11.2678 18.9474C11.876 19.8855 12.6036 20.7951 13.4505 21.6761C14.2968 22.5578 15.168 23.3833 16.0642 24.1528C16.9605 24.9222 17.6877 25.5554 18.246 26.0523C18.8049 25.5554 19.5324 24.9222 20.4287 24.1528C21.3249 23.3833 22.1962 22.5578 23.0424 21.6761C23.8887 20.7944 24.6159 19.8849 25.2241 18.9474C25.8324 18.01 26.1365 17.1242 26.1365 16.29C26.1365 15.3281 25.8077 14.5266 25.1502 13.8854C24.4926 13.2442 23.6707 12.9236 22.6844 12.9236C21.9118 12.9236 21.2542 13.0961 20.7117 13.4411C20.1693 13.786 19.6597 14.2868 19.183 14.9434C19.0679 15.1037 18.9282 15.224 18.7638 15.3041C18.5994 15.3843 18.4268 15.4243 18.246 15.4243C18.0651 15.4243 17.8925 15.3843 17.7281 15.3041C17.5638 15.224 17.424 15.1037 17.309 14.9434Z" fill="url(#paint0_linear_4046_2966)"/>
<defs>
<linearGradient id="paint0_linear_4046_2966" x1="8.38281" y1="19.5" x2="28.1091" y2="19.5" gradientUnits="userSpaceOnUse">
<stop stop-color="#84C2C9"/>
<stop offset="1" stop-color="#BFD25A"/>
</linearGradient>
</defs>
</svg>`;

const imageShuffle = `<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="18" cy="18" r="18" fill="black" fill-opacity="0.5"/>
<path d="M25.2083 20.8333L27.6667 23.2917L25.2083 25.75M25.2083 11L27.6667 13.4583L25.2083 15.9167M8 23.2917H12.363C13.0375 23.2917 13.7015 23.1251 14.2962 22.8069C14.8909 22.4887 15.3978 22.0285 15.7719 21.4674L17.8333 18.375" stroke="url(#paint0_linear_4238_4036)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8 13.458H12.363C13.0375 13.458 13.7015 13.6245 14.2962 13.9428C14.8909 14.261 15.3978 14.7211 15.7719 15.2823L19.8947 21.4671C20.2689 22.0282 20.7758 22.4883 21.3705 22.8066C21.9651 23.1248 22.6292 23.2913 23.3036 23.2913H26.0278M26.0278 13.458H23.3036C22.6292 13.458 21.9651 13.6245 21.3705 13.9428C20.7758 14.261 20.2689 14.7211 19.8947 15.2823L19.4722 15.9163" stroke="url(#paint1_linear_4238_4036)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<defs>
<linearGradient id="paint0_linear_4238_4036" x1="8" y1="18.375" x2="27.6667" y2="18.375" gradientUnits="userSpaceOnUse">
<stop stop-color="#84C2C9"/>
<stop offset="1" stop-color="#BFD25A"/>
</linearGradient>
<linearGradient id="paint1_linear_4238_4036" x1="8" y1="18.3747" x2="26.0278" y2="18.3747" gradientUnits="userSpaceOnUse">
<stop stop-color="#84C2C9"/>
<stop offset="1" stop-color="#BFD25A"/>
</linearGradient>
</defs>
</svg>`;

const imageBack = `<svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0.485352 2C0.485352 0.895431 1.38078 0 2.48535 0C3.58992 0 4.48535 0.895431 4.48535 2V5.88697L14.4039 0.20878C14.633 0.0754154 14.8954 0.00335344 15.1636 0.0001268C15.4317 -0.00309984 15.6959 0.0626271 15.9284 0.190438C16.4399 0.46761 16.7578 1.00402 16.7578 1.58975V13.4104C16.7578 13.9945 16.4399 14.5325 15.9284 14.8097C15.7013 14.934 15.4443 14.9996 15.1826 15C14.9086 14.999 14.6401 14.9269 14.4056 14.7913L4.48535 9.11155V13C4.48535 14.1046 3.58992 15 2.48535 15C1.38078 15 0.485352 14.1046 0.485352 13V2Z" fill="white" fill-opacity="0.5"/>
</svg>`;

const imageForward = `<svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.5146 2C16.5146 0.895431 15.6192 0 14.5146 0C13.4101 0 12.5146 0.895431 12.5146 2V5.88697L2.59607 0.20878C2.36697 0.0754154 2.10462 0.00335344 1.83644 0.0001268C1.56826 -0.00309984 1.3041 0.0626271 1.07156 0.190438C0.56013 0.46761 0.242188 1.00402 0.242188 1.58975V13.4104C0.242188 13.9945 0.56013 14.5325 1.07156 14.8097C1.29869 14.934 1.55573 14.9996 1.81741 15C2.09137 14.999 2.35991 14.9269 2.59436 14.7913L12.5146 9.11155V13C12.5146 14.1046 13.4101 15 14.5146 15C15.6192 15 16.5146 14.1046 16.5146 13V2Z" fill="white" fill-opacity="0.5"/>
</svg>`;

const imageLike = `<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="18" cy="18" r="18" fill="black" fill-opacity="0.5"/>
<path d="M18 28C17.7667 28 17.5293 27.9599 17.288 27.8798C17.0467 27.7996 16.834 27.6714 16.65 27.495L14.925 25.9802C13.1583 24.4253 11.5623 22.8825 10.137 21.352C8.71167 19.8214 7.99933 18.1341 8 16.29C8 14.7831 8.525 13.5248 9.575 12.5149C10.625 11.505 11.9333 11 13.5 11C14.3833 11 15.2167 11.1802 16 11.5405C16.7833 11.9009 17.45 12.394 18 13.0198C18.55 12.3946 19.2167 11.9019 20 11.5415C20.7833 11.1811 21.6167 11.0006 22.5 11C24.0667 11 25.375 11.505 26.425 12.5149C27.475 13.5248 28 14.7831 28 16.29C28 18.1334 27.2917 19.8246 25.875 21.3635C24.4583 22.9024 22.85 24.4493 21.05 26.0042L19.35 27.495C19.1667 27.6714 18.9543 27.7996 18.713 27.8798C18.4717 27.9599 18.234 28 18 28ZM17.05 14.9434C16.5667 14.2862 16.05 13.7851 15.5 13.4401C14.95 13.0951 14.2833 12.923 13.5 12.9236C12.5 12.9236 11.6667 13.2442 11 13.8854C10.3333 14.5266 10 15.3281 10 16.29C10 17.1235 10.3083 18.0094 10.925 18.9474C11.5417 19.8855 12.2793 20.7951 13.138 21.6761C13.996 22.5578 14.8793 23.3833 15.788 24.1528C16.6967 24.9222 17.434 25.5554 18 26.0523C18.5667 25.5554 19.3043 24.9222 20.213 24.1528C21.1217 23.3833 22.005 22.5578 22.863 21.6761C23.721 20.7944 24.4583 19.8849 25.075 18.9474C25.6917 18.01 26 17.1242 26 16.29C26 15.3281 25.6667 14.5266 25 13.8854C24.3333 13.2442 23.5 12.9236 22.5 12.9236C21.7167 12.9236 21.05 13.0961 20.5 13.4411C19.95 13.786 19.4333 14.2868 18.95 14.9434C18.8333 15.1037 18.6917 15.224 18.525 15.3041C18.3583 15.3843 18.1833 15.4243 18 15.4243C17.8167 15.4243 17.6417 15.3843 17.475 15.3041C17.3083 15.224 17.1667 15.1037 17.05 14.9434Z" fill="url(#paint0_linear_4238_4049)"/>
<defs>
<linearGradient id="paint0_linear_4238_4049" x1="8" y1="19.5" x2="28" y2="19.5" gradientUnits="userSpaceOnUse">
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
    position: 'relative',
  },
  scrollable: {
    height: '20%',
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
    position: 'fixed',
    alignSelf: 'center',
    top: '200%',

    // borderColor: 'purple',
    // borderWidth: 2,
    // borderStyle: 'dotted',
  },
  shuffle: {
    top: '70%',
    left: '5%',
  },
  group: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    top: '0%',
    flex: 1,
  },
  back: {
    position: 'absolute',
    top: '70%',
    left: '20%',
  },
  forwards: {
    position: 'absolute',
    top: '70%',
    right: '20%',
  },
  like: {
    position: 'absolute',
    top: '70%',
    right: '5%',
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
  const [play, setPlay] = useState(false);
  const [songTitle, setSongTitle] = useState('No Music');

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

  const handlePlay = () => {
    setPlay(!play);
    console.log('play button pressed');
  };

  const handleTitle = (message) => {
    setSongTitle(message);
  };

  const content = () => (
    <View style={styles.rectangle}>
      {name === 'Music' ? (
        <>
          <View style={styles.square}>
            <SvgXml xml={modalIcon} style={styles.modalIcon} />
          </View>
          <SvgXml xml={shuffle} style={styles.shuffle} />
          <SvgXml xml={back} style={styles.back} />
          <Pressable onPress={handlePlay}>
            <SvgXml xml={playIcon} style={styles.playIcon} />
          </Pressable>
          <SvgXml xml={forwards} style={styles.forwards} />
          <SvgXml xml={like} style={styles.like} />
        </>
      )
        : (
          <>
            <SvgXml xml={imageShuffle} style={styles.shuffle} />
            <View style={styles.group}>
              <SvgXml xml={imageBack} style={{ ...styles.back, left: '30%' }} />
              <SvgXml xml={imageForward} style={{ ...styles.forwards, right: '30%' }} />
            </View>
            <SvgXml xml={imageLike} style={styles.like} />
          </>
        )}
      <Text style={name === 'Music' ? styles.text : { ...styles.text, left: '5%', top: '10%' }}>{name === 'Music' ? songTitle : mediaTitle}</Text>
      <Text style={name === 'Music' ? styles.subtext : { ...styles.subtext, left: '5%', top: '20%' }}>{mediaName}</Text>
    </View>

  );

  const list = () => (
    <View style={styles.scrollable}>
      <VerticalList title={name === 'Music' ? 'Nature Sounds' : 'All Scenes'} play={play} setTitle={handleTitle} />
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
  mediaTitle: PropTypes.string,
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
  mediaTitle: '',
};
