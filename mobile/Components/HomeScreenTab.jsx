import { TouchableOpacity, Text, View } from 'react-native';
import React, { useState } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { PropTypes } from 'prop-types';

/**
 * An animated tab bar of buttons - when user selects a button, tab slides and style changes
 */
export default function TabBar({
  buttons, styles, selectedTab, setPage, getText,
}) {
  const offset = useSharedValue(0);
  const tabIndexMap = {
    0: 'pep_talk',
    1: 'writing_tip',
    2: 'saved',
  };
  // const onTabbarLayout = (e) => {
  //   setDimensions({
  //     width: e.nativeEvent.layout.width,
  //     height: e.nativeEvent.layout.height,
  //   });
  // };

  // We can set a callback for any functionality that should fire once the animation is finished
  // const handlePressCb = (index) => {
  //   setSelectedTab(index);
  // };

  const onTabPress = (index) => {
    // animate the tab and fire callback
    console.log('pressed!');
    // tabPositionX.value = withTiming(buttonWidth * index, {}, () => {
    //   handlePressCb(index);
    // });
  };

  // const animatedStyle = useAnimatedStyle(() => ({
  //   transform: [{ translateX: tabPositionX.value }],
  // }));
  // tabIndexMap[selectedTab]
  return (
    <View accessibilityRole="tabbar">
      <Animated.View
        style={[
          useAnimatedStyle(() => ({
            transform: [{ translateX: offset.value * (styles.width / 3) + offset.value * 10 }],
          })),
          {
            height: styles.height,
            width: styles.width / 3,
            backgroundColor: 'blue',
            zIndex: 0,
          },
        ]}
      />

      <View style={[styles, { margin: 'auto', position: 'absolute', zIndex: 1 }]}>
        {[0, 1, 2].map((button, index) => (
          <TouchableOpacity
            onPress={() => {
              offset.value = withSpring(index);
              getText();
              setPage(tabIndexMap[index]);
            }}
            style={{
              width: styles.width / 3, height: styles.height, justifyContent: 'center', alignItems: 'center',
            }}
          >
            <Text>
              {button}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

TabBar.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.string).isRequired,
  styles: PropTypes.shape({
    display: PropTypes.string.isRequired,
    flexDirection: PropTypes.string.isRequired,
    gap: PropTypes.number.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    justifyContent: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired,
  selectedTab: PropTypes.number.isRequired,
  setSelectedTab: PropTypes.number.isRequired,
  getText: PropTypes.func.isRequired,
};
