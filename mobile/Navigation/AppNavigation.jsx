import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../Screens/HomeScreen';
import ActivityHomeScreen from '../Screens/WritingActivities/ActivityHomeScreen';
import StoryStarterScreen from '../Screens/StoryStarterScreen';
import ObjectsScreen from '../Screens/StoryStarters/ObjectsScreen';
import SettingsScreen from '../Screens/StoryStarters/SettingsScreen';
import TraitsScreen from '../Screens/StoryStarters/TraitsScreen';
import PlotPointsScreen from '../Screens/StoryStarters/PlotPointsScreen';
import MindBodyScreen from '../Screens/MindBodyScreen';
import PepTalkScreen from '../Screens/PepTalkScreen';
import SignUpScreen from '../Screens/SignUpScreen';
import WritingTipScreen from '../Screens/WritingTipScreen';
import LogInScreen from '../Screens/LogInScreen';
import PepTalkScreen from '../Screens/PepTalkScreen';
import WritingTipScreen from '../Screens/WritingTipScreen';
import HomeNavigation from './HomeNavigation';
import FreeWriteScreen from '../Screens/FreeWriteScreen';
import book from '../assets/book.png';

const StoryStarterStack = createNativeStackNavigator();

function StoryStarterStackScreen() {
  return (
    <StoryStarterStack.Navigator initialRouteName="Story Starters">
      <StoryStarterStack.Screen
        name="Story Starter Stack"
        component={StoryStarterScreen}
        options={{ title: 'Story Starters' }}
      />
      <StoryStarterStack.Screen name="Objects" component={ObjectsScreen} />
      <StoryStarterStack.Screen name="Settings" component={SettingsScreen} />
      <StoryStarterStack.Screen name="Character Traits" component={TraitsScreen} />
      <StoryStarterStack.Screen name="Plot Points" component={PlotPointsScreen} />
    </StoryStarterStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="App Home" component={HomeScreen} />
      <Tab.Screen name="Activities" component={ActivityHomeScreen} />
      <Tab.Screen name="Story Starters" component={StoryStarterStackScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Mind & Body" component={MindBodyScreen} />
      <Tab.Screen name="Pep Talks" component={PepTalkScreen} />
      <Tab.Screen name="Writing Tips" component={WritingTipScreen} />
    </Tab.Navigator>
  );
}

// const bookIcon = () => (
//   <Image
// // style={{ width: size, height: size }}
//     source={{
//       uri: 'mobile/assets/book.png',
//     }}
//   />
// );

const tabOptions = {
  tabBarIcon: () => (
    <Image
  // style={{ width: size, height: size }}
      // source={{
      //   uri: 'mobile/assets/book.png',
      // }}
      source={book}
    />
  ),
};

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Writing Activities"
          component={ActivityHomeScreen}
          options={tabOptions}
        />
        <Tab.Screen name="Story Starters" component={StoryStarterScreen} options={tabOptions} />
        <Tab.Screen name="Home" component={HomeNavigation} options={{ headerShown: false }} />
        <Tab.Screen name="Free Write" component={FreeWriteScreen} options={tabOptions} />
        <Tab.Screen name="Mind & Body" component={MindBodyScreen} options={tabOptions} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
