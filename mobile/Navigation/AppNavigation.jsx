import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import PropTypes from 'prop-types';
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
import Loading from '../Components/Loading';

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

function AuthScreen() {
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

export default function AuthLoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthentication = async () => {
    try {
      const authEmailToken = await SecureStore.getItemAsync('email');
      const authPasswordToken = await SecureStore.getItemAsync('password');
      if (authEmailToken && authPasswordToken) {
        setIsAuthenticated(!authEmailToken);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  useEffect(() => {
    checkAuthentication();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          <Stack.Screen
            name="Main"
            component={HomeStackScreen}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Auth"
            component={AuthScreen}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
