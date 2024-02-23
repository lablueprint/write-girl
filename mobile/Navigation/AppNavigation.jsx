import { React, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../Screens/HomeScreen';
import ActivityHomeScreen from '../Screens/WritingActivities/ActivityHomeScreen';
import StoryStarterScreen from '../Screens/StoryStarterScreen';
import MindBodyScreen from '../Screens/MindBodyScreen';
import PepTalkScreen from '../Screens/PepTalkScreen';
import SignUpScreen from '../Screens/SignUpScreen';
import LogInScreen from '../Screens/LogInScreen';
import OnboardingScreen from '../Screens/OnboardingScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="App Home" component={HomeScreen} />
      <Tab.Screen name="Activities" component={ActivityHomeScreen} />
      <Tab.Screen name="Story Starters" component={StoryStarterScreen} />
      <Tab.Screen name="Mind & Body" component={MindBodyScreen} />
      <Tab.Screen name="Pep Talks" component={PepTalkScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigation() {
  const [isAppFirstLaunched, setIsAppFirstLaunched] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const appData = await AsyncStorage.getItem('isAppFirstLaunched');
      if (appData == null) {
        setIsAppFirstLaunched(true);
        AsyncStorage.setItem('isAppFirstLaunched', 'false');
      } else {
        setIsAppFirstLaunched(false);
      }
    }
    fetchData();
  }, []);

  return (
    isAppFirstLaunched != null && (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isAppFirstLaunched && (
            <Stack.Screen
              name="Onboarding"
              component={OnboardingScreen}
            />
          )}
          <Stack.Screen name="Onboarding" component={OnboardingScreen}/>
          <Stack.Screen name="Sign Up" component={SignUpScreen} options={{ headerShown: false, gestureEnabled: false }}/>
          <Stack.Screen name="Log In" component={LogInScreen} options={{ headerShown: false, gestureEnabled: false }}/>
          <Stack.Screen name="Home" component={HomeStackScreen} options={{ headerShown: false, gestureEnabled: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  );
}
