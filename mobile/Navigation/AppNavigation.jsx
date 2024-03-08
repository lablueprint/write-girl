import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
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
import { isTokenExpired } from '../redux/sliceAuth';

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

export default function AppNavigation() {
  // const [isLoading, setIsLoading] = useState(false);
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // const checkAuthentication = async () => {
  //   try {
  //     const authEmailToken = await SecureStore.getItemAsync('email');
  //     const authPasswordToken = await SecureStore.getItemAsync('password');
  //     if (authEmailToken && authPasswordToken) {
  //       setIsAuthenticated(!isAuthenticated);
  //       setIsLoading(false);
  //     }
  //   } catch (error) {
  //     console.error('Error checking authentication:', error);
  //     setIsLoading(false);
  //   }
  // };

  // if (isLoading) {
  //   return <Loading />;
  // }

  // useEffect(() => {
  //   checkAuthentication();
  // }, []);

  const { id, token } = useSelector((state) => state.auth);
  console.log('nav token: ', token);
  console.log('nav id: ', id);

  // eslint-disable-next-line no-unused-vars
  const getToken = async () => {
    try {
      console.log('gettoken: ', await SecureStore.getItemAsync('email'));
      console.log('woooo');
    } catch (e) {
      console.log(e);
    }
    return true;
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    (token && !isTokenExpired(token) && id) ? (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="App Home" component={HomeScreen} />
          <Tab.Screen name="Activities" component={ActivityHomeScreen} />
          <Tab.Screen name="Story Starters" component={StoryStarterStackScreen} options={{ headerShown: false }} />
          <Tab.Screen name="Mind & Body" component={MindBodyScreen} />
          <Tab.Screen name="Pep Talks" component={PepTalkScreen} />
          <Tab.Screen name="Writing Tips" component={WritingTipScreen} />
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
