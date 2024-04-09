import { registerRootComponent } from 'expo';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './redux/store';

import App from './App';

function Root() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );
}

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(Root);
