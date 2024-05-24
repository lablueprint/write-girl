import { useState } from 'react';
import { Provider } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
import AppNavigation from './Navigation/AppNavigation';
import store from './redux/store';

export default function App() {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    setUser(await SecureStore.getItemAsync('user'));
  };

  const updateUser = (value) => {
    setUser(value);
  };

  getUser();
  return (
    <Provider store={store}>
      <AppNavigation user={user} setUser={updateUser} />
    </Provider>
  );
}
