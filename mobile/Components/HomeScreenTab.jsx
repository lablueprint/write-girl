import {
  TouchableOpacity, Text, View, Dimensions, StyleSheet,
} from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { PropTypes } from 'prop-types';

const window = Dimensions.get('window');
const contentWidth = window.width * 0.9;
const buttonHeight = window.height * 0.05;

const styles = StyleSheet.create({
  tabBarContainer: {
    margin: 'auto',
    backgroundColor: '#B4B4B4',
    width: '92.5%',
    borderRadius: 20,
  },
  tabBar: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'space-between',
    width: contentWidth,
    height: buttonHeight,
  },

  animatedFocus: {
    marginTop: 5,
    marginLeft: contentWidth * 0.025,
    height: buttonHeight - 10,
    width: contentWidth / 3 - 25,
    backgroundColor: 'white',
    zIndex: 0,
    borderRadius: 20,
    position: 'absolute',
  },

  tabs: {
    width: (contentWidth * 0.925) / 3,
    height: buttonHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function TabBar({
  setPage, getText,
}) {
  const offset = useSharedValue(0);
  const tabIndexMap = {
    0: 'pep_talk',
    1: 'writing_tip',
    2: 'saved',
  };

  return (
    <View style={[styles.tabBar, styles.tabBarContainer]}>
      <Animated.View
        style={[
          useAnimatedStyle(() => ({
            transform: [{ translateX: offset.value * (contentWidth / 3) + offset.value * 10 }],
          })), styles.animatedFocus,
        ]}
      />
      {['Pep Talk', 'Writing Tip', 'Saved'].map((button, index) => {
        const route = ['/pepTalk/get', '/writingTip/get', 'none'];
        return (
          <TouchableOpacity
            onPress={() => {
              offset.value = withSpring(index);
              getText(route[index]);
              setPage(tabIndexMap[index]);
            }}
            style={styles.tabs}
            key={button}
          >
            <Text>
              {button}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

TabBar.propTypes = {
  setPage: PropTypes.func.isRequired,
  getText: PropTypes.func.isRequired,
};
