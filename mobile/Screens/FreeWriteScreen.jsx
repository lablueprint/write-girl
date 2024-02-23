import React from 'react';
import {
  Text, View, Pressable,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import PropTypes from 'prop-types';

const svgContent = `<svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22.5 20.2658L22.5 3.15465C22.5 1.8102 21.4 0.710201 20.0556 0.710202L2.94444 0.710205C1.6 0.710205 0.5 1.8102 0.5 3.15465L0.500003 20.2658C0.500004 21.6102 1.6 22.7102 2.94445 22.7102L20.0556 22.7102C21.4 22.7102 22.5 21.6102 22.5 20.2658ZM7.22222 13.5435L10.2778 17.2224L14.5556 11.7102L20.0556 19.0435L2.94445 19.0435L7.22222 13.5435Z" fill="#21424F"/>
</svg>`;

export default function FreeWriteScreen({ navigation }) {
  return (
    <View>
      <Pressable onPress={() => navigation.navigate('App Home')}>
        <SvgXml xml={svgContent} />
      </Pressable>
      <Text>FreeWrite</Text>
      <Text>This is your zone, to let your creativity run free</Text>
    </View>
  );
}

FreeWriteScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
