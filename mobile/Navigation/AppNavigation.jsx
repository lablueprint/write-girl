import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import PropTypes from 'prop-types';
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
import TripleFlipScreen from '../Screens/WritingActivities/TripleFlipScreen';
import HistoryScreen from '../Screens/HistoryScreen';

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

const HomeStack = createNativeStackNavigator();

function HomeScreenStack() {
  return (
    <HomeStack.Navigator initialRouteName="App Home">
      <HomeStack.Screen
        name="Home Screen"
        component={HomeScreen}
        options={{ title: 'HomeScreen' }}
      />
      <HomeStack.Screen name="Triple Flip" component={TripleFlipScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="History" component={HistoryScreen} options={{ headerShown: false }} />
    </HomeStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainAppScreen() {
  return (
    <NavigationContainer independent>
      <Tab.Navigator>
        <Tab.Screen name="App Home" component={HomeScreenStack} options={{ headerShown: false }} />
        <Tab.Screen name="Activities" component={ActivityHomeScreen} />
        <Tab.Screen name="Story Starters" component={StoryStarterStackScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Mind & Body" component={MindBodyScreen} />
        <Tab.Screen name="Pep Talks" component={PepTalkScreen} />
        <Tab.Screen name="Writing Tips" component={WritingTipScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Sign Up" component={SignUpScreen} options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="Log In" component={LogInScreen} options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="Home" component={MainAppScreen} options={{ headerShown: false, gestureEnabled: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
