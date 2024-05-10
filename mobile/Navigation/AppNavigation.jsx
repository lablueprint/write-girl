import { NavigationContainer } from '@react-navigation/native';
import {
  Image, View, ImageBackground, Dimensions,
} from 'react-native';
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
import homeIcon from '../assets/home-icon.png';
import writingActivitiesIcon from '../assets/writing-activities-icon.png';
import storyStarterIcon from '../assets/story-starters-icon.png';
import mindBodyIcon from '../assets/mind-body-icon.png';
import howToIcon from '../assets/how-to-icon.png';
import whiteCircle from '../assets/white-circle.png';
import SignUpScreen from '../Screens/SignUpScreen';
import LogInScreen from '../Screens/LogInScreen';
import PasswordResetScreen from '../Screens/PasswordResetScreen';
import BookmarksScreen from '../Screens/BookmarksScreen';
import SavedScreen from '../Screens/SavedScreen';
import TripleFlipScreen from '../Screens/WritingActivities/TripleFlipScreen';
import HistoryScreen from '../Screens/HistoryScreen';
import ViewAllSavedScreen from '../Screens/ViewAllSavedScreen';

const StoryStarterStack = createNativeStackNavigator();

function StoryStarterStackScreen() {
  return (
    <StoryStarterStack.Navigator initialRouteName="Story Starters">
      <StoryStarterStack.Screen
        name="Story Starter Stack"
        component={StoryStarterScreen}
        options={{ headerShown: false, title: 'Story Starters' }}
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
      <HomeStack.Screen name="Bookmarks" component={BookmarksScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="View All Saved" component={ViewAllSavedScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="All Saved" component={SavedScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="History" component={HistoryScreen} options={{ headerShown: false }} />
    </HomeStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const createtabOptions = (icon) => ({
  tabBarIcon: () => (
    <Image
      source={icon}
    />
  ),
});

const middleTabOptions = {
  tabBarLabel: '',
  headerShown: false,
  tabBarIcon: () => (
    <View
      style={{
        bottom: Dimensions.get('window').height / 34,
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').height / 11,
        height: Dimensions.get('window').height / 11,
      }}
    >
      <ImageBackground
        source={whiteCircle}
        style={{ width: '100%', height: '100%' }}
      >
        <View style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
          borderWidth: 5,
          borderColor: 'transparent',
          width: '100%',
          height: '100%',
        }}
        >
          <Image
            source={homeIcon}
          />
        </View>
      </ImageBackground>
    </View>
  ),

};

function MainAppScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: 'black',
          height: Dimensions.get('window').height / 10,
        },
      }}
      initialRouteName="Center"
    >
      <Tab.Screen
        name="Writing Activities"
        component={ActivityHomeScreen}
        options={createtabOptions(writingActivitiesIcon)}
      />
      <Tab.Screen name="Story Starters" component={StoryStarterStackScreen} options={createtabOptions(storyStarterIcon)} />
      <Tab.Screen
        name="Center"
        component={HomeScreenStack}
        options={middleTabOptions}
      />
      <Tab.Screen name="Mind & Body" component={MindBodyScreen} options={createtabOptions(mindBodyIcon)} />
      <Tab.Screen name="How To" component={MindBodyScreen} options={createtabOptions(howToIcon)} />
    </Tab.Navigator>
  );
}

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Sign Up" component={SignUpScreen} options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="Log In" component={LogInScreen} options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="Home" component={MainAppScreen} options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="Forgot Password" component={PasswordResetScreen} options={{ headerShown: false, gestureEnabled: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
