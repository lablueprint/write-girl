import { TouchableOpacity, Text, View } from 'react-native';
import React, { useState } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { PropTypes } from 'prop-types';

/**
 * An animated tab bar of buttons - when user selects a button, tab slides and style changes
 */
export default function TabBar({ buttons, selectedTab, setSelectedTab,}) {
  const [dimensions, setDimensions] = useState({height: 20, width: 100});
  const buttonWidth = dimensions.width / buttons.length;
  const padding = 10;
  const tabPositionX = useSharedValue(0);

  const onTabbarLayout = (e) => {
    setDimensions({
      width: e.nativeEvent.layout.width,
      height: e.nativeEvent.layout.height,
    });
  };

  // We can set a callback for any functionality that should fire once the animation is finished
  const handlePressCb = (index) => {
    setSelectedTab(index);
  };

  const onTabPress = (index) => {
    // animate the tab and fire callback
    tabPositionX.value = withTiming(buttonWidth * index, {}, () => {
      handlePressCb(index);
    });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: tabPositionX.value }],
  }));

  return (
    <View accessibilityRole="tabbar">
      <Animated.View
        style={[
          animatedStyle,
          {
            height: dimensions.height - padding,
            width: buttonWidth - padding,
          },
        ]}
      />
      <View onLayout={onTabbarLayout}>
        {buttons.map((button, index) => {
          const color = selectedTab === index ? 'green-600' : 'gray-600';

          return (
            <TouchableOpacity
              accessibilityRole="tab"
              accessibilityLabel={button.accessibilityLabel}
              onPress={() => onTabPress(index)}
            >
              <Text>
                {button.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

TabBar.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedTab: PropTypes.number.isRequired,
  setSelectedTab: PropTypes.number.isRequired,
};
