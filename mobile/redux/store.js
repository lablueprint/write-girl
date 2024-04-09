import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
// import thunk from 'redux-thunk';
import userReducer from './sliceAuth';

// const store = configureStore({
//   reducer: {
//     auth: reducer,
//   },
// });

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // Specifying reducers to persist
};

const persistedReducer = persistReducer(persistConfig, userReducer);

// const middleware = [thunk];

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
