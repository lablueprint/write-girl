import { React, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  Image, View, ImageBackground, Dimensions,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
import PropTypes from 'prop-types';
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
            // component={HomeScreen}
            // eslint-disable-next-line react/no-children-prop
            children={() => <HomeScreen setUser={setUser} />}
            options={middleTabOptions}
          />
          <Tab.Screen name="Mind & Body" component={MindBodyScreen} options={createtabOptions(mindBodyIcon)} />
          <Tab.Screen name="How To" component={MindBodyScreen} options={createtabOptions(howToIcon)} />
        </Tab.Navigator>
      </NavigationContainer>
    ) : (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Sign Up" component={SignUpScreen} options={{ headerShown: false, gestureEnabled: false }} />
          <Stack.Screen name="Log In" component={LogInScreen} options={{ headerShown: false, gestureEnabled: false }} />
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
