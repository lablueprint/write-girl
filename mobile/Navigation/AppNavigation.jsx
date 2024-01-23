import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/HomeScreen';
import ActivityHomeScreen from '../Screens/WritingActivities/ActivityHomeScreen';
import StoryStarterScreen from '../Screens/StoryStarterScreen';
import MindBodyScreen from '../Screens/MindBodyScreen';
import PepTalkScreen from '../Screens/PepTalkScreen';
import WritingTipScreen from '../Screens/WritingTipScreen';

const Tab = createBottomTabNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Activities" component={ActivityHomeScreen} />
        <Tab.Screen name="Story Starters" component={StoryStarterScreen} />
        <Tab.Screen name="Mind & Body" component={MindBodyScreen} />
        <Tab.Screen name="Pep Talks" component={PepTalkScreen} />
        <Tab.Screen name="Writing Tips" component={WritingTipScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
