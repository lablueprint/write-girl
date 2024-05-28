import { React, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  Image, View, ImageBackground, Dimensions,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
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
import homeIcon from '../assets/home-icon.png';
import writingActivitiesIcon from '../assets/writing-activities-icon.png';
import storyStarterIcon from '../assets/story-starters-icon.png';
import mindBodyIcon from '../assets/mind-body-icon.png';
import settingsIcon from '../assets/settings-icon.png';
import whiteCircle from '../assets/white-circle.png';
import AppSettingsScreen from '../Screens/AppSettingsScreen';
import AccountInformationScreen from '../Screens/AccountInformationScreen';
import EditFirstNameScreen from '../Screens/EditFirstNameScreen';
import EditPasswordScreen from '../Screens/EditPasswordScreen';
import SignUpScreen from '../Screens/SignUpScreen';
import LogInScreen from '../Screens/LogInScreen';
import PocketPromptHomeScreen from '../Screens/PocketPromptHomeScreen';
import PocketPromptScreen from '../Screens/PocketPromptScreen';
import PasswordResetScreen from '../Screens/PasswordResetScreen';
// import SavedScreen from '../Screens/SavedScreen';
import TripleFlipScreen from '../Screens/WritingActivities/TripleFlipScreen';
import ProgressiveWritingScreen from '../Screens/WritingActivities/ProgressiveWriting';
import HistoryScreen from '../Screens/HistoryScreen';
import { isTokenExpired, login } from '../redux/sliceAuth';
import LoadingScreen from './Loading';

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

const SettingsStack = createNativeStackNavigator();

function SettingsStackScreen({ setUser }) {
  return (
    <SettingsStack.Navigator initialRouteName="Settings">
      <SettingsStack.Screen
        name="App Settings"
        options={{ headerShown: false, title: 'Story Starters' }}
      >
        {() => <AppSettingsScreen setUser={setUser} />}
      </SettingsStack.Screen>
      <SettingsStack.Screen name="Account Information" component={AccountInformationScreen} options={{ headerShown: false }} />
      <SettingsStack.Screen name="Edit First Name" component={EditFirstNameScreen} options={{ headerShown: false }} />
      <SettingsStack.Screen name="Edit Password" component={EditPasswordScreen} options={{ headerShown: false }} />
    </SettingsStack.Navigator>
  );
}

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator initialRouteName="App Home">
      <HomeStack.Screen
        name="Home Screen"
        options={{ title: 'HomeScreen' }}
        component={HomeScreen}
      />
      <HomeStack.Screen name="Door Activity" component={ProgressiveWritingScreen} />
      <HomeStack.Screen name="Triple Flip" component={TripleFlipScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="History" component={HistoryScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="Pocket Prompt Home" component={PocketPromptHomeScreen} options={{ headerShown: false }} />
      <HomeStack.Screen
        name="Pocket Prompts"
        component={PocketPromptScreen}
        options={{
          headerTransparent: true,
          headerTitleStyle: {
            fontSize: 24,
          },
          headerTintColor: '#fff',
        }}
      />
    </HomeStack.Navigator>
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

const createtabOptions = (icon) => ({
  tabBarIcon: () => (
    <Image
      source={icon}
    />
  ),
  headerShown: icon !== settingsIcon,
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

export default function AppNavigation({ user, setUser }) {
  const [isLoading, setIsLoading] = useState(true);
  const { id, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const populateRedux = async (userObj) => {
    if (userObj === null) {
      return;
    }
    await dispatch(login(JSON.parse(userObj)));
  };

  useEffect(() => {
    // Simulate an API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    populateRedux(user);
  }, [user]);

  if (isLoading) {
    return (
      <LoadingScreen />
    );
  }

  return (
    (token && !isTokenExpired(token) && id) ? (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: {
              backgroundColor: 'black',
              height: Dimensions.get('window').height / 10,
            },
            headerStyle: {
              backgroundColor: '#021921',
            },
            headerTitleStyle: {
              fontSize: 24,
            },
            headerTintColor: '#fff',
            headerShadowVisible: false,
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
            options={middleTabOptions}
            component={HomeStackScreen}
          />
          <Tab.Screen name="Mind & Body" component={MindBodyStackScreen} options={createtabOptions(mindBodyIcon)} />
          <Tab.Screen
            name="Settings"
            options={createtabOptions(settingsIcon)}
          >
            {() => <SettingsStackScreen setUser={setUser} />}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    ) : (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Sign Up" component={SignUpScreen} options={{ headerShown: false, gestureEnabled: false }} />
          <Stack.Screen name="Log In" component={LogInScreen} options={{ headerShown: false, gestureEnabled: false }} />
          <Stack.Screen name="Forgot Password" component={PasswordResetScreen} options={{ headerShown: false, gestureEnabled: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  );
}

AppNavigation.propTypes = {
  user: PropTypes.string,
  setUser: PropTypes.func.isRequired,
};

AppNavigation.defaultProps = {
  user: null,
};

SettingsStackScreen.propTypes = {
  setUser: PropTypes.func.isRequired,
};
