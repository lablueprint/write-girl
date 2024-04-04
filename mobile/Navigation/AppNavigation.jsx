import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import {
  Image, View, ImageBackground, Dimensions,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeNavigation from './HomeNavigation';
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
import settingsIcon from '../assets/settings-icon.png';
import whiteCircle from '../assets/white-circle.png';
import AppSettingsScreen from '../Screens/AppSettingsScreen';
import AccountInformationScreen from '../Screens/AccountInformationScreen';
import EditFirstNameScreen from '../Screens/EditFirstNameScreen';
import EditPasswordScreen from '../Screens/EditPasswordScreen';

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

const Tab = createBottomTabNavigator();

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

export default function AppNavigation() {
  return (
    <NavigationContainer>
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
          component={HomeNavigation}
          options={middleTabOptions}
        />
        <Tab.Screen name="Mind & Body" component={MindBodyScreen} options={createtabOptions(mindBodyIcon)} />
        <Tab.Screen name="Settings" component={SettingsStackScreen} options={createtabOptions(settingsIcon)} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
