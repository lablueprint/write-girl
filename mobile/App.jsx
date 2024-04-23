import { useState } from 'react';
import { Provider } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
import AppNavigation from './Navigation/AppNavigation';
import store from './redux/store';

export default function App() {
  const [user, setUser] = useState(null);
  // const user = SecureStore.getItemAsync('user');
  console.log('App user', user);

  async function getUser() {
    setUser(await SecureStore.getItemAsync('user'));
    console.log('finished running in app');
  }

  const updateUser = (value) => {
    console.log('updated with null');
    setUser(value);
  };

  getUser();
  return (
    <Provider store={store}>
      <AppNavigation user={user} setUser={updateUser} />
    </Provider>
  );
}
