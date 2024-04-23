import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../Screens/HomeScreen';
import ActivityHomeScreen from '../Screens/WritingActivities/ActivityHomeScreen';
import StoryStarterScreen from '../Screens/StoryStarterScreen';
import MindBodyScreen from '../Screens/MindBody/MindBodyScreen';
import ActivityTypeScreen from '../Screens/MindBody/ActivityTypeScreen';
import ActivityDurationScreen from '../Screens/MindBody/ActivityDurationScreen';
import MindBodyDeckScreen from '../Screens/MindBody/MindBodyDeckScreen';
import ObjectsScreen from '../Screens/StoryStarters/ObjectsScreen';
import SettingsScreen from '../Screens/StoryStarters/SettingsScreen';
import TraitsScreen from '../Screens/StoryStarters/TraitsScreen';
import PlotPointsScreen from '../Screens/StoryStarters/PlotPointsScreen';
import PepTalkScreen from '../Screens/PepTalkScreen';
import SignUpScreen from '../Screens/SignUpScreen';
import WritingTipScreen from '../Screens/WritingTipScreen';
import LogInScreen from '../Screens/LogInScreen';

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

const MindBodyStack = createNativeStackNavigator();

function MindBodyStackScreen() {
  return (
    <MindBodyStack.Navigator initialRouteName="Mind and Body">
      <MindBodyStack.Screen
        name="Mind and Body Stack"
        component={MindBodyScreen}
        options={{ title: 'Mind and Body' }}
      />
      <MindBodyStack.Screen name="Activity Type" component={ActivityTypeScreen} options={{ headerBackTitleVisible: false }} />
      <MindBodyStack.Screen name="Activity Duration" component={ActivityDurationScreen} options={{ headerBackTitleVisible: false }} />
      <MindBodyStack.Screen name="Mind and Body Deck" component={MindBodyDeckScreen} options={{ headerBackTitleVisible: false }} />
    </MindBodyStack.Navigator>
  );
}

function HomeStackScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="App Home" component={HomeScreen} />
      <Tab.Screen name="Activities" component={ActivityHomeScreen} />
      <Tab.Screen name="Mind & Body" component={MindBodyStackScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Story Starters" component={StoryStarterStackScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Pep Talks" component={PepTalkScreen} />
      <Tab.Screen name="Writing Tips" component={WritingTipScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Sign Up" component={SignUpScreen} options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="Log In" component={LogInScreen} options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="Home" component={HomeStackScreen} options={{ headerShown: false, gestureEnabled: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
