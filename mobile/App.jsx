import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import store from './redux/store';
import AppNavigation from './Navigation/AppNavigation';

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
}
