import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import store from './redux/store';
import AppNavigation from './Navigation/AppNavigation';
import { fetchUser } from './redux/sliceAuth';

// Dispatch the fetchUser action to fetch user data asynchronously
store.dispatch(fetchUser());

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
}
