import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PropTypes from 'prop-types';
import HomeScreen from '../Screens/HomeScreen';
import ActivityHomeScreen from '../Screens/WritingActivities/ActivityHomeScreen';
import StoryStarterScreen from '../Screens/StoryStarterScreen';
import MindBodyScreen from '../Screens/MindBodyScreen';
import PepTalkScreen from '../Screens/PepTalkScreen';

const Tab = createBottomTabNavigator();

export default function AppNavigation({ setTimer }) {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Activities" component={ActivityHomeScreen} />
        <Tab.Screen name="Story Starters" component={StoryStarterScreen} />
        {/* <Tab.Screen name="Mind & Body" component={MindBodyScreen} /> */}
        <Tab.Screen
          name="Mind & Body"
        >
          {() => <MindBodyScreen setTimer={setTimer} />}
        </Tab.Screen>
        { /* Used nested syntax to be able to pass props to lower-level components */ }

        <Tab.Screen name="Pep Talks" component={PepTalkScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

AppNavigation.propTypes = {
  setTimer: PropTypes.func.isRequired,
};
