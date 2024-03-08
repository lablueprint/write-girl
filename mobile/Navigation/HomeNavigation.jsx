import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../Screens/HomeScreen';
import PepTalkScreen from '../Screens/PepTalkScreen';
import FreeWriteScreen from '../Screens/FreeWriteScreen';

const Stack = createNativeStackNavigator();

export default function HomeNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Pep Talks" component={PepTalkScreen} />
      <Stack.Screen name="Free Write" component={FreeWriteScreen} />
    </Stack.Navigator>
  );
}
