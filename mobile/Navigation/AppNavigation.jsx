import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';
import {
  Image, View, ImageBackground, Dimensions,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PropTypes from 'prop-types';
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
import PasswordResetScreen from '../Screens/PasswordResetScreen';
// import SavedScreen from '../Screens/SavedScreen';
import TripleFlipScreen from '../Screens/WritingActivities/TripleFlipScreen';
import HistoryScreen from '../Screens/HistoryScreen';
import PepTalkScreen from '../Screens/PepTalkScreen';
import TimedWritingScreen from '../Components/Timer';

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

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator initialRouteName="Settings">
      <SettingsStack.Screen
        name="App Settings"
        component={AppSettingsScreen}
        options={{ headerShown: false, title: 'Story Starters' }}
      />
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

const MindBodyStack = createNativeStackNavigator();

function MindBodyStackScreen({ setTimer }) {
  const [allowNotif, setNotifPermission] = useState(false);

  return (
    <MindBodyStack.Navigator initialRouteName="Mind and Body">
      <MindBodyStack.Screen
        name="Mind and Body Stack"
        options={{ title: 'Mind and Body', headerShown: false }}
      >
        {({ route, navigation }) => (
          <MindBodyScreen
            navigation={navigation}
            currentToggle={allowNotif}
            enableToggle={setNotifPermission}
          />
        )}
      </MindBodyStack.Screen>
      <MindBodyStack.Screen name="Activity Type" component={ActivityTypeScreen} options={{ headerBackTitleVisible: false, headerShown: false }} />
      <MindBodyStack.Screen name="Activity Duration" component={ActivityDurationScreen} options={{ headerBackTitleVisible: false, headerShown: false }} />
      <MindBodyStack.Screen
        name="Mind and Body Deck"
        // eslint-disable-next-line react/no-children-prop
        children={({ navigation }) => (
          <MindBodyDeckScreen
            setTimer={setTimer}
            navigation={navigation}
          />
        )}
        options={{ headerBackTitleVisible: false, headerShown: false }}
      />
    </MindBodyStack.Navigator>
  );
}

const createtabOptions = (icon) => ({
  tabBarIcon: () => (
    <Image
      source={icon}
    />
  ),
  headerShown: icon === settingsIcon,
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

function MainAppScreen({ setTimer }) {
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
        component={HomeStackScreen}
        options={middleTabOptions}
      />
      <Tab.Screen
        name="Mind & Body"
        // eslint-disable-next-line react/no-children-prop
        children={() => <MindBodyStackScreen setTimer={setTimer} />}
        options={createtabOptions(mindBodyIcon)}
      />
      <Tab.Screen name="Settings" component={SettingsStackScreen} options={createtabOptions(settingsIcon)} />
    </Tab.Navigator>
  );
}

export default function AppNavigation({ setTimer }) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Sign Up" component={SignUpScreen} options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="Log In" component={LogInScreen} options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen
          name="Home"
          // eslint-disable-next-line react/no-children-prop
          children={() => <MainAppScreen setTimer={setTimer} />}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen name="Forgot Password" component={PasswordResetScreen} options={{ headerShown: false, gestureEnabled: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

AppNavigation.propTypes = {
  setTimer: PropTypes.func.isRequired,
};

MainAppScreen.propTypes = {
  setTimer: PropTypes.func.isRequired,
};

MindBodyStackScreen.propTypes = {
  setTimer: PropTypes.func.isRequired,
};
