import { NavigationContainer } from '@react-navigation/native';
import {
  Image, View, ImageBackground, Dimensions,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../Screens/HomeScreen';
import ActivityHomeScreen from '../Screens/WritingActivities/ActivityHomeScreen';
import StoryStarterScreen from '../Screens/StoryStarterScreen';
import StoryStarterComponent from '../Screens/StoryStarters/StoryStarterComponent';
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
// import SavedScreen from '../Screens/SavedScreen';

const StoryStarterStack = createNativeStackNavigator();

function StoryStarterStackScreen() {
  return (
    <StoryStarterStack.Navigator
      initialRouteName="Story Starters"
      screenOptions={{ headerTransparent: true, headerTitle: '' }}
      // Currently back button appears blue instead of white
      // Can configure back button and header, more info: https://reactnavigation.org/docs/headers/
    >
      <StoryStarterStack.Screen
        name="Story Starter Stack"
        component={StoryStarterScreen}
        options={{ headerShown: false, title: 'Story Starters' }}
      />
      <StoryStarterStack.Screen name="Objects" children={() => (<StoryStarterComponent title="Objects" route="item" textColor="#7BAC8A" />)} />
      <StoryStarterStack.Screen name="Settings" children={() => (<StoryStarterComponent title="Settings" route="setting" textColor="#BFD25A" />)} />
      <StoryStarterStack.Screen name="Character Traits" children={() => (<StoryStarterComponent title="Character Traits" route="characterTrait" textColor="#DC5F41" />)} />
      <StoryStarterStack.Screen name="Plot Points" children={() => (<StoryStarterComponent title="Plot Points" route="plotPoint" textColor="#5BB2CF" />)} />
    </StoryStarterStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const createtabOptions = (icon) => ({
  headerShown: false,
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

function HomeStackScreen() {
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
        component={HomeScreen}
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
        <Stack.Screen name="Home" component={HomeStackScreen} options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="Forgot Password" component={PasswordResetScreen} options={{ headerShown: false, gestureEnabled: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
